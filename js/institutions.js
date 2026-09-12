/**
 * 출강이력 페이지 (institutions.html) 전용 스크립트
 * ------------------------------------------------------------
 * 1) 먼저 구글시트("DClay 출강이력")를 CSV로 불러옵니다.
 *    시트에는 "제목"과 "보도자료링크" 두 칼럼만 있으면 됩니다.
 *    - 이미 화면에 있는 강의와 같은 제목의 행에 링크를 채우면, 그 강의 카드
 *      제목이 자동으로 그 링크로 연결됩니다.
 *    - 시트에만 있고 js/data/lectures.js 에는 없는 새 제목을 추가하면,
 *      그 강의도 새 카드로 목록에 자동으로 추가됩니다.
 *    즉, 이제부터는 새 보도자료가 나올 때마다 구글시트에 "제목, 링크"만
 *    입력하시면 됩니다. 기간/시간/기관 등은 몰라도 됩니다.
 *    화면에 보이는 카드 순서는 구글시트에 있는 행 순서를 그대로 따릅니다.
 *    (시트에 아직 옮겨 적지 않은 예전 강의는 목록 맨 뒤에 그대로 표시됩니다.)
 * 2) 구글시트를 아직 "링크가 있는 모든 사용자"로 공개하지 않았거나,
 *    네트워크 문제로 전혀 불러오지 못하면 js/data/lectures.js 에 저장된
 *    목록으로만 화면을 채웁니다(이 경우 새로 추가한 링크는 반영되지 않습니다).
 */
(() => {
    "use strict";

   const PER_PAGE = 30;
    const SHEET_ID = "1N8DcssiUqdSO67Hp3fsdw9Fop0gs8w1n1n6lhuxCdiE";
    // 구글시트를 못 불러오는 경우(네트워크/일시적 문제 등)를 대비해 두 가지 방식으로
   // 순서대로 시도합니다. 하나가 실패해도 다른 하나로 재시도합니다.
   const SHEET_CSV_URLS = [
         `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`,
         `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv`,
       ];

   const listEl = document.querySelector("#lecture-list");
    const pagerEl = document.querySelector("#lecture-pager");
    const countEl = document.querySelector("#lecture-count");
    const rangeEl = document.querySelector("#lecture-range");

   if (!listEl) return;

   let DATA = [];
    let totalPages = 1;

   // 콤마·따옴표·줄바꿈이 포함된 값도 올바르게 읽는 간단한 CSV 파서
   const parseCSV = (text) => {
         const rows = [];
         let row = [];
         let field = "";
         let inQuotes = false;

         for (let i = 0; i < text.length; i += 1) {
                 const char = text[i];
                 if (inQuotes) {
                           if (char === '"') {
                                       if (text[i + 1] === '"') {
                                                     field += '"';
                                                     i += 1;
                                       } else {
                                                     inQuotes = false;
                                       }
                           } else {
                                       field += char;
                           }
                 } else if (char === '"') {
                           inQuotes = true;
                 } else if (char === ",") {
                           row.push(field);
                           field = "";
                 } else if (char === "\n") {
                           row.push(field);
                           rows.push(row);
                           row = [];
                           field = "";
                 } else if (char === "\r") {
                           // 무시 (\n에서 줄바꿈 처리)
                 } else {
                           field += char;
                 }
         }
         if (field.length > 0 || row.length > 0) {
                 row.push(field);
                 rows.push(row);
         }
         return rows.filter((r) => r.some((cell) => cell.trim() !== ""));
   };

   // 시트에는 "제목"과 "보도자료링크"만 있으면 되고, 기간/시간/기관/예정여부는
   // 있으면 쓰고 없으면 빈 값으로 둡니다(둘 다 지원).
   const rowsToSheetItems = (rows) => {
         if (!rows.length) return [];
         const [header, ...body] = rows;
         const idx = {
                 title: header.indexOf("제목"),
                 period: header.indexOf("기간"),
                 hours: header.indexOf("시간"),
                 org: header.indexOf("기관"),
                 upcoming: header.indexOf("예정여부"),
                 link: header.indexOf("보도자료링크"),
         };
         if (idx.title === -1) return [];

         return body
           .map((cols) => {
                     const linkRaw = (idx.link > -1 ? cols[idx.link] || "" : "").trim();
                     return {
                                 title: (cols[idx.title] || "").trim(),
                                 period: idx.period > -1 ? (cols[idx.period] || "").trim().replace(/^'/, "") : "",
                                 hours: idx.hours > -1 ? (cols[idx.hours] || "").trim() : "",
                                 org: idx.org > -1 ? (cols[idx.org] || "").trim() : "",
                                 upcoming: idx.upcoming > -1 ? (cols[idx.upcoming] || "").trim() !== "" : false,
                                 link: linkRaw ? linkRaw : null,
                     };
           })
           .filter((item) => item.title);
   };

   // 구글시트(제목+링크, 순서대로)를 로컬 lectures.js 목록과 제목 기준으로 합칩니다.
   // - 화면에 보이는 순서는 "구글시트에 있는 행 순서"를 그대로 따릅니다.
   // - 시트 행의 제목이 로컬 목록에도 있으면 기간/시간/기관 등 정보를 가져와 채웁니다.
   // - 같은 제목이 여러 번 있어도(강의를 여러 번 진행한 경우) 순서대로 하나씩
   //   짝지어 연결합니다.
   // - 시트에는 아직 없고 로컬에만 있는 강의는 목록 맨 뒤에 그대로 붙입니다
   //   (사라지지 않도록).
   const mergeWithLocal = (sheetItems) => {
         const localList = typeof LECTURES !== "undefined" ? LECTURES : [];

         // 로컬 목록을 제목별로 큐에 담아둡니다(같은 제목이 여러 번 있을 수 있으므로).
         const localQueues = new Map();
         localList.forEach((item) => {
                 if (!localQueues.has(item.title)) localQueues.set(item.title, []);
                 localQueues.get(item.title).push(item);
         });

         // 시트 순서를 그대로 따라가면서, 같은 제목의 로컬 데이터(기간/시간/기관)가
         // 있으면 가져와 채웁니다.
         const merged = sheetItems
           .filter((item) => item.title)
           .map((sheetItem) => {
                     const queue = localQueues.get(sheetItem.title);
                     const localMatch = queue && queue.length ? queue.shift() : null;
                     return {
                                 title: sheetItem.title,
                                 period: localMatch ? localMatch.period : sheetItem.period || "",
                                 hours: localMatch ? localMatch.hours : sheetItem.hours || "",
                                 org: localMatch ? localMatch.org : sheetItem.org || "",
                                 upcoming: localMatch ? localMatch.upcoming : sheetItem.upcoming || false,
                                 link: sheetItem.link || (localMatch ? localMatch.link : null),
                     };
           });

         // 시트에는 아직 없는(=로컬에만 남아있는) 강의는 목록 뒤쪽에 그대로 둡니다.
         const leftoverLocal = [];
         localQueues.forEach((queue) => {
                 queue.forEach((item) => leftoverLocal.push(item));
         });

         return [...merged, ...leftoverLocal];
   };

   const getPageFromHash = () => {
         const match = window.location.hash.match(/page=(\d+)/);
         const page = match ? parseInt(match[1], 10) : 1;
         if (!Number.isFinite(page) || page < 1) return 1;
         if (page > totalPages) return totalPages;
         return page;
   };

   // 카드 제목(title) 자체를 클릭 가능한 링크로 감쌉니다.
   // item.link 가 없으면 이전처럼 그냥 텍스트로 표시됩니다.
   const escapeHtml = (str) =>
         String(str).replace(/[&<>"']/g, (ch) => ({
                 "&": "&amp;",
                 "<": "&lt;",
                 ">": "&gt;",
                 '"': "&quot;",
                 "'": "&#39;",
         }[ch]));

   const renderRow = (item) => {
         const safeTitle = escapeHtml(item.title);
         const titleHtml = item.link
           ? `<a class="lecture-row-title-link" href="${escapeHtml(item.link)}" target="_blank" rel="noopener" style="color:inherit;text-decoration:none;">${safeTitle} <span aria-hidden="true" style="opacity:.6;">↗</span></a>`
                 : safeTitle;

         return `
               <article class="lecture-row${item.link ? " has-link" : ""}">
                       <p class="lecture-row-title">${titleHtml}</p>
                             </article>
                                 `;
   };

   const renderPager = (page) => {
         if (!pagerEl) return;
         let html = "";

         html += `<button type="button" class="pager-arrow" data-page="${Math.max(1, page - 1)}" ${page === 1 ? "disabled" : ""} aria-label="이전 페이지">‹</button>`;

         for (let p = 1; p <= totalPages; p += 1) {
                 html += `<button type="button" class="pager-page${p === page ? " is-active" : ""}" data-page="${p}" aria-current="${p === page ? "page" : "false"}">${p}</button>`;
         }

         html += `<button type="button" class="pager-arrow" data-page="${Math.min(totalPages, page + 1)}" ${page === totalPages ? "disabled" : ""} aria-label="다음 페이지">›</button>`;

         pagerEl.innerHTML = html;
   };

   const renderPage = (page) => {
         const start = (page - 1) * PER_PAGE;
         const end = Math.min(start + PER_PAGE, DATA.length);
         const pageItems = DATA.slice(start, end);

         listEl.innerHTML = pageItems.map((item) => renderRow(item)).join("");

         if (rangeEl) {
                 rangeEl.textContent = DATA.length === 0 ? "" : `${start + 1}–${end}번째`;
         }
         renderPager(page);
         listEl.scrollIntoView({ behavior: "smooth", block: "start" });
   };

   const goToPage = (page) => {
         window.location.hash = `page=${page}`;
   };

   pagerEl?.addEventListener("click", (event) => {
         const btn = event.target.closest("button[data-page]");
         if (!btn || btn.disabled) return;
         goToPage(parseInt(btn.dataset.page, 10));
   });

   window.addEventListener("hashchange", () => renderPage(getPageFromHash()));

   const startWith = (source) => {
         DATA = source;
         totalPages = Math.max(1, Math.ceil(DATA.length / PER_PAGE));
         if (countEl) countEl.textContent = String(DATA.length);
         renderPage(getPageFromHash());
   };

   const fallbackToLocalData = () => {
         if (typeof LECTURES !== "undefined") {
                 startWith(LECTURES);
         } else {
                 listEl.innerHTML = '<p class="lecture-empty">출강이력을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.</p>';
         }
   };

   const fetchSheet = async () => {
         for (const url of SHEET_CSV_URLS) {
                 try {
                           const res = await fetch(`${url}&_=${Date.now()}`);
                           if (!res.ok) throw new Error(`HTTP ${res.status}`);
                           const text = await res.text();
                           const parsed = rowsToSheetItems(parseCSV(text));
                           if (parsed.length === 0) throw new Error("empty sheet data");
                           return parsed;
                 } catch (err) {
                           // 콘솔에 원인을 남겨서, 문제가 계속되면 개발자 도구로 확인할 수 있게 합니다.
                   console.warn("[출강이력] 구글시트 불러오기 실패:", url, err);
                 }
         }
         return null;
   };

   fetchSheet().then((parsed) => {
         if (parsed) {
                 startWith(mergeWithLocal(parsed));
         } else {
                 fallbackToLocalData();
         }
   });
})();

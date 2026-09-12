/**
 * 출강이력 페이지 (institutions.html) 전용 스크립트
 * ------------------------------------------------------------
 * 1) 먼저 구글시트("DClay 출강이력")를 CSV로 불러와 화면에 표시합니다.
 *    시트에 행을 추가/수정/삭제하면 새로고침 시 사이트에 그대로 반영됩니다.
 *    보도자료링크 칸에 URL을 넣으면 기관명이 자동으로 그 링크로 연결됩니다.
 * 2) 구글시트를 아직 "링크가 있는 모든 사용자"로 공개하지 않았거나,
 *    네트워크 문제로 불러오지 못하면 js/data/lectures.js 에 저장된
 *    목록으로 자동 대체합니다(화면 표시는 동일합니다).
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

  const rowsToLectures = (rows) => {
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
    if (idx.title === -1 || idx.org === -1) return [];

    return body
      .map((cols) => {
        const linkRaw = (cols[idx.link] || "").trim();
        return {
          title: (cols[idx.title] || "").trim(),
          period: (cols[idx.period] || "").trim().replace(/^'/, ""),
          hours: (cols[idx.hours] || "").trim(),
          org: (cols[idx.org] || "").trim(),
          upcoming: (cols[idx.upcoming] || "").trim() !== "",
          link: linkRaw ? linkRaw : null,
        };
      })
      .filter((item) => item.title && item.org);
  };

  const getPageFromHash = () => {
    const match = window.location.hash.match(/page=(\d+)/);
    const page = match ? parseInt(match[1], 10) : 1;
    if (!Number.isFinite(page) || page < 1) return 1;
    if (page > totalPages) return totalPages;
    return page;
  };

  const renderRow = (item) => {
    const linkTag = item.link
      ? `<a class="lecture-row-link" href="${item.link}" target="_blank" rel="noopener">보도자료 <span aria-hidden="true">↗</span></a>`
      : "";

    return `
      <article class="lecture-row">
        <p class="lecture-row-title">${item.title}</p>
        ${linkTag}
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
        const parsed = rowsToLectures(parseCSV(text));
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
      startWith(parsed);
    } else {
      fallbackToLocalData();
    }
  });
})();

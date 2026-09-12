/**
 * 교육문의 폼 전송 (Web3Forms 연동)
 * ------------------------------------------------------------
 * jineedclay@gmail.com 으로 바로 전송됩니다. (Access Key: DClay 교육문의 폼)
 * 별도의 이메일 확인 절차 없이, 폼 제출 즉시 지정된 이메일로 전달됩니다.
 */
(() => {
  "use strict";

  const ENDPOINT = "https://api.web3forms.com/submit";
  const ACCESS_KEY = "19aa0056-5373-4191-9773-e5b5da7d77c8";

  const form = document.querySelector("#education-inquiry-form");
  if (!form) return;

  const statusEl = form.querySelector("[data-form-status]");
  const submitBtn = form.querySelector('button[type="submit"]');

  const setStatus = (message, kind) => {
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.className = `form-status form-status-${kind}`;
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    formData.append("access_key", ACCESS_KEY);
    formData.append(
      "subject",
      `[DClay 홈페이지 교육문의] ${formData.get("company") || ""} ${formData.get("name") || ""}`.trim()
    );
    formData.append("from_name", "DClay 홈페이지 교육문의");

    submitBtn?.setAttribute("disabled", "true");
    setStatus("전송 중입니다…", "pending");

    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      const result = await response.json().catch(() => null);

      if (response.ok && result && result.success) {
        setStatus("문의가 정상적으로 접수되었습니다. 빠르게 연락드리겠습니다.", "success");
        form.reset();
      } else {
        setStatus("전송에 실패했습니다. 잠시 후 다시 시도해주세요.", "error");
      }
    } catch (error) {
      setStatus("전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.", "error");
    } finally {
      submitBtn?.removeAttribute("disabled");
    }
  });
})();

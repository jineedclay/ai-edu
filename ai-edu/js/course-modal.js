(function () {
  if (typeof COURSES === "undefined") return;

  var modal = document.getElementById("course-modal");
  var closeBtn = document.getElementById("course-modal-close");
  var copyBtn = document.getElementById("course-modal-copy");
  var modalInquiryBtn = document.getElementById("course-modal-inquiry");
  var select = document.getElementById("field-topic");
  var inquirySection = document.getElementById("inquiry-form");
  var lastFocused = null;
  var openCourseId = null;

  function el(id) { return document.getElementById(id); }

  function populateModal(id) {
    var course = COURSES[id];
    if (!course) return;
    el("course-modal-tag").textContent = course.tag;
    el("course-modal-index").textContent = course.index;
    el("course-modal-icon").innerHTML =
      '<svg viewBox="0 0 48 48">' + course.iconPaths + "</svg>";
    el("course-modal-title").textContent = course.title;
    el("course-modal-desc").textContent = course.description;
    el("course-modal-audience").textContent = course.audience;
    el("course-modal-structure").textContent = course.structure;
    el("course-modal-output").textContent = course.output;
    el("course-modal-duration").textContent = course.duration;
    el("course-modal-note").textContent = course.note;

    var stepsList = el("course-modal-steps");
    stepsList.innerHTML = "";
    course.steps.forEach(function (step, i) {
      var li = document.createElement("li");
      li.innerHTML =
        '<span class="course-modal-step-num">0' + (i + 1) + "</span>" +
        '<div><h5>' + step.title + "</h5><p>" + step.desc + "</p></div>";
      stepsList.appendChild(li);
    });
  }

  function openModal(id) {
    if (!COURSES[id]) return;
    openCourseId = id;
    populateModal(id);
    syncModalInquiryButton();
    lastFocused = document.activeElement;
    modal.hidden = false;
    document.body.classList.add("modal-open");
    requestAnimationFrame(function () { modal.classList.add("is-visible"); });
    closeBtn.focus();
  }

  function closeModal() {
    modal.classList.remove("is-visible");
    document.body.classList.remove("modal-open");
    setTimeout(function () { modal.hidden = true; }, 200);
    openCourseId = null;
    if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
  }

  function scrollToInquiry() {
    if (inquirySection) inquirySection.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function toggleInquiry(id) {
    var course = COURSES[id];
    if (!course || !select) return;
    if (select.value === course.title) {
      select.value = "";
    } else {
      select.value = course.title;
      scrollToInquiry();
    }
    syncAllInquiryButtons();
  }

  function setButtonState(btn, isSelected) {
    if (!btn) return;
    if (isSelected) {
      btn.classList.add("is-selected");
      btn.innerHTML = "선택 해제 <span aria-hidden=\"true\">−</span>";
    } else {
      btn.classList.remove("is-selected");
      btn.innerHTML = "문의 담기 <span aria-hidden=\"true\">+</span>";
    }
  }

  function syncAllInquiryButtons() {
    if (!select) return;
    var current = select.value;
    document.querySelectorAll("[data-inquiry-course]").forEach(function (btn) {
      var id = btn.getAttribute("data-inquiry-course");
      var course = COURSES[id];
      setButtonState(btn, course && course.title === current);
    });
    syncModalInquiryButton();
  }

  function syncModalInquiryButton() {
    if (!modalInquiryBtn || !select || !openCourseId) return;
    var course = COURSES[openCourseId];
    var isSelected = course && select.value === course.title;
    if (isSelected) {
      modalInquiryBtn.classList.add("is-selected");
      modalInquiryBtn.innerHTML = "선택 해제 <span aria-hidden=\"true\">−</span>";
    } else {
      modalInquiryBtn.classList.remove("is-selected");
      modalInquiryBtn.innerHTML = "문의 담기 <span aria-hidden=\"true\">+</span>";
    }
  }

  function copyModalLink() {
    var url = window.location.origin + window.location.pathname + "#curriculum";
    var done = function () {
      var original = copyBtn.textContent;
      copyBtn.textContent = "링크 복사됨";
      setTimeout(function () { copyBtn.textContent = original; }, 1800);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(done).catch(function () {
        window.prompt("아래 링크를 복사하세요", url);
      });
    } else {
      window.prompt("아래 링크를 복사하세요", url);
    }
  }

  document.querySelectorAll("[data-open-course]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      openModal(btn.getAttribute("data-open-course"));
    });
  });

  document.querySelectorAll("[data-inquiry-course]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      toggleInquiry(btn.getAttribute("data-inquiry-course"));
    });
  });

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) closeModal();
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal && !modal.hidden) closeModal();
  });
  if (modalInquiryBtn) {
    modalInquiryBtn.addEventListener("click", function () {
      if (openCourseId) {
        toggleInquiry(openCourseId);
        closeModal();
      }
    });
  }
  if (copyBtn) copyBtn.addEventListener("click", copyModalLink);
  if (select) select.addEventListener("change", syncAllInquiryButtons);

  syncAllInquiryButtons();
})();

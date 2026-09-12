(() => {
  "use strict";

  const header = document.querySelector("#site-header");
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#primary-navigation");
  const topButton = document.querySelector("#top-button");
  const desktopQuery = window.matchMedia("(min-width: 960px)");
  const navDropdowns = Array.from(document.querySelectorAll(".nav-dropdown"));

  const ownToggle = (dropdown) => dropdown.querySelector(":scope > .nav-dropdown-toggle");

  const closeDropdown = (dropdown) => {
    dropdown.classList.remove("is-open");
    ownToggle(dropdown)?.setAttribute("aria-expanded", "false");
    // Also collapse any nested dropdowns inside it, so they start fresh next time.
    dropdown.querySelectorAll(".nav-dropdown").forEach((nested) => {
      nested.classList.remove("is-open");
      ownToggle(nested)?.setAttribute("aria-expanded", "false");
    });
  };

  // Closes every dropdown except one being opened and its ancestors/descendants
  // (so opening a nested submenu like 대표강사 doesn't close its parent 강사소개 panel).
  const closeAllDropdowns = (except) => {
    navDropdowns.forEach((dropdown) => {
      if (dropdown === except) return;
      if (except && (dropdown.contains(except) || except.contains(dropdown))) return;
      closeDropdown(dropdown);
    });
  };

  const setMenuState = (isOpen) => {
    if (!menuButton || !navigation) return;
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "메뉴 닫기" : "메뉴 열기");
    navigation.classList.toggle("is-open", isOpen);
    document.body.classList.toggle("menu-open", isOpen);
  };

  const closeMenu = () => {
    setMenuState(false);
    closeAllDropdowns();
  };

  menuButton?.addEventListener("click", () => {
    setMenuState(menuButton.getAttribute("aria-expanded") !== "true");
  });

  navigation?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  navDropdowns.forEach((dropdown) => {
    const toggle = ownToggle(dropdown);
    toggle?.addEventListener("click", (event) => {
      event.stopPropagation();
      const willOpen = !dropdown.classList.contains("is-open");
      closeAllDropdowns(dropdown);
      if (willOpen) {
        dropdown.classList.add("is-open");
        toggle.setAttribute("aria-expanded", "true");
      } else {
        closeDropdown(dropdown);
      }
    });
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".nav-dropdown")) closeAllDropdowns();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  desktopQuery.addEventListener("change", (event) => {
    if (event.matches) closeMenu();
  });

  const updateScrollUI = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 24);
    topButton?.classList.toggle("is-visible", window.scrollY > 480);
  };

  topButton?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  updateScrollUI();
  window.addEventListener("scroll", updateScrollUI, { passive: true });
})();

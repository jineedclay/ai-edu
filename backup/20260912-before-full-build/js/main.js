(() => {
  "use strict";

  const header = document.querySelector("#site-header");
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#primary-navigation");
  const topButton = document.querySelector("#top-button");
  const desktopQuery = window.matchMedia("(min-width: 960px)");

  const setMenuState = (isOpen) => {
    if (!menuButton || !navigation) return;
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "메뉴 닫기" : "메뉴 열기");
    navigation.classList.toggle("is-open", isOpen);
    document.body.classList.toggle("menu-open", isOpen);
  };

  const closeMenu = () => setMenuState(false);

  menuButton?.addEventListener("click", () => {
    setMenuState(menuButton.getAttribute("aria-expanded") !== "true");
  });

  navigation?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
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

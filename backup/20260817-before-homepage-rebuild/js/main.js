(() => {
  "use strict";

  const header = document.querySelector("#site-header");
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#primary-navigation");
  const navLinks = navigation ? navigation.querySelectorAll("a") : [];
  const year = document.querySelector("#current-year");
  const desktopQuery = window.matchMedia("(min-width: 960px)");

  const setMenuState = (isOpen) => {
    if (!menuButton || !navigation) return;

    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "메뉴 닫기" : "메뉴 열기");
    navigation.classList.toggle("is-open", isOpen);
    header?.classList.toggle("menu-active", isOpen);
    document.body.classList.toggle("menu-open", isOpen);
  };

  const closeMenu = () => setMenuState(false);

  menuButton?.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    setMenuState(!isOpen);
  });

  navLinks.forEach((link) => link.addEventListener("click", closeMenu));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  desktopQuery.addEventListener("change", (event) => {
    if (event.matches) closeMenu();
  });

  const updateHeader = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  if (year) year.textContent = String(new Date().getFullYear());
})();

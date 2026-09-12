/**
 * 강사소개(About) 섹션 사진 캐러셀
 * - .instructor-photo-carousel 안의 이미지들을 순서대로 자동 전환합니다.
 * - 사진을 추가/교체하려면 index.html 의 <img> 목록만 수정하면 됩니다.
 */
(() => {
  "use strict";

  const track = document.querySelector("[data-carousel]");
  if (!track) return;

  const slides = Array.from(track.querySelectorAll(".carousel-slide"));
  const dotsWrap = document.querySelector("[data-carousel-dots]");
  if (slides.length <= 1) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let current = 0;
  let timer = null;

  const dots = slides.map((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "carousel-dot";
    dot.setAttribute("aria-label", `${i + 1}번째 사진 보기`);
    dot.addEventListener("click", () => {
      show(i);
      restart();
    });
    dotsWrap?.appendChild(dot);
    return dot;
  });

  const show = (index) => {
    slides[current]?.classList.remove("is-active");
    dots[current]?.classList.remove("is-active");
    current = (index + slides.length) % slides.length;
    slides[current]?.classList.add("is-active");
    dots[current]?.classList.add("is-active");
  };

  const next = () => show(current + 1);

  const restart = () => {
    if (reduceMotion) return;
    window.clearInterval(timer);
    timer = window.setInterval(next, 4200);
  };

  show(0);
  restart();

  track.addEventListener("mouseenter", () => window.clearInterval(timer));
  track.addEventListener("mouseleave", restart);
})();

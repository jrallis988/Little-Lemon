(() => {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  // Mobile nav
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");
  if (toggle && nav) {
    const setOpen = (open) => {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
    };

    toggle.addEventListener("click", (event) => {
      event.stopPropagation();
      setOpen(!nav.classList.contains("is-open"));
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setOpen(false));
    });

    document.addEventListener("click", (event) => {
      if (!nav.classList.contains("is-open")) return;
      const target = event.target;
      if (target instanceof Node && !nav.contains(target) && !toggle.contains(target)) {
        setOpen(false);
      }
    });
  }

  // Role carousel
  const carousel = document.querySelector("[data-carousel]");
  if (carousel) {
    const track = carousel.querySelector(".role-track");
    const prev = carousel.querySelector(".carousel-btn.prev");
    const next = carousel.querySelector(".carousel-btn.next");
    const scrollBy = () => Math.min(320, track.clientWidth * 0.85);

    prev?.addEventListener("click", () => {
      track.scrollBy({ left: -scrollBy(), behavior: "smooth" });
    });
    next?.addEventListener("click", () => {
      track.scrollBy({ left: scrollBy(), behavior: "smooth" });
    });
  }

  // Day timeline tabs
  const items = Array.from(document.querySelectorAll(".timeline-item"));
  items.forEach((item) => {
    const tab = item.querySelector(".timeline-tab");
    tab?.addEventListener("click", () => {
      items.forEach((el) => el.classList.remove("is-active"));
      item.classList.add("is-active");
    });
  });

  // Auto-advance timeline gently
  if (items.length > 1 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    let index = 0;
    setInterval(() => {
      if (document.hidden) return;
      index = (index + 1) % items.length;
      items.forEach((el) => el.classList.remove("is-active"));
      items[index].classList.add("is-active");
    }, 5200);
  }

  // Seconds-on-page counter for CTA
  const counter = document.getElementById("seconds-counter");
  if (counter) {
    const started = performance.now();
    const tick = () => {
      const seconds = Math.max(1, Math.floor((performance.now() - started) / 1000));
      counter.textContent = String(seconds);
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
})();

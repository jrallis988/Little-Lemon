(() => {
  const toast = document.getElementById("toast");
  let toastTimer;

  function showToast(message) {
    if (!toast) return;
    toast.hidden = false;
    toast.textContent = message;
    requestAnimationFrame(() => toast.classList.add("is-visible"));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove("is-visible");
      setTimeout(() => {
        toast.hidden = true;
      }, 250);
    }, 2200);
  }

  /* Mobile nav */
  const navToggle = document.querySelector(".nav-toggle");
  const primaryNav = document.querySelector(".primary-nav");
  const navList = document.getElementById("primary-nav");

  if (navToggle && primaryNav) {
    navToggle.addEventListener("click", () => {
      const open = primaryNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    primaryNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        primaryNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  /* Search */
  const searchBtn = document.querySelector(".search-btn");
  const searchPanel = document.getElementById("search-panel");
  const searchInput = document.getElementById("site-search");

  if (searchBtn && searchPanel && searchInput) {
    searchBtn.addEventListener("click", () => {
      const willOpen = searchPanel.hasAttribute("hidden");
      if (willOpen) {
        searchPanel.removeAttribute("hidden");
        searchBtn.setAttribute("aria-expanded", "true");
        searchInput.focus();
      } else {
        searchPanel.setAttribute("hidden", "");
        searchBtn.setAttribute("aria-expanded", "false");
      }
    });

    searchInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        const q = searchInput.value.trim();
        showToast(q ? `Looking for “${q}”…` : "Try searching for a show or game!");
      }
    });
  }

  /* Hero carousel */
  const slides = [...document.querySelectorAll(".hero-slide")];
  const dots = [...document.querySelectorAll(".hero-dots button")];
  let index = 0;
  let timer;

  function goTo(next) {
    if (!slides.length) return;
    slides[index].classList.remove("is-active");
    slides[index].setAttribute("aria-hidden", "true");
    if (dots[index]) {
      dots[index].classList.remove("is-active");
      dots[index].setAttribute("aria-selected", "false");
    }

    index = (next + slides.length) % slides.length;

    slides[index].classList.add("is-active");
    slides[index].setAttribute("aria-hidden", "false");
    if (dots[index]) {
      dots[index].classList.add("is-active");
      dots[index].setAttribute("aria-selected", "true");
    }
  }

  function startAuto() {
    clearInterval(timer);
    timer = setInterval(() => goTo(index + 1), 6500);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      goTo(i);
      startAuto();
    });
  });

  if (slides.length > 1) startAuto();

  const hero = document.querySelector(".hero");
  if (hero) {
    hero.addEventListener("mouseenter", () => clearInterval(timer));
    hero.addEventListener("mouseleave", startAuto);
  }

  /* Friend / activity feedback */
  document.querySelectorAll(".friend").forEach((btn) => {
    btn.addEventListener("click", () => {
      const name = btn.getAttribute("aria-label") || "Friend";
      showToast(`Hi from ${name}!`);
    });
  });

  document.querySelectorAll(".want-card, .play-card, .make-item, .sprout, .btn-watch").forEach((el) => {
    el.addEventListener("click", (event) => {
      const label =
        el.querySelector(".want-label")?.textContent?.trim() ||
        el.querySelector("strong")?.textContent?.trim() ||
        el.textContent?.trim().replace(/\s+/g, " ").slice(0, 40) ||
        "Let’s go!";
      if (el.getAttribute("href")?.startsWith("#")) {
        showToast(label);
      }
    });
  });

  /* Keyboard carousel */
  document.addEventListener("keydown", (event) => {
    if (event.target.matches("input, textarea, select")) return;
    if (event.key === "ArrowRight") {
      goTo(index + 1);
      startAuto();
    }
    if (event.key === "ArrowLeft") {
      goTo(index - 1);
      startAuto();
    }
  });
})();

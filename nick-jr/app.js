(() => {
  const toast = document.getElementById("toast");
  let toastTimer;

  function showToast(message) {
    if (!toast) return;
    toast.hidden = false;
    toast.textContent = message;
    toast.classList.remove("is-visible");
    // Force reflow so the enter transition always plays
    void toast.offsetWidth;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove("is-visible");
      setTimeout(() => {
        toast.hidden = true;
      }, 280);
    }, 2600);
  }

  /* Mobile nav */
  const navToggle = document.querySelector(".nav-toggle");
  const primaryNav = document.querySelector(".primary-nav");

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
  const searchResults = document.getElementById("search-results");

  const catalog = [
    { label: "Blue’s Clues & You!", type: "Show", href: "#shows", keywords: "blue clues watch" },
    { label: "Dora the Explorer", type: "Show", href: "#shows", keywords: "dora map spanish" },
    { label: "Paw Patrol", type: "Show", href: "#shows", keywords: "paw chase pups rescue" },
    { label: "Bubble Guppies", type: "Show", href: "#shows", keywords: "bubble guppies molly songs" },
    { label: "Watch Something", type: "Activity", href: "#watch", keywords: "watch tv video" },
    { label: "Play a Game", type: "Activity", href: "#play", keywords: "play game controller" },
    { label: "Explore Something", type: "Activity", href: "#explore", keywords: "explore adventure sprouts ocean" },
    { label: "Make Something", type: "Activity", href: "#create", keywords: "make craft coloring drawing music recipes" },
    { label: "Dora’s Map Adventure", type: "Game", href: "#play", keywords: "dora map problem solving" },
    { label: "Number Rescue", type: "Game", href: "#play", keywords: "numbers count rescue" },
    { label: "Alphabet Skidoo", type: "Game", href: "#play", keywords: "letters alphabet blue" },
    { label: "Bubble Lab", type: "Game", href: "#play", keywords: "science bubble lab" },
    { label: "Grown-Ups Area", type: "Page", href: "grown-ups.html", keywords: "parents caregivers schedule tips" },
    { label: "Case Study", type: "Page", href: "case-study.html", keywords: "about design portfolio case study" },
    { label: "Adventure Sprouts", type: "Explore", href: "#explore", keywords: "ocean animals sky nature" },
  ];

  function renderSearchResults(query) {
    if (!searchResults) return;
    const q = query.trim().toLowerCase();
    if (!q) {
      searchResults.hidden = true;
      searchResults.innerHTML = "";
      return;
    }

    const matches = catalog.filter((item) => {
      const hay = `${item.label} ${item.type} ${item.keywords}`.toLowerCase();
      return hay.includes(q) || q.split(/\s+/).every((part) => hay.includes(part));
    }).slice(0, 6);

    if (!matches.length) {
      searchResults.hidden = false;
      searchResults.innerHTML = `<p class="search-empty">No matches for “${query.trim()}”. Try Blue, Dora, or games.</p>`;
      return;
    }

    searchResults.hidden = false;
    searchResults.innerHTML = matches
      .map(
        (item) =>
          `<a class="search-result" role="option" href="${item.href}" data-search-hit>
            <span class="search-result-type">${item.type}</span>
            <span class="search-result-label">${item.label}</span>
          </a>`
      )
      .join("");
  }

  if (searchBtn && searchPanel && searchInput) {
    searchBtn.addEventListener("click", (event) => {
      event.preventDefault();
      const willOpen = searchPanel.hasAttribute("hidden");
      if (willOpen) {
        searchPanel.removeAttribute("hidden");
        searchBtn.setAttribute("aria-expanded", "true");
        searchInput.focus();
        renderSearchResults(searchInput.value);
      } else {
        searchPanel.setAttribute("hidden", "");
        searchBtn.setAttribute("aria-expanded", "false");
        if (searchResults) {
          searchResults.hidden = true;
          searchResults.innerHTML = "";
        }
      }
    });

    searchInput.addEventListener("input", () => {
      renderSearchResults(searchInput.value);
    });

    searchInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        const first = searchResults?.querySelector(".search-result");
        if (first) {
          first.click();
          return;
        }
        const q = searchInput.value.trim();
        showToast(q ? `No exact match for “${q}”` : "Try searching for a show or game!");
      }
      if (event.key === "Escape") {
        searchPanel.setAttribute("hidden", "");
        searchBtn.setAttribute("aria-expanded", "false");
        searchBtn.focus();
      }
    });

    searchResults?.addEventListener("click", (event) => {
      const hit = event.target.closest("[data-search-hit]");
      if (!hit) return;
      searchPanel.setAttribute("hidden", "");
      searchBtn.setAttribute("aria-expanded", "false");
      showToast(`Opening ${hit.querySelector(".search-result-label")?.textContent || "result"}…`);
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
    if (slides.length > 1) {
      timer = setInterval(() => goTo(index + 1), 6500);
    }
  }

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      goTo(i);
      startAuto();
    });
  });

  startAuto();

  const hero = document.querySelector(".hero");
  if (hero) {
    hero.addEventListener("mouseenter", () => clearInterval(timer));
    hero.addEventListener("mouseleave", startAuto);
  }

  /* Friend / activity feedback */
  document.querySelectorAll(".friend").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      const name = btn.getAttribute("aria-label") || "Friend";
      showToast(`Hi from ${name}!`);
    });
  });

  document.querySelectorAll(".want-card").forEach((el) => {
    el.addEventListener("click", () => {
      const label = el.querySelector(".want-label")?.textContent?.trim() || "Let’s go!";
      showToast(label);
    });
  });

  document.querySelectorAll(".play-card").forEach((el) => {
    el.addEventListener("click", () => {
      const label = el.querySelector("strong")?.textContent?.trim() || "Play time!";
      showToast(`Loading ${label}…`);
    });
  });

  document.querySelectorAll(".make-item").forEach((el) => {
    el.addEventListener("click", (event) => {
      event.preventDefault();
      const label = el.textContent?.trim().replace(/\s+/g, " ") || "Create!";
      showToast(label);
    });
  });

  /* Footer concept stubs */
  document.querySelectorAll("[data-toast]").forEach((el) => {
    el.addEventListener("click", (event) => {
      event.preventDefault();
      showToast(el.getAttribute("data-toast") || "Coming soon in this concept.");
    });
  });

  /* Keyboard carousel */
  document.addEventListener("keydown", (event) => {
    if (event.target.matches("input, textarea, select, button")) return;
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

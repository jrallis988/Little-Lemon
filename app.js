(() => {
  const header = document.querySelector("[data-header]");
  const nav = document.querySelector("[data-nav]");
  const toggle = document.querySelector("[data-nav-toggle]");

  const setHeaderState = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  setHeaderState();
  window.addEventListener("scroll", setHeaderState, { passive: true });

  if (toggle && nav && header) {
    toggle.addEventListener("click", () => {
      const open = header.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        header.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  const jumpNav = document.querySelector(".menu-jump");
  if (jumpNav) {
    const scrollToId = (id) => {
      const target = document.getElementById(id);
      if (!target) return;
      const headerH = header ? header.getBoundingClientRect().height : 0;
      const jumpH = jumpNav.getBoundingClientRect().height;
      const top =
        window.scrollY +
        target.getBoundingClientRect().top -
        headerH -
        jumpH -
        12;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    };

    jumpNav.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (event) => {
        const id = link.getAttribute("href")?.slice(1);
        if (!id) return;
        event.preventDefault();
        history.pushState(null, "", `#${id}`);
        scrollToId(id);
      });
    });

    if (location.hash.length > 1) {
      requestAnimationFrame(() => scrollToId(location.hash.slice(1)));
    }
  }

  const openStatus = document.querySelector("[data-open-status]");
  if (openStatus) {
    // Hours in America/New_York — matches published schedule
    const schedule = [
      { days: [1, 2, 3, 4], open: 11 * 60, close: 21 * 60 + 30 }, // Mon–Thu
      { days: [5, 6], open: 11 * 60, close: 22 * 60 + 30 }, // Fri–Sat
      { days: [0], open: 12 * 60, close: 21 * 60 + 30 }, // Sun
    ];

    const now = new Date(
      new Date().toLocaleString("en-US", { timeZone: "America/New_York" })
    );
    const minutes = now.getHours() * 60 + now.getMinutes();
    const day = now.getDay();
    const today = schedule.find((s) => s.days.includes(day));

    const fmt = (mins) => {
      const h = Math.floor(mins / 60);
      const m = mins % 60;
      const ampm = h >= 12 ? "pm" : "am";
      const hr = ((h + 11) % 12) + 1;
      return m ? `${hr}:${String(m).padStart(2, "0")} ${ampm}` : `${hr} ${ampm}`;
    };

    if (!today) {
      openStatus.textContent = "";
    } else if (minutes >= today.open && minutes < today.close) {
      openStatus.dataset.state = "open";
      openStatus.textContent = `Open now · closes ${fmt(today.close)}`;
    } else if (minutes < today.open) {
      openStatus.dataset.state = "soon";
      openStatus.textContent = `Opens today at ${fmt(today.open)}`;
    } else {
      openStatus.dataset.state = "closed";
      openStatus.textContent = "Closed now · see hours below";
    }
  }
})();

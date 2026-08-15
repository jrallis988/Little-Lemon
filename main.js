(() => {
  const header = document.querySelector("[data-header]");
  const nav = document.querySelector("[data-nav]");
  const toggle = document.querySelector("[data-nav-toggle]");
  const year = document.querySelector("[data-year]");
  const form = document.querySelector("#contact-form");
  const status = document.querySelector("[data-form-status]");
  const reelBtn = document.querySelector("[data-reel-play]");
  const reelModal = document.querySelector("[data-reel-modal]");

  if (year) year.textContent = String(new Date().getFullYear());

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (toggle && nav) {
    const setOpen = (open) => {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      document.body.style.overflow = open ? "hidden" : "";
    };

    toggle.addEventListener("click", () => {
      setOpen(!nav.classList.contains("is-open"));
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setOpen(false));
    });
  }

  // Soft parallax on decorative floats
  const floats = document.querySelectorAll("[data-parallax]");
  if (floats.length && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.addEventListener(
      "pointermove",
      (event) => {
        const x = (event.clientX / window.innerWidth - 0.5) * 16;
        const y = (event.clientY / window.innerHeight - 0.5) * 12;
        floats.forEach((el, i) => {
          const depth = (i + 1) * 0.45;
          el.style.translate = `${x * depth}px ${y * depth}px`;
        });
      },
      { passive: true }
    );
  }

  // Reveal sections
  const reveals = document.querySelectorAll(
    ".section-head, .work-item, .process-track li, .about-grid, .contact-panel, .reel-stage"
  );
  reveals.forEach((el) => el.classList.add("reveal"));
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
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  if (reelBtn && reelModal) {
    reelBtn.addEventListener("click", (event) => {
      event.preventDefault();
      if (typeof reelModal.showModal === "function") {
        reelModal.showModal();
      } else {
        reelModal.setAttribute("open", "");
      }
    });

    reelModal.addEventListener("click", (event) => {
      if (event.target === reelModal) reelModal.close?.() || reelModal.removeAttribute("open");
    });
  }

  if (form && status) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.checkValidity()) {
        status.textContent = "Please fill in your name, email, and project notes.";
        status.style.color = "var(--coral-deep)";
        form.reportValidity();
        return;
      }
      status.style.color = "var(--leaf)";
      status.textContent = "Thanks! Your note is ready to send — connect this form to your Playhouse email or form service.";
      form.reset();
    });
  }
})();

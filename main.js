(() => {
  const config = window.PLAYHOUSE_CONFIG || {};
  const header = document.querySelector("[data-header]");
  const nav = document.querySelector("[data-nav]");
  const toggle = document.querySelector("[data-nav-toggle]");
  const year = document.querySelector("[data-year]");
  const form = document.querySelector("#contact-form");
  const status = document.querySelector("[data-form-status]");
  const success = document.querySelector("[data-contact-success]");
  const resetBtn = document.querySelector("[data-contact-reset]");
  const submitBtn = document.querySelector("[data-submit-btn]");

  if (year) year.textContent = String(new Date().getFullYear());

  // Optional absolute OG image once siteUrl is set
  if (config.siteUrl) {
    const og = document.querySelector('meta[property="og:image"]');
    if (og) {
      const raw = og.getAttribute("content") || "";
      if (raw && !/^https?:\/\//i.test(raw)) {
        og.setAttribute("content", `${config.siteUrl.replace(/\/$/, "")}/${raw.replace(/^\//, "")}`);
      }
    }
  }

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

  const reveals = document.querySelectorAll(
    ".section-head, .work-item, .process-track li, .about-studio, .contact-panel, .reel-stage, .film-block, .case-card, .studio-link-card"
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
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  /* Apply config defaults to showreel buttons missing IDs */
  document.querySelectorAll("[data-open-video]").forEach((btn) => {
    if (!btn.getAttribute("data-youtube") && config.showreelYoutube) {
      if ((btn.getAttribute("data-video-title") || "").toLowerCase().includes("showreel")) {
        btn.setAttribute("data-youtube", config.showreelYoutube);
      }
    }
    if (!btn.getAttribute("data-vimeo") && config.showreelVimeo) {
      if ((btn.getAttribute("data-video-title") || "").toLowerCase().includes("showreel")) {
        btn.setAttribute("data-vimeo", config.showreelVimeo);
      }
    }
  });

  /* -------- Shared video modal -------- */
  let modal = document.querySelector("[data-video-modal]");
  if (!modal) {
    modal = document.createElement("dialog");
    modal.className = "video-modal";
    modal.setAttribute("data-video-modal", "");
    modal.innerHTML = `
      <div class="video-modal-shell">
        <div class="video-modal-bar">
          <p class="video-modal-title" data-video-title>Playhouse Animation</p>
          <button type="button" class="btn btn-ghost video-modal-close" data-video-close aria-label="Close video">Close</button>
        </div>
        <div class="video-frame" data-video-frame>
          <div class="video-fallback" data-video-fallback>
            <img src="" alt="" data-video-poster hidden>
            <div class="video-fallback-copy">
              <span class="video-fallback-play" aria-hidden="true"></span>
              <p data-video-message>Trailer coming soon</p>
              <p class="video-fallback-hint">Add your YouTube or Vimeo ID in config.js or on the play button.</p>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  const frame = modal.querySelector("[data-video-frame]");
  const titleEl = modal.querySelector("[data-video-title]");
  const fallback = modal.querySelector("[data-video-fallback]");
  const posterEl = modal.querySelector("[data-video-poster]");
  const messageEl = modal.querySelector("[data-video-message]");
  const closeBtn = modal.querySelector("[data-video-close]");

  const clearFrame = () => {
    frame.querySelectorAll("iframe, video").forEach((node) => node.remove());
    if (fallback) fallback.hidden = false;
  };

  const closeModal = () => {
    clearFrame();
    if (typeof modal.close === "function") modal.close();
    else modal.removeAttribute("open");
  };

  const openModal = ({ title, youtube, vimeo, poster, message }) => {
    clearFrame();
    if (titleEl) titleEl.textContent = title || "Playhouse Animation";
    if (messageEl) messageEl.textContent = message || "Trailer coming soon";

    if (poster && posterEl) {
      posterEl.src = poster;
      posterEl.hidden = false;
    } else if (posterEl) {
      posterEl.hidden = true;
      posterEl.removeAttribute("src");
    }

    let embedUrl = "";
    if (youtube) {
      embedUrl = `https://www.youtube.com/embed/${encodeURIComponent(youtube)}?autoplay=1&rel=0&modestbranding=1`;
    } else if (vimeo) {
      embedUrl = `https://player.vimeo.com/video/${encodeURIComponent(vimeo)}?autoplay=1`;
    }

    if (embedUrl) {
      if (fallback) fallback.hidden = true;
      const iframe = document.createElement("iframe");
      iframe.src = embedUrl;
      iframe.title = title || "Video player";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      iframe.setAttribute("loading", "lazy");
      frame.appendChild(iframe);
    } else if (fallback) {
      fallback.hidden = false;
    }

    if (typeof modal.showModal === "function") modal.showModal();
    else modal.setAttribute("open", "");
  };

  document.querySelectorAll("[data-open-video]").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      openModal({
        title: btn.getAttribute("data-video-title") || btn.getAttribute("aria-label") || "Watch",
        youtube: btn.getAttribute("data-youtube") || "",
        vimeo: btn.getAttribute("data-vimeo") || "",
        poster: btn.getAttribute("data-poster") || "",
        message: btn.getAttribute("data-video-message") || "Trailer coming soon",
      });
    });
  });

  closeBtn?.addEventListener("click", closeModal);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });
  modal.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeModal();
  });

  /* -------- Contact success + Formspree -------- */
  if (form) {
    const showSuccess = () => {
      form.hidden = true;
      if (success) {
        success.hidden = false;
        success.focus?.();
        success.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
      if (status) status.textContent = "";
    };

    const showForm = () => {
      if (success) success.hidden = true;
      form.hidden = false;
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Send a note";
      }
      form.querySelector("input:not(.hp-field), textarea")?.focus();
    };

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!form.checkValidity()) {
        if (status) {
          status.textContent = "Please fill in your name, email, and project notes.";
          status.style.color = "var(--coral-deep)";
        }
        form.reportValidity();
        return;
      }

      // Honeypot: bots that fill hidden field get a fake success
      const gotcha = form.querySelector('[name="_gotcha"]');
      if (gotcha && gotcha.value) {
        showSuccess();
        form.reset();
        return;
      }

      const endpoint = (config.formEndpoint || "").trim();
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending…";
      }

      if (!endpoint) {
        // Local/demo mode until Formspree endpoint is set in config.js
        showSuccess();
        form.reset();
        return;
      }

      try {
        const body = new FormData(form);
        body.delete("_gotcha");
        const res = await fetch(endpoint, {
          method: "POST",
          body,
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error(`Form error ${res.status}`);
        showSuccess();
        form.reset();
      } catch (err) {
        if (status) {
          status.style.color = "var(--coral-deep)";
          status.textContent = "Something went wrong sending your note. Please try again.";
        }
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Send a note";
        }
        console.error(err);
      }
    });

    resetBtn?.addEventListener("click", showForm);
  }
})();

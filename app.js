(() => {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  const config = window.SHIFT_CONFIG || {};

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
    const trackEl = carousel.querySelector(".role-track");
    const prev = carousel.querySelector(".carousel-btn.prev");
    const next = carousel.querySelector(".carousel-btn.next");
    const scrollBy = () => Math.min(320, trackEl.clientWidth * 0.85);

    prev?.addEventListener("click", () => {
      trackEl.scrollBy({ left: -scrollBy(), behavior: "smooth" });
    });
    next?.addEventListener("click", () => {
      trackEl.scrollBy({ left: scrollBy(), behavior: "smooth" });
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

  // Waitlist form
  const form = document.getElementById("waitlist-form");
  const success = document.getElementById("waitlist-success");
  const status = document.getElementById("waitlist-status");
  if (form && success) {
    const fields = ["name", "email", "company", "role"].map((name) => form.elements.namedItem(name));
    const submitBtn = form.querySelector('button[type="submit"]');

    const setInvalid = (el, invalid) => {
      if (!(el instanceof HTMLElement)) return;
      el.classList.toggle("is-invalid", invalid);
    };

    const persistLocal = (entry) => {
      try {
        const key = "shift_waitlist_v1";
        const existing = JSON.parse(localStorage.getItem(key) || "[]");
        existing.push(entry);
        localStorage.setItem(key, JSON.stringify(existing));
      } catch {
        /* ignore */
      }
    };

    const showSuccess = (data) => {
      if (typeof window.shiftTrack === "function") {
        window.shiftTrack("waitlist_success", { role: String(data.role || "") });
      }
      form.hidden = true;
      success.hidden = false;
      if (status) status.hidden = true;
      success.focus();
    };

    const postFormspree = async (data) => {
      const endpoint = config.formspreeEndpoint;
      if (!endpoint) return { ok: false, skipped: true };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          _subject: `Shift waitlist: ${data.company || data.email}`,
        }),
      });

      return { ok: response.ok, status: response.status };
    };

    const openMailto = (data) => {
      if (config.mailtoFallback === false) return;
      const to = config.waitlistEmail || "hello@workingintelligence.com";
      const subject = encodeURIComponent(`Shift waitlist — ${data.company || data.name}`);
      const body = encodeURIComponent(
        [
          `Name: ${data.name}`,
          `Email: ${data.email}`,
          `Company: ${data.company}`,
          `Role: ${data.role}`,
          `Sites: ${data.sites || "—"}`,
          `Submitted: ${new Date().toISOString()}`,
        ].join("\n")
      );
      // Prefer not to navigate away during automated tests / headless
      if (!window.__SHIFT_TEST__) {
        window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
      }
    };

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      let ok = true;
      fields.forEach((el) => {
        if (!(el instanceof HTMLInputElement || el instanceof HTMLSelectElement)) return;
        const valid = el.checkValidity();
        setInvalid(el, !valid);
        if (!valid) ok = false;
      });

      if (!ok) {
        if (status) {
          status.hidden = false;
          status.textContent = "Please fill in the required fields with a valid work email.";
        }
        const firstInvalid = form.querySelector(".is-invalid");
        if (firstInvalid instanceof HTMLElement) firstInvalid.focus();
        return;
      }

      const data = Object.fromEntries(new FormData(form).entries());
      delete data["bot-field"];
      delete data["form-name"];

      const entry = {
        ...data,
        submittedAt: new Date().toISOString(),
        source: location.pathname + location.hash,
      };
      persistLocal(entry);

      if (submitBtn instanceof HTMLButtonElement) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending…";
      }
      if (status) {
        status.hidden = false;
        status.textContent = "";
      }

      try {
        const result = await postFormspree(data);
        if (result.skipped) {
          // No Formspree configured: mailto draft + local success
          openMailto(data);
          showSuccess(data);
          return;
        }
        if (!result.ok) {
          throw new Error(`Formspree status ${result.status}`);
        }
        showSuccess(data);
      } catch (error) {
        console.warn("Waitlist submit failed, falling back to mailto", error);
        openMailto(data);
        showSuccess(data);
        if (status) {
          status.hidden = false;
          status.textContent = "Saved locally. If your email client opened, send the draft to finish.";
        }
      } finally {
        if (submitBtn instanceof HTMLButtonElement) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Request early access";
        }
      }
    });
  }

  // Interactive demo
  const demoRoot = document.querySelector("[data-demo]");
  if (demoRoot) {
    const scenarios = [
      {
        agent: "Calvin · Ops",
        status: "Needs approval",
        heading: "Fill 2 open stations on Friday 6–11pm",
        body: "Two call-outs hit overnight. Calvin matched certified floaters, checked overtime rules, and queued shift offers.",
        meta: ["Impact: floor coverage restored", "Systems: 7shifts · ADP"],
      },
      {
        agent: "Kate · Talent",
        status: "Needs approval",
        heading: "Book interviews for 3 warehouse lead candidates",
        body: "Kate screened overnight applicants, ranked fit against the job profile, and proposed calendar holds for tomorrow.",
        meta: ["Impact: pipeline unblocked", "Systems: Greenhouse · Google Calendar"],
      },
      {
        agent: "Holly · HR",
        status: "Needs approval",
        heading: "Reply to leave request with policy-safe options",
        body: "Holly drafted a clear response with available PTO balance and coverage notes — waiting for your send.",
        meta: ["Impact: manager time saved", "Systems: BambooHR · Slack"],
      },
      {
        agent: "Riley · Compliance",
        status: "Needs approval",
        heading: "Renew 2 food-handler certs before Friday",
        body: "Riley found expirations in the LMS, queued reminders to employees, and flagged the risk for site leads.",
        meta: ["Impact: violation avoided", "Systems: Cornerstone · email"],
      },
    ];

    const steps = Array.from(demoRoot.querySelectorAll("[data-demo-step]"));
    const agentEl = document.getElementById("demo-agent");
    const statusEl = document.getElementById("demo-status");
    const headingEl = document.getElementById("demo-heading");
    const bodyEl = document.getElementById("demo-body");
    const metaEl = document.getElementById("demo-meta");
    const feedbackEl = document.getElementById("demo-feedback");
    let active = 0;
    let autoTimer;

    const render = (index) => {
      active = index;
      const scene = scenarios[index];
      steps.forEach((step, i) => {
        const on = i === index;
        step.classList.toggle("is-active", on);
        step.setAttribute("aria-selected", String(on));
      });
      if (agentEl) agentEl.textContent = scene.agent;
      if (statusEl) {
        statusEl.textContent = scene.status;
        statusEl.dataset.state = "pending";
      }
      if (headingEl) headingEl.textContent = scene.heading;
      if (bodyEl) bodyEl.textContent = scene.body;
      if (metaEl) {
        metaEl.innerHTML = scene.meta.map((item) => `<li>${item}</li>`).join("");
      }
      if (feedbackEl) feedbackEl.textContent = "";
    };

    const go = (index) => {
      render((index + scenarios.length) % scenarios.length);
    };

    steps.forEach((step) => {
      step.addEventListener("click", () => {
        const index = Number(step.getAttribute("data-demo-step") || 0);
        go(index);
        restartAuto();
      });
    });

    demoRoot.querySelectorAll("[data-demo-action]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const action = btn.getAttribute("data-demo-action");
        if (!feedbackEl || !statusEl) return;
        if (action === "approve") {
          statusEl.textContent = "Approved";
          statusEl.dataset.state = "approved";
          feedbackEl.textContent = "Action queued to connected systems. Audit log updated.";
        } else if (action === "snooze") {
          statusEl.textContent = "Snoozed · 2h";
          statusEl.dataset.state = "snoozed";
          feedbackEl.textContent = "We’ll bring this back after the lunch rush.";
        } else {
          statusEl.textContent = "Declined";
          statusEl.dataset.state = "declined";
          feedbackEl.textContent = "No changes sent. Agent will revise with your notes.";
        }
      });
    });

    const restartAuto = () => {
      clearInterval(autoTimer);
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      autoTimer = setInterval(() => {
        if (document.hidden) return;
        go(active + 1);
      }, 7000);
    };

    render(0);
    restartAuto();
  }
})();

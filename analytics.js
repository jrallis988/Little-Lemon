/**
 * Lightweight first-party analytics for Shift.
 * - Queues events in localStorage (shift_analytics_v1)
 * - Optionally forwards to Plausible when window.SHIFT_ANALYTICS.plausibleDomain is set
 * - Respects Do Not Track
 */
(() => {
  const STORAGE_KEY = "shift_analytics_v1";
  const config = window.SHIFT_ANALYTICS || {};
  const dnt =
    navigator.doNotTrack === "1" ||
    window.doNotTrack === "1" ||
    navigator.msDoNotTrack === "1";

  const readQueue = () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  };

  const writeQueue = (events) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(events.slice(-200)));
    } catch {
      /* ignore quota */
    }
  };

  const track = (name, props = {}) => {
    if (dnt || config.enabled === false) return;

    const event = {
      name,
      props,
      path: location.pathname + location.hash,
      ts: new Date().toISOString(),
    };

    const queue = readQueue();
    queue.push(event);
    writeQueue(queue);

    if (config.debug) {
      console.info("[shift:analytics]", event);
    }

    if (config.plausibleDomain && typeof window.plausible === "function") {
      window.plausible(name, { props });
    }
  };

  window.shiftTrack = track;

  // Page view
  track("page_view", { title: document.title });

  // Delegated click tracking for [data-track]
  document.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target.closest("[data-track]") : null;
    if (!target) return;
    track(target.getAttribute("data-track") || "click", {
      label: (target.textContent || "").trim().slice(0, 80),
    });
  });
})();

const GA_ID = process.env.REACT_APP_GA_MEASUREMENT_ID || "";

function ensureDataLayer() {
  if (typeof window === "undefined") return null;
  window.dataLayer = window.dataLayer || [];
  return window.dataLayer;
}

/**
 * Load GA4 when REACT_APP_GA_MEASUREMENT_ID is set at build time.
 * Safe no-op when the ID is missing.
 */
export function initAnalytics() {
  if (!GA_ID || typeof document === "undefined") return;
  if (document.getElementById("wmcc-ga4")) return;

  const script = document.createElement("script");
  script.id = "wmcc-ga4";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", GA_ID, { send_page_view: false });
}

export function trackPageView(path, title) {
  if (typeof window === "undefined") return;
  ensureDataLayer();
  if (typeof window.gtag === "function" && GA_ID) {
    window.gtag("event", "page_view", {
      page_path: path,
      page_title: title,
    });
  }
}

export function trackEvent(name, params = {}) {
  if (typeof window === "undefined") return;
  ensureDataLayer();
  if (typeof window.gtag === "function" && GA_ID) {
    window.gtag("event", name, params);
  }
}

export function trackOutbound(name, params = {}) {
  trackEvent(name, { transport_type: "beacon", ...params });
}

const analytics = {
  initAnalytics,
  trackPageView,
  trackEvent,
  trackOutbound,
};

export default analytics;

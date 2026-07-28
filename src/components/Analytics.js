import { useEffect } from "react";
import { readConsent } from "./CookieConsent";

function loadGoogleAnalytics(id) {
  if (document.getElementById("ga-script")) return;
  const script = document.createElement("script");
  script.id = "ga-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", id, { anonymize_ip: true });
}

function loadPlausible(domain) {
  if (document.getElementById("plausible-script")) return;
  const script = document.createElement("script");
  script.id = "plausible-script";
  script.defer = true;
  script.dataset.domain = domain;
  script.src = "https://plausible.io/js/script.js";
  document.head.appendChild(script);
}

function applyConsent(consent) {
  if (!consent?.analytics) return;
  const gaId = process.env.REACT_APP_GA_MEASUREMENT_ID;
  const plausible = process.env.REACT_APP_PLAUSIBLE_DOMAIN;
  if (gaId) loadGoogleAnalytics(gaId);
  if (plausible) loadPlausible(plausible);
}

export default function Analytics() {
  useEffect(() => {
    applyConsent(readConsent());
    const onConsent = (event) => applyConsent(event.detail);
    window.addEventListener("seascape-consent", onConsent);
    return () => window.removeEventListener("seascape-consent", onConsent);
  }, []);

  return null;
}

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const MEASUREMENT_ID = process.env.REACT_APP_GA_MEASUREMENT_ID;

function ensureScript(id) {
  if (document.getElementById("nhti-ga-script")) return;

  const script = document.createElement("script");
  script.id = "nhti-ga-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", id, { send_page_view: false });
}

export default function Analytics() {
  const location = useLocation();

  useEffect(() => {
    if (!MEASUREMENT_ID) return;
    ensureScript(MEASUREMENT_ID);
  }, []);

  useEffect(() => {
    if (!MEASUREMENT_ID || typeof window.gtag !== "function") return;
    window.gtag("event", "page_view", {
      page_title: document.title,
      page_location: window.location.href,
      page_path: `${location.pathname}${location.search}`,
    });
  }, [location]);

  return null;
}

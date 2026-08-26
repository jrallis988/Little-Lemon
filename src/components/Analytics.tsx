import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Loads Plausible or Google Analytics when env vars are set.
 * No-op in dev unless vars are configured.
 */
export function Analytics() {
  const plausibleDomain = (
    import.meta.env.VITE_PLAUSIBLE_DOMAIN as string | undefined
  )?.trim();
  const gaId = (
    import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined
  )?.trim();

  useEffect(() => {
    if (plausibleDomain) {
      const s = document.createElement("script");
      s.defer = true;
      s.dataset.domain = plausibleDomain;
      s.src = "https://plausible.io/js/script.js";
      document.head.appendChild(s);
      return () => {
        s.remove();
      };
    }

    if (gaId) {
      const loader = document.createElement("script");
      loader.async = true;
      loader.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`;
      document.head.appendChild(loader);

      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag(...args: unknown[]) {
        window.dataLayer?.push(args);
      };
      window.gtag("js", new Date());
      window.gtag("config", gaId, { anonymize_ip: true });

      return () => {
        loader.remove();
        delete window.dataLayer;
        delete window.gtag;
      };
    }
  }, [plausibleDomain, gaId]);

  return null;
}

import { useEffect } from "react";
import { siteConfig } from "../data/siteConfig";

/**
 * Loads GA4 when REACT_APP_GA_MEASUREMENT_ID is set.
 */
function Analytics() {
  useEffect(() => {
    const id = siteConfig.analyticsId;
    if (!id || document.getElementById("gbcc-ga4")) return undefined;

    const script = document.createElement("script");
    script.id = "gbcc-ga4";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", id);

    return undefined;
  }, []);

  return null;
}

export default Analytics;

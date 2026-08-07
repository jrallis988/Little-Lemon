"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { Button } from "@/components/ui/button";

const CONSENT_KEY = "pf-cookie-consent";

type Consent = "accepted" | "rejected" | null;

export function CookieConsent() {
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(CONSENT_KEY);
      if (stored === "accepted" || stored === "rejected") {
        setConsent(stored);
      }
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const choose = (value: Exclude<Consent, null>) => {
    setConsent(value);
    try {
      window.localStorage.setItem(CONSENT_KEY, value);
    } catch {
      /* ignore */
    }
  };

  return (
    <>
      {consent === "accepted" && gtmId ? (
        <>
          <Script id="gtm-init" strategy="afterInteractive">{`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `}</Script>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
              title="Google Tag Manager"
            />
          </noscript>
        </>
      ) : null}

      {ready && consent === null ? (
        <div
          role="dialog"
          aria-label="Cookie consent"
          className="fixed inset-x-3 bottom-16 z-[60] mx-auto max-w-3xl rounded-2xl border border-pf-line bg-white p-4 shadow-[0_16px_40px_-20px_rgba(61,9,88,0.45)] md:bottom-20"
        >
          <p className="text-sm text-pf-ink/80">
            We use cookies and similar tech for analytics and to improve club
            search & join. Accept to enable Google Tag Manager when configured.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button type="button" variant="purple" size="sm" onClick={() => choose("accepted")}>
              Accept
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={() => choose("rejected")}>
              Reject non-essential
            </Button>
            <a
              href="https://www.planetfitness.com/privacy-policy"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center text-xs font-semibold text-pf-purple underline"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      ) : null}
    </>
  );
}

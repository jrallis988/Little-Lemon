"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  COOKIE_CONSENT_KEY,
  readLocalPreference,
  writeLocalPreference,
  type CookieConsentValue,
} from "@/lib/preferences";

export function CookieConsent() {
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = readLocalPreference(COOKIE_CONSENT_KEY);
    setVisible(!stored);
    setReady(true);
  }, []);

  function decide(value: CookieConsentValue) {
    writeLocalPreference(COOKIE_CONSENT_KEY, value);
    setVisible(false);
  }

  if (!ready || !visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-[68px] z-[860] border-t border-border bg-white/95 p-s4 shadow-[0_-8px_28px_rgba(0,20,60,.12)] backdrop-blur-md xl:bottom-0"
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
    >
      <div className="wrap flex flex-col gap-s4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-[640px]">
          <p
            id="cookie-consent-title"
            className="mb-1 text-base font-bold text-blue"
          >
            Cookie preferences
          </p>
          <p
            id="cookie-consent-desc"
            className="m-0 text-sm font-light leading-relaxed text-text-body"
          >
            We use cookies to improve site performance and understand how
            families use care tools. You can accept or decline non-essential
            cookies. See our{" "}
            <Link href="/privacy" className="font-bold text-ocean underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <Button
            type="button"
            variant="outline-ocean"
            size="sm"
            onClick={() => decide("declined")}
          >
            Decline
          </Button>
          <Button
            type="button"
            variant="ocean"
            size="sm"
            onClick={() => decide("accepted")}
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}

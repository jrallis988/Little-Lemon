"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { candidate } from "@/lib/candidate";

export const COOKIE_CONSENT_KEY = "varga-cookie-consent";

export type CookieConsent = "accepted" | "essential" | null;

function readConsent(): CookieConsent {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    if (value === "accepted" || value === "essential") return value;
    return null;
  } catch {
    return null;
  }
}

function writeConsent(value: "accepted" | "essential") {
  window.localStorage.setItem(COOKIE_CONSENT_KEY, value);
  window.dispatchEvent(new Event("varga-cookie-consent"));
}

export function CookieBanner() {
  const titleId = useId();
  const descId = useId();
  const [consent, setConsent] = useState<CookieConsent>(null);
  const [ready, setReady] = useState(false);
  const [showDeclineNote, setShowDeclineNote] = useState(false);

  useEffect(() => {
    setConsent(readConsent());
    setReady(true);
  }, []);

  if (!ready || consent) return null;

  function accept() {
    writeConsent("accepted");
    setConsent("accepted");
    setShowDeclineNote(false);
  }

  function decline() {
    setShowDeclineNote(true);
  }

  function continueEssential() {
    writeConsent("essential");
    setConsent("essential");
    setShowDeclineNote(false);
  }

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[90] p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descId}
    >
      <div className="mx-auto max-w-3xl border border-slate-line bg-warm-white p-5 shadow-xl sm:p-7">
        {!showDeclineNote ? (
          <>
            <h2 id={titleId} className="font-display text-lg text-ink">
              Cookie notice
            </h2>
            <p id={descId} className="mt-3 text-sm leading-relaxed text-slate-text">
              Notice: The {candidate.fullName} campaign uses cookies and similar
              technologies to keep this site working, remember your accessibility
              preferences, process form submissions, and understand how visitors
              use the site.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-text">
              By choosing <strong className="font-semibold text-ink">Accept</strong>,
              you agree to our use of cookies as outlined in our{" "}
              <Link
                href="/privacy"
                className="font-semibold text-red underline underline-offset-2"
              >
                Privacy Policy
              </Link>
              . If you decline optional tracking, you can still browse with
              essential cookies only.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <button type="button" className="btn-primary flex-1" onClick={accept}>
                Accept &amp; Continue
              </button>
              <button type="button" className="btn-secondary flex-1" onClick={decline}>
                Decline Optional Cookies
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 id={titleId} className="font-display text-lg text-ink">
              Optional cookies declined
            </h2>
            <p id={descId} className="mt-3 text-sm leading-relaxed text-slate-text">
              You declined optional tracking cookies. You can continue using this
              site with essential cookies only (needed for basic function and
              accessibility settings). Analytics and non-essential tracking will
              stay off.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-text">
              Prefer to leave entirely? You can return to your previous page or
              go to{" "}
              <a
                href="https://www.google.com"
                className="font-semibold text-red underline underline-offset-2"
              >
                Google
              </a>
              .
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                className="btn-primary flex-1"
                onClick={continueEssential}
              >
                Continue with Essential Cookies
              </button>
              <button
                type="button"
                className="btn-ghost flex-1"
                onClick={() => setShowDeclineNote(false)}
              >
                Back
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

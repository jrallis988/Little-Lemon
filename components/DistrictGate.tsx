"use client";

import { useEffect, useId, useRef, useState } from "react";

const STORAGE_KEY = "varga-district21-gate";

type GatePhase = "prompt" | "passed" | "not-found";

/**
 * District 21 splash as an overlay — site (hero + nav) stays mounted underneath.
 * Yes → dismiss. No → custom internal 404 with exit back to the site.
 */
export function DistrictGate({ children }: { children: React.ReactNode }) {
  const titleId = useId();
  const descId = useId();
  const yesRef = useRef<HTMLButtonElement>(null);
  const exitRef = useRef<HTMLButtonElement>(null);
  const [phase, setPhase] = useState<GatePhase>("passed");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      setPhase(sessionStorage.getItem(STORAGE_KEY) === "passed" ? "passed" : "prompt");
    } catch {
      setPhase("prompt");
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (phase === "prompt") {
      yesRef.current?.focus();
      return;
    }
    if (phase === "not-found") {
      exitRef.current?.focus();
    }
  }, [phase, ready]);

  function enterSite() {
    try {
      sessionStorage.setItem(STORAGE_KEY, "passed");
    } catch {
      /* ignore */
    }
    setPhase("passed");
  }

  return (
    <>
      {children}

      {ready && phase === "prompt" && (
        <div
          className="district-gate district-gate--prompt"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descId}
        >
          <div className="district-gate__card">
            <p className="district-gate__eyebrow">District 21</p>
            <h1 id={titleId} className="district-gate__title">
              Ready for actual change in District 21?
            </h1>
            <p id={descId} className="district-gate__lead">
              Choose yes to continue to the campaign site.
            </p>
            <div className="district-gate__actions">
              <button
                ref={yesRef}
                type="button"
                className="district-gate__btn district-gate__btn--yes"
                onClick={enterSite}
              >
                Yes
              </button>
              <button
                type="button"
                className="district-gate__btn district-gate__btn--no"
                onClick={() => setPhase("not-found")}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {ready && phase === "not-found" && (
        <div
          className="district-gate district-gate--404"
          role="alertdialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descId}
        >
          <div className="district-gate__card district-gate__card--404">
            <p className="district-gate__code" aria-hidden>
              404
            </p>
            <h1 id={titleId} className="district-gate__title">
              Error 404: Change Not Found in District 21
            </h1>
            <p id={descId} className="district-gate__lead">
              Looks like you’re not ready for the site yet. Exit when you are.
            </p>
            <div className="district-gate__actions">
              <button
                ref={exitRef}
                type="button"
                className="district-gate__btn district-gate__btn--yes"
                onClick={enterSite}
              >
                Exit to main site
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

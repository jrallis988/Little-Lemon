"use client";

import { useEffect, useId, useRef, useState } from "react";

const STORAGE_KEY = "varga-district21-gate";

type GatePhase = "loading" | "prompt" | "passed" | "not-found";

/**
 * First-load splash for District 21.
 * Yes → enter the site. No → custom internal 404 with exit back to the site.
 */
export function DistrictGate({ children }: { children: React.ReactNode }) {
  const titleId = useId();
  const descId = useId();
  const yesRef = useRef<HTMLButtonElement>(null);
  const exitRef = useRef<HTMLButtonElement>(null);
  const [phase, setPhase] = useState<GatePhase>("loading");

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "passed") {
        setPhase("passed");
        return;
      }
    } catch {
      /* private mode / blocked storage — still show gate */
    }
    setPhase("prompt");
  }, []);

  useEffect(() => {
    if (phase === "prompt") {
      yesRef.current?.focus();
      return;
    }
    if (phase === "not-found") {
      exitRef.current?.focus();
    }
  }, [phase]);

  function enterSite() {
    try {
      sessionStorage.setItem(STORAGE_KEY, "passed");
    } catch {
      /* ignore */
    }
    setPhase("passed");
  }

  if (phase === "loading") {
    return (
      <div className="district-gate district-gate--loading" aria-busy="true" aria-live="polite">
        <span className="sr-only">Loading</span>
      </div>
    );
  }

  if (phase === "prompt") {
    return (
      <div className="district-gate district-gate--prompt" role="dialog" aria-modal="true" aria-labelledby={titleId} aria-describedby={descId}>
        <div className="district-gate__card">
          <p className="district-gate__eyebrow">District 21</p>
          <h1 id={titleId} className="district-gate__title">
            Ready for actual change in District 21?
          </h1>
          <p id={descId} className="district-gate__lead">
            Choose yes to continue to the campaign site.
          </p>
          <div className="district-gate__actions">
            <button ref={yesRef} type="button" className="district-gate__btn district-gate__btn--yes" onClick={enterSite}>
              Yes
            </button>
            <button type="button" className="district-gate__btn district-gate__btn--no" onClick={() => setPhase("not-found")}>
              No
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "not-found") {
    return (
      <div className="district-gate district-gate--404" role="alertdialog" aria-modal="true" aria-labelledby={titleId} aria-describedby={descId}>
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
            <button ref={exitRef} type="button" className="district-gate__btn district-gate__btn--yes" onClick={enterSite}>
              Exit to main site
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

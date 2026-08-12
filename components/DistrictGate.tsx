"use client";

import { useEffect, useId, useRef, useState } from "react";

const STORAGE_KEY = "varga-district21-gate";

type GatePhase = "prompt" | "passed" | "not-found";

/**
 * District 21 splash.
 * Yes → enter site. No → full-page 404 (no exit control).
 */
export function DistrictGate({ children }: { children: React.ReactNode }) {
  const titleId = useId();
  const descId = useId();
  const yesRef = useRef<HTMLButtonElement>(null);
  const [phase, setPhase] = useState<GatePhase>("passed");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved === "passed") setPhase("passed");
      else if (saved === "denied") setPhase("not-found");
      else setPhase("prompt");
    } catch {
      setPhase("prompt");
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || phase !== "prompt") return;
    yesRef.current?.focus();
  }, [phase, ready]);

  useEffect(() => {
    if (phase !== "not-found") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [phase]);

  function enterSite() {
    try {
      sessionStorage.setItem(STORAGE_KEY, "passed");
    } catch {
      /* ignore */
    }
    setPhase("passed");
  }

  function denySite() {
    try {
      sessionStorage.setItem(STORAGE_KEY, "denied");
    } catch {
      /* ignore */
    }
    setPhase("not-found");
  }

  if (ready && phase === "not-found") {
    return (
      <main
        className="district-404"
        role="main"
        aria-labelledby={titleId}
      >
        <h1 id={titleId} className="district-404__title">
          Error 404: Change Not Found in District 21
        </h1>
      </main>
    );
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
                onClick={denySite}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

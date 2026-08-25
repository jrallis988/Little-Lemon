import { MotionPreview, type MotionKind } from "../components/MotionPreview";
import { useState } from "react";

const kinds: MotionKind[] = [
  "intro",
  "series",
  "lowerthird",
  "stat",
  "transition",
  "endcard",
];

export function MotionIdentity() {
  const [kind, setKind] = useState<MotionKind>("intro");

  return (
    <section className="section" id="motion">
      <div className="wrap">
        <p className="section__eyebrow">14 · Motion Identity</p>
        <h2 className="section__title">Fast Enough for Digital Video</h2>
        <p className="section__lede">
          Intro, series sting, lower third, statistic reveal, transition, end card —
          short branded motion, not long logo animations.
        </p>
        <div className="thumb-compare__controls" style={{ marginBottom: "1rem" }}>
          {kinds.map((k) => (
            <button
              key={k}
              type="button"
              className={`btn btn--ghost ${kind === k ? "is-active" : ""}`}
              onClick={() => setKind(k)}
              aria-pressed={kind === k}
            >
              {k}
            </button>
          ))}
        </div>
        <MotionPreview kind={kind} />
        <p className="asset-note" style={{ marginTop: "1rem" }}>
          After Effects comps mirror these timings · Premiere assembles with footage
        </p>
      </div>
    </section>
  );
}

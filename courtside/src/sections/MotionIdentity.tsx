import { useState } from "react";
import { MotionPreview, type MotionKind } from "../components/MotionPreview";
import { LowerThird } from "../components/LowerThird";
import { VideoFrame } from "../components/VideoFrame";
import { photos } from "../data/brand";
import "./Packages.css";

const kinds: MotionKind[] = [
  "intro",
  "series",
  "lowerthird",
  "stat",
  "transition",
  "endcard",
];

const principles = [
  { t: "Timing", d: "Intro 2–3s · Series 2s · L3 in/out 0.3s · Wipe <0.5s" },
  { t: "Movement", d: "Snap ease-out. Accent bar leads. No elastic bounce." },
  { t: "Type", d: "Condensed display enters with slight skew; settles immediately." },
  { t: "Data", d: "Lime numbers reveal with weight. Count-up optional, never bouncy." },
];

export function MotionIdentity() {
  const [kind, setKind] = useState<MotionKind>("intro");

  return (
    <section className="section section--dark" id="motion">
      <div className="wrap">
        <p className="section__eyebrow">Motion language</p>
        <h2 className="section__title">Built for digital video</h2>
        <p className="section__lede">
          A complete sting vocabulary — intro, ID, lower thirds, stats, scores,
          transitions, chapters, end cards — not one lonely motion board.
        </p>

        <div className="stat-rules" style={{ marginBottom: "1.25rem" }}>
          {principles.map((p) => (
            <article key={p.t}>
              <h3>{p.t}</h3>
              <p>{p.d}</p>
            </article>
          ))}
        </div>

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
        <MotionPreview kind={kind} seriesLabel="FILM ROOM" />

        <div className="pkg-grid pkg-grid--3" style={{ marginTop: "1.5rem" }}>
          <VideoFrame photo={photos.athleteWoman} label="Player ID">
            <div className="pkg-corner">
              <LowerThird
                kind="athlete"
                primary="IMANI VALE"
                secondary="Forward · Harbor FC"
                animate={false}
              />
            </div>
          </VideoFrame>
          <VideoFrame label="Score update">
            <div className="gd-score">
              <span>Q4 · 1:04</span>
              <strong style={{ color: "var(--cs-signal)" }}>98–96</strong>
            </div>
          </VideoFrame>
          <VideoFrame photo={photos.handsBall} label="Chapter / Replay">
            <div className="pkg-chapter">
              <span style={{ color: "var(--series-lab)" }}>REPLAY</span>
              <strong>DRIVE</strong>
            </div>
          </VideoFrame>
        </div>
      </div>
    </section>
  );
}

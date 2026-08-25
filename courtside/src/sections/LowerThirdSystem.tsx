import { useState } from "react";
import { LowerThird, type LowerThirdKind } from "../components/LowerThird";
import { VideoFrame } from "../components/VideoFrame";
import { photos } from "../data/brand";

const samples: { kind: LowerThirdKind; primary: string; secondary: string }[] = [
  { kind: "athlete", primary: "MARCUS REED", secondary: "Point Guard · Metro United" },
  { kind: "coach", primary: "ALINA TORRES", secondary: "Head Coach · Metro United" },
  { kind: "reporter", primary: "JAY MOORE", secondary: "COURTSIDE" },
  { kind: "location", primary: "EAST SIDE ATHLETIC", secondary: "Brooklyn, NY" },
  { kind: "statistic", primary: "27.4 PPG", secondary: "Marcus Reed · Season" },
];

export function LowerThirdSystem() {
  const [active, setActive] = useState(0);
  const current = samples[active];

  return (
    <section className="section" id="lowerthirds">
      <div className="wrap">
        <p className="section__eyebrow">12 · Lower-Third System</p>
        <h2 className="section__title">Quick. Readable.</h2>
        <p className="section__lede">
          Athlete, coach, reporter, location, and statistic treatments — subtle
          motion, high clarity.
        </p>

        <div className="thumb-compare__controls" style={{ marginBottom: "1rem" }}>
          {samples.map((s, i) => (
            <button
              key={s.kind}
              type="button"
              className={`btn btn--ghost ${active === i ? "is-active" : ""}`}
              onClick={() => setActive(i)}
              aria-pressed={active === i}
            >
              {s.kind}
            </button>
          ))}
        </div>

        <VideoFrame photo={photos.athletePortrait} label="Lower third preview">
          <div className="pkg-corner">
            <LowerThird
              key={`${current.kind}-${active}`}
              kind={current.kind}
              primary={current.primary}
              secondary={current.secondary}
            />
          </div>
        </VideoFrame>

        <div className="grid-3" style={{ marginTop: "1.25rem" }}>
          {samples.map((s) => (
            <LowerThird
              key={s.kind}
              kind={s.kind}
              primary={s.primary}
              secondary={s.secondary}
              animate={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

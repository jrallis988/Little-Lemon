import { VideoFrame } from "../components/VideoFrame";
import { photos } from "../data/brand";
import "./ShortsConnection.css";

const stages = [
  {
    label: "Full interview",
    ratio: "16/9" as const,
    photo: photos.athletePortrait,
    copy: "Long-form master",
  },
  {
    label: "60s highlight",
    ratio: "9/16" as const,
    photo: photos.athletePortrait,
    copy: "Reframed + punch-in",
  },
  {
    label: "30s quote",
    ratio: "9/16" as const,
    photo: photos.documentary,
    copy: "Vertical quote lockup",
  },
  {
    label: "15s hook",
    ratio: "9/16" as const,
    photo: photos.actionDrive,
    copy: "Cold open energy",
  },
  {
    label: "YouTube Short",
    ratio: "9/16" as const,
    photo: photos.handsBall,
    copy: "Caption-safe graphics",
  },
];

export function ShortsConnection() {
  return (
    <section className="section section--dark" id="shorts">
      <div className="wrap">
        <p className="section__eyebrow">17 · YouTube Shorts Connection</p>
        <h2 className="section__title">Adapt Framing. Don’t Just Crop.</h2>
        <p className="section__lede">
          One production becomes a ladder of vertical assets — graphics and composition
          rebuilt for 9:16, not letterboxed 16:9.
        </p>
        <div className="shorts-flow">
          {stages.map((s, i) => (
            <div key={s.label} className="shorts-flow__item">
              <VideoFrame
                photo={s.photo}
                aspect={s.ratio}
                label={s.label}
                className={s.ratio === "9/16" ? "shorts-flow__vert" : ""}
              >
                {s.ratio === "9/16" ? (
                  <div className="shorts-vert-gfx">
                    <span className="series-tag">THE PLAYER</span>
                    <strong>
                      {i === 2 ? "“THE WORK NOBODY SEES”" : i === 3 ? "WATCH THIS" : "REED"}
                    </strong>
                    <span className="shorts-safe" aria-hidden="true">
                      caption safe
                    </span>
                  </div>
                ) : (
                  <div className="pkg-open">
                    <span className="series-tag">THE PLAYER</span>
                    <strong className="pkg-open__name">MARCUS REED</strong>
                  </div>
                )}
              </VideoFrame>
              <p>{s.copy}</p>
              {i < stages.length - 1 && (
                <span className="shorts-flow__arrow" aria-hidden="true">
                  ↓
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

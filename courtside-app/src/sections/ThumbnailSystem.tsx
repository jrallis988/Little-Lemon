import { YouTubeThumbnail } from "../components/YouTubeThumbnail";
import { ThumbnailComparison } from "../components/ThumbnailComparison";
import { thumbnailRules, thumbnails } from "../data/brand";
import "./ThumbnailSystem.css";

export function ThumbnailSystem() {
  return (
    <section className="section section--emphasis" id="thumbnails">
      <div className="wrap-wide">
        <p className="section__eyebrow">Priority board</p>
        <h2 className="section__title">Thumbnail System</h2>
        <p className="section__lede">
          Strong subject. Clear hierarchy. Limited text. Distinguishable videos —
          unified COURTSIDE source.
        </p>

        <div className="thumb-rules">
          <h3>Rules</h3>
          <ul>
            {thumbnailRules.map((r) => (
              <li key={r.label}>
                <strong>{r.label}</strong>
                <span>{r.rule}</span>
              </li>
            ))}
          </ul>
          <p className="thumb-rules__principle">DISTINGUISHABLE. UNIFIED.</p>
        </div>

        <div className="grid-3" style={{ marginTop: "1.75rem" }}>
          {thumbnails.map((t) => (
            <YouTubeThumbnail key={t.id} concept={t} showCategory />
          ))}
        </div>
      </div>
    </section>
  );
}

export function CompareSection() {
  return (
    <section className="section section--dark" id="compare">
      <div className="wrap">
        <p className="section__eyebrow">Mobile legibility</p>
        <h2 className="section__title">Test at Real Size</h2>
        <p className="section__lede">
          A thumbnail that looks excellent at 1280 × 720 may fail at recommended
          or mobile scale. Compare versions where audiences actually see them.
        </p>
        <ThumbnailComparison
          versionA={thumbnails[0]}
          versionB={{
            ...thumbnails[9],
            category: "Action-focused alternate",
            title: "HUDDLE",
            subtitle: "TEAM",
          }}
          labelA="VERSION A · Athlete"
          labelB="VERSION B · Team"
        />
      </div>
    </section>
  );
}

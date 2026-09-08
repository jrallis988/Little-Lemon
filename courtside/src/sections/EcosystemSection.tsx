import { photos } from "../data/brand";
import "./EcosystemSection.css";

const flow = [
  { id: "feature", label: "Original Feature Video", tone: "hero" },
  { id: "thumb", label: "YouTube Thumbnail" },
  { id: "short", label: "Short / Reel" },
  { id: "stat", label: "Stat Graphic" },
  { id: "community", label: "Community Post" },
  { id: "social", label: "Social Clip" },
  { id: "playlist", label: "Playlist" },
  { id: "end", label: "End Screen / Next Video" },
];

export function EcosystemSection() {
  return (
    <section className="section section--emphasis" id="ecosystem">
      <div className="wrap">
        <p className="section__eyebrow">Priority board</p>
        <h2 className="section__title">One story. Many assets.</h2>
        <p className="section__lede">
          COURTSIDE is a content-production system — not a folder of templates.
          One sports story fans out into coordinated packaging.
        </p>

        <div className="eco-source">
          <img src={photos.athleteWoman} alt="" />
          <div>
            <span>SOURCE PRODUCTION</span>
            <strong>Imani Vale · Athlete Feature</strong>
            <p>One shoot. Multiple packaged outputs across YouTube and social.</p>
          </div>
        </div>

        <ol className="eco-flow">
          {flow.map((n, i) => (
            <li key={n.id} className={n.tone === "hero" ? "eco-flow__hero" : ""}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <strong>{n.label}</strong>
              {i < flow.length - 1 && (
                <em aria-hidden="true">↓</em>
              )}
            </li>
          ))}
        </ol>

        <div className="eco-outputs">
          <article>
            <strong>1</strong>
            <span>Full video</span>
          </article>
          <article>
            <strong>3</strong>
            <span>Shorts</span>
          </article>
          <article>
            <strong>3</strong>
            <span>Thumb variants</span>
          </article>
          <article>
            <strong>1</strong>
            <span>Community post</span>
          </article>
          <article>
            <strong>∞</strong>
            <span>Social clips</span>
          </article>
        </div>
      </div>
    </section>
  );
}

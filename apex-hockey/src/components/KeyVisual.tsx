import { assets, brand } from "../data/content";
import { MediaSlot } from "./MediaSlot";

export function KeyVisual() {
  return (
    <section className="section key-visual" id="key-visual" aria-labelledby="kv-title">
      <div className="section__inner">
        <p className="section__eyebrow">Primary Campaign Artwork</p>
        <h2 id="kv-title" className="section__title">
          Key visual.
        </h2>
        <p className="section__lead">
          The major campaign moment — athlete, stick, product name, headline, and directional
          graphics locked in one composition. Drop finished art into the media slots below.
        </p>

        <article className="kv-board" aria-label="APEX V1 campaign key visual">
          <div className="kv-board__media">
            <MediaSlot
              src={assets.keyVisualAthlete}
              label="Key visual photography"
              ratio="16 / 10"
            />
            <span className="speed-line kv-board__line" />
            <span className="kv-board__slash" aria-hidden="true" />
          </div>
          <div className="kv-board__type">
            <p className="kv-board__product">{brand.product}</p>
            <h3 className="display-xl">{brand.line}</h3>
            <p className="kv-board__support">
              Reaction-ready. Precision-tuned. Built for the release.
            </p>
            <div className="kv-board__meta">
              <span className="stat-num">01</span>
              <span>Campaign Key Visual</span>
            </div>
          </div>
          <div className="kv-board__stick">
            <MediaSlot src={assets.heroProduct} label="Stick product lockup" ratio="3 / 5" />
          </div>
        </article>
      </div>
    </section>
  );
}

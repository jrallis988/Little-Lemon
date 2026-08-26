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
          Thesis, ask, athlete, stick, and rink geometry locked together. Drop finished art into
          the slots — hierarchy stays.
        </p>

        <article className="kv-board" aria-label="APEX campaign key visual">
          <div className="kv-board__media">
            <MediaSlot
              src={assets.keyVisualAthlete}
              label="Key visual photography"
              ratio="16 / 10"
            />
            <span className="kv-board__blueline" aria-hidden="true" />
            <span className="kv-board__trajectory" aria-hidden="true" />
          </div>
          <div className="kv-board__type">
            <p className="kv-board__product">{brand.product}</p>
            <h3 className="display-lg">{brand.thesis}</h3>
            <p className="kv-board__line">{brand.line}</p>
            <p className="kv-board__ask">{brand.ask}</p>
            <div className="kv-board__meta">
              <span className="kv-board__mono">01 · KEY VISUAL</span>
              <span className="kv-board__mono">1.8 SEC WINDOW</span>
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

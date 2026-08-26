import { assets, brand } from "../data/content";
import { MediaSlot } from "./MediaSlot";

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-thesis">
      <div className="hero__bg" aria-hidden="true">
        <MediaSlot
          className="hero__athlete"
          src={assets.heroAthlete}
          label="Ice-level athlete — replaceable"
          ratio="16 / 10"
        />
        <div className="hero__veil" />
        <div className="hero__rink-geometry" aria-hidden="true">
          <span className="geo-blueline" />
          <span className="geo-trajectory" />
          <span className="geo-faceoff" />
        </div>
      </div>

      <div className="hero__content section__inner">
        <p className="section__eyebrow">Hockey Campaign System · Fictional</p>
        <p className="hero__product">{brand.product}</p>
        <h1 id="hero-thesis" className="hero__thesis display-xl">
          {brand.thesis}
        </h1>
        <p className="hero__line-copy">{brand.line}</p>
        <p className="hero__support">
          APEX names the moment preparation becomes performance — then asks competitive players to
          claim it with an Apex Mark.
        </p>
        <div className="btn-row">
          <a className="btn" href="#payoff">
            {brand.ask}
          </a>
          <a className="btn btn--ghost" href="#meaning">
            What APEX Means
          </a>
        </div>
        <p className="hero__mono">14–22 · COMPETITIVE · MARK YOUR WINDOW</p>
      </div>

      <aside className="hero__product-rail" aria-label="Product photography">
        <MediaSlot src={assets.heroProduct} label="Product photography slot" ratio="3 / 5" framed />
        <p className="hero__rail-meta">
          <span>Tool for the window</span>
          <span className="hero__rail-stat">V1</span>
        </p>
      </aside>
    </section>
  );
}

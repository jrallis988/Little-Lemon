import { assets, brand } from "../data/content";
import { MediaSlot } from "./MediaSlot";

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-product">
      <div className="hero__bg" aria-hidden="true">
        <MediaSlot
          className="hero__athlete"
          src={assets.heroAthlete}
          label="Athlete action — full-bleed replaceable"
          ratio="16 / 10"
        />
        <div className="hero__veil" />
        <span className="speed-line hero__line hero__line--1" />
        <span className="speed-line hero__line hero__line--2" />
        <span className="speed-line hero__line hero__line--3" />
        <span className="hero__tick" />
      </div>

      <div className="hero__content section__inner">
        <p className="section__eyebrow">Launch Experience · Fictional Campaign</p>
        <h1 id="hero-product" className="hero__product">
          {brand.product}
        </h1>
        <p className="hero__line-copy display-xl">{brand.line}</p>
        <p className="hero__support">
          The split second between seeing the lane and releasing the puck. Built for competitive
          players who win on reaction time.
        </p>
        <div className="btn-row">
          <a className="btn" href="#key-visual">
            Explore APEX V1
          </a>
          <a className="btn btn--ghost" href="#strategy">
            Creative Strategy
          </a>
        </div>
      </div>

      <aside className="hero__product-rail" aria-label="Product photography">
        <MediaSlot
          src={assets.heroProduct}
          label="Product photography slot"
          ratio="3 / 5"
          framed
        />
        <p className="hero__rail-meta">
          <span>High-performance stick</span>
          <span className="stat-num hero__rail-stat">V1</span>
        </p>
      </aside>
    </section>
  );
}

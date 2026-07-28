import { SITE, asset } from "../data";

export default function Hero() {
  return (
    <section className="hero" id="top" aria-label={`${SITE.name} welcome`}>
      <div className="hero__media" aria-hidden="true">
        <img
          src={asset("/images/seascape-photo2.jpg")}
          alt=""
          width="1600"
          height="900"
          fetchPriority="high"
          decoding="async"
        />
        <div className="hero__shade" />
      </div>

      <div className="hero__content">
        <p className="hero__brand">{SITE.name}</p>
        <h1 className="hero__headline">Sleep by North Beach.</h1>
        <p className="hero__lede">
          A pet-friendly inn at Plaice Cove in Hampton, NH—about {SITE.roomCount}{" "}
          rooms, a gazebo lawn, and the sand just across Ocean Boulevard.
        </p>
        <p className="hero__trust">{SITE.trustLine.join(" · ")}</p>
        <div className="hero__actions">
          <a className="btn btn-primary" href="#rates">
            Book a stay
          </a>
          <a className="btn btn-secondary" href="#rooms">
            View rooms
          </a>
        </div>
      </div>
    </section>
  );
}

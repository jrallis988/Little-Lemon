import { SITE, asset } from "../data";
import Picture from "./Picture";

export default function WinterStay() {
  return (
    <section className="winter section--wide" id="winter" aria-labelledby="winter-title">
      <div className="winter__media" aria-hidden="true">
        <Picture
          src={asset("/images/winter-beach.jpg")}
          alt=""
          width="1600"
          height="1067"
          loading="lazy"
        />
        <div className="winter__shade" />
      </div>
      <div className="section__inner winter__inner">
        <div>
          <p className="section__eyebrow">Off-season</p>
          <h2 className="section__title" id="winter-title">
            Weekly & monthly winter stays.
          </h2>
          <p className="section__copy">
            Seascape Inn stays open year-round. Quieter North Beach weeks and longer
            winter visits are often available—ask about current weekly and monthly options.
          </p>
        </div>
        <div className="winter__actions">
          <a className="btn btn-primary" href="#rates">
            Check winter dates
          </a>
        </div>
      </div>
    </section>
  );
}

import { SITE } from "../data";

export default function WinterStay() {
  return (
    <section className="winter section--wide" id="winter" aria-labelledby="winter-title">
      <div className="section__inner winter__inner">
        <div>
          <p className="section__eyebrow">Off-season</p>
          <h2 className="section__title" id="winter-title">
            Weekly & monthly winter stays.
          </h2>
          <p className="section__copy">
            Seascape Inn stays open year-round. Quieter North Beach weeks and longer
            winter visits are often available—call the front desk for current weekly
            and monthly options.
          </p>
        </div>
        <div className="winter__actions">
          <a className="btn btn-primary" href={SITE.phoneHref}>
            Call {SITE.phone}
          </a>
          <a className="btn btn-ghost winter__ghost" href="#rates">
            Check winter dates
          </a>
        </div>
      </div>
    </section>
  );
}

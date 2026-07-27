import { AMENITIES, GALLERY, SITE, asset } from "../data";

export default function Shore() {
  return (
    <section className="shore section--wide" id="shore" aria-labelledby="shore-title">
      <div className="section__inner shore__grid">
        <div>
          <p className="section__eyebrow">Plaice Cove</p>
          <h2 className="section__title" id="shore-title">
            Quiet Hampton beach days.
          </h2>
          <p className="section__copy">
            {SITE.name} sits about three miles north of the main Hampton Beach
            strip—close enough for an easy visit, far enough for a calmer stay
            on North Beach.
          </p>
          <ul className="shore__list">
            {AMENITIES.map((item) => (
              <li key={item.title}>
                <strong>{item.title}</strong>
                <span>{item.detail}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="shore__visual">
          <img
            src={asset("/images/nh-north-view.jpg")}
            alt="Hampton Beach shoreline looking south from the north end of the beach"
            loading="lazy"
          />
        </div>
      </div>

      <div className="section__inner shore__gallery" aria-label="Around Seascape Inn">
        {GALLERY.map((shot) => (
          <img key={shot.src} src={shot.src} alt={shot.alt} loading="lazy" />
        ))}
      </div>
    </section>
  );
}

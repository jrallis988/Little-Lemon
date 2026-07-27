import { NEARBY, SITE } from "../data";

export default function Location() {
  return (
    <section className="location section--wide" id="location" aria-labelledby="location-title">
      <div className="section__inner location__grid">
        <div>
          <p className="section__eyebrow">Location</p>
          <h2 className="section__title" id="location-title">
            Steps from North Beach in Hampton, NH.
          </h2>
          <p className="section__copy">
            {SITE.address}. {SITE.neighborhood}—a quieter stretch of Ocean
            Boulevard with the sand right across the street.
          </p>

          <ol className="location__directions">
            <li>Follow Ocean Boulevard north from Hampton Beach toward North Beach.</li>
            <li>Look for Seascape Inn at 955 Ocean Blvd in Plaice Cove.</li>
            <li>Park on site, then walk straight across to the beach path.</li>
          </ol>

          <ul className="shore__list">
            {NEARBY.map((spot) => (
              <li key={spot.title}>
                <strong>{spot.title}</strong>
                <span>{spot.detail}</span>
              </li>
            ))}
          </ul>

          <div className="location__actions">
            <a
              className="btn btn-ocean"
              href={SITE.mapLink}
              target="_blank"
              rel="noreferrer"
            >
              Open map
            </a>
            <a className="btn btn-ghost" href={SITE.phoneHref}>
              Call for directions
            </a>
          </div>
        </div>

        <a
          className="location__map"
          href={SITE.mapLink}
          target="_blank"
          rel="noreferrer"
          aria-label="Open Seascape Inn location on OpenStreetMap"
        >
          <img
            src="/images/seascape-photo2.jpg"
            alt="Coastal view near Seascape Inn at Plaice Cove"
            loading="lazy"
          />
          <span className="location__map-badge">
            955 Ocean Blvd · View on OpenStreetMap
          </span>
        </a>
      </div>
    </section>
  );
}

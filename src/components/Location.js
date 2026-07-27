import { NEARBY, SITE } from "../data";

export default function Location() {
  return (
    <section className="location section--wide" id="location" aria-labelledby="location-title">
      <div className="section__inner location__grid">
        <div>
          <p className="section__eyebrow">Location</p>
          <h2 className="section__title" id="location-title">
            Steps from the sand in Seabreeze Cove.
          </h2>
          <p className="section__copy">
            {SITE.address}. Turn left at the cypress stand, park once, and walk
            the boardwalk straight to the water.
          </p>

          <ol className="location__directions">
            <li>From Highway 1, exit onto Shore Road toward the harbor.</li>
            <li>Continue 1.2 miles until you see the Saltline sign on the right.</li>
            <li>Guest parking is behind the office; beach path starts at Room 1.</li>
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
          aria-label="Open Saltline Motel location on OpenStreetMap"
        >
          <img
            src="/images/map-fallback.jpg"
            alt="Coastal view near Saltline Motel in Seabreeze Cove"
            loading="lazy"
          />
          <span className="location__map-badge">
            118 Shore Road · View on OpenStreetMap
          </span>
        </a>
      </div>
    </section>
  );
}

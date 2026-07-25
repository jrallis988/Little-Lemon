import { AMENITIES } from "../data";

export default function Shore() {
  return (
    <section className="shore section--wide" id="shore" aria-labelledby="shore-title">
      <div className="section__inner shore__grid">
        <div>
          <p className="section__eyebrow">The Shore</p>
          <h2 className="section__title" id="shore-title">
            Built for slow beach days.
          </h2>
          <p className="section__copy">
            Saltline sits on a quiet stretch of coastline—close enough to hear
            the surf, far enough from the boardwalk crowds.
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
            src="https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1400&q=80"
            alt="Empty shoreline at golden hour with gentle waves"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

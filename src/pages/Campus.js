import { Link } from "react-router-dom";
import { campusHighlights } from "../data/content";

const gallery = [
  {
    src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80",
    alt: "Graduates celebrating outdoors",
  },
  {
    src: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1200&q=80",
    alt: "Library reading room with long tables",
  },
  {
    src: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80",
    alt: "Students practicing on an outdoor athletic field",
  },
];

function Campus() {
  return (
    <>
      <section className="page-hero">
        <p className="eyebrow">Campus life</p>
        <h1>A full college experience on the Merrimack</h1>
        <p className="page-hero__lede">
          Live, learn, and compete on a 240-acre campus in New Hampshire&apos;s
          capital city — complete with residence halls, lynx athletics, and a
          lively student community.
        </p>
      </section>

      <section className="gallery" aria-label="Campus moments">
        {gallery.map((image) => (
          <figure key={image.src} className="gallery__item">
            <img src={image.src} alt={image.alt} loading="lazy" />
          </figure>
        ))}
      </section>

      <section className="section">
        <div className="highlight-grid">
          {campusHighlights.map((item) => (
            <article key={item.title} className="highlight">
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-band cta-band--compact">
        <div className="cta-band__inner">
          <h2>Come see it for yourself</h2>
          <p>
            From I-93 Exit 15 East to I-393 Exit 1 — follow the signs to 31
            College Drive, Concord.
          </p>
          <Link to="/admissions" className="btn btn--solid">
            Plan a visit
          </Link>
        </div>
      </section>
    </>
  );
}

export default Campus;

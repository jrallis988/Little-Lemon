import { Link } from "react-router-dom";
import { campusHighlights } from "../data/content";

const gallery = [
  {
    src: "/media/residence.jpg",
    alt: "Langley Hall arcade on the NHTI campus",
  },
  {
    src: "/media/lounge.jpg",
    alt: "Residence hall lounge at NHTI",
  },
  {
    src: "/media/athletics.jpg",
    alt: "NHTI Lynx athletics",
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

      <section className="campus-feature" aria-label="NHTI campus film">
        <video
          className="campus-feature__video"
          controls
          playsInline
          poster="/media/campus-hero-poster.jpg"
          preload="metadata"
        >
          <source src="/media/campus-hero-web.mp4" type="video/mp4" />
        </video>
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

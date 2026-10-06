import { Link } from "react-router-dom";
import usePageMeta from "../hooks/usePageMeta";
import {
  residenceHalls,
  residenceMetrics,
  residenceGallery,
  VIRTUAL_TOUR,
} from "../data/campus";

function ResidenceLife() {
  usePageMeta({
    title: "Residence Life",
    description:
      "Live on campus at NHTI in Langley Hall and South Hall — with Strout Hall part of campus residence history and partner housing.",
  });

  return (
    <>
      <section className="page-hero">
        <p className="eyebrow">Residence life</p>
        <h1>Welcome to our house</h1>
        <p className="page-hero__lede">
          NHTI is New Hampshire&apos;s only residential community college —
          with Langley Hall and South Hall for students, and Strout Hall as
          part of the campus residence story.
        </p>
        <div className="hero__actions">
          <a
            className="btn btn--solid"
            href="https://www.nhti.edu/campus-life/residential-life/"
            target="_blank"
            rel="noreferrer"
          >
            Apply for housing
          </a>
          <a
            className="btn btn--ghost-dark"
            href={VIRTUAL_TOUR}
            target="_blank"
            rel="noreferrer"
          >
            Take a Virtual Tour
          </a>
        </div>
      </section>

      <section className="section section--tight" aria-label="Residence Life metrics">
        <div className="metrics-band">
          {residenceMetrics.map((item) => (
            <article key={item.label} className="metric-card">
              <p className="metric-card__value">{item.value}</p>
              <p className="metric-card__label">{item.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-intro">
          <h2>Campus residence facilities</h2>
          <p>
            Three halls shape NHTI&apos;s residential campus — two for student
            living today, and one that continues the college&apos;s housing
            history through community partnership.
          </p>
        </div>
        <div className="hall-grid">
          {residenceHalls.map((hall) => (
            <article key={hall.id} className="hall-card">
              <img src={hall.image} alt={hall.imageAlt} loading="lazy" />
              <div className="hall-card__body">
                <p className="hall-card__capacity">{hall.capacity}</p>
                <h3>{hall.name}</h3>
                <p>{hall.summary}</p>
                {hall.note ? <p className="hall-card__note">{hall.note}</p> : null}
                <ul>
                  {hall.amenities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--muted">
        <div className="section-intro">
          <h2>Life in the halls</h2>
          <p>
            Lounges, study corners, and community spaces — not utility closets.
            Here&apos;s what living on campus actually looks like.
          </p>
        </div>
        <div className="residence-gallery" aria-label="Residence life gallery">
          {residenceGallery.map((image) => (
            <figure key={image.src} className="residence-gallery__item">
              <img src={image.src} alt={image.alt} loading="lazy" />
            </figure>
          ))}
        </div>
      </section>

      <section className="cta-band cta-band--compact">
        <div className="cta-band__inner">
          <h2>Questions about housing?</h2>
          <p>
            Residence Life · 603-230-4044 ·{" "}
            <a href="mailto:NHTIhousing@ccsnh.edu">NHTIhousing@ccsnh.edu</a>
          </p>
          <div className="hero__actions">
            <Link to="/campus" className="btn btn--solid">
              Back to campus life
            </Link>
            <Link to="/admissions" className="btn btn--ghost">
              Plan a visit
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default ResidenceLife;

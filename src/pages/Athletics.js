import { Link } from "react-router-dom";
import usePageMeta from "../hooks/usePageMeta";

const sports = [
  "Men's & Women's Basketball",
  "Men's & Women's Soccer",
  "Baseball & Softball",
  "Men's & Women's Cross Country",
  "Men's & Women's Track & Field",
  "Esports",
];

function Athletics() {
  usePageMeta({
    title: "Athletics",
    description:
      "Cheer on the NHTI Lynx. Competitive athletics, intramurals, and school spirit at Concord's Community College.",
  });

  return (
    <>
      <section className="athletics-hero" aria-label="NHTI Lynx athletics">
        <div className="athletics-hero__glow" aria-hidden="true" />
        <div className="athletics-hero__content">
          <p className="athletics-hero__brand reveal">NHTI Lynx</p>
          <img
            className="athletics-hero__logo reveal reveal--delay-1"
            src="/media/lynx-athletics-logo.png"
            alt="NHTI Athletics — Leroy the Lynx mascot logo"
            width="640"
            height="640"
          />
          <h1 className="athletics-hero__headline reveal reveal--delay-2">
            Always Lynx season.
          </h1>
          <p className="athletics-hero__support reveal reveal--delay-3">
            Compete, cheer, and belong at the Dr. Goldie Crocker Wellness Center.
          </p>
          <div className="hero__actions reveal reveal--delay-3">
            <a
              className="btn btn--solid"
              href="http://nhtiathletics.com"
              target="_blank"
              rel="noreferrer"
            >
              Schedules &amp; scores
            </a>
            <Link to="/admissions" className="btn btn--ghost">
              Become a Lynx
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="athletics-split">
          <div>
            <p className="eyebrow">Leroy the Lynx</p>
            <h2>Pride that shows up every game day</h2>
            <p>
              NHTI Athletics fields competitive USCAA teams and intramural
              options for students who want to stay active. Follow the Lynx for
              live scores, rosters, and campus events.
            </p>
            <a
              className="text-link"
              href="http://nhtiathletics.com"
              target="_blank"
              rel="noreferrer"
            >
              Visit nhtiathletics.com
            </a>
          </div>
          <img
            className="athletics-split__mascot"
            src="/media/leroy-the-lynx.png"
            alt="Leroy the Lynx, NHTI mascot"
            width="700"
            height="420"
            loading="lazy"
          />
        </div>
      </section>

      <section className="section section--muted">
        <div className="news-head">
          <h2>Lynx sports</h2>
          <a
            className="text-link"
            href="http://nhtiathletics.com"
            target="_blank"
            rel="noreferrer"
          >
            Full athletics site
          </a>
        </div>
        <ul className="athletics-sports">
          {sports.map((sport) => (
            <li key={sport}>{sport}</li>
          ))}
        </ul>
      </section>

      <section className="cta-band cta-band--compact">
        <div className="cta-band__inner">
          <h2>More than game day</h2>
          <p>
            Residence halls, clubs, and Concord&apos;s capital-city energy sit
            right beside the Wellness Center.
          </p>
          <div className="hero__actions">
            <Link to="/campus" className="btn btn--solid">
              Campus life
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

export default Athletics;

import { Link } from "react-router-dom";

function About() {
  return (
    <>
      <section className="page-hero">
        <p className="eyebrow">About NHTI</p>
        <h1>Cultivating potential in every learner</h1>
        <p className="page-hero__lede">
          Since 1965, NHTI has grown from New Hampshire Technical Institute into
          Concord&apos;s Community College — still grounded in technical
          excellence, now serving 4,600+ students each year across 80+ programs.
        </p>
      </section>

      <section className="section">
        <div className="story-grid">
          <article>
            <h2>Our story</h2>
            <p>
              NHTI opened with three engineering technology programs and a clear
              mission: prepare students for skilled work that New Hampshire
              needs. In 2008, the college adopted the name NHTI – Concord&apos;s
              Community College to honor that history while reflecting a broader
              community-college mission.
            </p>
          </article>
          <article>
            <h2>Who we serve</h2>
            <p>
              Recent high school graduates, working adults, career changers, and
              transfer-bound students. Many study part-time. Many live on campus.
              All find accessible pathways for lifelong learning, career
              advancement, and civic engagement.
            </p>
          </article>
        </div>
      </section>

      <section className="section section--muted">
        <div className="fact-strip" aria-label="NHTI at a glance">
          <div>
            <p className="fact-strip__value">80+</p>
            <p className="fact-strip__label">Academic programs</p>
          </div>
          <div>
            <p className="fact-strip__value">240</p>
            <p className="fact-strip__label">Acre riverside campus</p>
          </div>
          <div>
            <p className="fact-strip__value">1965</p>
            <p className="fact-strip__label">Founded in Concord</p>
          </div>
          <div>
            <p className="fact-strip__value">NECHE</p>
            <p className="fact-strip__label">Accredited since 1969</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="support-panel">
          <h2>Part of something larger</h2>
          <p>
            NHTI is a member of the Community College System of New Hampshire —
            connecting Concord learners to affordable public higher education
            across the state.
          </p>
          <Link to="/admissions" className="btn btn--solid">
            Begin at NHTI
          </Link>
        </div>
      </section>
    </>
  );
}

export default About;

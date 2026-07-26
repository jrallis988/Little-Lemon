import { Link } from "react-router-dom";
import { programAreas } from "../data/programs";

function Academics() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero-media" aria-hidden="true">
          <img src="/images/students.jpg" alt="" />
          <div className="hero-veil" />
        </div>
        <div className="container page-hero-content">
          <p className="hero-brand">Academics</p>
          <h1>Sixty-plus ways to build your future.</h1>
          <p>
            Associate degrees and certificates in the sciences, healthcare,
            business, technology, and liberal arts — plus specialized programs
            through the Business &amp; Training Center.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-intro narrow">
            <p className="eyebrow">Program areas</p>
            <h2>Discover what you can study at Great Bay.</h2>
            <p>
              Search by focus area below, then connect with advising to map your
              courses, transfer plans, and career goals.
            </p>
          </div>

          <div className="program-list">
            {programAreas.map((area) => (
              <article key={area.id} className="program-block" id={area.id}>
                <div className="program-copy">
                  <h3>{area.title}</h3>
                  <p>{area.description}</p>
                </div>
                <ul>
                  {area.programs.map((program) => (
                    <li key={program}>{program}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container support-grid">
          <div>
            <p className="eyebrow">Student success</p>
            <h2>Support that stays with you.</h2>
            <p>
              The Center for Academic Planning and Support (CAPS) offers advising,
              tutoring, accessibility services, success coaching, and career
              guidance — so you never have to figure it out alone.
            </p>
          </div>
          <ul className="support-list">
            <li>
              <strong>Academic advising</strong>
              <span>Plan your path semester by semester</span>
            </li>
            <li>
              <strong>Tutoring &amp; coaching</strong>
              <span>In-person help plus 24/7 online support</span>
            </li>
            <li>
              <strong>Transfer options</strong>
              <span>Agreements with colleges across New England</span>
            </li>
            <li>
              <strong>Career Center</strong>
              <span>Resume help, internships, and job search support</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container callout-row">
          <div>
            <h2>Questions about programs or courses?</h2>
            <p>
              Contact the Advising and Transfer Center at{" "}
              <a href="mailto:greatbayadvising@ccsnh.edu">
                greatbayadvising@ccsnh.edu
              </a>{" "}
              or call <a href="tel:6034277728">(603) 427-7728</a>. Suite 100,
              Portsmouth Campus.
            </p>
          </div>
          <Link className="btn btn-navy" to="/admissions">
            Talk to Admissions
          </Link>
        </div>
      </section>
    </>
  );
}

export default Academics;

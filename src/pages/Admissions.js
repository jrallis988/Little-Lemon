import { Link } from "react-router-dom";
import { admissionsSteps } from "../data/content";

function Admissions() {
  return (
    <>
      <section className="page-hero">
        <p className="eyebrow">Admissions</p>
        <h1>A clear path from curious to enrolled</h1>
        <p className="page-hero__lede">
          Whether you know your major or you&apos;re still deciding, NHTI makes
          getting started simple — with no application fee and schedules that fit
          real life.
        </p>
        <div className="hero__actions">
          <a
            className="btn btn--solid"
            href="https://www.nhti.edu/admissions/"
            target="_blank"
            rel="noreferrer"
          >
            Apply on NHTI.edu
          </a>
          <Link to="/academics" className="btn btn--ghost-dark">
            Find a program
          </Link>
        </div>
      </section>

      <section className="section">
        <ol className="steps">
          {admissionsSteps.map((item) => (
            <li key={item.step} className="step">
              <span className="step__num">{item.step}</span>
              <div>
                <h2>{item.title}</h2>
                <p>{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="section section--muted">
        <div className="info-columns">
          <article>
            <h2>Financial aid</h2>
            <p>
              Grants, scholarships, and aid counseling help lower the already
              affordable cost of a CCSNH education. Start with FAFSA and an
              Admissions conversation.
            </p>
          </article>
          <article>
            <h2>Transfer-friendly credits</h2>
            <p>
              Degree-specific agreements with UNH, SNHU, Plymouth State, Keene
              State, Colby-Sawyer, and others help you save thousands while
              staying on track.
            </p>
          </article>
          <article>
            <h2>Visit &amp; connect</h2>
            <p>
              Tour the Concord campus, meet faculty, and ask about housing,
              athletics, and online options. Call{" "}
              <a href="tel:6032304001">603-230-4001</a> to schedule.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}

export default Admissions;

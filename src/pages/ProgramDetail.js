import { Link, useParams } from "react-router-dom";
import { getFocusTitle, getProgramById } from "../data/content";

function ProgramDetail() {
  const { programId } = useParams();
  const program = getProgramById(programId);

  if (!program) {
    return (
      <section className="page-hero">
        <p className="eyebrow">Academics</p>
        <h1>Program not found</h1>
        <p className="page-hero__lede">
          That program is not in this catalog demo. Browse all programs to keep
          exploring.
        </p>
        <Link to="/academics" className="btn btn--solid">
          Back to academics
        </Link>
      </section>
    );
  }

  return (
    <>
      <section className="page-hero">
        <p className="eyebrow">{getFocusTitle(program.focus)}</p>
        <h1>{program.name}</h1>
        <p className="page-hero__lede">{program.summary}</p>
        <div className="hero__actions">
          <Link to="/admissions" className="btn btn--solid" state={{ program: program.name }}>
            Start application interest
          </Link>
          <Link to="/academics" className="btn btn--ghost-dark">
            All programs
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="detail-grid">
          <article>
            <h2>Credential</h2>
            <p>{program.credential}</p>
            <p>
              <strong>Format:</strong>{" "}
              {program.online ? "Online options available" : "On-campus / hybrid focused"}
            </p>
            <p>
              <strong>Type:</strong> {program.type === "degree" ? "Degree" : "Certificate"}
            </p>
          </article>
          <article>
            <h2>Program highlights</h2>
            <ul className="plain-list">
              {program.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article>
            <h2>Career directions</h2>
            <ul className="plain-list">
              {program.careers.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="section section--muted">
        <div className="support-panel">
          <h2>Next step</h2>
          <p>
            Ready to enroll or still comparing options? Admissions can walk you
            through prerequisites, aid, and visit opportunities — with a $0
            application fee.
          </p>
          <Link to="/admissions" className="btn btn--solid" state={{ program: program.name }}>
            Talk with Admissions
          </Link>
        </div>
      </section>
    </>
  );
}

export default ProgramDetail;

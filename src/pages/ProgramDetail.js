import { Link, useParams } from "react-router-dom";
import { APPLY_URL, getFocusTitle, getProgramById } from "../data/content";
import usePageMeta from "../hooks/usePageMeta";

function ProgramDetail() {
  const { programId } = useParams();
  const program = getProgramById(programId);

  usePageMeta({
    title: program ? program.name : "Program",
    description: program?.summary,
  });

  if (!program) {
    return (
      <section className="page-hero">
        <p className="eyebrow">Academics</p>
        <h1>Program not found</h1>
        <p className="page-hero__lede">
          That program is not in this catalog. Browse all programs to keep
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
          <a
            className="btn btn--solid"
            href={APPLY_URL}
            target="_blank"
            rel="noreferrer"
          >
            Apply now
          </a>
          <Link
            to="/admissions#inquiry-form"
            className="btn btn--ghost-dark"
            state={{ program: program.name }}
          >
            Request info
          </Link>
        </div>
        <p className="page-hero__follow">
          <a
            className="text-link"
            href={program.catalogUrl}
            target="_blank"
            rel="noreferrer"
          >
            Official catalog
          </a>
        </p>
      </section>

      <section className="section">
        <div className="detail-grid">
          <article>
            <h2>Credential</h2>
            <p>{program.credential}</p>
            <p>
              <strong>Format:</strong>{" "}
              {program.online
                ? "Online options available"
                : "On-campus / hybrid focused"}
            </p>
            <p>
              <strong>Type:</strong>{" "}
              {program.type === "degree" ? "Degree" : "Certificate"}
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
            through prerequisites, aid, housing, and visit opportunities — with a
            $0 application fee.
          </p>
          <Link
            to="/admissions"
            className="btn btn--solid"
            state={{ program: program.name }}
          >
            Talk with Admissions
          </Link>
        </div>
      </section>
    </>
  );
}

export default ProgramDetail;

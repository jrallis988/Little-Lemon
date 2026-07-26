import { Link, useParams } from "react-router-dom";
import PageHero from "../components/PageHero";
import { focusAreas, programs } from "../data/programs";

function ProgramDetail() {
  const { programId } = useParams();
  const program = programs.find((item) => item.id === programId);

  if (!program) {
    return (
      <section className="section">
        <div className="container program-empty">
          <h1>Program not found</h1>
          <p>That program isn’t in our catalog. Browse all programs instead.</p>
          <Link className="btn btn-primary" to="/academics">
            Back to Academics
          </Link>
        </div>
      </section>
    );
  }

  const areas = focusAreas.filter((area) =>
    program.focusAreas.includes(area.id)
  );

  return (
    <>
      <PageHero
        brand={program.kind}
        title={program.title}
        copy={`${program.credential} · ${program.location} Campus`}
        image={program.image || "/images/students.jpg"}
        compact
        actions={[
          {
            label: "Apply Now",
            to: "/admissions/how-to-apply",
            className: "btn btn-gold",
          },
          {
            label: "Browse Programs",
            to: "/academics",
            className: "btn btn-ghost-light",
          },
        ]}
      />

      <section className="section">
        <div className="container program-detail">
          <div className="program-detail-main">
            <p className="eyebrow">Program overview</p>
            <h2>What you’ll study</h2>
            <p>{program.summary}</p>
            <p>
              The {program.title} {program.credential.toLowerCase()} at White
              Mountains Community College is a {program.kind.toLowerCase()} pathway
              grounded in{" "}
              {areas.map((area) => area.title).join(" and ").toLowerCase() ||
                "career and transfer readiness"}
              . Faculty combine academic rigor with practical learning so you can
              move into the workforce or continue to a four-year institution.
            </p>

            <h3>What you can expect</h3>
            <ul className="check-list">
              {(program.outcomes || []).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h3>At a glance</h3>
            <ul className="check-list">
              <li>Credential: {program.credential}</li>
              <li>Program type: {program.kind}</li>
              <li>Campus location: {program.location}</li>
              <li>Learning format: {program.format}</li>
              <li>
                Focus area:{" "}
                {areas.map((area) => area.title).join(", ") || "General studies"}
              </li>
            </ul>

            <h3>Next steps</h3>
            <ol className="numbered-list">
              <li>Review admissions requirements and apply to WMCC.</li>
              <li>Complete placement (if required) and meet with an advisor.</li>
              <li>File the FAFSA using school code 005291.</li>
              <li>Register for courses and begin your first semester.</li>
            </ol>
          </div>

          <aside className="info-panel program-detail-aside">
            <h3>Ready to begin?</h3>
            <p>
              Admissions can help you confirm prerequisites, timelines, and
              whether this {program.kind.toLowerCase()} fits your goals.
            </p>
            <div className="cta-actions stacked">
              <Link className="btn btn-gold" to="/admissions/how-to-apply">
                How to Apply
              </Link>
              <Link className="btn btn-ghost" to="/admissions/visit">
                Visit Campus
              </Link>
              {program.url ? (
                <a
                  className="btn btn-ghost"
                  href={program.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Official Program Page
                </a>
              ) : null}
            </div>
          </aside>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container callout-row">
          <div>
            <h2>Explore related programs</h2>
            <p>
              Stay in {areas[0]?.title || "this focus area"} or browse the full
              catalog.
            </p>
          </div>
          <Link
            className="btn btn-primary"
            to={areas[0] ? `/academics?focus=${areas[0].id}` : "/academics"}
          >
            View Catalog
          </Link>
        </div>
      </section>
    </>
  );
}

export default ProgramDetail;

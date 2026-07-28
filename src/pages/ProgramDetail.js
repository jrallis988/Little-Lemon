import { Link, useParams } from "react-router-dom";
import PageHero from "../components/PageHero";
import NotFound from "./NotFound";
import { focusAreas, programs } from "../data/programs";
import {
  APPLY_URL,
  CATALOG_DEGREES_URL,
  REQUEST_INFO_URL,
} from "../data/links";

function ProgramDetail() {
  const { programId } = useParams();
  const program = programs.find((item) => item.id === programId);

  if (!program) {
    return (
      <NotFound
        title="Program not found"
        copy="That program isn’t in the WMCC catalog on this site. Browse academic programs or try a different search."
      />
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
        copy={`${program.credential} · ${(
          program.locations || [program.location]
        ).join(" · ")}`}
        image={program.image || "/images/students.jpg"}
        compact
        actions={[
          {
            label: "Apply Now",
            to: APPLY_URL,
            external: true,
            className: "btn btn-gold",
          },
          {
            label: "Request Info",
            to: REQUEST_INFO_URL,
            external: true,
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

            {program.details?.length ? (
              <>
                <h3>Program specifics</h3>
                <ul className="check-list">
                  {program.details.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </>
            ) : (
              <p>
                The {program.title} {program.credential.toLowerCase()} at White
                Mountains Community College is a {program.kind.toLowerCase()}{" "}
                pathway grounded in{" "}
                {areas.map((area) => area.title).join(" and ").toLowerCase() ||
                  "career and transfer readiness"}
                . Faculty combine academic rigor with practical learning so you
                can move into the workforce or continue to a four-year
                institution.
              </p>
            )}

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
              <li>
                Campus location:{" "}
                {(program.locations || [program.location]).join(", ")}
              </li>
              <li>Learning format: {program.format}</li>
              <li>
                Focus area:{" "}
                {areas.map((area) => area.title).join(", ") || "General studies"}
              </li>
            </ul>

            <h3>Next steps</h3>
            <ol className="numbered-list">
              <li>Review admissions requirements and apply through CCSNH.</li>
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
              <a
                className="btn btn-gold"
                href={APPLY_URL}
                target="_blank"
                rel="noreferrer"
              >
                Apply Now
              </a>
              <a
                className="btn btn-ghost"
                href={REQUEST_INFO_URL}
                target="_blank"
                rel="noreferrer"
              >
                Request Info
              </a>
              <Link className="btn btn-ghost" to="/admissions/how-to-apply">
                How to Apply
              </Link>
              <a
                className="btn btn-ghost"
                href={program.url || CATALOG_DEGREES_URL}
                target="_blank"
                rel="noreferrer"
              >
                Official Catalog Page
              </a>
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
          <div className="cta-actions">
            <Link
              className="btn btn-primary"
              to={areas[0] ? `/academics?category=${areas[0].id}` : "/academics"}
            >
              Related Programs
            </Link>
            <a
              className="btn btn-gold"
              href={CATALOG_DEGREES_URL}
              target="_blank"
              rel="noreferrer"
            >
              WMCC Catalog
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProgramDetail;

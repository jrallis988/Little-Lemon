import { Link, useParams } from "react-router-dom";
import PageHero from "../components/PageHero";
import { getProgramProfile } from "../data/academicsContent";
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
          <Link className="btn btn-navy" to="/academics">
            Back to Academics
          </Link>
        </div>
      </section>
    );
  }

  const areas = focusAreas.filter((area) => program.focusAreas.includes(area.id));
  const profile = getProgramProfile(program, focusAreas);
  const relatedPrograms = programs
    .filter(
      (item) =>
        item.id !== program.id &&
        item.focusAreas.some((area) => program.focusAreas.includes(area))
    )
    .slice(0, 4);

  return (
    <>
      <PageHero
        brand={program.kind}
        title={program.title}
        copy={`${program.credential} · ${program.location} Campus`}
        image={program.image || "/images/students.jpg"}
        compact
      />

      <section className="section">
        <div className="container program-detail">
          <div className="program-detail-main">
            <p className="eyebrow">Program overview</p>
            <h2>What you’ll study</h2>
            <p>{profile.overview}</p>
            <p>{profile.format}</p>

            <div className="program-section-grid">
              <section>
                <h3>At a glance</h3>
                <ul className="check-list">
                  <li>Credential: {program.credential}</li>
                  <li>Program type: {program.kind}</li>
                  <li>Campus location: {program.location}</li>
                  <li>Focus area: {profile.areaNames.join(", ") || "General studies"}</li>
                </ul>
              </section>
              <section>
                <h3>Learning outcomes</h3>
                <ul className="check-list">
                  {profile.outcomes.map((outcome) => (
                    <li key={outcome}>{outcome}</li>
                  ))}
                </ul>
              </section>
            </div>

            <div className="program-section-grid">
              <section>
                <h3>Sample coursework</h3>
                <ul className="program-chip-list">
                  {profile.courses.map((course) => (
                    <li key={course}>{course}</li>
                  ))}
                </ul>
              </section>
              <section>
                <h3>Career pathways</h3>
                <ul className="program-chip-list">
                  {profile.careers.map((career) => (
                    <li key={career}>{career}</li>
                  ))}
                </ul>
              </section>
            </div>

            <section>
              <h3>Next steps</h3>
              <ol className="numbered-list">
                <li>Review admissions requirements and apply to GBCC.</li>
                <li>Complete placement (if required) and meet with an advisor.</li>
                <li>File the FAFSA using school code 002583.</li>
                <li>Register for courses and begin your first semester.</li>
              </ol>
            </section>
          </div>

          <aside className="info-panel program-detail-aside">
            <h3>Program contact</h3>
            <p>{profile.contact.name}</p>
            <ul>
              <li><a href={`mailto:${profile.contact.email}`}>{profile.contact.email}</a></li>
              <li><a href={`tel:${profile.contact.phone.replace(/[^\d]/g, "")}`}>{profile.contact.phone}</a></li>
            </ul>
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
              <Link className="btn btn-ghost" to="/directory">
                Faculty Directory
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
        <div className="container">
          <div className="section-intro narrow">
            <p className="eyebrow">Related programs</p>
            <h2>Explore nearby pathways in the catalog.</h2>
          </div>
          <div className="program-related-grid">
            {relatedPrograms.map((item) => (
              <article key={item.id} className="mini-card">
                <h3>{item.title}</h3>
                <p>{item.credential}</p>
                <Link className="text-link" to={`/academics/programs/${item.id}`}>
                  View program
                </Link>
              </article>
            ))}
          </div>
          <div className="section-cta">
            <Link
              className="btn btn-navy"
              to={areas[0] ? `/academics?focus=${areas[0].id}` : "/academics"}
            >
              View Catalog
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProgramDetail;

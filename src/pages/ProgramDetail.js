import { Link, Navigate, useParams } from "react-router-dom";
import PageHero from "../components/PageHero";
import Seo from "../components/Seo";
import useReveal from "../hooks/useReveal";
import { getProgram, images, programs } from "../data/content";

export default function ProgramDetail() {
  const { slug } = useParams();
  const program = getProgram(slug);
  const revealRef = useReveal();

  if (!program) {
    return <Navigate to="/programs" replace />;
  }

  const related = programs
    .filter(
      (item) => item.area === program.area && item.slug !== program.slug
    )
    .slice(0, 3);

  const heroImage =
    program.slug === "radiologic-technology"
      ? images.radiology
      : program.slug === "medical-assistant"
        ? images.medicalAssistant
        : program.slug === "early-childhood-education"
          ? images.ece
          : program.slug === "nursing" || program.area === "Health Sciences"
            ? images.healthcare
            : program.area === "STEM & Technology"
              ? images.science
              : program.area === "Business & Accounting"
                ? images.classroom
                : images.community;

  const heroAlt =
    program.slug === "radiologic-technology"
      ? "Radiologic technology students in RVCC’s digital X-ray lab"
      : program.slug === "nursing"
        ? "Nursing students training in an RVCC simulation lab"
        : program.area === "STEM & Technology"
          ? "Students working in an RVCC science laboratory"
          : "Students and campus life at River Valley Community College";

  const facts = [
    { label: "Credential", value: program.credential },
    { label: "Format", value: program.format },
    { label: "Typical length", value: program.duration },
    { label: "Start terms", value: program.startTerms.join(" · ") },
  ];

  const officialHref =
    program.officialUrl ||
    program.catalogUrl ||
    "https://catalog.rivervalley.edu/degrees";

  return (
    <div ref={revealRef}>
      <Seo
        title={program.name}
        description={program.summary}
        path={`/programs/${program.slug}`}
      />
      <PageHero
        eyebrow={program.area}
        title={program.name}
        summary={program.summary}
        image={heroImage}
        imageAlt={heroAlt}
      >
        <div className="flex flex-wrap gap-3">
          <Link to="/admissions" className="btn-primary">
            Start admissions
          </Link>
          <a
            href={officialHref}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary"
          >
            Official requirements
          </a>
        </div>
      </PageHero>

      <section className="border-b border-river/10 bg-white/80">
        <div className="section-shell grid gap-6 py-6 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((fact) => (
            <div key={fact.label}>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-valley">
                {fact.label}
              </p>
              <p className="mt-2 font-display text-base font-semibold leading-snug text-river-deep">
                {fact.value}
              </p>
            </div>
          ))}
        </div>
        {program.selective ? (
          <div className="section-shell border-t border-river/10 pb-5 pt-4">
            <p className="text-sm text-granite-muted">
              <span className="font-semibold text-river-deep">
                Selective admission:
              </span>{" "}
              This pathway may require additional application materials,
              advising, or clinical readiness beyond general college admission.
            </p>
          </div>
        ) : null}
      </section>

      <section className="section-shell grid gap-12 py-12 sm:py-16 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-12">
          <div>
            <p className="eyebrow">What you will build</p>
            <h2 className="display-title mt-3 !text-3xl sm:!text-4xl">
              Skills that travel into real jobs
            </h2>
            <ul className="mt-6 space-y-3">
              {program.highlights.map((item) => (
                <li key={item} className="flex gap-3 text-lg text-granite">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-valley" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow">Prerequisites</p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-river-deep">
              Before you begin
            </h2>
            <ul className="mt-5 space-y-3 text-granite">
              {program.prerequisites.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-river" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="reveal border border-river/15 bg-river-mist/50 p-5 sm:p-6"
            data-reveal
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-valley">
              Source of truth
            </p>
            <h2 className="mt-3 font-display text-xl font-semibold text-river-deep">
              Confirm requirements on the official listing
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-granite-muted">
              Admission details, clinical hours, and tuition for this pathway can
              change. Use the official RVCC catalog or program page before you
              apply.
            </p>
            <a
              href={officialHref}
              target="_blank"
              rel="noreferrer"
              className="btn-primary mt-5 inline-flex"
            >
              Open official requirements
            </a>
          </div>

          <div className="reveal" data-reveal>
            <p className="eyebrow">Careers</p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-river-deep">
              Where this pathway can lead
            </h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {program.careers.map((career) => (
                <li
                  key={career}
                  className="border border-river/15 bg-river-mist/70 px-3 py-2 text-sm font-medium text-river-deep"
                >
                  {career}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-lg leading-relaxed text-granite-muted">
              {program.nextStep}
            </p>
          </div>
        </div>

        <aside className="h-fit border border-river/15 bg-white/80 p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-valley">
            At a glance
          </p>
          <dl className="mt-6 space-y-5">
            <div>
              <dt className="text-sm text-granite-muted">Campuses / formats</dt>
              <dd className="mt-1 font-medium text-river-deep">
                {program.campuses.join(" · ")}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-granite-muted">Focus area</dt>
              <dd className="mt-1 font-medium text-river-deep">{program.area}</dd>
            </div>
            <div>
              <dt className="text-sm text-granite-muted">Next step</dt>
              <dd className="mt-1 text-granite">{program.nextStep}</dd>
            </div>
          </dl>
          <div className="mt-8 flex flex-col gap-3">
            <Link to="/admissions" className="btn-primary w-full text-center">
              Talk with admissions
            </Link>
            <a
              href={officialHref}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost w-full text-center"
            >
              Official requirements
            </a>
            <Link to="/financial-aid" className="btn-ghost w-full text-center">
              Review financial aid
            </Link>
            <Link
              to="/programs"
              className="text-center text-sm font-semibold text-river underline-offset-2 hover:underline"
            >
              Back to all programs
            </Link>
          </div>
        </aside>
      </section>

      {related.length > 0 ? (
        <section className="section-shell pb-16 sm:pb-20">
          <div className="reveal" data-reveal>
            <p className="eyebrow">Related pathways</p>
            <h2 className="display-title mt-3 !text-3xl sm:!text-4xl">
              Keep exploring
            </h2>
          </div>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {related.map((item) => (
              <li key={item.slug} className="reveal" data-reveal>
                <Link
                  to={`/programs/${item.slug}`}
                  className="block border border-river/10 bg-white/60 px-5 py-5 transition hover:-translate-y-0.5 hover:border-river/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-river"
                >
                  <span className="font-display text-lg font-semibold text-river-deep">
                    {item.name}
                  </span>
                  <span className="mt-2 block text-sm text-granite-muted">
                    {item.credential}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}

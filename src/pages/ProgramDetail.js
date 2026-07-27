import { Link, Navigate, useParams } from "react-router-dom";
import PageHero from "../components/PageHero";
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
    program.area === "Health Sciences"
      ? images.healthcare
      : program.area === "STEM & Technology"
        ? images.classroom
        : program.area === "Business & Accounting"
          ? images.programs
          : images.community;

  return (
    <div ref={revealRef}>
      <PageHero
        eyebrow={program.area}
        title={program.name}
        summary={program.summary}
        image={heroImage}
        imageAlt=""
      />

      <section className="section-shell grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="reveal" data-reveal>
          <p className="eyebrow">Pathway overview</p>
          <h2 className="display-title mt-3">What you will build here</h2>
          <ul className="mt-8 space-y-4">
            {program.highlights.map((item) => (
              <li key={item} className="flex gap-3 text-lg text-granite">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-valley" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-lg leading-relaxed text-granite-muted">
            {program.nextStep}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/admissions" className="btn-primary">
              Start admissions
            </Link>
            <Link to="/financial-aid" className="btn-ghost">
              Review financial aid
            </Link>
          </div>
        </div>

        <aside className="reveal border border-river/15 bg-white/70 p-6 sm:p-8" data-reveal>
          <dl className="space-y-6">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-valley">
                Credential
              </dt>
              <dd className="mt-2 font-display text-lg font-semibold text-river-deep">
                {program.credential}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-valley">
                Format
              </dt>
              <dd className="mt-2 text-granite">{program.format}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-valley">
                Focus area
              </dt>
              <dd className="mt-2 text-granite">{program.area}</dd>
            </div>
          </dl>
        </aside>
      </section>

      {related.length > 0 ? (
        <section className="section-shell pb-16 sm:pb-20">
          <div className="reveal" data-reveal>
            <p className="eyebrow">Related pathways</p>
            <h2 className="display-title mt-3">Keep exploring</h2>
          </div>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {related.map((item) => (
              <li key={item.slug} className="reveal" data-reveal>
                <Link
                  to={`/programs/${item.slug}`}
                  className="block border border-river/10 bg-white/60 px-5 py-5 transition hover:-translate-y-0.5 hover:border-river/30"
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

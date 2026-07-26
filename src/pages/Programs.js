import { Link } from "react-router-dom";
import useReveal from "../hooks/useReveal";
import { programAreas } from "../data/content";

export default function Programs() {
  const revealRef = useReveal();

  return (
    <div ref={revealRef}>
      <section className="relative overflow-hidden bg-river-deep pt-28 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(212,160,23,0.22),transparent_40%),linear-gradient(120deg,rgba(26,122,148,0.35),transparent_55%)]" />
        <div className="relative section-shell pb-16 pt-8">
          <p className="eyebrow !text-sunrise">Programs</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Degrees and certificates that meet the moment
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
            Explore academic focus areas across health sciences, STEM, business,
            education, and the liberal arts — offered in person, online, and
            hybrid formats.
          </p>
        </div>
      </section>

      <section className="section-shell py-16 sm:py-20">
        <div className="space-y-16">
          {programAreas.map((area) => (
            <article
              key={area.name}
              className="reveal grid gap-8 border-t border-river/15 pt-10 lg:grid-cols-[0.9fr_1.1fr]"
              data-reveal
            >
              <div>
                <h2 className="font-display text-3xl font-semibold text-river-deep">
                  {area.name}
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-granite-muted">
                  {area.summary}
                </p>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2">
                {area.programs.map((program) => (
                  <li
                    key={program}
                    className="border-b border-river/10 pb-3 font-medium text-granite"
                  >
                    {program}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="reveal mt-16 flex flex-col gap-4 rounded-2xl bg-river-mist px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8" data-reveal>
          <p className="max-w-xl text-lg text-river-deep">
            Not sure which path fits? Admissions can help you map courses,
            transfer options, and financial aid.
          </p>
          <Link to="/admissions" className="btn-primary w-fit shrink-0">
            Talk with admissions
          </Link>
        </div>
      </section>
    </div>
  );
}

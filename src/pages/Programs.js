import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import useReveal from "../hooks/useReveal";
import {
  getProgramsForArea,
  images,
  programAreas,
} from "../data/content";

export default function Programs() {
  const revealRef = useReveal();

  return (
    <div ref={revealRef}>
      <PageHero
        eyebrow="Programs"
        title="Degrees and certificates that meet the moment"
        summary="Explore academic focus areas across health sciences, STEM, business, education, and the liberal arts — offered in person, online, and hybrid formats."
        image={images.programs}
        imageAlt="RVCC students and campus life"
      />

      <section className="section-shell py-16 sm:py-20">
        <div className="space-y-16">
          {programAreas.map((area) => {
            const areaPrograms = getProgramsForArea(area);
            return (
              <article
                key={area.slug}
                className="reveal grid gap-8 border-t border-river/15 pt-10 lg:grid-cols-[0.95fr_1.05fr]"
                data-reveal
              >
                <div>
                  <div className="mb-6 overflow-hidden">
                    <img
                      src={area.image}
                      alt=""
                      className="h-48 w-full object-cover"
                    />
                  </div>
                  <h2 className="font-display text-3xl font-semibold text-river-deep">
                    {area.name}
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-granite-muted">
                    {area.summary}
                  </p>
                </div>
                <ul className="grid gap-3 sm:grid-cols-2 content-start">
                  {areaPrograms.map((program) => (
                    <li key={program.slug}>
                      <Link
                        to={`/programs/${program.slug}`}
                        className="group flex h-full flex-col border border-river/10 bg-white/60 px-4 py-4 transition duration-300 hover:-translate-y-0.5 hover:border-river/30 hover:bg-white"
                      >
                        <span className="font-display text-base font-semibold text-river-deep group-hover:text-river">
                          {program.name}
                        </span>
                        <span className="mt-2 text-sm text-granite-muted">
                          {program.credential}
                        </span>
                        <span className="mt-4 text-sm font-medium text-sunrise">
                          View pathway →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        <div
          className="reveal mt-16 flex flex-col gap-4 bg-river-mist px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8"
          data-reveal
        >
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

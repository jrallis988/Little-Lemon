import { Link } from "react-router-dom";
import useReveal from "../hooks/useReveal";
import {
  campuses,
  getProgramsForArea,
  happening,
  images,
  outcomes,
  programAreas,
  supports,
} from "../data/content";

export default function Home() {
  const revealRef = useReveal();

  return (
    <div ref={revealRef}>
      <section className="relative min-h-[100svh] overflow-hidden text-white">
        <img
          src={images.hero}
          alt="Aerial view of River Valley Community College’s Claremont campus"
          className="absolute inset-0 h-full w-full object-cover object-[center_42%] animate-ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-river-deep/90 via-river-deep/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-river-deep/75 via-transparent to-river-deep/30" />

        <div className="relative section-shell flex min-h-[100svh] flex-col justify-end pb-16 pt-36 sm:pb-20 lg:pb-24">
          <div className="max-w-2xl">
            <p className="animate-fade-in font-display text-xs font-semibold uppercase tracking-[0.24em] text-sunrise sm:text-sm">
              Claremont · Keene · Lebanon
            </p>
            <div className="mt-5 h-px w-24 origin-left bg-sunrise animate-draw-line" />
            <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-white drop-shadow-sm sm:text-6xl lg:text-7xl">
              Soar into your future
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/92 sm:text-xl">
              Affordable degrees and certificates across western New Hampshire —
              with real labs, real support, and people who know your name.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/admissions" className="btn-primary">
                Apply now
              </Link>
              <Link to="/programs" className="btn-secondary">
                Explore programs
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-river/10 bg-white/75">
        <div className="section-shell py-10 sm:py-12">
          <div className="reveal flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between" data-reveal>
            <div>
              <p className="eyebrow">What’s happening</p>
              <h2 className="mt-2 font-display text-2xl font-semibold text-river-deep sm:text-3xl">
                Dates worth putting on your calendar
              </h2>
            </div>
            <Link
              to="/admissions"
              className="text-sm font-semibold text-river underline-offset-2 hover:underline"
            >
              Talk with admissions
            </Link>
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {happening.map((item) => (
              <article
                key={item.title}
                className="reveal border-t border-river/15 pt-5"
                data-reveal
              >
                <h3 className="font-display text-xl font-semibold text-river-deep">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-granite-muted">
                  {item.detail}
                </p>
                <Link
                  to={item.to}
                  className="mt-4 inline-flex text-sm font-semibold text-sunrise transition hover:text-river-deep"
                >
                  {item.cta} →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-20 sm:py-24">
        <div className="reveal grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]" data-reveal>
          <div>
            <p className="eyebrow">Why students choose RVCC</p>
            <h2 className="display-title mt-3">
              A college built around the life you already have
            </h2>
            <p className="body-copy mt-5">
              Study in person, online, or both. Nearly nine in ten students
              receive financial aid, and every campus offers food access, transit
              support, and people who know your name.
            </p>
          </div>
          <div className="overflow-hidden">
            <img
              src={images.science}
              alt="Students and faculty working in an RVCC science lab"
              className="h-72 w-full object-cover sm:h-80"
            />
          </div>
        </div>

        <div className="mt-12 grid gap-10 border-t border-river/15 pt-10 md:grid-cols-3">
          {supports.map((item) => (
            <article key={item.title} className="reveal" data-reveal>
              <h3 className="font-display text-xl font-semibold text-river-deep">
                {item.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-granite-muted">
                {item.copy}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden py-20 sm:py-24">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(10,92,117,0.08),rgba(36,92,59,0.1))]" />
        <div className="relative section-shell">
          <div
            className="reveal flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
            data-reveal
          >
            <div className="max-w-2xl">
              <p className="eyebrow">Programs</p>
              <h2 className="display-title mt-3">
                Pathways that lead somewhere real
              </h2>
              <p className="body-copy mt-5">
                From allied health to cybersecurity, find a focused credential or
                an associate degree that opens the next door.
              </p>
            </div>
            <Link to="/programs" className="btn-ghost w-fit shrink-0">
              View all programs
            </Link>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {programAreas.map((area) => {
              const areaPrograms = getProgramsForArea(area);
              return (
                <article
                  key={area.slug}
                  className="reveal group overflow-hidden border border-river/10 bg-white/70 transition duration-300 hover:-translate-y-1 hover:border-river/25"
                  data-reveal
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={area.image}
                      alt=""
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-river-deep/40 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-2xl font-semibold text-river-deep">
                      {area.name}
                    </h3>
                    <p className="mt-3 max-w-md text-base leading-relaxed text-granite-muted">
                      {area.summary}
                    </p>
                    <ul className="mt-5 space-y-2 text-sm text-granite">
                      {areaPrograms.slice(0, 5).map((program) => (
                        <li key={program.slug}>
                          <Link
                            to={`/programs/${program.slug}`}
                            className="inline-flex items-center gap-2 font-medium text-river transition hover:text-river-deep"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-valley" />
                            {program.name}
                          </Link>
                        </li>
                      ))}
                      {areaPrograms.length > 5 ? (
                        <li>
                          <Link
                            to="/programs"
                            className="inline-flex items-center gap-2 font-medium text-sunrise transition hover:text-river-deep"
                          >
                            + {areaPrograms.length - 5} more pathways
                          </Link>
                        </li>
                      ) : null}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-shell py-20 sm:py-24">
        <div className="reveal max-w-3xl" data-reveal>
          <p className="eyebrow">Campuses</p>
          <h2 className="display-title mt-3">
            Three places to belong in the river valley
          </h2>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {campuses.map((campus, index) => (
            <article
              key={campus.name}
              className="reveal overflow-hidden"
              data-reveal
              style={{ transitionDelay: `${index * 0.08}s` }}
            >
              <img
                src={campus.image}
                alt={`${campus.name} campus`}
                className="h-44 w-full object-cover"
              />
              <div className="border-l border-river/20 pl-5 pt-5">
                <p className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-valley">
                  {campus.role}
                </p>
                <h3 className="mt-3 font-display text-2xl font-semibold text-river-deep">
                  {campus.name}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-granite-muted">
                  {campus.detail}
                </p>
                <p className="mt-3 text-sm text-granite">{campus.address}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell pb-8">
        <div
          className="reveal overflow-hidden bg-river-deep text-white"
          data-reveal
        >
          <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
            <img
              src={images.testimonial}
              alt="Diane Cammarata, RVCC Class of 2019"
              className="h-64 w-full object-cover object-top lg:h-full"
            />
            <div className="flex flex-col justify-center px-6 py-12 sm:px-10 sm:py-14">
              <blockquote className="max-w-xl">
                <p className="font-display text-2xl font-medium leading-snug sm:text-3xl">
                  “I am grateful for all of the encouragement I received while I
                  was here. Every bit of help really mattered to me.”
                </p>
                <footer className="mt-6 text-sm uppercase tracking-[0.16em] text-sunrise">
                  Diane Cammarata, Class of ’19
                </footer>
              </blockquote>

              <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-white/15 pt-8">
                {outcomes.map((item) => (
                  <div key={item.label}>
                    <dt className="font-display text-3xl font-semibold text-white">
                      {item.value}
                    </dt>
                    <dd className="mt-2 text-sm leading-snug text-white/70">
                      {item.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell py-16 sm:py-20">
        <div
          className="reveal flex flex-col gap-6 md:flex-row md:items-center md:justify-between"
          data-reveal
        >
          <div className="max-w-2xl">
            <h2 className="display-title">Ready when you are</h2>
            <p className="body-copy mt-4">
              Start with admissions, talk through financial aid, and find the
              program that fits your next chapter.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/admissions" className="btn-primary">
              Start your application
            </Link>
            <Link to="/financial-aid" className="btn-ghost">
              Explore financial aid
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

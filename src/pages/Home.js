import { Link } from "react-router-dom";
import useReveal from "../hooks/useReveal";
import { campuses, outcomes, programAreas, supports } from "../data/content";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2000&q=80";

export default function Home() {
  const revealRef = useReveal();

  return (
    <div ref={revealRef}>
      <section className="relative min-h-[100svh] overflow-hidden text-white">
        <img
          src={HERO_IMAGE}
          alt="Mist rising over a green New England river valley"
          className="absolute inset-0 h-full w-full object-cover animate-ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-river-deep/90 via-river-deep/70 to-valley/35" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(212,160,23,0.18),transparent_42%)]" />

        <div className="relative section-shell flex min-h-[100svh] flex-col justify-end pb-16 pt-28 sm:pb-20 lg:pb-24">
          <div className="max-w-3xl">
            <p className="animate-fade-up font-display text-sm font-semibold uppercase tracking-[0.28em] text-sunrise sm:text-base">
              River Valley Community College
            </p>
            <div className="mt-4 h-px w-24 origin-left scale-x-0 bg-sunrise animate-draw-line" />
            <h1 className="animate-fade-up-delay mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Soar into your future
            </h1>
            <p className="animate-fade-up-delay-2 mt-6 max-w-xl text-lg leading-relaxed text-white/85 sm:text-xl">
              Affordable degrees and certificates across Claremont, Keene, and
              Lebanon — with the support to finish strong.
            </p>
            <div className="animate-fade-up-delay-3 mt-9 flex flex-wrap gap-3">
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

      <section className="section-shell py-20 sm:py-24">
        <div className="reveal max-w-3xl" data-reveal>
          <p className="eyebrow">Why students choose RVCC</p>
          <h2 className="display-title mt-3">
            A college built around the life you already have
          </h2>
          <p className="body-copy mt-5">
            Study in person, online, or both. Nearly nine in ten students receive
            financial aid, and every campus offers food access, transit support,
            and people who know your name.
          </p>
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
          <div className="reveal flex flex-col gap-6 md:flex-row md:items-end md:justify-between" data-reveal>
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

          <div className="mt-12 grid gap-x-10 gap-y-12 md:grid-cols-2">
            {programAreas.map((area) => (
              <article key={area.name} className="reveal" data-reveal>
                <h3 className="font-display text-2xl font-semibold text-river-deep">
                  {area.name}
                </h3>
                <p className="mt-3 max-w-md text-base leading-relaxed text-granite-muted">
                  {area.summary}
                </p>
                <ul className="mt-5 space-y-2 text-sm text-granite">
                  {area.programs.slice(0, 4).map((program) => (
                    <li key={program} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-valley" />
                      <span>{program}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
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
              className="reveal border-l border-river/20 pl-5"
              data-reveal
              style={{ transitionDelay: `${index * 0.08}s` }}
            >
              <p className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-valley">
                {campus.role}
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold text-river-deep">
                {campus.name}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-granite-muted">
                {campus.detail}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell pb-8">
        <div className="reveal overflow-hidden rounded-2xl bg-river-deep px-6 py-12 text-white sm:px-10 sm:py-14" data-reveal>
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <blockquote className="max-w-xl">
              <p className="font-display text-2xl font-medium leading-snug sm:text-3xl">
                “I am grateful for all of the encouragement I received while I
                was here. Every bit of help really mattered to me.”
              </p>
              <footer className="mt-6 text-sm uppercase tracking-[0.16em] text-sunrise">
                Diane Cammarata, Class of ’19
              </footer>
            </blockquote>

            <dl className="grid grid-cols-2 gap-6 border-t border-white/15 pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
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
      </section>

      <section className="section-shell py-16 sm:py-20">
        <div className="reveal flex flex-col gap-6 md:flex-row md:items-center md:justify-between" data-reveal>
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
            <Link to="/about" className="btn-ghost">
              Meet RVCC
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

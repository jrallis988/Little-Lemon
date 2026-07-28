import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import Seo from "../components/Seo";
import useReveal from "../hooks/useReveal";
import {
  campuses,
  contact,
  images,
  lifeSupports,
  portalLinks,
  studentOps,
  studentResources,
} from "../data/content";

export default function StudentLife() {
  const revealRef = useReveal();

  return (
    <div ref={revealRef}>
      <Seo
        title="Student Life"
        description="Food access, transit support, advising, and the EasyLogin → register → pay flow for River Valley Community College students."
        path="/student-life"
      />
      <PageHero
        eyebrow="Student Life"
        title="Support that shows up when life gets busy"
        summary="Food access, free bus passes, library help, and campuses designed for real schedules — not just the ideal semester."
        image={images.community}
        imageAlt="Students gathering outdoors at River Valley Community College"
      />

      <section className="border-b border-river/15 bg-river-deep text-white">
        <div className="section-shell py-10 sm:py-12">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sunrise">
              Current students
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              EasyLogin · Register · Pay
            </h2>
          </div>
          <ol className="mt-8 grid gap-8 lg:grid-cols-3">
            {studentOps.map((item) => (
              <li key={item.key} className="border-t border-white/15 pt-5">
                <p className="font-mono text-xs tracking-wide text-sunrise">
                  {item.key} · {item.code}
                </p>
                <h3 className="mt-3 font-display text-xl font-semibold">
                  {item.title}
                </h3>
                <ol className="mt-4 space-y-2 font-mono text-[13px] leading-relaxed text-white/75">
                  {item.steps.map((step, index) => (
                    <li key={step}>
                      <span className="text-sunrise">{index + 1}.</span> {step}
                    </li>
                  ))}
                </ol>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex font-mono text-xs font-semibold uppercase tracking-[0.14em] text-sunrise underline-offset-4 hover:underline"
                >
                  {item.cta} →
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-shell grid gap-10 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="reveal" data-reveal>
          <p className="eyebrow">Everyday support</p>
          <h2 className="display-title mt-3">
            Built for working students and caregivers
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {lifeSupports.map((item) => (
              <article key={item.title}>
                <h3 className="font-display text-xl font-semibold text-river-deep">
                  {item.title}
                </h3>
                <p className="mt-3 leading-relaxed text-granite-muted">
                  {item.copy}
                </p>
              </article>
            ))}
          </div>
        </div>
        <div className="reveal overflow-hidden" data-reveal>
          <img
            src={images.foodPantry}
            alt="Food pantry shelves stocked for RVCC students"
            className="h-full min-h-[18rem] w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,rgba(231,242,245,0.85),rgba(246,251,252,0.2))] py-16 sm:py-20">
        <div className="section-shell">
          <div className="reveal max-w-2xl" data-reveal>
            <p className="eyebrow">Student success</p>
            <h2 className="display-title mt-3">Resources beyond the classroom</h2>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {studentResources.map((item) => (
              <article
                key={item.title}
                className="reveal border-t border-river/15 pt-5"
                data-reveal
              >
                <h3 className="font-display text-xl font-semibold text-river-deep">
                  {item.title}
                </h3>
                <p className="mt-3 leading-relaxed text-granite-muted">
                  {item.copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-16 sm:py-20">
        <div className="reveal max-w-2xl" data-reveal>
          <p className="eyebrow">My RVCC & CCSNH</p>
          <h2 className="display-title mt-3">Tools current students use daily</h2>
          <p className="body-copy mt-4">
            Sign in for Canvas, SIS, email, course schedules, and campus
            resources. Need help? Call {contact.itHelp.phone} or email{" "}
            <a
              href={`mailto:${contact.itHelp.email}`}
              className="font-semibold text-river underline-offset-2 hover:underline"
            >
              {contact.itHelp.email}
            </a>
            .
          </p>
        </div>
        <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {portalLinks.map((link) => (
            <li key={link.label} className="reveal border-t border-river/15 pt-5" data-reveal>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="font-display text-lg font-semibold text-river-deep transition hover:text-river"
              >
                {link.label} →
              </a>
              <p className="mt-2 text-sm leading-relaxed text-granite-muted">
                {link.detail}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="relative overflow-hidden py-16 sm:py-20">
        <img
          src={images.campus}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-river-deep/88" />
        <div className="relative section-shell text-white">
          <div className="reveal max-w-2xl" data-reveal>
            <p className="eyebrow !text-sunrise">Campuses</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Belong in Claremont, Keene, or Lebanon
            </h2>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {campuses.map((campus) => (
              <article key={campus.name} className="reveal" data-reveal>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sunrise">
                  {campus.role}
                </p>
                <h3 className="mt-3 font-display text-2xl font-semibold">
                  {campus.name}
                </h3>
                <p className="mt-3 text-white/75">{campus.detail}</p>
                <p className="mt-3 text-sm text-white/60">{campus.hours}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-16 sm:py-20">
        <div
          className="reveal flex flex-col gap-6 md:flex-row md:items-center md:justify-between"
          data-reveal
        >
          <div className="max-w-2xl">
            <h2 className="display-title">Need a hand getting started?</h2>
            <p className="body-copy mt-4">
              Admissions can connect you with advising, orientation, and campus
              resources before your first class.
            </p>
          </div>
          <Link to="/admissions" className="btn-primary w-fit">
            Reach admissions
          </Link>
        </div>
      </section>
    </div>
  );
}

import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import useReveal from "../hooks/useReveal";
import { campuses, images, outcomes } from "../data/content";

export default function About() {
  const revealRef = useReveal();

  return (
    <div ref={revealRef}>
      <PageHero
        eyebrow="About RVCC"
        title="A proud river-valley college since 1968"
        summary="Originally New Hampshire Vocational Institute at Claremont, River Valley Community College has grown into a three-campus community known for allied health excellence and accessible education."
        image={images.campus}
        imageAlt="River Valley Community College campus grounds"
      />

      <section className="section-shell grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="reveal" data-reveal>
          <p className="eyebrow">Our story</p>
          <h2 className="display-title mt-3">
            Quality education at an affordable price
          </h2>
          <p className="body-copy mt-5">
            RVCC serves western New Hampshire from Keene to Hanover and reaches
            into Vermont communities as well. Students also travel from across
            the state for unique health science programs found nowhere else in
            New Hampshire.
          </p>
          <p className="body-copy mt-4">
            Today the college enrolls about 900 students each year. Most attend
            part-time, 80% take at least one online course, and the median
            student age is 29 — a community of people building careers while
            living full lives.
          </p>
        </div>

        <div className="reveal relative overflow-hidden" data-reveal>
          <img
            src={images.hero}
            alt="Aerial view of the Claremont campus"
            className="h-full min-h-[20rem] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-river-deep/50 to-transparent" />
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,rgba(231,242,245,0.8),rgba(246,251,252,0.2))] py-16 sm:py-20">
        <div className="section-shell">
          <div className="reveal max-w-2xl" data-reveal>
            <p className="eyebrow">By the numbers</p>
            <h2 className="display-title mt-3">Small college, steady support</h2>
          </div>
          <dl className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {outcomes.map((item) => (
              <div key={item.label} className="reveal" data-reveal>
                <dt className="font-display text-4xl font-semibold text-river">
                  {item.value}
                </dt>
                <dd className="mt-2 text-base text-granite-muted">{item.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section-shell py-16 sm:py-20">
        <div className="reveal max-w-2xl" data-reveal>
          <p className="eyebrow">Campuses</p>
          <h2 className="display-title mt-3">Find your place to learn</h2>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {campuses.map((campus) => (
            <article key={campus.name} className="reveal" data-reveal>
              <p className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-valley">
                {campus.role}
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold text-river-deep">
                {campus.name}
              </h3>
              <p className="mt-3 leading-relaxed text-granite-muted">
                {campus.detail}
              </p>
            </article>
          ))}
        </div>
        <div className="reveal mt-12 flex flex-wrap gap-3" data-reveal>
          <Link to="/admissions" className="btn-primary">
            Plan a campus visit
          </Link>
          <Link to="/student-life" className="btn-ghost">
            Explore student life
          </Link>
        </div>
      </section>
    </div>
  );
}

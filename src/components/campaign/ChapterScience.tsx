import { Link } from "react-router-dom";
import { sciencePillars } from "../../data/campaign";

export function ChapterScience() {
  return (
    <section
      id="science"
      className="relative overflow-hidden bg-ink py-20 text-white sm:py-28"
      aria-labelledby="science-heading"
    >
      <div className="absolute inset-0">
        <img
          src="/images/campaign/science.jpg"
          alt=""
          className="h-full w-full object-cover object-[center_20%] opacity-35"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-ink/75" />
      </div>
      <div className="section-shell relative">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-tide">
          Chapter 5 · 63 Years of Science
        </p>
        <h2
          id="science-heading"
          className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-5xl"
          style={{ fontWeight: 700 }}
        >
          Research as a companion, not a detour.
        </h2>
        <p className="mt-4 max-w-2xl font-serif text-lg leading-relaxed text-white/70 sm:text-xl">
          Nutrition, behavior, habits, activity, personalization, and educational framing for modern
          medical support—including GLP-1 conversations—kept human, not clinical theater.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sciencePillars.map((pillar, index) => (
            <article
              key={pillar.title}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
            >
              <img
                src={pillar.image}
                alt={pillar.imageAlt}
                className="aspect-[16/10] w-full object-cover opacity-90"
                loading="lazy"
              />
              <div className="p-5">
                <p className="font-display text-sm font-bold text-tide" style={{ fontWeight: 700 }}>
                  0{index + 1}
                </p>
                <h3 className="mt-2 font-display text-xl font-bold" style={{ fontWeight: 700 }}>
                  {pillar.title}
                </h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-white/65">{pillar.copy}</p>
              </div>
            </article>
          ))}
        </div>

        <Link
          to="/research"
          className="mt-10 inline-flex font-sans text-sm font-semibold text-tide transition hover:text-white"
        >
          Explore research & wellness resources →
        </Link>
      </div>
    </section>
  );
}

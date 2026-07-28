import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { eras } from "../../data/campaign";
import { useInView } from "../../hooks/motion";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

export function ChapterEvolution() {
  const { ref, visible } = useInView<HTMLElement>(0.15);
  const reduceMotion = usePrefersReducedMotion();
  const [searchParams] = useSearchParams();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const eraId = searchParams.get("era");
    if (!eraId) return;
    const index = eras.findIndex((item) => item.id === eraId);
    if (index >= 0) setActive(index);
  }, [searchParams]);

  useEffect(() => {
    if (!visible || reduceMotion) return;
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % eras.length);
    }, 6000);
    return () => window.clearInterval(id);
  }, [visible, reduceMotion, active]);

  const era = eras[active];

  return (
    <section
      id="evolution"
      ref={ref}
      className="relative py-20 sm:py-28"
      aria-labelledby="evolution-heading"
    >
      <div className="section-shell">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-cobalt-600">
          Chapter 2 · 63 Years of Evolution
        </p>
        <h2
          id="evolution-heading"
          className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl"
          style={{ fontWeight: 700 }}
        >
          Evolving with every generation it serves.
        </h2>
        <p className="mt-4 max-w-2xl font-serif text-lg leading-relaxed text-ink/65 sm:text-xl">
          Nutrition science, culture, technology, and wellness trends shifted. Weight Watchers
          shifted with them—without abandoning the people at the center.
        </p>

        <div className="mt-10 flex gap-2 overflow-x-auto pb-2">
          {eras.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(index)}
              className={`shrink-0 rounded-2xl px-4 py-3 text-left transition ${
                active === index
                  ? "bg-cobalt-600 text-white"
                  : "bg-mist text-ink/70 hover:bg-cobalt-100"
              }`}
            >
              <span className="block font-display text-lg font-bold" style={{ fontWeight: 700 }}>
                {item.decade}
              </span>
              <span className="block font-sans text-[0.65rem] uppercase tracking-[0.14em] opacity-70">
                {item.years}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-8 overflow-hidden rounded-[1.75rem] border border-ink/8 bg-white lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative min-h-[18rem] bg-ink">
            <img
              src={era.image}
              alt={era.imageAlt}
              className={`h-full w-full object-cover ${active < 4 && !reduceMotion ? "grayscale" : ""}`}
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-6 text-white">
              <p className="font-sans text-xs uppercase tracking-[0.18em] text-tide">{era.years}</p>
              <p className="mt-1 font-display text-2xl font-bold" style={{ fontWeight: 700 }}>
                {era.title}
              </p>
              <p className="mt-2 font-sans text-xs text-white/70">{era.visualTone}</p>
            </div>
          </div>

          <div className="grid gap-5 p-6 sm:grid-cols-2 sm:p-8">
            {[
              { label: "Program", value: era.program },
              { label: "Culture", value: era.culture },
              { label: "Technology", value: era.tech },
              { label: "Science", value: era.science },
            ].map((row) => (
              <div key={row.label}>
                <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ink/40">
                  {row.label}
                </p>
                <p className="mt-2 font-sans text-sm leading-relaxed text-ink/70">{row.value}</p>
              </div>
            ))}
            <div className="sm:col-span-2 rounded-2xl bg-mist/80 p-4">
              <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-cobalt-600">
                Milestone
              </p>
              <p className="mt-2 font-serif text-lg text-ink/80">{era.milestone}</p>
              <Link
                to={`/find-your-year?year=${era.years.slice(0, 4)}&mode=journey`}
                className="mt-4 inline-flex font-sans text-sm font-semibold text-cobalt-700"
              >
                Make this your year →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

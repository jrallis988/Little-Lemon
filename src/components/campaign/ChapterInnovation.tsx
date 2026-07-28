import { useState } from "react";
import { Link } from "react-router-dom";
import { innovationBeats } from "../../data/campaign";

export function ChapterInnovation() {
  const [active, setActive] = useState(0);
  const beat = innovationBeats[active];

  return (
    <section id="innovation" className="py-20 sm:py-28" aria-labelledby="innovation-heading">
      <div className="section-shell">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-cobalt-600">
          Chapter 6 · 63 Years of Innovation
        </p>
        <h2
          id="innovation-heading"
          className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl"
          style={{ fontWeight: 700 }}
        >
          From paper journals to intelligent guidance.
        </h2>
        <p className="mt-4 max-w-2xl font-serif text-lg leading-relaxed text-ink/65 sm:text-xl">
          Tools transformed. The commitment—to make healthy living livable—did not.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {innovationBeats.map((item, index) => (
            <button
              key={item.then}
              type="button"
              onClick={() => setActive(index)}
              className={`rounded-2xl px-4 py-2.5 font-sans text-sm font-semibold transition ${
                active === index
                  ? "bg-cobalt-600 text-white"
                  : "bg-mist text-ink/70 hover:bg-cobalt-100"
              }`}
            >
              {item.then} → {item.now}
            </button>
          ))}
        </div>

        <div className="mt-8 grid items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
          <div className="overflow-hidden rounded-[1.5rem]">
            <img
              src={beat.thenImage}
              alt={beat.then}
              className="aspect-[4/3] w-full object-cover grayscale"
            />
            <p className="mt-3 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-ink/45">
              Then · {beat.then}
            </p>
          </div>
          <div className="hidden text-center md:block" aria-hidden="true">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-cobalt-600 font-display text-lg font-bold text-white">
              →
            </span>
          </div>
          <div className="overflow-hidden rounded-[1.5rem]">
            <img
              src={beat.nowImage}
              alt={beat.now}
              className="aspect-[4/3] w-full object-cover"
            />
            <p className="mt-3 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-cobalt-600">
              Now · {beat.now}
            </p>
          </div>
        </div>
        <p className="mt-6 max-w-2xl font-serif text-xl text-ink/75">{beat.detail}</p>
        <Link
          to="/innovation"
          className="mt-6 inline-flex font-sans text-sm font-semibold text-cobalt-700"
        >
          See the innovation story →
        </Link>
      </div>
    </section>
  );
}

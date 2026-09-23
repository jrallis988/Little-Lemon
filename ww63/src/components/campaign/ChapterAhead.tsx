import { Link } from "react-router-dom";
import {
  flagshipProducts,
  futureVision,
  timelineToFuture,
} from "../../data/futureProducts";
import { GuidedWalkthrough } from "../future/GuidedWalkthrough";

export function ChapterAhead() {
  return (
    <section id="ahead" className="relative bg-paper py-20 sm:py-28" aria-labelledby="ahead-heading">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/campaign/future.jpg"
            alt=""
            className="campaign-photo h-full w-full"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/92 via-ink/80 to-cobalt-900/60" />
        </div>
        <div className="section-shell relative py-20 text-white sm:py-24">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-tide">
            63 Years Ahead
          </p>
          <h2
            id="ahead-heading"
            className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-5xl"
            style={{ fontWeight: 700 }}
          >
            {futureVision.headline}
          </h2>
          <p className="mt-3 max-w-2xl font-serif text-2xl text-tide sm:text-3xl">
            {futureVision.subhead}
          </p>
          <p className="mt-5 max-w-2xl font-sans text-base leading-relaxed text-white/75 sm:text-lg">
            {futureVision.body}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#guided-journey"
              className="rounded-2xl bg-white px-6 py-3.5 font-sans text-sm font-semibold text-ink"
            >
              Try the full journey
            </a>
            <Link
              to="/whats-next"
              className="rounded-2xl border border-white/35 px-6 py-3.5 font-sans text-sm font-semibold text-white"
            >
              {futureVision.cta}
            </Link>
          </div>
          <p className="mt-4 font-sans text-xs text-white/55">
            Future Vision · Product Exploration · Portfolio concept prototypes
          </p>
        </div>
      </div>

      <div className="section-shell mt-16">
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {timelineToFuture.map((step) => (
            <li key={step.era} className="rounded-2xl border border-ink/8 bg-white px-4 py-4">
              <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-cobalt-600">
                {step.era}
              </p>
              <p className="mt-2 font-display text-lg font-bold text-ink" style={{ fontWeight: 700 }}>
                {step.title}
              </p>
              <p className="mt-2 font-sans text-sm leading-relaxed text-ink/60">{step.copy}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="section-shell mt-16">
        <GuidedWalkthrough />
      </div>

      <div className="section-shell mt-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-cobalt-600">
              Flagship system
            </p>
            <h3
              className="mt-2 font-display text-3xl font-bold text-ink"
              style={{ fontWeight: 700 }}
            >
              Five products. One connected experience.
            </h3>
            <p className="mt-3 font-serif text-lg text-ink/65">
              The homepage carries the signature journey. Full interactive prototypes live on What’s
              Next.
            </p>
          </div>
          <Link
            to="/whats-next"
            className="rounded-2xl bg-cobalt-600 px-5 py-3 font-sans text-sm font-semibold text-white"
          >
            Open all prototypes
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {flagshipProducts.map((product, index) => (
            <Link
              key={product.id}
              to={`/whats-next#${product.id}`}
              className="group overflow-hidden rounded-[1.5rem] border border-ink/8 bg-white transition hover:-translate-y-0.5 hover:border-cobalt-300"
            >
              <img
                src={product.image}
                alt={product.imageAlt}
                className="campaign-photo aspect-[16/10] w-full"
                loading="lazy"
              />
              <div className="p-5">
                <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-cobalt-600">
                  0{index + 1}
                </p>
                <p className="mt-1 font-display text-xl font-bold text-ink" style={{ fontWeight: 700 }}>
                  {product.name}
                </p>
                <p className="mt-2 font-serif text-base text-tide">{product.statement}</p>
                <p className="mt-3 font-sans text-sm text-ink/60 line-clamp-2">{product.explanation}</p>
                <p className="mt-4 font-sans text-sm font-semibold text-cobalt-700 group-hover:underline">
                  Try prototype →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="section-shell mt-20">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["Past", "63 years of learning from real people."],
            ["Present", "A Weight Watchers built for today."],
            ["Future", "A Weight Watchers built around you."],
          ].map(([title, copy]) => (
            <div key={title} className="rounded-[1.5rem] border border-ink/8 bg-white px-5 py-6">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-cobalt-600">
                {title}
              </p>
              <p className="mt-2 font-serif text-lg text-ink/75">{copy}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-[2rem] bg-ink px-6 py-12 text-center text-white sm:px-12">
          <p className="font-serif text-2xl text-tide sm:text-3xl">63 Years of You</p>
          <p className="mt-3 font-display text-3xl font-bold sm:text-4xl" style={{ fontWeight: 700 }}>
            And we’re just getting started.
          </p>
          <p className="mx-auto mt-4 max-w-3xl font-serif text-lg leading-snug text-white/75 sm:text-xl">
            {futureVision.thesis}
          </p>
          <Link
            to="/whats-next"
            className="mt-8 inline-flex rounded-2xl bg-white px-6 py-3.5 font-sans text-sm font-semibold text-ink"
          >
            Explore What’s Next
          </Link>
        </div>
      </div>
    </section>
  );
}

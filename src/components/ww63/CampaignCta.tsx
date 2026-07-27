import { Link } from "react-router-dom";

export function CampaignCta() {
  return (
    <section id="campaign-join" className="pb-20 sm:pb-28" aria-labelledby="campaign-cta-heading">
      <div className="section-shell">
        <div className="relative overflow-hidden rounded-[2rem] bg-cobalt-600 px-6 py-14 text-white sm:px-12 sm:py-16">
          <div
            className="pointer-events-none absolute -right-10 top-0 h-56 w-56 animate-drift rounded-full bg-tide/30 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-2xl text-center">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-white/65">
              Continue the arc
            </p>
            <h2
              id="campaign-cta-heading"
              className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl"
              style={{ fontWeight: 700 }}
            >
              63 years of showing up—your chapter starts now.
            </h2>
            <p className="mx-auto mt-4 max-w-lg font-serif text-lg leading-relaxed text-white/75">
              Carry Jean’s community-first ethos into Points, Modes, and clinical support built
              for real life.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/#join"
                className="rounded-2xl bg-white px-6 py-3.5 font-sans text-sm font-semibold text-ink transition hover:bg-cloud"
              >
                Start free trial
              </Link>
              <a
                href="#timeline"
                className="rounded-2xl border border-white/35 px-6 py-3.5 font-sans text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Revisit the timeline
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

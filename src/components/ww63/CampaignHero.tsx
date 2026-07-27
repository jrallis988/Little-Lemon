import { Link } from "react-router-dom";
import { campaignPillars } from "../../data/ww63";

export function CampaignHero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-ink text-white"
      aria-labelledby="ww63-hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 20% 0%, rgba(26,56,245,0.45), transparent 50%), radial-gradient(ellipse at 90% 80%, rgba(27,184,168,0.25), transparent 45%)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
        aria-hidden="true"
      />

      <div className="section-shell relative pb-20 pt-28 sm:pb-28 sm:pt-36">
        <p className="animate-rise font-sans text-xs font-semibold uppercase tracking-[0.28em] text-tide">
          Campaign · 1961–2024
        </p>
        <h1
          id="ww63-hero-heading"
          className="animate-rise mt-4 max-w-4xl font-display text-5xl font-extrabold tracking-tight sm:text-7xl md:text-8xl"
          style={{ animationDelay: "80ms", fontWeight: 800 }}
        >
          Weight Watchers
          <span className="mt-2 block text-tide">63</span>
        </h1>
        <p
          className="animate-rise mt-6 max-w-2xl font-serif text-xl leading-relaxed text-white/80 sm:text-2xl"
          style={{ animationDelay: "200ms" }}
        >
          A masterclass in behavioral persistence—from a Queens living room to a
          63-year institution of community, science, and habit formation.
        </p>
        <div
          className="animate-rise mt-8 flex flex-wrap gap-3"
          style={{ animationDelay: "320ms" }}
        >
          <a
            href="#timeline"
            className="rounded-2xl bg-white px-6 py-3.5 font-sans text-sm font-semibold text-ink transition hover:bg-cloud"
          >
            Scrub the timeline
          </a>
          <a
            href="#archive"
            className="rounded-2xl border border-white/30 px-6 py-3.5 font-sans text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Open the archive
          </a>
          <Link
            to="/"
            className="rounded-2xl px-6 py-3.5 font-sans text-sm font-semibold text-white/70 transition hover:text-white"
          >
            Back to today →
          </Link>
        </div>

        <div className="mt-16 grid gap-6 border-t border-white/10 pt-10 sm:grid-cols-3">
          {campaignPillars.map((pillar, index) => (
            <article
              key={pillar.id}
              className="animate-rise"
              style={{ animationDelay: `${400 + index * 100}ms` }}
            >
              <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/40">
                Pillar 0{index + 1}
              </p>
              <h2 className="mt-2 font-display text-xl font-bold" style={{ fontWeight: 700 }}>
                {pillar.title}
              </h2>
              <p className="mt-2 font-sans text-sm leading-relaxed text-white/60">
                {pillar.copy}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

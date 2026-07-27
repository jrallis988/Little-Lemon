import { Link } from "react-router-dom";

export function CampaignTeaser() {
  return (
    <section className="relative overflow-hidden" aria-label="Weight Watchers 63 campaign">
      <div className="absolute inset-0">
        <img
          src="/images/archive/living-room.jpg"
          alt=""
          className="h-full w-full object-cover object-center"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-ink/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/55 to-cobalt-900/40" />
      </div>

      <div className="section-shell relative grid items-center gap-8 py-16 sm:grid-cols-[1.2fr_0.8fr] sm:py-20">
        <div className="text-white">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-tide">
            Weight Watchers 63
          </p>
          <h2
            className="mt-3 max-w-xl font-display text-3xl font-bold tracking-tight sm:text-4xl"
            style={{ fontWeight: 700 }}
          >
            From a Queens living room to 63 years of showing up.
          </h2>
          <p className="mt-4 max-w-xl font-serif text-lg leading-relaxed text-white/75">
            Trace the arc of community, science, and habit formation—then bring it into the life
            you’re living now.
          </p>
          <Link
            to="/63"
            className="mt-7 inline-flex rounded-2xl bg-white px-6 py-3.5 font-sans text-sm font-semibold text-ink transition hover:bg-cloud"
          >
            Explore the campaign
          </Link>
        </div>

        <div className="relative hidden overflow-hidden rounded-[1.5rem] sm:block">
          <img
            src="/images/gather.jpg"
            alt="Friends gathered together outdoors"
            className="aspect-[4/5] h-full max-h-72 w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

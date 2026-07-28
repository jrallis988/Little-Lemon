import { Link } from "react-router-dom";
import { campaignPurpose } from "../../data/campaign";

export function ChapterAhead() {
  return (
    <section id="ahead" className="relative overflow-hidden py-20 sm:py-28" aria-labelledby="ahead-heading">
      <div className="absolute inset-0">
        <img
          src="/images/campaign/future.jpg"
          alt=""
          className="h-full w-full object-cover object-center"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/75 to-cobalt-900/55" />
      </div>
      <div className="section-shell relative text-white">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-tide">
          Where Weight Watchers goes next
        </p>
        <h2
          id="ahead-heading"
          className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-5xl"
          style={{ fontWeight: 700 }}
        >
          The future is built around your next need—not our last milestone.
        </h2>
        <p className="mt-4 max-w-2xl font-serif text-lg leading-relaxed text-white/75 sm:text-xl">
          {campaignPurpose.futureCopy}
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {campaignPurpose.futureBeats.map((item) => (
            <p
              key={item}
              className="rounded-2xl border border-white/15 bg-white/5 px-5 py-4 font-sans text-sm leading-relaxed text-white/85"
            >
              {item}
            </p>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/programs"
            className="rounded-2xl bg-white px-6 py-3.5 font-sans text-sm font-semibold text-ink"
          >
            Explore today’s pathways
          </Link>
          <Link
            to="/innovation"
            className="rounded-2xl border border-white/35 px-6 py-3.5 font-sans text-sm font-semibold text-white"
          >
            See how tools are changing
          </Link>
        </div>
      </div>
    </section>
  );
}

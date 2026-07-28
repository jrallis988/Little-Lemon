import { Link } from "react-router-dom";
import { campaignPriorities, campaignPurpose } from "../../data/campaign";

export function ChapterPurpose() {
  return (
    <section
      id="why-it-matters"
      className="relative py-20 sm:py-28"
      aria-labelledby="purpose-heading"
    >
      <div className="section-shell">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-cobalt-600">
          Why this matters
        </p>
        <h2
          id="purpose-heading"
          className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl"
          style={{ fontWeight: 700 }}
        >
          {campaignPurpose.headline}
        </h2>
        <p className="mt-4 max-w-2xl font-serif text-lg leading-relaxed text-ink/65 sm:text-xl">
          {campaignPurpose.lead}
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <article className="rounded-[1.75rem] border border-ink/8 bg-white p-6 sm:p-8">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-tide">
              First · The customer
            </p>
            <h3
              className="mt-3 font-display text-2xl font-bold text-ink sm:text-3xl"
              style={{ fontWeight: 700 }}
            >
              {campaignPurpose.customerTitle}
            </h3>
            <p className="mt-3 font-serif text-lg leading-relaxed text-ink/70">
              {campaignPurpose.customerCopy}
            </p>
            <ul className="mt-6 space-y-3">
              {campaignPriorities.map((item) => (
                <li key={item.title} className="border-t border-ink/8 pt-3">
                  <p className="font-display text-lg font-bold text-ink" style={{ fontWeight: 700 }}>
                    {item.title}
                  </p>
                  <p className="mt-1 font-sans text-sm leading-relaxed text-ink/65">{item.copy}</p>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-[1.75rem] bg-ink p-6 text-white sm:p-8">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-tide">
              Second · The future
            </p>
            <h3
              className="mt-3 font-display text-2xl font-bold sm:text-3xl"
              style={{ fontWeight: 700 }}
            >
              {campaignPurpose.futureTitle}
            </h3>
            <p className="mt-3 font-serif text-lg leading-relaxed text-white/75">
              {campaignPurpose.futureCopy}
            </p>
            <ul className="mt-6 space-y-3">
              {campaignPurpose.futureBeats.map((beat) => (
                <li key={beat} className="flex gap-3 font-sans text-sm leading-relaxed text-white/80">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-tide" aria-hidden="true" />
                  {beat}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/programs"
                className="rounded-2xl bg-white px-5 py-3 font-sans text-sm font-semibold text-ink"
              >
                See today’s support
              </Link>
              <a
                href="#ahead"
                className="rounded-2xl border border-white/30 px-5 py-3 font-sans text-sm font-semibold text-white"
              >
                Where we’re going
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

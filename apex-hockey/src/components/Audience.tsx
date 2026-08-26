import { audienceTiers, brand } from "../data/content";

export function Audience() {
  return (
    <section className="section audience" id="audience" aria-labelledby="audience-title">
      <div className="section__inner">
        <p className="section__eyebrow">02 — Audience</p>
        <h2 id="audience-title" className="section__title">
          Built for the next-level player.
        </h2>
        <p className="section__lead">
          Primary audience: {brand.audiencePrimary}. Creative voice, photography, platforms, and
          the Apex Mark experience are built for them first.
        </p>
        <ul className="audience__tiers">
          {audienceTiers.map((t) => (
            <li key={t.tier}>
              <p className="audience__tier-label">{t.tier}</p>
              <h3>{t.label}</h3>
              <p>{t.note}</p>
            </li>
          ))}
        </ul>
        <p className="audience__note">{brand.audienceSecondary}.</p>
      </div>
    </section>
  );
}

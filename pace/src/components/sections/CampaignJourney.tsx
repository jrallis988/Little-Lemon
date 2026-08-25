import { journey } from '../../data/content'

export function CampaignJourney() {
  return (
    <section className="section" id="journey">
      <div className="shell">
        <p className="section-kicker">06 — Campaign journey</p>
        <h2 className="section-title">Tease → Reveal → Educate → Engage → Convert → Evergreen</h2>
        <p className="section-lede">
          Each stage has a job, a creative shape, a platform mix, a CTA, and a
          KPI — so optimization later is tied to intent, not vibes.
        </p>
        <div className="journey">
          {journey.map((s) => (
            <article className="journey-step" key={s.id}>
              <h3>{s.name}</h3>
              <p>
                <strong>Objective.</strong> {s.objective}
              </p>
              <p>
                <strong>Content.</strong> {s.content}
              </p>
              <p>
                <strong>Platforms.</strong> {s.platforms.join(' · ')}
              </p>
              <p>
                <strong>Formats.</strong> {s.formats.join(', ')}
              </p>
              <p>
                <strong>CTA.</strong> {s.cta}
              </p>
              <div className="journey-meta">KPI · {s.kpi}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

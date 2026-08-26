import { behavioralLoop } from '../../data/content'

export function BehavioralJourney() {
  return (
    <section className="section" id="journey">
      <div className="shell">
        <p className="section-kicker">06 — User journey</p>
        <h2 className="section-title">
          Discover → Run → Listen → Measure → Reveal → Share → Run again
        </h2>
        <p className="section-lede">
          The campaign doesn’t end when someone clicks an ad. Participation
          creates another reason to return to Spotify.
        </p>
        <div className="loop-grid">
          {behavioralLoop.map((step, i) => (
            <article className="loop-step" key={step.id}>
              <div className="loop-num">{String(i + 1).padStart(2, '0')}</div>
              <h3>{step.name}</h3>
              <p>{step.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

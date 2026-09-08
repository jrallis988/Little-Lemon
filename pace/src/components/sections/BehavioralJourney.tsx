import { behavioralLoop } from '../../data/content'

export function BehavioralJourney() {
  return (
    <section className="section" id="journey">
      <div className="shell">
        <p className="section-kicker">06 — User journey</p>
        <h2 className="section-title">
          Discover → Listen → Run → Discover music → Reveal → Share → Listen again
        </h2>
        <p className="section-lede">
          Every stage leads back to Spotify’s actual product—playlists, discovery,
          and return listening.
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

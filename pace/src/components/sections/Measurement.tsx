import { proposedKpis } from '../../data/content'

export function Measurement() {
  return (
    <section className="section" id="measurement">
      <div className="shell">
        <p className="section-kicker">12 — Measurement framework</p>
        <h2 className="section-title">Proposed KPIs—clearly labeled, professionally responsible.</h2>
        <p className="section-lede">
          PACE was not launched by Spotify. Analytics below are proposed KPIs,
          creative testing scenarios, and simulated campaign data for portfolio
          demonstration—not claimed live results.
        </p>

        <div className="label-row">
          <span className="sim-badge">Proposed KPIs</span>
          <span className="sim-badge">Prototype testing</span>
          <span className="sim-badge">Simulated campaign data</span>
          <span className="sim-badge">Projected performance</span>
        </div>

        <div className="measure-grid" style={{ marginTop: '1.25rem' }}>
          {proposedKpis.map((g) => (
            <article className="panel measure-card" key={g.group}>
              <h3>{g.group}</h3>
              <ul>
                {g.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="note-callout">
          <strong>Credibility note</strong> — Success is measured against the
          brief: playlist engagement, music discovery, saves, Spotify CTR, Card
          shares, and return listening—not vanity metrics alone.
        </div>
      </div>
    </section>
  )
}

import { paceCardExample } from '../../data/content'

export function PaceCard() {
  const card = paceCardExample
  return (
    <section className="section" id="pace-card">
      <div className="shell">
        <p className="section-kicker">08 — User payoff</p>
        <h2 className="section-title">The PACE Card makes the run personal, measurable, and shareable.</h2>
        <p className="section-lede">
          Participation isn’t a click—it’s a profile of how you run and how you
          listen. This becomes one of the campaign’s major creative assets.
        </p>
        <div className="card-layout">
          <article className="pace-card-visual" aria-label="Example PACE Card">
            <div className="pace-card-top">
              <span className="sim-badge">Simulated example</span>
              <span className="pace-card-brand">PACE</span>
            </div>
            <h3 className="pace-card-name">{card.name}</h3>
            <p className="pace-card-personality">{card.personality}</p>
            <div className="pace-card-stats">
              <div>
                <span>5K</span>
                <strong>{card.fiveK}</strong>
              </div>
              <div>
                <span>Avg pace</span>
                <strong>{card.avgPace}</strong>
              </div>
              <div>
                <span>Avg running BPM</span>
                <strong>{card.avgBpm}</strong>
              </div>
            </div>
            <div className="pace-card-tracks">
              <p>
                <span>Power song</span>
                {card.powerSong}
              </p>
              <p>
                <span>Most-played running artist</span>
                {card.topArtist}
              </p>
              <p>
                <span>Final-mile song</span>
                {card.finalMile}
              </p>
            </div>
            <p className="pace-card-footer">FIND YOUR PACE.</p>
          </article>
          <div>
            <div className="panel" style={{ marginBottom: '1rem' }}>
              <h3>Why it matters</h3>
              <p>
                The Card turns listening + movement into identity. It’s the
                artifact runners share on Instagram, the proof TikTok challenges
                point to, and the reason to open Spotify again.
              </p>
            </div>
            <div className="panel">
              <h3>Design job</h3>
              <p>
                Looks like a runner’s trophy and a music taste map at once—mile
                markers, BPM, route energy, and track titles in one system.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

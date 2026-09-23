import { paceCardExample } from '../../data/content'

export function PaceCard() {
  const card = paceCardExample
  return (
    <section className="section" id="pace-card">
      <div className="shell">
        <p className="section-kicker">08 — User payoff</p>
        <h2 className="section-title">The PACE Card is your running soundtrack—not a performance report.</h2>
        <p className="section-lede">
          Music identity first. If distance or pace appears, it is secondary
          campaign language or a clearly labeled integration—not Spotify becoming
          a tracker.
        </p>
        <div className="card-layout">
          <article className="pace-card-visual" aria-label="Example music-first PACE Card">
            <div className="pace-card-top">
              <span className="sim-badge">Simulated example</span>
              <span className="pace-card-brand">PACE</span>
            </div>
            <p className="pace-card-eyebrow">Your Pace</p>
            <h3 className="pace-card-name">{card.name}</h3>
            <p className="pace-card-personality">{card.personality}</p>
            <div className="pace-card-stats">
              <div>
                <span>Avg music BPM</span>
                <strong>{card.avgMusicBpm}</strong>
              </div>
              <div>
                <span>Running sound</span>
                <strong style={{ fontSize: '0.85rem' }}>{card.runningSound}</strong>
              </div>
              <div>
                <span>Hero</span>
                <strong style={{ fontSize: '0.85rem' }}>Soundtrack</strong>
              </div>
            </div>
            <div className="pace-card-tracks">
              <p>
                <span>Power track</span>
                {card.powerTrack}
              </p>
              <p>
                <span>Top running artist</span>
                {card.topArtist}
              </p>
              <p>
                <span>Fastest-feeling track</span>
                {card.fastestFeeling}
              </p>
              <p>
                <span>Final push song</span>
                {card.finalPush}
              </p>
              <p>
                <span>Most-played running playlist</span>
                {card.topPlaylist}
              </p>
            </div>
            <div className="pace-card-artrow" aria-hidden>
              <span /><span /><span /><span />
            </div>
            <p className="pace-card-footer">FIND YOUR PACE.</p>
          </article>
          <div>
            <div className="panel" style={{ marginBottom: '1rem' }}>
              <h3>Hero message</h3>
              <p>
                <strong>Your running soundtrack.</strong> The Card turns listening
                into identity runners can share—driving playlist discovery back to
                Spotify.
              </p>
            </div>
            <div className="panel">
              <h3>What it is not</h3>
              <p>
                Not a professional running-performance report. Not GPS ownership.
                Not Spotify replacing Strava. Music stays primary.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

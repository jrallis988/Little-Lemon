export function SpotifyDestination() {
  return (
    <section className="section" id="spotify-destination">
      <div className="shell">
        <p className="section-kicker">11b — Spotify experience</p>
        <h2 className="section-title">Social invites. Spotify delivers the listen.</h2>
        <p className="section-lede">
          The destination is not a tracker dashboard. It’s a music experience:
          playlists by state, personalized recommendations, and a Card that
          reflects your soundtrack.
        </p>
        <div className="spotify-dest-grid">
          <article className="spotify-phone" aria-label="Simulated Spotify PACE UI">
            <div className="spotify-phone-top">
              <span>PACE</span>
              <span className="sim-badge">Simulated UI</span>
            </div>
            <div className="spotify-cover" />
            <h3>PACE: Flow State</h3>
            <p>Made for your mid-run rhythm</p>
            <div className="spotify-tracks">
              <div>
                <strong>Starboy</strong>
                <span>The Weeknd · 186 BPM</span>
              </div>
              <div>
                <strong>Go</strong>
                <span>The Chemical Brothers · 128 BPM</span>
              </div>
              <div>
                <strong>Losing It</strong>
                <span>Fisher · 125 BPM</span>
              </div>
            </div>
            <button type="button" className="spotify-play" tabIndex={-1}>
              Play soundtrack
            </button>
          </article>
          <div className="spotify-dest-copy">
            <article className="panel">
              <h3>What lives here</h3>
              <ul className="pillar-examples">
                <li>State-based running playlists</li>
                <li>Personalized track recommendations</li>
                <li>PACE Card generation</li>
                <li>Listen-again return loops</li>
              </ul>
            </article>
            <article className="panel" style={{ marginTop: '1rem' }}>
              <h3>What does not live here</h3>
              <p>
                GPS maps, coaching plans, heart-rate dashboards, or race
                prediction. Those belong to fitness platforms. PACE stays on
                music.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}

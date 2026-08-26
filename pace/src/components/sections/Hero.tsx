export function Hero() {
  return (
    <section className="hero" id="top" aria-label="Campaign hero">
      <div className="hero-inner">
        <p className="sim-badge" style={{ marginBottom: '1.25rem' }}>
          Self-initiated portfolio · Spotify × running concept
        </p>
        <h1 className="hero-brand">
          PACE<em>.</em>
        </h1>
        <p className="hero-line">Find Your Pace.</p>
        <p className="hero-support">
          Spotify doesn’t track your run. Spotify gives your run its soundtrack—
          a campaign that makes the relationship between music and running more
          personal, discoverable, and shareable.
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#brief">
            Read the brief
          </a>
          <a className="btn btn-ghost" href="#chapter-creative">
            See the creative
          </a>
        </div>
        <div className="hero-meta">
          <span>Music-first</span>
          <span>Not a fitness tracker</span>
          <span>Strategy · Creative · Analytics</span>
        </div>
      </div>
    </section>
  )
}

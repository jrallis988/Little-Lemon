export function Hero() {
  return (
    <section className="hero" id="top" aria-label="Campaign hero">
      <div className="hero-inner">
        <p className="sim-badge" style={{ marginBottom: '1.25rem' }}>
          Simulated portfolio project · Spotify × running
        </p>
        <h1 className="hero-brand">
          PACE<em>.</em>
        </h1>
        <p className="hero-line">Find Your Pace.</p>
        <p className="hero-support">
          A campaign that turns the relationship between your music and your run
          into something personal, measurable, and shareable.
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#idea">
            See the idea
          </a>
          <a className="btn btn-ghost" href="#chapter-creative">
            Experience the creative
          </a>
        </div>
        <div className="hero-meta">
          <span>Spotify campaign concept</span>
          <span>Music × movement</span>
          <span>Strategy · Creative · Analytics</span>
        </div>
      </div>
    </section>
  )
}

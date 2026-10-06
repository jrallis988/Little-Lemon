export function Hero() {
  return (
    <section className="hero" id="top" aria-label="Campaign hero">
      <div className="hero-inner">
        <p className="sim-badge" style={{ marginBottom: '1.25rem' }}>
          Portfolio case study · not a live product
        </p>
        <h1 className="hero-brand">
          PACE<em>.</em>
        </h1>
        <p className="hero-line">Find Your Pace.</p>
        <p className="hero-support">
          A self-initiated campaign case study for Spotify × running. Built to
          show strategy, creative systems, and measurement—not as a live
          website, app, or official Spotify launch.
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
          <span>Portfolio piece</span>
          <span>Music-first concept</span>
          <span>Strategy · Creative · Analytics</span>
        </div>
      </div>
    </section>
  )
}

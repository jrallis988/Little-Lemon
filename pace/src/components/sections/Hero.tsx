export function Hero() {
  return (
    <section className="hero" id="top" aria-label="Campaign hero">
      <div className="hero-inner">
        <p className="sim-badge" style={{ marginBottom: '1.25rem' }}>
          Simulated portfolio project
        </p>
        <h1 className="hero-brand">
          PACE<em>.</em>
        </h1>
        <p className="hero-line">Find Your Pace.</p>
        <p className="hero-support">
          A social strategy and creative performance case study for launching
          PACE ONE — connecting design decisions to measurable campaign
          objectives across Instagram, TikTok, and YouTube.
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#performance">
            See what worked
          </a>
          <a className="btn btn-ghost" href="#challenge">
            Read the strategy
          </a>
        </div>
        <div className="hero-meta">
          <span>Social strategy</span>
          <span>Creative performance</span>
          <span>Python · Pandas · React</span>
        </div>
      </div>
    </section>
  )
}

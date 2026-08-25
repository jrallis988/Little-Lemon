export function Hero() {
  return (
    <header className="hero" id="top">
      <div className="hero__atmosphere" aria-hidden />
      <div className="hero__grain" aria-hidden />
      <div className="hero__content">
        <p className="hero__series">Sports Poster & Art Direction Series</p>
        <h1 className="hero__brand">VELOCITY</h1>
        <p className="hero__headline">Motion defines the moment.</p>
        <p className="hero__support">
          A self-initiated graphic-design project exploring how one visual system can represent
          athletes across six sports — through photography, typography, and decisive composition.
        </p>
        <a className="hero__cta" href="#posters">
          View Poster Series →
        </a>
      </div>
      <p className="hero__meta">Fictional campaign · Graphic design study</p>
    </header>
  )
}

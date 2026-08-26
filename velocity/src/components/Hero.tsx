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
          A self-initiated graphic-design project where athletic movement determines how the design
          behaves — across six sports, one visual system.
        </p>
        <a className="hero__cta" href="#motion-language">
          See the Motion Language →
        </a>
      </div>
      <p className="hero__meta">Fictional campaign · Graphic design study</p>
    </header>
  )
}

export function TypographySection() {
  return (
    <section className="section" id="typography">
      <div className="section__inner">
        <p className="section__eyebrow">03 — Typography</p>
        <h2 className="section__title">Type as athletic force</h2>
        <p className="section__lead">
          Display type carries campaign voice. Supporting type holds athlete data. Numbers become
          graphic objects — without sacrificing readability.
        </p>

        <div className="type-showcase">
          <div className="type-row">
            <div className="type-specimen">
              <p className="type-specimen__label">Display — Bebas Neue</p>
              <p className="type-display">RELEASE</p>
            </div>
            <div className="type-specimen">
              <p className="type-specimen__label">Supporting — Barlow Condensed</p>
              <p className="type-support">Marcus Hale · Montreal · Northern Ice</p>
            </div>
          </div>

          <div className="type-specimen">
            <p className="type-specimen__label">Numeric as graphic</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem 2.5rem', alignItems: 'baseline' }}>
              <p className="type-numeric">01</p>
              <p className="type-numeric">27.4</p>
              <p className="type-numeric">00:09.81</p>
              <p className="type-numeric">87 MPH</p>
              <p className="type-numeric">42″</p>
            </div>
          </div>

          <div className="type-experiments">
            <div className="type-exp type-exp--crop">
              <p className="type-display">DRIVE</p>
            </div>
            <div className="type-exp type-exp--rotate">
              <p className="type-display">RISE</p>
            </div>
            <div className="type-exp type-exp--layer">
              <p className="type-display">AIR</p>
              <p className="type-display">AIR</p>
            </div>
          </div>
        </div>

        <h3
          className="section__title"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', marginTop: '3rem' }}
        >
          Athlete × Type
        </h3>
        <p className="section__lead">
          Masking and compositing create depth: type behind the athlete, type in front, and forms that
          break letterforms.
        </p>

        <div className="type-photo-grid">
          <figure className="type-photo type-photo--behind">
            <span className="type-photo__caption">Type behind</span>
            <p className="type-photo__word">RISE</p>
            <img src="./posters/basketball.jpg" alt="Basketball athlete with type behind" />
          </figure>
          <figure className="type-photo type-photo--front">
            <span className="type-photo__caption">Type in front</span>
            <img src="./posters/running.jpg" alt="Sprinter with type in foreground" />
            <p className="type-photo__word">DRIVE</p>
          </figure>
          <figure className="type-photo type-photo--break">
            <span className="type-photo__caption">Breaking type</span>
            <p className="type-photo__word">STRIKE</p>
            <img src="./posters/soccer.jpg" alt="Soccer athlete interrupting typography" />
          </figure>
        </div>
      </div>
    </section>
  )
}

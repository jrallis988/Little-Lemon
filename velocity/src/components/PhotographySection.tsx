import { humanEnergy, imperfectionToolkit, photoApproaches } from '../data/posters'

export function PhotographySection() {
  return (
    <section className="section section--soft" id="photography">
      <div className="section__inner">
        <p className="section__eyebrow">05 — Photography</p>
        <h2 className="section__title">Photography as system</h2>
        <p className="section__lead">
          Move past selecting strong sports photos. Imagery is part of the graphic language —
          documentary grit beside highly directed campaign stills.
        </p>

        <div className="photo-treat-grid">
          {photoApproaches.map((t) => (
            <div className="photo-treat" key={t.title}>
              <strong>{t.title}</strong>
              <span>{t.note}</span>
            </div>
          ))}
        </div>

        <h3
          className="section__title"
          style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginTop: '3rem' }}
        >
          Human energy
        </h3>
        <p className="section__lead">
          Performance and precision need a counterweight — preparation, exhaustion, chalk, sweat,
          empty arenas.
        </p>
        <div className="photo-treat-grid">
          {humanEnergy.map((t) => (
            <div className="photo-treat" key={t.title}>
              <strong>{t.title}</strong>
              <span>{t.note}</span>
            </div>
          ))}
        </div>

        <h3
          className="section__title"
          style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginTop: '3rem' }}
        >
          Controlled imperfection
        </h3>
        <p className="section__lead">
          Keep the clean black / white / red foundation. Disrupt selectively — sports are physical
          and imperfect.
        </p>
        <div className="photo-treat-grid">
          {imperfectionToolkit.map((t) => (
            <div className="photo-treat" key={t.title}>
              <strong>{t.title}</strong>
              <span>{t.note}</span>
            </div>
          ))}
        </div>

        <h3
          className="section__title"
          style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginTop: '3rem' }}
        >
          Before → After
        </h3>
        <p className="section__lead">Raw capture becomes finished campaign artwork.</p>

        <div className="compare" aria-label="Before and after photography treatment">
          <div className="compare__panel">
            <img src="/velocity/dist/posters/before-raw.jpg" alt="Raw source photograph" />
            <span className="compare__label">Before — Raw</span>
          </div>
          <div className="compare__arrow" aria-hidden>
            →
          </div>
          <div className="compare__panel compare__panel--after">
            <img src="/velocity/dist/posters/running.jpg" alt="Finished campaign treatment" />
            <span className="compare__label">After — Campaign</span>
          </div>
        </div>
      </div>
    </section>
  )
}

import { motionLanguage } from '../data/posters'

const arrows = [
  { from: 'Vertical movement', to: 'Vertical compositions' },
  { from: 'Acceleration', to: 'Horizontal stretch' },
  { from: 'Impact', to: 'Compressed layers' },
  { from: 'Suspension', to: 'Negative space' },
  { from: 'Release', to: 'Separation & trajectory' },
]

export function MotionLanguage() {
  return (
    <section className="section section--soft" id="motion-language">
      <div className="section__inner">
        <p className="section__eyebrow">03 — Motion Language</p>
        <h2 className="section__title">Motion becomes form.</h2>
        <p className="section__lead">
          Direction dictates composition. Athletic action is not a theme — it is the operating system
          for typography, photography, and graphics.
        </p>

        <div className="motion-formula" aria-label="Direction to composition">
          <p className="motion-formula__label">Direction → Composition</p>
          <ul className="motion-formula__list">
            {arrows.map((a) => (
              <li key={a.from}>
                <strong>{a.from}</strong>
                <span aria-hidden>→</span>
                <em>{a.to}</em>
              </li>
            ))}
          </ul>
        </div>

        <div className="motion-grid">
          {motionLanguage.map((m) => (
            <article className="motion-card" key={m.action} data-action={m.action.toLowerCase()}>
              <header className="motion-card__head">
                <h3>{m.action}</h3>
                <p>{m.physics}</p>
              </header>
              <dl className="motion-card__body">
                <div>
                  <dt>Composition</dt>
                  <dd>{m.composition}</dd>
                </div>
                <div>
                  <dt>Typography</dt>
                  <dd>{m.typography}</dd>
                </div>
                <div>
                  <dt>Photography</dt>
                  <dd>{m.photography}</dd>
                </div>
                <div>
                  <dt>Graphics</dt>
                  <dd>{m.graphics}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

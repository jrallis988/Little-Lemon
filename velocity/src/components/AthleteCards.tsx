import { posters } from '../data/posters'

export function AthleteCards() {
  return (
    <section className="section section--soft" id="athlete-cards">
      <div className="section__inner">
        <p className="section__eyebrow">12 — Athlete Cards</p>
        <h2 className="section__title">System at small scale</h2>
        <p className="section__lead">
          Name, sport, number, statistic, photography, and VELOCITY graphic language — scaled into
          compact informational pieces.
        </p>

        <div className="card-grid">
          {posters.map((p) => (
            <article className="athlete-card" key={p.id}>
              <div className="athlete-card__media">
                <img src={p.image} alt="" />
                <span className="athlete-card__num">{p.number}</span>
              </div>
              <div className="athlete-card__body">
                <p className="athlete-card__sport">{p.sport}</p>
                <h3 className="athlete-card__name">{p.athlete}</h3>
                <p className="athlete-card__stat">
                  {p.stat} · {p.statLabel}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

import { games } from '../data/content'

export function Games() {
  return (
    <div className="section-page">
      <header className="section-hero section-hero--games">
        <p className="section-hero__eyebrow">Arcade unlocked</p>
        <h1>Games</h1>
        <p>
          Click everything. High scores matter. Bonus rooms hide behind the
          weird buttons — just like the old Nick Flash era.
        </p>
      </header>

      <div className="play-grid">
        {games.map((game) => (
          <article
            key={game.id}
            className="play-card"
            style={{ '--accent': game.accent }}
          >
            <div className="play-card__screen">
              <span className="play-card__pulse" aria-hidden="true" />
              <strong>{game.title}</strong>
            </div>
            <p className="play-card__show">{game.show}</p>
            <p className="play-card__blurb">{game.blurb}</p>
            <button type="button" className="btn-nick">
              Play Now
            </button>
          </article>
        ))}
      </div>
    </div>
  )
}

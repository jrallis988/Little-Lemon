import { useState } from 'react'
import { ArcadePlay } from '../components/ArcadePlay'
import { games } from '../data/content'

export function Games() {
  const [active, setActive] = useState(null)

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

      <section className="arcade-banner">
        <div>
          <p className="arcade-banner__eyebrow">Featured cabinet</p>
          <h2>Slime Dash is live</h2>
          <p>
            Pick any card and smash blobs for 15 seconds. High scores stick in
            this browser — no beige leaderboards required.
          </p>
        </div>
        <button
          type="button"
          className="btn-nick btn-nick--big"
          onClick={() => setActive(games.find((g) => g.id === 'slime-dash') || games[0])}
        >
          Play Slime Dash
        </button>
      </section>

      <div className="play-grid">
        {games.map((game) => (
          <article
            key={game.id}
            className="play-card"
            style={{ '--accent': game.accent }}
          >
            <button
              type="button"
              className="play-card__screen"
              onClick={() => setActive(game)}
              aria-label={`Open ${game.title}`}
            >
              <span className="play-card__pulse" aria-hidden="true" />
              <strong>{game.title}</strong>
            </button>
            <p className="play-card__show">{game.show}</p>
            <p className="play-card__blurb">{game.blurb}</p>
            <button type="button" className="btn-nick" onClick={() => setActive(game)}>
              Play Now
            </button>
          </article>
        ))}
      </div>

      {active ? <ArcadePlay game={active} onClose={() => setActive(null)} /> : null}
    </div>
  )
}

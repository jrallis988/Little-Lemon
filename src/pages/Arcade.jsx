import { PageHeader } from '../components/PageHeader'
import { arcadeGames } from '../data/content'

export function Arcade() {
  return (
    <div className="page page--arcade">
      <PageHeader title="Arcade" />

      <section className="intro">
        <p className="intro__lead">
          Quick-play games powered by slime, speed, and Saturday energy.
        </p>
      </section>

      <section className="arcade-grid" aria-label="Games">
        {arcadeGames.map((game, index) => (
          <article
            key={game.id}
            className="arcade-card"
            style={{
              '--arcade-accent': game.accent,
              animationDelay: `${0.06 * index}s`,
            }}
          >
            <div className="arcade-card__orb" aria-hidden="true" />
            <h2 className="arcade-card__title">{game.title}</h2>
            <p className="arcade-card__blurb">{game.blurb}</p>
            <button type="button" className="btn btn--primary btn--small">
              Play
            </button>
          </article>
        ))}
      </section>
    </div>
  )
}

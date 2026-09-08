import { useState } from 'react'
import { Link } from 'react-router-dom'
import { nickJrBlocks, nickJrShows } from '../data/content'

export function NickJr() {
  const [active, setActive] = useState(null)
  const [blockMsg, setBlockMsg] = useState('Pick Playtime, Stories, or Songs.')

  return (
    <div className="section-page">
      <header className="section-hero section-hero--jr">
        <p className="section-hero__eyebrow">Preschool destination</p>
        <h1>Nick Jr.</h1>
        <p>
          A dedicated landing for little kids: play, stories, and gentle chaos
          with equal spotlight — no after-school takeover.
        </p>
      </header>

      <section className="hub-strip" aria-label="Preschool blocks">
        {nickJrBlocks.map((block) => (
          <button
            key={block.id}
            type="button"
            className="hub-strip__chip"
            onClick={() => setBlockMsg(`${block.title}: ${block.copy}`)}
          >
            <strong>{block.title}</strong>
            <span>{block.copy}</span>
          </button>
        ))}
      </section>
      <p className="hub-status">{blockMsg}</p>

      <div className="hub-grid">
        {nickJrShows.map((show) => {
          const open = active === show.id
          return (
            <article key={show.id} className={`hub-card hub-card--jr${open ? ' is-open' : ''}`}>
              <span className="hub-card__emoji" aria-hidden="true">
                {show.emoji}
              </span>
              <h2>{show.title}</h2>
              <p>{show.blurb}</p>
              <div className="hub-card__actions">
                <button
                  type="button"
                  className="btn-nick btn-nick--small"
                  onClick={() => setActive(open ? null : show.id)}
                  aria-expanded={open}
                >
                  {open ? 'Hide activity' : 'Play activity'}
                </button>
                <Link className="btn-nick btn-nick--ghost btn-nick--small" to="/video">
                  Watch
                </Link>
                <Link className="btn-nick btn-nick--ghost btn-nick--small" to="/parents">
                  Parents
                </Link>
              </div>
              {open ? <p className="hub-card__detail">{show.activity}</p> : null}
            </article>
          )
        })}
      </div>
    </div>
  )
}

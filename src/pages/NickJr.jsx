import { Link } from 'react-router-dom'
import { nickJrShows } from '../data/content'

export function NickJr() {
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

      <div className="hub-grid">
        {nickJrShows.map((show) => (
          <article key={show.id} className="hub-card hub-card--jr">
            <h2>{show.title}</h2>
            <p>{show.blurb}</p>
            <Link className="btn-nick btn-nick--small" to="/video">
              Watch
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}

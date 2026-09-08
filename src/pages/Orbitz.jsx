import { useState } from 'react'
import { Link } from 'react-router-dom'
import { orbitzTrips } from '../data/content'

export function Orbitz() {
  const [openId, setOpenId] = useState(null)

  return (
    <div className="section-page">
      <header className="section-hero section-hero--orbitz">
        <p className="section-hero__eyebrow">Family travel features</p>
        <h1>Nick Orbitz</h1>
        <p>
          Vacation blocks and partner travel for families — resorts, park
          weekends, and staycation kits with cosmic race energy.
        </p>
      </header>

      <div className="hub-grid">
        {orbitzTrips.map((trip) => {
          const open = openId === trip.id
          return (
            <article
              key={trip.id}
              className={`hub-card hub-card--orbitz${open ? ' is-open' : ''}`}
            >
              <h2>{trip.title}</h2>
              <p>{trip.blurb}</p>
              <div className="hub-card__actions">
                <button
                  type="button"
                  className="btn-nick btn-nick--small"
                  onClick={() => setOpenId(open ? null : trip.id)}
                  aria-expanded={open}
                >
                  {open ? 'Hide pack list' : 'Explore'}
                </button>
                <Link className="btn-nick btn-nick--ghost btn-nick--small" to="/weekenders">
                  Pair with Weekenders
                </Link>
              </div>
              {open ? (
                <ul className="pack-list">
                  {trip.pack.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </article>
          )
        })}
      </div>
    </div>
  )
}

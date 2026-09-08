import { useState } from 'react'
import { Link } from 'react-router-dom'
import { weekenderEvents } from '../data/content'

export function Weekenders() {
  const [saved, setSaved] = useState(() => new Set())
  const [openId, setOpenId] = useState(null)

  const toggleSave = (id) => {
    setSaved((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="section-page">
      <header className="section-hero section-hero--week">
        <p className="section-hero__eyebrow">Special event programming</p>
        <h1>Nick Weekenders</h1>
        <p>
          Promos, marathons, and slime-drop weekends — the activity calendar for
          Friday through Sunday.
        </p>
      </header>

      <p className="hub-status">
        {saved.size === 0
          ? 'Your weekend list is empty — smash Add to weekend.'
          : `${saved.size} event${saved.size === 1 ? '' : 's'} on your weekend list.`}
      </p>

      <div className="hub-grid">
        {weekenderEvents.map((event) => {
          const open = openId === event.id
          const isSaved = saved.has(event.id)
          return (
            <article key={event.id} className={`hub-card hub-card--week${open ? ' is-open' : ''}`}>
              <span className="hub-card__kicker">{event.when}</span>
              <h2>{event.title}</h2>
              <p>{event.blurb}</p>
              <div className="hub-card__actions">
                <button
                  type="button"
                  className="btn-nick btn-nick--small"
                  onClick={() => toggleSave(event.id)}
                >
                  {isSaved ? 'Saved ✓' : 'Add to weekend'}
                </button>
                <button
                  type="button"
                  className="btn-nick btn-nick--ghost btn-nick--small"
                  onClick={() => setOpenId(open ? null : event.id)}
                  aria-expanded={open}
                >
                  {open ? 'Hide details' : 'Details'}
                </button>
                <Link className="btn-nick btn-nick--ghost btn-nick--small" to="/games">
                  Arcade
                </Link>
              </div>
              {open ? <p className="hub-card__detail">{event.detail}</p> : null}
            </article>
          )
        })}
      </div>
    </div>
  )
}

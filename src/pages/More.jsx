import { useState } from 'react'
import { Link } from 'react-router-dom'
import { shopBits } from '../data/content'

export function More() {
  const [openId, setOpenId] = useState(null)

  return (
    <div className="section-page">
      <header className="section-hero section-hero--more">
        <p className="section-hero__eyebrow">Extras</p>
        <h1>More Nick</h1>
        <p>Shop corners, parent notes, and the leftover treasure links.</p>
      </header>

      <div className="more-grid">
        {shopBits.map((bit) => {
          const open = openId === bit.id
          return (
            <article key={bit.id} className={`more-card${open ? ' is-open' : ''}`}>
              <h2>{bit.title}</h2>
              <p>{bit.blurb}</p>
              <button
                type="button"
                className="btn-nick"
                onClick={() => setOpenId(open ? null : bit.id)}
                aria-expanded={open}
              >
                {open ? 'Close' : 'Open'}
              </button>
              {open ? <p className="hub-card__detail">{bit.detail}</p> : null}
            </article>
          )
        })}
        <article className="more-card">
          <h2>Parents</h2>
          <p>Safety tips, schedule notes, and what the slime is about.</p>
          <Link className="btn-nick" to="/parents">
            Read guidelines
          </Link>
        </article>
        <article className="more-card">
          <h2>Nick Jr. handoff</h2>
          <p>Preschool hour is thataway — still loud, just softer.</p>
          <Link className="btn-nick" to="/nick-jr">
            Nick Jr.
          </Link>
        </article>
        <article className="more-card">
          <h2>Help &amp; codes</h2>
          <p>Stuck on a Nicktane code or need the FAQ?</p>
          <Link className="btn-nick" to="/help">
            Help Center
          </Link>
        </article>
      </div>
    </div>
  )
}

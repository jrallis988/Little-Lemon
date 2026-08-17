import { Link } from 'react-router-dom'
import { shopBits } from '../data/content'

export function More() {
  return (
    <div className="section-page">
      <header className="section-hero section-hero--more">
        <p className="section-hero__eyebrow">Extras</p>
        <h1>More Nick</h1>
        <p>Shop corners, parent notes, and the leftover treasure links.</p>
      </header>

      <div className="more-grid">
        {shopBits.map((bit) => (
          <article key={bit.id} className="more-card">
            <h2>{bit.title}</h2>
            <p>{bit.blurb}</p>
            <button type="button" className="btn-nick">
              Open
            </button>
          </article>
        ))}
        <article className="more-card">
          <h2>Parents</h2>
          <p>Safety tips, schedule notes, and what the slime is about.</p>
          <button type="button" className="btn-nick">
            Read
          </button>
        </article>
        <article className="more-card">
          <h2>Nick Jr. handoff</h2>
          <p>Preschool hour is thataway — still loud, just softer.</p>
          <Link className="btn-nick" to="/nick-jr">
            Nick Jr.
          </Link>
        </article>
      </div>
    </div>
  )
}

import { weekenderEvents } from '../data/content'

export function Weekenders() {
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

      <div className="hub-grid">
        {weekenderEvents.map((event) => (
          <article key={event.id} className="hub-card hub-card--week">
            <span className="hub-card__kicker">{event.when}</span>
            <h2>{event.title}</h2>
            <p>{event.blurb}</p>
            <button type="button" className="btn-nick btn-nick--small">
              Add to weekend
            </button>
          </article>
        ))}
      </div>
    </div>
  )
}

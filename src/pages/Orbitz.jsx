import { orbitzTrips } from '../data/content'

export function Orbitz() {
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
        {orbitzTrips.map((trip) => (
          <article key={trip.id} className="hub-card hub-card--orbitz">
            <h2>{trip.title}</h2>
            <p>{trip.blurb}</p>
            <button type="button" className="btn-nick btn-nick--small">
              Explore
            </button>
          </article>
        ))}
      </div>
    </div>
  )
}

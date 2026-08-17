import { nickNewsStories } from '../data/content'

export function NickNews() {
  return (
    <div className="section-page">
      <header className="section-hero section-hero--news">
        <p className="section-hero__eyebrow">Informational hub</p>
        <h1>Nick News</h1>
        <p>
          Current events explained for kids: live town halls, daily desks, and
          stories that treat young viewers like they can handle the truth.
        </p>
      </header>

      <div className="hub-grid">
        {nickNewsStories.map((story) => (
          <article key={story.id} className="hub-card hub-card--news">
            <span className="hub-card__kicker">{story.kicker}</span>
            <h2>{story.title}</h2>
            <p>{story.blurb}</p>
            <button type="button" className="btn-nick btn-nick--small">
              Read
            </button>
          </article>
        ))}
      </div>
    </div>
  )
}

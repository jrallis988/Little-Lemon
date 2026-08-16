import { shows } from '../data/content'

export function Shows() {
  return (
    <div className="section-page">
      <header className="section-hero section-hero--shows">
        <p className="section-hero__eyebrow">Toons + live action</p>
        <h1>Shows</h1>
        <p>
          Equal energy for Nicktoons and live-action hits — pick a character up
          top, then dive into the hub.
        </p>
      </header>

      <div className="show-board">
        {shows.map((show) => (
          <article
            key={show.id}
            id={show.id}
            className="show-board__card"
            style={{ background: show.tone }}
          >
            <span className="show-board__tag">{show.tag}</span>
            <h2>{show.title}</h2>
            <p>{show.blurb}</p>
            <div className="show-board__actions">
              <button type="button" className="btn-nick btn-nick--small">
                Episodes
              </button>
              <button type="button" className="btn-nick btn-nick--ghost btn-nick--small">
                Games
              </button>
              <button type="button" className="btn-nick btn-nick--ghost btn-nick--small">
                Fan stuff
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

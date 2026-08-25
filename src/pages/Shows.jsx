import { useState } from 'react'
import { Link } from 'react-router-dom'
import { shows } from '../data/content'

const EPISODES = {
  spongebob: ['Band Geeks', 'Chocolate with Nuts', 'Graveyard Shift'],
  jimmy: ['Brobot', 'The Eggpire Strikes Back', 'Stranded'],
    catscratch: ["Bringin' Down the Mouse", 'Off the Leash'],
  avatar: ['The Boy in the Iceberg', 'The Avatar Returns'],
  drake: ['Pilot', 'Foam Finger', 'Theater Thug'],
  unfabulous: ['The Perfect Moment', 'The Little Sister'],
  icarly: ['iPilot', 'iWant More Viewers'],
  'hey-arnold': ['Downtown as Fruits', 'Helga on the Couch'],
}

export function Shows() {
  const [openId, setOpenId] = useState(null)

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
        {shows.map((show) => {
          const open = openId === show.id
          const eps = EPISODES[show.id] || ['Pilot', 'Clip reel', 'Bonus short']
          return (
            <article
              key={show.id}
              id={show.id}
              className={`show-board__card${open ? ' is-open' : ''}`}
              style={{ background: show.tone }}
            >
              <span className="show-board__tag">{show.tag}</span>
              <h2>{show.title}</h2>
              <p>{show.blurb}</p>
              <div className="show-board__actions">
                <button
                  type="button"
                  className="btn-nick btn-nick--small"
                  onClick={() => setOpenId(open ? null : show.id)}
                  aria-expanded={open}
                >
                  {open ? 'Hide episodes' : 'Episodes'}
                </button>
                <Link className="btn-nick btn-nick--ghost btn-nick--small" to="/games">
                  Games
                </Link>
                <Link className="btn-nick btn-nick--ghost btn-nick--small" to="/fan">
                  Fan stuff
                </Link>
              </div>
              {open ? (
                <ul className="show-board__eps">
                  {eps.map((ep) => (
                    <li key={ep}>
                      <Link to="/video">{ep}</Link>
                    </li>
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

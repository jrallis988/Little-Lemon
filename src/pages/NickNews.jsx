import { useState } from 'react'
import { Link } from 'react-router-dom'
import { nickNewsStories } from '../data/content'

export function NickNews() {
  const [openId, setOpenId] = useState(nickNewsStories[0]?.id ?? null)

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

      <div className="desk-layout">
        <div className="hub-grid">
          {nickNewsStories.map((story) => {
            const open = openId === story.id
            return (
              <article
                key={story.id}
                className={`hub-card hub-card--news${open ? ' is-open' : ''}`}
              >
                <span className="hub-card__kicker">{story.kicker}</span>
                <h2>{story.title}</h2>
                <p>{story.blurb}</p>
                <button
                  type="button"
                  className="btn-nick btn-nick--small"
                  onClick={() => setOpenId(open ? null : story.id)}
                  aria-expanded={open}
                >
                  {open ? 'Close' : 'Read'}
                </button>
              </article>
            )
          })}
        </div>

        {openId ? (
          <aside className="story-panel" aria-live="polite">
            {(() => {
              const story = nickNewsStories.find((s) => s.id === openId)
              if (!story) return null
              return (
                <>
                  <span className="hub-card__kicker">{story.kicker}</span>
                  <h2>{story.title}</h2>
                  <p>{story.body}</p>
                  <div className="hub-card__actions">
                    <Link className="btn-nick btn-nick--small" to="/fan">
                      Discuss in Fan Zone
                    </Link>
                    <Link className="btn-nick btn-nick--ghost btn-nick--small" to="/parents">
                      Parent note
                    </Link>
                  </div>
                </>
              )
            })()}
          </aside>
        ) : null}
      </div>
    </div>
  )
}

import { posters } from '../data/posters'
import { Poster } from './Poster'
import type { PosterId } from '../data/posters'

interface PrintApplicationsProps {
  onOpen: (id: PosterId) => void
}

const apps = [
  { id: 'poster', label: '24 × 36 Poster', poster: 0, adapt: 'Full system — type, photo, data marks.' },
  { id: 'arena', label: 'Arena Concourse', poster: 1, adapt: 'Concept word enlarges; secondary data drops.' },
  { id: 'ticket', label: 'Event Credential / Ticket', poster: 2, adapt: 'Athlete card logic at pocket scale.' },
  { id: 'scoreboard', label: 'Scoreboard Graphic', poster: 0, adapt: 'Numerals lead. Photo becomes texture.' },
  { id: 'social', label: 'Instagram Carousel / 4:5', poster: 3, adapt: 'Composition redesigned — not cropped.' },
  { id: 'apparel', label: 'Training Apparel Mark', poster: 4, adapt: 'One word + number. No photo.' },
  { id: 'editorial', label: 'Editorial Spread', poster: 5, adapt: 'Type + photo as magazine collision.' },
  { id: 'outdoor', label: 'Outdoor Billboard', poster: 1, adapt: 'One concept. Extreme scale. Stop.' },
  { id: 'facility', label: 'Training Facility Wall', poster: 2, adapt: 'Lane graphics + DRIVE stretch.' },
]

export function PrintApplications({ onOpen }: PrintApplicationsProps) {
  return (
    <section className="section" id="print">
      <div className="section__inner">
        <p className="section__eyebrow">09 — Applications</p>
        <h2 className="section__title">How the system behaves</h2>
        <p className="section__lead">
          Each environment adapts hierarchy — not just the rectangle. Arena, ticket, scoreboard,
          apparel, and editorial all speak VELOCITY differently.
        </p>

        <div className="app-grid">
          {apps.map((app) => {
            const poster = posters[app.poster]
            return (
              <article className={`app-card app-card--${app.id}`} key={app.label}>
                <p className="app-card__label">{app.label}</p>
                <div className="app-card__stage">
                  {app.id === 'ticket' ? (
                    <div className="app-ticket">
                      <div className="app-ticket__photo">
                        <img src={poster.image} alt="" />
                      </div>
                      <div className="app-ticket__body">
                        <p>VELOCITY</p>
                        <h4>{poster.athlete}</h4>
                        <p>
                          {poster.sport} · {poster.number}
                        </p>
                        <p className="app-ticket__stat">{poster.stat}</p>
                      </div>
                    </div>
                  ) : app.id === 'scoreboard' ? (
                    <div className="app-scoreboard">
                      <p className="app-scoreboard__brand">VELOCITY</p>
                      <p className="app-scoreboard__stat">{poster.stat}</p>
                      <p className="app-scoreboard__label">{poster.statLabel}</p>
                      <p className="app-scoreboard__name">{poster.athlete}</p>
                    </div>
                  ) : app.id === 'apparel' ? (
                    <div className="app-apparel">
                      <p>VELOCITY</p>
                      <p className="app-apparel__word">{poster.concept}</p>
                      <p className="app-apparel__num">{poster.number}</p>
                    </div>
                  ) : app.id === 'social' ? (
                    <div className="app-social">
                      <img src={poster.image} alt="" />
                      <p>{poster.concept}</p>
                    </div>
                  ) : (
                    <Poster poster={poster} onOpen={onOpen} />
                  )}
                </div>
                <p className="app-card__adapt">{app.adapt}</p>
              </article>
            )
          })}
        </div>

        <h3
          className="section__title"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', marginTop: '3.5rem' }}
        >
          InDesign Lookbook
        </h3>
        <p className="section__lead">
          Printed presentation structure — cover through applications.
        </p>
        <div className="lookbook" aria-label="Lookbook page structure">
          {[
            { title: 'VELOCITY', sub: 'Cover', cover: true },
            { title: 'Motion Language', sub: 'Direction → Form' },
            { title: 'Art Direction', sub: 'Photography brief' },
            { title: 'Collection', sub: 'Six posters' },
            { title: 'Intensity', sub: 'Rule-breakers' },
            { title: 'Applications', sub: 'Print & digital' },
          ].map((p) => (
            <div
              className={`lookbook__page${p.cover ? ' lookbook__page--cover' : ''}`}
              key={p.title}
            >
              <h4>{p.title}</h4>
              <p>{p.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

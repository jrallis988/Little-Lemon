import { PageHeader } from '../components/PageHeader'
import { scheduleBlocks } from '../data/content'

export function Schedule() {
  return (
    <div className="page page--schedule">
      <PageHeader title="Schedule" />

      <section className="intro">
        <p className="intro__lead">
          Coming up: Air times, live premieres, and network blocks will land on
          this grid.
        </p>
      </section>

      <section className="schedule-grid" aria-label="Tonight's grid">
        {scheduleBlocks.map((block, index) => (
          <article
            key={`${block.time}-${block.title}`}
            className="schedule-card"
            style={{ animationDelay: `${0.05 * index}s` }}
          >
            <time className="schedule-card__time">{block.time}</time>
            <div className="schedule-card__body">
              <h2 className="schedule-card__title">{block.title}</h2>
              <p className="schedule-card__meta">
                {block.network} · {block.kind}
              </p>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}

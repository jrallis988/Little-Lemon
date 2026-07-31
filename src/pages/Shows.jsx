import { PageHeader } from '../components/PageHeader'
import { shows } from '../data/content'

export function Shows() {
  return (
    <div className="page page--shows">
      <PageHeader title="Shows" />

      <section className="intro">
        <p className="intro__lead">
          Browse the full Nick lineup across every network block.
        </p>
      </section>

      <section className="shows-grid" aria-label="Show catalog">
        {shows.map((show, index) => (
          <article
            key={show.id}
            className="show-card"
            style={{
              background: show.tone,
              animationDelay: `${0.04 * index}s`,
            }}
          >
            <span className="show-card__tag">{show.tag}</span>
            <h2 className="show-card__title">{show.title}</h2>
            <p className="show-card__network">{show.network}</p>
          </article>
        ))}
      </section>
    </div>
  )
}

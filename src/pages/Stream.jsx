import { PageHeader } from '../components/PageHeader'
import { streamRows } from '../data/content'

export function Stream() {
  return (
    <div className="page page--stream">
      <PageHeader title="Stream" />

      <section className="intro">
        <p className="intro__lead">
          Pick up where you left off — or jump into tonight&apos;s premieres.
        </p>
      </section>

      {streamRows.map((row) => (
        <section key={row.id} className="rail" aria-label={row.title}>
          <h2 className="rail__title">{row.title}</h2>
          <div className="rail__track">
            {row.items.map((item) => (
              <button key={item} type="button" className="rail__card">
                <span className="rail__play" aria-hidden="true">
                  ▶
                </span>
                <span className="rail__label">{item}</span>
              </button>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

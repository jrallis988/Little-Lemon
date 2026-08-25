import { posters } from '../data/posters'
import { Poster } from './Poster'
import type { PosterId } from '../data/posters'

interface PosterSeriesProps {
  onOpen: (id: PosterId) => void
}

export function PosterSeries({ onOpen }: PosterSeriesProps) {
  return (
    <section className="section" id="posters">
      <div className="section__inner">
        <p className="section__eyebrow">05 — Poster Series</p>
        <h2 className="section__title">Six sports. One system.</h2>
        <p className="section__lead">
          Consistency comes from typography, art direction, graphic language, and photographic
          treatment — not identical templates with swapped athletes.
        </p>

        <div className="poster-series">
          {posters.map((poster) => (
            <article className="poster-entry" key={poster.id}>
              <div className="poster-entry__art">
                <Poster poster={poster} onOpen={onOpen} />
              </div>
              <div className="poster-entry__meta">
                <p className="poster-entry__num">Poster {poster.number}</p>
                <h3>{poster.concept}</h3>
                <p className="poster-entry__sport">{poster.sport}</p>
                <p className="poster-entry__note">{poster.composition}</p>
                <p className="poster-entry__note">{poster.hierarchyNote}</p>
                <ul className="poster-entry__explore">
                  {poster.explore.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

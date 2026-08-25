import { posters, type PosterId } from '../data/posters'
import { Poster } from './Poster'

interface FinalCollectionProps {
  onOpen: (id: PosterId) => void
}

export function FinalCollection({ onOpen }: FinalCollectionProps) {
  return (
    <section className="section section--soft" id="final">
      <div className="section__inner">
        <p className="section__eyebrow">15 — Final Collection</p>
        <h2 className="section__title">VELOCITY</h2>
        <p className="section__lead">Six posters. One campaign language. Motion as the shared thesis.</p>

        <div className="final-row">
          {posters.map((poster) => (
            <Poster key={poster.id} poster={poster} onOpen={onOpen} />
          ))}
        </div>

        <p className="final-statement">
          <strong>VELOCITY</strong> is a self-initiated fictional graphic-design project created to
          demonstrate sports art direction, typography, Photoshop compositing, Illustrator graphics,
          and campaign design.
        </p>
      </div>
    </section>
  )
}

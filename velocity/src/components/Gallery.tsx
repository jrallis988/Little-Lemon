import { posters, type PosterId } from '../data/posters'
import { Poster } from './Poster'

interface GalleryProps {
  onOpen: (id: PosterId) => void
}

export function Gallery({ onOpen }: GalleryProps) {
  return (
    <section className="section" id="gallery">
      <div className="section__inner">
        <p className="section__eyebrow">14 — Poster Gallery</p>
        <h2 className="section__title">Collection</h2>
        <p className="section__lead">
          Editorial grid on desktop. Vertical sequence on mobile. Artwork occupies the screen —
          minimal UI.
        </p>

        <div className="gallery-grid">
          {posters.map((poster) => (
            <div className="gallery-item" key={poster.id}>
              <Poster poster={poster} onOpen={onOpen} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

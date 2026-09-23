import { posters } from '../data/posters'
import type { PosterId } from '../data/posters'

interface RuleBreakersProps {
  onOpen: (id: PosterId) => void
}

const intensity = [
  {
    id: 'running' as PosterId,
    title: 'DRIVE — Overload',
    image: '/velocity/dist/posters/finished/intensity-drive-overload.jpg',
    body: 'Oversized type exits the frame. Motion blur, scoreboard numerals, and a handwritten coaching note collide. The sprint is felt before it is read.',
  },
  {
    id: 'soccer' as PosterId,
    title: 'STRIKE — Collision Edit',
    image: '/velocity/dist/posters/finished/intensity-strike-collision.jpg',
    body: 'Halftone pressure, hard crop through letterforms, overlapping statistics. Impact as visual violence — still inside the black / white / red system.',
  },
]

export function RuleBreakers({ onOpen }: RuleBreakersProps) {
  return (
    <section className="section" id="rule-breakers">
      <div className="section__inner">
        <p className="section__eyebrow">Campaign Intensity</p>
        <h2 className="section__title">Break the rules — once</h2>
        <p className="section__lead">
          Most of VELOCITY stays disciplined. Then one or two pieces go deliberately aggressive —
          layered, distorted, statistic-heavy, unforgettable.
        </p>

        <div className="breaker-grid">
          {intensity.map((piece) => (
            <article className="breaker" key={piece.title}>
              <button
                type="button"
                className="breaker__art breaker__art--finished"
                onClick={() => onOpen(piece.id)}
                aria-label={`Open ${piece.title}`}
              >
                <img src={piece.image} alt="" />
              </button>
              <div className="breaker__meta">
                <h3>{piece.title}</h3>
                <p>{piece.body}</p>
              </div>
            </article>
          ))}
        </div>

        <p className="section__lead" style={{ marginTop: '2rem', marginBottom: 0 }}>
          Series posters also exist as finished exports in{' '}
          <code style={{ color: 'var(--signal)' }}>posters/finished/</code> — ready for lookbook and
          print mockups.
        </p>
        <p className="sr-only">{posters[0].concept}</p>
      </div>
    </section>
  )
}

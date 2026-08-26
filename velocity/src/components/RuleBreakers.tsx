import { posters } from '../data/posters'
import { Poster } from './Poster'
import type { PosterId } from '../data/posters'

interface RuleBreakersProps {
  onOpen: (id: PosterId) => void
}

export function RuleBreakers({ onOpen }: RuleBreakersProps) {
  const drive = posters[2]
  const strike = posters[3]

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
          <article className="breaker">
            <div className="breaker__art">
              <Poster poster={drive} onOpen={onOpen} variant="aggressive" className="breaker__poster" />
              <div className="breaker__overlay" aria-hidden>
                <p className="breaker__mega">DRI</p>
                <p className="breaker__mega breaker__mega--offset">VE</p>
                <p className="breaker__stack">
                  00:09.81
                  <br />
                  214 SPM
                  <br />
                  LANE 04
                </p>
                <p className="breaker__note">// COACH — hold form through 60m</p>
              </div>
            </div>
            <div className="breaker__meta">
              <h3>DRIVE — Overload</h3>
              <p>
                Oversized type exits the frame. Motion blur, scoreboard numerals, and a handwritten
                coaching note collide. The sprint is felt before it is read.
              </p>
            </div>
          </article>

          <article className="breaker">
            <div className="breaker__art">
              <Poster poster={strike} onOpen={onOpen} variant="aggressive" className="breaker__poster" />
              <div className="breaker__overlay breaker__overlay--strike" aria-hidden>
                <p className="breaker__mega breaker__mega--strike">STRIKE</p>
                <p className="breaker__halftone" />
                <p className="breaker__stack breaker__stack--right">
                  118 km/h
                  <br />
                  CONTACT 0.012s
                  <br />
                  SPIN 2400
                </p>
              </div>
            </div>
            <div className="breaker__meta">
              <h3>STRIKE — Collision Edit</h3>
              <p>
                Halftone pressure, hard crop through letterforms, overlapping statistics. Impact as
                visual violence — still inside the black / white / red system.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

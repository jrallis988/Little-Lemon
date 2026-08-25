import { posters } from '../data/posters'
import { Poster } from './Poster'
import type { PosterId } from '../data/posters'

interface PrintApplicationsProps {
  onOpen: (id: PosterId) => void
}

export function PrintApplications({ onOpen }: PrintApplicationsProps) {
  const [a, b, c] = posters

  return (
    <section className="section" id="print">
      <div className="section__inner">
        <p className="section__eyebrow">09 — Print Applications</p>
        <h2 className="section__title">Physical presence</h2>
        <p className="section__lead">
          Mockups stay secondary. The artwork must hold without elaborate staging.
        </p>

        <div className="mock-grid">
          <div className="mock mock--poster">
            <p className="mock__label">24 × 36 Poster</p>
            <div className="mock__stage">
              <Poster poster={a} onOpen={onOpen} />
            </div>
          </div>

          <div className="mock mock--arena">
            <p className="mock__label">Arena Concourse</p>
            <div className="mock__stage">
              <Poster poster={b} onOpen={onOpen} />
            </div>
          </div>

          <div className="mock mock--transit">
            <p className="mock__label">Transit Shelter</p>
            <div className="mock__stage">
              <div className="mock__shelter">
                <Poster poster={c} onOpen={onOpen} />
              </div>
            </div>
          </div>

          <div className="mock mock--wall">
            <p className="mock__label">Large-Format Wall</p>
            <div className="mock__stage">
              <Poster poster={posters[3]} onOpen={onOpen} />
            </div>
          </div>

          <div className="mock mock--retail">
            <p className="mock__label">Sporting-Goods Retail</p>
            <div className="mock__stage">
              <Poster poster={posters[4]} onOpen={onOpen} />
            </div>
          </div>

          <div className="mock mock--magazine">
            <p className="mock__label">Magazine Advertisement</p>
            <div className="mock__stage">
              <div className="mock__spread">
                <div className="mock__spread-copy">
                  <p>VELOCITY</p>
                  <p style={{ marginTop: '0.75rem', fontSize: '1.1rem', letterSpacing: '0.04em' }}>
                    Motion defines the moment.
                  </p>
                  <p style={{ marginTop: 'auto', paddingTop: '2rem' }}>Sports Poster Series</p>
                </div>
                <Poster poster={posters[5]} onOpen={onOpen} />
              </div>
            </div>
          </div>
        </div>

        <h3
          className="section__title"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', marginTop: '3.5rem' }}
        >
          InDesign Lookbook
        </h3>
        <p className="section__lead">
          Printed presentation structure for the finished collection — cover through applications.
        </p>
        <div className="lookbook" aria-label="Lookbook page structure">
          {[
            { title: 'VELOCITY', sub: 'Cover', cover: true },
            { title: 'Concept', sub: 'Motion defines…' },
            { title: 'Art Direction', sub: 'Photography brief' },
            { title: 'Collection', sub: 'Six posters' },
            { title: 'Details', sub: 'Type & craft' },
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

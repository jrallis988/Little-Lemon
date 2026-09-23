import { useState } from 'react'
import { posters, type PosterId } from '../data/posters'
import { Poster } from './Poster'

const modes = [
  { id: 'full', label: 'Full Poster' },
  { id: 'typography', label: 'Typography' },
  { id: 'photography', label: 'Photography' },
  { id: 'graphics', label: 'Graphics' },
  { id: 'details', label: 'Details' },
] as const

type Mode = (typeof modes)[number]['id']

const modeCopy: Record<Mode, string> = {
  full: 'Complete campaign poster — photography, graphic language, and type in balance.',
  typography: 'Display concept, athlete line, and numeric graphic isolated for hierarchy review.',
  photography: 'Treated athlete plate with environmental grade; type and marks quieted.',
  graphics: 'Court, ice, track, and trajectory devices that support — never overwhelm — the photo.',
  details: 'Focus crop on the decisive interaction between athlete silhouette and primary type.',
}

export function DetailViewer() {
  const [activeId, setActiveId] = useState<PosterId>('hockey')
  const [mode, setMode] = useState<Mode>('full')
  const poster = posters.find((p) => p.id === activeId)!

  return (
    <section className="section section--soft" id="detail-viewer">
      <div className="section__inner">
        <p className="section__eyebrow">06 — Detail Viewer</p>
        <h2 className="section__title">Examine the craft</h2>
        <p className="section__lead">
          A simple presentation device for inspecting layers of the composition.
        </p>

        <div className="detail-viewer">
          <div>
            <div className="detail-select" role="tablist" aria-label="Select poster">
              {posters.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  role="tab"
                  aria-selected={activeId === p.id}
                  className={activeId === p.id ? 'is-active' : undefined}
                  onClick={() => setActiveId(p.id)}
                >
                  {p.number} {p.sport}
                </button>
              ))}
            </div>
            <div className="detail-viewer__stage" data-mode={mode}>
              <Poster poster={poster} />
            </div>
          </div>

          <div className="detail-copy">
            <div className="detail-viewer__controls" role="tablist" aria-label="Inspect layer">
              {modes.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  role="tab"
                  aria-selected={mode === m.id}
                  className={`detail-chip${mode === m.id ? ' is-active' : ''}`}
                  onClick={() => setMode(m.id)}
                >
                  {m.label}
                </button>
              ))}
            </div>
            <h3>
              {poster.concept}
              <span style={{ color: 'var(--mute)', fontSize: '0.45em', marginLeft: '0.5rem' }}>
                {poster.sport}
              </span>
            </h3>
            <p>{modeCopy[mode]}</p>
            <p>{poster.composition}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

import { useState } from 'react'
import { AthleteIntro } from '../motion/AthleteIntro'

/** Static style frame vs live motion prototype. */
export function BeforeAfterCompare() {
  const [mode, setMode] = useState<'before' | 'after'>('after')

  return (
    <div className="tool-shell">
      <div className="tool-shell__bar chip-row">
        <button
          type="button"
          className={`chip${mode === 'before' ? ' is-active' : ''}`}
          onClick={() => setMode('before')}
        >
          Style Frame
        </button>
        <button
          type="button"
          className={`chip${mode === 'after' ? ' is-active' : ''}`}
          onClick={() => setMode('after')}
        >
          In Motion
        </button>
      </div>
      {mode === 'before' ? (
        <div className="stage">
          <div className="athlete-photo athlete-photo--marcus" />
          <div className="stage-frame" />
          <div className="ai-layout">
            <div className="ai-bar" style={{ transform: 'none' }} />
            <div className="ai-number num" style={{ opacity: 1 }}>
              23
            </div>
            <h3 className="ai-name display" style={{ opacity: 1 }}>
              MARCUS REED
            </h3>
            <div className="ai-meta condensed" style={{ opacity: 1 }}>
              <span>FORWARD</span>
              <span>NORTH DIVISION</span>
            </div>
          </div>
        </div>
      ) : (
        <AthleteIntro />
      )}
      <p className="placeholder-note">
        Graphic Design → Motion Design: the still already holds hierarchy; motion adds timing.
      </p>
    </div>
  )
}

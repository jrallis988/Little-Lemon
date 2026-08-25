import { useState } from 'react'
import { SocialPromo } from '../motion/SocialMotion'
import { AthleteIntro } from '../motion/AthleteIntro'
import { NetworkIntro } from '../motion/NetworkIntro'

const RATIOS = ['16:9', '9:16', '4:5', '1:1'] as const
type Ratio = (typeof RATIOS)[number]

export function AspectRatioPreviewer() {
  const [ratio, setRatio] = useState<Ratio>('9:16')
  const [piece, setPiece] = useState<'promo' | 'athlete' | 'intro'>('promo')

  return (
    <div className="tool-shell">
      <div className="tool-shell__bar">
        <div className="chip-row">
          {RATIOS.map((r) => (
            <button
              key={r}
              type="button"
              className={`chip${ratio === r ? ' is-active' : ''}`}
              onClick={() => setRatio(r)}
            >
              {r}
            </button>
          ))}
        </div>
        <div className="chip-row" style={{ marginLeft: 'auto' }}>
          {(
            [
              ['promo', 'Promo'],
              ['athlete', 'Athlete'],
              ['intro', 'Intro'],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              className={`chip${piece === id ? ' is-active' : ''}`}
              onClick={() => setPiece(id)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="aspect-stage-wrap" data-ratio={ratio}>
        {piece === 'promo' ? <SocialPromo ratio={ratio} /> : null}
        {piece === 'athlete' ? <AthleteIntro /> : null}
        {piece === 'intro' ? <NetworkIntro compact /> : null}
      </div>
      <p className="placeholder-note">
        Compositions are rebuilt per ratio — not a simple crop of the same frame.
      </p>
    </div>
  )
}

import { useState } from 'react'
import { SocialPromo } from '../motion/Social'
import { AthleteIntro } from '../motion/AthleteProduct'
import { HeroFilm } from '../motion/HeroFilm'

const RATIOS = ['16:9', '9:16', '4:5', '1:1'] as const
type Ratio = (typeof RATIOS)[number]

export function AspectRatioPreviewer() {
  const [ratio, setRatio] = useState<Ratio>('9:16')
  const [piece, setPiece] = useState<'promo' | 'athlete' | 'film'>('promo')

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
              ['film', 'Film'],
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
        {piece === 'film' ? <HeroFilm compact /> : null}
      </div>
      <p className="placeholder-note">
        One footage plate → multiple campaign compositions. Not a simple crop.
      </p>
    </div>
  )
}

import gsap from 'gsap'
import { useCallback, useState } from 'react'
import { StageControls } from '../layout/StageControls'
import { pulseEase, snapEase, useMotionReplay } from '../../hooks/useMotionReplay'

type Mode = 'idle' | 'score' | 'period' | 'final'

export function ScoreGraphic() {
  const [mode, setMode] = useState<Mode>('score')

  const build = useCallback(
    (tl: gsap.core.Timeline, root: HTMLElement) => {
      const bug = root.querySelector('.score-bug')
      const flash = root.querySelector('.score-flash')
      const away = root.querySelector('.score-away-num')
      const period = root.querySelector('.score-period')
      const final = root.querySelector('.score-final')

      gsap.set(bug, { y: -20, opacity: 0 })
      gsap.set(flash, { opacity: 0 })
      if (final) gsap.set(final, { opacity: 0, scale: 0.9 })

      tl.to(bug, { y: 0, opacity: 1, duration: 0.35, ease: snapEase })

      if (mode === 'score') {
        tl.to(flash, { opacity: 1, duration: 0.08 }, 0.55)
          .to(away, { scale: 1.25, color: '#e82020', duration: 0.15, ease: snapEase }, 0.55)
          .to(flash, { opacity: 0, duration: 0.25 }, 0.7)
          .to(away, { scale: 1, duration: 0.2, ease: pulseEase }, 0.75)
          .add(() => {
            if (away) away.textContent = '98'
          }, 0.55)
      }

      if (mode === 'period') {
        tl.fromTo(
          period,
          { y: 8, opacity: 0.4 },
          { y: 0, opacity: 1, duration: 0.3, ease: snapEase },
          0.45,
        ).add(() => {
          if (period) period.textContent = 'Q4 · 12:00'
        }, 0.45)
      }

      if (mode === 'final') {
        tl.to(final, { opacity: 1, scale: 1, duration: 0.35, ease: snapEase }, 0.4)
      }
    },
    [mode],
  )

  const { rootRef, play, playing } = useMotionReplay(build, [mode])

  return (
    <div>
      <div className="chip-row" style={{ marginBottom: '0.85rem' }}>
        {(
          [
            ['score', 'Score Change'],
            ['period', 'Period Change'],
            ['final', 'Final'],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            className={`chip${mode === id ? ' is-active' : ''}`}
            onClick={() => setMode(id)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="stage" ref={rootRef}>
        <div className="athlete-photo athlete-photo--court" style={{ opacity: 0.55 }} />
        <div className="score-flash" />
        <div className="score-bug">
          <div className="score-row">
            <span className="condensed">HAV</span>
            <span className="score-away-num num">96</span>
          </div>
          <div className="score-row">
            <span className="condensed">RDG</span>
            <span className="num">94</span>
          </div>
          <div className="score-period condensed">Q3 · 04:12</div>
          {mode === 'final' ? <div className="score-final condensed">FINAL</div> : null}
        </div>
      </div>
      <StageControls onReplay={play} playing={playing} />
      <p className="placeholder-note">Restrained score system — information first, motion second.</p>
    </div>
  )
}

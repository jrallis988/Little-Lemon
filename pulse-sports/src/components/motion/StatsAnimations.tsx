import gsap from 'gsap'
import { useCallback, useState } from 'react'
import { StageControls } from '../layout/StageControls'
import { pulseEase, snapEase, useMotionReplay } from '../../hooks/useMotionReplay'

type Mode = 'single' | 'card' | 'compare' | 'season'

export function StatsAnimations() {
  const [mode, setMode] = useState<Mode>('single')

  const build = useCallback(
    (tl: gsap.core.Timeline, root: HTMLElement) => {
      const nums = root.querySelectorAll('.stat-num')
      const labels = root.querySelectorAll('.stat-label')
      const bars = root.querySelectorAll('.stat-bar-fill')
      const panel = root.querySelector('.stats-panel')

      gsap.set(panel, { opacity: 0, y: 24 })
      gsap.set(nums, { opacity: 0, y: 20 })
      gsap.set(labels, { opacity: 0 })
      gsap.set(bars, { scaleX: 0, transformOrigin: 'left' })

      tl.to(panel, { opacity: 1, y: 0, duration: 0.35, ease: pulseEase })
        .to(nums, { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: snapEase }, 0.15)
        .to(labels, { opacity: 1, duration: 0.25, stagger: 0.08 }, 0.3)
        .to(bars, { scaleX: 1, duration: 0.55, stagger: 0.1, ease: pulseEase }, 0.35)
    },
    [mode],
  )

  const { rootRef, play, playing } = useMotionReplay(build, [mode])

  return (
    <div>
      <div className="chip-row" style={{ marginBottom: '0.85rem' }}>
        {(
          [
            ['single', 'Single Stat'],
            ['card', 'Player Card'],
            ['compare', 'Comparison'],
            ['season', 'Season'],
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
        <div className="athlete-photo athlete-photo--marcus" style={{ opacity: 0.45 }} />
        <div className="stage-frame" />
        <div className="stats-panel" data-mode={mode}>
          {mode === 'single' && (
            <div className="stat-single">
              <div className="stat-num num">27.4</div>
              <div className="stat-label condensed">PPG</div>
              <div className="stat-bar">
                <div className="stat-bar-fill" />
              </div>
            </div>
          )}
          {mode === 'card' && (
            <div className="stat-card">
              <div className="stat-card__head condensed">MARCUS REED · 23</div>
              <div className="stat-row">
                <div>
                  <div className="stat-num num">27.4</div>
                  <div className="stat-label">PPG</div>
                  <div className="stat-bar">
                    <div className="stat-bar-fill" style={{ width: '92%' }} />
                  </div>
                </div>
                <div>
                  <div className="stat-num num">8.2</div>
                  <div className="stat-label">RPG</div>
                  <div className="stat-bar">
                    <div className="stat-bar-fill" style={{ width: '74%' }} />
                  </div>
                </div>
                <div>
                  <div className="stat-num num">6.7</div>
                  <div className="stat-label">APG</div>
                  <div className="stat-bar">
                    <div className="stat-bar-fill" style={{ width: '68%' }} />
                  </div>
                </div>
              </div>
            </div>
          )}
          {mode === 'compare' && (
            <div className="stat-compare">
              <div className="stat-compare__col">
                <div className="stat-label condensed">REED</div>
                <div className="stat-num num">27.4</div>
                <div className="stat-bar">
                  <div className="stat-bar-fill" />
                </div>
              </div>
              <div className="stat-compare__vs condensed">VS</div>
              <div className="stat-compare__col">
                <div className="stat-label condensed">COLE</div>
                <div className="stat-num num">24.1</div>
                <div className="stat-bar">
                  <div className="stat-bar-fill" style={{ width: '82%' }} />
                </div>
              </div>
            </div>
          )}
          {mode === 'season' && (
            <div className="stat-season">
              <div className="stat-label condensed">SEASON PERFORMANCE</div>
              <div className="stat-season__nums">
                <div>
                  <div className="stat-num num">27.4</div>
                  <span className="stat-label">PPG</span>
                </div>
                <div>
                  <div className="stat-num num">8.2</div>
                  <span className="stat-label">RPG</span>
                </div>
                <div>
                  <div className="stat-num num">6.7</div>
                  <span className="stat-label">APG</span>
                </div>
                <div>
                  <div className="stat-num num">48.2%</div>
                  <span className="stat-label">FG</span>
                </div>
              </div>
              <div className="stat-bar">
                <div className="stat-bar-fill" />
              </div>
            </div>
          )}
        </div>
      </div>
      <StageControls onReplay={play} playing={playing} />
    </div>
  )
}

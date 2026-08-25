import gsap from 'gsap'
import { useCallback, useState } from 'react'
import { StageControls } from '../layout/StageControls'
import { pulseEase, snapEase, useMotionReplay } from '../../hooks/useMotionReplay'

type Variant = 'pregame' | 'live'

export function MatchupGraphic() {
  const [variant, setVariant] = useState<Variant>('pregame')

  const build = useCallback(
    (tl: gsap.core.Timeline, root: HTMLElement) => {
      const left = root.querySelector('.mu-left')
      const right = root.querySelector('.mu-right')
      const vs = root.querySelector('.mu-vs')
      const meta = root.querySelectorAll('.mu-meta > *')
      const live = root.querySelector('.mu-live')

      gsap.set(left, { xPercent: -40, opacity: 0 })
      gsap.set(right, { xPercent: 40, opacity: 0 })
      gsap.set(vs, { scale: 1.4, opacity: 0 })
      gsap.set(meta, { y: 12, opacity: 0 })
      if (live) gsap.set(live, { opacity: 0 })

      tl.to(left, { xPercent: 0, opacity: 1, duration: 0.4, ease: snapEase })
        .to(right, { xPercent: 0, opacity: 1, duration: 0.4, ease: snapEase }, 0.05)
        .to(vs, { scale: 1, opacity: 1, duration: 0.3, ease: snapEase }, 0.2)
        .to(meta, { y: 0, opacity: 1, duration: 0.3, stagger: 0.06, ease: pulseEase }, 0.35)
      if (live) tl.to(live, { opacity: 1, duration: 0.25 }, 0.5)
    },
    [variant],
  )

  const { rootRef, play, playing } = useMotionReplay(build, [variant])

  return (
    <div>
      <div className="chip-row" style={{ marginBottom: '0.85rem' }}>
        <button
          type="button"
          className={`chip${variant === 'pregame' ? ' is-active' : ''}`}
          onClick={() => setVariant('pregame')}
        >
          Pregame
        </button>
        <button
          type="button"
          className={`chip${variant === 'live' ? ' is-active' : ''}`}
          onClick={() => setVariant('live')}
        >
          Live / Broadcast
        </button>
      </div>
      <div className="stage" ref={rootRef}>
        <div className="athlete-photo athlete-photo--soccer" style={{ opacity: 0.35 }} />
        <div className="stage-frame" />
        <div className={`mu-panel${variant === 'live' ? ' mu-panel--live' : ''}`}>
          {variant === 'live' ? (
            <div className="mu-live condensed">
              <span className="live-dot" /> LIVE · Q3 04:12
            </div>
          ) : null}
          <div className="mu-teams">
            <div className="mu-left">
              <strong className="display">HAVEN</strong>
              <span className="condensed">18–9</span>
            </div>
            <div className="mu-vs display">VS</div>
            <div className="mu-right">
              <strong className="display">RIDGE</strong>
              <span className="condensed">17–10</span>
            </div>
          </div>
          <div className="mu-meta condensed">
            <span>APR 12</span>
            <span>7:30 PM ET</span>
            <span>ARC ARENA</span>
            <span>KEY: M. REED</span>
          </div>
        </div>
      </div>
      <StageControls onReplay={play} playing={playing} />
    </div>
  )
}

import gsap from 'gsap'
import { useCallback, useState } from 'react'
import { StageControls } from '../layout/StageControls'
import { pulseEase, snapEase, useMotionReplay } from '../../hooks/useMotionReplay'

const VARIANTS = {
  athlete: { kicker: 'FORWARD', title: 'MARCUS REED', sub: '23 · NORTH DIVISION' },
  coach: { kicker: 'HEAD COACH', title: 'ELENA VOSS', sub: 'HAVEN FC' },
  reporter: { kicker: 'PULSE SPORTS', title: 'JORDAN LEE', sub: 'SIDELINE' },
  location: { kicker: 'LOCATION', title: 'ARC ARENA', sub: 'PORT CITY' },
  breaking: { kicker: 'BREAKING', title: 'REED TRADED', sub: 'DEAL PENDING LEAGUE APPROVAL' },
} as const

type Key = keyof typeof VARIANTS

export function LowerThirds() {
  const [key, setKey] = useState<Key>('athlete')

  const build = useCallback(
    (tl: gsap.core.Timeline, root: HTMLElement) => {
      const bar = root.querySelector('.lt-bar')
      const block = root.querySelector('.lt-block')
      const lines = root.querySelectorAll('.lt-line')

      gsap.set(bar, { scaleX: 0, transformOrigin: 'left' })
      gsap.set(block, { x: -24, opacity: 0 })
      gsap.set(lines, { y: 12, opacity: 0 })

      tl.to(bar, { scaleX: 1, duration: 0.28, ease: snapEase })
        .to(block, { x: 0, opacity: 1, duration: 0.3, ease: pulseEase }, 0.1)
        .to(lines, { y: 0, opacity: 1, duration: 0.28, stagger: 0.06, ease: pulseEase }, 0.18)
        .to({}, { duration: 1.6 })
        .to(lines, { y: -8, opacity: 0, duration: 0.2, stagger: 0.04 }, 2.1)
        .to(block, { x: -16, opacity: 0, duration: 0.22 }, 2.25)
        .to(bar, { scaleX: 0, transformOrigin: 'right', duration: 0.22, ease: 'power2.in' }, 2.3)
    },
    [key],
  )

  const { rootRef, play, playing } = useMotionReplay(build, [key])
  const data = VARIANTS[key]

  return (
    <div>
      <div className="chip-row" style={{ marginBottom: '0.85rem' }}>
        {(Object.keys(VARIANTS) as Key[]).map((id) => (
          <button
            key={id}
            type="button"
            className={`chip${key === id ? ' is-active' : ''}`}
            onClick={() => setKey(id)}
          >
            {id}
          </button>
        ))}
      </div>
      <div className="stage" ref={rootRef}>
        <div className="athlete-photo athlete-photo--crowd" style={{ opacity: 0.5 }} />
        <div className="lt-wrap">
          <div className="lt-bar" />
          <div className={`lt-block${key === 'breaking' ? ' lt-block--break' : ''}`}>
            <div className="lt-line lt-kicker condensed">{data.kicker}</div>
            <div className="lt-line lt-title display">{data.title}</div>
            <div className="lt-line lt-sub condensed">{data.sub}</div>
          </div>
        </div>
      </div>
      <StageControls onReplay={play} playing={playing} />
    </div>
  )
}

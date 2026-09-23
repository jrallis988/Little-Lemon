import gsap from 'gsap'
import { useCallback, useState } from 'react'
import { StageControls } from '../layout/StageControls'
import { easeCut, easeOut, useMotionReplay } from '../../hooks/useMotionReplay'

/** Product turntable + exploded callout detail views. */
export function ProductTurntable() {
  const [view, setView] = useState<'rotate' | 'macro' | 'explode'>('rotate')

  const build = useCallback(
    (tl: gsap.core.Timeline, root: HTMLElement) => {
      const block = root.querySelector('.pt-block')
      const ring = root.querySelector('.pt-ring')
      const details = root.querySelectorAll('.pt-detail')
      const label = root.querySelector('.pt-label')

      gsap.set(block, { rotateY: -25, opacity: 0, scale: 0.92 })
      gsap.set(ring, { scale: 0.8, opacity: 0 })
      gsap.set(details, { opacity: 0, y: 10 })
      gsap.set(label, { opacity: 0 })

      tl.to(block, { rotateY: 0, opacity: 1, scale: 1, duration: 0.55, ease: easeOut })
        .to(ring, { scale: 1, opacity: 1, duration: 0.4, ease: easeOut }, 0.2)

      if (view === 'rotate') {
        tl.to(block, { rotateY: 360, duration: 2.2, ease: 'none' }, 0.55)
      }
      if (view === 'macro') {
        tl.to(block, { scale: 1.35, y: -20, duration: 0.6, ease: easeCut }, 0.5)
          .to(details, { opacity: 1, y: 0, stagger: 0.1, duration: 0.3 }, 0.7)
      }
      if (view === 'explode') {
        tl.to(details, { opacity: 1, y: 0, stagger: 0.12, duration: 0.35, ease: easeOut }, 0.45)
          .to(label, { opacity: 1, duration: 0.3 }, 0.9)
      }
    },
    [view],
  )

  const { rootRef, play, playing } = useMotionReplay(build, [view])

  return (
    <div>
      <div className="chip-row" style={{ marginBottom: '0.85rem' }}>
        {(
          [
            ['rotate', 'Turntable'],
            ['macro', 'Macro Detail'],
            ['explode', 'Exploded Callouts'],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            className={`chip${view === id ? ' is-active' : ''}`}
            onClick={() => setView(id)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="stage" ref={rootRef}>
        <div className="pt-stage">
          <div className="pt-ring" />
          <div className="pt-block">
            <span className="display">VAPOR</span>
            <span className="tech">EDGE · SKATE</span>
          </div>
          <div className="pt-detail pt-detail--1 tech">CARBON PLATE</div>
          <div className="pt-detail pt-detail--2 tech">QUICK-TIGHT</div>
          <div className="pt-detail pt-detail--3 tech">EDGE HOLD</div>
          <div className="pt-label condensed">BUILT FOR ACCELERATION.</div>
        </div>
      </div>
      <StageControls onReplay={play} playing={playing} />
      <p className="placeholder-note">
        Replace geometric stand-in with product stills / 3D turntable / tracked AE footage.
      </p>
    </div>
  )
}

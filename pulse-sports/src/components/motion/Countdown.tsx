import gsap from 'gsap'
import { useCallback } from 'react'
import { StageControls } from '../layout/StageControls'
import { pulseEase, snapEase, useMotionReplay } from '../../hooks/useMotionReplay'

export function Countdown() {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLElement) => {
    const nums = root.querySelectorAll('.cd-num')
    const live = root.querySelector('.cd-live')
    const bar = root.querySelector('.cd-bar')
    const photo = root.querySelector('.athlete-photo')

    gsap.set(nums, { opacity: 0, scale: 1.4 })
    gsap.set(live, { opacity: 0, scale: 0.9 })
    gsap.set(bar, { scaleX: 0, transformOrigin: 'left' })
    gsap.set(photo, { scale: 1.08 })

    nums.forEach((n, i) => {
      const t = i * 0.7
      tl.to(photo, { scale: 1.02 + i * 0.01, duration: 0.7, ease: 'none' }, t)
        .to(n, { opacity: 1, scale: 1, duration: 0.22, ease: snapEase }, t)
        .to(bar, { scaleX: (i + 1) / 5, duration: 0.55, ease: pulseEase }, t)
        .to(n, { opacity: 0, y: -20, duration: 0.18, ease: 'power2.in' }, t + 0.48)
    })
    tl.to(live, { opacity: 1, scale: 1, duration: 0.35, ease: snapEase })
  }, [])

  const { rootRef, play, playing } = useMotionReplay(build)

  return (
    <div>
      <div className="label-row">
        <span>Countdown</span>
        <span>05 → LIVE · sound timing placeholders</span>
      </div>
      <div className="stage" ref={rootRef}>
        <div className="athlete-photo athlete-photo--crowd" />
        <div className="stage-frame" />
        <div className="cd-bar" />
        <div className="cd-stage">
          {['05', '04', '03', '02', '01'].map((n) => (
            <span key={n} className="cd-num num">
              {n}
            </span>
          ))}
          <span className="cd-live display">
            <span className="live-dot" /> LIVE
          </span>
        </div>
      </div>
      <StageControls onReplay={play} playing={playing} />
    </div>
  )
}

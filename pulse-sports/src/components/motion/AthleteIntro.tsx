import gsap from 'gsap'
import { useCallback } from 'react'
import { StageControls } from '../layout/StageControls'
import { pulseEase, snapEase, useMotionReplay } from '../../hooks/useMotionReplay'

export function AthleteIntro() {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLElement) => {
    const photo = root.querySelector('.athlete-photo')
    const number = root.querySelector('.ai-number')
    const name = root.querySelector('.ai-name')
    const meta = root.querySelectorAll('.ai-meta > *')
    const bar = root.querySelector('.ai-bar')
    const stat = root.querySelector('.ai-stat')

    gsap.set(photo, { scale: 1.15, xPercent: 8 })
    gsap.set(number, { opacity: 0, scale: 1.3 })
    gsap.set(name, { y: 40, opacity: 0, clipPath: 'inset(0 0 100% 0)' })
    gsap.set(meta, { y: 16, opacity: 0 })
    gsap.set(bar, { scaleX: 0, transformOrigin: 'left' })
    gsap.set(stat, { opacity: 0, x: 20 })

    tl.to(photo, { scale: 1, xPercent: 0, duration: 1.1, ease: 'power2.out' })
      .to(bar, { scaleX: 1, duration: 0.35, ease: snapEase }, 0.2)
      .to(number, { opacity: 1, scale: 1, duration: 0.4, ease: snapEase }, 0.25)
      .to(name, { y: 0, opacity: 1, clipPath: 'inset(0 0 0% 0)', duration: 0.45, ease: pulseEase }, 0.4)
      .to(meta, { y: 0, opacity: 1, duration: 0.3, stagger: 0.08, ease: pulseEase }, 0.7)
      .to(stat, { opacity: 1, x: 0, duration: 0.35, ease: pulseEase }, 1.0)
  }, [])

  const { rootRef, play, playing } = useMotionReplay(build)

  return (
    <div>
      <div className="label-row">
        <span>Athlete Introduction</span>
        <span>3–5s</span>
      </div>
      <div className="stage" ref={rootRef}>
        <div className="athlete-photo athlete-photo--marcus" />
        <div className="stage-frame" />
        <div className="ai-layout">
          <div className="ai-bar" />
          <div className="ai-number num">23</div>
          <h3 className="ai-name display">MARCUS REED</h3>
          <div className="ai-meta condensed">
            <span>FORWARD</span>
            <span>NORTH DIVISION</span>
            <span>TEAM PLACEHOLDER</span>
          </div>
          <div className="ai-stat">
            <strong className="num">27.4</strong>
            <span>PPG</span>
          </div>
        </div>
      </div>
      <StageControls onReplay={play} playing={playing} />
    </div>
  )
}

import gsap from 'gsap'
import { useCallback } from 'react'
import { StageControls } from '../layout/StageControls'
import { pulseEase, snapEase, useMotionReplay } from '../../hooks/useMotionReplay'

const WORDS = ['SPEED', 'POWER', 'PRECISION', 'PRESSURE', 'MOMENT', 'PULSE'] as const

export function TypeSequence() {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLElement) => {
    const words = root.querySelectorAll('.type-word')
    const crop = root.querySelector('.type-crop')
    gsap.set(words, { opacity: 0, scale: 1.4, yPercent: 20 })
    gsap.set(crop, { scaleX: 0, transformOrigin: 'left center' })

    words.forEach((word, i) => {
      const t = i * 0.55
      tl.to(word, { opacity: 1, scale: 1, yPercent: 0, duration: 0.28, ease: snapEase }, t)
      if (i < words.length - 1) {
        tl.to(word, { opacity: 0, xPercent: -30, duration: 0.18, ease: 'power2.in' }, t + 0.38)
      }
    })
    tl.to(crop, { scaleX: 1, duration: 0.35, ease: pulseEase }, WORDS.length * 0.55 - 0.2)
  }, [])

  const { rootRef, play, playing } = useMotionReplay(build)

  return (
    <div>
      <div className="label-row">
        <span>Animated Typography</span>
        <span>Readable · Cropped · Timed</span>
      </div>
      <div className="stage" ref={rootRef}>
        <div className="athlete-photo athlete-photo--court" />
        <div className="stage-frame" />
        <div className="type-stage">
          {WORDS.map((w) => (
            <span key={w} className={`type-word${w === 'PULSE' ? ' type-word--signal' : ''}`}>
              {w}
            </span>
          ))}
          <div className="type-crop" />
        </div>
      </div>
      <StageControls onReplay={play} playing={playing} />
    </div>
  )
}

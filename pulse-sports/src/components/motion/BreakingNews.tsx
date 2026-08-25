import gsap from 'gsap'
import { useCallback } from 'react'
import { StageControls } from '../layout/StageControls'
import { pulseEase, snapEase, useMotionReplay } from '../../hooks/useMotionReplay'

export function BreakingNews() {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLElement) => {
    const sting = root.querySelector('.bn-sting')
    const headline = root.querySelector('.bn-headline')
    const info = root.querySelector('.bn-info')
    const image = root.querySelector('.bn-image')
    const lt = root.querySelector('.bn-lt')
    const out = root.querySelector('.bn-out')

    gsap.set([sting, headline, info, image, lt, out], { clearProps: 'all' })
    gsap.set(sting, { scaleX: 0, opacity: 1, transformOrigin: 'left' })
    gsap.set(headline, { y: 30, opacity: 0 })
    gsap.set(info, { opacity: 0, x: -16 })
    gsap.set(image, { opacity: 0, xPercent: 12 })
    gsap.set(lt, { y: 20, opacity: 0 })
    gsap.set(out, { scaleX: 0, transformOrigin: 'right' })

    tl.to(sting, { scaleX: 1, duration: 0.35, ease: snapEase })
      .to(headline, { y: 0, opacity: 1, duration: 0.4, ease: pulseEase }, 0.25)
      .to(info, { opacity: 1, x: 0, duration: 0.3, ease: pulseEase }, 0.45)
      .to(image, { opacity: 1, xPercent: 0, duration: 0.45, ease: pulseEase }, 0.35)
      .to(lt, { y: 0, opacity: 1, duration: 0.3, ease: pulseEase }, 0.7)
      .to({}, { duration: 1.2 })
      .to([headline, info, image, lt], { opacity: 0, duration: 0.2 }, 2.4)
      .to(out, { scaleX: 1, duration: 0.3, ease: snapEase }, 2.5)
  }, [])

  const { rootRef, play, playing } = useMotionReplay(build)

  return (
    <div>
      <div className="label-row">
        <span>Breaking Sports News</span>
        <span>Sting → Headline → Hold → Out</span>
      </div>
      <div className="stage" ref={rootRef}>
        <div className="bn-image athlete-photo athlete-photo--marcus" />
        <div className="bn-sting" />
        <div className="bn-copy">
          <p className="bn-kicker condensed">BREAKING</p>
          <h3 className="bn-headline display">REED TO RIDGE</h3>
          <p className="bn-info condensed">TRADE CONFIRMED · MULTI-TEAM DEAL</p>
        </div>
        <div className="bn-lt condensed">PULSE SPORTS · DEVELOPING</div>
        <div className="bn-out" />
      </div>
      <StageControls onReplay={play} playing={playing} />
      <p className="placeholder-note">Sports media tone — not cable-news chrome.</p>
    </div>
  )
}

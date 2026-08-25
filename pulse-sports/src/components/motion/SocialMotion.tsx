import gsap from 'gsap'
import { useCallback } from 'react'
import { StageControls } from '../layout/StageControls'
import { pulseEase, snapEase, useMotionReplay } from '../../hooks/useMotionReplay'

export function SocialPromo({ ratio = '9:16' }: { ratio?: '9:16' | '1:1' | '4:5' | '16:9' }) {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLElement) => {
    const beats = root.querySelectorAll('.sp-beat')
    gsap.set(beats, { opacity: 0, y: 24 })
    beats.forEach((beat, i) => {
      const t = i * 1.85
      tl.to(beat, { opacity: 1, y: 0, duration: 0.35, ease: snapEase }, t)
      if (i < beats.length - 1) {
        tl.to(beat, { opacity: 0, y: -16, duration: 0.25, ease: 'power2.in' }, t + 1.5)
      }
    })
  }, [ratio])

  const { rootRef, play, playing } = useMotionReplay(build, [ratio])

  const isVertical = ratio === '9:16' || ratio === '4:5'
  const layout = isVertical ? 'sp--vertical' : ratio === '1:1' ? 'sp--square' : 'sp--wide'

  return (
    <div>
      <div className="label-row">
        <span>10-Second Social Promo</span>
        <span>{ratio}</span>
      </div>
      <div className={`stage ${layout}`} ref={rootRef} data-ratio={ratio}>
        <div className="athlete-photo athlete-photo--sprint" />
        <div className="stage-frame" />
        <div className={`sp-stack ${layout}`}>
          <div className="sp-beat">
            <span className="condensed">0–2s</span>
            <strong className="display">THE MOMENT</strong>
          </div>
          <div className="sp-beat">
            <span className="condensed">2–4s</span>
            <strong className="display">MARCUS REED</strong>
            <em>23 · FORWARD</em>
          </div>
          <div className="sp-beat">
            <span className="condensed">4–6s</span>
            <strong className="display num">27.4 PPG</strong>
          </div>
          <div className="sp-beat">
            <span className="condensed">6–8s</span>
            <strong className="display">HAVEN VS RIDGE</strong>
            <em>APR 12 · 7:30 ET</em>
          </div>
          <div className="sp-beat sp-beat--brand">
            <span className="condensed">8–10s</span>
            <strong className="display">
              PULSE <em>SPORTS</em>
            </strong>
            <em>FEEL EVERY SECOND.</em>
          </div>
        </div>
      </div>
      <StageControls onReplay={play} playing={playing} />
    </div>
  )
}

export function SocialEndCard() {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLElement) => {
    const bar = root.querySelector('.ec-bar')
    const brand = root.querySelector('.ec-brand')
    const tag = root.querySelector('.ec-tag')
    const cta = root.querySelectorAll('.ec-cta span')

    gsap.set(bar, { scaleX: 0, transformOrigin: 'center' })
    gsap.set(brand, { opacity: 0, y: 16 })
    gsap.set(tag, { opacity: 0 })
    gsap.set(cta, { opacity: 0, y: 8 })

    tl.to(bar, { scaleX: 1, duration: 0.35, ease: snapEase })
      .to(brand, { opacity: 1, y: 0, duration: 0.35, ease: pulseEase }, 0.15)
      .to(tag, { opacity: 1, duration: 0.3, ease: pulseEase }, 0.35)
      .to(cta, { opacity: 1, y: 0, duration: 0.25, stagger: 0.08, ease: pulseEase }, 0.55)
  }, [])

  const { rootRef, play, playing } = useMotionReplay(build)

  return (
    <div>
      <div className="label-row">
        <span>Social End Card</span>
        <span>2–3s · restrained</span>
      </div>
      <div className="stage" ref={rootRef}>
        <div className="ec-bg" />
        <div className="ec-bar" />
        <div className="ec-content">
          <h3 className="ec-brand display">
            PULSE <em>SPORTS</em>
          </h3>
          <p className="ec-tag condensed">FEEL EVERY SECOND.</p>
          <div className="ec-cta condensed">
            <span>WATCH NOW</span>
            <span>FOLLOW</span>
            <span>NEXT GAME</span>
          </div>
        </div>
      </div>
      <StageControls onReplay={play} playing={playing} />
    </div>
  )
}

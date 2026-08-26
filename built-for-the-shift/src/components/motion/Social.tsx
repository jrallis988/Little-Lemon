import gsap from 'gsap'
import { useCallback } from 'react'
import { StageControls } from '../layout/StageControls'
import { easeCut, easeOut, useMotionReplay } from '../../hooks/useMotionReplay'

export function SocialPromo({ ratio = '9:16' }: { ratio?: '9:16' | '1:1' | '4:5' | '16:9' }) {
  const build = useCallback(
    (tl: gsap.core.Timeline, root: HTMLElement) => {
      const beats = root.querySelectorAll('.sp-beat')
      gsap.set(beats, { opacity: 0, y: 20 })
      beats.forEach((beat, i) => {
        const t = i * 1.5
        tl.to(beat, { opacity: 1, y: 0, duration: 0.3, ease: easeCut }, t)
        if (i < beats.length - 1) {
          tl.to(beat, { opacity: 0, y: -12, duration: 0.2, ease: 'power2.in' }, t + 1.2)
        }
      })
    },
    [ratio],
  )

  const { rootRef, play, playing } = useMotionReplay(build, [ratio])
  const isVertical = ratio === '9:16' || ratio === '4:5'
  const layout = isVertical ? 'sp--vertical' : ratio === '1:1' ? 'sp--square' : 'sp--wide'

  return (
    <div>
      <div className="label-row">
        <span>Social Promo</span>
        <span>{ratio} · rebuilt composition</span>
      </div>
      <div className={`stage ${layout}`} ref={rootRef} data-ratio={ratio}>
        <div className="hockey-photo hockey-photo--action" />
        <div className="sp-stack">
          <div className="sp-beat">
            <span>OPEN</span>
            <strong>THE SHIFT STARTS</strong>
          </div>
          <div className="sp-beat">
            <span>ATHLETE</span>
            <strong>NOVA REED</strong>
            <em>Forward · First stride</em>
          </div>
          <div className="sp-beat">
            <span>PERFORMANCE</span>
            <strong className="num">0.38s</strong>
            <em>First-stride response</em>
          </div>
          <div className="sp-beat">
            <span>PRODUCT</span>
            <strong>VAPOR EDGE</strong>
            <em>Built for acceleration</em>
          </div>
          <div className="sp-beat">
            <span>CLOSE</span>
            <strong>
              BUILT FOR <em style={{ color: 'var(--shift-iceblue)', fontFamily: 'inherit' }}>THE SHIFT.</em>
            </strong>
          </div>
        </div>
      </div>
      <StageControls onReplay={play} playing={playing} />
    </div>
  )
}

export function EndCard() {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLElement) => {
    const line = root.querySelector('.ec-line')
    const sub = root.querySelector('.ec-sub')
    const cta = root.querySelectorAll('.ec-cta span')
    gsap.set(line, { opacity: 0, y: 16 })
    gsap.set(sub, { opacity: 0 })
    gsap.set(cta, { opacity: 0, y: 8 })
    tl.to(line, { opacity: 1, y: 0, duration: 0.4, ease: easeOut })
      .to(sub, { opacity: 1, duration: 0.3 }, 0.25)
      .to(cta, { opacity: 1, y: 0, duration: 0.25, stagger: 0.08 }, 0.45)
  }, [])

  const { rootRef, play, playing } = useMotionReplay(build)

  return (
    <div>
      <div className="label-row">
        <span>Social Closer / End Card</span>
        <span>2–3s · restrained</span>
      </div>
      <div className="stage" ref={rootRef}>
        <div className="ec-bg" />
        <div className="ec-content">
          <h3 className="ec-line">
            BUILT FOR <em>THE SHIFT.</em>
          </h3>
          <p className="ec-sub">CAMPAIGN STING</p>
          <div className="ec-cta">
            <span>SHOP THE LINE</span>
            <span>WATCH FILM</span>
            <span>FOLLOW</span>
          </div>
        </div>
      </div>
      <StageControls onReplay={play} playing={playing} />
    </div>
  )
}

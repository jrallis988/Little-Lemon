import gsap from 'gsap'
import { useCallback } from 'react'
import { StageControls } from '../layout/StageControls'
import { easeCut, easeOut, useMotionReplay } from '../../hooks/useMotionReplay'

/** :06 paid social sting — Impact → Product → Line */
export function PaidSting() {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLElement) => {
    const impact = root.querySelector('.sting-impact')
    const product = root.querySelector('.sting-product')
    const line = root.querySelector('.sting-line')
    const flash = root.querySelector('.sting-flash')

    gsap.set([impact, product, line], { opacity: 0 })
    gsap.set(impact, { scale: 1.3 })
    gsap.set(product, { y: 20 })
    gsap.set(line, { y: 12 })
    gsap.set(flash, { opacity: 0 })

    tl.to(flash, { opacity: 0.55, duration: 0.08 })
      .to(flash, { opacity: 0, duration: 0.2 })
      .to(impact, { opacity: 1, scale: 1, duration: 0.28, ease: easeCut }, 0.05)
      .to(impact, { opacity: 0, duration: 0.15 }, 1.4)
      .to(product, { opacity: 1, y: 0, duration: 0.3, ease: easeOut }, 1.45)
      .to(product, { opacity: 0, duration: 0.15 }, 3.2)
      .to(line, { opacity: 1, y: 0, duration: 0.35, ease: easeOut }, 3.3)
  }, [])

  const { rootRef, play, playing } = useMotionReplay(build)

  return (
    <div>
      <div className="label-row">
        <span>:06 Paid Sting</span>
        <span>Impact → Product → Line</span>
      </div>
      <div className="stage" ref={rootRef}>
        <div className="hockey-photo hockey-photo--action" />
        <div className="sting-flash" />
        <div className="sting-impact display">IMPACT</div>
        <div className="sting-product">
          <span className="tech">SKATE</span>
          <strong className="display">VAPOR EDGE</strong>
          <em className="condensed">BUILT FOR ACCELERATION.</em>
        </div>
        <div className="sting-line display">
          BUILT FOR <span className="ice">THE SHIFT.</span>
        </div>
      </div>
      <StageControls onReplay={play} playing={playing} />
      <p className="placeholder-note">Maps to SHIFT_Hero_06_1x1.mp4 / paid bumper exports.</p>
    </div>
  )
}

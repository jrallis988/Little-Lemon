import gsap from 'gsap'
import { useCallback } from 'react'
import { StageControls } from '../layout/StageControls'
import { pulseEase, snapEase, useMotionReplay } from '../../hooks/useMotionReplay'

export function NetworkIntro({ compact = false }: { compact?: boolean }) {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLElement) => {
    const shots = root.querySelectorAll('.intro-shot')
    const score = root.querySelector('.intro-score')
    const moments = root.querySelectorAll('.intro-moment')
    const converge = root.querySelector('.intro-converge')
    const brand = root.querySelector('.intro-brand')
    const tag = root.querySelector('.intro-tag')

    gsap.set([shots, score, moments, converge, brand, tag], { clearProps: 'all' })
    gsap.set(shots, { opacity: 0, scale: 1.12 })
    gsap.set(score, { opacity: 0, y: 30 })
    gsap.set(moments, { opacity: 0, y: 40 })
    gsap.set(converge, { scaleX: 0, opacity: 1, transformOrigin: 'center' })
    gsap.set([brand, tag], { opacity: 0, y: 20 })

    tl.to(shots[0], { opacity: 1, scale: 1, duration: 0.55, ease: pulseEase })
      .to(shots[0], { opacity: 0, duration: 0.15 }, 0.85)
      .fromTo(score, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.35, ease: snapEase }, 0.9)
      .to(score, { opacity: 0, duration: 0.15 }, 1.7)
      .to(
        moments,
        { opacity: 1, y: 0, duration: 0.35, stagger: 0.12, ease: pulseEase },
        1.75,
      )
      .to(moments, { opacity: 0, duration: 0.2 }, 3.4)
      .to(converge, { scaleX: 1, duration: 0.35, ease: snapEase }, 3.5)
      .to(converge, { opacity: 0, duration: 0.2 }, 4.1)
      .to(brand, { opacity: 1, y: 0, duration: 0.4, ease: pulseEase }, 4.2)
      .to(tag, { opacity: 1, y: 0, duration: 0.35, ease: pulseEase }, 4.55)
  }, [])

  const { rootRef, play, playing } = useMotionReplay(build)

  return (
    <div>
      {!compact ? (
        <div className="label-row">
          <span>Sports Network Intro</span>
          <span>5–7s prototype</span>
        </div>
      ) : null}
      <div className="stage" ref={rootRef}>
        <div className="stage-frame" />
        <div className="intro-shot athlete-photo athlete-photo--sprint" />
        <div className="intro-score intro-overlay">
          <span className="num">24.18</span>
          <em>SECONDS</em>
        </div>
        <div className="intro-moments">
          <div className="intro-moment">
            <span>SHOT</span>
          </div>
          <div className="intro-moment">
            <span>SAVE</span>
          </div>
          <div className="intro-moment">
            <span>GOAL</span>
          </div>
        </div>
        <div className="intro-converge" />
        <div className="intro-end">
          <h3 className="intro-brand display">
            PULSE <em>SPORTS</em>
          </h3>
          <p className="intro-tag condensed">FEEL EVERY SECOND.</p>
        </div>
      </div>
      <StageControls onReplay={play} playing={playing} />
      {!compact ? (
        <p className="placeholder-note">
          Replace with AE export — rapid athlete cuts, score hit, converge, brand hold.
        </p>
      ) : null}
    </div>
  )
}

import gsap from 'gsap'
import { useCallback } from 'react'
import { PulseMark } from '../brand/PulseLogo'
import { StageControls } from '../layout/StageControls'
import { pulseEase, snapEase, useMotionReplay } from '../../hooks/useMotionReplay'

export function LogoImpact() {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLElement) => {
    const mark = root.querySelector('.anim-mark')
    const word = root.querySelector('.anim-word')
    const sports = root.querySelector('.anim-sports')
    const bar = root.querySelector('.anim-bar')
    gsap.set([mark, word, sports, bar], { clearProps: 'all' })
    gsap.set(mark, { scale: 1.6, opacity: 0, transformOrigin: '50% 50%' })
    gsap.set(word, { y: 24, opacity: 0 })
    gsap.set(sports, { opacity: 0, x: -12 })
    gsap.set(bar, { scaleX: 0, transformOrigin: 'left center' })
    tl.to(mark, { scale: 1, opacity: 1, duration: 0.28, ease: snapEase }, 0)
      .to(bar, { scaleX: 1, duration: 0.22, ease: pulseEase }, 0.08)
      .to(word, { y: 0, opacity: 1, duration: 0.25, ease: pulseEase }, 0.12)
      .to(sports, { x: 0, opacity: 1, duration: 0.2, ease: pulseEase }, 0.22)
  }, [])

  const { rootRef, play, playing } = useMotionReplay(build)

  return (
    <div className="motion-card">
      <div className="label-row">
        <span>Version A</span>
        <span>~1.0s</span>
      </div>
      <div className="stage" ref={rootRef}>
        <div className="stage-frame" />
        <div className="logo-stage">
          <div className="anim-bar logo-bar" />
          <PulseMark className="anim-mark logo-mark" />
          <div className="logo-type">
            <span className="anim-word">PULSE</span>
            <span className="anim-sports">SPORTS</span>
          </div>
        </div>
      </div>
      <h3>IMPACT</h3>
      <p>Fast entrance. Logo resolves immediately.</p>
      <StageControls onReplay={play} playing={playing} />
    </div>
  )
}

export function LogoBuild() {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLElement) => {
    const parts = root.querySelectorAll('.build-part')
    const word = root.querySelector('.anim-word')
    const sports = root.querySelector('.anim-sports')
    gsap.set(parts, { y: 40, opacity: 0, rotate: -8 })
    gsap.set([word, sports], { opacity: 0, y: 16 })
    tl.to(parts, {
      y: 0,
      opacity: 1,
      rotate: 0,
      duration: 0.45,
      stagger: 0.08,
      ease: pulseEase,
    })
      .to(word, { opacity: 1, y: 0, duration: 0.35, ease: pulseEase }, 0.55)
      .to(sports, { opacity: 1, y: 0, duration: 0.3, ease: pulseEase }, 0.7)
  }, [])

  const { rootRef, play, playing } = useMotionReplay(build)

  return (
    <div className="motion-card">
      <div className="label-row">
        <span>Version B</span>
        <span>~2.0s</span>
      </div>
      <div className="stage" ref={rootRef}>
        <div className="stage-frame" />
        <div className="logo-stage logo-stage--build">
          <div className="build-parts" aria-hidden="true">
            <span className="build-part bar-v" />
            <span className="build-part bar-h" />
            <span className="build-part bar-slash" />
            <span className="build-part bar-core" />
          </div>
          <div className="logo-type">
            <span className="anim-word">PULSE</span>
            <span className="anim-sports">SPORTS</span>
          </div>
        </div>
      </div>
      <h3>BUILD</h3>
      <p>Graphic elements assemble into the identity.</p>
      <StageControls onReplay={play} playing={playing} />
    </div>
  )
}

export function LogoPulse() {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLElement) => {
    const wave = root.querySelector('.pulse-wave')
    const core = root.querySelector('.pulse-core')
    const word = root.querySelector('.anim-word')
    const tag = root.querySelector('.anim-tag')
    gsap.set(wave, { strokeDasharray: 220, strokeDashoffset: 220 })
    gsap.set(core, { scale: 0, transformOrigin: '50% 50%' })
    gsap.set(word, { opacity: 0, letterSpacing: '0.2em' })
    gsap.set(tag, { opacity: 0, y: 10 })
    tl.to(wave, { strokeDashoffset: 0, duration: 1.1, ease: 'power2.inOut' })
      .to(core, { scale: 1, duration: 0.25, ease: snapEase }, 0.55)
      .to(core, { scale: 1.35, duration: 0.18, yoyo: true, repeat: 1, ease: 'power1.inOut' }, 0.85)
      .to(word, { opacity: 1, letterSpacing: '0.04em', duration: 0.45, ease: pulseEase }, 1.0)
      .to(tag, { opacity: 1, y: 0, duration: 0.35, ease: pulseEase }, 1.35)
  }, [])

  const { rootRef, play, playing } = useMotionReplay(build)

  return (
    <div className="motion-card">
      <div className="label-row">
        <span>Version C</span>
        <span>~2.5s</span>
      </div>
      <div className="stage" ref={rootRef}>
        <div className="stage-frame" />
        <div className="logo-stage">
          <PulseMark className="logo-mark logo-mark--lg" />
          <div className="logo-type">
            <span className="anim-word">PULSE</span>
          </div>
          <p className="anim-tag logo-tag">FEEL EVERY SECOND.</p>
        </div>
      </div>
      <h3>PULSE</h3>
      <p>Movement based on rhythm and timing.</p>
      <StageControls onReplay={play} playing={playing} />
    </div>
  )
}

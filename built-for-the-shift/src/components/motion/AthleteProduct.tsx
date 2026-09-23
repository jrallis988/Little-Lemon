import gsap from 'gsap'
import { useCallback, useState } from 'react'
import { StageControls } from '../layout/StageControls'
import { easeCut, easeOut, useMotionReplay } from '../../hooks/useMotionReplay'

export function AthleteIntro() {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLElement) => {
    const photo = root.querySelector('.hockey-photo')
    const bar = root.querySelector('.ai-bar')
    const name = root.querySelector('.ai-name')
    const meta = root.querySelectorAll('.ai-meta > *')
    const line = root.querySelector('.ai-line')
    gsap.set(photo, { scale: 1.12, xPercent: 6 })
    gsap.set(bar, { scaleX: 0, transformOrigin: 'left' })
    gsap.set(name, { y: 28, opacity: 0 })
    gsap.set(meta, { y: 12, opacity: 0 })
    gsap.set(line, { opacity: 0 })
    tl.to(photo, { scale: 1, xPercent: 0, duration: 1.05, ease: 'power2.out' })
      .to(bar, { scaleX: 1, duration: 0.3, ease: easeCut }, 0.2)
      .to(name, { y: 0, opacity: 1, duration: 0.4, ease: easeOut }, 0.35)
      .to(meta, { y: 0, opacity: 1, duration: 0.28, stagger: 0.07, ease: easeOut }, 0.55)
      .to(line, { opacity: 1, duration: 0.3 }, 0.85)
  }, [])

  const { rootRef, play, playing } = useMotionReplay(build)

  return (
    <div>
      <div className="label-row">
        <span>Athlete Introduction</span>
        <span>Template · replaceable fields</span>
      </div>
      <div className="stage" ref={rootRef}>
        <div className="hockey-photo hockey-photo--action" />
        <div className="ai-layout">
          <div className="ai-bar" />
          <h3 className="ai-name display">NOVA REED</h3>
          <div className="ai-meta">
            <span>FORWARD · #19</span>
            <span>SHIFT LENGTH 0:42</span>
            <span>ICE TIME STORY</span>
          </div>
          <div className="ai-line condensed">BUILT FOR THE SHIFT.</div>
        </div>
      </div>
      <StageControls onReplay={play} playing={playing} />
    </div>
  )
}

export function PerformanceStat() {
  const [mode, setMode] = useState<'accel' | 'edge' | 'release'>('accel')
  const copy = {
    accel: { num: '0.38s', label: 'FIRST-STRIDE RESPONSE', unit: 'SKATE · ACCELERATION' },
    edge: { num: '27°', label: 'EDGE ANGLE HOLD', unit: 'SKATE · CONTROL' },
    release: { num: '92 mph', label: 'SHOT RELEASE', unit: 'STICK · RELEASE' },
  }[mode]

  const build = useCallback(
    (tl: gsap.core.Timeline, root: HTMLElement) => {
      const panel = root.querySelector('.perf-panel')
      const num = root.querySelector('.perf-num')
      const fill = root.querySelector('.perf-bar-fill')
      gsap.set(panel, { y: 24, opacity: 0 })
      gsap.set(num, { y: 16, opacity: 0 })
      gsap.set(fill, { scaleX: 0 })
      tl.to(panel, { y: 0, opacity: 1, duration: 0.35, ease: easeOut })
        .to(num, { y: 0, opacity: 1, duration: 0.35, ease: easeCut }, 0.1)
        .to(fill, { scaleX: 1, duration: 0.55, ease: easeOut }, 0.2)
    },
    [mode],
  )

  const { rootRef, play, playing } = useMotionReplay(build, [mode])

  return (
    <div>
      <div className="chip-row" style={{ marginBottom: '0.85rem' }}>
        {(
          [
            ['accel', 'Acceleration'],
            ['edge', 'Control'],
            ['release', 'Release'],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            className={`chip${mode === id ? ' is-active' : ''}`}
            onClick={() => setMode(id)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="stage" ref={rootRef}>
        <div className="hockey-photo hockey-photo--skate" style={{ opacity: 0.55 }} />
        <div className="perf-panel">
          <div className="perf-unit">{copy.unit}</div>
          <div className="perf-num">{copy.num}</div>
          <div className="perf-label condensed">{copy.label}</div>
          <div className="perf-bar">
            <div className="perf-bar-fill" />
          </div>
        </div>
      </div>
      <StageControls onReplay={play} playing={playing} />
    </div>
  )
}

export function ProductReveal() {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLElement) => {
    const block = root.querySelector('.product-block')
    const callouts = root.querySelectorAll('.product-callout')
    const line = root.querySelector('.product-line')
    gsap.set(block, { rotateY: -18, opacity: 0, y: 30 })
    gsap.set(callouts, { opacity: 0, x: -12 })
    gsap.set(line, { opacity: 0 })
    tl.to(block, { rotateY: 0, opacity: 1, y: 0, duration: 0.55, ease: easeOut })
      .to(callouts, { opacity: 1, x: 0, duration: 0.3, stagger: 0.12, ease: easeOut }, 0.35)
      .to(line, { opacity: 1, duration: 0.3 }, 0.75)
  }, [])

  const { rootRef, play, playing } = useMotionReplay(build)

  return (
    <div>
      <div className="label-row">
        <span>Product Reveal + Callouts</span>
        <span>Macro · tech · editable</span>
      </div>
      <div className="stage" ref={rootRef}>
        <div className="product-stage">
          <div className="product-block">
            <div className="name">VAPOR</div>
          </div>
        </div>
        <div className="product-callouts">
          <div className="product-callout product-callout--1">CARBON MIDSOLE</div>
          <div className="product-callout product-callout--2">QUICK-TIGHT LACE LOCK</div>
          <div className="product-callout product-callout--3">EDGE HOLD GEOMETRY</div>
        </div>
        <div
          className="product-line condensed"
          style={{
            position: 'absolute',
            left: '6%',
            bottom: '8%',
            zIndex: 4,
            color: 'var(--shift-volt)',
            letterSpacing: '0.14em',
          }}
        >
          BUILT FOR ACCELERATION.
        </div>
      </div>
      <StageControls onReplay={play} playing={playing} />
      <p className="placeholder-note">
        Replace block with product stills / 3D turntable / AE tracked footage.
      </p>
    </div>
  )
}

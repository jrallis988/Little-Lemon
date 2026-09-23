import gsap from 'gsap'
import { useCallback, useState } from 'react'
import { StageControls } from '../layout/StageControls'
import { easeCut, easeOut, useMotionReplay } from '../../hooks/useMotionReplay'

type Bridge = 'accel' | 'release' | 'impact'

export function AthleteProductBridge() {
  const [bridge, setBridge] = useState<Bridge>('accel')

  const sequences: Record<Bridge, { k: string; w: string; d: string }[]> = {
    accel: [
      { k: 'ATHLETE', w: 'EXPLOSIVE START', d: 'First stride off the wall.' },
      { k: 'ACTION', w: 'ACCELERATE', d: 'Momentum builds through the skate.' },
      { k: 'EQUIPMENT', w: 'VAPOR EDGE', d: 'Isolated through motion / compositing.' },
      { k: 'BENEFIT', w: 'BUILT FOR ACCELERATION.', d: 'Product answers the shift demand.' },
    ],
    release: [
      { k: 'ATHLETE', w: 'QUICK RELEASE', d: 'Hands load. Blade loads.' },
      { k: 'ACTION', w: 'RELEASE', d: 'Shot leaves — trajectory opens.' },
      { k: 'EQUIPMENT', w: 'NEXUS PRO', d: 'Stick becomes the visual focus.' },
      { k: 'BENEFIT', w: 'BUILT FOR THE SHIFT.', d: 'Technology → performance benefit.' },
    ],
    impact: [
      { k: 'ATHLETE', w: 'ABSORB CONTACT', d: 'Board battle mid-shift.' },
      { k: 'ACTION', w: 'IMPACT', d: 'Compression. Collision answered.' },
      { k: 'EQUIPMENT', w: 'RE-AKT HELMET', d: 'Protection callout lands.' },
      { k: 'BENEFIT', w: 'BUILT FOR CONTACT.', d: 'Gear that stays in the play.' },
    ],
  }

  const build = useCallback(
    (tl: gsap.core.Timeline, root: HTMLElement) => {
      const steps = root.querySelectorAll('.ap-step')
      gsap.set(steps, { opacity: 0, y: 20 })
      steps.forEach((step, i) => {
        const t = i * 0.95
        tl.to(step, { opacity: 1, y: 0, duration: 0.32, ease: easeCut }, t)
        if (i < steps.length - 1) {
          tl.to(step, { opacity: 0, y: -14, duration: 0.2, ease: 'power2.in' }, t + 0.7)
        }
      })
    },
    [bridge],
  )

  const { rootRef, play, playing } = useMotionReplay(build, [bridge])
  const steps = sequences[bridge]

  return (
    <div>
      <div className="chip-row" style={{ marginBottom: '0.85rem' }}>
        {(
          [
            ['accel', 'Skate · Accelerate'],
            ['release', 'Stick · Release'],
            ['impact', 'Helmet · Impact'],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            className={`chip${bridge === id ? ' is-active' : ''}`}
            onClick={() => setBridge(id)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="stage" ref={rootRef}>
        <div
          className={`hockey-photo ${
            bridge === 'release'
              ? 'hockey-photo--stick'
              : bridge === 'impact'
                ? 'hockey-photo--rink'
                : 'hockey-photo--skate'
          }`}
        />
        <div className="ap-flow">
          {steps.map((s) => (
            <div key={s.w} className="ap-step">
              <div className="k">{s.k}</div>
              <div className="w">{s.w}</div>
              <p className="d">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
      <StageControls onReplay={play} playing={playing} />
      <p className="placeholder-note">
        Athlete → Action → Performance → Product → Benefit — one continuous motion idea.
      </p>
    </div>
  )
}

const WORDS = ['ACCELERATE', 'CUT', 'RELEASE', 'IMPACT', 'CONTROL', 'RESET'] as const

export function KineticType() {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLElement) => {
    const words = root.querySelectorAll('.type-word')
    gsap.set(words, { opacity: 0, scale: 1.35, yPercent: 18 })
    words.forEach((word, i) => {
      const t = i * 0.5
      tl.to(word, { opacity: 1, scale: 1, yPercent: 0, duration: 0.25, ease: easeCut }, t)
      if (i < words.length - 1) {
        tl.to(word, { opacity: 0, xPercent: -24, duration: 0.16, ease: 'power2.in' }, t + 0.34)
      }
    })
  }, [])

  const { rootRef, play, playing } = useMotionReplay(build)

  return (
    <div>
      <div className="label-row">
        <span>Kinetic Typography</span>
        <span>Motion language on ice</span>
      </div>
      <div className="stage" ref={rootRef}>
        <div className="hockey-photo hockey-photo--rink" />
        <div className="type-stage">
          {WORDS.map((w, i) => (
            <span
              key={w}
              className={`type-word${i % 2 ? ' type-word--volt' : ' type-word--ice'}`}
            >
              {w}
            </span>
          ))}
        </div>
      </div>
      <StageControls onReplay={play} playing={playing} />
    </div>
  )
}

export function TransitionWipe() {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLElement) => {
    const a = root.querySelector('.tr-a')
    const b = root.querySelector('.tr-b')
    const wipe = root.querySelector('.tr-wipe')
    gsap.set(a, { opacity: 1 })
    gsap.set(b, { opacity: 0 })
    gsap.set(wipe, { scaleX: 0, transformOrigin: 'left' })
    tl.to(wipe, { scaleX: 1, duration: 0.28, ease: easeCut })
      .set(a, { opacity: 0 })
      .set(b, { opacity: 1 })
      .to(wipe, { scaleX: 0, transformOrigin: 'right', duration: 0.28, ease: easeOut })
  }, [])

  const { rootRef, play, playing } = useMotionReplay(build)

  return (
    <div>
      <div className="label-row">
        <span>Campaign Transition</span>
        <span>~0.5–1s · never over footage</span>
      </div>
      <div className="stage" ref={rootRef}>
        <div className="tr-a hockey-photo hockey-photo--action" />
        <div className="tr-b hockey-photo hockey-photo--skate" />
        <div className="tr-wipe" />
      </div>
      <StageControls onReplay={play} playing={playing} />
    </div>
  )
}

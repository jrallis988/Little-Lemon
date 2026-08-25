import gsap from 'gsap'
import { useCallback, useState } from 'react'
import { StageControls } from '../layout/StageControls'
import { pulseEase, snapEase, useMotionReplay } from '../../hooks/useMotionReplay'

type Beat = 'intro' | 'player' | 'score' | 'stat' | 'replay' | 'slow' | 'final'

export function HighlightPackage() {
  const [beat, setBeat] = useState<Beat>('intro')

  const build = useCallback(
    (tl: gsap.core.Timeline, root: HTMLElement) => {
      const layer = root.querySelector('.hl-layer')
      gsap.set(layer, { opacity: 0, y: 16 })
      tl.to(layer, { opacity: 1, y: 0, duration: 0.35, ease: snapEase })
    },
    [beat],
  )

  const { rootRef, play, playing } = useMotionReplay(build, [beat])

  const copy: Record<Beat, { title: string; sub: string }> = {
    intro: { title: 'HIGHLIGHT', sub: 'TOP PLAY · Q3' },
    player: { title: 'MARCUS REED', sub: '23 · FORWARD' },
    score: { title: 'HAV 98 · RDG 94', sub: 'Q3 · 02:14' },
    stat: { title: '+2', sub: 'SEASON HIGH' },
    replay: { title: 'REPLAY', sub: 'ANGLE 02' },
    slow: { title: 'SLOW-MOTION', sub: '0.25×' },
    final: { title: 'HAVEN WINS', sub: 'FINAL 110–104' },
  }

  return (
    <div>
      <div className="chip-row" style={{ marginBottom: '0.85rem' }}>
        {(Object.keys(copy) as Beat[]).map((id) => (
          <button
            key={id}
            type="button"
            className={`chip${beat === id ? ' is-active' : ''}`}
            onClick={() => setBeat(id)}
          >
            {id}
          </button>
        ))}
      </div>
      <div className="stage" ref={rootRef}>
        <div className="athlete-photo athlete-photo--court" />
        <div className="stage-frame" />
        <div className="hl-layer">
          <span className="hl-title display">{copy[beat].title}</span>
          <span className="hl-sub condensed">{copy[beat].sub}</span>
        </div>
      </div>
      <StageControls onReplay={play} playing={playing} />
      <p className="placeholder-note">Graphics support footage — they never overpower it.</p>
    </div>
  )
}

type TransitionKind = 'fast' | 'wipe' | 'logo'

export function ReplayTransitions() {
  const [kind, setKind] = useState<TransitionKind>('wipe')

  const build = useCallback(
    (tl: gsap.core.Timeline, root: HTMLElement) => {
      const a = root.querySelector('.rt-a')
      const b = root.querySelector('.rt-b')
      const wipe = root.querySelector('.rt-wipe')
      const logo = root.querySelector('.rt-logo')

      gsap.set(a, { opacity: 1 })
      gsap.set(b, { opacity: 0 })
      gsap.set(wipe, { scaleX: 0, opacity: 1, transformOrigin: 'left' })
      gsap.set(logo, { opacity: 0, scale: 0.8 })

      if (kind === 'fast') {
        tl.to(a, { opacity: 0, duration: 0.12 }, 0).to(b, { opacity: 1, duration: 0.12 }, 0.08)
      }
      if (kind === 'wipe') {
        tl.to(wipe, { scaleX: 1, duration: 0.28, ease: snapEase })
          .set(a, { opacity: 0 })
          .set(b, { opacity: 1 })
          .to(wipe, { scaleX: 0, transformOrigin: 'right', duration: 0.28, ease: pulseEase })
      }
      if (kind === 'logo') {
        tl.to(logo, { opacity: 1, scale: 1, duration: 0.22, ease: snapEase })
          .set(a, { opacity: 0 })
          .set(b, { opacity: 1 })
          .to(logo, { opacity: 0, scale: 1.1, duration: 0.22, ease: pulseEase }, 0.35)
      }
    },
    [kind],
  )

  const { rootRef, play, playing } = useMotionReplay(build, [kind])

  return (
    <div>
      <div className="chip-row" style={{ marginBottom: '0.85rem' }}>
        {(
          [
            ['fast', 'Fast Cut'],
            ['wipe', 'Graphic Wipe'],
            ['logo', 'Logo Transition'],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            className={`chip${kind === id ? ' is-active' : ''}`}
            onClick={() => setKind(id)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="stage" ref={rootRef}>
        <div className="rt-a athlete-photo athlete-photo--sprint" />
        <div className="rt-b athlete-photo athlete-photo--court" />
        <div className="rt-wipe" />
        <div className="rt-logo display">
          P<span className="signal">/</span>S
        </div>
      </div>
      <StageControls onReplay={play} playing={playing} />
      <p className="placeholder-note">Target 0.5–1s — never more important than the footage.</p>
    </div>
  )
}

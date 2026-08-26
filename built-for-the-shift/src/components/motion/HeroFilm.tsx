import gsap from 'gsap'
import { useCallback, useState } from 'react'
import { StageControls } from '../layout/StageControls'
import { easeCut, easeOut, useMotionReplay } from '../../hooks/useMotionReplay'

const BEATS = [
  { id: 'enter', tag: '0–4s', word: 'ENTER', sub: 'Quiet anticipation. Player steps onto the ice.' },
  { id: 'accelerate', tag: '4–10s', word: 'ACCELERATE', sub: 'Skate performance. First strides open the shift.' },
  { id: 'cut', tag: '10–15s', word: 'CUT', sub: 'Edge control. Direction shifts under pressure.' },
  { id: 'contact', tag: '15–20s', word: 'CONTACT', sub: 'Protection answers the collision.' },
  { id: 'release', tag: '20–26s', word: 'RELEASE', sub: 'Stick flex → puck trajectory.' },
  { id: 'resolve', tag: '26–30s', word: 'BUILT FOR THE SHIFT.', sub: 'Performance resolved into the campaign line.' },
] as const

export function HeroFilm({ compact = false }: { compact?: boolean }) {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLElement) => {
    const beats = root.querySelectorAll('.film-beat')
    const product = root.querySelector('.film-product')
    gsap.set(beats, { opacity: 0, y: 24 })
    gsap.set(product, { opacity: 0, x: 20 })

    beats.forEach((beat, i) => {
      const t = i * 1.15
      tl.to(beat, { opacity: 1, y: 0, duration: 0.35, ease: easeCut }, t)
      if (i === 1 || i === 4) {
        tl.to(product, { opacity: 1, x: 0, duration: 0.3, ease: easeOut }, t + 0.25)
      }
      if (i < beats.length - 1) {
        tl.to(beat, { opacity: 0, y: -16, duration: 0.22, ease: 'power2.in' }, t + 0.85)
        if (i === 1 || i === 4) {
          tl.to(product, { opacity: 0, duration: 0.2 }, t + 0.85)
        }
      }
    })
  }, [])

  const { rootRef, play, playing } = useMotionReplay(build)

  return (
    <div>
      {!compact ? (
        <div className="label-row">
          <span>:30 Hero Film Prototype</span>
          <span>Shift rhythm · AE export slot</span>
        </div>
      ) : null}
      <div className="stage" ref={rootRef}>
        <div className="hockey-photo hockey-photo--action" />
        <div className="film-stage">
          {BEATS.map((b) => (
            <div
              key={b.id}
              className={`film-beat${b.id === 'resolve' ? ' film-beat--resolve' : ''}`}
            >
              <div className="tag tech">{b.tag}</div>
              <div className="word">{b.word}</div>
              <p className="sub">{b.sub}</p>
            </div>
          ))}
        </div>
        <div className="film-product">
          <span>PRODUCT FOCUS</span>
          <strong>VAPOR EDGE</strong>
        </div>
      </div>
      <StageControls onReplay={play} playing={playing} />
    </div>
  )
}

export function CutdownSelector() {
  const [cut, setCut] = useState<'30' | '15' | '06'>('15')
  return (
    <div>
      <div className="chip-row" style={{ marginBottom: '0.85rem' }}>
        {(
          [
            ['30', ':30'],
            ['15', ':15'],
            ['06', ':06'],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            className={`chip${cut === id ? ' is-active' : ''}`}
            onClick={() => setCut(id)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="panel" style={{ padding: '1rem' }}>
        <p className="tech" style={{ color: 'var(--shift-iceblue)', marginBottom: '0.5rem' }}>
          CUTDOWN · {cut === '30' ? 'MASTER' : cut === '15' ? 'SOCIAL / OLV' : 'BUMPER / PAID'}
        </p>
        <p style={{ color: 'var(--shift-frost)' }}>
          {cut === '30' && 'Full shift: Enter → Accelerate → Cut → Contact → Release → Resolve.'}
          {cut === '15' && 'Accelerate → Product skate → Release → BUILT FOR THE SHIFT.'}
          {cut === '06' && 'Impact hit + product sting + end card. Built for paid social.'}
        </p>
        <div className="video-slot" style={{ marginTop: '1rem' }}>
          Drop AE/PR export · shift_hero_{cut}.mp4
        </div>
      </div>
    </div>
  )
}

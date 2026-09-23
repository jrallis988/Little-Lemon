import gsap from 'gsap'
import { useCallback, useState } from 'react'
import { StageControls } from '../layout/StageControls'
import { easeCut, easeOut, useMotionReplay } from '../../hooks/useMotionReplay'
import { PaidSting } from './PaidSting'

const BEATS = [
  {
    id: 'enter',
    tag: '0–4s',
    word: 'ENTER',
    sub: 'Quiet anticipation. Player steps onto the ice.',
    photo: 'hockey-photo--rink',
    product: null,
  },
  {
    id: 'accelerate',
    tag: '4–10s',
    word: 'ACCELERATE',
    sub: 'Skate performance. First strides open the shift.',
    photo: 'hockey-photo--skate',
    product: 'VAPOR EDGE',
  },
  {
    id: 'cut',
    tag: '10–15s',
    word: 'CUT',
    sub: 'Edge control. Direction shifts under pressure.',
    photo: 'hockey-photo--action',
    product: null,
  },
  {
    id: 'contact',
    tag: '15–20s',
    word: 'CONTACT',
    sub: 'Protection answers the collision.',
    photo: 'hockey-photo--gear',
    product: 'RE-AKT',
  },
  {
    id: 'release',
    tag: '20–26s',
    word: 'RELEASE',
    sub: 'Stick flex → puck trajectory.',
    photo: 'hockey-photo--stick',
    product: 'NEXUS PRO',
  },
  {
    id: 'resolve',
    tag: '26–30s',
    word: 'BUILT FOR THE SHIFT.',
    sub: 'Performance resolved into the campaign line.',
    photo: 'hockey-photo--action',
    product: null,
  },
] as const

export function HeroFilm({ compact = false }: { compact?: boolean }) {
  const [beatIdx, setBeatIdx] = useState(0)
  const [mode, setMode] = useState<'play' | 'scrub'>('play')

  const build = useCallback(
    (tl: gsap.core.Timeline, root: HTMLElement) => {
      if (mode === 'scrub') {
        const beats = root.querySelectorAll('.film-beat')
        const product = root.querySelector('.film-product')
        const photos = root.querySelectorAll('.film-photo')
        gsap.set(beats, { opacity: 0, y: 0 })
        gsap.set(photos, { opacity: 0 })
        gsap.set(product, { opacity: 0 })
        gsap.set(beats[beatIdx], { opacity: 1 })
        gsap.set(photos[beatIdx], { opacity: 1 })
        if (BEATS[beatIdx].product) gsap.set(product, { opacity: 1 })
        return
      }

      const beats = root.querySelectorAll('.film-beat')
      const product = root.querySelector('.film-product')
      const photos = root.querySelectorAll('.film-photo')
      const productLabel = root.querySelector('.film-product strong')

      gsap.set(beats, { opacity: 0, y: 24 })
      gsap.set(photos, { opacity: 0 })
      gsap.set(product, { opacity: 0, x: 20 })
      gsap.set(photos[0], { opacity: 1 })

      beats.forEach((beat, i) => {
        const t = i * 1.15
        tl.to(photos[i], { opacity: 1, duration: 0.25 }, t)
        if (i > 0) tl.to(photos[i - 1], { opacity: 0, duration: 0.25 }, t)
        tl.to(beat, { opacity: 1, y: 0, duration: 0.35, ease: easeCut }, t)
        if (BEATS[i].product) {
          tl.add(() => {
            if (productLabel) productLabel.textContent = BEATS[i].product
          }, t + 0.2)
          tl.to(product, { opacity: 1, x: 0, duration: 0.3, ease: easeOut }, t + 0.25)
        }
        if (i < beats.length - 1) {
          tl.to(beat, { opacity: 0, y: -16, duration: 0.22, ease: 'power2.in' }, t + 0.85)
          if (BEATS[i].product) {
            tl.to(product, { opacity: 0, duration: 0.2 }, t + 0.85)
          }
        }
      })
    },
    [mode, beatIdx],
  )

  const { rootRef, play, playing } = useMotionReplay(build, [mode, beatIdx])

  return (
    <div>
      {!compact ? (
        <div className="label-row">
          <span>:30 Hero Film Prototype</span>
          <span>Shift rhythm · AE export slot</span>
        </div>
      ) : null}
      <div className="chip-row" style={{ marginBottom: '0.75rem' }}>
        <button
          type="button"
          className={`chip${mode === 'play' ? ' is-active' : ''}`}
          onClick={() => setMode('play')}
        >
          Full Play
        </button>
        <button
          type="button"
          className={`chip${mode === 'scrub' ? ' is-active' : ''}`}
          onClick={() => setMode('scrub')}
        >
          Beat Scrub
        </button>
      </div>
      <div className="stage" ref={rootRef}>
        {BEATS.map((b) => (
          <div key={b.id} className={`film-photo hockey-photo ${b.photo}`} />
        ))}
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
          <strong>{BEATS[beatIdx].product ?? 'VAPOR EDGE'}</strong>
        </div>
      </div>
      {mode === 'scrub' ? (
        <div className="film-timeline" role="tablist" aria-label="Hero film beats">
          {BEATS.map((b, i) => (
            <button
              key={b.id}
              type="button"
              role="tab"
              aria-selected={beatIdx === i}
              className={`film-timeline__beat${beatIdx === i ? ' is-active' : ''}`}
              onClick={() => setBeatIdx(i)}
            >
              <span className="tech">{b.tag}</span>
              <strong className="display">{b.word}</strong>
            </button>
          ))}
        </div>
      ) : (
        <StageControls onReplay={play} playing={playing} />
      )}
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
      {cut === '06' ? (
        <PaidSting />
      ) : (
        <div className="panel panel--ink" style={{ padding: '1rem' }}>
          <p className="tech" style={{ color: 'var(--shift-iceblue)', marginBottom: '0.5rem' }}>
            CUTDOWN · {cut === '30' ? 'MASTER' : 'SOCIAL / OLV'}
          </p>
          <p style={{ color: 'var(--shift-frost)' }}>
            {cut === '30' && 'Full shift: Enter → Accelerate → Cut → Contact → Release → Resolve.'}
            {cut === '15' && 'Accelerate → Product skate → Release → BUILT FOR THE SHIFT.'}
          </p>
          <div className="video-slot" style={{ marginTop: '1rem' }}>
            Drop AE/PR export · SHIFT_Hero_{cut}_16x9.mp4
          </div>
        </div>
      )}
    </div>
  )
}

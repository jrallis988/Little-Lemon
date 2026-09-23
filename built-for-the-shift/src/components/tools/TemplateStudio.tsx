import { useMemo, useState } from 'react'

const ATHLETES = [
  { name: 'NOVA REED', number: '19', position: 'FORWARD', photo: 'hockey-photo--action' },
  { name: 'JACE COLE', number: '7', position: 'DEFENSE', photo: 'hockey-photo--rink' },
  { name: 'MIRA VAUGHN', number: '23', position: 'CENTER', photo: 'hockey-photo--skate' },
] as const

const PRODUCTS = [
  { name: 'VAPOR EDGE', kind: 'SKATE', benefit: 'BUILT FOR ACCELERATION.' },
  { name: 'NEXUS PRO', kind: 'STICK', benefit: 'BUILT FOR RELEASE.' },
  { name: 'RE-AKT', kind: 'HELMET', benefit: 'BUILT FOR CONTACT.' },
] as const

const STATS = [
  { value: '0.38s', label: 'FIRST-STRIDE RESPONSE' },
  { value: '92 mph', label: 'SHOT RELEASE' },
  { value: '27°', label: 'EDGE ANGLE HOLD' },
] as const

const FORMATS = ['16:9', '9:16', '1:1', '4:5'] as const

/** Live demo of editable AE template fields. */
export function TemplateStudio() {
  const [athleteIdx, setAthleteIdx] = useState(0)
  const [productIdx, setProductIdx] = useState(0)
  const [statIdx, setStatIdx] = useState(0)
  const [copy, setCopy] = useState('THE SHIFT STARTS HERE.')
  const [format, setFormat] = useState<(typeof FORMATS)[number]>('16:9')
  const [footage, setFootage] = useState<'action' | 'skate' | 'stick'>('action')

  const athlete = ATHLETES[athleteIdx]
  const product = PRODUCTS[productIdx]
  const stat = STATS[statIdx]

  const ratioClass = useMemo(() => {
    if (format === '9:16') return 'tpl-stage--916'
    if (format === '1:1') return 'tpl-stage--11'
    if (format === '4:5') return 'tpl-stage--45'
    return 'tpl-stage--169'
  }, [format])

  const photoClass =
    footage === 'skate'
      ? 'hockey-photo--skate'
      : footage === 'stick'
        ? 'hockey-photo--stick'
        : athlete.photo

  return (
    <div className="tpl-studio">
      <div className="tpl-studio__controls">
        <p className="kicker" style={{ color: 'var(--shift-volt)' }}>
          Live Template Fields
        </p>
        <label className="tpl-field">
          <span>ATHLETE</span>
          <select value={athleteIdx} onChange={(e) => setAthleteIdx(Number(e.target.value))}>
            {ATHLETES.map((a, i) => (
              <option key={a.name} value={i}>
                {a.name} · #{a.number}
              </option>
            ))}
          </select>
        </label>
        <label className="tpl-field">
          <span>FOOTAGE</span>
          <select value={footage} onChange={(e) => setFootage(e.target.value as typeof footage)}>
            <option value="action">Action plate</option>
            <option value="skate">Skate plate</option>
            <option value="stick">Stick plate</option>
          </select>
        </label>
        <label className="tpl-field">
          <span>PRODUCT</span>
          <select value={productIdx} onChange={(e) => setProductIdx(Number(e.target.value))}>
            {PRODUCTS.map((p, i) => (
              <option key={p.name} value={i}>
                {p.name} · {p.kind}
              </option>
            ))}
          </select>
        </label>
        <label className="tpl-field">
          <span>STATISTIC</span>
          <select value={statIdx} onChange={(e) => setStatIdx(Number(e.target.value))}>
            {STATS.map((s, i) => (
              <option key={s.value} value={i}>
                {s.value} · {s.label}
              </option>
            ))}
          </select>
        </label>
        <label className="tpl-field">
          <span>COPY</span>
          <input value={copy} onChange={(e) => setCopy(e.target.value)} maxLength={48} />
        </label>
        <label className="tpl-field">
          <span>FORMAT</span>
          <div className="chip-row">
            {FORMATS.map((f) => (
              <button
                key={f}
                type="button"
                className={`chip${format === f ? ' is-active' : ''}`}
                onClick={() => setFormat(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </label>
      </div>

      <div className="tpl-studio__preview">
        <div className={`tpl-stage ${ratioClass}`}>
          <div className={`hockey-photo ${photoClass}`} />
          <div className="tpl-overlay">
            <div className="tpl-athlete">
              <span className="tech">
                #{athlete.number} · {athlete.position}
              </span>
              <strong className="display">{athlete.name}</strong>
            </div>
            <div className="tpl-stat">
              <span className="num">{stat.value}</span>
              <span className="tech">{stat.label}</span>
            </div>
            <div className="tpl-product">
              <span className="tech">{product.kind}</span>
              <strong className="display">{product.name}</strong>
              <em className="condensed">{product.benefit}</em>
            </div>
            <p className="tpl-copy condensed">{copy}</p>
            <p className="tpl-line display">
              BUILT FOR <span className="ice">THE SHIFT.</span>
            </p>
          </div>
        </div>
        <p className="placeholder-note">
          Mirrors Essential Graphics / expression-driven AE templates — swap fields, keep motion.
        </p>
      </div>
    </div>
  )
}

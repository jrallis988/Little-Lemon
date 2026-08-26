function HeightMeasure() {
  return (
    <svg width="70%" height="80%" viewBox="0 0 80 100" aria-hidden>
      <line x1="20" y1="90" x2="20" y2="12" stroke="#0a0a0a" strokeWidth="2" />
      <line x1="14" y1="12" x2="26" y2="12" stroke="#0a0a0a" strokeWidth="2" />
      <line x1="14" y1="90" x2="26" y2="90" stroke="#0a0a0a" strokeWidth="2" />
      <text x="34" y="55" fontFamily="Bebas Neue, sans-serif" fontSize="20" fill="#c8102e">
        42″
      </text>
      <text x="34" y="68" fontFamily="Barlow Condensed, sans-serif" fontSize="7" fill="#5c5a56" letterSpacing="1">
        VERTICAL LEAP
      </text>
    </svg>
  )
}

function ShotTrajectory() {
  return (
    <svg width="85%" height="70%" viewBox="0 0 120 80" aria-hidden>
      <path d="M10 68 Q 50 12 108 28" fill="none" stroke="#0a0a0a" strokeWidth="1.5" strokeDasharray="3 5" />
      <circle cx="10" cy="68" r="3.5" fill="#c8102e" />
      <circle cx="108" cy="28" r="4" fill="#0a0a0a" />
      <text x="70" y="22" fontFamily="Bebas Neue, sans-serif" fontSize="11" fill="#c8102e">
        97 MPH
      </text>
      <text x="70" y="32" fontFamily="Barlow Condensed, sans-serif" fontSize="6" fill="#5c5a56" letterSpacing="0.8">
        RELEASE PATH
      </text>
    </svg>
  )
}

function TimingTrack() {
  return (
    <svg width="90%" height="55%" viewBox="0 0 140 50" aria-hidden>
      <line x1="0" y1="28" x2="140" y2="28" stroke="#0a0a0a" strokeWidth="1.5" />
      {[0, 28, 56, 84, 112, 140].map((x, i) => (
        <g key={x}>
          <line x1={x} y1="20" x2={x} y2="36" stroke="#0a0a0a" strokeWidth="1.5" />
          <circle cx={x} cy="28" r="2" fill={i === 3 ? '#c8102e' : '#0a0a0a'} />
        </g>
      ))}
      <text x="2" y="14" fontFamily="Bebas Neue, sans-serif" fontSize="10" fill="#c8102e">
        00:09.81
      </text>
    </svg>
  )
}

function StageDots() {
  return (
    <svg width="85%" height="40%" viewBox="0 0 140 40" aria-hidden>
      <line x1="10" y1="20" x2="130" y2="20" stroke="#0a0a0a" strokeWidth="1" />
      {['SET', 'DRIVE', 'HIT', 'HOLD'].map((label, i) => {
        const x = 18 + i * 34
        return (
          <g key={label}>
            <circle cx={x} cy="20" r="5" fill={i === 2 ? '#c8102e' : '#0a0a0a'} />
            <text x={x - 8} y="36" fontFamily="Barlow Condensed, sans-serif" fontSize="6" fill="#5c5a56">
              {label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

function AngleReadout() {
  return (
    <svg width="75%" height="75%" viewBox="0 0 100 100" aria-hidden>
      <path d="M20 80 L70 80 L70 30" fill="none" stroke="#0a0a0a" strokeWidth="1.5" />
      <path d="M70 80 A40 40 0 0 0 42 48" fill="none" stroke="#c8102e" strokeWidth="1.5" />
      <text x="48" y="72" fontFamily="Bebas Neue, sans-serif" fontSize="14" fill="#c8102e">
        18°
      </text>
      <text x="20" y="94" fontFamily="Barlow Condensed, sans-serif" fontSize="6" fill="#5c5a56" letterSpacing="1">
        RELEASE ANGLE
      </text>
    </svg>
  )
}

function DistanceLine() {
  return (
    <svg width="90%" height="45%" viewBox="0 0 140 40" aria-hidden>
      <line x1="8" y1="22" x2="132" y2="22" stroke="#0a0a0a" strokeWidth="2" />
      <line x1="8" y1="14" x2="8" y2="30" stroke="#0a0a0a" strokeWidth="2" />
      <line x1="132" y1="14" x2="132" y2="30" stroke="#0a0a0a" strokeWidth="2" />
      <text x="48" y="16" fontFamily="Bebas Neue, sans-serif" fontSize="12" fill="#c8102e">
        42 FT
      </text>
    </svg>
  )
}

function TargetMark() {
  return (
    <svg width="70%" height="70%" viewBox="0 0 100 100" aria-hidden>
      <circle cx="50" cy="50" r="28" fill="none" stroke="#0a0a0a" strokeWidth="1.5" />
      <circle cx="50" cy="50" r="12" fill="none" stroke="#c8102e" strokeWidth="1.5" />
      <line x1="50" y1="10" x2="50" y2="90" stroke="#0a0a0a" strokeWidth="1" />
      <line x1="10" y1="50" x2="90" y2="50" stroke="#0a0a0a" strokeWidth="1" />
      <text x="62" y="46" fontFamily="Bebas Neue, sans-serif" fontSize="10" fill="#c8102e">
        HIT
      </text>
    </svg>
  )
}

function PlayDiagram() {
  return (
    <svg width="85%" height="75%" viewBox="0 0 120 90" aria-hidden>
      <rect x="8" y="8" width="104" height="74" fill="none" stroke="#0a0a0a" strokeWidth="1" />
      <circle cx="30" cy="55" r="5" fill="#0a0a0a" />
      <circle cx="60" cy="40" r="5" fill="#0a0a0a" />
      <circle cx="90" cy="28" r="5" fill="#c8102e" />
      <path d="M30 55 L60 40 L90 28" fill="none" stroke="#c8102e" strokeWidth="1.25" strokeDasharray="3 3" />
      <text x="14" y="20" fontFamily="Barlow Condensed, sans-serif" fontSize="6" fill="#5c5a56" letterSpacing="1">
        PLAY — RELEASE
      </text>
    </svg>
  )
}

const tiles = [
  { label: 'Height measure', node: <HeightMeasure />, note: '42″ vertical leap' },
  { label: 'Shot trajectory', node: <ShotTrajectory />, note: '97 MPH path' },
  { label: 'Timing track', node: <TimingTrack />, note: 'Split clock + ticks' },
  { label: 'Movement stages', node: <StageDots />, note: 'Set → Drive → Hit' },
  { label: 'Angle readout', node: <AngleReadout />, note: '18° release' },
  { label: 'Distance', node: <DistanceLine />, note: '42 ft traveled' },
  { label: 'Target mark', node: <TargetMark />, note: 'Contact point' },
  { label: 'Play diagram', node: <PlayDiagram />, note: 'Coaching sketch' },
]

export function GraphicSystem() {
  return (
    <section className="section section--paper" id="graphic-system">
      <div className="section__inner">
        <p className="section__eyebrow">08 — Graphic Language</p>
        <h2 className="section__title">Functional marks</h2>
        <p className="section__lead">
          Court lines, brackets, measurements, and diagrams communicate athlete data and movement —
          not decoration that looks technical.
        </p>
        <div className="graphic-grid">
          {tiles.map((t) => (
            <div className="graphic-tile" key={t.label}>
              {t.node}
              <span>
                {t.label}
                <small style={{ display: 'block', opacity: 0.65, marginTop: '0.15rem' }}>{t.note}</small>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

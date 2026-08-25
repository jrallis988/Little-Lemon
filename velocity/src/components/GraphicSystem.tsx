function CourtLines() {
  return (
    <svg width="70%" height="70%" viewBox="0 0 100 100" aria-hidden>
      <rect x="10" y="10" width="80" height="80" fill="none" stroke="#0a0a0a" strokeWidth="1.5" />
      <line x1="50" y1="10" x2="50" y2="90" stroke="#0a0a0a" strokeWidth="1" />
      <circle cx="50" cy="50" r="14" fill="none" stroke="#c8102e" strokeWidth="1.5" />
    </svg>
  )
}

function IceMarks() {
  return (
    <svg width="80%" height="80%" viewBox="0 0 100 100" aria-hidden>
      <ellipse cx="50" cy="50" rx="38" ry="28" fill="none" stroke="#0a0a0a" strokeWidth="1.2" />
      <line x1="12" y1="50" x2="88" y2="50" stroke="#c8102e" strokeWidth="2" />
      <circle cx="50" cy="50" r="4" fill="#0a0a0a" />
    </svg>
  )
}

function TrackLanes() {
  return (
    <svg width="85%" height="60%" viewBox="0 0 120 60" aria-hidden>
      {[10, 22, 34, 46].map((y) => (
        <line key={y} x1="0" y1={y} x2="120" y2={y} stroke="#0a0a0a" strokeWidth="1.5" />
      ))}
      <line x1="30" y1="5" x2="30" y2="55" stroke="#c8102e" strokeWidth="2" />
    </svg>
  )
}

function Trajectory() {
  return (
    <svg width="80%" height="70%" viewBox="0 0 100 80" aria-hidden>
      <path d="M8 70 Q 45 10 92 22" fill="none" stroke="#0a0a0a" strokeWidth="1.5" strokeDasharray="3 5" />
      <circle cx="92" cy="22" r="4" fill="#c8102e" />
    </svg>
  )
}

function TimingMarks() {
  return (
    <svg width="80%" height="50%" viewBox="0 0 120 40" aria-hidden>
      <line x1="0" y1="20" x2="120" y2="20" stroke="#0a0a0a" strokeWidth="1" />
      {[0, 20, 40, 60, 80, 100, 120].map((x) => (
        <line key={x} x1={x} y1="12" x2={x} y2="28" stroke="#0a0a0a" strokeWidth="1.5" />
      ))}
      <text x="4" y="10" fontFamily="Bebas Neue, sans-serif" fontSize="8" fill="#c8102e">
        00:09.81
      </text>
    </svg>
  )
}

function Measure() {
  return (
    <svg width="70%" height="70%" viewBox="0 0 80 80" aria-hidden>
      <line x1="15" y1="70" x2="15" y2="10" stroke="#0a0a0a" strokeWidth="2" />
      <line x1="12" y1="10" x2="18" y2="10" stroke="#0a0a0a" strokeWidth="2" />
      <line x1="12" y1="70" x2="18" y2="70" stroke="#0a0a0a" strokeWidth="2" />
      <text x="24" y="44" fontFamily="Bebas Neue, sans-serif" fontSize="18" fill="#0a0a0a">
        42″
      </text>
    </svg>
  )
}

function FrameDevice() {
  return (
    <svg width="75%" height="75%" viewBox="0 0 100 100" aria-hidden>
      <path d="M15 30 V15 H30" fill="none" stroke="#0a0a0a" strokeWidth="2" />
      <path d="M70 15 H85 V30" fill="none" stroke="#0a0a0a" strokeWidth="2" />
      <path d="M85 70 V85 H70" fill="none" stroke="#0a0a0a" strokeWidth="2" />
      <path d="M30 85 H15 V70" fill="none" stroke="#0a0a0a" strokeWidth="2" />
      <rect x="28" y="28" width="44" height="44" fill="none" stroke="#c8102e" strokeWidth="1" />
    </svg>
  )
}

function ScoreMark() {
  return (
    <div
      style={{
        fontFamily: 'var(--display)',
        fontSize: '2.8rem',
        letterSpacing: '0.04em',
        color: '#0a0a0a',
      }}
      aria-hidden
    >
      01
    </div>
  )
}

const tiles = [
  { label: 'Court lines', node: <CourtLines /> },
  { label: 'Ice markings', node: <IceMarks /> },
  { label: 'Track lanes', node: <TrackLanes /> },
  { label: 'Timing marks', node: <TimingMarks /> },
  { label: 'Trajectory', node: <Trajectory /> },
  { label: 'Measurement', node: <Measure /> },
  { label: 'Frames', node: <FrameDevice /> },
  { label: 'Numbers', node: <ScoreMark /> },
]

export function GraphicSystem() {
  return (
    <section className="section section--paper" id="graphic-system">
      <div className="section__inner">
        <p className="section__eyebrow">08 — Graphic Language</p>
        <h2 className="section__title">Reusable marks</h2>
        <p className="section__lead">
          Vector devices drawn from sports environments — always secondary to photography.
        </p>
        <div className="graphic-grid">
          {tiles.map((t) => (
            <div className="graphic-tile" key={t.label}>
              {t.node}
              <span>{t.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

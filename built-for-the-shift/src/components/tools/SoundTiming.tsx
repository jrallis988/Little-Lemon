const HITS = [
  { t: '0:00', label: 'ENTER bed', note: 'Low ice ambience · sparse' },
  { t: '0:04', label: 'ACCEL hit', note: 'Blade carve + rising pulse' },
  { t: '0:10', label: 'CUT snap', note: 'Hard transient · direction change' },
  { t: '0:15', label: 'CONTACT thud', note: 'Pad/board compression' },
  { t: '0:20', label: 'RELEASE whoosh', note: 'Stick flex → puck flight' },
  { t: '0:26', label: 'RESOLVE sting', note: 'Brand chord · hold to end' },
] as const

/** Sound design timing placeholders aligned to hero film beats. */
export function SoundTiming() {
  return (
    <div className="sound">
      <p className="kicker" style={{ color: 'var(--shift-volt)' }}>
        Sound Design · Timing Map
      </p>
      <div className="sound-rail" aria-hidden="true">
        <div className="sound-rail__track" />
        {HITS.map((h, i) => (
          <span
            key={h.t}
            className="sound-rail__mark"
            style={{ left: `${(i / (HITS.length - 1)) * 100}%` }}
          />
        ))}
      </div>
      <div className="sound-list">
        {HITS.map((h) => (
          <div key={h.t} className="sound-row">
            <span className="tech ice">{h.t}</span>
            <strong className="condensed">{h.label}</strong>
            <p>{h.note}</p>
          </div>
        ))}
      </div>
      <p className="placeholder-note">
        Temp hits for animatic → final design in Premiere / DAW. Audio drives cut points with
        picture.
      </p>
    </div>
  )
}

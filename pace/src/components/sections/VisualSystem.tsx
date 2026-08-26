export function VisualSystem() {
  const tokens = [
    ['Mile markers', 'Distance as graphic rhythm'],
    ['Split times', 'Proof that pace is personal'],
    ['Route lines', 'Path energy across layouts'],
    ['Cadence / BPM', 'Music × movement metrics'],
    ['Stopwatch graphics', 'Tension for BREAK moments'],
    ['Kinetic type', 'Speed shifts by state'],
  ]

  return (
    <section className="section" id="visual-system">
      <div className="shell">
        <p className="section-kicker">09 — Visual language</p>
        <h2 className="section-title">Recognize PACE before you see the logo.</h2>
        <p className="section-lede">
          Beyond Spotify green, PACE borrows the grammar of running—then lets
          that grammar change with START, FLOW, PUSH, BREAK, and RECOVER.
        </p>
        <div className="visual-demo">
          <div className="visual-track" aria-hidden>
            <span className="mile">0</span>
            <span className="route" />
            <span className="mile">1</span>
            <span className="route" />
            <span className="mile">2</span>
            <span className="route hot" />
            <span className="mile">3</span>
            <span className="bpm">156 BPM</span>
            <span className="split">9:14</span>
          </div>
          <div className="state-strip">
            <span className="state-pill state-start">START · controlled</span>
            <span className="state-pill state-flow">FLOW · rhythmic</span>
            <span className="state-pill state-push">PUSH · compressed</span>
            <span className="state-pill state-break">BREAK · explosive</span>
            <span className="state-pill state-recover">RECOVER · open</span>
          </div>
        </div>
        <div className="grid-3" style={{ marginTop: '1.25rem' }}>
          {tokens.map(([t, d]) => (
            <article className="panel" key={t}>
              <h3>{t}</h3>
              <p>{d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function WhatWeLearned() {
  const proofs = [
    'Identify a real cultural behavior Spotify already sits inside.',
    'Write a brief that stays music-first.',
    'Build a creative system around energy and listening.',
    'Adapt that system across platforms that point back to Spotify.',
    'Propose KPIs Spotify could actually measure.',
    'Test why audiences respond differently.',
    'Use that information to make the next creative execution better.',
  ]

  return (
    <section className="closing" id="learned">
      <div className="shell">
        <p className="section-kicker" style={{ color: 'rgba(255,255,255,0.55)' }}>
          18 — The thesis
        </p>
        <h2 className="section-title">
          Can this designer look at social performance and make better creative
          decisions because of it?
        </h2>
        <p className="yes-answer">YES.</p>
        <p className="section-lede">
          PACE is not a fitness application. It is not Spotify replacing Strava.
          It is an integrated campaign built around an existing habit: people run
          with music. Spotify already provides the soundtrack—PACE makes that
          relationship more personal, discoverable, visual, and shareable.
        </p>

        <div className="positioning-lockup">
          <p>SPOTIFY DOESN’T TRACK YOUR RUN.</p>
          <p>SPOTIFY GIVES YOUR RUN ITS SOUNDTRACK.</p>
          <p className="lockup-end">FIND YOUR PACE.</p>
        </div>

        <div className="proof-list">
          {proofs.map((p, i) => (
            <div className="proof-item" key={p}>
              <span>{String(i + 1).padStart(2, '0')}</span>
              <p>{p}</p>
            </div>
          ))}
        </div>

        <div className="tools-row">
          {[
            'Photoshop',
            'Illustrator',
            'Figma',
            'Premiere Pro',
            'After Effects',
            'Python',
            'Pandas',
            'React',
            'TypeScript',
            'Recharts',
          ].map((t) => (
            <span
              className="tag"
              key={t}
              style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.2)' }}
            >
              {t}
            </span>
          ))}
        </div>

        <div className="closing-disclaimer">
          <strong style={{ color: 'var(--lime)' }}>Disclaimer</strong>
          <p style={{ margin: '0.55rem 0 0' }}>
            PACE is a fictional self-initiated portfolio project. It is not an
            official Spotify campaign and is not affiliated with Bauer or any
            hockey brand. All campaign performance data shown is simulated and
            included solely to demonstrate social-media measurement, analysis,
            and creative optimization.
          </p>
        </div>
      </div>
    </section>
  )
}

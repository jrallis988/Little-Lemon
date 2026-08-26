export function WhatWeLearned() {
  const proofs = [
    'Identify an audience problem.',
    'Develop a campaign idea around it.',
    'Create the visual system.',
    'Adapt that system across platforms.',
    'Measure how audiences respond.',
    'Understand why something performed differently.',
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
          PACE isn’t just a campaign about running with Spotify. It’s a campaign
          that turns the relationship between your music and your run into
          something personal, measurable, and shareable—and a case study that
          proves creative decisions can get sharper because of audience behavior.
        </p>

        <div className="proof-list">
          {proofs.map((p, i) => (
            <div className="proof-item" key={p}>
              <span>{String(i + 1).padStart(2, '0')}</span>
              <p>{p}</p>
            </div>
          ))}
        </div>

        <div className="insight-chain">
          <div className="chain-step">
            <strong>Data</strong>
            People + Card creative led engagement; educational BPM tips led
            saves; experience UI led CTR later in the journey.
          </div>
          <div className="chain-step">
            <strong>Insight</strong>
            Runners respond to proof, utility, and identity before polish.
            Spotify clarity still matters—just after the hook lands.
          </div>
          <div className="chain-step">
            <strong>Creative decision</strong>
            Lead with runners and Cards; teach weekly; convert with state clarity;
            package YouTube with athletes; keep testing openings.
          </div>
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
            official Spotify campaign. All campaign performance data shown in this
            case study is simulated and is included solely to demonstrate
            social-media measurement, analysis, and creative optimization.
          </p>
          <p
            style={{
              margin: '1rem 0 0',
              fontFamily: 'var(--font-display)',
              fontSize: '1.4rem',
              letterSpacing: '-0.03em',
            }}
          >
            FIND YOUR PACE.
          </p>
        </div>
      </div>
    </section>
  )
}

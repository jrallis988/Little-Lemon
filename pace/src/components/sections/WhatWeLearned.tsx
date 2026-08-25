export function WhatWeLearned() {
  return (
    <section className="closing" id="learned">
      <div className="shell">
        <p className="section-kicker" style={{ color: 'rgba(255,255,255,0.55)' }}>
          What we learned
        </p>
        <h2 className="section-title">
          Can this designer look at social performance and make better creative
          decisions because of it?
        </h2>
        <p className="section-lede">
          Yes — when measurement is staged to objectives, creative is compared by
          job (not vanity), and every insight ends in a next action for the brief.
        </p>

        <div className="insight-chain">
          <div className="chain-step">
            <strong>Data</strong>
            People-led and community video outperformed product-only on
            engagement; educational content led saves; product led CTR.
          </div>
          <div className="chain-step">
            <strong>Insight</strong>
            Runners respond to proof, utility, and participation before polish.
            Product clarity still matters — just later in the journey.
          </div>
          <div className="chain-step">
            <strong>Creative decision</strong>
            Lead with runners and hooks; teach weekly; convert with feature
            clarity; package YouTube with athletes; keep testing openings.
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
            <span className="tag" key={t} style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.2)' }}>
              {t}
            </span>
          ))}
        </div>

        <div className="closing-disclaimer">
          <strong style={{ color: 'var(--lime)' }}>Disclaimer</strong>
          <p style={{ margin: '0.55rem 0 0' }}>
            PACE is a fictional self-initiated portfolio project. All campaign
            performance data shown in this case study is simulated and is
            included solely to demonstrate social-media measurement, analysis,
            and creative optimization.
          </p>
        </div>
      </div>
    </section>
  )
}

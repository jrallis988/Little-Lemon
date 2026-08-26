import { abTests } from '../../data/content'

export function ABTests() {
  return (
    <section className="section" id="testing">
      <div className="shell">
        <p className="section-kicker">14 — A/B testing as design process</p>
        <h2 className="section-title">
          Version A → result → insight → design change → Version B → result
        </h2>
        <p className="section-lede">
          Not just which variant won—exactly what changed in photography,
          headline, CTA, type, format, editing, and pace-state treatment.
        </p>

        {abTests.map((test, idx) => (
          <article
            key={test.id}
            className="panel"
            style={{ marginBottom: '1.25rem', padding: '1.4rem' }}
          >
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <span className="sim-badge">Simulated data</span>
              <span className="tag">{test.platform}</span>
            </div>
            <h3
              className="section-title"
              style={{ fontSize: '1.55rem', margin: '0.75rem 0 0.5rem' }}
            >
              {test.name}
            </h3>
            <p style={{ margin: '0 0 1rem', color: 'var(--ink-soft)' }}>
              <strong>Hypothesis:</strong> {test.hypothesis}
            </p>

            <div className="ab-grid">
              <div className="ab-version">
                <h4>{test.versionA.label}</h4>
                <p>{test.versionA.description}</p>
                {idx === 2 && (
                  <div className="thumb-preview thumb-a" aria-label="Thumbnail version A preview">
                    <div className="thumb-label">
                      PACE UI
                      <br />
                      <span style={{ fontSize: '0.75rem', opacity: 0.75 }}>
                        Session screen on black
                      </span>
                    </div>
                    <span className="thumb-size-note">1280×720 preview</span>
                  </div>
                )}
                <p className="design-label">Design decisions</p>
                <ul className="metric-list">
                  {Object.entries(test.versionA.design).map(([k, v]) => (
                    <li key={k}>
                      <span>{k}</span>
                      <strong>{v}</strong>
                    </li>
                  ))}
                </ul>
                <p className="design-label">Results</p>
                <ul className="metric-list">
                  {Object.entries(test.versionA.metrics).map(([k, v]) => (
                    <li key={k}>
                      <span>{k}</span>
                      <strong>{v}</strong>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="ab-version winner">
                <h4>{test.versionB.label}</h4>
                <p>{test.versionB.description}</p>
                {idx === 2 && (
                  <div className="thumb-preview thumb-b" aria-label="Thumbnail version B preview">
                    <div className="thumb-label">
                      Athlete + Card
                      <br />
                      <span style={{ fontSize: '0.75rem', opacity: 0.75 }}>
                        Face + PACE Card fragment
                      </span>
                    </div>
                    <span className="thumb-size-note">1280×720 preview</span>
                  </div>
                )}
                <p className="design-label">Design decisions</p>
                <ul className="metric-list">
                  {Object.entries(test.versionB.design).map(([k, v]) => (
                    <li key={k}>
                      <span>{k}</span>
                      <strong>{v}</strong>
                    </li>
                  ))}
                </ul>
                <p className="design-label">Results</p>
                <ul className="metric-list">
                  {Object.entries(test.versionB.metrics).map(([k, v]) => (
                    <li key={k}>
                      <span>{k}</span>
                      <strong>{v}</strong>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="note-callout" style={{ marginTop: '1rem' }}>
              <strong>Feedback chain</strong>
              <div style={{ marginTop: '0.35rem' }}>{test.chain}</div>
              <div style={{ marginTop: '0.55rem' }}>
                <strong>Conclusion →</strong> {test.conclusion}
              </div>
              <div style={{ marginTop: '0.35rem' }}>
                <strong>Creative decision →</strong> {test.creativeDecision}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

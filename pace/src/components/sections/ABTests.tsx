import { abTests } from '../../data/content'

export function ABTests() {
  return (
    <section className="section" id="testing">
      <div className="shell">
        <p className="section-kicker">13–15 — A/B testing</p>
        <h2 className="section-title">Three tests. Three creative decisions.</h2>
        <p className="section-lede">
          Simulated experiments that turn preference into evidence — then into
          the next brief.
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
              style={{ fontSize: '1.6rem', margin: '0.75rem 0 0.5rem' }}
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
                      PACE ONE
                      <br />
                      <span style={{ fontSize: '0.75rem', opacity: 0.75 }}>
                        Product on black
                      </span>
                    </div>
                    <span className="thumb-size-note">1280×720 preview</span>
                  </div>
                )}
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
                      Athlete mid-stride
                      <br />
                      <span style={{ fontSize: '0.75rem', opacity: 0.75 }}>
                        Face + shoe visible
                      </span>
                    </div>
                    <span className="thumb-size-note">1280×720 preview</span>
                  </div>
                )}
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
              <strong>Conclusion</strong>
              <div style={{ marginTop: '0.35rem' }}>{test.conclusion}</div>
              <div style={{ marginTop: '0.55rem' }}>
                <strong>Creative decision →</strong> {test.creativeDecision}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

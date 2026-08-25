import { objectives } from '../../data/content'

export function Objectives() {
  return (
    <section className="section" id="objectives">
      <div className="shell">
        <p className="section-kicker">03 — Campaign objectives</p>
        <h2 className="section-title">Different stages need different creative — and different metrics.</h2>
        <p className="section-lede">
          Measuring a tease reel with CTR, or a convert carousel with vanity
          likes, creates false lessons. Objectives dictate both the art and the
          scoreboard.
        </p>
        <div>
          {objectives.map((o) => (
            <div className="objective-row" key={o.stage}>
              <div className="objective-stage">{o.stage}</div>
              <div>
                <p style={{ margin: '0 0 0.55rem' }}>{o.goal}</p>
                <p style={{ margin: '0 0 0.55rem', color: 'var(--ink-soft)' }}>
                  <strong>Creative:</strong> {o.creative}
                </p>
                <div className="tag-row">
                  {o.metrics.map((m) => (
                    <span className="tag tag-lime" key={m}>
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

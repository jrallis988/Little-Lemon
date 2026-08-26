import { recommendations } from '../../data/content'

export function Optimization() {
  return (
    <section className="section" id="optimize">
      <div className="shell">
        <p className="section-kicker">17 — What we do next</p>
        <h2 className="section-title">Optimization recommendations</h2>
        <p className="section-lede">
          Every recommendation traces to evidence earlier in this case study—
          data → insight → creative decision.
        </p>
        <div className="reco-list">
          {recommendations.map((r) => (
            <article className="reco-item" key={r.title}>
              <div className="reco-num" aria-hidden />
              <div>
                <h3>{r.title}</h3>
                <p>
                  <strong>Evidence:</strong> {r.evidence}
                </p>
                <p>
                  <strong>Action:</strong> {r.action}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

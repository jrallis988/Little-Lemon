import { brand, simulatedMetrics } from "../data/content";

export function Performance() {
  return (
    <section className="section performance" id="performance" aria-labelledby="perf-title">
      <div className="section__inner">
        <p className="section__eyebrow">Performance</p>
        <h2 id="perf-title" className="section__title">
          Simulated Campaign Performance
        </h2>
        <p className="section__lead">
          Fictional metrics used to demonstrate how performance data could influence future creative
          decisions. These numbers are not real results.
        </p>

        <p className="disclosure" role="note">
          <strong>Simulated data only.</strong> {brand.disclaimer} Metrics below are illustrative
          placeholders for portfolio storytelling.
        </p>

        <ul className="perf-grid">
          {simulatedMetrics.map((m) => (
            <li key={m.label}>
              <p className="perf-grid__label">
                {m.label} <span>· {m.note}</span>
              </p>
              <p className="stat-num">{m.value}</p>
            </li>
          ))}
        </ul>

        <div className="perf-insight">
          <h3 className="headline">Creative read from the numbers</h3>
          <p>
            <strong>Best-performing creative (simulated):</strong> Athlete release crop with
            oversized “0.18s” typography outperformed product-only stills on engagement. Next
            flight would lean harder into reaction-time visual metaphors and shorten education
            carousels into punchier three-slide cuts.
          </p>
        </div>
      </div>
    </section>
  );
}

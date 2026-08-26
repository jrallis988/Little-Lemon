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
          Fictional metrics focused on challenge behavior — not vanity reach alone. These numbers
          are not real results.
        </p>

        <p className="disclosure" role="note">
          <strong>Simulated data only.</strong> {brand.disclaimer}
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
            <strong>Best-performing creative (simulated):</strong> Apex Mark share cards with mono
            “1.8 SEC” data outperformed product-only stills. Next flight doubles down on challenge
            prompts and clinic CTAs — proof the ask is the campaign, not the poster.
          </p>
        </div>
      </div>
    </section>
  );
}

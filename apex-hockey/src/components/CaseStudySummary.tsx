import { brand, summaryBeats } from "../data/content";

export function CaseStudySummary() {
  return (
    <section className="section summary" id="summary" aria-labelledby="summary-title">
      <div className="section__inner">
        <p className="section__eyebrow">Final Case Study</p>
        <h2 id="summary-title" className="section__title">
          What APEX actually does.
        </h2>
        <p className="disclosure" role="note">
          {brand.disclaimer}
        </p>

        <ol className="summary-list">
          {summaryBeats.map((beat, i) => (
            <li key={beat.title}>
              <span className="summary-list__n">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3>{beat.title}</h3>
                <p>{beat.copy}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

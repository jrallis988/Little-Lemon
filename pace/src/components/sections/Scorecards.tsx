import { creativeAssets } from '../../data/content'

export function Scorecards() {
  return (
    <section className="section" id="scorecards">
      <div className="shell">
        <p className="section-kicker">16 — Creative scorecards</p>
        <h2 className="section-title">Objective → result → insight → next action.</h2>
        <p className="section-lede">
          Scorecards matter more than charts. Each asset earns a creative
          recommendation, not just a rank.
        </p>
        <div className="grid-2">
          {creativeAssets.map((a) => (
            <article className="scorecard" key={a.id}>
              <h3>{a.title}</h3>
              <div className="score-row">
                <strong>Objective</strong>
                <span>{a.objective}</span>
              </div>
              <div className="score-row">
                <strong>Format</strong>
                <span>
                  {a.platform} · {a.format}
                </span>
              </div>
              <div className="score-row">
                <strong>Audience</strong>
                <span>{a.audience}</span>
              </div>
              <div className="score-row">
                <strong>Result</strong>
                <span>{a.result}</span>
              </div>
              <div className="score-row">
                <strong>Insight</strong>
                <span>{a.insight}</span>
              </div>
              <div className="score-row">
                <strong>Next action</strong>
                <span>{a.nextAction}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

import { feedbackLoop } from '../../data/content'

export function FeedbackLoop() {
  return (
    <section className="section" id="feedback-loop">
      <div className="shell">
        <p className="section-kicker">15 — Creative feedback loop</p>
        <h2 className="section-title">Create → Test → Learn → Change → Retest</h2>
        <p className="section-lede">
          Analytics are not an appendix. They are how the next PACE execution gets
          sharper.
        </p>
        <div className="loop-grid feedback-grid">
          {feedbackLoop.map((step, i) => (
            <article className="loop-step" key={step.id}>
              <div className="loop-num">{String(i + 1).padStart(2, '0')}</div>
              <h3>{step.name}</h3>
              <p>{step.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

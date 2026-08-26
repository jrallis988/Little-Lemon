import { problem } from '../../data/content'

export function Problem() {
  return (
    <section className="section" id="problem">
      <div className="shell">
        <p className="section-kicker">02 — The problem</p>
        <h2 className="section-title">{problem.title}</h2>
        <p className="section-lede">{problem.statement}</p>
        <div className="problem-flow">
          <div className="problem-step">{problem.passive.split('→')[0].trim()}</div>
          <span aria-hidden>→</span>
          <div className="problem-step">{problem.passive.split('→')[1].trim()}</div>
          <span aria-hidden>→</span>
          <div className="problem-step">{problem.passive.split('→')[2].trim()}</div>
        </div>
        <div className="question-block">
          <p className="question-label">PACE asks</p>
          <p className="question-text">{problem.question}</p>
          <p className="question-note">{problem.whyItMatters}</p>
        </div>
      </div>
    </section>
  )
}

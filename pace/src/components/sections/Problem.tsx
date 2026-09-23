import { problem } from '../../data/content'

export function Problem() {
  return (
    <section className="section" id="problem">
      <div className="shell">
        <p className="section-kicker">02 — Opportunity</p>
        <h2 className="section-title">{problem.title}</h2>
        <p className="section-lede">{problem.statement}</p>
        <div className="problem-flow">
          <div className="problem-step">RUNNING</div>
          <span aria-hidden>→</span>
          <div className="problem-step">MUSIC</div>
          <span aria-hidden>→</span>
          <div className="problem-step">SPOTIFY</div>
        </div>
        <p style={{ color: 'var(--ink-soft)', marginBottom: '1rem' }}>
          Existing behavior—not a manufactured connection. Today the listening
          relationship is still mostly: <strong>{problem.passive}</strong>
        </p>
        <div className="question-block">
          <p className="question-label">The brief asks</p>
          <p className="question-text">{problem.question}</p>
          <p className="question-note">{problem.whyItMatters}</p>
        </div>
      </div>
    </section>
  )
}

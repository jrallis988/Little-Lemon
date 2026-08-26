import { paceStates } from '../../data/content'

export function PaceStates() {
  return (
    <section className="section" id="states">
      <div className="shell">
        <p className="section-kicker">05 — The running experience</p>
        <h2 className="section-title">Five states. One creative system.</h2>
        <p className="section-lede">
          These moments shape typography, photography, motion, music, messaging,
          and social content—so PACE is recognizable before the logo appears.
        </p>
        <div className="states-grid">
          {paceStates.map((s) => (
            <article className={`state-card state-${s.id}`} key={s.id}>
              <div className="state-name">{s.name}</div>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
              <div className="state-meta">
                <span>
                  <strong>Visual</strong> {s.visual}
                </span>
                <span>
                  <strong>Music</strong> {s.music}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

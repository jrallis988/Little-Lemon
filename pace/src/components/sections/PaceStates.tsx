import { paceStates } from '../../data/content'

export function PaceStates() {
  return (
    <section className="section" id="states">
      <div className="shell">
        <p className="section-kicker">05 — Music for the run</p>
        <h2 className="section-title">Five states. Music that fits the moment.</h2>
        <p className="section-lede">
          These describe how music supports different moments of a run—connected
          directly to Spotify’s expertise, not to fitness-tracker ownership.
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
                <span>
                  <strong>Color</strong> {s.color}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

import { creativeExecutions } from '../../data/content'

function stateClass(state: string) {
  return `exec-state-${state.toLowerCase()}`
}

export function CreativeWorld() {
  return (
    <section className="section" id="creative">
      <div className="shell">
        <p className="section-kicker">11 — Campaign executions</p>
        <h2 className="section-title">Experience the campaign before the charts.</h2>
        <p className="section-lede">
          TikTok, Instagram, YouTube, Spotify, paid, motion, Cards, playlists,
          challenges, and outdoor—enough surface area to feel the system in the
          real world.
        </p>
        <div className="exec-grid">
          {creativeExecutions.map((ex) => (
            <article className={`exec-tile ${stateClass(ex.state)}`} key={ex.id}>
              <div className="exec-visual" aria-hidden>
                <div className="exec-marks">
                  <span className="exec-mile">MI</span>
                  <span className="exec-bpm">BPM</span>
                  <span className="exec-route" />
                </div>
              </div>
              <div className="exec-body">
                <div className="exec-channel">
                  {ex.channel} · {ex.format}
                </div>
                <h3>{ex.title}</h3>
                <p>{ex.note}</p>
                <span className="tag tag-lime">{ex.state}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

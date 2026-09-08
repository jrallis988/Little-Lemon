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
          Every execution should feel like Spotify—album art, track titles, BPM,
          waveforms, playlist covers, and playback UI—not a running brand with a
          music sponsorship.
        </p>
        <div className="exec-grid">
          {creativeExecutions.map((ex) => (
            <article className={`exec-tile ${stateClass(ex.state)}`} key={ex.id}>
              <div className={`exec-visual exec-visual--${ex.visual}`} aria-hidden>
                <div className="exec-album" />
                <div className="exec-wave-bars">
                  <i /><i /><i /><i /><i /><i /><i /><i />
                </div>
                <div className="exec-nowplaying">
                  <span className="exec-eq" />
                  <span>
                    {ex.track}
                    <em>{ex.artist}</em>
                  </span>
                </div>
              </div>
              <div className="exec-body">
                <div className="exec-channel">
                  {ex.channel} · {ex.format}
                </div>
                <h3>{ex.title}</h3>
                <p>{ex.note}</p>
                <div className="tag-row">
                  <span className="tag tag-lime">{ex.state}</span>
                  <span className="tag">BPM {ex.bpm}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

import { coreIdea } from '../../data/content'

export function CoreIdea() {
  return (
    <section className="section" id="idea">
      <div className="shell">
        <p className="section-kicker">01 — Core campaign idea</p>
        <h2 className="section-title">Spotify doesn’t track your run. Spotify gives your run its soundtrack.</h2>
        <p className="section-lede">{coreIdea.definition}</p>
        <div className="grid-2">
          <article className="panel insight-panel">
            <h3>The insight</h3>
            <p>{coreIdea.insight}</p>
            <ul className="pace-list">
              <li>A beginner’s first mile has a soundtrack.</li>
              <li>A casual run has a soundtrack.</li>
              <li>A marathon has a soundtrack.</li>
              <li>Beating yesterday has a soundtrack.</li>
            </ul>
          </article>
          <article className="panel insight-panel accent-panel">
            <h3>FIND YOUR PACE.</h3>
            <p>{coreIdea.meaning}</p>
            <p className="panel-foot">
              PACE explores how different music fits different moments,
              intensities, emotions, and types of runs—without turning Spotify
              into a fitness tracker.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}

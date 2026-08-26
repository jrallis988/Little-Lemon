import { coreIdea } from '../../data/content'

export function CoreIdea() {
  return (
    <section className="section" id="idea">
      <div className="shell">
        <p className="section-kicker">01 — Core campaign idea</p>
        <h2 className="section-title">PACE makes Spotify part of the run—not just playing in the background.</h2>
        <p className="section-lede">{coreIdea.definition}</p>
        <div className="grid-2">
          <article className="panel insight-panel">
            <h3>The insight</h3>
            <p>{coreIdea.insight}</p>
            <ul className="pace-list">
              <li>A beginner running their first mile has a pace.</li>
              <li>A casual runner has a pace.</li>
              <li>A marathoner has a pace.</li>
              <li>Someone trying to beat yesterday’s time has a pace.</li>
            </ul>
          </article>
          <article className="panel insight-panel accent-panel">
            <h3>FIND YOUR PACE.</h3>
            <p>{coreIdea.meaning}</p>
            <p className="panel-foot">
              Music plays a different role in each of those experiences—and PACE
              is built to meet that difference.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}

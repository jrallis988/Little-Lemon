import { launchSequence } from "../data/content";

export function ContentStrategy() {
  return (
    <section className="section content-strategy" id="content" aria-labelledby="content-title">
      <div className="section__inner">
        <p className="section__eyebrow">Content Strategy</p>
        <h2 id="content-title" className="section__title">
          Launch sequence.
        </h2>
        <p className="section__lead">
          Tease → Reveal → Product Education → Athlete Story → Launch → Evergreen — showing how
          graphic design and social strategy move together.
        </p>

        <ol className="sequence">
          {launchSequence.map((phase, index) => (
            <li key={phase.phase} className="sequence__item">
              <div className="sequence__index">
                <span className="stat-num">{String(index + 1).padStart(2, "0")}</span>
                <h3>{phase.phase}</h3>
              </div>
              <div className="sequence__channels">
                <div>
                  <h4>Instagram</h4>
                  <p>{phase.ig}</p>
                </div>
                <div>
                  <h4>TikTok</h4>
                  <p>{phase.tt}</p>
                </div>
                <div>
                  <h4>YouTube</h4>
                  <p>{phase.yt}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

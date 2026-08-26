import { whySpotify } from '../../data/content'

export function WhySpotify() {
  return (
    <section className="section" id="why-spotify">
      <div className="shell">
        <p className="section-kicker">03 — Why Spotify</p>
        <h2 className="section-title">Spotify already owns the soundtrack. Running adds movement.</h2>
        <p className="section-lede">{whySpotify.connection}</p>
        <div className="grid-2">
          <article className="panel">
            <h3>Spotify already understands</h3>
            <div className="tag-row">
              {whySpotify.understands.map((item) => (
                <span className="tag tag-lime" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </article>
          <article className="panel">
            <h3>Running introduces another layer</h3>
            <p className="big-word">{whySpotify.runningLayer}</p>
            <p style={{ marginTop: '1rem' }}>{whySpotify.positioning}</p>
          </article>
        </div>
      </div>
    </section>
  )
}

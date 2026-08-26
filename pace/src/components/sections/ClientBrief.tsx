import { clientBrief } from '../../data/content'

export function ClientBrief() {
  return (
    <section className="section" id="brief">
      <div className="shell">
        <p className="section-kicker">00 — Client brief</p>
        <h2 className="section-title">Approached as a real Spotify campaign brief.</h2>
        <p className="section-lede">
          Self-initiated portfolio work—but structured as if Spotify asked how to
          play a more meaningful role in the running experience through music.
        </p>
        <div className="brief-meta">
          <div>
            <span>Client</span>
            <strong>{clientBrief.client}</strong>
          </div>
          <div>
            <span>Category</span>
            <strong>{clientBrief.category}</strong>
          </div>
          <div>
            <span>Campaign</span>
            <strong>{clientBrief.campaign}</strong>
          </div>
        </div>
        <div className="grid-2" style={{ marginTop: '1.25rem' }}>
          <article className="panel">
            <h3>Business opportunity</h3>
            <p>{clientBrief.opportunity}</p>
          </article>
          <article className="panel accent-panel">
            <h3>Campaign objective</h3>
            <p>{clientBrief.objective}</p>
          </article>
        </div>
        <div className="tag-row" style={{ marginTop: '1rem' }}>
          {clientBrief.encourage.map((item) => (
            <span className="tag tag-lime" key={item}>
              {item}
            </span>
          ))}
        </div>
        <div className="note-callout" style={{ marginTop: '1.25rem' }}>
          <strong>Real-world filter</strong>
          <div style={{ marginTop: '0.35rem' }}>
            Could Spotify realistically approve, produce, launch, and measure
            this—while staying music-first? If it requires Spotify to become
            Garmin, revise it.
          </div>
        </div>
      </div>
    </section>
  )
}

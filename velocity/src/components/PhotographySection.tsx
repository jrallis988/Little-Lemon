const treatments = [
  { title: 'Masking', note: 'Clean athlete cutouts with hair/equipment edge care' },
  { title: 'Retouch', note: 'Skin, kit, and equipment without plastic finish' },
  { title: 'Contrast', note: 'Athletic punch; preserve midtone muscle detail' },
  { title: 'Color', note: 'Unified grade across sports; accent reserved for sport' },
  { title: 'Environment', note: 'Enhanced ice, court, track, alpine atmosphere' },
  { title: 'Motion', note: 'Selective blur / freeze — never gimmick streaks' },
  { title: 'Depth', note: 'Foreground type + mid athlete + graphic field' },
  { title: 'Grain', note: 'Subtle print texture for campaign cohesion' },
  { title: 'Focus', note: 'Hold the decisive contact point sharp' },
  { title: 'Composite', note: 'Source plates rebuilt into single campaign still' },
]

export function PhotographySection() {
  return (
    <section className="section section--soft" id="photography">
      <div className="section__inner">
        <p className="section__eyebrow">04 — Photography</p>
        <h2 className="section__title">Treatment system</h2>
        <p className="section__lead">
          A consistent photographic approach makes six sports feel like one campaign — while each
          sport still owns its own geometry.
        </p>

        <div className="photo-treat-grid">
          {treatments.map((t) => (
            <div className="photo-treat" key={t.title}>
              <strong>{t.title}</strong>
              <span>{t.note}</span>
            </div>
          ))}
        </div>

        <h3
          className="section__title"
          style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginTop: '3rem' }}
        >
          Before → After
        </h3>
        <p className="section__lead">Raw capture becomes finished campaign artwork.</p>

        <div className="compare" aria-label="Before and after photography treatment">
          <div className="compare__panel">
            <img src="/velocity/dist/posters/before-raw.jpg" alt="Raw source photograph" />
            <span className="compare__label">Before — Raw</span>
          </div>
          <div className="compare__arrow" aria-hidden>
            →
          </div>
          <div className="compare__panel compare__panel--after">
            <img src="/velocity/dist/posters/running.jpg" alt="Finished campaign treatment" />
            <span className="compare__label">After — Campaign</span>
          </div>
        </div>
      </div>
    </section>
  )
}

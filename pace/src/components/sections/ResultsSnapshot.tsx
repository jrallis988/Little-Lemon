export function ResultsSnapshot() {
  const items = [
    {
      label: 'Learning',
      value: 'Music cues convert',
      detail:
        'Runner-only creative engaged; album art + track + Spotify CTA improved playlist intent in the simulated test.',
    },
    {
      label: 'Strongest hook',
      value: 'Named tracks',
      detail:
        '“Final-mile song” and proof-led TikTok openings beat brand intros on retention and shares.',
    },
    {
      label: 'Share asset',
      value: 'PACE Card',
      detail:
        'Soundtrack identity drove simulated shares and friend discovery back into playlists.',
    },
    {
      label: 'North star',
      value: 'Listen again',
      detail:
        'Every platform path should resolve to playlist starts, saves, and return listening—not vanity alone.',
    },
  ]

  return (
    <section className="section" id="results-snapshot">
      <div className="shell">
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <p className="section-kicker" style={{ marginBottom: 0 }}>
            Results snapshot
          </p>
          <span className="sim-badge">Simulated / directional</span>
        </div>
        <h2 className="section-title">What the creative tests suggest.</h2>
        <p className="section-lede">
          Not a live Spotify report—directional lessons from the proposed KPIs
          and simulated experiments earlier in this case study.
        </p>
        <div className="results-grid">
          {items.map((item) => (
            <article className="result-card" key={item.label}>
              <span>{item.label}</span>
              <h3>{item.value}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

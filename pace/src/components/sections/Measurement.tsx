export function Measurement() {
  const groups = [
    {
      title: 'Discover',
      items: ['Reach', 'Impressions', 'Video views'],
      note: 'Did the idea get seen?',
    },
    {
      title: 'Engage',
      items: ['Comments', 'Shares', 'Saves', 'Engagement rate'],
      note: 'Did runners participate?',
    },
    {
      title: 'Video',
      items: ['Watch time', 'Avg view duration', 'Completion', 'Retention'],
      note: 'Did storytelling hold?',
    },
    {
      title: 'Reveal',
      items: ['Spotify opens', 'Card views', 'Link clicks', 'CTR'],
      note: 'Did identity convert interest?',
    },
    {
      title: 'Return',
      items: ['Session starts', 'Card shares', 'Challenge joins'],
      note: 'Did they run again?',
    },
  ]

  return (
    <section className="section" id="measurement">
      <div className="shell">
        <p className="section-kicker">12 — Measurement framework</p>
        <h2 className="section-title">Metrics only matter relative to the objective.</h2>
        <p className="section-lede">
          A high-reach challenge with low Spotify opens isn’t a failure—unless
          the job was Reveal. Objectives dictate both the art and the scoreboard.
        </p>
        <div className="measure-grid">
          {groups.map((g) => (
            <article className="panel measure-card" key={g.title}>
              <h3>{g.title}</h3>
              <ul>
                {g.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
              <p style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--muted)' }}>
                {g.note}
              </p>
            </article>
          ))}
        </div>
        <div className="note-callout">
          <strong>SIMULATED DATA</strong> — Performance sections use a fictional
          social dataset analyzed with Python/Pandas and visualized in React.
          Patterns are designed to be interpretable—not to claim real Spotify
          results.
        </div>
      </div>
    </section>
  )
}

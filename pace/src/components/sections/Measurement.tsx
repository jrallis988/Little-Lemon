export function Measurement() {
  const groups = [
    {
      title: 'Awareness',
      items: ['Reach', 'Impressions', 'Video views'],
      note: 'Primary for tease & reveal.',
    },
    {
      title: 'Engagement',
      items: ['Likes', 'Comments', 'Shares', 'Saves', 'Engagement rate'],
      note: 'Primary for community & culture.',
    },
    {
      title: 'Video',
      items: ['Watch time', 'Avg view duration', 'Completion', 'Retention'],
      note: 'Judge storytelling quality.',
    },
    {
      title: 'Consideration',
      items: ['Profile visits', 'Product-page visits', 'Link clicks', 'CTR'],
      note: 'Bridge from interest to intent.',
    },
    {
      title: 'Action',
      items: ['Sign-ups', 'Event registrations', 'Product-page actions'],
      note: 'Only meaningful after intent creative.',
    },
  ]

  return (
    <section className="section" id="measurement">
      <div className="shell">
        <p className="section-kicker">09 — Measurement framework</p>
        <h2 className="section-title">Metrics only matter relative to the objective.</h2>
        <p className="section-lede">
          Not every number is equal. A high-reach tease with low CTR is not a
          failure — unless the stage was Convert.
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
          <strong>SIMULATED DATA</strong> — The following performance sections use
          a fictional ~32-piece dataset analyzed with Python and Pandas, then
          visualized in React. Patterns are designed to be interpretable, not to
          claim real client results.
        </div>
      </div>
    </section>
  )
}

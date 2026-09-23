import { calendar } from '../../data/content'

const weeks = [1, 2, 3, 4] as const

export function ContentCalendar() {
  return (
    <section className="section" id="calendar">
      <div className="shell">
        <p className="section-kicker">10 — Campaign rhythm</p>
        <h2 className="section-title">Four weeks. Always back to Spotify.</h2>
        <p className="section-lede">
          Discover → Listen → Reveal → Share → Listen again—compressed into a
          campaign beat, not a project-management grid.
        </p>
        <div className="week-strip">
          {weeks.map((week) => {
            const items = calendar.filter((c) => c.week === week)
            return (
              <article className="week-card" key={week}>
                <h3>{items[0]?.weekLabel.replace(/^Week \d+ — /, '')}</h3>
                <p className="week-num">Week {week}</p>
                <ul>
                  {items.slice(0, 4).map((item) => (
                    <li key={`${item.day}-${item.platform}-${item.title}`}>
                      <strong>{item.platform}</strong>
                      <span>{item.title}</span>
                      <em>{item.cta}</em>
                    </li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

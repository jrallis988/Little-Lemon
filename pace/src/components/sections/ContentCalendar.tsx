import { calendar } from '../../data/content'

const weeks = [1, 2, 3, 4] as const

export function ContentCalendar() {
  return (
    <section className="section" id="calendar">
      <div className="shell">
        <p className="section-kicker">07 — Content calendar</p>
        <h2 className="section-title">Four weeks. One campaign rhythm.</h2>
        <p className="section-lede">
          A professional launch calendar distributed across Instagram, TikTok,
          and YouTube — designed as campaign material, not project-management UI.
        </p>
        {weeks.map((week) => {
          const items = calendar.filter((c) => c.week === week)
          return (
            <div className="calendar-week" key={week}>
              <h3>{items[0]?.weekLabel}</h3>
              <div className="panel" style={{ padding: '0.5rem 1rem 0.25rem' }}>
                <table className="calendar-table">
                  <thead>
                    <tr>
                      <th>Day</th>
                      <th>Platform</th>
                      <th>Format</th>
                      <th>Pillar</th>
                      <th>Stage</th>
                      <th>Objective</th>
                      <th>Content</th>
                      <th>CTA</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={`${item.day}-${item.platform}-${item.title}`}>
                        <td>{item.day}</td>
                        <td>{item.platform}</td>
                        <td>{item.format}</td>
                        <td>{item.pillar}</td>
                        <td>{item.stage}</td>
                        <td>{item.objective}</td>
                        <td>{item.title}</td>
                        <td>{item.cta}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

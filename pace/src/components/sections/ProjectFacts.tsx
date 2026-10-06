export function ProjectFacts() {
  const facts = [
    ['Format', 'Portfolio case study — not a live site or app'],
    ['Client framing', 'Spotify (self-initiated brief)'],
    ['Category', 'Music × fitness culture'],
    ['Role demonstrated', 'Social strategy + creative + measurement'],
    ['Data', 'Simulated — for demonstration only'],
    ['Not this project', 'Shipped product · fitness tracker · official Spotify work'],
  ]

  return (
    <section className="section" id="project-facts">
      <div className="shell">
        <p className="section-kicker">Project facts</p>
        <h2 className="section-title">How to read this case study.</h2>
        <div className="facts-grid">
          {facts.map(([label, value]) => (
            <div className="fact" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

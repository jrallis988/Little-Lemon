export function ProjectFacts() {
  const facts = [
    ['Client framing', 'Spotify (self-initiated brief)'],
    ['Category', 'Music × fitness culture'],
    ['Role demonstrated', 'Social strategy + creative + measurement'],
    ['Tools', 'Figma · PS · AI · Premiere · AE · React · Python'],
    ['Data', 'Simulated — for demonstration only'],
    ['Not included', 'Fitness tracking · Bauer · live Spotify results'],
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

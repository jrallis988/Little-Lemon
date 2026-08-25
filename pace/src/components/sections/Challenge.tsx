export function Challenge() {
  return (
    <section className="section" id="challenge">
      <div className="shell">
        <p className="section-kicker">01 — Business challenge</p>
        <h2 className="section-title">Launch PACE ONE without sounding like every other drop.</h2>
        <p className="section-lede">
          PACE is introducing an everyday performance running shoe. The brand
          needs awareness, product consideration, community participation, and
          website traffic — earned through FIND YOUR PACE across Instagram,
          TikTok, and YouTube.
        </p>
        <div className="grid-4">
          {[
            ['Awareness', 'Make PACE and PACE ONE recognizable to runners 18–40.'],
            ['Consideration', 'Explain why the shoe exists for daily miles.'],
            ['Community', 'Turn followers into participants in runs and challenges.'],
            ['Traffic', 'Move social attention onto product and event pages.'],
          ].map(([t, d]) => (
            <div className="panel" key={t}>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
        <div className="note-callout" style={{ marginTop: '1.5rem' }}>
          <strong>Central creative idea:</strong> FIND YOUR PACE. — Not faster.
          Not slower. Yours. The line scales from Starter confidence to Racer
          precision without fracturing the brand.
        </div>
      </div>
    </section>
  )
}

const adaptations = [
  {
    ratio: '16:9',
    className: 'adapt--16x9',
    image: './posters/running.jpg',
    word: 'DRIVE',
    note: 'Lateral sprint composition. Type anchors lower left; lanes extend through the wide field.',
  },
  {
    ratio: '4:5',
    className: 'adapt--4x5',
    image: './posters/basketball.jpg',
    word: 'RISE',
    note: 'Vertical type returns. Athlete recentered; court geometry rebuilt for the taller crop.',
  },
  {
    ratio: '1:1',
    className: 'adapt--1x1',
    image: './posters/tennis.jpg',
    word: 'IMPACT',
    note: 'Square forces tighter framing. Concept centered under contact point — not a letterbox crop.',
  },
  {
    ratio: '9:16',
    className: 'adapt--9x16',
    image: './posters/soccer.jpg',
    word: 'STRIKE',
    note: 'Full-height athlete. Trajectory and type restack; side margins collapse.',
  },
]

export function DigitalAdaptation() {
  return (
    <section className="section" id="digital">
      <div className="section__inner">
        <p className="section__eyebrow">11 — Digital Adaptation</p>
        <h2 className="section__title">Redesign, don’t crop</h2>
        <p className="section__lead">
          Proportion changes require new compositions — this is graphic-design adaptation, not social
          strategy.
        </p>

        <div className="adapt-grid">
          {adaptations.map((a) => (
            <article className={`adapt ${a.className}`} key={a.ratio}>
              <p className="adapt__ratio">{a.ratio}</p>
              <div className="adapt__frame">
                <img src={a.image} alt="" />
                <div
                  aria-hidden
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, transparent 40%, rgba(10,10,10,0.75))',
                    pointerEvents: 'none',
                    zIndex: 1,
                  }}
                />
                <p className="adapt-type">{a.word}</p>
              </div>
              <p className="adapt__note">{a.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

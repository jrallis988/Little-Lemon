const boards = [
  {
    title: 'Photography',
    body: 'Capture athletes at the hinge of action — release, rise, drive, strike, impact, air. Prefer decisive gestures over posed hero shots. Faces optional; body mechanics mandatory.',
  },
  {
    title: 'Lighting',
    body: 'Hard directional light that carves muscle and equipment. Rink whites, court tungsten, alpine daylight. Avoid flat studio beauty lighting that erases athletic force.',
  },
  {
    title: 'Movement',
    body: 'Photographers should hunt the frame where motion is readable in a still: stick follow-through, vertical hang time, lane lean, boot-to-ball contact, racket compression, board float.',
  },
  {
    title: 'Composition',
    body: 'Leave intentional negative space for oversized display type. Crop boldly. Protect a clean plane for concept words without trapping athletes in dead center every time.',
  },
  {
    title: 'Wardrobe',
    body: 'Authentic kit and equipment. Minimal logos. Silhouettes must read against type. Reflective ice, matte jersey, chalked hands, snow spray — texture over fashion gloss.',
  },
  {
    title: 'Environment',
    body: 'Prefer authentic venues with selective enhancement over pure green-screen fantasy. Studio isolation is allowed when environment graphics (lanes, ice, court) are rebuilt in-comp.',
  },
]

export function ArtDirection() {
  return (
    <section className="section section--paper" id="art-direction">
      <div className="section__inner">
        <p className="section__eyebrow">02 — Art Direction</p>
        <h2 className="section__title">Brief before pixels</h2>
        <p className="section__lead">
          Art direction defines what a photograph must do for the system — not only how finished files
          are retouched.
        </p>
        <hr className="section__rule" />
        <div className="ad-grid">
          {boards.map((b) => (
            <article className="ad-card" key={b.title}>
              <h3>{b.title}</h3>
              <p>{b.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

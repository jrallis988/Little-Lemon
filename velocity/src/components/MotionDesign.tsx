const frames = [
  {
    title: 'Count',
    note: 'Numbers climb — 00:00.00 → split time.',
    visual: 'count',
  },
  {
    title: 'Accelerate',
    note: 'Typography stretches as DRIVE builds.',
    visual: 'stretch',
  },
  {
    title: 'Snap',
    note: 'Image locks into position on the beat.',
    visual: 'snap',
  },
  {
    title: 'Trace',
    note: 'Lines draw the athlete’s path in real time.',
    visual: 'trace',
  },
  {
    title: 'Freeze',
    note: 'Frame holds at IMPACT — collision held.',
    visual: 'freeze',
  },
  {
    title: 'Separate',
    note: 'Elements peel apart on RELEASE.',
    visual: 'separate',
  },
]

export function MotionDesign() {
  return (
    <section className="section section--soft" id="motion-design">
      <div className="section__inner">
        <p className="section__eyebrow">Motion Design</p>
        <h2 className="section__title">Built to move</h2>
        <p className="section__lead">
          Because the concept is velocity, motion graphics are part of the system — not an afterthought.
          Storyboard frames establish how identity behaves in time.
        </p>

        <div className="motion-frames">
          {frames.map((f, i) => (
            <article className={`motion-frame motion-frame--${f.visual}`} key={f.title}>
              <div className="motion-frame__stage" aria-hidden>
                <span className="motion-frame__ghost">VELOCITY</span>
                <span className="motion-frame__word">DRIVE</span>
                <span className="motion-frame__stat">00:09.81</span>
                <span className="motion-frame__line" />
              </div>
              <p className="motion-frame__num">0{i + 1}</p>
              <h3>{f.title}</h3>
              <p>{f.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

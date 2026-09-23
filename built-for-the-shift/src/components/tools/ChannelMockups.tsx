const APPS = [
  {
    id: 'web',
    title: 'Web / PDP',
    note: 'Scroll modules · product + performance',
    layout: 'web',
  },
  {
    id: 'display',
    title: 'Digital Display',
    note: 'Responsive board · 16:9 loop',
    layout: 'display',
  },
  {
    id: 'retail',
    title: 'Retail Motion',
    note: 'In-store vertical loop',
    layout: 'retail',
  },
  {
    id: 'arena',
    title: 'Event / Arena',
    note: 'Dasher / ribbon sting',
    layout: 'arena',
  },
  {
    id: 'keyart',
    title: 'Static Key Art',
    note: 'Pulled from motion frames',
    layout: 'keyart',
  },
  {
    id: 'paid',
    title: 'Paid :06',
    note: 'Impact → product → line',
    layout: 'paid',
  },
] as const

export function ChannelMockups() {
  return (
    <div className="channel-grid">
      {APPS.map((a) => (
        <article key={a.id} className="channel-card">
          <div className={`channel-mock channel-mock--${a.layout}`}>
            <div className="channel-mock__inner">
              <span className="tech">BUILT FOR</span>
              <strong className="display">THE SHIFT.</strong>
              {a.layout === 'web' ? <em className="tech">PDP · PERFORMANCE MODULE</em> : null}
              {a.layout === 'retail' ? <em className="tech">VAPOR EDGE</em> : null}
              {a.layout === 'arena' ? <em className="tech">ARENA STING</em> : null}
              {a.layout === 'paid' ? <em className="tech">:06 PAID</em> : null}
            </div>
          </div>
          <h3 className="condensed">{a.title}</h3>
          <p>{a.note}</p>
        </article>
      ))}
    </div>
  )
}

const FRAMES = [
  {
    id: 'sf01',
    title: 'Enter the Ice',
    caption: 'Quiet anticipation before the shift opens.',
    tone: 'rink',
    word: 'ENTER',
  },
  {
    id: 'sf02',
    title: 'Accelerate',
    caption: 'First strides → skate isolation.',
    tone: 'skate',
    word: 'ACCELERATE',
  },
  {
    id: 'sf03',
    title: 'Cut',
    caption: 'Edge pressure. Direction shifts.',
    tone: 'action',
    word: 'CUT',
  },
  {
    id: 'sf04',
    title: 'Contact',
    caption: 'Protection answers the collision.',
    tone: 'rink',
    word: 'IMPACT',
  },
  {
    id: 'sf05',
    title: 'Release',
    caption: 'Stick flex → trajectory.',
    tone: 'stick',
    word: 'RELEASE',
  },
  {
    id: 'sf06',
    title: 'Product Hero',
    caption: 'Equipment as co-lead with the athlete.',
    tone: 'skate',
    word: 'VAPOR',
  },
  {
    id: 'sf07',
    title: 'Social 9:16',
    caption: 'Vertical rebuild for thumb-stop.',
    tone: 'action',
    word: 'SHIFT',
  },
  {
    id: 'sf08',
    title: 'End Card',
    caption: 'Campaign line hold.',
    tone: 'lockup',
    word: 'BUILT FOR THE SHIFT.',
  },
] as const

function FrameArt({ tone, word }: { tone: string; word: string }) {
  if (tone === 'lockup') {
    return (
      <div className="sf-art sf-art--lockup">
        <span className="display">{word}</span>
      </div>
    )
  }
  const photo =
    tone === 'skate'
      ? 'hockey-photo--skate'
      : tone === 'stick'
        ? 'hockey-photo--stick'
        : tone === 'rink'
          ? 'hockey-photo--rink'
          : 'hockey-photo--action'
  return (
    <div className="sf-art">
      <div className={`hockey-photo ${photo}`} />
      <div className="sf-art__bar" />
      <span className="sf-art__word display">{word}</span>
    </div>
  )
}

export function StyleFrameGallery() {
  return (
    <div className="sf-grid">
      {FRAMES.map((f) => (
        <article key={f.id} className="sf-card">
          <div className="sf-card__art">
            <FrameArt tone={f.tone} word={f.word} />
          </div>
          <div className="sf-card__body">
            <h3>{f.title}</h3>
            <p>{f.caption}</p>
          </div>
        </article>
      ))}
    </div>
  )
}

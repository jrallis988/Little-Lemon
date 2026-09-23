const SOCIAL_CARDS = [
  {
    id: 'reels',
    label: 'IG Reels',
    ratio: '9:16',
    line: 'THE SHIFT STARTS',
    sub: 'Athlete open',
    kind: 'athlete',
    photo: 'hockey-photo--action',
  },
  {
    id: 'stories',
    label: 'IG Stories',
    ratio: '9:16',
    line: '0.38s',
    sub: 'FIRST-STRIDE RESPONSE',
    kind: 'perf',
    photo: 'hockey-photo--skate',
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    ratio: '9:16',
    line: 'ACCELERATE',
    sub: 'Kinetic type',
    kind: 'action',
    photo: 'hockey-photo--action',
  },
  {
    id: 'shorts',
    label: 'YT Shorts',
    ratio: '9:16',
    line: 'VAPOR EDGE',
    sub: 'Product focus',
    kind: 'product',
    photo: 'hockey-photo--skate',
  },
  {
    id: 'athlete',
    label: 'Athlete Post',
    ratio: '1:1',
    line: 'NOVA REED',
    sub: '#19 · FORWARD',
    kind: 'athlete',
    photo: 'hockey-photo--rink',
  },
  {
    id: 'product',
    label: 'Product Post',
    ratio: '1:1',
    line: 'BUILT FOR ACCELERATION',
    sub: 'VAPOR EDGE',
    kind: 'product',
    photo: 'hockey-photo--skate',
  },
  {
    id: 'teaser',
    label: 'Launch Teaser',
    ratio: '4:5',
    line: 'COMING FOR THE SHIFT',
    sub: 'Countdown energy',
    kind: 'teaser',
    photo: 'hockey-photo--action',
  },
  {
    id: 'paid',
    label: 'Paid Social',
    ratio: '1:1',
    line: 'SHOP THE LINE',
    sub: ':06 bumper',
    kind: 'paid',
    photo: 'hockey-photo--gear',
  },
] as const

export function SocialFamilyGrid() {
  return (
    <div className="social-family">
      {SOCIAL_CARDS.map((c) => (
        <article key={c.id} className="social-card" data-kind={c.kind}>
          <div className="social-card__meta tech">
            <span>{c.label}</span>
            <span>{c.ratio}</span>
          </div>
          <div className={`social-card__stage social-card__stage--${c.ratio.replace(':', '')}`}>
            <div className={`hockey-photo ${c.photo}`} />
            <div className="social-card__bar" />
            <div className="social-card__copy">
              <strong className="display">{c.line}</strong>
              <em className="tech">{c.sub}</em>
              <span className="tech social-card__brand">BUILT FOR THE SHIFT.</span>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}

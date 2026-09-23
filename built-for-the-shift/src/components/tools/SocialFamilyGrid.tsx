const SOCIAL_CARDS = [
  { id: 'reels', label: 'IG Reels', ratio: '9:16', line: 'THE SHIFT STARTS', kind: 'athlete' },
  { id: 'stories', label: 'IG Stories', ratio: '9:16', line: '0.38s RESPONSE', kind: 'perf' },
  { id: 'tiktok', label: 'TikTok', ratio: '9:16', line: 'ACCELERATE', kind: 'action' },
  { id: 'shorts', label: 'YT Shorts', ratio: '9:16', line: 'VAPOR EDGE', kind: 'product' },
  { id: 'athlete', label: 'Athlete Post', ratio: '1:1', line: 'NOVA REED · 19', kind: 'athlete' },
  { id: 'product', label: 'Product Post', ratio: '1:1', line: 'BUILT FOR ACCELERATION', kind: 'product' },
  { id: 'teaser', label: 'Launch Teaser', ratio: '4:5', line: 'COMING FOR THE SHIFT', kind: 'teaser' },
  { id: 'paid', label: 'Paid Social', ratio: '1:1', line: 'SHOP THE LINE', kind: 'paid' },
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
            <div
              className={`hockey-photo ${
                c.kind === 'product'
                  ? 'hockey-photo--skate'
                  : c.kind === 'perf'
                    ? 'hockey-photo--skate'
                    : 'hockey-photo--action'
              }`}
            />
            <div className="social-card__copy">
              <strong className="display">{c.line}</strong>
              <span className="tech">BUILT FOR THE SHIFT.</span>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}

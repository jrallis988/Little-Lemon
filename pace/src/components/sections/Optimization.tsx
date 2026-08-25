const recos = [
  {
    title: 'Increase people-led creative',
    evidence:
      'Launch reel, 50-mile TikTok, and Maya’s 10K story led reach and emotional engagement versus product-only peers.',
    action: 'Prioritize runner-in-product storytelling for awareness flights.',
  },
  {
    title: 'Produce more educational short-form',
    evidence:
      'Training pillar led saves across Instagram Reels and TikTok tips — utility extends lifespan past the feed.',
    action: 'Ship a weekly pacing / recovery series with a consistent visual system.',
  },
  {
    title: 'Test stronger TikTok hooks',
    evidence:
      '“I ran 50 miles…” beat “Meet the new PACE ONE” on 3s retention, watch time, completion, and shares.',
    action: 'Open with result or tension before naming the product.',
  },
  {
    title: 'Continue athlete-focused YouTube thumbnails',
    evidence:
      'Test 03: athlete packaging lifted CTR and qualified watch time versus product-only frames.',
    action: 'Make face + motion the default thumbnail system.',
  },
  {
    title: 'Reduce repetitive product-only graphics',
    evidence:
      'Product stills trailed on engagement but still won convert-stage CTR — useful in the right stage only.',
    action: 'Reserve isolated product grids for consideration/convert; lead awareness with people and community.',
  },
  {
    title: 'Expand community storytelling',
    evidence:
      'Pace challenge and group-run content drove shares and the highest single engagement rate in the set.',
    action: 'Scale challenges, RSVPs, and run recaps into the evergreen calendar.',
  },
]

export function Optimization() {
  return (
    <section className="section" id="optimize">
      <div className="shell">
        <p className="section-kicker">19 — What we do next</p>
        <h2 className="section-title">Optimization recommendations</h2>
        <p className="section-lede">
          Every recommendation traces to evidence earlier in this case study —
          data → insight → creative decision.
        </p>
        <div className="reco-list">
          {recos.map((r) => (
            <article className="reco-item" key={r.title}>
              <div className="reco-num" aria-hidden />
              <div>
                <h3>{r.title}</h3>
                <p>
                  <strong>Evidence:</strong> {r.evidence}
                </p>
                <p>
                  <strong>Action:</strong> {r.action}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

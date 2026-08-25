const platforms = [
  {
    name: 'Instagram',
    worked:
      'People-led Reels and runner stories carried brand emotion. Educational carousels earned saves. Stories RSVPs converted community intent.',
    didnt:
      'Product-only feed stills under-indexed on engagement when used as cold awareness. Grid looked sharp but conversation stayed thin.',
    change:
      'Lead awareness with runners using the product. Keep polished product carousels for consideration/convert weeks. Expand Story participation.',
  },
  {
    name: 'TikTok',
    worked:
      'Outcome-led hooks, POV culture, challenges, and tip videos drove discovery and shares. Native pacing beat polished intros.',
    didnt:
      '“Meet the new PACE ONE” openings lost early retention. Overproduced product teases felt like ads too soon.',
    change:
      'Standardize proof-first hooks. Keep weekly educational tips. Treat challenges as growth engines, not one-offs.',
  },
  {
    name: 'YouTube',
    worked:
      'Athlete packaging, training long-form, and Shorts bridges built watch time and mid-funnel clicks. Depth created belief.',
    didnt:
      'Product-only thumbnails depressed CTR. Community documentary under-retained without a tighter narrative spine.',
    change:
      'Default to athlete-focused thumbnails. Chapter training films. Use Shorts to feed the long-form library, not replace it.',
  },
]

export function PlatformComparison() {
  return (
    <section className="section" id="platform-compare">
      <div className="shell">
        <p className="section-kicker">18 — Platform comparison</p>
        <h2 className="section-title">Creative decisions — not just platform tallies.</h2>
        <p className="section-lede">
          What to keep, what to stop, and what to change on each surface.
        </p>
        <div className="grid-3">
          {platforms.map((p) => (
            <article className="panel compare-col" key={p.name}>
              <h3>{p.name}</h3>
              <div className="compare-block worked">
                <div className="label">What worked</div>
                <p>{p.worked}</p>
              </div>
              <div className="compare-block">
                <div className="label">What didn’t</div>
                <p>{p.didnt}</p>
              </div>
              <div className="compare-block change">
                <div className="label">What should change</div>
                <p>{p.change}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

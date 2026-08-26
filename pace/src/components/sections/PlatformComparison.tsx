const platforms = [
  {
    name: 'TikTok',
    role: 'Challenge',
    worked:
      'Proof-led hooks, BPM challenges, and Card payoffs drove discovery and shares. Native pacing beat polished intros.',
    didnt:
      '“Meet PACE on Spotify” openings lost early retention. Overproduced session demos felt like ads too soon.',
    change:
      'Standardize tension-first hooks. Keep weekly educational tips. Treat challenges as growth engines.',
  },
  {
    name: 'Instagram',
    role: 'Identity',
    worked:
      'PACE Cards, runner stories, and state carousels carried identity. Stories stickers converted share intent.',
    didnt:
      'UI-only feed stills under-indexed on engagement as cold awareness.',
    change:
      'Lead awareness with runners + Cards. Keep polished UI for consideration. Expand Card Stories.',
  },
  {
    name: 'YouTube',
    role: 'Stories',
    worked:
      'Athlete music diaries, training long-form, and Shorts bridges built watch time and Spotify clicks.',
    didnt:
      'UI-only thumbnails depressed CTR. Community cuts under-retained without a tighter narrative spine.',
    change:
      'Default athlete + Card packaging. Chapter training films. Use Shorts to feed long-form.',
  },
]

export function PlatformComparison() {
  return (
    <section className="section" id="platform-compare">
      <div className="shell">
        <p className="section-kicker">16 — Platform comparison</p>
        <h2 className="section-title">Creative decisions—not just platform tallies.</h2>
        <p className="section-lede">
          What to keep, stop, and change on each surface—while Spotify remains
          the experience destination.
        </p>
        <div className="grid-3">
          {platforms.map((p) => (
            <article className="panel compare-col" key={p.name}>
              <p className="platform-purpose">{p.role}</p>
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

const platforms = [
  {
    name: 'TikTok',
    role: 'Participation + Discovery',
    worked:
      'Named-track hooks, final-mile song challenges, and playlist CTAs drove discovery into Spotify.',
    didnt:
      'Brand-first “Meet PACE” openings lost early retention. Runner-only clips without music cues under-converted.',
    change:
      'Open on a song. End on a playlist. Keep weekly listening tips native.',
  },
  {
    name: 'Instagram',
    role: 'Identity + Sharing',
    worked:
      'Music-first PACE Cards, playlist Stories, and album-art Reels carried share identity.',
    didnt:
      'Runner photography without artwork or track titles engaged but weakly opened Spotify.',
    change:
      'Put album art, BPM, and Open Spotify in the first frame of awareness creative.',
  },
  {
    name: 'YouTube',
    role: 'Storytelling',
    worked:
      'Music diaries, playlist experiment films, and Shorts with named tracks built watch time and clicks.',
    didnt:
      'UI-only thumbnails depressed CTR. Stories without soundtrack chapters felt generic.',
    change:
      'Default athlete + album art packaging. Chapter films by playlist state.',
  },
]

export function PlatformComparison() {
  return (
    <section className="section" id="platform-compare">
      <div className="shell">
        <p className="section-kicker">16 — Platform comparison</p>
        <h2 className="section-title">Every surface should point back to listening.</h2>
        <p className="section-lede">
          Creative decisions by platform—measured against Spotify engagement, not
          vanity alone.
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

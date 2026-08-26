import { useCampaignInsights } from '../../data/analytics'
import { formatPct } from '../../data/campaign'

export function CreativePerformance() {
  const { byApproach } = useCampaignInsights()
  const map = Object.fromEntries(byApproach.map((a) => [a.key, a]))

  const rows = [
    {
      name: 'Experience-led',
      job: 'Session UI, playlists, and feature clarity.',
      wins: 'Stronger CTR once intent exists.',
      watch: 'Weaker cold engagement vs people/Cards.',
      stats: map['Product-led'],
    },
    {
      name: 'People-led',
      job: 'Runner stories, athlete diaries, Card reveals.',
      wins: 'Expanded reach and emotional completion.',
      watch: 'Needs clear Spotify CTAs to convert attention.',
      stats: map['People-led'],
    },
    {
      name: 'Educational',
      job: 'BPM tips, cadence cues, state explainers.',
      wins: 'Highest utility—saves and revisit behavior.',
      watch: 'Lower share velocity than challenges.',
      stats: map['Educational'],
    },
    {
      name: 'Community',
      job: 'Challenges, Card shares, group participation.',
      wins: 'Strongest share-led engagement loops.',
      watch: 'Needs operational follow-through.',
      stats: map['Community'],
    },
  ]

  return (
    <section className="section" id="what-worked">
      <div className="shell">
        <p className="section-kicker">13 — What creative worked?</p>
        <h2 className="section-title">No universal winner—only winners by objective.</h2>
        <p className="section-lede">
          Community drove participation. Education drove saves. Experience UI
          drove CTR. People-led storytelling drove reach.
        </p>
        <div className="creative-compare">
          {rows.map((r) => (
            <article className="panel" key={r.name}>
              <h3>{r.name}</h3>
              <p style={{ marginBottom: '0.65rem' }}>{r.job}</p>
              <p>
                <strong>Wins:</strong> {r.wins}
              </p>
              <p style={{ marginTop: '0.4rem' }}>
                <strong>Watch:</strong> {r.watch}
              </p>
              {r.stats && (
                <div className="tag-row">
                  <span className="tag tag-lime">
                    ER {formatPct(r.stats.avgEngagementRate)}
                  </span>
                  <span className="tag">CTR {formatPct(r.stats.avgCtr, 2)}</span>
                  <span className="tag">
                    Saves {r.stats.totalSaves.toLocaleString()}
                  </span>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

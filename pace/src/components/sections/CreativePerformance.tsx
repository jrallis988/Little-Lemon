import { useCampaignInsights } from '../../data/analytics'
import { formatPct } from '../../data/campaign'

export function CreativePerformance() {
  const { byApproach } = useCampaignInsights()
  const map = Object.fromEntries(byApproach.map((a) => [a.key, a]))

  const rows = [
    {
      name: 'Product-led',
      job: 'Polished product advertising and feature clarity.',
      wins: 'Strongest CTR and convert-stage link intent.',
      watch: 'Weaker cold engagement vs people/community.',
      stats: map['Product-led'],
    },
    {
      name: 'People-led',
      job: 'Runner stories and athlete proof.',
      wins: 'Expanded reach and emotional completion on video.',
      watch: 'Needs clear mid-funnel CTAs to convert attention.',
      stats: map['People-led'],
    },
    {
      name: 'Educational',
      job: 'Tips, pacing cues, training plans.',
      wins: 'Highest utility — saves and revisit behavior.',
      watch: 'Lower share velocity than challenges.',
      stats: map['Educational'],
    },
    {
      name: 'Community',
      job: 'Group runs, challenges, participation prompts.',
      wins: 'Strongest share-led engagement loops.',
      watch: 'Requires operational follow-through (events).',
      stats: map['Community'],
    },
  ]

  return (
    <section className="section" id="what-worked">
      <div className="shell">
        <p className="section-kicker">12 — What creative worked?</p>
        <h2 className="section-title">No universal winner — only winners by objective.</h2>
        <p className="section-lede">
          Declaring one format “best” is how brands overfit. The simulated results
          show different creative approaches winning different jobs.
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
        <div className="note-callout">
          Community content generated the strongest participatory engagement.
          Educational content generated the most saves. Product content generated
          stronger CTR. People-led video storytelling produced stronger reach.
          That nuance is the strategy.
        </div>
      </div>
    </section>
  )
}

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useCampaignInsights } from '../../data/analytics'
import { formatNumber, formatPct } from '../../data/campaign'
import { SIM_DISCLAIMER } from '../../data/content'

export function PerformanceOverview() {
  const { overall, byPlatform, byPillar, highlights, topContent } =
    useCampaignInsights()

  const platformChart = byPlatform.map((p) => ({
    name: p.key,
    reach: Math.round(p.totalReach / 1000),
    engagement: Number((p.avgEngagementRate * 100).toFixed(1)),
  }))

  const pillarChart = byPillar.map((p) => ({
    name: p.key,
    er: Number((p.avgEngagementRate * 100).toFixed(1)),
    ctr: Number((p.avgCtr * 100).toFixed(2)),
    saves: Math.round(p.totalSaves / 1000),
  }))

  return (
    <section className="section" id="performance">
      <div className="shell">
        <p className="section-kicker">12b — Performance overview</p>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <h2 className="section-title" style={{ marginBottom: 0 }}>
            Campaign performance
          </h2>
          <span className="sim-badge">Simulated data</span>
        </div>
        <p className="section-lede" style={{ marginTop: '1rem' }}>
          Editorial readouts—not a BI wall. Which creative behaviors moved
          discovery, Card identity, and return-to-Spotify intent?
        </p>

        <div className="stat-strip">
          <div className="stat">
            <div className="label">Overall reach</div>
            <div className="value">
              <em>{formatNumber(overall.totalReach)}</em>
            </div>
          </div>
          <div className="stat">
            <div className="label">Avg engagement</div>
            <div className="value">
              <em>{formatPct(overall.avgEngagementRate)}</em>
            </div>
          </div>
          <div className="stat">
            <div className="label">Watch time</div>
            <div className="value">
              <em>{formatNumber(Math.round(overall.totalWatchTime))}h</em>
            </div>
          </div>
          <div className="stat">
            <div className="label">Link clicks</div>
            <div className="value">
              <em>{formatNumber(overall.totalLinkClicks)}</em>
            </div>
          </div>
        </div>

        <div className="grid-2" style={{ marginBottom: '1rem' }}>
          <div className="chart-panel">
            <h3>Reach & engagement by platform</h3>
            <p className="hint">Reach in thousands · engagement rate %</p>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={platformChart}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(20,22,24,0.08)" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="reach" fill="#1A1C1E" name="Reach (K)" radius={[3, 3, 0, 0]} />
                <Bar dataKey="engagement" fill="#C5FF3D" name="Eng. %" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-panel">
            <h3>Pillars: engagement vs CTR vs saves</h3>
            <p className="hint">No universal winner — different jobs, different scores</p>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={pillarChart}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(20,22,24,0.08)" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="er" fill="#FF5A36" name="Eng. %" radius={[3, 3, 0, 0]} />
                <Bar dataKey="ctr" fill="#2F6BFF" name="CTR %" radius={[3, 3, 0, 0]} />
                <Bar dataKey="saves" fill="#C5FF3D" name="Saves (K)" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid-3">
          <div className="panel">
            <h3>Best-performing content</h3>
            <p>
              <strong>{highlights.bestContent.title}</strong>
            </p>
            <p style={{ marginTop: '0.5rem' }}>
              {highlights.bestContent.platform} · {highlights.bestContent.format} ·{' '}
              {formatPct(highlights.bestContent.engagement_rate ?? 0)} engagement
            </p>
          </div>
          <div className="panel">
            <h3>Strongest platform</h3>
            <p>
              <strong>{highlights.strongestPlatform}</strong> led average
              engagement — discovery + participatory formats compounded shares.
            </p>
          </div>
          <div className="panel">
            <h3>Strongest pillars</h3>
            <p>
              Engagement: <strong>{highlights.strongestPillar}</strong>
              <br />
              Saves: <strong>{highlights.bestSavesPillar}</strong>
              <br />
              CTR: <strong>{highlights.bestCtrPillar}</strong>
            </p>
          </div>
        </div>

        <div className="panel" style={{ marginTop: '1rem' }}>
          <h3>Top 5 by engagement rate</h3>
          <div className="bar-list" style={{ marginTop: '0.85rem' }}>
            {topContent.map((c) => (
              <div className="bar-row" key={c.content_id}>
                <span>{c.content_id}</span>
                <div className="bar-track">
                  <div
                    className="bar-fill"
                    style={{
                      width: `${Math.min(100, (c.engagement_rate ?? 0) * 400)}%`,
                    }}
                  />
                </div>
                <span>
                  {formatPct(c.engagement_rate ?? 0)} · {c.title}
                </span>
              </div>
            ))}
          </div>
          <p style={{ marginTop: '0.85rem', fontSize: '0.8rem', color: 'var(--muted)' }}>
            {SIM_DISCLAIMER}
          </p>
        </div>
      </div>
    </section>
  )
}

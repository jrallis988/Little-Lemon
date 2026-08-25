import { useMemo, useState } from 'react'
import { filterCampaign } from '../../data/analytics'
import { formatNumber, formatPct } from '../../data/campaign'
import { creativeAssets } from '../../data/content'
import type { Format, Pillar, Platform } from '../../data/types'

const platforms: Array<Platform | 'All'> = ['All', 'Instagram', 'TikTok', 'YouTube']
const formats: Array<Format | 'All'> = [
  'All',
  'Feed',
  'Carousel',
  'Story',
  'Reel',
  'TikTok',
  'Short',
  'Video',
]
const pillars: Array<Pillar | 'All'> = [
  'All',
  'Product',
  'Training',
  'People',
  'Culture',
  'Community',
]

function ChipGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: T[]
  value: T
  onChange: (v: T) => void
}) {
  return (
    <div className="filter-group">
      <span className="filter-label">{label}</span>
      <div className="chip-row" role="group" aria-label={label}>
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            className={`chip${value === opt ? ' chip-active' : ''}`}
            aria-pressed={value === opt}
            onClick={() => onChange(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}

export function PerformanceExplorer() {
  const [platform, setPlatform] = useState<Platform | 'All'>('All')
  const [format, setFormat] = useState<Format | 'All'>('All')
  const [pillar, setPillar] = useState<Pillar | 'All'>('All')

  const rows = useMemo(
    () => filterCampaign({ platform, format, pillar }),
    [platform, format, pillar],
  )

  const totals = useMemo(() => {
    const reach = rows.reduce((a, r) => a + r.reach, 0)
    const clicks = rows.reduce((a, r) => a + r.link_clicks, 0)
    const er =
      rows.length === 0
        ? 0
        : rows.reduce((a, r) => a + (r.engagement_rate ?? 0), 0) / rows.length
    const ctr =
      rows.length === 0
        ? 0
        : rows.reduce((a, r) => a + r.ctr, 0) / rows.length
    return { reach, clicks, er, ctr, count: rows.length }
  }, [rows])

  const relatedCreative = creativeAssets.filter((a) => {
    if (platform !== 'All' && a.platform !== platform) return false
    if (pillar !== 'All' && a.pillar !== pillar) return false
    return true
  })

  return (
    <section className="section" id="explorer">
      <div className="shell">
        <div className="explorer">
          <p className="section-kicker" style={{ color: 'rgba(255,255,255,0.55)' }}>
            20 — Interactive performance explorer
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <h2 className="section-title" style={{ marginBottom: 0 }}>
              Filter creative by performance
            </h2>
            <span className="sim-badge">Simulated data</span>
          </div>
          <p className="section-lede">
            Explore how platform, format, and pillar relate to reach, engagement,
            and clicks — then glance at matching creative examples.
          </p>

          <div className="filters">
            <ChipGroup
              label="Platform"
              options={platforms}
              value={platform}
              onChange={setPlatform}
            />
            <ChipGroup
              label="Format"
              options={formats}
              value={format}
              onChange={setFormat}
            />
            <ChipGroup
              label="Content pillar"
              options={pillars}
              value={pillar}
              onChange={setPillar}
            />
          </div>

          <div className="explorer-stats">
            <div className="explorer-stat">
              <div className="label">Pieces</div>
              <div className="value">{totals.count}</div>
            </div>
            <div className="explorer-stat">
              <div className="label">Reach</div>
              <div className="value">{formatNumber(totals.reach)}</div>
            </div>
            <div className="explorer-stat">
              <div className="label">Avg engagement</div>
              <div className="value">{formatPct(totals.er)}</div>
            </div>
            <div className="explorer-stat">
              <div className="label">Avg CTR / clicks</div>
              <div className="value">
                {formatPct(totals.ctr, 2)} · {formatNumber(totals.clicks)}
              </div>
            </div>
          </div>

          <div className="explorer-list" role="list">
            {rows.length === 0 && (
              <p style={{ color: 'rgba(255,255,255,0.65)' }}>
                No simulated pieces match these filters.
              </p>
            )}
            {rows.map((r) => (
              <div className="explorer-row" role="listitem" key={r.content_id}>
                <strong>{r.content_id}</strong>
                <span>{r.title}</span>
                <span>
                  {r.platform} · {r.format}
                </span>
                <span>ER {formatPct(r.engagement_rate ?? 0)}</span>
                <span>CTR {formatPct(r.ctr, 2)}</span>
                <span>Reach {formatNumber(r.reach)}</span>
              </div>
            ))}
          </div>

          {relatedCreative.length > 0 && (
            <div style={{ marginTop: '1.25rem' }}>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '-0.03em',
                  margin: '0 0 0.65rem',
                }}
              >
                Matching creative examples
              </h3>
              <div className="tag-row">
                {relatedCreative.slice(0, 6).map((c) => (
                  <span className="tag tag-lime" key={c.id}>
                    {c.title}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

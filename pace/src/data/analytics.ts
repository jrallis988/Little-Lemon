import { useMemo } from 'react'
import { campaignData } from './campaign'
import type {
  CampaignRecord,
  CreativeApproach,
  Format,
  Pillar,
  Platform,
  Stage,
} from './types'
import { calcEngagementRate } from './campaign'

export interface GroupStats {
  key: string
  pieces: number
  totalReach: number
  avgReach: number
  avgEngagementRate: number
  avgCtr: number
  avgCompletionRate: number
  totalSaves: number
  totalShares: number
  totalLinkClicks: number
  totalWatchTime: number
}

function summarize(rows: CampaignRecord[], key: string): GroupStats {
  const video = rows.filter((r) => r.views > 0)
  const avg = (vals: number[]) =>
    vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0
  return {
    key,
    pieces: rows.length,
    totalReach: rows.reduce((a, r) => a + r.reach, 0),
    avgReach: avg(rows.map((r) => r.reach)),
    avgEngagementRate: avg(rows.map((r) => r.engagement_rate ?? calcEngagementRate(r))),
    avgCtr: avg(rows.map((r) => r.ctr)),
    avgCompletionRate: avg(video.map((r) => r.completion_rate)),
    totalSaves: rows.reduce((a, r) => a + r.saves, 0),
    totalShares: rows.reduce((a, r) => a + r.shares, 0),
    totalLinkClicks: rows.reduce((a, r) => a + r.link_clicks, 0),
    totalWatchTime: rows.reduce((a, r) => a + r.watch_time_hours, 0),
  }
}

function groupBy<K extends string>(
  rows: CampaignRecord[],
  getter: (r: CampaignRecord) => K,
): GroupStats[] {
  const map = new Map<K, CampaignRecord[]>()
  for (const row of rows) {
    const k = getter(row)
    const list = map.get(k) ?? []
    list.push(row)
    map.set(k, list)
  }
  return [...map.entries()].map(([k, list]) => summarize(list, k))
}

export function useCampaignInsights() {
  return useMemo(() => {
    const overall = summarize(campaignData, 'overall')
    const byPlatform = groupBy(campaignData, (r) => r.platform)
    const byFormat = groupBy(campaignData, (r) => r.format)
    const byPillar = groupBy(campaignData, (r) => r.content_pillar)
    const byStage = groupBy(campaignData, (r) => r.campaign_stage)
    const byApproach = groupBy(campaignData, (r) => r.creative_approach)

    const top = [...campaignData].sort(
      (a, b) =>
        (b.engagement_rate ?? 0) - (a.engagement_rate ?? 0),
    )

    const strongestPlatform = [...byPlatform].sort(
      (a, b) => b.avgEngagementRate - a.avgEngagementRate,
    )[0]
    const strongestPillar = [...byPillar].sort(
      (a, b) => b.avgEngagementRate - a.avgEngagementRate,
    )[0]
    const bestCtrPillar = [...byPillar].sort((a, b) => b.avgCtr - a.avgCtr)[0]
    const bestSavesPillar = [...byPillar].sort(
      (a, b) => b.totalSaves - a.totalSaves,
    )[0]

    return {
      records: campaignData,
      overall,
      byPlatform,
      byFormat,
      byPillar,
      byStage,
      byApproach,
      topContent: top.slice(0, 5),
      highlights: {
        strongestPlatform: strongestPlatform.key as Platform,
        strongestPillar: strongestPillar.key as Pillar,
        bestCtrPillar: bestCtrPillar.key as Pillar,
        bestSavesPillar: bestSavesPillar.key as Pillar,
        bestContent: top[0],
      },
    }
  }, [])
}

export function filterCampaign(opts: {
  platform?: Platform | 'All'
  format?: Format | 'All'
  pillar?: Pillar | 'All'
  stage?: Stage | 'All'
  approach?: CreativeApproach | 'All'
}): CampaignRecord[] {
  return campaignData.filter((r) => {
    if (opts.platform && opts.platform !== 'All' && r.platform !== opts.platform)
      return false
    if (opts.format && opts.format !== 'All' && r.format !== opts.format)
      return false
    if (opts.pillar && opts.pillar !== 'All' && r.content_pillar !== opts.pillar)
      return false
    if (opts.stage && opts.stage !== 'All' && r.campaign_stage !== opts.stage)
      return false
    if (
      opts.approach &&
      opts.approach !== 'All' &&
      r.creative_approach !== opts.approach
    )
      return false
    return true
  })
}

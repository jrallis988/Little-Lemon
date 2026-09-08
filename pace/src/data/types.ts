export type Platform = 'Instagram' | 'TikTok' | 'YouTube' | 'Spotify'
export type Format =
  | 'Feed'
  | 'Carousel'
  | 'Story'
  | 'Reel'
  | 'TikTok'
  | 'Short'
  | 'Video'
export type Pillar = 'Product' | 'Training' | 'People' | 'Culture' | 'Community'
export type Stage =
  | 'Tease'
  | 'Reveal'
  | 'Educate'
  | 'Engage'
  | 'Convert'
  | 'Evergreen'
export type CreativeApproach =
  | 'Product-led'
  | 'People-led'
  | 'Educational'
  | 'Community'
export type PaceState = 'Start' | 'Flow' | 'Push' | 'Beat' | 'Recover'

export interface CampaignRecord {
  content_id: string
  platform: Exclude<Platform, 'Spotify'>
  format: Format
  content_pillar: Pillar
  campaign_stage: Stage
  creative_approach: CreativeApproach
  publish_date: string
  title: string
  reach: number
  impressions: number
  views: number
  likes: number
  comments: number
  shares: number
  saves: number
  watch_time_hours: number
  avg_view_duration_sec: number
  completion_rate: number
  link_clicks: number
  ctr: number
  three_sec_retention: number
  engagement_rate?: number
}

export interface Audience {
  id: string
  name: string
  tagline: string
  description: string
  motivations: string[]
  messaging: string
  creativeNote: string
}

export interface ContentPillar {
  id: Pillar
  name: string
  description: string
  examples: string[]
}

export interface CalendarItem {
  week: 1 | 2 | 3 | 4
  weekLabel: string
  day: string
  platform: Exclude<Platform, 'Spotify'>
  format: Format
  pillar: Pillar
  stage: Stage
  objective: string
  cta: string
  title: string
}

export interface CreativeAsset {
  id: string
  platform: Exclude<Platform, 'Spotify'>
  format: string
  title: string
  pillar: Pillar
  approach: CreativeApproach
  caption: string
  objective: string
  audience: string
  result: string
  insight: string
  nextAction: string
  accent: string
}

export interface ABTest {
  id: string
  name: string
  platform: Exclude<Platform, 'Spotify'>
  hypothesis: string
  versionA: {
    label: string
    description: string
    design: Record<string, string>
    metrics: Record<string, number | string>
  }
  versionB: {
    label: string
    description: string
    design: Record<string, string>
    metrics: Record<string, number | string>
  }
  chain: string
  conclusion: string
  creativeDecision: string
}

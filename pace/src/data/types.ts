export type Platform = 'Instagram' | 'TikTok' | 'YouTube'
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

export interface CampaignRecord {
  content_id: string
  platform: Platform
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

export interface JourneyStage {
  id: Stage
  name: string
  objective: string
  content: string
  platforms: string[]
  formats: string[]
  cta: string
  kpi: string
}

export interface CalendarItem {
  week: 1 | 2 | 3 | 4
  weekLabel: string
  day: string
  platform: Platform
  format: Format
  pillar: Pillar
  stage: Stage
  objective: string
  cta: string
  title: string
}

export interface CreativeAsset {
  id: string
  platform: Platform
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
  platform: Platform
  hypothesis: string
  versionA: {
    label: string
    description: string
    metrics: Record<string, number | string>
  }
  versionB: {
    label: string
    description: string
    metrics: Record<string, number | string>
  }
  conclusion: string
  creativeDecision: string
}

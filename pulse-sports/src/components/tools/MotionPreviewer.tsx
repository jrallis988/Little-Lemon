import { useMemo, useState } from 'react'
import { AthleteIntro } from '../motion/AthleteIntro'
import { LogoImpact, LogoPulse } from '../motion/LogoAnims'
import { LowerThirds } from '../motion/LowerThirds'
import { NetworkIntro } from '../motion/NetworkIntro'
import { ReplayTransitions } from '../motion/HighlightReplay'
import { ScoreGraphic } from '../motion/ScoreGraphic'
import { SocialEndCard, SocialPromo } from '../motion/SocialMotion'
import { StatsAnimations } from '../motion/StatsAnimations'

const TABS = [
  { id: 'logo', label: 'Logo' },
  { id: 'intro', label: 'Intro' },
  { id: 'athlete', label: 'Athlete' },
  { id: 'stats', label: 'Stats' },
  { id: 'score', label: 'Score' },
  { id: 'lower', label: 'Lower Third' },
  { id: 'replay', label: 'Replay' },
  { id: 'social', label: 'Social' },
  { id: 'end', label: 'End Card' },
] as const

type Tab = (typeof TABS)[number]['id']

export function MotionPreviewer() {
  const [tab, setTab] = useState<Tab>('intro')

  const view = useMemo(() => {
    switch (tab) {
      case 'logo':
        return <LogoPulse />
      case 'intro':
        return <NetworkIntro compact />
      case 'athlete':
        return <AthleteIntro />
      case 'stats':
        return <StatsAnimations />
      case 'score':
        return <ScoreGraphic />
      case 'lower':
        return <LowerThirds />
      case 'replay':
        return <ReplayTransitions />
      case 'social':
        return <SocialPromo ratio="16:9" />
      case 'end':
        return <SocialEndCard />
      default:
        return <LogoImpact />
    }
  }, [tab])

  return (
    <div className="tool-shell">
      <div className="tool-shell__bar chip-row" role="tablist" aria-label="Motion previewer">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            className={`chip${tab === t.id ? ' is-active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="preview-slot">{view}</div>
    </div>
  )
}

import { useMemo, useState } from 'react'
import { EndCard, SocialPromo } from '../motion/Social'
import { HeroFilm } from '../motion/HeroFilm'
import { PaidSting } from '../motion/PaidSting'
import { AthleteIntro, PerformanceStat, ProductReveal } from '../motion/AthleteProduct'
import { AthleteProductBridge, KineticType, TransitionWipe } from '../motion/BridgeType'

const TABS = [
  { id: 'film', label: 'Hero Film' },
  { id: 'paid', label: 'Paid :06' },
  { id: 'athlete', label: 'Athlete' },
  { id: 'perf', label: 'Performance' },
  { id: 'product', label: 'Product' },
  { id: 'bridge', label: 'Athlete × Product' },
  { id: 'type', label: 'Typography' },
  { id: 'social', label: 'Social' },
  { id: 'end', label: 'End Card' },
  { id: 'transition', label: 'Transition' },
] as const

type Tab = (typeof TABS)[number]['id']

export function MotionPreviewer() {
  const [tab, setTab] = useState<Tab>('bridge')

  const view = useMemo(() => {
    switch (tab) {
      case 'film':
        return <HeroFilm compact />
      case 'paid':
        return <PaidSting />
      case 'athlete':
        return <AthleteIntro />
      case 'perf':
        return <PerformanceStat />
      case 'product':
        return <ProductReveal />
      case 'bridge':
        return <AthleteProductBridge />
      case 'type':
        return <KineticType />
      case 'social':
        return <SocialPromo ratio="16:9" />
      case 'end':
        return <EndCard />
      case 'transition':
        return <TransitionWipe />
      default:
        return <HeroFilm compact />
    }
  }, [tab])

  return (
    <div className="tool-shell">
      <div className="tool-shell__bar chip-row" role="tablist" aria-label="Campaign motion previewer">
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
      {view}
    </div>
  )
}

import { CaseNav } from './components/layout/CaseNav'
import { Chapter } from './components/layout/Chapter'
import { Hero } from './components/sections/Hero'
import { CoreIdea } from './components/sections/CoreIdea'
import { Problem } from './components/sections/Problem'
import { WhySpotify } from './components/sections/WhySpotify'
import { Audience } from './components/sections/Audience'
import { PaceStates } from './components/sections/PaceStates'
import { PaceCard } from './components/sections/PaceCard'
import { BehavioralJourney } from './components/sections/BehavioralJourney'
import { PlatformRoles } from './components/sections/PlatformRoles'
import { ContentCalendar } from './components/sections/ContentCalendar'
import { VisualSystem } from './components/sections/VisualSystem'
import { CreativeWorld } from './components/sections/CreativeWorld'
import { Measurement } from './components/sections/Measurement'
import { PerformanceOverview } from './components/sections/PerformanceOverview'
import { CreativePerformance } from './components/sections/CreativePerformance'
import { ABTests } from './components/sections/ABTests'
import { FeedbackLoop } from './components/sections/FeedbackLoop'
import { PlatformComparison } from './components/sections/PlatformComparison'
import { PerformanceExplorer } from './components/sections/PerformanceExplorer'
import { Optimization } from './components/sections/Optimization'
import { WhatWeLearned } from './components/sections/WhatWeLearned'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#idea">
        Skip to main content
      </a>
      <CaseNav />
      <main>
        <Hero />

        <Chapter
          id="chapter-strategy"
          tone="light"
          kicker="Chapter 01 — Strategy"
          title="The idea, the problem, and why it belongs to Spotify."
        >
          <CoreIdea />
          <Problem />
          <WhySpotify />
          <Audience />
          <PaceStates />
          <BehavioralJourney />
          <PlatformRoles />
        </Chapter>

        <Chapter
          id="chapter-creative"
          tone="dark"
          kicker="Chapter 02 — Experience + Creative"
          title="PACE is a creative system—not just a campaign name."
        >
          <PaceCard />
          <VisualSystem />
          <ContentCalendar />
          <CreativeWorld />
        </Chapter>

        <Chapter
          id="chapter-performance"
          tone="light"
          kicker="Chapter 03 — Performance + Optimization"
          title="Create → test → learn → change → retest."
        >
          <Measurement />
          <PerformanceOverview />
          <CreativePerformance />
          <ABTests />
          <FeedbackLoop />
          <PlatformComparison />
          <PerformanceExplorer />
        </Chapter>

        <Chapter
          id="chapter-reflection"
          tone="finale"
          kicker="Chapter 04 — Results + Reflection"
          title="Yes—analytics can make the next creative decision better."
        >
          <Optimization />
          <WhatWeLearned />
        </Chapter>
      </main>
    </>
  )
}

import { CaseNav } from './components/layout/CaseNav'
import { Hero } from './components/sections/Hero'
import { Challenge } from './components/sections/Challenge'
import { Audience } from './components/sections/Audience'
import { Objectives } from './components/sections/Objectives'
import { Strategy } from './components/sections/Strategy'
import { CampaignJourney } from './components/sections/CampaignJourney'
import { ContentCalendar } from './components/sections/ContentCalendar'
import { CreativeExamples } from './components/sections/CreativeExamples'
import { Measurement } from './components/sections/Measurement'
import { CreativePerformance } from './components/sections/CreativePerformance'
import { PerformanceOverview } from './components/sections/PerformanceOverview'
import { ABTests } from './components/sections/ABTests'
import { Scorecards } from './components/sections/Scorecards'
import { PlatformComparison } from './components/sections/PlatformComparison'
import { Optimization } from './components/sections/Optimization'
import { PerformanceExplorer } from './components/sections/PerformanceExplorer'
import { WhatWeLearned } from './components/sections/WhatWeLearned'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#challenge">
        Skip to main content
      </a>
      <CaseNav />
      <main>
        <Hero />
        <Challenge />
        <Audience />
        <Objectives />
        <Strategy />
        <CampaignJourney />
        <ContentCalendar />
        <CreativeExamples />
        <Measurement />
        <PerformanceOverview />
        <CreativePerformance />
        <ABTests />
        <Scorecards />
        <PlatformComparison />
        <PerformanceExplorer />
        <Optimization />
        <WhatWeLearned />
      </main>
    </>
  )
}

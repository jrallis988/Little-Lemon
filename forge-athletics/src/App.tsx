import { CaseNav } from './components/Layout'
import {
  CampaignHero,
  ChallengeScreen,
  InsightScreen,
  StrategyScreen,
  BigIdeaScreen,
  AthleteScreen,
  LogoScreen,
  ColorScreen,
  TypeScreen,
  WorkCodeScreen,
  PhotoScreen,
  AdOne,
  AdTwo,
  AdThree,
  OohScreen,
  SocialScreen,
  DigitalScreen,
  PhysicalScreen,
  FinaleScreen,
} from './components/Campaign'
import './App.css'

/**
 * FORGE ATHLETICS — Campaign Case Study
 * Narrative: Problem → Insight → Strategy → Big Idea → Identity → Campaign → Execution
 */
export default function App() {
  return (
    <div className="forge-case">
      <CaseNav />

      <CampaignHero />
      <ChallengeScreen />
      <InsightScreen />
      <StrategyScreen />
      <BigIdeaScreen />
      <AthleteScreen />
      <LogoScreen />
      <ColorScreen />
      <TypeScreen />
      <WorkCodeScreen />
      <PhotoScreen />
      <AdOne />
      <AdTwo />
      <AdThree />
      <OohScreen />
      <SocialScreen />
      <DigitalScreen />
      <PhysicalScreen />
      <FinaleScreen />

      <footer className="case-footer">
        <a href="../../index.html">← Back to Artistic Fountain</a>
        <span>FORGE ATHLETICS · BUILT THROUGH WORK. · Campaign Case Study</span>
      </footer>
    </div>
  )
}

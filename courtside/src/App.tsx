import "./sections/Packages.css";
import { Hero } from "./sections/Hero";
import { SiteNav } from "./sections/SiteNav";
import { CaseFrame } from "./sections/CaseFrame";
import { BrandSystem } from "./sections/BrandSystem";
import { ChannelIdentity } from "./sections/ChannelIdentity";
import { ContentArchitecture } from "./sections/ContentArchitecture";
import { ThumbnailSystem } from "./sections/ThumbnailSystem";
import { CompareSection } from "./sections/CompareSection";
import { AthleteInterview } from "./sections/AthleteInterview";
import { AthleteProfile } from "./sections/AthleteProfile";
import { FilmRoom } from "./sections/FilmRoom";
import { TrainingLab } from "./sections/TrainingLab";
import { GearPackage } from "./sections/GearPackage";
import { GameDayPackage } from "./sections/GameDayPackage";
import { LowerThirdSystem } from "./sections/LowerThirdSystem";
import { StatisticsSystem } from "./sections/StatisticsSystem";
import { MotionIdentity } from "./sections/MotionIdentity";
import { EndScreens } from "./sections/EndScreens";
import { PlaylistSection } from "./sections/PlaylistSection";
import { ShortsConnection } from "./sections/ShortsConnection";
import { EcosystemSection } from "./sections/EcosystemSection";
import { ABTestSection } from "./sections/ABTestSection";
import { PerformanceSection } from "./sections/PerformanceSection";
import { Closing } from "./sections/Closing";

export default function App() {
  return (
    <div id="top">
      <SiteNav />
      <Hero />
      <main>
        <CaseFrame />
        <BrandSystem />
        <ChannelIdentity />
        <ContentArchitecture />
        <ThumbnailSystem />
        <CompareSection />
        <AthleteInterview />
        <AthleteProfile />
        <FilmRoom />
        <TrainingLab />
        <GearPackage />
        <GameDayPackage />
        <LowerThirdSystem />
        <StatisticsSystem />
        <MotionIdentity />
        <EndScreens />
        <PlaylistSection />
        <ShortsConnection />
        <EcosystemSection />
        <ABTestSection />
        <PerformanceSection />
        <Closing />
      </main>
    </div>
  );
}

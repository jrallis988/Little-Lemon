import "./sections/Packages.css";
import "./sections/ThumbnailSystem.css";
import "./sections/StatisticsSystem.css";
import { Hero } from "./sections/Hero";
import { SiteNav } from "./sections/SiteNav";
import { ChapterDivider } from "./components/ChapterDivider";
import { ProblemSection } from "./sections/ProblemSection";
import { IdeaSection } from "./sections/IdeaSection";
import { BrandSystem } from "./sections/BrandSystem";
import { ContentSystem } from "./sections/ContentSystem";
import { ThumbnailSystem, CompareSection } from "./sections/ThumbnailSystem";
import { PackageBoards } from "./sections/PackageBoards";
import { FilmRoom } from "./sections/FilmRoom";
import { GearPackage } from "./sections/GearPackage";
import { StatisticsSystem } from "./sections/StatisticsSystem";
import { MotionIdentity } from "./sections/MotionIdentity";
import { YouTubeContext } from "./sections/YouTubeContext";
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
        <ChapterDivider
          id="ch-problem"
          num="01"
          label="The Problem"
          lede="Sports channels ship many formats without one system that can carry all of them."
        />
        <ProblemSection />

        <ChapterDivider
          id="ch-idea"
          num="02"
          label="The Idea"
          lede="A creative philosophy — not just a tagline on a poster."
        />
        <IdeaSection />

        <ChapterDivider
          id="ch-identity"
          num="03"
          label="The Identity"
          lede="Modes, color rules, and photography range — systematic, not monotonous."
        />
        <BrandSystem />

        <ChapterDivider
          id="ch-content"
          num="04"
          label="The Content System"
          lede="Series identities, athlete range, and packaging that flexes by mode."
        />
        <ContentSystem />
        <PackageBoards />
        <FilmRoom />
        <GearPackage />

        <ChapterDivider
          id="ch-viewing"
          num="05"
          label="The Viewing Experience"
          lede="Thumbnails, real YouTube context, and size testing where audiences actually look."
        />
        <ThumbnailSystem />
        <CompareSection />
        <YouTubeContext />
        <MotionIdentity />

        <ChapterDivider
          id="ch-data"
          num="06"
          label="The Data System"
          lede="Numbers as signature design — lime for performance, scale over boxes."
        />
        <StatisticsSystem />

        <ChapterDivider
          id="ch-ecosystem"
          num="07"
          label="The Ecosystem"
          lede="One sports story becomes a coordinated production ladder."
        />
        <EcosystemSection />

        <ChapterDivider
          id="ch-testing"
          num="08"
          label="Testing & Results"
          lede="What was tested, what won, and how the next creative decision changes."
        />
        <ABTestSection />
        <PerformanceSection />

        <ChapterDivider
          id="ch-final"
          num="09"
          label="Final System"
          lede="Measurable outputs — then the brand line."
        />
        <Closing />
      </main>
    </div>
  );
}

import { SiteHeader } from "./components/SiteHeader";
import { Hero } from "./components/Hero";
import { CreativeStrategy } from "./components/CreativeStrategy";
import { BrandSystem } from "./components/BrandSystem";
import { KeyVisual } from "./components/KeyVisual";
import { AdvertisingApps } from "./components/AdvertisingApps";
import { SocialCampaign } from "./components/SocialCampaign";
import { FormatPreviewer } from "./components/FormatPreviewer";
import { MotionPrototypes } from "./components/MotionPrototypes";
import { AssetMatrix } from "./components/AssetMatrix";
import { ContentStrategy } from "./components/ContentStrategy";
import { Performance } from "./components/Performance";
import { CaseStudySummary } from "./components/CaseStudySummary";
import { SiteFooter } from "./components/SiteFooter";
import "./styles/campaign.css";

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <CreativeStrategy />
        <BrandSystem />
        <KeyVisual />
        <AdvertisingApps />
        <SocialCampaign />
        <FormatPreviewer />
        <MotionPrototypes />
        <AssetMatrix />
        <ContentStrategy />
        <Performance />
        <CaseStudySummary />
      </main>
      <SiteFooter />
    </>
  );
}

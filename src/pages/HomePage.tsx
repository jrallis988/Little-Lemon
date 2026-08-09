import { CampaignHero } from "../components/campaign/CampaignHero";
import { ChapterPurpose } from "../components/campaign/ChapterPurpose";
import { ChapterSince } from "../components/campaign/ChapterSince";
import { ChapterEvolution } from "../components/campaign/ChapterEvolution";
import { ChapterYearsOfYou } from "../components/campaign/ChapterYearsOfYou";
import { ChapterPresent } from "../components/campaign/ChapterPresent";
import { ChapterAhead } from "../components/campaign/ChapterAhead";
import { CampaignFinale } from "../components/campaign/CampaignFinale";
import { ConnectedSocial } from "../components/ConnectedSocial";
import { PageMeta } from "../components/PageMeta";
import { campaign } from "../data/campaign";

export function HomePage() {
  return (
    <main id="main-content">
      <PageMeta
        title="Weight Watchers 63 | 63 Years of You"
        description={campaign.thesis}
        path="/"
        image="/images/campaign/hero-cook.jpg"
      />
      <CampaignHero />
      <ChapterPurpose />
      <ChapterSince />
      <ChapterEvolution />
      <ChapterYearsOfYou />
      <ChapterPresent />
      <ChapterAhead />
      <ConnectedSocial />
      <CampaignFinale />
    </main>
  );
}

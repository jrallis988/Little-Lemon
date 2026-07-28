import { CampaignHero } from "../components/campaign/CampaignHero";
import { ChapterSince } from "../components/campaign/ChapterSince";
import { ChapterEvolution } from "../components/campaign/ChapterEvolution";
import { ChapterYearsOfYou } from "../components/campaign/ChapterYearsOfYou";
import { ChapterCommunity } from "../components/campaign/ChapterCommunity";
import { ChapterScience } from "../components/campaign/ChapterScience";
import { ChapterInnovation } from "../components/campaign/ChapterInnovation";
import { ChapterAhead } from "../components/campaign/ChapterAhead";
import { CampaignFinale } from "../components/campaign/CampaignFinale";
import { ConnectedSocial } from "../components/ConnectedSocial";
import { PageMeta } from "../components/PageMeta";

export function HomePage() {
  return (
    <main id="main-content">
      <PageMeta
        title="Weight Watchers 63 | 63 Years of You"
        description="For 63 years, Weight Watchers has evolved alongside the people it serves. Explore Weight Watchers 63 — 63 Years of You."
        path="/"
        image="/images/campaign/hero-cook.jpg"
      />
      <CampaignHero />
      <ChapterSince />
      <ChapterEvolution />
      <ChapterYearsOfYou />
      <ChapterCommunity />
      <ChapterScience />
      <ChapterInnovation />
      <ChapterAhead />
      <ConnectedSocial />
      <CampaignFinale />
    </main>
  );
}

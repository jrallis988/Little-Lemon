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

export function HomePage() {
  return (
    <main>
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

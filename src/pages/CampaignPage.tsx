import { CampaignCta } from "../components/ww63/CampaignCta";
import { CampaignHero } from "../components/ww63/CampaignHero";
import { ArchiveVault } from "../components/ww63/ArchiveVault";
import { PhilosophyMatrix } from "../components/ww63/PhilosophyMatrix";
import { TimelineScroller } from "../components/ww63/TimelineScroller";
import { ConnectedSocial } from "../components/ConnectedSocial";

export function CampaignPage() {
  return (
    <main>
      <CampaignHero />
      <TimelineScroller />
      <ArchiveVault />
      <PhilosophyMatrix />
      <ConnectedSocial />
      <CampaignCta />
    </main>
  );
}

import { CampaignTeaser } from "../components/CampaignTeaser";
import { Community } from "../components/Community";
import { ConnectedSocial } from "../components/ConnectedSocial";
import { Hero } from "../components/Hero";
import { Join } from "../components/Join";
import { Modes } from "../components/Modes";
import { Pathways } from "../components/Pathways";
import { Tools } from "../components/Tools";

export function HomePage() {
  return (
    <main>
      <Hero />
      <CampaignTeaser />
      <Pathways />
      <Modes />
      <Tools />
      <Community />
      <ConnectedSocial />
      <Join />
    </main>
  );
}

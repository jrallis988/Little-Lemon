import { Hero } from "@/components/Hero";
import { MeetCandidate } from "@/components/MeetCandidate";
import { WhyRunning } from "@/components/WhyRunning";
import { Issues } from "@/components/Issues";
import { TakeActionBand } from "@/components/TakeActionBand";
import { Events } from "@/components/Events";
import { Press } from "@/components/Press";
import { ActionCenter } from "@/components/ActionCenter";
import { Donate } from "@/components/Donate";

export default function HomePage() {
  return (
    <>
      <Hero />
      <MeetCandidate />
      <WhyRunning />
      <Issues />
      <TakeActionBand />
      <Events />
      <Press />
      <ActionCenter />
      <Donate />
    </>
  );
}

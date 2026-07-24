import { Hero } from "@/components/Hero";
import { Issues } from "@/components/Issues";
import { Events } from "@/components/Events";
import { MeetCandidate } from "@/components/MeetCandidate";
import { ActionCenter } from "@/components/ActionCenter";
import { Donate } from "@/components/Donate";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Issues />
      <Events />
      <MeetCandidate />
      <ActionCenter />
      <Donate />
    </>
  );
}

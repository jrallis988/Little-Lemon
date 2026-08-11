import { Hero } from "@/components/home/Hero";
import { AboutPreview } from "@/components/home/AboutPreview";
import { ElectionCountdown } from "@/components/home/ElectionCountdown";
import { IssuesPreview } from "@/components/home/IssuesPreview";
import { HowToVoteBand } from "@/components/home/HowToVoteBand";
import { TownEvents } from "@/components/home/TownEvents";
import { JoinForm } from "@/components/home/JoinForm";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <ElectionCountdown />
      <IssuesPreview />
      <HowToVoteBand />
      <TownEvents />
      <JoinForm />
    </>
  );
}

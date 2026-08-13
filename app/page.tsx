import { Hero } from "@/components/home/Hero";
import { AboutPreview } from "@/components/home/AboutPreview";
import { VioletPartyPreview } from "@/components/home/VioletPartyPreview";
import { ElectionCountdown } from "@/components/home/ElectionCountdown";
import { IssuesPreview } from "@/components/home/IssuesPreview";
import { HowToVoteBand } from "@/components/home/HowToVoteBand";
import { StorePreview } from "@/components/home/StorePreview";
import { VolunteerPreview } from "@/components/home/VolunteerPreview";
import { JoinForm } from "@/components/home/JoinForm";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <VioletPartyPreview />
      <ElectionCountdown />
      <IssuesPreview />
      <HowToVoteBand />
      <StorePreview />
      <VolunteerPreview />
      <JoinForm />
    </>
  );
}

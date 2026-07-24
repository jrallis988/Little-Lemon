import { Hero } from "@/components/home/Hero";
import { ElectionCountdown } from "@/components/home/ElectionCountdown";
import { AboutPreview } from "@/components/home/AboutPreview";
import { PlatformPreview } from "@/components/home/PlatformPreview";
import { WhyRunning } from "@/components/home/WhyRunning";
import { IssuesPreview } from "@/components/home/IssuesPreview";
import { TownEvents } from "@/components/home/TownEvents";
import { Testimonials } from "@/components/home/Testimonials";
import { JoinForm } from "@/components/home/JoinForm";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ElectionCountdown />
      <AboutPreview />
      <PlatformPreview />
      <WhyRunning />
      <IssuesPreview />
      <TownEvents />
      <Testimonials />
      <JoinForm />
    </>
  );
}

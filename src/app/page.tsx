import { EmergencyStrip } from "@/components/home/EmergencyStrip";
import { HomeHero } from "@/components/home/HomeHero";
import { Pathfinder } from "@/components/home/Pathfinder";
import { ProgramsSection } from "@/components/home/ProgramsSection";
import { QuickLinks } from "@/components/home/QuickLinks";
import { Specialties } from "@/components/home/Specialties";
import { TrustStrip } from "@/components/home/TrustStrip";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <QuickLinks />
      <TrustStrip />
      <Pathfinder />
      <Specialties />
      <ProgramsSection />
      <EmergencyStrip />
    </>
  );
}

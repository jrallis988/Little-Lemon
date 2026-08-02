import { HomeHero } from "@/components/home/HomeHero";
import { QuickLinks } from "@/components/home/QuickLinks";
import { TrustStrip } from "@/components/home/TrustStrip";
import { AboutMission } from "@/components/home/AboutMission";
import { Pathfinder } from "@/components/home/Pathfinder";
import { Specialties } from "@/components/home/Specialties";
import { ProgramsSection } from "@/components/home/ProgramsSection";
import { TeachingHospital } from "@/components/home/TeachingHospital";
import { EmergencyStrip } from "@/components/home/EmergencyStrip";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <QuickLinks />
      <TrustStrip />
      <AboutMission />
      <Pathfinder />
      <Specialties />
      <ProgramsSection />
      <TeachingHospital />
      <EmergencyStrip />
    </>
  );
}

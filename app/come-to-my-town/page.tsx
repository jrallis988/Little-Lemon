import type { Metadata } from "next";
import { PageHero } from "@/components/PageChrome";
import { TownRequestForm } from "@/components/TownRequestForm";
import { candidate } from "@/lib/candidate";

export const metadata: Metadata = {
  title: "Come to My Town",
  description:
    "Request a visit from Nick Varga — committed to all 234 New Hampshire towns and cities before Election Day.",
};

export default function ComeToMyTownPage() {
  return (
    <>
      <PageHero
        overline="On the road"
        title="Come to My Town"
        subtitle={`Nick has committed to visiting every one of New Hampshire’s ${candidate.townsCommitment} towns and cities before Election Day. Tell us where you are.`}
      />
      <div className="mx-auto max-w-2xl section-pad">
        <TownRequestForm />
      </div>
    </>
  );
}

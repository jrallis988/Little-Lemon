import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { PortalSandbox } from "@/components/portal/PortalSandbox";

export const metadata: Metadata = {
  title: "MyChildren's",
  description:
    "Sign in to MyChildren's for results, messages, visits, and refill requests — Boston Children's own care account (not MyChart).",
};

export default function PortalPage() {
  return (
    <>
      <PageHero
        id="portal-heading"
        eyebrow="Patients & families"
        title="MyChildren's"
        lead="Boston Children's own place for results, secure messages, visits, and refill requests. This is not MyChart — MyChildren's is specific to care at Boston Children's."
      />
      <PortalSandbox />
    </>
  );
}

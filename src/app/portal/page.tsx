import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { PortalSandbox } from "@/components/portal/PortalSandbox";

export const metadata: Metadata = {
  title: "MyChildren's",
  description:
    "Conceptual MyChildren's portal prototype — results, messages, visits, and refill requests. Portfolio demo only.",
};

export default function PortalPage() {
  return (
    <>
      <PageHero
        id="portal-heading"
        eyebrow="Patients & families"
        title="MyChildren's"
        lead="Conceptual prototype of the hospital's branded patient portal (live MyChildren's is Epic MyChart). Demo only — no real login, records, or bill pay."
      />
      <PortalSandbox />
    </>
  );
}

import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { PortalSandbox } from "@/components/portal/PortalSandbox";

export const metadata: Metadata = {
  title: "MyChildren's Portal",
  description:
    "Sandbox patient portal inspired by MyChildren's — results, messages, visits, and refills.",
};

export default function PortalPage() {
  return (
    <>
      <PageHero
        id="portal-heading"
        eyebrow="Patients & families"
        title="MyChildren's Portal"
        lead="A functional sandbox that mirrors common portal tasks: test results, secure messaging, visit management, and refill requests."
      />
      <PortalSandbox />
    </>
  );
}

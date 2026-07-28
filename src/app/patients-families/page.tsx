import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Patients & Families",
  description:
    "Prepare for your visit, billing guidance, medical records, and family support resources.",
};

const guides = [
  {
    title: "Prepare for your visit",
    body: "What to bring, arrival tips, and how to help your child feel ready.",
  },
  {
    title: "Parking & directions",
    body: "Campus maps and parking options for Longwood and satellite locations.",
  },
  {
    title: "Billing & insurance",
    body: "How billing works, financial assistance contacts, and insurance FAQs.",
  },
  {
    title: "Medical records",
    body: "Request records and understand how information is shared with your care team.",
  },
  {
    title: "Interpreter services",
    body: "Language access is available 24 hours — tell triage or clinic staff what you need.",
  },
  {
    title: "Family support",
    body: "Child life, social work, and support services during complex care.",
  },
];

export default function PatientsFamiliesPage() {
  return (
    <>
      <PageHero
        id="pf-heading"
        eyebrow="Patients & families"
        title="Resources for your visit"
        lead="Operational guides that sit beside clinical discovery — preparation, billing, records, and support."
        actions={
          <>
            <Button href="/portal" variant="ocean">
              MyChildren&apos;s Portal
            </Button>
            <Button href="/appointments/request" variant="ghost-white">
              Request an Appointment
            </Button>
          </>
        }
      />
      <div className="wrap py-s7 pb-s10">
        <div className="mb-s7 grid grid-cols-1 gap-s4 md:grid-cols-2 lg:grid-cols-3">
          {guides.map((g) => (
            <article
              key={g.title}
              className="rounded-md border border-border bg-white p-s5"
            >
              <h2 className="mb-s2 text-lg font-bold text-ocean">{g.title}</h2>
              <p className="text-sm font-light text-text-body">{g.body}</p>
            </article>
          ))}
        </div>
        <p className="text-sm font-light text-text-meta">
          Looking for care now?{" "}
          <Link href="/locations" className="font-bold text-ocean">
            Browse locations
          </Link>{" "}
          or{" "}
          <Link href="/emergency" className="font-bold text-ocean">
            Emergency Department information
          </Link>
          .
        </p>
      </div>
    </>
  );
}

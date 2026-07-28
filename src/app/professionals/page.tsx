import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Healthcare Professionals",
  description:
    "Refer a patient, access the Physician Access Line, and explore clinical programs.",
};

export default function ProfessionalsPage() {
  return (
    <>
      <PageHero
        id="pro-heading"
        eyebrow="For clinicians"
        title="Healthcare Professionals"
        lead="Tools for referring providers — patient referral pathways, transfer support, and clinical program access."
        actions={
          <>
            <Button href="/emergency" variant="ocean">
              Physician Access Line
            </Button>
            <Button href="/professionals/refer" variant="ghost-white">
              Refer a patient
            </Button>
          </>
        }
      />
      <div className="wrap grid grid-cols-1 gap-s5 py-s7 pb-s10 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Refer a patient",
            body: "Send clinical and practice details through the dedicated referral pathway.",
            href: "/professionals/refer",
          },
          {
            title: "Request a second opinion",
            body: "Ask a pediatric specialist to review a diagnosis or treatment plan.",
            href: "/professionals/second-opinion",
          },
          {
            title: "Find a specialist",
            body: "Browse the provider directory by specialty, language, and location.",
            href: "/find-a-doctor",
          },
          {
            title: "Clinical programs",
            body: "Explore program landings with related trials, locations, and care teams.",
            href: "/programs",
          },
        ].map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="block rounded-md border border-border bg-white p-s5 no-underline transition-all hover:shadow-md"
          >
            <h2 className="mb-s2 text-lg font-bold text-ocean">{card.title}</h2>
            <p className="text-sm font-light text-text-body">{card.body}</p>
          </Link>
        ))}
      </div>
    </>
  );
}

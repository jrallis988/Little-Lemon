import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "International Patients",
  description:
    "Support for families traveling to Boston Children's Hospital for specialty pediatric care.",
};

const pathways = [
  {
    title: "Request an appointment",
    body: "Share your child's clinical needs and preferred timing. Our team helps coordinate next steps.",
    href: "/appointments/request",
  },
  {
    title: "Get a second opinion",
    body: "Ask a Boston Children's specialist to review a diagnosis or treatment plan.",
    href: "/professionals/second-opinion",
  },
  {
    title: "Find a doctor",
    body: "Search specialists by name, specialty, language, and location.",
    href: "/find-a-doctor",
  },
  {
    title: "Plan your visit",
    body: "Directions, campus guidance, and preparation tips for families traveling for care.",
    href: "/patients-families/prepare-for-your-visit",
  },
];

export default function InternationalPage() {
  return (
    <>
      <PageHero
        id="international-heading"
        eyebrow="International patients"
        title="Care for families from around the world"
        lead="Boston Children's welcomes international families seeking answers, second opinions, and specialty pediatric care."
        actions={
          <>
            <Button href="/appointments/request" variant="ocean">
              Request an Appointment
            </Button>
            <Button href="/emergency" variant="ghost-white">
              Emergency guidance
            </Button>
          </>
        }
      />
      <div className="wrap py-s7 pb-s10">
        <div className="mb-s7 grid grid-cols-1 gap-s4 md:grid-cols-2">
          {pathways.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="block rounded-md border border-border bg-white p-s5 no-underline transition-all hover:border-ocean hover:shadow-sm"
            >
              <h2 className="mb-s2 text-lg font-bold text-ocean">{item.title}</h2>
              <p className="text-sm font-light text-text-body">{item.body}</p>
            </Link>
          ))}
        </div>
        <p className="text-sm font-light text-text-meta">
          Prefer resources in Spanish?{" "}
          <Link href="/es" className="font-bold text-ocean">
            Ver recursos en español
          </Link>
        </p>
      </div>
    </>
  );
}

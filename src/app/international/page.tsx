import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "International Patients",
  description:
    "Global pediatric services and destination medicine support for families traveling to Boston Children's Hospital.",
};

const pathways = [
  {
    title: "Destination medicine",
    body: "Coordinate specialty pediatric care in Boston — travel planning, clinical intake, and visit logistics for families abroad.",
    href: "/appointments/request",
  },
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
  {
    title: "Language resources",
    body: "Explore Spanish and Mandarin resource hubs while care coordination continues in English.",
    href: "/es",
  },
];

export default function InternationalPage() {
  return (
    <>
      <PageHero
        id="international-heading"
        eyebrow="International patients"
        title="Global pediatric care, coordinated for your family"
        lead="Boston Children's welcomes international families seeking answers through destination medicine, second opinions, and specialty pediatric programs."
        actions={
          <>
            <Button href="/appointments/request" variant="ocean">
              Request an Appointment
            </Button>
            <Button href="/professionals/second-opinion" variant="ghost-white">
              Second opinion
            </Button>
          </>
        }
      />
      <div className="wrap py-s7 pb-s10">
        <div className="mb-s7 grid grid-cols-1 gap-s4 md:grid-cols-2 lg:grid-cols-3">
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
          Language hubs:{" "}
          <Link href="/es" className="font-bold text-ocean">
            Español
          </Link>
          {" · "}
          <Link href="/zh" className="font-bold text-ocean">
            中文
          </Link>
        </p>
      </div>
    </>
  );
}

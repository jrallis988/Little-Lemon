import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

export const metadata: Metadata = {
  title: "International Patients",
  description:
    "Global pediatric services, destination medicine, site language resources, and medical interpreter support for families traveling to Boston Children's Hospital.",
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
    title: "About Boston Children's",
    body: "Learn about our mission, teaching hospital model, and international support under About.",
    href: "/about#international",
  },
];

export default function InternationalPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "International patients" },
        ]}
      />
      <PageHero
        id="international-heading"
        eyebrow="About · International"
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
        <section
          className="mb-s8 grid grid-cols-1 gap-s4 md:grid-cols-2"
          aria-labelledby="language-strategy-heading"
        >
          <article className="rounded-md border border-border bg-white p-s5">
            <h2
              id="language-strategy-heading"
              className="mb-s2 text-lg font-bold text-ocean"
            >
              Translation for general reading
            </h2>
            <p className="mb-s4 text-sm font-light leading-relaxed text-text-body">
              Use our Español and 中文 hubs—or your browser&apos;s translation
              tools—for everyday website text: programs, locations, and visit
              tips. These options help families browse in a preferred language
              without replacing clinical conversation.
            </p>
            <div className="flex flex-wrap gap-s2">
              <Button href="/es" variant="outline" size="sm">
                Español
              </Button>
              <Button href="/zh" variant="outline" size="sm">
                中文
              </Button>
            </div>
          </article>
          <article className="rounded-md border border-border bg-surface p-s5">
            <h2 className="mb-s2 text-lg font-bold text-ocean">
              Interpreters for live clinical care
            </h2>
            <p className="mb-s4 text-sm font-light leading-relaxed text-text-body">
              Medical interpreters support real-time appointments, care
              planning, and clinical coordination. Request interpreter services
              when scheduling so families and care teams can communicate clearly
              during visits.
            </p>
            <Button href="/appointments/request" variant="ocean" size="sm">
              Request care with interpreter support
            </Button>
          </article>
        </section>

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
          Also listed under{" "}
          <Link href="/about#international" className="font-bold text-ocean">
            About → International
          </Link>
          .
        </p>
      </div>
    </>
  );
}

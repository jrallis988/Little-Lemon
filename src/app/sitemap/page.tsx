import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Site Map",
  description: "Browse major sections of the website.",
};

const sections = [
  {
    title: "Care",
    links: [
      { href: "/find-a-doctor", label: "Find a Doctor" },
      { href: "/conditions", label: "Conditions A–Z" },
      { href: "/programs", label: "Programs & Services" },
      { href: "/locations", label: "Locations" },
      { href: "/appointments/request", label: "Request an Appointment" },
      { href: "/emergency", label: "Emergency Department" },
    ],
  },
  {
    title: "Patients & Families",
    links: [
      { href: "/patients-families", label: "Hub" },
      { href: "/patients-families/prepare-for-your-visit", label: "Prepare for Your Visit" },
      { href: "/patients-families/billing", label: "Billing & Insurance" },
      { href: "/patients-families/medical-records", label: "Medical Records" },
      { href: "/portal", label: "Portal preview" },
    ],
  },
  {
    title: "Professionals & Research",
    links: [
      { href: "/professionals", label: "Professionals" },
      { href: "/professionals/refer", label: "Refer a Patient" },
      { href: "/professionals/second-opinion", label: "Second Opinion" },
      { href: "/research", label: "Research" },
    ],
  },
  {
    title: "About & Legal",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/about/leadership", label: "Leadership" },
      { href: "/about/history", label: "History" },
      { href: "/about/community", label: "Community Health" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Use" },
      { href: "/accessibility", label: "Accessibility" },
      { href: "/non-discrimination", label: "Non-Discrimination" },
      { href: "/media-policy", label: "Media Policy" },
    ],
  },
];

export default function SitemapPage() {
  return (
    <>
      <PageHero
        id="sitemap"
        eyebrow="Navigate"
        title="Site map"
        lead="Quick links to major sections of the care platform."
      />
      <div className="wrap grid grid-cols-1 gap-s7 py-s7 pb-s10 md:grid-cols-2 lg:grid-cols-4">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="mb-s3 text-lg font-bold text-ocean">{section.title}</h2>
            <ul className="flex flex-col gap-2">
              {section.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-semibold text-blue no-underline hover:text-ocean"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}

import Link from "next/link";
import { LogoSeal } from "@/components/ui/Icons";

const columns = [
  {
    title: "Care",
    links: [
      { label: "Find a Doctor", href: "/find-a-doctor" },
      { label: "Conditions A–Z", href: "/conditions" },
      { label: "Programs & Services", href: "/programs" },
      { label: "Request an Appointment", href: "/appointments/request" },
      { label: "Emergency Department", href: "/emergency" },
      { label: "Locations", href: "/locations" },
    ],
  },
  {
    title: "Patients & Families",
    links: [
      { label: "Patients & Families hub", href: "/patients-families" },
      { label: "Portal preview", href: "/portal" },
      { label: "Prepare for Your Visit", href: "/patients-families/prepare-for-your-visit" },
      { label: "Billing & Insurance", href: "/patients-families/billing" },
      { label: "Medical Records", href: "/patients-families/medical-records" },
    ],
  },
  {
    title: "Research",
    links: [
      { label: "Research hub", href: "/research" },
      { label: "Clinical Trials", href: "/research" },
      { label: "Professionals", href: "/professionals" },
      { label: "Refer a Patient", href: "/professionals/refer" },
      { label: "Second Opinions", href: "/professionals/second-opinion" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Leadership", href: "/about/leadership" },
      { label: "Our History", href: "/about/history" },
      { label: "Community Health", href: "/about/community" },
      { label: "Design System", href: "/design-system" },
      { label: "Site Map", href: "/sitemap" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-footer text-white/80" role="contentinfo">
      <div className="wrap py-s9 pb-s7">
        <div className="grid grid-cols-1 gap-s7 md:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1fr_1fr_1fr]">
          <div>
            <Link
              href="/"
              className="mb-s4 flex items-center gap-3 no-underline"
              aria-label="Boston Children's Hospital — home"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-[1.5px] border-white/40 bg-white/[0.08]">
                <LogoSeal />
              </span>
              <span className="flex flex-col">
                <span className="text-[14px] font-bold leading-tight text-white">
                  Boston Children&apos;s Hospital
                </span>
                <span className="mt-px text-[10px] font-bold text-[#f2a8d0]">
                  Where the world comes for answers
                </span>
              </span>
            </Link>
            <p className="mb-s3 text-sm font-light leading-[1.7] text-white/75">
              300 Longwood Avenue
              <br />
              Boston, Massachusetts 02115
              <br />
              (617) 355-6000
            </p>
            <div
              className="mb-s4 flex max-w-[260px] items-center gap-s2 self-start rounded-sm border border-white/25 bg-white/[0.06] px-s4 py-s3"
              aria-label="Harvard Medical School affiliation"
            >
              <p className="m-0 text-[11px] font-light leading-[1.55] text-white/75">
                A teaching hospital of
                <br />
                Harvard Medical School
              </p>
            </div>
            <div className="flex flex-col gap-s1">
              <span className="text-[11px] font-light text-white/70">
                Magnet® Recognized for Nursing Excellence
              </span>
              <span className="text-[11px] font-light text-white/70">
                Joint Commission Accredited
              </span>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h5 className="mb-s3 text-[10px] font-extrabold uppercase tracking-[0.1em] text-white/70">
                {col.title}
              </h5>
              <ul className="flex flex-col gap-1.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm font-light text-white/80 no-underline transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="wrap flex flex-wrap items-center justify-between gap-s4 border-t border-white/20 py-s5">
        <span className="text-[11px] font-light text-white/70">
          © {new Date().getFullYear()} Boston Children&apos;s Hospital redesign
          platform. All rights reserved.
        </span>
        <div className="flex flex-wrap gap-s5" role="list">
          {[
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Terms of Use", href: "/terms" },
            { label: "Accessibility", href: "/accessibility" },
            { label: "Non-Discrimination Notice", href: "/non-discrimination" },
            { label: "Media Policy", href: "/media-policy" },
            { label: "Site Map", href: "/sitemap" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              role="listitem"
              className="text-[11px] text-white/75 no-underline hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

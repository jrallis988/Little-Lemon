import Link from "next/link";
import { LogoSeal } from "@/components/ui/Icons";

const columns = [
  {
    title: "Care",
    links: [
      { label: "Find a Doctor", href: "/find-a-doctor" },
      { label: "Conditions A–Z", href: "/conditions/epilepsy-in-children" },
      { label: "Specialties", href: "/programs/epilepsy-program" },
      { label: "Book an Appointment", href: "/find-a-doctor" },
      { label: "Emergency Department", href: "/emergency" },
      { label: "Telehealth", href: "#" },
      { label: "Second Opinion", href: "#" },
    ],
  },
  {
    title: "Patients & Families",
    links: [
      { label: "Patient Portal", href: "#" },
      { label: "Prepare for Your Visit", href: "#" },
      { label: "Billing & Insurance", href: "#" },
      { label: "Medical Records", href: "#" },
      { label: "Family Support Services", href: "#" },
      { label: "Health Library", href: "/search?q=health" },
      { label: "Interpreter Services", href: "#" },
    ],
  },
  {
    title: "Research",
    links: [
      { label: "Research Labs", href: "#" },
      { label: "Clinical Trials", href: "#" },
      { label: "Publications", href: "#" },
      { label: "Research News", href: "#" },
      { label: "Participate in Research", href: "#" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Mission & Values", href: "/about" },
      { label: "Leadership", href: "#" },
      { label: "Newsroom", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Give to Boston Children's", href: "#" },
      { label: "Contact Us", href: "#" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-footer text-white/40" role="contentinfo">
      <div className="wrap py-s9 pb-s7">
        <div className="grid grid-cols-1 gap-s7 md:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1fr_1fr_1fr]">
          <div>
            <Link
              href="/"
              className="mb-s4 flex items-center gap-3 no-underline"
              aria-label="Boston Children's Hospital — home"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-[1.5px] border-white/20 bg-white/[0.06]">
                <LogoSeal />
              </span>
              <span className="flex flex-col">
                <span className="text-[14px] font-bold leading-tight text-white/60">
                  Boston Children&apos;s Hospital
                </span>
                <span className="mt-px text-[9px] font-bold text-pink">
                  Where the world comes for answers
                </span>
              </span>
            </Link>
            <p className="mb-s3 text-sm font-light leading-[1.7] text-white/30">
              300 Longwood Avenue
              <br />
              Boston, Massachusetts 02115
              <br />
              (617) 355-6000
            </p>
            <div
              className="mb-s4 flex max-w-[260px] items-center gap-s2 self-start rounded-sm border border-white/[0.07] bg-white/[0.04] px-s4 py-s3"
              aria-label="Harvard Medical School affiliation"
            >
              <p className="m-0 text-[11px] font-light leading-[1.55] text-white/30">
                A teaching hospital of
                <br />
                Harvard Medical School
              </p>
            </div>
            <div className="flex flex-col gap-s1">
              <span className="text-[11px] font-light text-white/20">
                Magnet® Recognized for Nursing Excellence
              </span>
              <span className="text-[11px] font-light text-white/20">
                Joint Commission Accredited
              </span>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h5 className="mb-s3 text-[10px] font-extrabold uppercase tracking-[0.1em] text-white/20">
                {col.title}
              </h5>
              <ul className="flex flex-col gap-1.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm font-light text-white/30 no-underline transition-colors hover:text-white/75"
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

      <div className="wrap flex flex-wrap items-center justify-between gap-s4 border-t border-white/[0.07] py-s5">
        <span className="text-[11px] font-light text-white/18">
          © 2025 Boston Children&apos;s Hospital. All rights reserved.
        </span>
        <div className="flex flex-wrap gap-s5" role="list">
          {[
            "Privacy Policy",
            "Terms of Use",
            "Accessibility",
            "Non-Discrimination Notice",
            "Site Map",
          ].map((item) => (
            <Link
              key={item}
              href="#"
              role="listitem"
              className="text-[11px] text-white/20 no-underline hover:text-white/60"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

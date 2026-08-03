import Link from "next/link";
import {
  NewsweekBestBadge,
  UsNewsHonorRollBadge,
} from "@/components/brand/AwardBadges";

const getCare = [
  { label: "Make an Appointment", href: "/appointments/request" },
  { label: "MyChildren's Patient Portal", href: "/portal" },
  { label: "Find a Doctor", href: "/find-a-doctor" },
  { label: "Locations", href: "/locations" },
];

const aboutSupport = [
  { label: "About Boston Children's", href: "/about" },
  { label: "Career Opportunities", href: "/about" },
  { label: "Newsroom", href: "/about" },
  { label: "Donate", href: "/#giving" },
  { label: "Ways to Help", href: "/#giving" },
  { label: "Contact Us", href: "/emergency" },
];

const rightsPolicies = [
  { label: "Government Relations", href: "/about/community" },
  { label: "HIPAA Notice of Privacy Rights", href: "/privacy" },
  { label: "Patient & Family Rights", href: "/patients-families" },
  { label: "Price Transparency", href: "/patients-families/billing" },
  { label: "Quality & Patient Safety", href: "/about" },
  { label: "Compliance", href: "/terms" },
];

function FooterLinkColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="mb-1 text-xs font-bold text-white">{title}</h3>
      <ul className="flex flex-col gap-0.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-[11px] font-light leading-snug text-white no-underline hover:underline"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer role="contentinfo">
      <div className="bg-blue">
        <div className="wrap grid grid-cols-1 gap-s3 py-s3 text-white sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          <div className="flex items-center gap-s2 lg:border-r lg:border-white/25 lg:pr-s4">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M3 21V9l6-5h6l6 5v12" />
              <path d="M9 21v-8h6v8" />
              <path d="M16 8c0-2.5 1.5-4 3-4s3 1.5 3 4-3 6-3 6-3-3.5-3-6z" />
            </svg>
            <p className="m-0 text-xs font-light leading-snug">
              300 Longwood Ave
              <br />
              Boston, MA 02115
            </p>
          </div>
          <div className="flex items-center gap-s2 lg:border-r lg:border-white/25 lg:px-s4">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <circle cx="9" cy="12" r="2.5" />
              <path d="M14 10h4M14 14h3" />
            </svg>
            <Link
              href="/portal"
              className="text-xs font-bold text-white no-underline hover:underline"
            >
              MyChildren&apos;s Patient Portal
            </Link>
          </div>
          <div className="flex items-center gap-s2 lg:border-r lg:border-white/25 lg:px-s4">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <rect x="7" y="2" width="10" height="20" rx="2" />
              <circle cx="12" cy="18" r="1" fill="currentColor" stroke="none" />
            </svg>
            <a
              href="tel:16173556000"
              className="text-xs font-bold text-white no-underline hover:underline"
            >
              617.355.6000
            </a>
          </div>
          <div className="flex flex-col justify-center gap-1.5 lg:pl-s4">
            <p className="m-0 text-xs font-bold">Follow Us</p>
            <div
              className="flex flex-wrap gap-2 text-white/90"
              aria-label="Social media"
            >
              {["Facebook", "Instagram", "LinkedIn", "Pinterest", "YouTube"].map(
                (name) => (
                  <span
                    key={name}
                    className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/40 text-[9px] font-bold"
                    title={name}
                  >
                    {name.slice(0, 1)}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-ocean">
        <div className="wrap grid grid-cols-2 gap-x-s3 gap-y-s2 py-s3 sm:grid-cols-3 lg:grid-cols-[auto_1fr_1fr_1fr] lg:items-start lg:gap-s4">
          <div className="col-span-2 flex flex-wrap items-end gap-1.5 sm:col-span-1">
            <UsNewsHonorRollBadge className="h-[36px]" />
            <NewsweekBestBadge className="h-[36px]" />
          </div>
          <FooterLinkColumn title="Get Care" links={getCare} />
          <FooterLinkColumn title="About & Support" links={aboutSupport} />
          <FooterLinkColumn
            title="Patient Rights & Policies"
            links={rightsPolicies}
          />
        </div>

        <div className="wrap border-t border-white/25 py-2">
          <div className="flex flex-wrap items-center gap-x-s3 gap-y-1 text-[10px] text-white">
            <p className="m-0 font-light">
              © 2005 - {new Date().getFullYear()} Boston Children&apos;s
              Hospital. All rights reserved.
            </p>
            <span className="hidden text-white/50 sm:inline" aria-hidden="true">
              |
            </span>
            <span className="font-bold text-white">Also of Interest</span>
            {[
              { label: "Find a Doctor", href: "/find-a-doctor" },
              { label: "Video Library", href: "/programs" },
              {
                label: "Online Second Opinions",
                href: "/professionals/second-opinion",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white no-underline hover:underline"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="mt-1 flex flex-wrap gap-x-s3 gap-y-0.5 text-[10px] text-white">
            {[
              { label: "Privacy", href: "/privacy" },
              { label: "Terms", href: "/terms" },
              { label: "Accessibility", href: "/accessibility" },
              { label: "Non-Discrimination", href: "/non-discrimination" },
              { label: "Site Map", href: "/sitemap" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white no-underline hover:underline"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

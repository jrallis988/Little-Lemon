import Link from "next/link";

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
      <h3 className="mb-s4 text-base font-bold text-white">{title}</h3>
      <ul className="flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm font-light text-white/90 no-underline hover:text-white hover:underline"
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
        <div className="wrap grid grid-cols-1 gap-s5 py-s6 text-white sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          <div className="flex items-center gap-s3 lg:border-r lg:border-white/25 lg:pr-s5">
            <svg viewBox="0 0 24 24" className="h-8 w-8 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M3 21V9l6-5h6l6 5v12" />
              <path d="M9 21v-8h6v8" />
              <path d="M16 8c0-2.5 1.5-4 3-4s3 1.5 3 4-3 6-3 6-3-3.5-3-6z" />
            </svg>
            <p className="m-0 text-sm font-light leading-snug">
              300 Longwood Ave
              <br />
              Boston, MA 02115
            </p>
          </div>
          <div className="flex items-center gap-s3 lg:border-r lg:border-white/25 lg:px-s5">
            <svg viewBox="0 0 24 24" className="h-8 w-8 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <circle cx="9" cy="12" r="2.5" />
              <path d="M14 10h4M14 14h3" />
            </svg>
            <Link href="/portal" className="text-sm font-bold text-white no-underline hover:underline">
              MyChildren&apos;s Patient Portal
            </Link>
          </div>
          <div className="flex items-center gap-s3 lg:border-r lg:border-white/25 lg:px-s5">
            <svg viewBox="0 0 24 24" className="h-8 w-8 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <rect x="7" y="2" width="10" height="20" rx="2" />
              <circle cx="12" cy="18" r="1" fill="currentColor" stroke="none" />
            </svg>
            <a
              href="tel:16173556000"
              className="text-sm font-bold text-white no-underline hover:underline"
            >
              617.355.6000
            </a>
          </div>
          <div className="flex flex-col justify-center gap-s2 lg:pl-s5">
            <p className="m-0 text-sm font-bold">Follow Us</p>
            <div className="flex flex-wrap gap-s3 text-white/90" aria-label="Social media">
              {["Facebook", "Instagram", "LinkedIn", "Pinterest", "YouTube"].map(
                (name) => (
                  <span
                    key={name}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/40 text-[10px] font-bold"
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
        <div className="wrap grid grid-cols-1 gap-s7 py-s8 lg:grid-cols-[1.1fr_1fr_1fr_1fr]">
          <div className="flex flex-wrap items-center gap-s4">
            <div className="flex h-20 w-20 flex-col items-center justify-center rounded-full border-2 border-[#c9a227] bg-blue text-center">
              <span className="text-[8px] font-extrabold uppercase text-[#c9a227]">
                U.S. News
              </span>
              <span className="px-1 text-[9px] font-bold leading-tight text-white">
                Honor Roll
              </span>
              <span className="text-[8px] text-white/85">2025–26</span>
            </div>
            <div className="flex h-20 min-w-[110px] flex-col items-center justify-center rounded-sm bg-white px-s3 text-center">
              <span className="text-[9px] font-extrabold text-emergency">★★★★★</span>
              <span className="text-[8px] font-extrabold uppercase leading-tight text-blue">
                World&apos;s Best
              </span>
              <span className="text-[8px] font-bold text-text">2026</span>
            </div>
          </div>
          <FooterLinkColumn title="Get Care" links={getCare} />
          <FooterLinkColumn title="About & Support" links={aboutSupport} />
          <FooterLinkColumn
            title="Patient Rights & Policies"
            links={rightsPolicies}
          />
        </div>

        <div className="wrap border-t border-white/25 py-s5">
          <p className="mb-s3 text-xs font-light text-white/85">
            © 2005 - {new Date().getFullYear()} Boston Children&apos;s Hospital.
            All rights reserved.
          </p>
          <div className="flex flex-wrap gap-s4 text-sm">
            <span className="font-bold text-white">Also of Interest</span>
            {[
              { label: "Find a Doctor", href: "/find-a-doctor" },
              { label: "Video Library", href: "/programs" },
              { label: "Online Second Opinions", href: "/professionals/second-opinion" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white/90 no-underline hover:underline"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="mt-s4 flex flex-wrap gap-s4 text-[11px] text-white/75">
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
                className="text-white/75 no-underline hover:text-white"
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

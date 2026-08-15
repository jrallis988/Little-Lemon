import Link from "next/link";
import {
  NewsweekBestBadge,
  UsNewsHonorRollBadge,
} from "@/components/brand/AwardBadges";
import {
  IconLocationHospital,
  IconPhoneDevice,
  IconPortalDevice,
  socialLinks,
} from "@/components/icons/SocialIcons";

const getCare = [
  { label: "Make an Appointment", href: "/appointments/request" },
  { label: "MyChildren's", href: "/portal" },
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
            <IconLocationHospital className="h-5 w-5 shrink-0 text-white" />
            <p className="m-0 text-xs font-light leading-snug">
              300 Longwood Ave
              <br />
              Boston, MA 02115
            </p>
          </div>
          <div className="flex items-center gap-s2 lg:border-r lg:border-white/25 lg:px-s4">
            <IconPortalDevice className="h-5 w-5 shrink-0 text-white" />
            <Link
              href="/portal"
              className="text-xs font-bold text-white no-underline hover:underline"
            >
              MyChildren&apos;s
            </Link>
          </div>
          <div className="flex items-center gap-s2 lg:border-r lg:border-white/25 lg:px-s4">
            <IconPhoneDevice className="h-5 w-5 shrink-0 text-white" />
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
              className="flex flex-wrap items-center gap-2.5 text-white"
              aria-label="Social media"
            >
              {socialLinks.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex text-white transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  aria-label={`Boston Children's Hospital on ${name}`}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
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

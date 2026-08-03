import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { candidate } from "@/lib/candidate";
import { NH_ELECTIONS_URL } from "@/lib/faq";

const quickLinks = [
  { href: "/meet-nick", label: "Meet Nick" },
  { href: "/issues", label: "Issues" },
  { href: "/how-to-vote", label: "How to Vote" },
  { href: "/shop", label: "Store" },
  { href: "/violet-party", label: "Violet Party" },
  { href: "/volunteer", label: "Volunteer" },
];

const trustLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/accessibility", label: "Accessibility" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-footer-navy text-white/75">
      <div className="relative h-48 overflow-hidden sm:h-64" aria-hidden>
        <Image
          src="/images/footer-mountains.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[center_65%]"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-footer-navy via-footer-navy/75 to-footer-navy/25" />
      </div>

      <div className="mx-auto max-w-content px-6 pb-7 pt-2 md:px-8">
        <div className="grid gap-8 md:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="font-display text-2xl font-normal text-white">
              {candidate.brandName}
            </p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-white">
              Independent Write-In · {candidate.state}
            </p>
            <p className="mt-3 text-sm font-semibold text-white">
              For New Hampshire
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70">
              {candidate.tagline} Built neighbor by neighbor. No corporate money.
              No party bosses.
            </p>
            <ul className="mt-5 flex items-center gap-2" aria-label="Social media">
              {[
                { href: candidate.social.facebook, label: "Facebook", Icon: Facebook },
                { href: candidate.social.x, label: "X", Icon: Twitter },
                { href: candidate.social.instagram, label: "Instagram", Icon: Instagram },
                { href: candidate.social.youtube, label: "YouTube", Icon: Youtube },
              ].map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={`${label} (opens in a new window)`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex rounded-cta p-2 text-white/85 hover:bg-white/10 hover:text-white"
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/80">
              Quick links
            </p>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 underline-offset-2 hover:text-white hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-8 border-t border-white/10 pt-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <p className="max-w-xl text-[0.7rem] leading-relaxed text-white/60">
              © {year} {candidate.brandName}. All rights reserved.
              <span className="mx-1.5 text-white/25" aria-hidden>
                ·
              </span>
              Paid for by {candidate.committee}
              <span className="mx-1.5 text-white/25" aria-hidden>
                ·
              </span>
              Powered by Artistic Fountain
            </p>

            <nav
              aria-label="Legal and trust"
              className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[0.7rem] font-medium text-white/70 sm:justify-end"
            >
              {trustLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="underline-offset-2 hover:text-white hover:underline"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={NH_ELECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-2 hover:text-white hover:underline"
              >
                Election Resources
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}

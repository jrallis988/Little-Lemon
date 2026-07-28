import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { candidate } from "@/lib/candidate";
import { NH_ELECTIONS_URL } from "@/lib/faq";

const quickLinks = [
  { href: "/meet-nick", label: "Meet Nick" },
  { href: "/issues", label: "Issues" },
  { href: "/how-to-vote", label: "How to Vote" },
  { href: "/write-in-faq", label: "Write-In FAQ" },
  { href: "/violet-party", label: "Violet Party" },
  { href: "/volunteer", label: "Volunteer" },
];

const trustLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/accessibility", label: "Accessibility" },
  { href: "/write-in-faq", label: "Write-In FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-footer-navy text-white/75">
      <div className="relative h-44 overflow-hidden sm:h-56" aria-hidden>
        <Image
          src="/images/nh-landscape.svg"
          alt=""
          fill
          className="object-cover object-bottom opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-footer-navy via-footer-navy/70 to-transparent" />
      </div>

      <div className="mx-auto max-w-content px-6 pb-12 pt-2 md:px-8">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="font-display text-2xl font-normal text-white">
              {candidate.fullName}
            </p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-yellow">
              for {candidate.office} · Independent Write-In
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

          <div className="space-y-8">
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

            <nav aria-label="Legal and trust">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/80">
                Legal &amp; trust
              </p>
              <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-2 text-sm text-white/85">
                {trustLinks.map((link, i) => (
                  <li key={link.href} className="inline-flex items-center gap-3">
                    {i > 0 && <span aria-hidden className="text-white/40">|</span>}
                    <Link
                      href={link.href}
                      className="underline-offset-2 hover:text-white hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li className="inline-flex items-center gap-3">
                  <span aria-hidden className="text-white/40">|</span>
                  <a
                    href={NH_ELECTIONS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-offset-2 hover:text-white hover:underline"
                  >
                    Official Election Resources
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-10 space-y-3 border-t border-white/15 pt-8 text-xs leading-relaxed text-white/80">
          <p>
            © {year} {candidate.fullName} for {candidate.office}. All rights
            reserved.
          </p>
          <p>
            Paid for by {candidate.committee} | Independent Write-In Candidate
          </p>
          <p className="text-white/70">Powered by Artistic Fountain</p>
        </div>
      </div>
    </footer>
  );
}

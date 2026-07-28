import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { candidate } from "@/lib/candidate";

const quickLinks = [
  { href: "/meet-nick", label: "Meet Nick" },
  { href: "/issues", label: "Issues" },
  { href: "/how-to-vote", label: "How to Vote" },
  { href: "/violet-party", label: "Violet Party" },
  { href: "/contact", label: "Contact" },
  { href: "/accessibility", label: "Accessibility" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/transparency", label: "Transparency" },
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

        <div className="mt-10 space-y-3 border-t border-white/15 pt-8 text-xs leading-relaxed text-white/80">
          <p>
            © {year} {candidate.fullName} for {candidate.office}. All rights
            reserved.
          </p>
          <p>
            Paid for by {candidate.committee} | Independent Write-In Candidate |{" "}
            <Link href="/accessibility" className="underline underline-offset-2 hover:text-white">
              Accessibility
            </Link>
          </p>
          <p>
            <Link href="/privacy" className="underline underline-offset-2 hover:text-white">
              Privacy Policy
            </Link>
            {" | "}
            <Link href="/terms" className="underline underline-offset-2 hover:text-white">
              Terms &amp; Conditions
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

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
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/transparency", label: "Transparency" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-granite-900 text-granite-200">
      <div className="relative h-40 overflow-hidden sm:h-52" aria-hidden>
        <Image
          src="/images/nh-landscape.svg"
          alt=""
          fill
          className="object-cover object-bottom opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-granite-900 via-granite-900/70 to-transparent" />
      </div>

      <div className="mx-auto max-w-content px-5 pb-12 pt-2 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="font-serif text-2xl font-bold text-white">
              {candidate.fullName}
            </p>
            <p className="mt-1 text-sm font-semibold uppercase tracking-[0.14em] text-pine-300">
              for {candidate.office} · Independent Write-In
            </p>
            <p className="mt-3 text-sm font-semibold text-violet-300">
              For New Hampshire
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-granite-300">
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
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex rounded-sm p-2 text-granite-300 hover:bg-granite-700 hover:text-white"
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-granite-400">
              Quick links
            </p>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-granite-200 underline-offset-2 hover:text-white hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 space-y-3 border-t border-granite-700 pt-8 text-xs leading-relaxed text-granite-400">
          <p>Paid for by {candidate.committee}.</p>
          <p>
            © {year} {candidate.fullName} for {candidate.office}. All rights
            reserved.{" "}
            <Link href="/privacy" className="underline underline-offset-2 hover:text-white">
              Privacy Policy
            </Link>
            {" · "}
            <Link href="/terms" className="underline underline-offset-2 hover:text-white">
              Terms &amp; Conditions
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Menu, Twitter, X, Youtube } from "lucide-react";
import { candidate } from "@/lib/candidate";

const navLinks = [
  { href: "/meet-nick", label: "Meet Nick" },
  { href: "/violet-party", label: "Violet Party" },
  { href: "/issues", label: "Issues" },
  { href: "/how-to-vote", label: "How to Vote" },
  { href: "/endorsements", label: "Endorsements" },
  { href: "/volunteer", label: "Volunteer" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-navy text-white/80">
        <div className="mx-auto flex max-w-content items-center justify-between gap-3 px-6 py-2 md:px-8">
          <p className="text-xs font-medium tracking-wide">
            Independent write-in · {candidate.hometown}, NH · Nov 3, 2026
          </p>
          <ul className="flex items-center gap-1" aria-label="Social media">
            {[
              { href: candidate.social.facebook, label: "Facebook", Icon: Facebook },
              { href: candidate.social.x, label: "X", Icon: Twitter },
              { href: candidate.social.instagram, label: "Instagram", Icon: Instagram },
              { href: candidate.social.youtube, label: "YouTube", Icon: Youtube },
            ].map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  className="inline-flex rounded-cta p-1.5 hover:bg-white/10 hover:text-white"
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="h-4 w-4" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-b border-slate-line bg-warm-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-content items-center justify-between gap-4 px-6 py-3 md:px-8">
          <Link
            href="/"
            className="relative block h-12 w-48 sm:h-14 sm:w-56"
            aria-label={`${candidate.fullName} for ${candidate.office} — home`}
          >
            <Image
              src="/images/logo.svg"
              alt={`${candidate.fullName} for ${candidate.office}`}
              fill
              className="object-contain object-left"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Primary">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-cta px-2.5 py-2 text-sm font-semibold text-slate-text transition-colors hover:bg-granite/50 hover:text-navy"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/how-to-vote" className="btn-primary ml-2 !px-5 !py-3 text-[0.75rem]">
              How to Vote Write-In →
            </Link>
          </nav>

          <div className="flex items-center gap-2 xl:hidden">
            <Link href="/how-to-vote" className="btn-primary !px-3 !py-2.5 text-[0.7rem]">
              How to Vote
            </Link>
            <button
              type="button"
              className="btn-ghost !px-3 !py-2.5"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
            </button>
          </div>
        </div>

        {open && (
          <nav
            id="mobile-nav"
            className="border-t border-slate-line bg-warm-white px-6 py-4 xl:hidden"
            aria-label="Mobile"
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-cta px-3 py-3 text-base font-semibold text-slate-text hover:bg-paper"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}

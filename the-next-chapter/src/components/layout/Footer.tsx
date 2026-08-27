import Link from "next/link";
import { campaign } from "@/data/campaign";

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink text-cream">
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="font-display text-sm font-bold uppercase tracking-[0.25em] text-amber">
              {campaign.name}
            </p>
            <p className="mt-2 font-accent text-lg uppercase tracking-wide">
              {campaign.tagline}
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-cream/70">
              A seasonal reading campaign from {campaign.publisher}. Discover
              new stories, connect with authors, and find resources for readers
              of every age.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xs font-bold uppercase tracking-wider text-amber">
              Explore
            </h2>
            <ul className="mt-4 space-y-2">
              {[
                { href: "/books", label: "Fall Books" },
                { href: "/find-a-book", label: "Find a Book" },
                { href: "/fall-reading-week", label: "Fall Reading Week" },
                { href: "/educators", label: "Educators & Librarians" },
                { href: "/newsletter", label: "Newsletter" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/70 transition-colors hover:text-cream"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xs font-bold uppercase tracking-wider text-amber">
              Connect
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-cream/70">
              <li>
                <a href="#" className="transition-colors hover:text-cream">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-cream">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-cream">
                  Contact
                </a>
              </li>
            </ul>
            <p className="mt-6 text-xs text-cream/50">
              © 2026 {campaign.publisher}. All rights reserved.
            </p>
          </div>
        </div>

        <div className="editorial-rule mt-10 opacity-30" aria-hidden="true" />
        <p className="mt-6 text-center text-xs text-cream/40">
          This is a fictional campaign created as a portfolio demonstration.
        </p>
      </div>
    </footer>
  );
}

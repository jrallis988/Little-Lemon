import Link from "next/link";
import { candidate, publicSocials } from "@/lib/candidate";
import { NH_ELECTIONS_URL } from "@/lib/faq";

const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/accessibility", label: "Accessibility" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
  { href: NH_ELECTIONS_URL, label: "Election Resources", external: true },
] as const;

/** Compact mountain-band footer */
export function Footer() {
  const year = new Date().getFullYear();
  const socials = publicSocials();

  return (
    <footer className="footer-section site-footer-compact">
      <div className="footer-compact-inner">
        <div className="container">
          <div className="footer-compact-row">
            <div className="footer-compact-brand">
              <Link href="/" className="footer-compact-logo" aria-label={candidate.brandName}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/theme/assets/images/logo/varga-logo.png"
                  alt={candidate.brandName}
                />
              </Link>
              <p className="footer-compact-tagline">{candidate.tagline}</p>
              <a className="footer-compact-email" href={`mailto:${candidate.email}`}>
                {candidate.email}
              </a>
              {socials.length ? (
                <ul className="social-media footer-compact-social">
                  {socials.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={item.label}
                      >
                        <i className={`fa ${item.icon}`} aria-hidden />
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>

          <p className="footer-compact-legal">
            <span>
              © {year} {candidate.brandName}. All rights reserved.
            </span>
            <span className="footer-compact-sep" aria-hidden>
              ·
            </span>
            <span>Paid for by {candidate.committee}</span>
            <span className="footer-compact-sep" aria-hidden>
              ·
            </span>
            <span>Powered by Artistic Fountain</span>
          </p>

          <nav className="footer-compact-links" aria-label="Legal and resources">
            {LEGAL_LINKS.map((link) =>
              "external" in link && link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              ) : (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              )
            )}
          </nav>
        </div>
      </div>
    </footer>
  );
}

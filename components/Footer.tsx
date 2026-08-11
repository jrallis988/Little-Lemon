import Link from "next/link";
import { candidate } from "@/lib/candidate";

const FOOTER_LINKS = [
  { href: "/meet-nick", label: "Meet Nick" },
  { href: "/violet-party", label: "Violet Party" },
  { href: "/issues", label: "Issues" },
  { href: "/how-to-vote", label: "How to Vote" },
  { href: "/shop", label: "Store" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/privacy", label: "Privacy" },
  { href: "/accessibility", label: "Accessibility" },
] as const;

/** Compact mountain-band footer */
export function Footer() {
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
              <ul className="social-media footer-compact-social">
                <li>
                  <a
                    className="facebook"
                    href={candidate.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                  >
                    <i className="fa fa-facebook" aria-hidden />
                  </a>
                </li>
                <li>
                  <a
                    className="linkedin"
                    href={candidate.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <i className="fa fa-instagram" aria-hidden />
                  </a>
                </li>
              </ul>
            </div>

            <nav className="footer-compact-links" aria-label="Footer">
              {FOOTER_LINKS.map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <p className="footer-compact-paid">Paid for by {candidate.committee}.</p>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { candidate } from "@/lib/candidate";

const QUICK_LINKS = [
  { href: "/meet-nick", label: "Meet Nick" },
  { href: "/issues", label: "Issues" },
  { href: "/how-to-vote", label: "How to Vote" },
  { href: "/shop", label: "Store" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/events", label: "Events" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;

const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/accessibility", label: "Accessibility" },
  { href: "/transparency", label: "Transparency" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-section">
      <div className="footer-top section-padding-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-sm-6">
              <div className="widget">
                <Link className="navbar-brand logo" href="/">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/theme/assets/images/logo/varga-logo.png"
                    alt={candidate.brandName}
                  />
                </Link>
                <p>
                  {candidate.positioningLong} Paid for by {candidate.committee}.
                </p>
                <ul className="contact-info">
                  <li>
                    <i className="fa fa-map-marker" aria-hidden />
                    {candidate.mailAddress}
                  </li>
                  <li>
                    <i className="fa fa-phone" aria-hidden />
                    {candidate.phone}
                  </li>
                  <li>
                    <i className="fa fa-envelope" aria-hidden />
                    <a href={`mailto:${candidate.email}`}>{candidate.email}</a>
                  </li>
                </ul>
                <ul className="social-media">
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
                      className="twitter"
                      href={candidate.social.x}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="X (Twitter)"
                    >
                      <i className="fa fa-twitter" aria-hidden />
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
            </div>

            <div className="col-lg-4 col-sm-6">
              <div className="widget">
                <h5>Quick Links</h5>
                <ul className="contact-info">
                  {QUICK_LINKS.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-lg-4 col-sm-6">
              <div className="widget">
                <h5>Campaign</h5>
                <p>
                  Independent write-in for {candidate.office} — {candidate.state}.{" "}
                  {candidate.tagline}
                </p>
                <ul className="contact-info">
                  {LEGAL_LINKS.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                  <li>
                    <a
                      href="https://www.sos.nh.gov/elections"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      NH Elections
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          &copy; {year} {candidate.brandName}. Design based on{" "}
          <a
            href="https://themeforest.net/user/Labartisan/portfolio"
            target="_blank"
            rel="noopener noreferrer"
          >
            Neta by Labartisan
          </a>
          .
        </p>
      </div>
    </footer>
  );
}

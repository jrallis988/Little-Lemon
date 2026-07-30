import { Link } from "react-router-dom";
import {
  VIRTUAL_TOUR,
  socialLinks,
  policyLinks,
} from "../data/campus";

function SocialIcon({ icon }) {
  const common = {
    viewBox: "0 0 24 24",
    width: "18",
    height: "18",
    "aria-hidden": "true",
    fill: "currentColor",
  };

  switch (icon) {
    case "facebook":
      return (
        <svg {...common}>
          <path d="M14 8h3V5h-3c-2.2 0-4 1.8-4 4v2H7v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...common}>
          <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm5 4.5A4.5 4.5 0 1 0 16.5 12 4.5 4.5 0 0 0 12 7.5zm6.2-.9a1.1 1.1 0 1 0 1.1 1.1 1.1 1.1 0 0 0-1.1-1.1zM12 9.2A2.8 2.8 0 1 1 9.2 12 2.8 2.8 0 0 1 12 9.2z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common}>
          <path d="M6.3 9.2H3.6V20h2.7zm.2-3.1a1.6 1.6 0 1 1-1.6-1.6 1.6 1.6 0 0 1 1.6 1.6zM20.4 13.3c0-3-1.6-4.4-3.8-4.4a3.3 3.3 0 0 0-3 1.7h-.1V9.2h-2.6c0 .8 0 10.8 0 10.8h2.6v-6c0-.3 0-.7.1-1a1.8 1.8 0 0 1 1.7-1.3c1.2 0 1.7.9 1.7 2.3V20h2.6z" />
        </svg>
      );
    case "x":
      return (
        <svg {...common}>
          <path d="M4 4h4.2l3.5 4.8L16.4 4H20l-5.7 6.6L20.5 20h-4.2l-3.8-5.2L7.6 20H4l6.1-7z" />
        </svg>
      );
    case "tiktok":
      return (
        <svg {...common}>
          <path d="M14.5 3c.4 2.2 1.8 3.8 4 4.2v2.5c-1.4 0-2.7-.4-3.8-1.1v5.5A5.6 5.6 0 1 1 9 8.6v2.6a3 3 0 1 0 2.1 2.9V3z" />
        </svg>
      );
    default:
      return null;
  }
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid footer-grid--overhaul">
        <div className="footer-brand-block">
          <div className="footer-logo-lockup">
            <img
              className="footer-seal"
              src="/brand/nhti-seal-gold-256.png"
              alt="NHTI – Concord's Community College seal"
              width="72"
              height="72"
            />
            <img
              className="footer-ccsnh"
              src="/brand/ccsnh-logo-white.png"
              alt="Community College System of New Hampshire"
              width="180"
              height="64"
            />
          </div>
          <p className="footer-brand">NHTI</p>
          <p className="footer-lede">
            Concord&apos;s Community College — pathways for career, transfer, and
            lifelong learning on the Merrimack River.
          </p>
          <div className="footer-social" aria-label="Social media">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
              >
                <SocialIcon icon={item.icon} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="footer-label">Quick links</p>
          <ul className="footer-links">
            <li>
              <Link to="/academics">Academics</Link>
            </li>
            <li>
              <Link to="/admissions">Admissions</Link>
            </li>
            <li>
              <Link to="/financial-aid">Financial Aid</Link>
            </li>
            <li>
              <Link to="/campus">Campus Life</Link>
            </li>
            <li>
              <Link to="/residence-life">Residence Life</Link>
            </li>
            <li>
              <Link to="/workforce">Workforce Education</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="footer-label">Resources</p>
          <ul className="footer-links">
            <li>
              <a href="https://library.nhti.edu/" target="_blank" rel="noreferrer">
                Library
              </a>
            </li>
            <li>
              <a href="https://nhti.textbookx.com/" target="_blank" rel="noreferrer">
                Bookstore
              </a>
            </li>
            <li>
              <a href="https://lynx.nhti.edu/" target="_blank" rel="noreferrer">
                Current Students
              </a>
            </li>
            <li>
              <a
                href="https://givenhcc.org/where-to-give/nhti/"
                target="_blank"
                rel="noreferrer"
              >
                Donate
              </a>
            </li>
            <li>
              <Link to="/events">Events</Link>
            </li>
            <li>
              <Link to="/news">News</Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="footer-label">Visit</p>
          <address className="footer-address">
            31 College Drive
            <br />
            Concord, NH 03301
            <br />
            <a href="tel:6032304001">603-230-4001</a>
          </address>
          <a
            className="footer-tour-card"
            href={VIRTUAL_TOUR}
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="/media/actions/visitnew-1.png"
              alt=""
              width="40"
              height="40"
            />
            <span>
              <strong>Take a Virtual Tour</strong>
              <span>Explore campus from anywhere</span>
            </span>
          </a>
        </div>
      </div>

      <div className="footer-meta footer-meta--policies">
        <div className="footer-policies">
          {policyLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer"
            >
              {item.label}
            </a>
          ))}
        </div>
        <p>
          Member of the Community College System of New Hampshire · Accredited by
          NECHE
        </p>
        <p>© {new Date().getFullYear()} NHTI – Concord&apos;s Community College</p>
      </div>
    </footer>
  );
}

export default Footer;

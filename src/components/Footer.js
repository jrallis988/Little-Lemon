import { Link } from "react-router-dom";
import {
  VIRTUAL_TOUR,
  socialLinks,
  policyLinks,
} from "../data/campus";

function SocialIcon({ icon }) {
  const common = {
    viewBox: "0 0 24 24",
    width: "15",
    height: "15",
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

const footerActions = [
  {
    label: "Campus Safety",
    href: "https://lynx.nhti.edu/student-services/campus-safety/",
  },
  {
    label: "Current Students",
    href: "https://lynx.nhti.edu/",
  },
  {
    label: "Important Forms",
    href: "https://lynx.nhti.edu/student-services/important-forms/",
  },
  {
    label: "Take a Virtual Tour",
    href: VIRTUAL_TOUR,
    ghost: true,
  },
];

const footerResources = [
  { label: "Contact Us", to: "/contact" },
  {
    label: "Consumer Information",
    href: "https://www.nhti.edu/consumer-information/",
  },
  {
    label: "Employment",
    href: "https://www.nhti.edu/about/presidents-office/career-center/",
  },
  {
    label: "Request Transcripts",
    href: "https://tsorder.studentclearinghouse.org/school/ficecode/00258100",
  },
  {
    label: "Faculty & Staff Resources",
    href: "https://lynx.nhti.edu/faculty-staff/",
  },
  {
    label: "Title IX Resources",
    href: "https://lynx.nhti.edu/student-services/campus-safety/title-ix-resources/",
  },
];

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid footer-grid--compact">
        <div className="footer-brand-block">
          <p className="footer-brand">NHTI</p>
          <p className="footer-lede">
            Concord&apos;s Community College — a CCSNH college on the Merrimack
            River.
          </p>
          <img
            className="footer-ccsnh"
            src="/brand/ccsnh-logo-white.png"
            alt="part of the Community College System of New Hampshire"
            width="200"
            height="72"
          />
          <address className="footer-address">
            31 College Drive
            <br />
            Concord, NH 03301
            <br />
            <a href="tel:6032304000">603-230-4000</a>
            {" · "}
            <a href="tel:8002470179">800-247-0179</a>
            <br />
            <a href="mailto:NHTIinfo@ccsnh.edu">Email NHTI</a>
          </address>
        </div>

        <div className="footer-panel">
          <p className="footer-label">Quick actions</p>
          <div className="footer-actions">
            {footerActions.map((item) => (
              <a
                key={item.label}
                className={
                  item.ghost
                    ? "footer-action-btn footer-action-btn--ghost"
                    : "footer-action-btn"
                }
                href={item.href}
                target="_blank"
                rel="noreferrer"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-panel">
          <p className="footer-label">Resources</p>
          <ul className="footer-links">
            {footerResources.map((item) => (
              <li key={item.label}>
                {item.to ? (
                  <Link to={item.to}>{item.label}</Link>
                ) : (
                  <a href={item.href} target="_blank" rel="noreferrer">
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer-meta">
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
        <p className="footer-copy">
          © {new Date().getFullYear()} NHTI – Concord&apos;s Community College
        </p>
        <p className="footer-accreditation">
          Member of the Community College System of New Hampshire · Accredited by
          NECHE
        </p>
      </div>
    </footer>
  );
}

export default Footer;

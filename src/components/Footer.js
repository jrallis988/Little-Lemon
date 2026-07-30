import { Link } from "react-router-dom";
import {
  footerDepartmentLinks,
  footerQuickLinks,
  legalLinks,
  socialLinks,
} from "../data/content";
import { VIRTUAL_TOUR } from "./Header";

const socialIcons = {
  Facebook: (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        fill="currentColor"
        d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H9v3h2v7h3v-7h2.2l.8-3H14V9z"
      />
    </svg>
  ),
  Instagram: (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        fill="currentColor"
        d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm10 2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm-5 3.2A4.8 4.8 0 1 1 7.2 13 4.8 4.8 0 0 1 12 8.2zm0 2A2.8 2.8 0 1 0 14.8 13 2.8 2.8 0 0 0 12 10.2zM17.4 6.3a1.1 1.1 0 1 1-1.1 1.1 1.1 1.1 0 0 1 1.1-1.1z"
      />
    </svg>
  ),
  LinkedIn: (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6.4 9.2H3.6V20h2.8zm.2-3.2a1.65 1.65 0 1 1-1.65-1.65A1.65 1.65 0 0 1 6.6 6zm13.9 6.4c0-2.7-1.45-3.95-3.38-3.95a2.93 2.93 0 0 0-2.62 1.44h-.06V9.2h-2.7c.04.76 0 10.8 0 10.8h2.7v-6c0-.32.02-.64.12-.87a1.86 1.86 0 0 1 1.75-1.24c1.23 0 1.72.94 1.72 2.31V20h2.7z"
      />
    </svg>
  ),
  X: (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        fill="currentColor"
        d="M4 4h4.2l3.5 4.8L16.3 4H20l-5.7 6.5L20.4 20h-4.2l-3.8-5.2L7.7 20H4l6.1-7z"
      />
    </svg>
  ),
  TikTok: (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        fill="currentColor"
        d="M14.2 3h2.1c.2 1.7 1.2 3.2 2.7 4.1v2.3a6.6 6.6 0 0 1-2.7-.7v5.7a5.8 5.8 0 1 1-5.8-5.8c.3 0 .6 0 .9.1v2.4a3.4 3.4 0 1 0 2.5 3.3V3z"
      />
    </svg>
  ),
};

function FooterLink({ item }) {
  if (item.to) {
    return <Link to={item.to}>{item.label}</Link>;
  }

  return (
    <a href={item.href} target="_blank" rel="noreferrer">
      {item.label}
    </a>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand-block">
          <div className="footer-lockup" aria-label="NHTI and CCSNH logos">
            <img
              className="footer-seal"
              src="/brand/nhti-seal-gold-256.png"
              alt="NHTI – Concord's Community College seal"
              width="72"
              height="72"
            />
            <a
              className="footer-ccsnh"
              href="https://www.ccsnh.edu/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="/brand/ccsnh-logo.svg"
                alt="Community College System of New Hampshire"
                width="180"
                height="64"
              />
            </a>
          </div>
          <div>
            <p className="footer-brand">NHTI</p>
            <p className="footer-lede">
              Concord&apos;s Community College — pathways for career, transfer,
              and lifelong learning on the Merrimack River.
            </p>
            <ul className="footer-social" aria-label="NHTI on social media">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={link.label}
                  >
                    {socialIcons[link.label]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <p className="footer-label">Quick links</p>
          <ul className="footer-links">
            {footerQuickLinks.map((item) => (
              <li key={item.label}>
                <FooterLink item={item} />
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="footer-label">Departments</p>
          <ul className="footer-links">
            {footerDepartmentLinks.map((item) => (
              <li key={item.label}>
                <FooterLink item={item} />
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="footer-label">Campus</p>
          <address className="footer-address">
            31 College Drive
            <br />
            Concord, NH 03301
            <br />
            <a href="tel:6032304001">603-230-4001</a>
            <br />
            <a href="mailto:NHTIinfo@ccsnh.edu">NHTIinfo@ccsnh.edu</a>
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

      <div className="footer-meta">
        <div className="footer-meta__copy">
          <p>
            Member of the Community College System of New Hampshire · Accredited
            by NECHE
          </p>
          <p>
            © {new Date().getFullYear()} NHTI – Concord&apos;s Community College
          </p>
        </div>
        <ul className="footer-legal" aria-label="Institutional policies">
          {legalLinks.map((link) => (
            <li key={link.label}>
              <a href={link.href} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

export default Footer;

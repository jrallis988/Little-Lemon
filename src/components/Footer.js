import { Link } from "react-router-dom";
import { legalLinks } from "../data/siteContent";
import { primaryNav, campusNav } from "../data/navigation";

function Footer() {
  const explore = primaryNav.flatMap((section) => [
    { label: section.label, to: section.to },
  ]);

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <img
            className="footer-logo"
            src="/images/gbcc-logo-stacked.png"
            alt="Great Bay Community College"
            width="160"
            height="168"
          />
          <p className="footer-lead">
            Affordable higher education on New Hampshire&apos;s Seacoast —
            pathways to careers, transfer, and lifelong opportunity.
          </p>
        </div>

        <div className="footer-cols">
          <div>
            <h2>Explore</h2>
            <ul>
              {explore.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
              <li><Link to="/athletics">Athletics</Link></li>
              <li><Link to="/news">News</Link></li>
              <li><Link to="/events">Events</Link></li>
            </ul>
          </div>
          <div>
            <h2>Campus</h2>
            <ul>
              {campusNav.slice(0, 8).map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
              <li>320 Corporate Drive</li>
              <li>Portsmouth, NH 03801</li>
            </ul>
          </div>
          <div>
            <h2>Contact</h2>
            <ul>
              <li><a href="tel:6034277600">(603) 427-7600</a></li>
              <li><a href="mailto:askgreatbay@ccsnh.edu">askgreatbay@ccsnh.edu</a></li>
              <li>Mon–Thu: 7:00am – 9:00pm</li>
              <li>Friday: 7:00am – 4:00pm</li>
              <li>Sat–Sun: Closed</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Great Bay Community College</p>
        <ul className="legal-links">
          {legalLinks.map((link) => (
            <li key={link.label}>
              <a href={link.href} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            </li>
          ))}
          <li><Link to="/sitemap">Sitemap</Link></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;

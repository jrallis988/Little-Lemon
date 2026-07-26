import { Link } from "react-router-dom";
import { legalLinks } from "../data/siteContent";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <p className="footer-kicker">Great Bay Community College</p>
          <p className="footer-lead">
            Affordable higher education on New Hampshire&apos;s Seacoast —
            pathways to careers, transfer, and lifelong opportunity.
          </p>
        </div>

        <div className="footer-cols">
          <div>
            <h2>Explore</h2>
            <ul>
              <li>
                <Link to="/academics">Academics</Link>
              </li>
              <li>
                <Link to="/admissions">Admissions &amp; Aid</Link>
              </li>
              <li>
                <Link to="/student-experience">Student Experience</Link>
              </li>
              <li>
                <Link to="/workforce">Workforce Development</Link>
              </li>
              <li>
                <Link to="/news">News</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2>Contact</h2>
            <ul>
              <li>320 Corporate Drive</li>
              <li>Portsmouth, NH 03801</li>
              <li>
                <a href="tel:6034277600">(603) 427-7600</a>
              </li>
              <li>
                <a href="mailto:askgreatbay@ccsnh.edu">askgreatbay@ccsnh.edu</a>
              </li>
            </ul>
          </div>
          <div>
            <h2>Hours</h2>
            <ul>
              <li>Mon–Thu: 7:00am – 9:00pm</li>
              <li>Friday: 7:00am – 4:00pm</li>
              <li>Sat–Sun: Closed</li>
              <li>
                <Link to="/contact">Directions</Link>
              </li>
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
          <li>
            <Link to="/sitemap">Sitemap</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;

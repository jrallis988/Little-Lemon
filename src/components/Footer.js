import { Link } from "react-router-dom";
import { campuses, OFFICE_HOURS } from "../data/campuses";
import { legalLinks } from "../data/siteContent";
import ExternalLink from "./ExternalLink";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <img
            className="footer-logo"
            src="/images/wmcc-mark.svg"
            alt="White Mountains Community College"
            width="220"
            height="56"
          />
          <p className="footer-lead">
            Affordable higher education in northern New Hampshire — pathways to
            careers, transfer, and lifelong opportunity from Berlin, Littleton,
            and the Mount Washington Valley.
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
              <li>2020 Riverside Drive</li>
              <li>Berlin, NH 03570</li>
              <li>
                <a href="tel:6037521113">(603) 752-1113</a>
              </li>
              <li>
                <a href="mailto:wmcc@ccsnh.edu">wmcc@ccsnh.edu</a>
              </li>
              <li className="footer-hours">{OFFICE_HOURS}</li>
            </ul>
          </div>
          <div>
            <h2>Locations</h2>
            <ul>
              {campuses.map((campus) => (
                <li key={campus.id}>{campus.name}</li>
              ))}
              <li>
                <Link to="/contact">Hours &amp; Directions</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="footer-credit">
          Unofficial portfolio recreation — not affiliated with White Mountains
          Community College or CCSNH. Official site:{" "}
          <ExternalLink href="https://www.wmcc.edu/">wmcc.edu</ExternalLink>
        </p>
        <ul className="legal-links">
          {legalLinks.map((link) => (
            <li key={link.label}>
              <ExternalLink href={link.href}>{link.label}</ExternalLink>
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

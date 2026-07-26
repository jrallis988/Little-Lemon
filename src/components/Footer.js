import { Link } from "react-router-dom";
import { legalLinks } from "../data/siteContent";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <p className="footer-kicker">White Mountains Community College</p>
          <p className="footer-lead">
            Affordable higher education in northern New Hampshire — pathways to
            careers, transfer, and lifelong opportunity from Berlin and Littleton.
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
            </ul>
          </div>
          <div>
            <h2>Locations</h2>
            <ul>
              <li>Berlin Campus</li>
              <li>Littleton Academic Center</li>
              <li>Online &amp; hybrid options</li>
              <li>
                <Link to="/contact">Directions</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} White Mountains Community College</p>
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

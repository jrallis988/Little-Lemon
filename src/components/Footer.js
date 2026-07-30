import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand-block">
          <img
            className="footer-seal"
            src="/brand/nhti-seal-gold-256.png"
            alt="NHTI – Concord's Community College seal"
            width="72"
            height="72"
          />
          <div>
            <p className="footer-brand">NHTI</p>
            <p className="footer-lede">
              Concord&apos;s Community College — pathways for career, transfer, and
              lifelong learning on the Merrimack River.
            </p>
          </div>
        </div>
        <div>
          <p className="footer-label">Explore</p>
          <ul className="footer-links">
            <li>
              <Link to="/academics">Academics</Link>
            </li>
            <li>
              <Link to="/admissions">Admissions</Link>
            </li>
            <li>
              <Link to="/campus">Campus Life</Link>
            </li>
            <li>
              <Link to="/athletics">Athletics</Link>
            </li>
            <li>
              <Link to="/events">Events</Link>
            </li>
            <li>
              <Link to="/news">News</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
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
          <p className="footer-tour">
            <a
              href="https://ccsnhmaps.college-tour.com/maps/map.php?ID=6"
              target="_blank"
              rel="noreferrer"
            >
              Take the virtual tour
            </a>
          </p>
        </div>
      </div>
      <div className="footer-meta">
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

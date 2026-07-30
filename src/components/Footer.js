import { Link } from "react-router-dom";
import { VIRTUAL_TOUR } from "./Header";

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
              <Link to="/financial-aid">Financial Aid</Link>
            </li>
            <li>
              <a href="https://lynx.nhti.edu/" target="_blank" rel="noreferrer">
                Current Students
              </a>
            </li>
            <li>
              <Link to="/campus">Campus Life</Link>
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

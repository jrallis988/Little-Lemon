import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-paper-line bg-paper-soft">
      <div className="container flex flex-col gap-10 py-14 md:flex-row md:justify-between">
        <div className="max-w-sm">
          <p className="font-display text-2xl font-semibold text-charcoal-deep">
            Civic Bound
          </p>
          <p className="mt-3 font-body text-sm leading-relaxed text-charcoal">
            A nonprofit community youth support network for life direction,
            stability, and positive community re-entry.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-10 gap-y-3 font-body text-sm text-charcoal sm:grid-cols-3">
          <Link to="/#mission" className="hover:text-violet">
            About Us
          </Link>
          <Link to="/#approach" className="hover:text-violet">
            Our Solutions
          </Link>
          <Link to="/stories" className="hover:text-violet">
            Real Stories
          </Link>
          <Link to="/partners" className="hover:text-violet">
            Coalition Partners
          </Link>
          <Link to="/news" className="hover:text-violet">
            Latest News
          </Link>
          <Link to="/hubs" className="hover:text-violet">
            Find a Hub
          </Link>
          <Link to="/volunteers" className="hover:text-violet">
            Volunteer
          </Link>
          <Link to="/leadership" className="hover:text-violet">
            Leadership
          </Link>
          <Link to="/get-support" className="hover:text-violet">
            Get Support
          </Link>
        </div>
      </div>
      <div className="border-t border-paper-line">
        <div className="container flex flex-col gap-2 py-5 font-body text-xs text-charcoal-soft md:flex-row md:justify-between">
          <p>
            © {new Date().getFullYear()} Civic Bound. A nonprofit organization.
          </p>
          <p>Youth-centered. Community-rooted. Dignity first.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

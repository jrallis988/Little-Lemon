import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-violet-bright/20 bg-ink-soft">
      <div className="container flex flex-col gap-8 py-12 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-2xl font-extrabold text-white">
            Civic <span className="text-chartreuse">Bound</span>
          </p>
          <p className="mt-3 max-w-sm font-body text-sm text-violet-mist">
            A nonprofit community youth support network for life direction,
            stability, and positive community re-entry.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-3 font-body text-sm uppercase tracking-[0.12em] text-violet-mist">
          <Link to="/hubs" className="hover:text-chartreuse">
            Hubs
          </Link>
          <Link to="/get-support" className="hover:text-chartreuse">
            Get Support
          </Link>
          <Link to="/stories" className="hover:text-chartreuse">
            Stories
          </Link>
          <Link to="/partners" className="hover:text-chartreuse">
            Partners
          </Link>
          <Link to="/leadership" className="hover:text-chartreuse">
            Leadership
          </Link>
        </div>
      </div>
      <div className="border-t border-violet-bright/15">
        <div className="container flex flex-col gap-2 py-5 font-body text-xs text-violet-mist/80 md:flex-row md:justify-between">
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

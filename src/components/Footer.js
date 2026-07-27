function Footer() {
  return (
    <footer className="border-t border-violet-bright/20 bg-ink-soft">
      <div className="container flex flex-col gap-8 py-12 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-2xl font-extrabold text-white">
            City <span className="text-gold">Year</span>
          </p>
          <p className="mt-3 max-w-sm font-body text-sm text-violet-mist">
            Advancing academic outcomes for students and developing the next
            generation of leaders through national service.
          </p>
        </div>
        <div className="flex flex-wrap gap-6 font-body text-sm text-violet-mist">
          <a href="#mission" className="hover:text-gold">
            Mission
          </a>
          <a href="#approach" className="hover:text-gold">
            Approach
          </a>
          <a href="#impact" className="hover:text-gold">
            Impact
          </a>
          <a
            href="https://www.cityyear.org/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-gold"
          >
            cityyear.org
          </a>
        </div>
      </div>
      <div className="border-t border-violet-bright/15">
        <div className="container flex flex-col gap-2 py-5 font-body text-xs text-violet-mist/80 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} City Year. All rights reserved.</p>
          <p>A proud member of the AmeriCorps national service network.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

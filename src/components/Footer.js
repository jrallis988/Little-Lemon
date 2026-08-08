function Footer() {
  return (
    <footer className="border-t border-violet-bright/20 bg-ink-soft">
      <div className="container flex flex-col gap-8 py-12 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-2xl font-extrabold text-white">
            Civic <span className="text-chartreuse">Bound</span>
          </p>
          <p className="mt-3 max-w-sm font-body text-sm text-violet-mist">
            Campus-inspired spaces for community transition, growth, and
            belonging.
          </p>
        </div>
        <div className="flex flex-wrap gap-6 font-body text-sm text-violet-mist">
          <a href="#mission" className="hover:text-chartreuse">
            Mission
          </a>
          <a href="#approach" className="hover:text-chartreuse">
            Programs
          </a>
          <a href="#impact" className="hover:text-chartreuse">
            Impact
          </a>
          <a href="#join" className="hover:text-chartreuse">
            Join
          </a>
        </div>
      </div>
      <div className="border-t border-violet-bright/15">
        <div className="container flex flex-col gap-2 py-5 font-body text-xs text-violet-mist/80 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} Civic Bound. All rights reserved.</p>
          <p>Built for community growth and shared opportunity.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

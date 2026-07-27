import { useEffect, useState } from "react";

const links = [
  { href: "#mission", label: "Mission" },
  { href: "#approach", label: "Approach" },
  { href: "#impact", label: "Impact" },
  { href: "#join", label: "Join" },
];

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition duration-300 ${
        scrolled
          ? "border-b border-violet-bright/20 bg-ink/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between md:h-20">
        <a
          href="#top"
          className="font-display text-xl font-extrabold tracking-tight text-white md:text-2xl"
        >
          City <span className="text-gold">Year</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-sm font-medium tracking-wide text-violet-mist transition hover:text-gold"
            >
              {link.label}
            </a>
          ))}
          <a href="#join" className="btn-primary !px-5 !py-2.5 text-xs">
            Serve With Us
          </a>
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center border border-violet-mist/30 text-white md:hidden"
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">Menu</span>
          <span className="flex w-5 flex-col gap-1.5">
            <span
              className={`h-0.5 w-full bg-gold transition ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-full bg-gold transition ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-full bg-gold transition ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {open && (
        <div className="border-t border-violet-bright/20 bg-ink/95 md:hidden">
          <nav className="container flex flex-col gap-4 py-6">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-body text-base text-violet-mist"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#join"
              className="btn-primary w-fit"
              onClick={() => setOpen(false)}
            >
              Serve With Us
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;

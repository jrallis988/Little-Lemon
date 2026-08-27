import Link from "next/link";

const navLinks = [
  { href: "/books", label: "Fall Books" },
  { href: "/find-a-book", label: "Find a Book" },
  { href: "/fall-reading-week", label: "Fall Reading Week" },
  { href: "/educators", label: "Educators" },
  { href: "/newsletter", label: "Newsletter" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <Link
          href="/"
          className="group flex flex-col leading-none"
          aria-label="The Next Chapter — Home"
        >
          <span className="font-display text-xs font-bold uppercase tracking-[0.25em] text-burgundy transition-colors group-hover:text-burgundy-dark">
            The Next Chapter
          </span>
          <span className="mt-0.5 font-accent text-[0.65rem] uppercase tracking-[0.15em] text-ink-muted">
            Fall 2026
          </span>
        </Link>

        <nav aria-label="Main navigation">
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="px-3 py-2 font-display text-xs font-bold uppercase tracking-wider text-ink-muted transition-colors hover:text-burgundy"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <details className="relative lg:hidden">
            <summary className="cursor-pointer list-none font-display text-xs font-bold uppercase tracking-wider text-ink [&::-webkit-details-marker]:hidden">
              Menu
            </summary>
            <ul className="absolute right-0 top-full mt-2 min-w-[200px] border border-line bg-paper py-2 shadow-lg">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block px-4 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-ink-muted transition-colors hover:bg-cream-dark hover:text-burgundy"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        </nav>
      </div>
    </header>
  );
}

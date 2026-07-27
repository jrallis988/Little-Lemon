import Link from "next/link";

const columns = [
  {
    title: "Product",
    links: [
      { href: "#features", label: "Platform features" },
      { href: "#plans", label: "Classroom plan" },
      { href: "#plans", label: "School plan" },
      { href: "#plans", label: "District plan" },
    ],
  },
  {
    title: "Buy",
    links: [
      { href: "#buy", label: "How to buy" },
      { href: "#buy", label: "Get pricing" },
      { href: "#buy", label: "Request a demo" },
      { href: "#approach", label: "Our approach" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "#about", label: "Why schools buy it" },
      { href: "mailto:hello@morganbright.learn", label: "Contact sales" },
      { href: "#buy", label: "Sales support" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto grid max-w-site gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.4fr_repeat(3,1fr)] lg:gap-8 lg:py-16">
        <div>
          <Link href="/" className="inline-flex items-center gap-2.5">
            <span
              aria-hidden
              className="inline-block h-7 w-7 rounded-sm bg-accent"
            />
            <span className="text-xl font-bold tracking-tight">Morgan Bright</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
            Academic software that helps teachers diagnose learning hurdles,
            adapt instruction, and track progress across classroom, school, and
            district plans.
          </p>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <p className="text-sm font-bold uppercase tracking-[0.08em] text-white/55">
              {column.title}
            </p>
            <ul className="mt-4 space-y-2.5">
              {column.links.map((link) => (
                <li key={`${column.title}-${link.label}`}>
                  <a
                    href={link.href}
                    className="text-sm text-white/85 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-site flex-col gap-3 px-5 py-5 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {year} Morgan Bright. All rights reserved.</p>
          <p>Sales site for classroom, school, and district academic software.</p>
        </div>
      </div>
    </footer>
  );
}

import { Logo } from "./Logo";

const columns = [
  {
    title: "Programs",
    links: ["Core / Points", "Med+", "GLP-1 Success", "Menopause care"],
  },
  {
    title: "Support",
    links: ["Find a Coach", "Member stories", "Help center", "Contact"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Press", "Science"],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-ink/8 pb-10 pt-14">
      <div className="section-shell">
        <div className="grid gap-10 md:grid-cols-[1.2fr_repeat(3,0.7fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs font-serif text-base leading-relaxed text-ink/60">
              Science-backed weight health for real life—since 1963, redesigned for what’s next.
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-ink/40">
                {column.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#join"
                      className="font-sans text-sm text-ink/65 transition hover:text-ink"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-ink/8 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans text-xs text-ink/45">
            © {new Date().getFullYear()} Weight Watchers redesign concept. Not affiliated with WW
            International, Inc.
          </p>
          <p className="font-sans text-xs text-ink/45">
            Privacy · Terms · Accessibility
          </p>
        </div>
      </div>
    </footer>
  );
}

import { Link } from "react-router-dom";
import { Logo } from "./Logo";

const columns = [
  {
    title: "Programs",
    links: [
      { label: "Core / Points", to: "/#pathways" },
      { label: "Med+", to: "/#pathways" },
      { label: "WW 63 Campaign", to: "/63" },
      { label: "Timeline", to: "/63#timeline" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Find a Coach", to: "/#community" },
      { label: "Member stories", to: "/#community" },
      { label: "Archive vault", to: "/63#archive" },
      { label: "Philosophy", to: "/63#philosophy" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/63" },
      { label: "Careers", to: "/#join" },
      { label: "Press", to: "/63#archive" },
      { label: "Science", to: "/63#philosophy" },
    ],
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
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="font-sans text-sm text-ink/65 transition hover:text-ink"
                    >
                      {link.label}
                    </Link>
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
          <p className="font-sans text-xs text-ink/45">Privacy · Terms · Accessibility</p>
        </div>
      </div>
    </footer>
  );
}

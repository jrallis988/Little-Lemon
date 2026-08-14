import { writer } from "@/data/scripts";

const links = [
  { href: "https://www.imdb.com/", label: "IMDb" },
  { href: `mailto:${writer.email}`, label: "Email" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 md:flex-row md:items-end md:justify-between md:px-8 md:py-16">
        <div>
          <p className="font-display text-2xl text-foreground">{writer.name}</p>
          <p className="mt-2 font-[family-name:var(--font-script)] text-sm text-muted">
            {writer.role} · {writer.location}
          </p>
          <p className="mt-6 text-xs tracking-[0.08em] text-muted">
            © {new Date().getFullYear()} {writer.name}
          </p>
        </div>

        <nav aria-label="Contact links" className="flex flex-wrap gap-8">
          {links.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm tracking-[0.14em] text-muted uppercase transition-colors hover:text-foreground"
              {...(item.href.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}

const socials = [
  { href: "https://www.instagram.com/", label: "Instagram" },
  { href: "https://www.imdb.com/", label: "IMDb" },
  { href: "mailto:inquiries@ecmco.studio", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12 md:flex-row md:items-end md:justify-between md:px-8 md:py-16">
        <div>
          <p className="font-display text-2xl text-foreground">ECMCo.</p>
          <p className="mt-2 text-sm text-muted">East Coast, USA</p>
          <p className="mt-6 text-xs tracking-[0.08em] text-muted">
            © {new Date().getFullYear()} The East Coast Motion Picture Company
          </p>
        </div>

        <nav aria-label="Social and contact" className="flex flex-wrap gap-8">
          {socials.map((item) => (
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

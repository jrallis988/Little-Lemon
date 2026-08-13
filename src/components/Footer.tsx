const socials = [
  { href: "https://www.instagram.com/", label: "Instagram" },
  { href: "https://www.imdb.com/", label: "IMDbPro" },
  { href: "mailto:inquiries@ecmco.studio", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 py-12 md:flex-row md:items-end md:justify-between md:px-8 md:py-16">
        <div>
          <p className="font-[family-name:var(--font-credit)] text-xs tracking-[0.35em] text-accent uppercase">
            The East Coast Motion Picture Company
          </p>
          <p className="mt-3 font-display text-3xl text-foreground">ECMCo.</p>
          <p className="mt-3 text-sm text-muted">East Coast, USA</p>
          <p className="mt-6 font-[family-name:var(--font-credit)] text-xs tracking-[0.12em] text-muted uppercase">
            © {new Date().getFullYear()} All Rights Reserved
          </p>
        </div>

        <nav aria-label="Social and contact" className="flex flex-wrap gap-8">
          {socials.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="font-[family-name:var(--font-credit)] text-sm tracking-[0.2em] text-muted uppercase transition-colors hover:text-foreground"
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

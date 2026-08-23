import profile from "../data/profile";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-sand/10 bg-ink py-8">
      <div className="container flex flex-col gap-4 text-sm text-sand/65 sm:flex-row sm:items-center sm:justify-between">
        <p>© {year} James Rallis</p>
        <p className="text-sand/75">{profile.title}</p>
        <nav className="flex flex-wrap gap-4" aria-label="Footer">
          <a href={profile.portfolio} className="transition-colors hover:text-foam-soft">
            Portfolio
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foam-soft"
          >
            LinkedIn
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foam-soft"
          >
            GitHub
          </a>
          <a href={`mailto:${profile.email}`} className="transition-colors hover:text-foam-soft">
            Email
          </a>
        </nav>
      </div>
    </footer>
  );
}

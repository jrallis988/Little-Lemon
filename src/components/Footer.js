import { Link } from "react-router-dom";
import { campuses, navLinks } from "../data/content";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-river/10 bg-river-deep text-river-mist">
      <div className="section-shell grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl font-semibold tracking-tight text-white">
            River Valley Community College
          </p>
          <p className="mt-4 max-w-md text-base leading-relaxed text-white/70">
            A Community College System of New Hampshire campus serving western
            New Hampshire and nearby Vermont communities.
          </p>
        </div>

        <div>
          <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-sunrise">
            Explore
          </p>
          <ul className="mt-4 space-y-3">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-white/80 transition hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-sunrise">
            Campuses
          </p>
          <ul className="mt-4 space-y-3 text-white/80">
            {campuses.map((campus) => (
              <li key={campus.name}>
                {campus.name}
                <span className="text-white/45"> — {campus.role}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="section-shell flex flex-col gap-2 py-6 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} River Valley Community College</p>
          <p>
            Inspired by{" "}
            <a
              href="https://www.rivervalley.edu"
              className="text-white/70 underline-offset-4 hover:text-white hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              rivervalley.edu
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

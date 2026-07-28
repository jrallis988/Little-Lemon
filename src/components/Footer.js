import { Link } from "react-router-dom";
import {
  campuses,
  contact,
  navLinks,
  portalLinks,
  utilityLinks,
} from "../data/content";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-river/10 bg-river-deep text-river-mist">
      <div className="section-shell grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Logo solid={false} />
          <p className="mt-5 max-w-sm text-base leading-relaxed text-white/70">
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
            Portals & tools
          </p>
          <ul className="mt-4 space-y-3">
            {portalLinks.slice(0, 4).map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/80 transition hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
            {utilityLinks.map((link) =>
              link.external ? null : (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-white/80 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>

        <div>
          <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-sunrise">
            Contact
          </p>
          <ul className="mt-4 space-y-3 text-white/80">
            <li>{contact.address}</li>
            <li>
              <a
                href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
                className="transition hover:text-white"
              >
                {contact.phone}
              </a>
            </li>
            {contact.tollFree ? (
              <li>
                <a
                  href={`tel:${contact.tollFree.replace(/[^\d+]/g, "")}`}
                  className="transition hover:text-white"
                >
                  Toll-free {contact.tollFree}
                </a>
              </li>
            ) : null}
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="transition hover:text-white"
              >
                {contact.email}
              </a>
            </li>
            <li className="pt-2 text-sm text-white/55">
              Campuses: {campuses.map((campus) => campus.name).join(" · ")}
            </li>
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

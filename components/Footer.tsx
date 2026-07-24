import Link from "next/link";
import { candidate } from "@/lib/candidate";

const quickLinks = [
  { href: "/#issues", label: "The Issues" },
  { href: "/#events", label: "Events" },
  { href: "/#meet", label: "Meet the Candidate" },
  { href: "/#action", label: "Action Center" },
  { href: "/#donate", label: "Donate" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/accessibility", label: "Accessibility" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-granite-800 bg-granite-800 text-granite-200">
      <div className="mx-auto max-w-content section-pad !py-12 sm:!py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="font-serif text-2xl font-bold text-white">
              {candidate.fullName}
            </p>
            <p className="mt-1 text-sm font-semibold uppercase tracking-[0.14em] text-pine-300">
              for {candidate.office} · {candidate.state}
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-granite-300">
              Grounded in New Hampshire. Focused on cost of living, Main Street,
              public lands, and local schools—not party theater.
            </p>
            <p className="mt-4 text-sm">
              <a
                href={`mailto:${candidate.email}`}
                className="underline decoration-granite-500 underline-offset-2 hover:text-white"
              >
                {candidate.email}
              </a>
              <span className="mx-2 text-granite-500" aria-hidden>
                ·
              </span>
              <a
                href={`tel:+16035550142`}
                className="underline decoration-granite-500 underline-offset-2 hover:text-white"
              >
                {candidate.phone}
              </a>
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-granite-400">
              Quick links
            </p>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-granite-200 underline-offset-2 hover:text-white hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 space-y-3 border-t border-granite-600 pt-8 text-xs leading-relaxed text-granite-400">
          <p>
            Paid for by {candidate.committee}. Not authorized by any candidate
            or candidate&apos;s committee for federal office other than{" "}
            {candidate.fullName}.
          </p>
          <p>
            Contributions are not tax-deductible for federal income tax
            purposes. Federal law requires us to use our best efforts to collect
            and report the name, address, occupation, and employer of
            individuals whose contributions exceed $200 in an election cycle.
          </p>
          <p className="text-granite-500">
            © {year} {candidate.committee}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

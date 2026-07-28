import Link from "next/link";
import { IconChevronRight } from "@/components/ui/Icons";

const links = [
  { label: "Find a Doctor", href: "/find-a-doctor" },
  { label: "Book Appointment", href: "/find-a-doctor" },
  { label: "Epilepsy Program", href: "/programs/epilepsy-program" },
  { label: "Emergency Dept", href: "/emergency" },
  { label: "Search the site", href: "/search" },
];

export function QuickLinks() {
  return (
    <section className="border-b border-border bg-white" aria-label="Help me find">
      <div className="wrap">
        <div className="flex items-stretch overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex shrink-0 items-center whitespace-nowrap border-r border-border pr-s4 text-xs font-extrabold uppercase tracking-[0.08em] text-text-meta">
            Help me find
          </div>
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="flex min-h-12 shrink-0 items-center gap-1.5 whitespace-nowrap border-r border-border px-s4 py-[13px] text-sm font-bold text-blue no-underline transition-colors hover:bg-surface"
            >
              {link.label}
              <IconChevronRight className="text-ocean" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

import { MapPin, RotateCcw, Tag } from "lucide-react";

const ACTIONS = [
  {
    href: "#clubs",
    label: "Find a Club Near You",
    icon: MapPin,
  },
  {
    href: "#pricing",
    label: "Explore Perks",
    icon: Tag,
  },
  {
    href: "#tour",
    label: "Take a Virtual Tour",
    icon: RotateCcw,
  },
];

export function GetStarted() {
  return (
    <section
      aria-labelledby="get-started-heading"
      className="bg-gradient-to-b from-white to-pf-mist"
    >
      <div className="mx-auto max-w-xl px-4 py-10 text-center md:px-6 md:py-12">
        <h2
          id="get-started-heading"
          className="font-display text-3xl tracking-tight text-pf-ink md:text-4xl"
        >
          Get Started Today
        </h2>
        <ul className="mt-6 space-y-3">
          {ACTIONS.map((action) => (
            <li key={action.href}>
              <a
                href={action.href}
                className="flex items-center justify-center gap-3 rounded-2xl bg-white px-5 py-4 text-base font-semibold text-pf-ink shadow-[0_8px_20px_-12px_rgba(61,9,88,0.35)] ring-1 ring-pf-line transition hover:-translate-y-0.5 hover:ring-pf-purple"
              >
                <action.icon
                  className="h-5 w-5 text-pf-purple"
                  aria-hidden
                />
                {action.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

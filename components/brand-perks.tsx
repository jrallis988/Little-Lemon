import { DollarSign, Dumbbell, Globe2 } from "lucide-react";

const PERKS = [
  {
    title: "Best value on the planet",
    body: "We believe in providing a high-quality experience at an affordable cost.",
    href: "#pricing",
    icon: DollarSign,
  },
  {
    title: "Tons of equipment",
    body: "Tons of cardio and strength equipment, all in a clean and spacious environment.",
    href: "#amenities",
    icon: Dumbbell,
  },
  {
    title: "2,700+ locations",
    body: "More than 2,700 Planet Fitness locations worldwide.",
    href: "#locations",
    icon: Globe2,
  },
];

export function BrandPerks() {
  return (
    <section
      aria-labelledby="perks-heading"
      className="border-y border-pf-line bg-white"
    >
      <div className="mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-12">
        <ul className="grid gap-10 md:grid-cols-3 md:gap-6">
          {PERKS.map((perk) => (
            <li key={perk.title} className="text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center">
                <perk.icon
                  className="h-10 w-10 text-pf-purple"
                  strokeWidth={1.75}
                  aria-hidden
                />
              </span>
              <h2 className="mt-3 font-display text-2xl tracking-tight text-pf-ink">
                {perk.title}
              </h2>
              <p className="mt-1.5 text-sm text-pf-ink/65 md:text-base">
                {perk.body}
              </p>
              <a
                href={perk.href}
                className="mt-2 inline-block text-sm font-semibold text-pf-purple underline underline-offset-2"
              >
                Learn More
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

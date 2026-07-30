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
    href: "#tour",
    icon: Dumbbell,
  },
  {
    title: "2,700+ locations",
    body: "More than 2,700 Planet Fitness locations worldwide.",
    href: "#clubs",
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
        <p className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-pf-purple">
          Welcome to Planet Fitness
        </p>
        <h2
          id="perks-heading"
          className="mx-auto mt-2 max-w-2xl text-center font-display text-3xl tracking-tight text-pf-ink md:text-5xl"
        >
          <span className="text-pf-ink">A place where </span>
          <span className="text-pf-purple">everyone feels</span>
          <span className="text-pf-ink"> welcome</span>
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-pf-ink/65 md:text-base">
          We’ve created a comfortable, safe and energetic environment for
          everyone. A space where you can go at your own pace, and do your own
          thing without ever having to worry about being judged.
        </p>

        <ul className="mt-10 grid gap-10 md:grid-cols-3 md:gap-6">
          {PERKS.map((perk) => (
            <li key={perk.title} className="text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-pf-mist">
                <perk.icon
                  className="h-7 w-7 text-pf-purple"
                  strokeWidth={2.25}
                  aria-hidden
                />
              </span>
              <h3 className="mt-3 font-display text-xl tracking-tight text-pf-ink">
                {perk.title}
              </h3>
              <p className="mt-1.5 text-sm text-pf-ink/65">{perk.body}</p>
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

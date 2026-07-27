import { DollarSign, Dumbbell, Globe2 } from "lucide-react";

const PERKS = [
  {
    title: "Best value on the planet",
    body: "High-quality clubs at an affordable monthly rate—Classic from $15, Black Card from $24.99.",
    icon: DollarSign,
  },
  {
    title: "Tons of equipment",
    body: "Cardio, free weights, and 30-minute circuit in a clean, spacious Judgement Free Zone®.",
    icon: Dumbbell,
  },
  {
    title: "2,700+ locations",
    body: "Find a home club near you—and with Black Card, work out at Planet Fitness clubs worldwide.",
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
          className="mx-auto mt-2 max-w-2xl text-center font-display text-3xl tracking-tight text-pf-ink md:text-4xl"
        >
          A place where everyone feels welcome
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-pf-ink/65 md:text-base">
          We’ve built a comfortable, safe, energetic Judgement Free Zone®—so you
          can go at your own pace without worrying about being judged.
        </p>

        <ul className="mt-8 grid gap-8 md:grid-cols-3 md:gap-6">
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
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

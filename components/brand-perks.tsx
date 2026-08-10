import { Circle, Dumbbell, Globe2 } from "lucide-react";

const PERKS = [
  {
    title: "Best vibes on the planet",
    body: "We’ve created a comfortable, safe and energetic environment for everyone — a Judgement Free Zone® where you can go at your own pace.",
    href: "#pricing",
    cta: "See Plan",
    icon: Circle,
  },
  {
    title: "Tons of equipment",
    body: "Tons of cardio and strength equipment, all in a clean and spacious environment.",
    href: "#amenities",
    cta: "See Plan",
    icon: Dumbbell,
  },
  {
    title: "2,700+ locations",
    body: "More than 2,700 Planet Fitness locations worldwide.",
    href: "#locations",
    cta: "See Plan",
    icon: Globe2,
  },
];

/** Welcome + value props + brand gradient bar (desktop mock reference). */
export function BrandPerks() {
  return (
    <section
      id="welcome"
      aria-labelledby="perks-heading"
      className="scroll-mt-14 bg-white"
    >
      <div className="mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-14">
        <h2
          id="perks-heading"
          className="mx-auto max-w-3xl text-center font-display text-3xl font-black uppercase leading-[1.05] tracking-tight text-pf-ink sm:text-4xl md:text-5xl"
        >
          A PLACE WHERE <span className="text-pf-purple">EVERYONE</span> FEELS
          WELCOME
        </h2>

        <ul className="mt-10 grid gap-8 md:grid-cols-3 md:gap-6">
          {PERKS.map((perk) => (
            <li key={perk.title} className="text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center">
                <perk.icon
                  className="h-10 w-10 text-pf-purple"
                  strokeWidth={1.75}
                  aria-hidden
                />
              </span>
              <h3 className="mt-3 font-display text-xl tracking-tight text-pf-ink md:text-2xl">
                {perk.title}
              </h3>
              <p className="mt-1.5 text-sm text-pf-ink/65 md:text-base">
                {perk.body}
              </p>
              <a
                href={perk.href}
                className="mt-3 inline-block text-sm font-bold text-pf-purple"
              >
                {perk.cta}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="h-10 w-full md:h-14"
        style={{
          backgroundImage:
            "linear-gradient(90deg, #5f259f 0%, #7a2fb8 42%, #ffb81c 100%)",
        }}
        aria-hidden
      />
    </section>
  );
}

import Image from "next/image";

const GEAR = [
  { name: "Gear bag", price: "$38.99", image: "/images/floor-gym.jpg" },
  { name: "PF t-shirt", price: "$11.95", image: "/images/hero-gym.jpg" },
  { name: "Baseball cap", price: "$10.00", image: "/images/cardio-gym.jpg" },
  { name: "Cinch sack", price: "$8.00", image: "/images/floor-gym.jpg" },
  { name: "Water bottle", price: "$5.00", image: "/images/cardio-gym.jpg" },
  { name: "Workout towel", price: "$4.95", image: "/images/hero-gym.jpg" },
  { name: "Combination lock", price: "$5.00", image: "/images/floor-gym.jpg" },
  {
    name: "Tanning lotion",
    price: "From $7.99",
    image: "/images/cardio-gym.jpg",
  },
];

/** Club store / gear wall inspired by in-club retail. */
export function ClubGear() {
  return (
    <section
      id="gear"
      aria-labelledby="gear-heading"
      className="scroll-mt-14 overflow-hidden bg-[#ffce08]"
    >
      <div
        className="mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-12"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 20%, rgba(0,0,0,0.06) 0 1px, transparent 1px), radial-gradient(circle at 80% 40%, rgba(0,0,0,0.05) 0 1px, transparent 1px)",
          backgroundSize: "28px 28px, 36px 36px",
        }}
      >
        <p className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-pf-ink/70">
          In-club store
        </p>
        <h2
          id="gear-heading"
          className="mt-2 text-center font-display text-3xl tracking-tight text-pf-ink md:text-4xl"
        >
          Get your gear
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-sm text-pf-ink/75">
          Bags, towels, bottles, locks, and Black Card Spa essentials — typical
          club-counter pricing shown for reference.
        </p>

        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {GEAR.map((item) => (
            <li
              key={item.name}
              className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm"
            >
              <div className="relative aspect-square">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
              </div>
              <div className="p-3">
                <p className="text-sm font-semibold text-pf-ink">{item.name}</p>
                <p className="text-sm font-bold text-pf-purple">{item.price}</p>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-5 text-center text-xs text-pf-ink/60">
          Prices vary by club. Ask the front desk or shop in-club. Now hiring
          trainers — apply at planetfitness.com.
        </p>
      </div>
    </section>
  );
}

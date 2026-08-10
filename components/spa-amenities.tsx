import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const AMENITIES = [
  {
    id: "polar",
    title: "NEW Polar Dry Plunge",
    body: "Now in the Black Card Spa® — recover with a cold experience without the ice bath.",
    image: "/images/cardio-gym.jpg",
    badge: "Black Card Spa®",
  },
  {
    id: "red-light",
    title: "NEW Red Light Sauna",
    body: "Unwind with red light recovery options available at participating Black Card clubs.",
    image: "/images/floor-gym.jpg",
    badge: "Black Card Spa®",
  },
  {
    id: "tbe",
    title: "NEW Total Body Enhancement",
    body: "Look and feel your best with Total Body Enhancement in the Black Card Spa®.",
    image: "/images/hero-gym.jpg",
    badge: "Black Card Spa®",
  },
];

export function SpaAmenities() {
  return (
    <section
      id="amenities"
      aria-labelledby="amenities-heading"
      className="scroll-mt-14 bg-pf-mist"
    >
      <div className="mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-12">
        <p className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-pf-purple">
          Black Card Spa®
        </p>
        <h2
          id="amenities-heading"
          className="mt-2 text-center font-display text-3xl tracking-tight text-pf-ink md:text-4xl"
        >
          New ways to recover & recharge
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-pf-ink/65">
          Open 24/7 at many clubs · Crowd Meter in the PF App · spa amenities on
          Black Card®.
        </p>

        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {AMENITIES.map((item) => (
            <li
              key={item.id}
              className="overflow-hidden rounded-3xl border border-pf-line bg-white shadow-[0_10px_24px_-18px_rgba(61,9,88,0.35)]"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pf-purple-ink/80 via-pf-purple/30 to-transparent" />
                <p className="absolute bottom-3 left-3 text-[10px] font-bold uppercase tracking-[0.16em] text-pf-yellow">
                  {item.badge}
                </p>
              </div>
              <div className="p-4">
                <h3 className="font-display text-xl tracking-tight text-pf-ink">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm text-pf-ink/65">{item.body}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex justify-center">
          <Button asChild variant="purple">
            <Link href="/join?plan=black-card">Join Black Card</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

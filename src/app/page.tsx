import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { DrugSearch } from "@/components/search/drug-search";
import { buttonVariants } from "@/components/ui/button";
import { prisma } from "@/lib/db";
import { FIRST_WIN_DRUGS } from "@/lib/first-win-drugs";
import { mapDrug } from "@/lib/pricing-service";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    n: "01",
    title: "Search any common med",
    body: "Brand or generic — dosages and quantities included.",
    image: "/images/step-search.webp",
    alt: "Prescription bottles arranged for a medication search",
  },
  {
    n: "02",
    title: "Compare nearby prices",
    body: "See coupon prices by pharmacy, distance, and 30- vs 90-day supply.",
    image: "/images/step-compare.webp",
    alt: "Phone showing prescription price comparison at home",
  },
  {
    n: "03",
    title: "Show the digital coupon",
    body: "Large barcode plus BIN / PCN / Group / Member ID at the counter.",
    image: "/images/step-coupon.webp",
    alt: "Pharmacist handing a prescription bag to a customer",
  },
] as const;

const PHARMACY_STRIP = [
  {
    name: "Neighborhood counters",
    image: "/images/pharmacy-aisle.webp",
    alt: "Pharmacy aisle stocked with medications",
  },
  {
    name: "Pharmacist help",
    image: "/images/pharmacist-helping.webp",
    alt: "Pharmacist assisting a patient",
  },
  {
    name: "Senior-friendly care",
    image: "/images/senior-care.webp",
    alt: "Doctor speaking with a senior patient",
  },
  {
    name: "Everyday prescriptions",
    image: "/images/prescription-bottle.webp",
    alt: "Blister packs of prescription medication",
  },
] as const;

export default async function HomePage() {
  const popular = (
    await prisma.drug.findMany({
      take: 8,
      orderBy: { createdAt: "asc" },
      include: { strengths: true, quantities: true },
    })
  ).map(mapDrug);

  return (
    <div>
      {/* Full-bleed photo hero — GoodRx-style search-first density */}
      <section className="relative isolate min-h-[min(68dvh,36rem)] overflow-hidden sm:min-h-[min(72dvh,38rem)]">
        <Image
          src="/images/hero-pharmacy.webp"
          alt=""
          fill
          priority
          className="object-cover object-[center_35%]"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-trust/94 via-trust/80 to-primary/40"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-trust/60 via-transparent to-primary/20"
          aria-hidden
        />

        <div className="relative mx-auto flex min-h-[min(68dvh,36rem)] max-w-6xl flex-col justify-center px-4 py-10 sm:min-h-[min(72dvh,38rem)] sm:px-6 sm:py-12">
          <div className="max-w-2xl animate-trx-fade-up text-trust-foreground">
            <p className="font-display text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
              Trump RX
            </p>
            <h1 className="mt-2 font-display text-2xl font-medium leading-snug tracking-tight sm:text-3xl md:text-4xl">
              Find the lowest prices on your prescriptions.
            </h1>
            <p className="mt-3 max-w-lg text-base leading-relaxed text-trust-foreground/90 sm:text-lg">
              Search brand and generic meds, compare local pharmacies, and show
              a digital coupon at the counter — a clearer Trump RX experience.
            </p>
          </div>

          <div className="animate-trx-fade-up-delay mt-6 max-w-2xl">
            <DrugSearch size="hero" autoFocus />
            <div className="mt-4">
              <p className="text-sm font-medium text-trust-foreground/90">
                Start in one tap — common fills
              </p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {FIRST_WIN_DRUGS.map((d) => (
                  <li key={d.id}>
                    <Link
                      href={`/search?drug=${d.id}`}
                      className="inline-flex min-h-10 items-center gap-1.5 rounded-lg bg-trust-foreground/12 px-3 text-sm font-semibold text-trust-foreground ring-1 ring-trust-foreground/25 backdrop-blur-sm transition hover:bg-trust-foreground/20"
                    >
                      {d.label}
                      <span className="font-normal opacity-80">{d.hint}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-3 text-sm text-trust-foreground/85">
              Also popular:{" "}
              {popular.slice(0, 4).map((d, i) => (
                <span key={d.id}>
                  {i > 0 && " · "}
                  <Link
                    href={`/search?drug=${d.id}`}
                    className="font-medium underline-offset-2 hover:underline"
                  >
                    {d.genericName}
                  </Link>
                </span>
              ))}
            </p>
          </div>
        </div>
      </section>

      {/* Dense popular searches — photo-backed strip under hero */}
      <section
        aria-labelledby="popular-heading"
        className="relative isolate overflow-hidden border-b border-border"
      >
        <Image
          src="/images/pharmacy-shelves.webp"
          alt=""
          fill
          className="object-cover opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-background/88" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 py-5 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <h2
              id="popular-heading"
              className="font-display text-xl font-semibold tracking-tight sm:text-2xl"
            >
              Popular searches
            </h2>
            <Link
              href="/search"
              className="text-sm font-medium text-primary underline-offset-2 hover:underline"
            >
              Browse all prices
            </Link>
          </div>
          <ul className="mt-2.5 flex flex-wrap gap-2">
            {popular.map((d) => (
              <li key={d.id}>
                <Link
                  href={`/search?drug=${d.id}`}
                  className="inline-flex min-h-10 items-center rounded-lg border border-border bg-card/95 px-3 text-sm font-medium shadow-sm transition-colors hover:border-primary/35 hover:bg-accent"
                >
                  {d.genericName}
                  <span className="ml-1.5 text-muted-foreground">
                    ({d.brandName})
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Photo-led how it works */}
      <section
        aria-labelledby="how-it-works"
        className="bg-surface"
      >
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-9">
          <div className="max-w-2xl">
            <h2
              id="how-it-works"
              className="font-display text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              Three steps to the counter
            </h2>
            <p className="mt-1 text-muted-foreground">
              Built like GoodRx — fast search, clear local prices, pharmacist-ready
              coupon — with broader brand and generic coverage.
            </p>
          </div>

          <ol className="mt-5 grid gap-3 sm:grid-cols-3">
            {STEPS.map((step) => (
              <li key={step.n} className="group overflow-hidden rounded-2xl bg-card ring-1 ring-border">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={step.image}
                    alt={step.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                  <span className="absolute left-3 top-3 rounded-md bg-primary/90 px-2 py-0.5 text-xs font-semibold tracking-wide text-primary-foreground">
                    {step.n}
                  </span>
                </div>
                <div className="space-y-1 px-4 py-3.5">
                  <h3 className="text-base font-semibold">{step.title}</h3>
                  <p className="text-sm leading-snug text-muted-foreground">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Visual pharmacy strip + CTA */}
      <section
        aria-labelledby="pharmacies-heading"
        className="border-y border-border bg-background"
      >
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-9">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div className="max-w-xl">
              <h2
                id="pharmacies-heading"
                className="font-display text-2xl font-semibold tracking-tight sm:text-3xl"
              >
                Real pharmacies near you
              </h2>
              <p className="mt-1 text-muted-foreground">
                Sort by distance or lowest coupon price — then save your preferred
                stores.
              </p>
            </div>
            <Link
              href="/pharmacies"
              className={cn(
                buttonVariants({ size: "lg" }),
                "min-h-11 gap-1.5 text-base"
              )}
            >
              <MapPin className="size-4" aria-hidden />
              Find pharmacies
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>

          <ul className="mt-5 grid grid-cols-2 gap-2.5 md:grid-cols-4">
            {PHARMACY_STRIP.map((item) => (
              <li
                key={item.name}
                className="relative aspect-[4/5] overflow-hidden rounded-2xl ring-1 ring-border sm:aspect-[5/6]"
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-trust/85 via-trust/20 to-transparent" />
                <p className="absolute inset-x-0 bottom-0 p-3 text-sm font-semibold text-trust-foreground">
                  {item.name}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Compact trust band with photo backdrop */}
      <section className="relative isolate overflow-hidden">
        <Image
          src="/images/pharmacy-aisle.webp"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/92 via-primary/85 to-trust/80" aria-hidden />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-9">
          <div className="max-w-xl text-primary-foreground">
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Ready to compare prices?
            </h2>
            <p className="mt-1.5 text-primary-foreground/90">
              Trump RX is a discount provider — not insurance. Always compare
              with your plan copay before you fill.
            </p>
          </div>
          <Link
            href="/search"
            className={cn(
              buttonVariants({ variant: "secondary", size: "lg" }),
              "min-h-11 shrink-0 gap-1.5 border-0 bg-background text-base text-foreground hover:bg-background/90"
            )}
          >
            Compare prices
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </section>
    </div>
  );
}

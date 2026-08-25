import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { DrugSearch } from "@/components/search/drug-search";
import { buttonVariants } from "@/components/ui/button";
import { prisma } from "@/lib/db";
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
      {/* First viewport: brand + one headline + one line + search + full-bleed photo */}
      <section className="relative isolate min-h-[calc(100dvh-7.5rem)] overflow-hidden sm:min-h-[calc(100dvh-6.5rem)]">
        <Image
          src="/images/hero-pharmacy.webp"
          alt=""
          fill
          priority
          className="object-cover object-[center_32%] animate-trx-ken-burns"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-trust/95 via-trust/78 to-trust/35"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-trust via-transparent to-trust/25"
          aria-hidden
        />

        <div className="relative mx-auto flex min-h-[calc(100dvh-7.5rem)] max-w-6xl flex-col justify-end px-4 pb-14 pt-16 sm:min-h-[calc(100dvh-6.5rem)] sm:justify-center sm:px-6 sm:pb-16 sm:pt-12">
          <div className="max-w-3xl text-trust-foreground">
            <p className="animate-trx-fade-up font-display text-6xl font-bold uppercase leading-[0.85] tracking-tight sm:text-7xl md:text-[6.5rem]">
              Trump RX
            </p>
            <h1 className="animate-trx-fade-up-delay mt-4 max-w-xl font-display text-3xl font-semibold uppercase leading-[1.05] tracking-tight text-trust-foreground sm:mt-5 sm:text-4xl md:text-5xl">
              Lower prices. Local pharmacies.
            </h1>
            <p className="animate-trx-fade-up-delay-2 mt-4 max-w-md text-base leading-relaxed text-trust-foreground/95 sm:text-lg">
              Compare cash-discount prices near you, then show a digital coupon
              at the counter.
            </p>
          </div>

          <div className="animate-trx-scale-in mt-7 max-w-2xl sm:mt-8">
            <DrugSearch size="hero" autoFocus />
          </div>
        </div>
      </section>

      <section
        aria-labelledby="popular-heading"
        className="border-b border-border bg-surface"
      >
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <h2
              id="popular-heading"
              className="font-display text-2xl font-semibold uppercase tracking-tight sm:text-3xl"
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
          <ul className="mt-4 flex flex-wrap gap-2">
            {popular.map((d) => (
              <li key={d.id}>
                <Link
                  href={`/search?drug=${d.id}`}
                  className="inline-flex min-h-10 items-center border border-border bg-card px-3 text-sm font-medium transition-colors hover:border-primary/40 hover:bg-accent"
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

      <section aria-labelledby="how-it-works" className="bg-background">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="max-w-2xl">
            <h2
              id="how-it-works"
              className="font-display text-3xl font-semibold uppercase tracking-tight sm:text-4xl"
            >
              Three steps to the counter
            </h2>
            <p className="mt-2 text-muted-foreground">
              Search, compare local prices, hand the pharmacist a ready coupon.
            </p>
          </div>

          <ol className="mt-8 space-y-0 divide-y divide-border border-y border-border">
            {STEPS.map((step) => (
              <li
                key={step.n}
                className="grid gap-4 py-6 sm:grid-cols-[minmax(0,12rem)_1fr] sm:items-center sm:gap-8 md:grid-cols-[minmax(0,16rem)_1fr]"
              >
                <div className="relative aspect-[5/4] overflow-hidden sm:aspect-[4/3]">
                  <Image
                    src={step.image}
                    alt={step.alt}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, 16rem"
                  />
                </div>
                <div>
                  <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                    {step.n}
                  </p>
                  <h3 className="mt-1 font-display text-2xl font-semibold uppercase tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-lg text-base leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        aria-labelledby="pharmacies-heading"
        className="relative isolate overflow-hidden border-y border-border"
      >
        <Image
          src="/images/pharmacy-aisle.webp"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-trust/88" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="max-w-xl text-trust-foreground">
            <h2
              id="pharmacies-heading"
              className="font-display text-3xl font-semibold uppercase tracking-tight sm:text-4xl"
            >
              Real pharmacies near you
            </h2>
            <p className="mt-3 text-trust-foreground/90">
              Sort by distance or lowest coupon price — then save your preferred
              stores.
            </p>
            <Link
              href="/pharmacies"
              className={cn(
                buttonVariants({ size: "lg" }),
                "mt-6 inline-flex min-h-11 gap-1.5 text-base"
              )}
            >
              <MapPin className="size-4" aria-hidden />
              Find pharmacies
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-primary">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-12">
          <div className="max-w-xl text-primary-foreground">
            <h2 className="font-display text-3xl font-semibold uppercase tracking-tight">
              Ready to compare prices?
            </h2>
            <p className="mt-2 text-primary-foreground/90">
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

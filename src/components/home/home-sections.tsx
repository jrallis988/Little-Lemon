import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Pill, Stethoscope } from "lucide-react";

import { CLINICAL_SERVICES, PRESCRIPTIONS, PRODUCTS } from "@/lib/data/catalog";
import { Button } from "@/components/ui/button";
import { PrescriptionTracker } from "@/components/pharmacy/prescription-tracker";
import { ProductCard, RewardsBanner } from "@/components/shop/product-discovery";

export function HomeHero() {
  return (
    <section className="relative isolate min-h-[min(92vh,760px)] overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero-pharmacy.svg"
          alt="Bright pharmacy counter ready for prescription pickup"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/78 to-background/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/20" />
      </div>

      <div className="mx-auto flex min-h-[min(92vh,760px)] max-w-6xl items-center px-4 py-16 sm:px-6">
        <div className="max-w-xl">
          <p className="animate-rise font-display text-5xl font-bold tracking-tight text-brand sm:text-6xl md:text-7xl">
            Walgreens
          </p>
          <h1 className="animate-rise-delay mt-4 font-display text-3xl font-semibold tracking-tight text-foreground text-balance sm:text-4xl">
            Your pharmacy, clarified.
          </h1>
          <p className="animate-rise-delay-2 mt-4 max-w-md text-base text-muted-foreground sm:text-lg">
            Refill faster, track every fill, and shop health essentials with
            myWalgreens rewards in view.
          </p>
          <div className="animate-rise-delay-2 mt-8 flex flex-wrap gap-3">
            <Button
              size="lg"
              className="bg-brand text-brand-foreground hover:bg-brand/90"
              nativeButton={false}
              render={<Link href="/pharmacy" />}
            >
              Refill prescriptions
              <ArrowRight className="size-4" aria-hidden />
            </Button>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<Link href="/shop" />}
            >
              Shop health & beauty
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomePharmacyPreview() {
  const featured = PRESCRIPTIONS.filter((rx) => rx.profileId === "profile-self").slice(
    0,
    2,
  );

  return (
    <section
      aria-labelledby="home-pharmacy-heading"
      className="mx-auto max-w-6xl px-4 py-16 sm:px-6"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="flex items-center gap-2 text-sm font-medium text-health">
            <Pill className="size-4" aria-hidden />
            Pharmacy dashboard
          </p>
          <h2
            id="home-pharmacy-heading"
            className="mt-2 font-display text-3xl font-semibold tracking-tight"
          >
            See every fill at a glance
          </h2>
          <p className="mt-2 max-w-lg text-muted-foreground">
            Visual tracking from Received to Ready — built for you and the people
            you care for.
          </p>
        </div>
        <Button
          variant="outline"
          nativeButton={false}
          render={<Link href="/pharmacy" />}
        >
          Open pharmacy
        </Button>
      </div>
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {featured.map((rx) => (
          <PrescriptionTracker key={rx.id} prescription={rx} />
        ))}
      </div>
    </section>
  );
}

export function HomeServices() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="border-y border-border/60 bg-surface/70"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="flex items-center gap-2 text-sm font-medium text-health">
          <Stethoscope className="size-4" aria-hidden />
          Clinical services
        </p>
        <h2
          id="services-heading"
          className="mt-2 font-display text-3xl font-semibold tracking-tight"
        >
          Care you can schedule today
        </h2>
        <p className="mt-2 max-w-lg text-muted-foreground">
          Vaccines and testing sit beside pharmacy — not buried in a separate maze.
        </p>
        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {CLINICAL_SERVICES.map((service) => (
            <li key={service.id}>
              <Link
                href={service.href}
                className="block transition-transform duration-300 hover:-translate-y-0.5"
              >
                <h3 className="font-display text-xl font-semibold tracking-tight">
                  {service.name}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {service.description}
                </p>
                <p className="mt-3 text-xs font-medium text-foreground">
                  {service.durationMinutes} min
                  {service.availableToday ? " · Available today" : " · Next available soon"}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function HomeShopPreview() {
  return (
    <section
      id="rewards"
      aria-labelledby="home-shop-heading"
      className="mx-auto max-w-6xl px-4 py-16 sm:px-6"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2
            id="home-shop-heading"
            className="font-display text-3xl font-semibold tracking-tight"
          >
            Essentials, rewarded
          </h2>
          <p className="mt-2 max-w-lg text-muted-foreground">
            Discover health and beauty with points earned on every eligible item.
          </p>
        </div>
        <Button
          variant="outline"
          nativeButton={false}
          render={<Link href="/shop" />}
        >
          Browse shop
        </Button>
      </div>
      <RewardsBanner className="mt-6" />
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {PRODUCTS.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

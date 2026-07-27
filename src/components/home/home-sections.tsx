import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  Pill,
  Smartphone,
  Syringe,
  Truck,
} from "lucide-react";

import {
  LANDING_CATEGORIES,
  LANDING_DEALS,
  LANDING_HEALTH,
} from "@/lib/data/landing";
import { PRESCRIPTIONS, REWARDS } from "@/lib/data/catalog";
import { formatPoints } from "@/lib/pharmacy";
import { Button } from "@/components/ui/button";
import { PrescriptionTracker } from "@/components/pharmacy/prescription-tracker";
import { ProductCard } from "@/components/shop/product-discovery";
import { PRODUCTS } from "@/lib/data/catalog";

export function HomeHero() {
  return (
    <section className="relative isolate min-h-[min(78vh,640px)] overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero-pharmacist.jpg"
          alt="Pharmacist helping a customer at the prescription counter"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
      </div>

      <div className="mx-auto flex min-h-[min(78vh,640px)] max-w-6xl items-center px-4 py-16 sm:px-6 sm:py-20">
        <div className="max-w-xl text-white">
          <p className="animate-rise font-display text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl">
            Walgreens RX
          </p>
          <h1 className="animate-rise-delay mt-4 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Pharmacy, health & everyday essentials
          </h1>
          <p className="animate-rise-delay-2 mt-4 max-w-md text-base text-white/85 sm:text-lg">
            Refill at your store, schedule vaccines, and shop beauty & wellness
            with myWalgreens rewards built in.
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
              className="border-white/50 bg-white/10 text-white hover:bg-white/20 hover:text-white"
              nativeButton={false}
              render={<Link href="/shop" />}
            >
              Shop now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeQuickPaths() {
  const paths = [
    {
      href: "/pharmacy",
      label: "Refill Rx",
      detail: "Track & refill",
      icon: Pill,
    },
    {
      href: "/pharmacy#services",
      label: "Flu shots",
      detail: "Book today",
      icon: Syringe,
    },
    {
            href: "/deals",
      label: "Weekly deals",
      detail: "Save in store",
      icon: Smartphone,
    },
    {
      href: "/stores",
      label: "Find a store",
      detail: "Hours & pickup",
      icon: MapPin,
    },
  ] as const;

  return (
    <nav
      aria-label="Popular destinations"
      className="border-b border-border/70 bg-surface-elevated"
    >
      <ul className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-y divide-border/70 sm:grid-cols-4 sm:divide-y-0">
        {paths.map((path) => (
          <li key={path.href}>
            <Link
              href={path.href}
              className="flex items-center gap-3 px-4 py-4 transition-colors hover:bg-muted/60 sm:px-6"
            >
              <path.icon className="size-5 text-brand" aria-hidden />
              <span>
                <span className="block text-sm font-semibold text-foreground">
                  {path.label}
                </span>
                <span className="block text-xs text-muted-foreground">
                  {path.detail}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function HomeDeals() {
  return (
    <section
      aria-labelledby="deals-heading"
      className="relative isolate overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/vitamins-aisle.jpg"
          alt="Health and wellness products on store shelves"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-brand/88" />
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 text-brand-foreground sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-sm font-medium text-white/80">Summer savings now</p>
          <h2
            id="deals-heading"
            className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Deals worth stopping for
          </h2>
          <p className="mt-3 max-w-md text-white/85">
            Pickup discounts, seasonal essentials, and myWalgreens exclusive
            offers — inspired by what&apos;s live on Walgreens.com.
          </p>
          <Button
            className="mt-6 bg-white text-brand hover:bg-white/90"
            nativeButton={false}
            render={<Link href="/shop" />}
          >
            Shop all deals
            <ArrowRight className="size-4" aria-hidden />
          </Button>
        </div>

        <ul className="divide-y divide-white/20 border-y border-white/20">
          {LANDING_DEALS.map((deal) => (
            <li key={deal.id}>
              <Link
                href={deal.href}
                className="group flex items-start justify-between gap-4 py-4 transition-opacity hover:opacity-90"
              >
                <span>
                  <span className="block font-display text-lg font-semibold">
                    {deal.title}
                  </span>
                  <span className="mt-1 block text-sm text-white/80">
                    {deal.detail}
                  </span>
                </span>
                <ArrowRight
                  className="mt-1 size-4 shrink-0 opacity-70 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function HomeHealthMatters() {
  return (
    <section
      id="services"
      aria-labelledby="health-matters-heading"
      className="bg-surface"
    >
      <div className="mx-auto grid max-w-6xl gap-0 lg:grid-cols-2">
        <div className="relative min-h-[320px] lg:min-h-full">
          <Image
            src="/images/health-flu.jpg"
            alt="Pharmacist giving a flu vaccine to a patient in the pharmacy"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="flex flex-col justify-center px-4 py-12 sm:px-8 lg:px-12">
          <h2
            id="health-matters-heading"
            className="font-display text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Because your health matters
          </h2>
          <p className="mt-3 max-w-md text-muted-foreground">
            Same neighborhood care you know from Walgreens RX — vaccines, Rx
            tracking, and clinical services in one place.
          </p>
          <ul className="mt-8 space-y-6">
            {LANDING_HEALTH.map((story) => (
              <li key={story.id} className="border-b border-border/70 pb-6 last:border-0">
                <h3 className="font-display text-xl font-semibold tracking-tight">
                  {story.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {story.description}
                </p>
                <Link
                  href={story.href}
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
                >
                  {story.cta}
                  <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function HomeCategories() {
  return (
    <section
      aria-labelledby="categories-heading"
      className="mx-auto max-w-6xl px-4 py-14 sm:px-6"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2
            id="categories-heading"
            className="font-display text-3xl font-semibold tracking-tight"
          >
            Featured categories
          </h2>
          <p className="mt-2 text-muted-foreground">
            Jump into the aisles people visit most.
          </p>
        </div>
        <Button variant="outline" nativeButton={false} render={<Link href="/shop" />}>
          Browse shop
        </Button>
      </div>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {LANDING_CATEGORIES.map((category) => (
          <li key={category.id}>
            <Link
              href={category.href}
              className="group relative block aspect-[4/5] overflow-hidden rounded-2xl"
            >
              <Image
                src={category.imageUrl}
                alt={category.imageAlt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 p-4">
                <span className="font-display text-xl font-semibold text-white">
                  {category.name}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function HomePharmacyPreview() {
  const featured = PRESCRIPTIONS.filter(
    (rx) => rx.profileId === "profile-self",
  ).slice(0, 2);

  return (
    <section
      aria-labelledby="home-pharmacy-heading"
      className="border-y border-border/60 bg-surface/80"
    >
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl sm:aspect-[5/4] lg:aspect-auto lg:min-h-[420px]">
          <Image
            src="/images/family-care.jpg"
            alt="Family staying on top of everyday health needs"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
        </div>
        <div>
          <p className="flex items-center gap-2 text-sm font-medium text-health">
            <Pill className="size-4" aria-hidden />
            Pharmacy for you & caregivers
          </p>
          <h2
            id="home-pharmacy-heading"
            className="mt-2 font-display text-3xl font-semibold tracking-tight"
          >
            See every fill at a glance
          </h2>
          <p className="mt-2 max-w-lg text-muted-foreground">
            Visual tracking from Received to Ready — switch profiles when you
            manage prescriptions for someone you care for.
          </p>
          <div className="mt-6 grid gap-4">
            {featured.map((rx) => (
              <PrescriptionTracker key={rx.id} prescription={rx} />
            ))}
          </div>
          <Button
            className="mt-6 bg-brand text-brand-foreground hover:bg-brand/90"
            nativeButton={false}
            render={<Link href="/pharmacy" />}
          >
            Open pharmacy dashboard
          </Button>
        </div>
      </div>
    </section>
  );
}

export function HomePickup() {
  return (
    <section aria-labelledby="pickup-heading" className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/pickup-order.jpg"
          alt="Customer picking up a pharmacy order bag at the counter"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/30" />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-16 text-white sm:px-6 lg:py-20">
        <p className="flex items-center gap-2 text-sm font-medium text-white/80">
          <Truck className="size-4" aria-hidden />
          Get it faster
        </p>
        <h2
          id="pickup-heading"
          className="mt-2 max-w-xl font-display text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          30-minute pickup or 1-hour delivery
        </h2>
        <p className="mt-3 max-w-lg text-white/85">
          Order online, then grab it curbside, drive-thru, or in store — free
          delivery on qualifying $35+ orders in many areas.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button
            size="lg"
            className="bg-brand text-brand-foreground hover:bg-brand/90"
            nativeButton={false}
            render={<Link href="/shop" />}
          >
            Start an order
          </Button>
          <p className="flex items-center gap-2 self-center text-sm text-white/80">
            <MapPin className="size-4" aria-hidden />
            Ready at your neighborhood Walgreens RX
          </p>
        </div>
      </div>
    </section>
  );
}

export function HomeShopPreview() {
  return (
    <section
      id="rewards"
      aria-labelledby="home-shop-heading"
      className="mx-auto max-w-6xl px-4 py-14 sm:px-6"
    >
      <div className="grid gap-6 overflow-hidden rounded-2xl bg-brand text-brand-foreground lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col justify-center p-6 sm:p-8">
          <h2
            id="home-shop-heading"
            className="font-display text-3xl font-semibold tracking-tight"
          >
            myWalgreens rewards
          </h2>
          <p className="mt-3 max-w-md text-white/85">
            Unlock sale prices, earn Walgreens Cash on eligible purchases, and
            keep {formatPoints(REWARDS.pointsBalance)} points working for you —
            just like on Walgreens.com.
          </p>
          <ul className="mt-5 space-y-2 text-sm text-white/90">
            <li>1% Walgreens Cash storewide on eligible buys</li>
            <li>5% on Walgreens branded products</li>
            <li>{REWARDS.pointsToNextReward} points to your next reward</li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              className="w-fit bg-white text-brand hover:bg-white/90"
              nativeButton={false}
              render={<Link href="/shop" />}
            >
              Shop with rewards
            </Button>
            <Button
              variant="outline"
              className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
              nativeButton={false}
              render={<Link href="/photo" />}
            >
              Photo center
            </Button>
          </div>
        </div>
        <div className="relative min-h-[240px]">
          <Image
            src="/images/beauty-shop.jpg"
            alt="Shopper browsing health and beauty products"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="font-display text-2xl font-semibold tracking-tight">
            Popular right now
          </h3>
          <p className="mt-1 text-muted-foreground">
            Health & beauty picks with points on every eligible item.
          </p>
        </div>
        <Button variant="outline" nativeButton={false} render={<Link href="/shop" />}>
          View all
        </Button>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {PRODUCTS.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

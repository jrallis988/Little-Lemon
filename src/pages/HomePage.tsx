import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Tag } from "lucide-react"
import { ALL_BRANDS, PRODUCTS } from "@/data/products"
import { ProductCard } from "@/components/catalog/ProductCard"
import { Button } from "@/components/ui/button"
import { discountPercent } from "@/lib/utils"
import { useFilterStore } from "@/stores/filterStore"
import { useDocumentMeta } from "@/hooks/useDocumentMeta"

const HERO_SLIDES = [
  {
    id: "women",
    title: "Brand names for less",
    copy: "Designer and brand-name women’s finds — priced for the hunt.",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1800&q=82",
    primary: { label: "Shop Women", to: "/department/women" },
    secondary: { label: "New finds", to: "/catalog?sort=newest" },
  },
  {
    id: "handbags",
    title: "Luxe bags. Wow prices.",
    copy: "Score the carryall you’ve been hunting — new styles land daily.",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1800&q=82",
    primary: { label: "Shop Handbags", to: "/department/handbags" },
    secondary: { label: "Designer Shop", to: "/designer-shop" },
  },
  {
    id: "footwear",
    title: "Step into the season",
    copy: "Brand-name shoes at Marshalls prices — sizes go fast.",
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1800&q=82",
    primary: { label: "Shop Footwear", to: "/department/footwear" },
    secondary: { label: "Clearance", to: "/clearance" },
  },
  {
    id: "home",
    title: "Wow finds for every room",
    copy: "Tabletop, decor, and designer home — never the same aisle twice.",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1800&q=82",
    primary: { label: "Shop Home", to: "/department/home" },
    secondary: { label: "Under $50", to: "/under-50" },
  },
  {
    id: "clearance",
    title: "Up to 70% off",
    copy: "Final markdowns on already wow prices — while supplies last.",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1800&q=82",
    primary: { label: "Shop Clearance", to: "/clearance" },
    secondary: { label: "Shop All", to: "/catalog" },
  },
]

const DEPARTMENTS = [
  {
    label: "Women",
    to: "/department/women",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&h=600&q=80",
  },
  {
    label: "Men",
    to: "/department/men",
    image:
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=800&h=600&q=80",
  },
  {
    label: "Home",
    to: "/department/home",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&h=600&q=80",
  },
  {
    label: "Shoes",
    to: "/department/footwear",
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&h=600&q=80",
  },
  {
    label: "Beauty",
    to: "/department/beauty",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&h=600&q=80",
  },
  {
    label: "Kids",
    to: "/department/boys-girls",
    image:
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=800&h=600&q=80",
  },
  {
    label: "Handbags",
    to: "/department/handbags",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&h=600&q=80",
  },
  {
    label: "Clearance",
    to: "/clearance",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&h=600&q=80",
  },
]

function HeroCarousel() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((i) => (i + 1) % HERO_SLIDES.length)
    }, 6500)
    return () => window.clearInterval(timer)
  }, [])

  const slide = HERO_SLIDES[index]!

  return (
    <section className="relative min-h-[min(78vh,40rem)] overflow-hidden bg-navy text-white">
      <img
        key={slide.id}
        src={slide.image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover animate-fade-in"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

      <div className="relative shelf-container flex min-h-[min(78vh,40rem)] flex-col justify-end pb-16 pt-20 md:justify-center md:pb-20 md:pt-24">
        <div className="max-w-xl animate-slide-up">
          <p className="marshalls-wordmark text-[clamp(2.4rem,6vw,3.75rem)] text-white drop-shadow-sm">
            <span className="m-wide">M</span>arshalls
          </p>
          <h1 className="mt-4 font-display text-3xl font-bold italic leading-tight text-balance text-white sm:text-4xl md:text-5xl">
            {slide.title}
          </h1>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/85 sm:text-base">
            {slide.copy}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="bg-white text-navy hover:bg-white/90"
            >
              <Link to={slide.primary.to}>{slide.primary.label}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/50 bg-white/10 text-white backdrop-blur hover:bg-white/20 hover:text-white"
            >
              <Link to={slide.secondary.to}>
                {slide.secondary.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-5 left-0 right-0">
        <div className="shelf-container flex items-center gap-3">
          <button
            type="button"
            aria-label="Previous slide"
            className="rounded-full border border-white/30 bg-black/30 p-2 text-white backdrop-blur hover:bg-black/50"
            onClick={() =>
              setIndex((i) => (i - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
            }
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex gap-1.5">
            {HERO_SLIDES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                onClick={() => setIndex(i)}
                className={
                  i === index
                    ? "h-2 w-6 rounded-full bg-white"
                    : "h-2 w-2 rounded-full bg-white/40 hover:bg-white/70"
                }
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Next slide"
            className="rounded-full border border-white/30 bg-black/30 p-2 text-white backdrop-blur hover:bg-black/50"
            onClick={() => setIndex((i) => (i + 1) % HERO_SLIDES.length)}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  )
}

export function HomePage() {
  useDocumentMeta({
    title: "Marshalls | Brand Names for Less",
    description:
      "Shop designer and brand-name apparel, shoes, home, and more at Marshalls. New finds drop daily.",
  })

  const toggleBrand = useFilterStore((s) => s.toggleBrand)
  const clearFilters = useFilterStore((s) => s.clearFilters)

  const featured = useMemo(
    () =>
      [...PRODUCTS]
        .sort(
          (a, b) =>
            discountPercent(b.compareAt, b.price) -
            discountPercent(a.compareAt, a.price),
        )
        .slice(0, 4),
    [],
  )

  const designer = useMemo(
    () => PRODUCTS.filter((p) => p.brandTier === "Designer").slice(0, 4),
    [],
  )

  const underFifty = useMemo(
    () => PRODUCTS.filter((p) => p.price <= 50).slice(0, 4),
    [],
  )

  const brandCounts = useMemo(() => {
    const map = new Map<string, number>()
    for (const p of PRODUCTS) {
      map.set(p.brand, (map.get(p.brand) ?? 0) + 1)
    }
    return ALL_BRANDS.map((brand) => ({
      brand,
      count: map.get(brand) ?? 0,
    })).filter((b) => b.count > 0)
  }, [])

  return (
    <div>
      <HeroCarousel />

      <section className="shelf-container py-10 md:py-12">
        <div className="mb-5 flex items-end justify-between gap-3">
          <h2 className="font-display text-xl font-bold italic text-navy md:text-2xl">
            Shop by department
          </h2>
          <Link
            to="/fit-quiz"
            className="text-sm font-semibold text-navy underline-offset-2 hover:underline"
          >
            Fit quiz
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:gap-4">
          {DEPARTMENTS.map((dept) => (
            <Link
              key={dept.label}
              to={dept.to}
              className="group relative aspect-[4/3] overflow-hidden rounded-md no-underline shadow-soft"
            >
              <img
                src={dept.image}
                alt=""
                className="h-full w-full object-cover transition-transform duration-500 ease-retail group-hover:scale-105"
              />
              <div className="dept-tile-label">{dept.label}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface-muted/50">
        <div className="shelf-container py-12 md:py-14">
          <h2 className="section-rule-title justify-center text-center font-display text-2xl font-bold italic text-navy md:text-3xl">
            This Week&apos;s Best Finds
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-sm text-muted-foreground">
            Compare-at prices already show the wow — these are the deepest cuts right now.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Button asChild>
              <Link to="/catalog?sort=discount">
                Shop All
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Designer Shop + Under $50 */}
      <section className="shelf-container grid gap-10 py-12 md:grid-cols-2 md:py-14">
        <div>
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <p className="inline-flex items-center gap-1.5 text-2xs font-bold uppercase tracking-[0.12em] text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                Designer Shop
              </p>
              <h2 className="mt-1 font-display text-xl font-bold italic text-navy">
                Elevated labels, off-price
              </h2>
            </div>
            <Button
              variant="outline"
              size="sm"
              asChild
            >
              <Link to="/designer-shop">Shop</Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {designer.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

        <div>
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <p className="inline-flex items-center gap-1.5 text-2xs font-bold uppercase tracking-[0.12em] text-primary">
                <Tag className="h-3.5 w-3.5" />
                Under $50
              </p>
              <h2 className="mt-1 font-display text-xl font-bold italic text-navy">
                Gift-worthy wow prices
              </h2>
            </div>
            <Button
              variant="outline"
              size="sm"
              asChild
            >
              <Link to="/under-50">Shop</Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {underFifty.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Shoppable brand strip */}
      <section className="border-y border-border bg-surface">
        <div className="shelf-container py-10 md:py-12">
          <div className="mb-6 text-center">
            <p className="text-2xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
              Brands you love
            </p>
            <h2 className="mt-1 font-display text-2xl font-bold italic text-navy">
              Shop by brand
            </h2>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {brandCounts.slice(0, 16).map(({ brand, count }) => (
              <Link
                key={brand}
                to="/catalog"
                onClick={() => {
                  clearFilters()
                  toggleBrand(brand)
                }}
                className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 text-sm no-underline shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lift"
              >
                <span className="font-display font-bold italic text-navy">{brand}</span>
                <span className="rounded-sm bg-secondary px-1.5 py-0.5 text-2xs font-semibold tabular text-muted-foreground">
                  {count}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="shelf-container py-12 md:py-14">
        <div className="grid gap-4 md:grid-cols-2 md:gap-6">
          <div className="flex flex-col justify-between rounded-md border border-border bg-sky-soft/70 px-6 py-8 shadow-soft">
            <div>
              <h2 className="font-display text-2xl font-bold italic text-navy">
                Never the same store twice
              </h2>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                Inventory turns over daily online and in store. Score even more brand-name deals
                near you.
              </p>
            </div>
            <Button asChild className="mt-6 w-fit bg-navy hover:bg-navy/90">
              <Link to="/stores">
                Find a store
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <Link
            to="/clearance"
            className="flex flex-col justify-between rounded-md bg-navy px-6 py-8 text-navy-foreground no-underline shadow-lift transition-transform duration-300 ease-retail hover:scale-[1.01]"
          >
            <div>
              <p className="text-2xs font-bold uppercase tracking-[0.14em] text-white/70">
                Extra markdowns
              </p>
              <p className="mt-2 font-display text-3xl font-bold italic">Clearance</p>
              <p className="mt-1 text-lg font-semibold">Up to 70% off</p>
            </div>
            <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold">
              Shop Now
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </section>

      <section className="border-t border-border bg-surface-muted/40">
        <div className="shelf-container py-12">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-2xs font-bold uppercase tracking-[0.12em] text-primary">
                More to explore
              </p>
              <h2 className="mt-1 font-display text-2xl font-bold italic text-navy">
                Shop the latest
              </h2>
            </div>
            <Button variant="outline" asChild className="hidden sm:inline-flex">
              <Link to="/catalog?sort=newest">View all</Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
            {PRODUCTS.filter((p) => p.isNew).slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

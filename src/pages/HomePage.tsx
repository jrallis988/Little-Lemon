import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Tag } from "lucide-react"
import { ALL_BRANDS, PRODUCTS } from "@/data/products"
import { ProductCard } from "@/components/catalog/ProductCard"
import { Button } from "@/components/ui/button"
import { discountPercent, formatCurrency } from "@/lib/utils"
import { useFilterStore } from "@/stores/filterStore"
import { useDocumentMeta } from "@/hooks/useDocumentMeta"

const HERO_SLIDES = [
  {
    id: "spring",
    eyebrow: "New season finds",
    title: "Spring Style Deals",
    subtitle: "Big Brands. Small Prices.",
    copy: "Designer and brand-name styles at off-price — never the same store twice.",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=80",
    primary: { label: "Shop Women", to: "/catalog?department=Women" },
    secondary: { label: "Shop Men", to: "/catalog?department=Men" },
  },
  {
    id: "handbags",
    eyebrow: "Designer handbags",
    title: "Luxe bags. Wow prices.",
    subtitle: "Coach, Michael Kors & more.",
    copy: "Score the carryall you’ve been hunting — new styles land daily.",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1400&q=80",
    primary: { label: "Shop Bags", to: "/catalog" },
    secondary: { label: "Shop Designer", to: "/catalog" },
  },
  {
    id: "footwear",
    eyebrow: "Fall footwear",
    title: "Step into the season",
    subtitle: "Boots, sneakers & heels.",
    copy: "Brand-name shoes at Marshalls prices — sizes go fast.",
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1400&q=80",
    primary: { label: "Shop Shoes", to: "/catalog?category=Shoes" },
    secondary: { label: "Shop Clearance", to: "/catalog?sort=discount" },
  },
  {
    id: "home",
    eyebrow: "Designer home",
    title: "Wow finds for every room",
    subtitle: "Tabletop, decor & more.",
    copy: "Refresh your space with brand-name home at off-price.",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1400&q=80",
    primary: { label: "Shop Home", to: "/catalog?department=Home" },
    secondary: { label: "Under $50", to: "/catalog" },
  },
  {
    id: "clearance",
    eyebrow: "Clearance rush",
    title: "Up to 70% off",
    subtitle: "Final markdowns this week.",
    copy: "Extra savings on already wow prices — while supplies last.",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=80",
    primary: { label: "Shop Clearance", to: "/catalog?sort=discount" },
    secondary: { label: "Shop All", to: "/catalog" },
  },
  {
    id: "kids",
    eyebrow: "Boys · Girls · Jr's",
    title: "Little looks. Big savings.",
    subtitle: "Clothes, shoes & gear.",
    copy: "Outfit the whole crew without the department-store ticket.",
    image:
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=1400&q=80",
    primary: { label: "Shop Boys", to: "/catalog?department=Boys" },
    secondary: { label: "Shop Girls", to: "/catalog?department=Girls" },
  },
]

const DEPARTMENTS = [
  {
    label: "Women",
    to: "/catalog?department=Women",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&h=600&q=80",
  },
  {
    label: "Men",
    to: "/catalog?department=Men",
    image:
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=800&h=600&q=80",
  },
  {
    label: "Boys",
    to: "/catalog?department=Boys",
    image:
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=800&h=600&q=80",
  },
  {
    label: "Girls",
    to: "/catalog?department=Girls",
    image:
      "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=800&h=600&q=80",
  },
  {
    label: "Jr's",
    to: "/catalog?department=Juniors",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&h=600&q=80",
  },
  {
    label: "Kids",
    to: "/catalog?department=Kids",
    image:
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&h=600&q=80",
  },
  {
    label: "Home",
    to: "/catalog?department=Home",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&h=600&q=80",
  },
  {
    label: "Beauty",
    to: "/catalog?department=Beauty",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&h=600&q=80",
  },
  {
    label: "Pet",
    to: "/catalog?department=Pets",
    image:
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&h=600&q=80",
  },
  {
    label: "Shoes",
    to: "/catalog?category=Shoes",
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&h=600&q=80",
  },
  {
    label: "Accessories",
    to: "/catalog",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&h=600&q=80",
  },
  {
    label: "New Finds",
    to: "/catalog?sort=newest",
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
    <section className="border-b border-border bg-surface-muted/60">
      <div className="shelf-container relative grid items-center gap-8 py-10 md:grid-cols-2 md:gap-10 md:py-14">
        <div className="order-2 md:order-1">
          <p className="text-2xs font-bold uppercase tracking-[0.14em] text-primary">
            {slide.eyebrow}
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold italic leading-tight tracking-tight text-navy sm:text-5xl">
            {slide.title}
          </h1>
          <p className="mt-3 text-lg font-semibold text-foreground">{slide.subtitle}</p>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
            {slide.copy}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to={slide.primary.to}>{slide.primary.label}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-navy text-navy hover:bg-navy/5"
            >
              <Link to={slide.secondary.to}>
                {slide.secondary.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous slide"
              className="rounded-full border border-border bg-surface p-2 shadow-soft hover:bg-secondary"
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
                      ? "h-2 w-6 rounded-full bg-primary"
                      : "h-2 w-2 rounded-full bg-primary/25 hover:bg-primary/40"
                  }
                />
              ))}
            </div>
            <button
              type="button"
              aria-label="Next slide"
              className="rounded-full border border-border bg-surface p-2 shadow-soft hover:bg-secondary"
              onClick={() => setIndex((i) => (i + 1) % HERO_SLIDES.length)}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="order-1 overflow-hidden rounded-md shadow-lift md:order-2">
          <img
            key={slide.id}
            src={slide.image}
            alt=""
            className="aspect-[4/3] w-full object-cover animate-fade-in md:aspect-[5/4]"
          />
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
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
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
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
            {featured.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.slug}`}
                className="group text-foreground no-underline"
              >
                <div className="overflow-hidden rounded-md bg-white shadow-soft transition-shadow hover:shadow-lift">
                  <div className="aspect-[3/4] overflow-hidden bg-[#f3f3f3]">
                    <img
                      src={product.images[0]}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="space-y-1 p-3">
                    <p className="line-clamp-1 text-sm font-semibold">
                      {product.brand} {product.name.split(" ").slice(0, 2).join(" ")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Compare at {formatCurrency(product.compareAt)}
                    </p>
                    <p className="text-sm font-bold text-primary">
                      Our price {formatCurrency(product.price)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Button asChild>
              <Link to="/catalog">
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
              <Link to="/shop/designer">Shop</Link>
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
              <Link to="/shop/under-50">Shop</Link>
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
        <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-stretch">
          <div className="rounded-md border border-border bg-surface-muted/40 px-4 py-6 sm:px-6">
            <p className="text-center text-sm text-muted-foreground">
              Never the same store twice — inventory turns over daily. Find a Marshalls near you
              for even more brand-name deals.
            </p>
          </div>
          <Link
            to="/catalog?sort=discount"
            className="flex flex-col justify-center rounded-md bg-primary px-6 py-8 text-primary-foreground no-underline shadow-lift transition-transform hover:scale-[1.01]"
          >
            <p className="font-display text-2xl font-bold italic">Clearance</p>
            <p className="mt-1 text-lg font-semibold">Up to 70% Off</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold">
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

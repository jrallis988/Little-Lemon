import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { ALL_BRANDS, PRODUCTS } from "@/data/products"
import { ProductCard } from "@/components/catalog/ProductCard"
import { Button } from "@/components/ui/button"
import { discountPercent, formatCurrency } from "@/lib/utils"
import { useFilterStore } from "@/stores/filterStore"

const HERO_SLIDES = [
  {
    id: "spring",
    eyebrow: "New season finds",
    title: "Spring Style Deals",
    subtitle: "Big Brands. Small Prices.",
    copy: "Designer and brand-name styles at off-price — never the same store twice.",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
    primary: { label: "Shop Women", to: "/catalog?department=Women" },
    secondary: { label: "Shop Men", to: "/catalog?department=Men" },
  },
  {
    id: "home",
    eyebrow: "Home refresh",
    title: "Wow finds for every room",
    subtitle: "Designer looks. Marshalls prices.",
    copy: "Score tabletop, decor, and bedding before it walks out the door.",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
    primary: { label: "Shop Home", to: "/catalog?department=Home" },
    secondary: { label: "Shop Clearance", to: "/catalog?sort=discount" },
  },
  {
    id: "shoes",
    eyebrow: "Step into savings",
    title: "Shoes & bags worth the hunt",
    subtitle: "Brand names. Fresh drops daily.",
    copy: "From everyday sneakers to evening heels — new styles land often.",
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1200&q=80",
    primary: { label: "Shop Shoes", to: "/catalog?category=Shoes" },
    secondary: { label: "Shop Bags", to: "/catalog" },
  },
]

const DEPARTMENTS = [
  {
    label: "Women",
    to: "/catalog?department=Women",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80",
  },
  {
    label: "Men",
    to: "/catalog?department=Men",
    image:
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=800&q=80",
  },
  {
    label: "Home",
    to: "/catalog?department=Home",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
  },
  {
    label: "Shoes",
    to: "/catalog?category=Shoes",
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80",
  },
  {
    label: "Beauty",
    to: "/catalog?department=Beauty",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
  },
  {
    label: "Kids",
    to: "/catalog?department=Kids",
    image:
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=800&q=80",
  },
  {
    label: "Accessories",
    to: "/catalog",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
  },
  {
    label: "New Finds",
    to: "/catalog?sort=newest",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
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
    <section className="border-b border-border bg-sky-soft/40">
      <div className="shelf-container relative grid items-center gap-8 py-10 md:grid-cols-2 md:gap-10 md:py-14">
        <div className="order-2 md:order-1">
          <p className="text-2xs font-bold uppercase tracking-[0.14em] text-primary">
            {slide.eyebrow}
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold italic leading-tight tracking-tight text-primary sm:text-5xl">
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
              className="border-primary text-primary hover:bg-primary/5"
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
              className="rounded-full border border-border bg-surface p-2 text-foreground shadow-soft hover:bg-secondary"
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
                      : "h-2 w-2 rounded-full bg-primary/25"
                  }
                />
              ))}
            </div>
            <button
              type="button"
              aria-label="Next slide"
              className="rounded-full border border-border bg-surface p-2 text-foreground shadow-soft hover:bg-secondary"
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
  const toggleBrand = useFilterStore((s) => s.toggleBrand)
  const clearFilters = useFilterStore((s) => s.clearFilters)

  const featured = [...PRODUCTS]
    .sort(
      (a, b) =>
        discountPercent(b.compareAt, b.price) -
        discountPercent(a.compareAt, a.price),
    )
    .slice(0, 4)

  return (
    <div>
      <HeroCarousel />

      <section className="shelf-container py-10 md:py-14">
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
              <div className="absolute inset-x-0 bottom-0 bg-primary/85 px-3 py-2.5 backdrop-blur-[2px] transition-colors group-hover:bg-sky">
                <span className="font-semibold text-white">{dept.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface-muted/50">
        <div className="shelf-container py-12 md:py-14">
          <h2 className="section-rule-title justify-center text-center font-display text-2xl font-bold italic text-primary md:text-3xl">
            This Week&apos;s Best Finds
          </h2>

          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
            {featured.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.slug}`}
                className="group text-foreground no-underline"
              >
                <div className="overflow-hidden rounded-md bg-white shadow-soft">
                  <div className="aspect-[3/4] overflow-hidden bg-surface-muted">
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
                    <p className="text-sm font-bold">
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

      <section className="shelf-container py-12 md:py-14">
        <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-stretch">
          <div className="rounded-md border border-border bg-surface px-4 py-6 shadow-soft sm:px-6">
            <p className="mb-5 text-center text-2xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
              Brands you love
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
              {ALL_BRANDS.map((brand) => (
                <Link
                  key={brand}
                  to="/catalog"
                  onClick={() => {
                    clearFilters()
                    toggleBrand(brand)
                  }}
                  className="rounded-sm px-2 py-1 font-display text-sm font-bold italic tracking-tight text-muted-foreground/80 no-underline transition-colors hover:bg-sky-soft hover:text-primary sm:text-base"
                >
                  {brand}
                </Link>
              ))}
            </div>
          </div>

          <Link
            to="/catalog?sort=discount"
            className="flex flex-col justify-center rounded-md bg-primary px-6 py-8 text-primary-foreground no-underline shadow-lift transition-colors hover:bg-primary/90"
          >
            <p className="font-display text-2xl font-bold italic">Clearance</p>
            <p className="mt-1 text-lg font-semibold">Up to 70% Off</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-sky-soft">
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
              <p className="text-2xs font-bold uppercase tracking-[0.12em] text-sky">
                More to explore
              </p>
              <h2 className="mt-1 font-display text-2xl font-bold italic text-primary">
                Shop the latest
              </h2>
            </div>
            <Button
              variant="outline"
              asChild
              className="hidden border-primary text-primary sm:inline-flex"
            >
              <Link to="/catalog?sort=newest">View all</Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
            {PRODUCTS.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

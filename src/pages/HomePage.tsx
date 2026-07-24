import { Link } from "react-router-dom"
import { ArrowRight, Sparkles, Store, Truck } from "lucide-react"
import { PRODUCTS } from "@/data/products"
import { ProductCard } from "@/components/catalog/ProductCard"
import { Button } from "@/components/ui/button"
import { discountPercent } from "@/lib/utils"

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
      "https://images.unsplash.com/photo-1490570474972-eeaa23d58828?auto=format&fit=crop&w=800&q=80",
  },
  {
    label: "Kids",
    to: "/catalog?department=Kids",
    image:
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=800&q=80",
  },
  {
    label: "Home",
    to: "/catalog?department=Home",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
  },
]

export function HomePage() {
  const featured = [...PRODUCTS]
    .sort(
      (a, b) =>
        discountPercent(b.compareAt, b.price) -
        discountPercent(a.compareAt, a.price),
    )
    .slice(0, 4)

  const justIn = PRODUCTS.filter((p) => p.isNew).slice(0, 4)

  return (
    <div>
      <section className="relative isolate min-h-[72vh] overflow-hidden border-b border-border bg-foreground">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=2000&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/15" />
        <div className="shelf-container relative flex min-h-[72vh] flex-col justify-end pb-14 pt-24 text-white md:pb-18">
          <p className="marshalls-wordmark text-white sm:text-5xl md:text-6xl">
            Marshalls
          </p>
          <h1 className="mt-3 max-w-xl font-display text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl md:text-5xl">
            Brand names for less.
          </h1>
          <p className="mt-3 max-w-lg text-base leading-relaxed text-white/85 sm:text-lg">
            The thrill of the find — designer and brand-name styles at off-price,
            with new surprises every day.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/catalog">
                Shop now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/50 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <Link to="/catalog?sort=discount">Shop clearance</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-surface-muted">
        <div className="shelf-container grid gap-6 py-5 sm:grid-cols-3">
          {[
            {
              icon: Sparkles,
              title: "Never the same twice",
              copy: "Fresh finds land daily — that’s the treasure hunt.",
            },
            {
              icon: Truck,
              title: "Free shipping $89+",
              copy: "Easy returns in store or by mail.",
            },
            {
              icon: Store,
              title: "1,000+ stores",
              copy: "Find a Marshalls near you for even more deals.",
            },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-3">
              <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-bold">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="shelf-container py-12 md:py-16">
        <div className="mb-6">
          <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
            Shop by department
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Start your hunt — Women, Men, Kids, Home & more.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {DEPARTMENTS.map((dept) => (
            <Link
              key={dept.label}
              to={dept.to}
              className="group relative aspect-[4/5] overflow-hidden rounded-md no-underline shadow-soft"
            >
              <img
                src={dept.image}
                alt=""
                className="h-full w-full object-cover transition-transform duration-500 ease-retail group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <span className="absolute bottom-3 left-3 font-display text-lg font-bold text-white">
                {dept.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface-muted/60">
        <div className="shelf-container py-12 md:py-16">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-2xs font-bold uppercase tracking-[0.1em] text-primary">
                Today’s best deals
              </p>
              <h2 className="mt-1 font-display text-2xl font-bold tracking-tight md:text-3xl">
                Wow prices you’ll love
              </h2>
            </div>
            <Button variant="outline" asChild className="hidden sm:inline-flex">
              <Link to="/catalog?sort=discount">
                View all deals
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {justIn.length > 0 && (
        <section className="shelf-container py-12 md:py-16">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-2xs font-bold uppercase tracking-[0.1em] text-brand-blue">
                Just in
              </p>
              <h2 className="mt-1 font-display text-2xl font-bold tracking-tight md:text-3xl">
                New finds for the hunt
              </h2>
            </div>
            <Button variant="ghost" asChild className="hidden sm:inline-flex">
              <Link to="/catalog?sort=newest">
                Shop new arrivals
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
            {justIn.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { PRODUCTS } from "@/data/products"
import { ProductCard } from "@/components/catalog/ProductCard"
import { Button } from "@/components/ui/button"
import { discountPercent } from "@/lib/utils"

export function HomePage() {
  const featured = [...PRODUCTS]
    .sort(
      (a, b) =>
        discountPercent(b.compareAt, b.price) -
        discountPercent(a.compareAt, a.price),
    )
    .slice(0, 4)

  return (
    <div>
      <section className="relative isolate min-h-[78vh] overflow-hidden border-b border-border">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=2000&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/20" />
        <div className="shelf-container relative flex min-h-[78vh] flex-col justify-end pb-16 pt-28 text-white md:pb-20">
          <p className="font-display text-4xl font-extrabold tracking-[-0.04em] sm:text-5xl md:text-6xl">
            ATELIER <span className="text-[#FF6B7A]">RACK</span>
          </p>
          <h1 className="mt-4 max-w-xl font-display text-2xl font-semibold leading-tight tracking-tight text-balance sm:text-3xl md:text-4xl">
            Designer brands. Off-price. New finds every day.
          </h1>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/80 sm:text-base">
            Contemporary and designer labels at prices that clear the floor — no membership required.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-white text-foreground hover:bg-white/90">
              <Link to="/catalog">
                Shop the rack
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <Link to="/catalog?sort=discount">Shop clearance</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="shelf-container py-14 md:py-18">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-2xs font-semibold uppercase tracking-[0.12em] text-deal">
              Highest savings
            </p>
            <h2 className="mt-1 font-display text-display-sm font-bold tracking-tight">
              Today’s best deals
            </h2>
          </div>
          <Button variant="ghost" asChild className="hidden sm:inline-flex">
            <Link to="/catalog?sort=discount">
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}

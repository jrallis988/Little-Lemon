import { Link, useParams, useLocation } from "react-router-dom"
import { ProductCard } from "@/components/catalog/ProductCard"
import { Button } from "@/components/ui/button"
import {
  curatedMerchProducts,
  MERCH_LANDINGS,
  resolveMerchSlug,
} from "@/data/merchLandings"
import { useDocumentMeta } from "@/hooks/useDocumentMeta"
import { cn } from "@/lib/utils"

const ACCENT_CLASS = {
  navy: "from-navy/90 via-navy/70 to-navy/40",
  deal: "from-primary/90 via-primary/65 to-navy/50",
  sky: "from-sky/90 via-navy/55 to-navy/40",
} as const

export function MerchLandingPage() {
  const { slug: paramSlug } = useParams()
  const location = useLocation()
  const raw =
    paramSlug ??
    location.pathname.replace(/^\//, "").split("/")[0] ??
    ""
  const slug = resolveMerchSlug(raw)
  const landing = slug ? MERCH_LANDINGS[slug] : null

  useDocumentMeta({
    title: landing ? `${landing.title} | Marshalls` : "Shop | Marshalls",
    description: landing?.description ?? "Shop Marshalls merchandising edits.",
  })

  if (!landing) {
    return (
      <div className="shelf-container py-20 text-center">
        <h1 className="font-display text-2xl font-bold">Landing not found</h1>
        <Button asChild className="mt-6">
          <Link to="/catalog">Back to catalog</Link>
        </Button>
      </div>
    )
  }

  const products = curatedMerchProducts(landing.slug)

  return (
    <div>
      <section className="relative isolate overflow-hidden border-b border-border">
        <img
          src={landing.heroImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-r",
            ACCENT_CLASS[landing.accent],
          )}
        />
        <div className="shelf-container relative py-14 md:py-20">
          <p className="text-2xs font-bold uppercase tracking-[0.14em] text-white/85">
            {landing.eyebrow}
          </p>
          <h1 className="mt-2 max-w-xl font-display text-4xl font-bold italic text-white md:text-5xl">
            {landing.title}
          </h1>
          <p className="mt-3 max-w-lg text-base text-white/90 md:text-lg">
            {landing.description}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild className="bg-white text-navy hover:bg-white/90">
              <a href="#curated-grid">{landing.ctaLabel}</a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white/70 bg-transparent text-white hover:bg-white/10"
            >
              <Link to="/catalog">Browse full catalog</Link>
            </Button>
          </div>
        </div>
      </section>

      <div id="curated-grid" className="shelf-container scroll-mt-28 py-10">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl font-bold text-navy">
              Curated for this edit
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Hand-picked assortment — not a catalog filter pass-through.
            </p>
          </div>
          <p className="text-sm font-semibold text-navy" aria-live="polite">
            {products.length} styles
          </p>
        </div>
        {products.length === 0 ? (
          <p className="rounded-md border border-dashed border-border px-4 py-12 text-center text-sm text-muted-foreground">
            This edit is between drops.{" "}
            <Link to="/catalog" className="font-semibold text-navy underline">
              Browse the full catalog
            </Link>
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

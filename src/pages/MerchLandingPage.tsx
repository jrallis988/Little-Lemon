import { Link, useParams } from "react-router-dom"
import { PRODUCTS } from "@/data/products"
import { ProductCard } from "@/components/catalog/ProductCard"
import { Button } from "@/components/ui/button"
import { useDocumentMeta } from "@/hooks/useDocumentMeta"
import { discountPercent } from "@/lib/utils"

const LANDINGS = {
  designer: {
    title: "Designer Shop",
    eyebrow: "Elevated labels",
    description:
      "Coach, Theory, Michael Kors, and more — designer and contemporary brands at off-price.",
    filter: (p: (typeof PRODUCTS)[number]) =>
      p.brandTier === "Designer" || p.price >= 90,
  },
  clearance: {
    title: "Clearance",
    eyebrow: "Extra markdowns",
    description: "Deepest discounts on already wow prices — while supplies last.",
    filter: (p: (typeof PRODUCTS)[number]) =>
      discountPercent(p.compareAt, p.price) >= 45,
  },
  "under-50": {
    title: "Under $50",
    eyebrow: "Gift-ready finds",
    description: "Style under fifty — perfect for everyday and last-minute gifting.",
    filter: (p: (typeof PRODUCTS)[number]) => p.price < 50,
  },
} as const

export function MerchLandingPage() {
  const { slug } = useParams()
  const landing = slug && slug in LANDINGS ? LANDINGS[slug as keyof typeof LANDINGS] : null

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

  const products = PRODUCTS.filter(landing.filter).filter(
    (p) => p.inventory !== "out_of_stock",
  )

  return (
    <div>
      <section className="border-b border-border bg-gradient-to-br from-sky-soft via-surface to-deal-soft">
        <div className="shelf-container py-12 md:py-16">
          <p className="text-2xs font-bold uppercase tracking-[0.12em] text-primary">
            {landing.eyebrow}
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold italic text-navy md:text-5xl">
            {landing.title}
          </h1>
          <p className="mt-3 max-w-xl text-muted-foreground">{landing.description}</p>
          <Button asChild className="mt-6 bg-navy hover:bg-navy/90">
            <Link to="/catalog">Browse full catalog</Link>
          </Button>
        </div>
      </section>

      <div className="shelf-container py-10">
        <p className="mb-6 text-sm text-muted-foreground">
          {products.length} styles
        </p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}

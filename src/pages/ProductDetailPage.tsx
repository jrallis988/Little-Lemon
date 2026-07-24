import { useMemo, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { MapPin, Ruler, ShieldCheck } from "lucide-react"
import { getProductBySlug } from "@/lib/catalog"
import { discountPercent, formatCurrency } from "@/lib/utils"
import { useCartStore } from "@/stores/cartStore"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export function ProductDetailPage() {
  const { slug } = useParams()
  const product = useMemo(() => (slug ? getProductBySlug(slug) : undefined), [slug])
  const addItem = useCartStore((s) => s.addItem)
  const [imageIndex, setImageIndex] = useState(0)
  const [size, setSize] = useState<string | null>(null)
  const [colorwayId, setColorwayId] = useState<string | null>(null)
  const [sizeError, setSizeError] = useState(false)

  if (!product) {
    return (
      <div className="shelf-container py-20 text-center">
        <h1 className="font-display text-2xl font-bold">Product not found</h1>
        <p className="mt-2 text-muted-foreground">
          This style may have sold through. Browse the latest arrivals.
        </p>
        <Button asChild className="mt-6">
          <Link to="/catalog">Back to catalog</Link>
        </Button>
      </div>
    )
  }

  const activeColor = colorwayId ?? product.colorways[0]?.id
  const pct = discountPercent(product.compareAt, product.price)
  const selectedSize = size

  return (
    <div className="shelf-container py-6 md:py-10">
      <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-2xs text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <span>/</span>
        <Link to="/catalog" className="hover:text-foreground">Catalog</Link>
        <span>/</span>
        <span>{product.department}</span>
        <span>/</span>
        <span className="font-medium text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <div className="grid gap-3 sm:grid-cols-[4.5rem_1fr]">
            <div className="order-2 flex gap-2 sm:order-1 sm:flex-col">
              {product.images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setImageIndex(i)}
                  className={
                    imageIndex === i
                      ? "aspect-square w-16 overflow-hidden rounded-md ring-2 ring-foreground sm:w-full"
                      : "aspect-square w-16 overflow-hidden rounded-md border border-border opacity-80 hover:opacity-100 sm:w-full"
                  }
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
            <div className="order-1 aspect-[3/4] overflow-hidden rounded-lg bg-surface-muted shadow-soft sm:order-2">
              <img
                src={product.images[imageIndex] ?? product.images[0]}
                alt={`${product.brand} ${product.name}`}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--chrome-offset)+1.5rem)]">
            <p className="text-2xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              {product.brand} · {product.brandTier}
            </p>
            <h1 className="mt-1 font-display text-display-sm font-bold tracking-tight">
              {product.name}
            </h1>

            <div className="mt-4 flex flex-wrap items-baseline gap-2">
              <span className="price-deal text-2xl">{formatCurrency(product.price)}</span>
              <span className="price-compare text-base">
                Compare at {formatCurrency(product.compareAt)}
              </span>
              <Badge className="bg-deal text-deal-foreground">{pct}% off</Badge>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              You save {formatCurrency(product.compareAt - product.price)} vs. compare at
            </p>

            <Separator className="my-6" />

            <div>
              <p className="mb-2 text-2xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                Color — {product.colorways.find((c) => c.id === activeColor)?.name}
              </p>
              <div className="flex gap-2">
                {product.colorways.map((color) => (
                  <button
                    key={color.id}
                    type="button"
                    aria-label={color.name}
                    aria-pressed={activeColor === color.id}
                    onClick={() => setColorwayId(color.id)}
                    className={
                      activeColor === color.id
                        ? "h-8 w-8 rounded-full ring-2 ring-foreground ring-offset-2"
                        : "h-8 w-8 rounded-full border border-black/10"
                    }
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
            </div>

            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-2xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  Size
                </p>
                <button type="button" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                  <Ruler className="h-3.5 w-3.5" />
                  Size & fit guide
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {product.sizes.map((s) => (
                  <button
                    key={s.label}
                    type="button"
                    disabled={!s.available}
                    onClick={() => {
                      setSize(s.label)
                      setSizeError(false)
                    }}
                    className={
                      selectedSize === s.label
                        ? "min-w-12 rounded-md border border-foreground bg-foreground px-3 py-2.5 text-sm font-semibold text-primary-foreground"
                        : "min-w-12 rounded-md border border-border bg-surface px-3 py-2.5 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-35"
                    }
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              {sizeError && (
                <p className="mt-2 text-xs text-destructive">Please select a size</p>
              )}
              {product.fitNotes && (
                <p className="mt-3 text-sm text-muted-foreground">{product.fitNotes}</p>
              )}
            </div>

            <div className="mt-6 rounded-md border border-border bg-surface-muted/50 p-3">
              <p className="inline-flex items-center gap-1.5 text-sm font-medium">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                Store stock lookup
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {product.storeStockHint ?? "Check availability at your preferred store at checkout."}
              </p>
            </div>

            <div className="sticky-purchase mt-8 -mx-gutter px-gutter py-4 lg:static lg:mx-0 lg:rounded-lg lg:border lg:border-border lg:bg-surface lg:px-4 lg:shadow-soft">
              <Button
                size="lg"
                className="w-full"
                onClick={() => {
                  if (!selectedSize) {
                    setSizeError(true)
                    return
                  }
                  if (!activeColor) return
                  addItem({
                    productId: product.id,
                    size: selectedSize,
                    colorwayId: activeColor,
                  })
                }}
              >
                Add to bag — {formatCurrency(product.price)}
              </Button>
              <p className="mt-2 flex items-center justify-center gap-1.5 text-2xs text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5" />
                Free in-store returns · Guest checkout available
              </p>
            </div>

            <div className="mt-8 space-y-3">
              <h2 className="font-display text-base font-bold">Details</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {product.description}
              </p>
              <ul className="flex flex-wrap gap-1.5">
                {product.tags.map((tag) => (
                  <Badge key={tag} className="bg-secondary text-secondary-foreground">
                    {tag}
                  </Badge>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

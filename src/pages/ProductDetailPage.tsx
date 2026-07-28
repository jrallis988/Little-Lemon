import { useEffect, useMemo, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Check, MapPin, Ruler, ShieldCheck } from "lucide-react"
import { DEFAULT_STORES, PRODUCTS } from "@/data/products"
import { getProductBySlug } from "@/lib/catalog"
import { discountPercent, formatCurrency } from "@/lib/utils"
import { useCartStore } from "@/stores/cartStore"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { NearbyStore, Product } from "@/types"
import { cn } from "@/lib/utils"

function galleryForColor(product: Product, colorwayId: string | null) {
  const color = product.colorways.find((c) => c.id === colorwayId)
  if (color?.image) {
    const rest = product.images.filter((src) => src !== color.image)
    return [color.image, ...rest]
  }
  if (typeof color?.imageIndex === "number" && product.images[color.imageIndex]) {
    const primary = product.images[color.imageIndex]!
    const rest = product.images.filter((_, i) => i !== color.imageIndex)
    return [primary, ...rest]
  }
  return product.images
}

function storeStatusLabel(status: NearbyStore["status"]) {
  switch (status) {
    case "in_stock":
      return { label: "In stock", className: "text-[hsl(var(--inventory-in))]" }
    case "low_stock":
      return { label: "Low stock", className: "text-[hsl(var(--inventory-low))]" }
    default:
      return { label: "Out of stock", className: "text-muted-foreground" }
  }
}

function SizeFitDialog({ product }: { product: Product }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
        >
          <Ruler className="h-3.5 w-3.5" />
          Size & fit guide
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Size & fit guide</DialogTitle>
          <DialogDescription>
            {product.brand} · {product.name}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 text-sm">
          <p className="text-muted-foreground">
            {product.fitNotes ??
              "Fit varies by style. When between sizes, size up for a relaxed look."}
          </p>
          <div className="overflow-hidden rounded-md border border-border">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-muted">
                <tr>
                  <th className="px-3 py-2 font-semibold">Size</th>
                  <th className="px-3 py-2 font-semibold">Bust / Chest</th>
                  <th className="px-3 py-2 font-semibold">Waist</th>
                  <th className="px-3 py-2 font-semibold">Hip</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["XS / 0–2", '32–33"', '25–26"', '35–36"'],
                  ["S / 4–6", '34–35"', '27–28"', '37–38"'],
                  ["M / 8–10", '36–37"', '29–30"', '39–40"'],
                  ["L / 12–14", '38–40"', '31–33"', '41–43"'],
                ].map((row) => (
                  <tr key={row[0]} className="border-t border-border">
                    {row.map((cell) => (
                      <td key={cell} className="px-3 py-2 tabular">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-2xs text-muted-foreground">
            Guide is approximate. Marshalls styles may vary by brand and cut.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function StoreStockPanel({
  product,
  stores,
}: {
  product: Product
  stores: NearbyStore[]
}) {
  const [zip, setZip] = useState("10003")
  const [selected, setSelected] = useState(stores[0]?.id ?? "")
  const [queried, setQueried] = useState(true)

  const results = queried ? stores : []

  return (
    <div className="rounded-md border border-border bg-surface-muted/50 p-4">
      <p className="inline-flex items-center gap-1.5 text-sm font-semibold">
        <MapPin className="h-4 w-4 text-primary" />
        Store stock lookup
      </p>
      <p className="mt-1 text-sm text-muted-foreground">
        {product.storeStockHint ?? "See what’s available near you for pickup."}
      </p>

      <form
        className="mt-3 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault()
          setQueried(true)
        }}
      >
        <Input
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          placeholder="ZIP code"
          className="h-10"
          inputMode="numeric"
          aria-label="ZIP code"
        />
        <Button type="submit" variant="outline" className="shrink-0">
          Find stores
        </Button>
      </form>

      {results.length > 0 && (
        <ul className="mt-3 space-y-2">
          {results.map((store) => {
            const status = storeStatusLabel(store.status)
            const active = selected === store.id
            return (
              <li key={store.id}>
                <button
                  type="button"
                  onClick={() => setSelected(store.id)}
                  className={cn(
                    "flex w-full items-start justify-between gap-3 rounded-md border px-3 py-2.5 text-left transition-colors",
                    active
                      ? "border-primary bg-sky-soft/60"
                      : "border-border bg-surface hover:border-primary/40",
                  )}
                >
                  <div>
                    <p className="text-sm font-medium">{store.name}</p>
                    <p className="text-2xs text-muted-foreground">
                      {store.distanceMi} mi · {store.pickup}
                    </p>
                  </div>
                  <span className={cn("text-2xs font-semibold", status.className)}>
                    {status.label}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export function ProductDetailPage() {
  const { slug } = useParams()
  const product = useMemo(() => (slug ? getProductBySlug(slug) : undefined), [slug])
  const recommendations = useMemo(
    () =>
      product
        ? PRODUCTS.filter(
            (candidate) =>
              candidate.department === product.department &&
              candidate.id !== product.id,
          ).slice(0, 4)
        : [],
    [product],
  )
  const addItem = useCartStore((s) => s.addItem)
  const [imageIndex, setImageIndex] = useState(0)
  const [size, setSize] = useState<string | null>(null)
  const [colorwayId, setColorwayId] = useState<string | null>(null)
  const [sizeError, setSizeError] = useState(false)

  useEffect(() => {
    setImageIndex(0)
    setSize(null)
    setColorwayId(null)
    setSizeError(false)
  }, [slug])

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

  const activeColor = colorwayId ?? product.colorways[0]?.id ?? null
  const gallery = galleryForColor(product, activeColor)
  const pct = discountPercent(product.compareAt, product.price)
  const selectedSize = size
  const stores = product.nearbyStores ?? DEFAULT_STORES
  const activeColorName =
    product.colorways.find((c) => c.id === activeColor)?.name ?? "—"

  return (
    <div className="shelf-container py-6 md:py-10">
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex flex-wrap items-center gap-1.5 text-2xs text-muted-foreground"
      >
        <Link to="/" className="hover:text-foreground">
          Home
        </Link>
        <span>/</span>
        <Link to="/catalog" className="hover:text-foreground">
          Catalog
        </Link>
        <span>/</span>
        <span>{product.department}</span>
        <span>/</span>
        <span className="font-medium text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <div className="grid gap-3 sm:grid-cols-[4.5rem_1fr]">
            <div className="order-2 flex gap-2 sm:order-1 sm:flex-col">
              {gallery.map((src, i) => (
                <button
                  key={`${src}-${i}`}
                  type="button"
                  onClick={() => setImageIndex(i)}
                  className={
                    imageIndex === i
                      ? "aspect-square w-16 overflow-hidden rounded-md ring-2 ring-primary sm:w-full"
                      : "aspect-square w-16 overflow-hidden rounded-md border border-border opacity-80 hover:opacity-100 sm:w-full"
                  }
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
            <div className="order-1 aspect-[3/4] overflow-hidden rounded-lg bg-surface-muted shadow-soft sm:order-2">
              <img
                key={gallery[imageIndex] ?? gallery[0]}
                src={gallery[imageIndex] ?? gallery[0]}
                alt={`${product.brand} ${product.name} — ${activeColorName}`}
                className="h-full w-full object-cover animate-fade-in"
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
              <Badge className="bg-primary text-primary-foreground">{pct}% off</Badge>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              You save {formatCurrency(product.compareAt - product.price)} vs. compare at
            </p>

            <Separator className="my-6" />

            <div>
              <p className="mb-2 text-2xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                Color — {activeColorName}
              </p>
              <div className="flex gap-2">
                {product.colorways.map((color) => (
                  <button
                    key={color.id}
                    type="button"
                    aria-label={color.name}
                    aria-pressed={activeColor === color.id}
                    onClick={() => {
                      setColorwayId(color.id)
                      setImageIndex(0)
                    }}
                    className={
                      activeColor === color.id
                        ? "relative h-8 w-8 rounded-full ring-2 ring-primary ring-offset-2"
                        : "h-8 w-8 rounded-full border border-black/10"
                    }
                    style={{ backgroundColor: color.hex }}
                  >
                    {activeColor === color.id && (
                      <Check className="absolute inset-0 m-auto h-3.5 w-3.5 text-white drop-shadow" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-2xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  Size
                </p>
                <SizeFitDialog product={product} />
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
                        ? "min-w-12 rounded-md border border-primary bg-primary px-3 py-2.5 text-sm font-semibold text-primary-foreground"
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

            <div className="mt-6">
              <StoreStockPanel product={product} stores={stores} />
            </div>

            <div className="sticky-purchase mt-8 -mx-gutter px-gutter py-4 lg:static lg:mx-0 lg:mt-8 lg:rounded-lg lg:border lg:border-border lg:bg-surface lg:px-4 lg:shadow-soft">
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

            <div className="mt-8 space-y-3 pb-20 lg:pb-0">
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

      {recommendations.length > 0 && (
        <section className="mt-14 border-t border-border pt-10">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-2xs font-semibold uppercase tracking-[0.1em] text-primary">
                More to discover
              </p>
              <h2 className="mt-1 font-display text-2xl font-bold tracking-tight">
                You May Also Like
              </h2>
            </div>
            <Link
              to={`/catalog?department=${product.department}`}
              className="text-sm font-semibold text-primary hover:underline"
            >
              Shop {product.department}
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {recommendations.map((recommendation) => (
              <Link
                key={recommendation.id}
                to={`/product/${recommendation.slug}`}
                className="group block"
              >
                <div className="aspect-[3/4] overflow-hidden rounded-md bg-surface-muted shadow-soft">
                  <img
                    src={recommendation.images[0]}
                    alt={`${recommendation.brand} ${recommendation.name}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <p className="mt-3 text-2xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  {recommendation.brand}
                </p>
                <p className="line-clamp-2 text-sm font-medium">
                  {recommendation.name}
                </p>
                <p className="mt-1 text-sm font-bold text-primary">
                  {formatCurrency(recommendation.price)}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

import { useEffect, useMemo, useState } from "react"
import { Link, useParams } from "react-router-dom"
import {
  Check,
  Heart,
  MapPin,
  MessageCircle,
  Ruler,
  ShieldCheck,
  Star,
  ThumbsUp,
} from "lucide-react"
import { DEFAULT_STORES, PRODUCTS } from "@/data/products"
import {
  averageRating,
  getQuestionsForProduct,
  getReviewsForProduct,
} from "@/data/reviews"
import { getProductBySlug } from "@/lib/catalog"
import { checkInventory, type InventoryResult } from "@/lib/api"
import { track } from "@/lib/analytics"
import { discountPercent, formatCurrency } from "@/lib/utils"
import { useCartStore } from "@/stores/cartStore"
import { useWishlistStore } from "@/stores/wishlistStore"
import { useRecentStore } from "@/stores/recentStore"
import { useStorePreferenceStore } from "@/stores/storePreferenceStore"
import { useToastStore } from "@/stores/toastStore"
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
import { ProductCard } from "@/components/catalog/ProductCard"

function galleryForColor(product: Product, colorwayId: string | null) {
  const color = product.colorways.find((c) => c.id === colorwayId)
  if (color?.images && color.images.length > 0) return color.images
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

function sizeChartFor(product: Product) {
  const category = product.category.toLowerCase()
  const department = product.department
  const isShoes =
    category.includes("shoe") ||
    category.includes("sneaker") ||
    category.includes("boot") ||
    category.includes("flat")
  const isKids =
    department === "Kids" ||
    department === "Boys" ||
    department === "Girls" ||
    department === "Juniors"
  const isOneSize =
    product.sizes.length === 1 &&
    /one size|oz|set|pack/i.test(product.sizes[0]?.label ?? "")

  if (isShoes) {
    return {
      title: "Footwear size conversion",
      note: "Try shoes on with your usual socks. Width can vary by brand.",
      headers: ["US", "EU", "UK", "Foot length"],
      rows: [
        ["6", "36–37", "4", '9.0"'],
        ["7", "37–38", "5", '9.3"'],
        ["8", "38–39", "6", '9.7"'],
        ["9", "40–41", "7", '10.0"'],
        ["10", "42", "8", '10.3"'],
        ["11", "43–44", "9", '10.7"'],
      ],
    }
  }

  if (isKids) {
    return {
      title: "Kids & juniors size guide",
      note: "Measure height for the best fit. Juniors often align with adult XS–M.",
      headers: ["Size", "Age", "Height", "Chest"],
      rows: [
        ["2T–3T", "2–3 yrs", '33–38"', '20–21"'],
        ["4–5", "4–5 yrs", '39–44"', '22–23"'],
        ["6–7", "6–7 yrs", '45–50"', '24–26"'],
        ["8–10", "8–10 yrs", '51–56"', '27–29"'],
        ["Jr S–M", "11–14 yrs", '57–62"', '30–33"'],
      ],
    }
  }

  if (isOneSize || department === "Home" || department === "Beauty" || department === "Pets") {
    return {
      title: "Fit notes",
      note:
        product.fitNotes ??
        "This style is one-size or free-size. Check product details for dimensions.",
      headers: ["Option", "Fit"],
      rows: [["One Size / Standard", "Designed to fit most shoppers as labeled"]],
    }
  }

  return {
    title: "Apparel size & fit",
    note:
      product.fitNotes ??
      "Fit varies by style. When between sizes, size up for a relaxed look.",
    headers: ["Size", "Bust / Chest", "Waist", "Hip"],
    rows: [
      ["XS / 0–2", '32–33"', '25–26"', '35–36"'],
      ["S / 4–6", '34–35"', '27–28"', '37–38"'],
      ["M / 8–10", '36–37"', '29–30"', '39–40"'],
      ["L / 12–14", '38–40"', '31–33"', '41–43"'],
      ["XL / 16", '41–43"', '34–36"', '44–46"'],
    ],
  }
}

function SizeFitDialog({ product }: { product: Product }) {
  const chart = sizeChartFor(product)
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
          <DialogTitle>{chart.title}</DialogTitle>
          <DialogDescription>
            {product.brand} · {product.name}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 text-sm">
          <p className="text-muted-foreground">{chart.note}</p>
          <div className="overflow-hidden rounded-md border border-border">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-muted">
                <tr>
                  {chart.headers.map((header) => (
                    <th key={header} className="px-3 py-2 font-semibold">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {chart.rows.map((row) => (
                  <tr key={row[0]} className="border-t border-border">
                    {row.map((cell) => (
                      <td key={`${row[0]}-${cell}`} className="px-3 py-2 tabular">
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
  size,
}: {
  product: Product
  stores: NearbyStore[]
  size: string | null
}) {
  const preferredStoreId = useStorePreferenceStore((s) => s.preferredStoreId)
  const lastSearchQuery = useStorePreferenceStore((s) => s.lastSearchQuery)
  const setPreferredStore = useStorePreferenceStore((s) => s.setPreferredStore)
  const setLastSearchQuery = useStorePreferenceStore((s) => s.setLastSearchQuery)
  const pushToast = useToastStore((s) => s.push)

  const [zip, setZip] = useState(lastSearchQuery || "10003")
  const [selected, setSelected] = useState(() => {
    if (preferredStoreId && stores.some((s) => s.id === preferredStoreId)) {
      return preferredStoreId
    }
    return stores.find((s) => s.status !== "out_of_stock")?.id ?? stores[0]?.id ?? ""
  })
  const [queried, setQueried] = useState(true)
  const [reservation, setReservation] = useState<string | null>(null)

  const results = queried ? stores : []
  const selectedStore = results.find((s) => s.id === selected)
  const canReserve =
    !!size &&
    !!selectedStore &&
    selectedStore.status !== "out_of_stock" &&
    product.inventory !== "out_of_stock" &&
    product.inventory !== "online_only"
  const isPreferred = !!selectedStore && selectedStore.id === preferredStoreId

  return (
    <div className="rounded-md border border-border bg-surface-muted/50 p-4">
      <p className="inline-flex items-center gap-1.5 text-sm font-semibold">
        <MapPin className="h-4 w-4 text-primary" />
        Store stock & reserve
      </p>
      <p className="mt-1 text-sm text-muted-foreground">
        {product.storeStockHint ?? "See what’s available near you for pickup."}
      </p>

      <form
        className="mt-3 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault()
          setQueried(true)
          setReservation(null)
          setLastSearchQuery(zip.trim() || "10003")
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
            const mine = store.id === preferredStoreId
            return (
              <li key={store.id}>
                <button
                  type="button"
                  onClick={() => {
                    setSelected(store.id)
                    setReservation(null)
                  }}
                  className={cn(
                    "flex w-full items-start justify-between gap-3 rounded-md border px-3 py-2.5 text-left transition-colors",
                    active
                      ? "border-primary bg-sky-soft/60"
                      : "border-border bg-surface hover:border-primary/40",
                  )}
                >
                  <div>
                    <p className="text-sm font-medium">
                      {store.name}
                      {mine && (
                        <span className="ml-2 text-2xs font-bold uppercase tracking-wide text-primary">
                          My store
                        </span>
                      )}
                    </p>
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

      <div className="mt-3 space-y-2">
        <Button
          type="button"
          variant="secondary"
          className="w-full"
          disabled={!canReserve}
          onClick={() => {
            const code = `MS-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
            setReservation(code)
          }}
        >
          Reserve in store
        </Button>
        {selectedStore && (
          <Button
            type="button"
            variant="outline"
            className="w-full"
            disabled={isPreferred}
            onClick={() => {
              setPreferredStore(selectedStore.id)
              pushToast({
                title: "Store saved",
                description: `${selectedStore.name} is now your store.`,
              })
            }}
          >
            {isPreferred ? "This is your store" : "Make this my store"}
          </Button>
        )}
        {!size && (
          <p className="text-2xs text-muted-foreground">Select a size to reserve.</p>
        )}
        {reservation && selectedStore && (
          <div className="rounded-md border border-[hsl(var(--inventory-in))]/30 bg-[hsl(var(--inventory-in))]/10 p-3 text-sm">
            <p className="font-semibold text-foreground">Reservation confirmed</p>
            <p className="mt-1 text-muted-foreground">
              #{reservation} · {selectedStore.name} · size {size} · {selectedStore.pickup}
            </p>
            <Link
              to={`/stores?zip=${encodeURIComponent(zip)}`}
              className="mt-2 inline-block text-xs font-semibold text-primary hover:underline"
            >
              View store details
            </Link>
          </div>
        )}
        <Link
          to="/stores"
          className="inline-flex text-xs font-semibold text-primary hover:underline"
        >
          Open full store locator
        </Link>
      </div>
    </div>
  )
}


function StarRow({ rating, className }: { rating: number; className?: string }) {
  return (
    <div className={cn("flex items-center gap-0.5", className)} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-3.5 w-3.5",
            i < Math.round(rating)
              ? "fill-amber-400 text-amber-400"
              : "text-border",
          )}
        />
      ))}
    </div>
  )
}

function ReviewsAndQA({ productId }: { productId: string }) {
  const reviews = useMemo(() => getReviewsForProduct(productId), [productId])
  const questions = useMemo(() => getQuestionsForProduct(productId), [productId])
  const avg = averageRating(reviews)

  return (
    <section className="mt-14 border-t border-border pt-10">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-2xs font-semibold uppercase tracking-[0.1em] text-primary">
            Customer feedback
          </p>
          <h2 className="mt-1 font-display text-2xl font-bold tracking-tight">
            Reviews & Q&A
          </h2>
        </div>
        <div className="flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 shadow-soft">
          <StarRow rating={avg} />
          <span className="text-sm font-semibold tabular">{avg.toFixed(1)}</span>
          <span className="text-xs text-muted-foreground">
            ({reviews.length} reviews)
          </span>
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-[0.08em] text-muted-foreground">
            Reviews
          </h3>
          {reviews.map((review) => (
            <article
              key={review.id}
              className="rounded-md border border-border bg-surface p-4 shadow-soft"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <StarRow rating={review.rating} />
                <span className="text-2xs text-muted-foreground">{review.date}</span>
              </div>
              <h4 className="mt-2 font-semibold">{review.title}</h4>
              <p className="mt-1 text-sm text-muted-foreground">{review.body}</p>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-2xs text-muted-foreground">
                <span className="font-medium text-foreground">{review.author}</span>
                {review.verified && (
                  <Badge className="bg-secondary text-secondary-foreground">
                    Verified purchase
                  </Badge>
                )}
                {typeof review.helpful === "number" && (
                  <span className="inline-flex items-center gap-1">
                    <ThumbsUp className="h-3 w-3" />
                    {review.helpful} found helpful
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="space-y-4">
          <h3 className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-[0.08em] text-muted-foreground">
            <MessageCircle className="h-4 w-4" />
            Questions & answers
          </h3>
          {questions.map((qa) => (
            <article
              key={qa.id}
              className="rounded-md border border-border bg-surface-muted/40 p-4"
            >
              <p className="text-sm font-semibold">Q: {qa.question}</p>
              <p className="mt-1 text-2xs text-muted-foreground">
                Asked by {qa.asker} · {qa.date}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">A:</span> {qa.answer}
              </p>
              <p className="mt-2 text-2xs text-muted-foreground">
                Answered by {qa.answeredBy}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProductRail({
  title,
  eyebrow,
  products,
  shopLink,
  shopLabel,
}: {
  title: string
  eyebrow: string
  products: Product[]
  shopLink: string
  shopLabel: string
}) {
  if (products.length === 0) return null
  return (
    <section className="mt-14 border-t border-border pt-10">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-2xs font-semibold uppercase tracking-[0.1em] text-primary">
            {eyebrow}
          </p>
          <h2 className="mt-1 font-display text-2xl font-bold tracking-tight">
            {title}
          </h2>
        </div>
        <Link
          to={shopLink}
          className="text-sm font-semibold text-primary hover:underline"
        >
          {shopLabel}
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {products.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </section>
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
              candidate.id !== product.id &&
              candidate.inventory !== "out_of_stock",
          ).slice(0, 4)
        : [],
    [product],
  )
  const completeTheLook = useMemo(() => {
    if (!product) return []
    const complementaryCategories = new Set(
      ["Shoes", "Bags", "Accessories", "Jewelry", "Belts"].filter(
        (c) => c !== product.category,
      ),
    )
    const preferred = PRODUCTS.filter(
      (candidate) =>
        candidate.id !== product.id &&
        candidate.inventory !== "out_of_stock" &&
        (complementaryCategories.has(candidate.category) ||
          (candidate.department === product.department &&
            candidate.category !== product.category)),
    )
    const scored = preferred.sort((a, b) => {
      const aScore = complementaryCategories.has(a.category) ? 0 : 1
      const bScore = complementaryCategories.has(b.category) ? 0 : 1
      return aScore - bScore
    })
    return scored.slice(0, 4)
  }, [product])

  const addItem = useCartStore((s) => s.addItem)
  const lastError = useCartStore((s) => s.lastError)
  const clearError = useCartStore((s) => s.clearError)
  const wished = useWishlistStore((s) => (product ? s.has(product.id) : false))
  const toggleWish = useWishlistStore((s) => s.toggle)
  const trackRecent = useRecentStore((s) => s.track)
  const recentIds = useRecentStore((s) => s.productIds)
  const [imageIndex, setImageIndex] = useState(0)
  const [size, setSize] = useState<string | null>(null)
  const [colorwayId, setColorwayId] = useState<string | null>(null)
  const [sizeError, setSizeError] = useState(false)
  const [inventory, setInventory] = useState<InventoryResult | null>(null)
  const [inventoryLoading, setInventoryLoading] = useState(false)

  useEffect(() => {
    setImageIndex(0)
    setSize(null)
    setColorwayId(null)
    setSizeError(false)
    setInventory(null)
    clearError()
  }, [slug, clearError])

  useEffect(() => {
    if (product) {
      trackRecent(product.id)
      track("product_view", { productId: product.id, slug: product.slug })
    }
  }, [product, trackRecent])

  useEffect(() => {
    if (!product || !size) {
      setInventory(null)
      return
    }
    let cancelled = false
    setInventoryLoading(true)
    void checkInventory(product.id, size).then((result) => {
      if (!cancelled) {
        setInventory(result)
        setInventoryLoading(false)
      }
    })
    return () => {
      cancelled = true
    }
  }, [product, size])

  const recentlyViewed = useMemo(
    () =>
      recentIds
        .filter((id) => id !== product?.id)
        .map((id) => PRODUCTS.find((p) => p.id === id))
        .filter(Boolean)
        .slice(0, 4) as typeof PRODUCTS,
    [recentIds, product?.id],
  )

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
  const isSoldOut = product.inventory === "out_of_stock"
  const reviews = getReviewsForProduct(product.id)
  const avg = averageRating(reviews)

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
        <Link
          to={`/catalog?department=${product.department}`}
          className="hover:text-foreground"
        >
          {product.department}
        </Link>
        <span>/</span>
        <span className="font-medium text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <div className="grid gap-3 sm:grid-cols-[4.5rem_1fr]">
            <div className="order-2 flex gap-2 sm:order-1 sm:flex-col">
              {gallery.map((src, i) => (
                <button
                  key={`${activeColor}-${src}-${i}`}
                  type="button"
                  onClick={() => setImageIndex(i)}
                  className={
                    imageIndex === i
                      ? "aspect-square w-16 overflow-hidden rounded-md ring-2 ring-primary sm:w-full"
                      : "aspect-square w-16 overflow-hidden rounded-md border border-border opacity-80 hover:opacity-100 sm:w-full"
                  }
                >
                  <img src={src} alt="" className="h-full w-full object-contain p-1" />
                </button>
              ))}
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="product-gallery-frame order-1 aspect-[3/4] w-full cursor-zoom-in sm:order-2"
                  aria-label="Open larger product image"
                >
                  <img
                    key={`${activeColor}-${gallery[imageIndex] ?? gallery[0]}`}
                    src={gallery[imageIndex] ?? gallery[0]}
                    alt={`${product.brand} ${product.name} — ${activeColorName}`}
                    className="animate-fade-in"
                  />
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl border-0 bg-transparent p-0 shadow-none">
                <DialogHeader className="sr-only">
                  <DialogTitle>
                    {product.brand} {product.name}
                  </DialogTitle>
                  <DialogDescription>Enlarged product photo</DialogDescription>
                </DialogHeader>
                <div className="overflow-hidden rounded-lg bg-[#f5f5f5] shadow-drawer">
                  <img
                    src={gallery[imageIndex] ?? gallery[0]}
                    alt={`${product.brand} ${product.name} — ${activeColorName}`}
                    className="max-h-[85vh] w-full object-contain p-4"
                  />
                </div>
              </DialogContent>
            </Dialog>
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

            <div className="mt-2 flex items-center gap-2">
              <StarRow rating={avg} />
              <a href="#reviews" className="text-xs font-medium text-primary hover:underline">
                {avg.toFixed(1)} · {reviews.length} reviews
              </a>
            </div>

            <div className="mt-4 flex flex-wrap items-baseline gap-2">
              <span className="price-deal text-2xl">
                Our price {formatCurrency(product.price)}
              </span>
              <span className="price-compare text-base">
                Compare at {formatCurrency(product.compareAt)}
              </span>
              <Badge className="bg-primary text-primary-foreground">{pct}% off</Badge>
              {isSoldOut && (
                <Badge className="bg-secondary text-secondary-foreground">Sold through</Badge>
              )}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              You save {formatCurrency(product.compareAt - product.price)} vs. compare at
              {product.inventory === "low_stock" ? " · Going fast" : ""}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Treasure-hunt pricing — styles sell through and may not restock.
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
                    disabled={!s.available || isSoldOut}
                    onClick={() => {
                      setSize(s.label)
                      setSizeError(false)
                      clearError()
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
              {selectedSize && (
                <p className="mt-2 text-xs text-muted-foreground" role="status">
                  {inventoryLoading && "Checking live inventory…"}
                  {!inventoryLoading &&
                    inventory &&
                    (inventory.available
                      ? `${inventory.stockCount} online · ${inventory.storesInStock} nearby stores`
                      : "Size unavailable online — try Reserve in Store")}
                </p>
              )}
              {product.fitNotes && (
                <p className="mt-3 text-sm text-muted-foreground">{product.fitNotes}</p>
              )}
              <Link
                to="/fit-quiz"
                className="mt-3 inline-flex text-xs font-semibold text-navy underline-offset-2 hover:underline"
              >
                Not sure? Take the fit quiz
              </Link>
            </div>

            <div className="sticky-purchase mt-8 -mx-gutter px-gutter py-4 lg:static lg:mx-0 lg:mt-8 lg:rounded-lg lg:border lg:border-border lg:bg-surface lg:px-4 lg:shadow-soft">
              <div className="flex gap-2">
                <Button
                  size="lg"
                  className="flex-1"
                  disabled={isSoldOut}
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
                  {isSoldOut
                    ? "Sold through online"
                    : `Add to bag — ${formatCurrency(product.price)}`}
                </Button>
                <Button
                  type="button"
                  size="lg"
                  variant="outline"
                  aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
                  aria-pressed={wished}
                  onClick={() => toggleWish(product.id)}
                >
                  <Heart className={cn("h-5 w-5", wished && "fill-current text-primary")} />
                </Button>
              </div>
              {lastError && (
                <p className="mt-2 text-center text-xs text-destructive">{lastError}</p>
              )}
              <p className="mt-2 flex items-center justify-center gap-1.5 text-2xs text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5" />
                Free in-store returns · Guest checkout available
              </p>
            </div>

            <div className="mt-6">
              <StoreStockPanel product={product} stores={stores} size={selectedSize} />
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

      <ProductRail
        title="Complete the Look"
        eyebrow="Styled together"
        products={completeTheLook}
        shopLink={`/catalog?department=${product.department}`}
        shopLabel={`Shop ${product.department}`}
      />

      <ProductRail
        title="You May Also Like"
        eyebrow="More to discover"
        products={recommendations}
        shopLink={`/catalog?department=${product.department}`}
        shopLabel={`Shop ${product.department}`}
      />

      <ProductRail
        title="Recently Viewed"
        eyebrow="Pick up where you left off"
        products={recentlyViewed}
        shopLink="/catalog"
        shopLabel="Shop all"
      />

      <div id="reviews">
        <ReviewsAndQA productId={product.id} />
      </div>
    </div>
  )
}

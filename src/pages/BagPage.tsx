import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { Minus, Plus, ShoppingBag, Tag, Trash2 } from "lucide-react"
import { PRODUCTS } from "@/data/products"
import { useCartStore } from "@/stores/cartStore"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useDocumentMeta } from "@/hooks/useDocumentMeta"
import { formatCurrency } from "@/lib/utils"

const VALID_PROMOS: Record<string, { label: string; percentOff: number }> = {
  FIND20: { label: "Extra 20% off", percentOff: 20 },
  HAPPY10: { label: "Welcome 10% off", percentOff: 10 },
}

export function BagPage() {
  useDocumentMeta({
    title: "Your Bag | Marshalls",
    description: "Review your Marshalls bag and continue to checkout.",
  })

  const items = useCartStore((s) => s.items)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const removeItem = useCartStore((s) => s.removeItem)
  const promoCode = useCartStore((s) => s.promoCode)
  const applyPromo = useCartStore((s) => s.applyPromo)
  const lastError = useCartStore((s) => s.lastError)
  const subtotal = useCartStore((s) => s.subtotal())
  const compareAtTotal = useCartStore((s) => s.compareAtTotal())
  const [promoInput, setPromoInput] = useState("")
  const [promoError, setPromoError] = useState<string | null>(null)

  const promo = promoCode ? VALID_PROMOS[promoCode] : null
  const promoDiscount = promo ? subtotal * (promo.percentOff / 100) : 0
  const shipping = subtotal >= 89 || subtotal === 0 ? 0 : 8.99
  const tax = Math.max(0, subtotal - promoDiscount) * 0.08875
  const total = Math.max(0, subtotal - promoDiscount) + shipping + tax

  const lines = useMemo(
    () =>
      items
        .map((item) => {
          const product = PRODUCTS.find((p) => p.id === item.productId)
          if (!product) return null
          const colorway = product.colorways.find((c) => c.id === item.colorwayId)
          return { item, product, colorway }
        })
        .filter(Boolean),
    [items],
  )

  return (
    <div className="shelf-container py-8 md:py-12">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="inline-flex items-center gap-1.5 text-2xs font-bold uppercase tracking-[0.12em] text-primary">
            <ShoppingBag className="h-3.5 w-3.5" /> Shopping bag
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold text-navy">Your bag</h1>
        </div>
        <Link to="/catalog" className="text-sm font-semibold text-navy underline">
          Continue shopping
        </Link>
      </div>

      {lastError && (
        <p className="mb-4 rounded-md border border-amber-200 bg-amber-50 px-4 py-2 text-sm text-amber-950">
          {lastError}
        </p>
      )}

      {lines.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border px-6 py-16 text-center">
          <ShoppingBag className="mx-auto h-10 w-10 text-muted-foreground" />
          <p className="mt-4 font-display text-xl font-bold">Your bag is empty</p>
          <Button asChild className="mt-6">
            <Link to="/catalog">Shop new finds</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
          <ul className="space-y-4">
            {lines.map((line) => {
              if (!line) return null
              const { item, product, colorway } = line
              return (
                <li
                  key={`${item.productId}-${item.size}-${item.colorwayId}`}
                  className="flex gap-4 rounded-md border border-border bg-surface p-4 shadow-soft"
                >
                  <Link to={`/product/${product.slug}`} className="shrink-0">
                    <div className="h-28 w-24 overflow-hidden rounded-sm bg-[#f5f5f5]">
                      <img
                        src={colorway?.image ?? product.images[0]}
                        alt=""
                        className="h-full w-full object-contain p-2"
                      />
                    </div>
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-2xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                          {product.brand}
                        </p>
                        <Link
                          to={`/product/${product.slug}`}
                          className="font-semibold text-foreground no-underline hover:underline"
                        >
                          {product.name}
                        </Link>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {colorway?.name} · Size {item.size}
                        </p>
                      </div>
                      <p className="font-bold text-primary">
                        {formatCurrency(product.price * item.quantity)}
                      </p>
                    </div>
                    <div className="mt-auto flex flex-wrap items-center gap-3 pt-3">
                      <div className="inline-flex items-center rounded-md border border-border">
                        <button
                          type="button"
                          className="px-2 py-1.5"
                          aria-label="Decrease quantity"
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.size,
                              item.colorwayId,
                              item.quantity - 1,
                            )
                          }
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-8 text-center text-sm font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          className="px-2 py-1.5"
                          aria-label="Increase quantity"
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.size,
                              item.colorwayId,
                              item.quantity + 1,
                            )
                          }
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-destructive"
                        onClick={() =>
                          removeItem(item.productId, item.size, item.colorwayId)
                        }
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>

          <aside className="h-fit rounded-lg border border-border bg-surface p-5 shadow-soft lg:sticky lg:top-[calc(var(--chrome-offset)+1rem)]">
            <h2 className="font-display text-lg font-bold">Order summary</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt>Subtotal</dt>
                <dd>{formatCurrency(subtotal)}</dd>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <dt>Compare-at savings</dt>
                <dd>-{formatCurrency(Math.max(0, compareAtTotal - subtotal))}</dd>
              </div>
              {promo && (
                <div className="flex justify-between text-emerald-800">
                  <dt>{promo.label}</dt>
                  <dd>-{formatCurrency(promoDiscount)}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt>Shipping</dt>
                <dd>{shipping === 0 ? "Free" : formatCurrency(shipping)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Est. tax</dt>
                <dd>{formatCurrency(tax)}</dd>
              </div>
              <div className="flex justify-between border-t border-border pt-2 text-base font-bold">
                <dt>Estimated total</dt>
                <dd>{formatCurrency(total)}</dd>
              </div>
            </dl>

            <div className="mt-4 flex gap-2">
              <Input
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                placeholder="Promo code"
                aria-label="Promo code"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  const code = promoInput.trim().toUpperCase()
                  if (!VALID_PROMOS[code]) {
                    setPromoError("Invalid promo code")
                    return
                  }
                  setPromoError(null)
                  applyPromo(code)
                }}
              >
                <Tag className="h-4 w-4" />
              </Button>
            </div>
            {promoError && <p className="mt-2 text-xs text-destructive">{promoError}</p>}
            {promoCode && (
              <button
                type="button"
                className="mt-2 text-xs font-semibold text-navy underline"
                onClick={() => applyPromo(null)}
              >
                Remove {promoCode}
              </button>
            )}

            <Button asChild className="mt-5 w-full bg-navy hover:bg-navy/90" size="lg">
              <Link to="/checkout">Checkout</Link>
            </Button>
          </aside>
        </div>
      )}
    </div>
  )
}

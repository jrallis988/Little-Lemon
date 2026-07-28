import { Minus, Plus, ShoppingBag, Tag, Trash2 } from "lucide-react"
import { Link } from "react-router-dom"
import { useCartStore } from "@/stores/cartStore"
import { PRODUCTS } from "@/data/products"
import { formatCurrency } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useMemo, useState } from "react"

const VALID_PROMOS: Record<string, { label: string; percentOff: number }> = {
  FIND20: { label: "Extra 20% off", percentOff: 20 },
  HAPPY10: { label: "Welcome 10% off", percentOff: 10 },
}

export function BagDrawer() {
  const isOpen = useCartStore((s) => s.isOpen)
  const closeBag = useCartStore((s) => s.closeBag)
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
  const merchandiseSavings = Math.max(0, compareAtTotal - subtotal)
  const total = Math.max(0, subtotal - promoDiscount)

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
    <Dialog open={isOpen} onOpenChange={(open) => (!open ? closeBag() : undefined)}>
      <DialogContent side="right" className="flex flex-col gap-0 p-0">
        <DialogHeader className="border-b border-border px-5 py-4 pr-12">
          <DialogTitle className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4" />
            Your bag
          </DialogTitle>
          <DialogDescription>
            {items.length === 0
              ? "Your bag is empty"
              : `${items.reduce((n, i) => n + i.quantity, 0)} items · savings shown at checkout`}
          </DialogDescription>
        </DialogHeader>

        {lastError && (
          <p className="border-b border-amber-200 bg-amber-50 px-5 py-2 text-xs text-amber-950">
            {lastError}
          </p>
        )}

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {lines.length === 0 ? (
            <div className="flex h-full min-h-[40vh] flex-col items-center justify-center gap-3 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
                <ShoppingBag className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="font-display text-lg font-semibold">Your bag is empty</p>
              <p className="max-w-xs text-sm text-muted-foreground">
                Browse Marshalls for brand-name finds — new surprises land daily.
              </p>
              <Button asChild onClick={closeBag}>
                <Link to="/catalog">Continue shopping</Link>
              </Button>
            </div>
          ) : (
            <ul className="space-y-4">
              {lines.map((line) => {
                if (!line) return null
                const { item, product, colorway } = line
                return (
                  <li key={`${item.productId}-${item.size}-${item.colorwayId}`} className="flex gap-3">
                    <Link
                      to={`/product/${product.slug}`}
                      onClick={closeBag}
                      className="h-28 w-[5.5rem] shrink-0 overflow-hidden rounded-md bg-surface-muted shadow-soft"
                    >
                      <img
                        src={colorway?.image ?? product.images[0]}
                        alt=""
                        className="h-full w-full object-contain p-1.5"
                      />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-2xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                            {product.brand}
                          </p>
                          <Link
                            to={`/product/${product.slug}`}
                            onClick={closeBag}
                            className="line-clamp-2 text-sm font-medium hover:underline"
                          >
                            {product.name}
                          </Link>
                          <p className="mt-1 text-2xs text-muted-foreground">
                            {colorway?.name} · Size {item.size}
                          </p>
                        </div>
                        <button
                          type="button"
                          className="rounded p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                          aria-label="Remove item"
                          onClick={() =>
                            removeItem(item.productId, item.size, item.colorwayId)
                          }
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="inline-flex items-center rounded-md border border-border">
                          <button
                            type="button"
                            className="px-2 py-1.5 text-muted-foreground hover:text-foreground"
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
                          <span className="min-w-8 text-center text-sm tabular">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            className="px-2 py-1.5 text-muted-foreground hover:text-foreground"
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
                        <div className="text-right">
                          <p className="text-sm font-semibold tabular">
                            {formatCurrency(product.price * item.quantity)}
                          </p>
                          <p className="price-compare text-xs">
                            Compare at {formatCurrency(product.compareAt * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-border bg-surface-muted/40 px-5 py-4">
            <div className="mb-3 space-y-2">
              <label className="flex items-center gap-1.5 text-2xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                <Tag className="h-3.5 w-3.5" />
                Promo code
              </label>
              <div className="flex gap-2">
                <Input
                  value={promoInput}
                  onChange={(e) => {
                    setPromoInput(e.target.value.toUpperCase())
                    setPromoError(null)
                  }}
                  placeholder="FIND20"
                  className="h-10 uppercase"
                />
                <Button
                  variant="outline"
                  className="shrink-0"
                  onClick={() => {
                    const code = promoInput.trim().toUpperCase()
                    if (!VALID_PROMOS[code]) {
                      setPromoError("Code not recognized")
                      return
                    }
                    applyPromo(code)
                    setPromoError(null)
                  }}
                >
                  Apply
                </Button>
              </div>
              {promoError && (
                <p className="text-xs text-destructive">{promoError}</p>
              )}
              {promo && (
                <p className="text-xs font-medium text-[hsl(var(--inventory-in))]">
                  {promo.label} applied ({promoCode})
                  <button
                    type="button"
                    className="ml-2 underline"
                    onClick={() => applyPromo(null)}
                  >
                    Remove
                  </button>
                </p>
              )}
            </div>

            <dl className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="tabular">{formatCurrency(subtotal)}</dd>
              </div>
              <div className="flex justify-between text-primary">
                <dt>You save</dt>
                <dd className="tabular">−{formatCurrency(merchandiseSavings)}</dd>
              </div>
              {promoDiscount > 0 && (
                <div className="flex justify-between text-primary">
                  <dt>Promo ({promoCode})</dt>
                  <dd className="tabular">−{formatCurrency(promoDiscount)}</dd>
                </div>
              )}
              <div className="flex justify-between border-t border-border pt-2 text-base font-semibold">
                <dt>Estimated total</dt>
                <dd className="tabular">{formatCurrency(total)}</dd>
              </div>
            </dl>

            <p className="mt-2 text-2xs text-muted-foreground">
              Taxes and shipping calculated at checkout. No credit card required to browse.
            </p>

            <div className="mt-4 flex flex-col gap-2">
              <Button className="w-full" size="lg" asChild>
                <Link to="/checkout" onClick={closeBag}>
                  Checkout
                </Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/bag" onClick={closeBag}>
                  View full bag
                </Link>
              </Button>
              <Button variant="ghost" className="w-full" asChild>
                <Link to="/catalog" onClick={closeBag}>
                  Keep shopping
                </Link>
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

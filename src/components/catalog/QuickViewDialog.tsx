import { Link } from "react-router-dom"
import type { Product } from "@/types"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { discountPercent, formatCurrency } from "@/lib/utils"
import { useCartStore } from "@/stores/cartStore"
import { useState } from "react"

type QuickViewDialogProps = {
  product: Product | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function QuickViewDialog({
  product,
  open,
  onOpenChange,
}: QuickViewDialogProps) {
  const addItem = useCartStore((s) => s.addItem)
  const [size, setSize] = useState<string | null>(null)
  const [colorwayId, setColorwayId] = useState<string | null>(null)

  if (!product) return null

  const activeColor = colorwayId ?? product.colorways[0]?.id
  const availableSizes = product.sizes.filter((s) => s.available)
  const selectedSize = size ?? availableSizes[0]?.label
  const pct = discountPercent(product.compareAt, product.price)

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) {
          setSize(null)
          setColorwayId(null)
        }
        onOpenChange(next)
      }}
    >
      <DialogContent className="max-w-3xl overflow-hidden p-0 sm:grid sm:grid-cols-2">
        <div className="aspect-[3/4] bg-surface-muted sm:aspect-auto sm:min-h-[28rem]">
          <img
            src={product.images[0]}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-4 p-6 pr-12">
          <DialogHeader>
            <p className="text-2xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              {product.brand}
            </p>
            <DialogTitle className="text-xl">{product.name}</DialogTitle>
            <DialogDescription className="sr-only">
              Quick view for {product.name}
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-wrap items-baseline gap-2">
            <span className="price-deal text-lg">{formatCurrency(product.price)}</span>
            <span className="price-compare">
              Compare at {formatCurrency(product.compareAt)}
            </span>
            {pct > 0 && (
              <Badge className="bg-deal-soft text-deal">{pct}% off</Badge>
            )}
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>

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
                      ? "h-7 w-7 rounded-full ring-2 ring-foreground ring-offset-2"
                      : "h-7 w-7 rounded-full border border-black/10"
                  }
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-2xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              Size
            </p>
            <div className="flex flex-wrap gap-1.5">
              {product.sizes.map((s) => (
                <button
                  key={s.label}
                  type="button"
                  disabled={!s.available}
                  onClick={() => setSize(s.label)}
                  className={
                    selectedSize === s.label
                      ? "min-w-11 rounded-md border border-foreground bg-foreground px-2.5 py-2 text-xs font-semibold text-primary-foreground"
                      : "min-w-11 rounded-md border border-border px-2.5 py-2 text-xs font-medium disabled:cursor-not-allowed disabled:opacity-35"
                  }
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-auto flex flex-col gap-2 pt-2">
            <Button
              disabled={!selectedSize || !activeColor}
              onClick={() => {
                if (!selectedSize || !activeColor) return
                addItem({
                  productId: product.id,
                  size: selectedSize,
                  colorwayId: activeColor,
                })
                onOpenChange(false)
              }}
            >
              Add to bag — {formatCurrency(product.price)}
            </Button>
            <Button variant="outline" asChild>
              <Link to={`/product/${product.slug}`} onClick={() => onOpenChange(false)}>
                View full details
              </Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

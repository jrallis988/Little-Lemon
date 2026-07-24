import type { InventoryStatus, Product } from "@/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn, discountPercent, formatCurrency } from "@/lib/utils"
import { Eye } from "lucide-react"
import { Link } from "react-router-dom"

const INVENTORY_COPY: Record<
  InventoryStatus,
  { label: string; className: string; tip: string }
> = {
  in_stock: {
    label: "In stock",
    className: "bg-emerald-50 text-[hsl(var(--inventory-in))]",
    tip: "Ready to ship and available for store pickup where offered.",
  },
  low_stock: {
    label: "Low stock",
    className: "bg-amber-50 text-[hsl(var(--inventory-low))]",
    tip: "Limited units remaining — sizes may sell out quickly.",
  },
  out_of_stock: {
    label: "Sold out",
    className: "bg-stone-100 text-[hsl(var(--inventory-out))]",
    tip: "Currently unavailable. Check back as inventory refreshes daily.",
  },
  online_only: {
    label: "Online only",
    className: "bg-sky-50 text-sky-800",
    tip: "Ships from our distribution center — not stocked in every store.",
  },
}

type ProductCardProps = {
  product: Product
  onQuickView?: (product: Product) => void
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const pct = discountPercent(product.compareAt, product.price)
  const inventory = INVENTORY_COPY[product.inventory]

  return (
    <article className="product-tile group animate-slide-up">
      <Link to={`/product/${product.slug}`} className="block">
        <div className="product-media shadow-soft">
          <img
            src={product.images[0]}
            alt={`${product.brand} ${product.name}`}
            loading="lazy"
            className={cn(
              product.inventory === "out_of_stock" && "opacity-60 grayscale-[30%]",
            )}
          />

          <div className="absolute left-2.5 top-2.5 flex flex-col gap-1.5">
            {pct >= 20 && (
              <Badge className="bg-deal text-deal-foreground shadow-soft">
                {pct}% off
              </Badge>
            )}
            {product.isNew && (
              <Badge className="bg-brand-blue text-brand-blue-foreground shadow-soft">
                New
              </Badge>
            )}
          </div>

          <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-end justify-between gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <Tooltip>
              <TooltipTrigger asChild>
                <span className={cn("badge-inventory shadow-soft", inventory.className)}>
                  {inventory.label}
                </span>
              </TooltipTrigger>
              <TooltipContent>{inventory.tip}</TooltipContent>
            </Tooltip>
          </div>

          <div className="absolute inset-x-0 bottom-0 translate-y-2 opacity-0 transition-all duration-300 ease-retail group-hover:translate-y-0 group-hover:opacity-100">
            <div className="bg-gradient-to-t from-black/45 to-transparent p-3 pt-10">
              <Button
                type="button"
                size="sm"
                variant="secondary"
                className="w-full bg-surface/95 shadow-lift backdrop-blur-sm"
                onClick={(e) => {
                  e.preventDefault()
                  onQuickView?.(product)
                }}
              >
                <Eye className="h-3.5 w-3.5" />
                Quick view
              </Button>
            </div>
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-1.5 pt-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate text-2xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              {product.brand}
            </p>
            <Link
              to={`/product/${product.slug}`}
              className="mt-0.5 line-clamp-2 text-sm font-medium leading-snug text-foreground transition-colors hover:text-foreground/70"
            >
              {product.name}
            </Link>
          </div>
          <div className="flex shrink-0 gap-1 pt-1" aria-label="Available colorways">
            {product.colorways.slice(0, 4).map((color) => (
              <span
                key={color.id}
                title={color.name}
                className="h-3 w-3 rounded-full border border-black/10 shadow-soft"
                style={{ backgroundColor: color.hex }}
              />
            ))}
            {product.colorways.length > 4 && (
              <span className="text-2xs text-muted-foreground">
                +{product.colorways.length - 4}
              </span>
            )}
          </div>
        </div>

        <div className="mt-auto flex flex-wrap items-baseline gap-x-2 gap-y-0.5 pt-1">
          <span className="price-deal text-[0.95rem]">
            {formatCurrency(product.price)}
          </span>
          <span className="price-compare text-xs">
            Compare at {formatCurrency(product.compareAt)}
          </span>
        </div>

        <p className="text-2xs text-muted-foreground">
          {product.brandTier} · {product.category}
        </p>
      </div>
    </article>
  )
}

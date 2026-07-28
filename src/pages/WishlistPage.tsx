import { Link } from "react-router-dom"
import { Heart, Trash2 } from "lucide-react"
import { PRODUCTS } from "@/data/products"
import { useWishlistStore } from "@/stores/wishlistStore"
import { ProductCard } from "@/components/catalog/ProductCard"
import { Button } from "@/components/ui/button"
import { useDocumentMeta } from "@/hooks/useDocumentMeta"
import { formatCurrency } from "@/lib/utils"

export function WishlistPage() {
  useDocumentMeta({
    title: "Wishlist | Marshalls",
    description: "Saved Marshalls finds ready when you are.",
  })

  const productIds = useWishlistStore((s) => s.productIds)
  const remove = useWishlistStore((s) => s.remove)
  const clear = useWishlistStore((s) => s.clear)
  const products = productIds
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter(Boolean)

  return (
    <div className="shelf-container py-8 md:py-12">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="inline-flex items-center gap-1.5 text-2xs font-bold uppercase tracking-[0.12em] text-primary">
            <Heart className="h-3.5 w-3.5" /> Saved finds
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-navy">
            Wishlist
          </h1>
          <p className="mt-2 text-muted-foreground">
            {products.length === 0
              ? "Nothing saved yet — tap the heart on styles you love."
              : `${products.length} saved style${products.length === 1 ? "" : "s"}`}
          </p>
        </div>
        {products.length > 0 && (
          <Button variant="outline" onClick={clear}>
            Clear wishlist
          </Button>
        )}
      </div>

      {products.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-surface-muted/40 px-6 py-16 text-center">
          <Heart className="mx-auto h-10 w-10 text-muted-foreground" />
          <p className="mt-4 font-display text-xl font-bold">Your wishlist is empty</p>
          <Button asChild className="mt-6">
            <Link to="/catalog">Start shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) =>
            product ? (
              <div key={product.id} className="relative">
                <ProductCard product={product} />
                <button
                  type="button"
                  className="absolute right-2 top-2 z-10 rounded-full bg-surface/95 p-2 shadow-soft hover:text-primary"
                  aria-label={`Remove ${product.name} from wishlist`}
                  onClick={() => remove(product.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <p className="sr-only">{formatCurrency(product.price)}</p>
              </div>
            ) : null,
          )}
        </div>
      )}
    </div>
  )
}

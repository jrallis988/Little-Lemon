import { useEffect, useState } from "react"
import { Link, NavLink, useSearchParams } from "react-router-dom"
import {
  Menu,
  ShoppingBag,
  User,
  MapPin,
  Heart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { useCartStore } from "@/stores/cartStore"
import { useWishlistStore } from "@/stores/wishlistStore"
import { useAccountStore } from "@/stores/accountStore"
import { navHref, SHOP_NAV } from "@/data/navigation"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { SearchTypeahead } from "@/components/layout/SearchTypeahead"
import { cn } from "@/lib/utils"

const PROMO_MESSAGES = [
  "Free shipping on orders $89+",
  "Extra 20% off clearance with code FIND20",
  "New finds drop daily — never the same store twice",
  "Brand names for less · In-store returns welcome",
  "Score designer styles before they’re gone",
]

function PromoTicker() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % PROMO_MESSAGES.length)
    }, 4200)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="bg-navy text-navy-foreground">
      <div className="shelf-container flex h-[var(--promo-height)] items-center justify-between gap-2">
        <button
          type="button"
          aria-label="Previous offer"
          className="rounded p-1 text-white/80 hover:bg-white/10 hover:text-white"
          onClick={() =>
            setIndex((i) => (i - 1 + PROMO_MESSAGES.length) % PROMO_MESSAGES.length)
          }
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <p
          key={index}
          className="animate-fade-in flex-1 text-center text-xs font-semibold tracking-wide sm:text-sm"
        >
          {PROMO_MESSAGES[index]}
        </p>
        <button
          type="button"
          aria-label="Next offer"
          className="rounded p-1 text-white/80 hover:bg-white/10 hover:text-white"
          onClick={() => setIndex((i) => (i + 1) % PROMO_MESSAGES.length)}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

export function SiteHeader() {
  const [params] = useSearchParams()
  const activeNav = params.get("nav")
  const openBag = useCartStore((s) => s.openBag)
  const itemCount = useCartStore((s) => s.itemCount())
  const [menuOpen, setMenuOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const wishlistCount = useWishlistStore((s) => s.productIds.length)
  const user = useAccountStore((s) => s.user)

  return (
    <header className="sticky top-0 z-40 shadow-header">
      <PromoTicker />

      {!user && (
        <div className="border-b border-border bg-surface-muted">
          <Link
            to="/account"
            className="shelf-container flex h-9 items-center justify-center gap-2 text-xs font-medium text-navy no-underline hover:underline sm:justify-start"
          >
            <User className="h-3.5 w-3.5" />
            Sign in or create an account for faster checkout!
            <span aria-hidden>›</span>
          </Link>
        </div>
      )}

      <div className="border-b border-border bg-surface">
        <div className="shelf-container">
          <div className="flex h-[var(--utility-height)] items-center justify-end gap-4 text-xs text-muted-foreground">
            <Link
              to="/stores"
              className="inline-flex items-center gap-1 text-muted-foreground no-underline hover:text-foreground"
            >
              <MapPin className="h-3.5 w-3.5" />
              Find a store
            </Link>
            <Link
              to="/gift-cards"
              className="hidden text-muted-foreground no-underline hover:text-foreground sm:inline"
            >
              Gift cards
            </Link>
            <Link
              to="/account"
              className="text-muted-foreground no-underline hover:text-foreground"
            >
              {user ? "My account" : "Sign in"}
            </Link>
          </div>

          <div className="relative flex h-[var(--header-height)] items-center gap-3 border-t border-border/70 sm:gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>

            <Link to="/" className="shrink-0" aria-label="Marshalls home">
              <span className="marshalls-wordmark">
                <span className="m-wide">M</span>arshalls
              </span>
            </Link>

            <div
              className="relative hidden lg:block"
              onMouseEnter={() => setMegaOpen(true)}
              onMouseLeave={() => setMegaOpen(false)}
            >
              <Button
                variant="ghost"
                className="font-semibold"
                aria-expanded={megaOpen}
                onClick={() => setMegaOpen((v) => !v)}
              >
                Shop
              </Button>
              {megaOpen && (
                <div className="absolute left-0 top-full z-50 w-[min(90vw,52rem)] rounded-md border border-border bg-surface p-5 shadow-drawer animate-fade-in">
                  <p className="text-2xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                    Shop by category
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-3">
                    {SHOP_NAV.map((item) => (
                      <Link
                        key={item.id}
                        to={navHref(item)}
                        className="rounded-md px-3 py-2 no-underline hover:bg-secondary"
                        onClick={() => setMegaOpen(false)}
                      >
                        <span className="block text-sm font-semibold text-foreground">
                          {item.menuLabel}
                        </span>
                        <span className="mt-0.5 block text-2xs text-muted-foreground">
                          {item.description}
                        </span>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-3 border-t border-border pt-3">
                    <Link
                      to="/shop/designer"
                      className="text-sm font-semibold text-navy no-underline hover:underline"
                      onClick={() => setMegaOpen(false)}
                    >
                      Designer Shop
                    </Link>
                    <Link
                      to="/shop/under-50"
                      className="text-sm font-semibold text-navy no-underline hover:underline"
                      onClick={() => setMegaOpen(false)}
                    >
                      Under $50
                    </Link>
                    <Link
                      to="/shop/clearance"
                      className="text-sm font-semibold text-primary no-underline hover:underline"
                      onClick={() => setMegaOpen(false)}
                    >
                      Clearance
                    </Link>
                    <Link
                      to="/fit-quiz"
                      className="text-sm font-semibold text-navy no-underline hover:underline"
                      onClick={() => setMegaOpen(false)}
                    >
                      Fit quiz
                    </Link>
                    <Link
                      to="/catalog?department=Pets"
                      className="text-sm font-semibold text-navy no-underline hover:underline"
                      onClick={() => setMegaOpen(false)}
                    >
                      Pet
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <NavLink
              to="/shop/clearance"
              className={({ isActive }) =>
                cn(
                  "hidden rounded-sm px-3 py-2 text-sm font-semibold text-primary transition-all hover:bg-deal-soft lg:inline-flex",
                  isActive && "bg-deal-soft",
                )
              }
            >
              Clearance
            </NavLink>

            <div className="ml-auto flex flex-1 items-center justify-end gap-1 sm:gap-2">
              <SearchTypeahead className="hidden max-w-md flex-1 md:block" />

              <Button variant="ghost" size="icon" className="relative hidden sm:inline-flex" asChild>
                <Link to="/wishlist" aria-label={`Wishlist, ${wishlistCount} items`}>
                  <Heart className="h-5 w-5" />
                  {wishlistCount > 0 && (
                    <span className="absolute -right-0.5 -top-0.5 flex h-[1.125rem] min-w-[1.125rem] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold leading-none text-primary-foreground">
                      {wishlistCount > 99 ? "99+" : wishlistCount}
                    </span>
                  )}
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link to="/account" aria-label="Account">
                  <User className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                aria-label={`Shopping bag, ${itemCount} items`}
                onClick={openBag}
              >
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-[1.125rem] min-w-[1.125rem] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold leading-none text-primary-foreground">
                    {itemCount > 99 ? "99+" : itemCount}
                  </span>
                )}
              </Button>
            </div>
          </div>

          <div className="pb-3 md:hidden">
            <SearchTypeahead onNavigate={() => setMenuOpen(false)} />
          </div>
        </div>

        {/* Desktop category rail — full taxonomy */}
        <nav
          className="hidden border-t border-border/70 lg:block"
          aria-label="Shop categories"
        >
          <div className="shelf-container flex gap-1 overflow-x-auto py-2 scrollbar-none">
            {SHOP_NAV.map((item) => (
              <Link
                key={item.id}
                to={`/department/${item.id}`}
                className={cn(
                  "shrink-0 rounded-sm px-2.5 py-1.5 text-xs font-semibold no-underline transition-colors hover:bg-secondary hover:text-foreground",
                  activeNav === item.id
                    ? "bg-secondary text-foreground"
                    : "text-foreground/75",
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/catalog?department=Pets"
              className={cn(
                "shrink-0 rounded-sm px-2.5 py-1.5 text-xs font-semibold no-underline transition-colors hover:bg-secondary hover:text-foreground",
                params.get("department") === "Pets"
                  ? "bg-secondary text-foreground"
                  : "text-foreground/75",
              )}
            >
              Pet
            </Link>
          </div>
        </nav>
      </div>

      <Dialog open={menuOpen} onOpenChange={setMenuOpen}>
        <DialogContent side="left" className="flex flex-col gap-0 overflow-y-auto p-0">
          <DialogHeader className="border-b border-border px-5 py-4 pr-12">
            <DialogTitle className="font-display text-lg">Shop Marshalls</DialogTitle>
          </DialogHeader>
          <nav className="flex flex-col p-2 pb-8" aria-label="Mobile">
            {SHOP_NAV.map((item) => (
              <Link
                key={item.id}
                to={navHref(item)}
                onClick={() => setMenuOpen(false)}
                className="rounded-md px-3 py-3 no-underline hover:bg-secondary"
              >
                <span className="block text-base font-semibold text-foreground">
                  {item.menuLabel}
                </span>
                <span className="mt-0.5 block text-xs text-muted-foreground">
                  {item.description}
                </span>
              </Link>
            ))}
            <Link
              to="/catalog?department=Pets"
              onClick={() => setMenuOpen(false)}
              className="rounded-md px-3 py-3 no-underline hover:bg-secondary"
            >
              <span className="block text-base font-semibold text-foreground">Pet</span>
              <span className="mt-0.5 block text-xs text-muted-foreground">
                Beds, bowls, toys, and pet apparel
              </span>
            </Link>
            <Link
              to="/shop/clearance"
              onClick={() => setMenuOpen(false)}
              className="rounded-md px-3 py-3 text-base font-semibold text-primary no-underline hover:bg-deal-soft"
            >
              Clearance
            </Link>
            <Link
              to="/shop/designer"
              onClick={() => setMenuOpen(false)}
              className="rounded-md px-3 py-3 text-sm font-medium no-underline hover:bg-secondary"
            >
              Designer Shop
            </Link>
            <Link
              to="/shop/under-50"
              onClick={() => setMenuOpen(false)}
              className="rounded-md px-3 py-3 text-sm font-medium no-underline hover:bg-secondary"
            >
              Under $50
            </Link>
            <Link
              to="/wishlist"
              onClick={() => setMenuOpen(false)}
              className="rounded-md px-3 py-3 text-sm font-medium no-underline hover:bg-secondary"
            >
              Wishlist
            </Link>
            <Link
              to="/account"
              onClick={() => setMenuOpen(false)}
              className="rounded-md px-3 py-3 text-sm font-medium no-underline hover:bg-secondary"
            >
              {user ? "My account" : "Sign in"}
            </Link>
            <Link
              to="/stores"
              onClick={() => setMenuOpen(false)}
              className="mt-2 rounded-md px-3 py-3 text-sm font-medium text-muted-foreground no-underline hover:bg-secondary hover:text-foreground"
            >
              Find a store
            </Link>
          </nav>
        </DialogContent>
      </Dialog>
    </header>
  )
}

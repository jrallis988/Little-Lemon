import { useEffect, useState, type FormEvent } from "react"
import { Link, NavLink, useNavigate, useSearchParams } from "react-router-dom"
import {
  Menu,
  Search,
  ShoppingBag,
  User,
  MapPin,
  Heart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { useCartStore } from "@/stores/cartStore"
import { useFilterStore } from "@/stores/filterStore"
import { navHref, SHOP_NAV } from "@/data/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const activeNav = params.get("nav")
  const openBag = useCartStore((s) => s.openBag)
  const itemCount = useCartStore((s) => s.itemCount())
  const query = useFilterStore((s) => s.query)
  const setQuery = useFilterStore((s) => s.setQuery)
  const [menuOpen, setMenuOpen] = useState(false)
  const [draftQuery, setDraftQuery] = useState(query)

  useEffect(() => {
    setDraftQuery(query)
  }, [query])

  function submitSearch(e: FormEvent) {
    e.preventDefault()
    const next = draftQuery.trim()
    setQuery(next)
    setMenuOpen(false)
    navigate(next ? `/catalog?q=${encodeURIComponent(next)}` : "/catalog")
  }

  return (
    <header className="sticky top-0 z-40 shadow-header">
      <PromoTicker />

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
            <button type="button" className="hidden hover:text-foreground sm:inline">
              Gift cards
            </button>
            <button type="button" className="hover:text-foreground">
              Sign in
            </button>
          </div>

          <div className="flex h-[var(--header-height)] items-center gap-3 border-t border-border/70 sm:gap-4">
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

            <Button
              variant="ghost"
              className="hidden font-semibold lg:inline-flex"
              onClick={() => setMenuOpen(true)}
            >
              Shop
            </Button>

            <NavLink
              to="/catalog?sort=discount"
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
              <form
                className="relative hidden max-w-md flex-1 md:block"
                onSubmit={submitSearch}
                role="search"
              >
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={draftQuery}
                  onChange={(e) => setDraftQuery(e.target.value)}
                  placeholder="Search Marshalls"
                  className="h-10 border-border bg-surface-muted pl-9 shadow-none focus-visible:bg-surface"
                  aria-label="Search Marshalls"
                />
              </form>

              <Button variant="ghost" size="icon" className="hidden sm:inline-flex" aria-label="Wishlist">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Account">
                <User className="h-5 w-5" />
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
            <form onSubmit={submitSearch} role="search" className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={draftQuery}
                onChange={(e) => setDraftQuery(e.target.value)}
                placeholder="Search Marshalls"
                className="h-10 bg-surface-muted pl-9 shadow-none"
                aria-label="Search Marshalls"
              />
            </form>
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
                to={navHref(item)}
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
              to="/catalog?sort=discount"
              onClick={() => setMenuOpen(false)}
              className="rounded-md px-3 py-3 text-base font-semibold text-primary no-underline hover:bg-deal-soft"
            >
              Clearance
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

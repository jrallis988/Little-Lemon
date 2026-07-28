import { useEffect, useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { Menu, Search, ShoppingBag, User, MapPin, Heart, ChevronLeft, ChevronRight } from "lucide-react"
import { useCartStore } from "@/stores/cartStore"
import { useFilterStore } from "@/stores/filterStore"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const NAV = [
  { to: "/catalog?department=Women", label: "Women" },
  { to: "/catalog?department=Men", label: "Men" },
  { to: "/catalog?department=Boys", label: "Boys" },
  { to: "/catalog?department=Girls", label: "Girls" },
  { to: "/catalog?department=Juniors", label: "Jr's" },
  { to: "/catalog?department=Kids", label: "Kids" },
  { to: "/catalog?department=Home", label: "Home" },
  { to: "/catalog?department=Beauty", label: "Beauty" },
  { to: "/catalog?department=Pets", label: "Pet" },
]

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
  const openBag = useCartStore((s) => s.openBag)
  const itemCount = useCartStore((s) => s.itemCount())
  const query = useFilterStore((s) => s.query)
  const setQuery = useFilterStore((s) => s.setQuery)

  return (
    <header className="sticky top-0 z-40 shadow-header">
      <PromoTicker />

      <div className="border-b border-border bg-surface">
        <div className="shelf-container">
          <div className="flex h-[var(--utility-height)] items-center justify-end gap-4 text-xs text-muted-foreground">
            <button type="button" className="inline-flex items-center gap-1 hover:text-foreground">
              <MapPin className="h-3.5 w-3.5" />
              Find a store
            </button>
            <button type="button" className="hidden hover:text-foreground sm:inline">
              Gift cards
            </button>
            <button type="button" className="hover:text-foreground">
              Sign in
            </button>
          </div>

          <div className="flex h-[var(--header-height)] items-center gap-3 border-t border-border/70 sm:gap-4">
            <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>

            <Link to="/" className="shrink-0" aria-label="Marshalls home">
              <span className="marshalls-wordmark">
                <span className="m-wide">M</span>arshalls
              </span>
            </Link>

            <nav className="ml-1 hidden items-center gap-0.5 lg:flex" aria-label="Primary">
              {NAV.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      "rounded-sm px-3 py-2 text-sm font-semibold text-foreground/80 transition-all hover:bg-secondary hover:text-foreground",
                      isActive && "bg-secondary text-foreground",
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <NavLink
                to="/catalog?sort=discount"
                className={({ isActive }) =>
                  cn(
                    "rounded-sm px-3 py-2 text-sm font-semibold text-primary transition-all hover:bg-deal-soft",
                    isActive && "bg-deal-soft",
                  )
                }
              >
                Clearance
              </NavLink>
            </nav>

            <div className="ml-auto flex flex-1 items-center justify-end gap-1 sm:gap-2">
              <form
                className="relative hidden max-w-md flex-1 md:block"
                onSubmit={(e) => e.preventDefault()}
                role="search"
              >
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
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
            <form onSubmit={(e) => e.preventDefault()} role="search" className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Marshalls"
                className="h-10 bg-surface-muted pl-9 shadow-none"
                aria-label="Search Marshalls"
              />
            </form>
          </div>
        </div>
      </div>
    </header>
  )
}

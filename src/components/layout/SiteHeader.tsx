import { Link, NavLink } from "react-router-dom"
import { Menu, Search, ShoppingBag, User, MapPin, Heart } from "lucide-react"
import { useCartStore } from "@/stores/cartStore"
import { useFilterStore } from "@/stores/filterStore"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const NAV = [
  { to: "/catalog?department=Women", label: "Women" },
  { to: "/catalog?department=Men", label: "Men" },
  { to: "/catalog?department=Kids", label: "Kids" },
  { to: "/catalog?department=Home", label: "Home" },
  { to: "/catalog?sort=newest", label: "New Arrivals" },
  { to: "/catalog?sort=discount", label: "Clearance" },
]

export function SiteHeader() {
  const openBag = useCartStore((s) => s.openBag)
  const itemCount = useCartStore((s) => s.itemCount())
  const query = useFilterStore((s) => s.query)
  const setQuery = useFilterStore((s) => s.setQuery)

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-foreground text-primary-foreground">
        <div className="shelf-container flex h-[var(--promo-height)] items-center justify-center gap-3 text-2xs font-medium tracking-[0.08em] uppercase sm:text-xs">
          <span className="hidden sm:inline">Free returns in store ·</span>
          <span>Extra 20% off clearance with code RACK20</span>
          <span className="hidden md:inline">· New designer drop daily at 10am ET</span>
        </div>
      </div>

      <div className="border-b border-border/80 bg-surface/90 shadow-header backdrop-blur-md">
        <div className="shelf-container">
          <div className="flex h-[var(--header-height)] items-center gap-4">
            <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>

            <Link
              to="/"
              className="group flex shrink-0 items-baseline gap-1.5"
              aria-label="Atelier Rack home"
            >
              <span className="font-display text-[1.35rem] font-extrabold tracking-[-0.04em] text-foreground sm:text-[1.55rem]">
                ATELIER
              </span>
              <span className="font-display text-[1.35rem] font-semibold tracking-[-0.03em] text-deal sm:text-[1.55rem]">
                RACK
              </span>
            </Link>

            <nav className="ml-4 hidden items-center gap-1 lg:flex" aria-label="Primary">
              {NAV.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
                      isActive && "bg-secondary text-foreground",
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
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
                  placeholder="Search brands, categories, styles…"
                  className="h-10 border-border/80 bg-surface-muted/60 pl-9 pr-3 shadow-none focus-visible:bg-surface"
                  aria-label="Search catalog"
                />
              </form>

              <Button variant="ghost" size="icon" className="hidden sm:inline-flex" aria-label="Find a store">
                <MapPin className="h-5 w-5" />
              </Button>
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
                  <span className="absolute -right-0.5 -top-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-deal px-1 text-[10px] font-bold leading-none text-deal-foreground">
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
                placeholder="Search the rack…"
                className="h-10 bg-surface-muted/70 pl-9 shadow-none"
                aria-label="Search catalog"
              />
            </form>
          </div>
        </div>
      </div>
    </header>
  )
}

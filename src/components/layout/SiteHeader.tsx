import { Link, NavLink } from "react-router-dom"
import { Menu, Search, ShoppingBag, User, MapPin } from "lucide-react"
import { useCartStore } from "@/stores/cartStore"
import { useFilterStore } from "@/stores/filterStore"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const NAV = [
  { to: "/catalog?department=Women", label: "Women" },
  { to: "/catalog?department=Men", label: "Men" },
  { to: "/catalog?category=Shoes", label: "Shoes" },
  { to: "/catalog?department=Home", label: "Home" },
  { to: "/catalog?department=Beauty", label: "Beauty" },
  { to: "/catalog?department=Kids", label: "Kids" },
]

export function SiteHeader() {
  const openBag = useCartStore((s) => s.openBag)
  const itemCount = useCartStore((s) => s.itemCount())
  const query = useFilterStore((s) => s.query)
  const setQuery = useFilterStore((s) => s.setQuery)

  return (
    <header className="sticky top-0 z-40 shadow-soft">
      <div className="bg-sky text-sky-foreground">
        <div className="shelf-container flex h-[var(--promo-height)] items-center justify-center gap-2 text-center text-xs font-semibold sm:gap-3 sm:text-sm">
          <span>Free shipping on orders $89+</span>
          <span className="hidden opacity-80 sm:inline" aria-hidden>
            |
          </span>
          <span className="hidden sm:inline">
            Extra 20% off clearance with code{" "}
            <Link to="/catalog?sort=discount" className="underline text-inherit">
              FIND20
            </Link>
          </span>
          <span className="hidden opacity-80 md:inline" aria-hidden>
            |
          </span>
          <span className="hidden md:inline">New finds drop daily</span>
        </div>
      </div>

      <div className="bg-primary text-primary-foreground">
        <div className="shelf-container">
          <div className="flex h-[var(--header-height)] items-center gap-3 sm:gap-5">
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-white/10 hover:text-primary-foreground lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>

            <Link to="/" className="shrink-0" aria-label="Marshalls home">
              <span className="marshalls-wordmark">Marshalls</span>
            </Link>

            <nav
              className="ml-2 hidden items-center gap-1 lg:flex"
              aria-label="Primary"
            >
              {NAV.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      "rounded-sm px-3 py-2 text-sm font-semibold text-white/90 transition-colors hover:bg-white/10 hover:text-white",
                      isActive && "bg-white/15 text-white",
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="ml-auto flex flex-1 items-center justify-end gap-2">
              <form
                className="relative hidden max-w-xs flex-1 md:block lg:max-w-sm"
                onSubmit={(e) => e.preventDefault()}
                role="search"
              >
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary/50" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search"
                  className="h-10 border-0 bg-white pl-9 text-foreground shadow-none placeholder:text-muted-foreground focus-visible:ring-white"
                  aria-label="Search Marshalls"
                />
              </form>

              <button
                type="button"
                className="hidden items-center gap-1.5 text-xs font-medium text-white/90 hover:text-white sm:inline-flex"
              >
                <MapPin className="h-4 w-4" />
                Stores
              </button>

              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
                aria-label="Account"
              >
                <User className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="relative text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
                aria-label={`Shopping bag, ${itemCount} items`}
                onClick={openBag}
              >
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-[1.125rem] min-w-[1.125rem] items-center justify-center rounded-full bg-sky px-1 text-[10px] font-bold leading-none text-sky-foreground">
                    {itemCount > 99 ? "99+" : itemCount}
                  </span>
                )}
              </Button>
            </div>
          </div>

          <div className="pb-3 md:hidden">
            <form onSubmit={(e) => e.preventDefault()} role="search" className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary/50" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Marshalls"
                className="h-10 border-0 bg-white pl-9 text-foreground shadow-none"
                aria-label="Search Marshalls"
              />
            </form>
          </div>
        </div>
      </div>
    </header>
  )
}

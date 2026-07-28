import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-surface-muted">
      <div className="shelf-container py-12">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <p className="marshalls-wordmark text-[1.5rem]">
              <span className="m-wide">M</span>arshalls
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Brand names for less. Get the latest finds delivered to your inbox.
            </p>
            <form
              className="mt-5 flex max-w-md gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <Input
                type="email"
                placeholder="Email address"
                className="h-10 bg-surface"
                aria-label="Email address"
              />
              <Button type="submit" className="shrink-0">
                Sign Up
              </Button>
            </form>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <p className="mb-3 text-2xs font-bold uppercase tracking-[0.1em] text-muted-foreground">
                Customer Service
              </p>
              <ul className="space-y-2 text-sm text-foreground/80">
                <li>Help center</li>
                <li>Order status</li>
                <li>Shipping & returns</li>
                <li>Gift cards</li>
              </ul>
            </div>
            <div>
              <p className="mb-3 text-2xs font-bold uppercase tracking-[0.1em] text-muted-foreground">
                Shopping
              </p>
              <ul className="space-y-2 text-sm">
                {[
                  { label: "Women", to: "/catalog?department=Women" },
                  { label: "Men", to: "/catalog?department=Men" },
                  { label: "Boys", to: "/catalog?department=Boys" },
                  { label: "Girls", to: "/catalog?department=Girls" },
                  { label: "Jr's", to: "/catalog?department=Juniors" },
                  { label: "Kids", to: "/catalog?department=Kids" },
                  { label: "Home", to: "/catalog?department=Home" },
                  { label: "Pet", to: "/catalog?department=Pets" },
                  { label: "Clearance", to: "/catalog?sort=discount" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className="text-foreground/80 no-underline hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 text-2xs font-bold uppercase tracking-[0.1em] text-muted-foreground">
                About
              </p>
              <ul className="space-y-2 text-sm text-foreground/80">
                <li>
                  <Link
                    to="/stores"
                    className="text-foreground/80 no-underline hover:text-primary"
                  >
                    Find a store
                  </Link>
                </li>
                <li>Careers</li>
                <li>TJX Companies</li>
                <li>Accessibility</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border bg-surface">
        <div className="shelf-container flex flex-col gap-2 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Marshalls. Brand names for less.</p>
          <p>Compare at prices based on competitor prices or original ticket.</p>
        </div>
      </div>
    </footer>
  )
}

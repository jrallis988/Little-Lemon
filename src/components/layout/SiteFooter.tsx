import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-primary text-primary-foreground">
      <div className="shelf-container py-12">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <p className="marshalls-wordmark text-[1.5rem]">Marshalls</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/80">
              Brand names for less. Get the latest finds delivered to your inbox.
            </p>
            <form
              className="mt-5 flex max-w-md gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <Input
                type="email"
                placeholder="Email address"
                className="h-10 border-0 bg-white/95 text-foreground"
                aria-label="Email address"
              />
              <Button
                type="submit"
                variant="secondary"
                className="shrink-0 bg-white text-primary hover:bg-white/90"
              >
                Sign Up
              </Button>
            </form>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <p className="mb-3 text-2xs font-bold uppercase tracking-[0.1em] text-white/70">
                Customer Service
              </p>
              <ul className="space-y-2 text-sm text-white/90">
                <li>Help center</li>
                <li>Order status</li>
                <li>Shipping & returns</li>
                <li>Gift cards</li>
              </ul>
            </div>
            <div>
              <p className="mb-3 text-2xs font-bold uppercase tracking-[0.1em] text-white/70">
                Shopping
              </p>
              <ul className="space-y-2 text-sm">
                {["Women", "Men", "Kids", "Home", "Shoes"].map((item) => (
                  <li key={item}>
                    <Link
                      to="/catalog"
                      className="text-white/90 no-underline hover:text-white"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 text-2xs font-bold uppercase tracking-[0.1em] text-white/70">
                About
              </p>
              <ul className="space-y-2 text-sm text-white/90">
                <li>Find a store</li>
                <li>Careers</li>
                <li>TJX Companies</li>
                <li>Accessibility</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="shelf-container flex flex-col gap-2 py-5 text-xs text-white/65 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Marshalls. Brand names for less.</p>
          <p>Compare at prices based on competitor prices or original ticket.</p>
        </div>
      </div>
    </footer>
  )
}

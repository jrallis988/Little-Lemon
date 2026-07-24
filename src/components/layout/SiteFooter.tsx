import { Link } from "react-router-dom"

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-surface-muted">
      <div className="shelf-container grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3 sm:col-span-2 lg:col-span-1">
          <p className="marshalls-wordmark text-[1.5rem] sm:text-[1.65rem]">Marshalls</p>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            Brand names for less. Never the same store twice — new designer and
            brand-name finds every day.
          </p>
        </div>
        <div>
          <p className="mb-3 text-2xs font-bold uppercase tracking-[0.08em] text-foreground">
            Shop
          </p>
          <ul className="space-y-2 text-sm">
            {["Women", "Men", "Kids", "Shoes", "Home", "Clearance"].map((item) => (
              <li key={item}>
                <Link
                  to="/catalog"
                  className="text-foreground/80 no-underline transition-colors hover:text-primary"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-3 text-2xs font-bold uppercase tracking-[0.08em] text-foreground">
            Help
          </p>
          <ul className="space-y-2 text-sm text-foreground/80">
            <li>Customer service</li>
            <li>Order status</li>
            <li>Shipping & returns</li>
            <li>Gift cards</li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-2xs font-bold uppercase tracking-[0.08em] text-foreground">
            About Marshalls
          </p>
          <ul className="space-y-2 text-sm text-foreground/80">
            <li>Find a store</li>
            <li>Careers</li>
            <li>TJX Companies</li>
            <li>Accessibility</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border bg-surface">
        <div className="shelf-container flex flex-col gap-2 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Marshalls. Brand names for less.</p>
          <p>Compare at prices are based on competitor prices or original ticket.</p>
        </div>
      </div>
    </footer>
  )
}

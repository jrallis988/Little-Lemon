import { Link } from "react-router-dom"

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="shelf-container grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3 sm:col-span-2 lg:col-span-1">
          <p className="font-display text-xl font-extrabold tracking-[-0.03em]">
            ATELIER <span className="text-deal">RACK</span>
          </p>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            Designer and contemporary brands at off-price. Fresh inventory daily —
            find it, love it, leave with more.
          </p>
        </div>
        <div>
          <p className="mb-3 text-2xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            Shop
          </p>
          <ul className="space-y-2 text-sm">
            {["Women", "Men", "Kids", "Home", "Clearance"].map((item) => (
              <li key={item}>
                <Link to="/catalog" className="text-foreground/80 transition-colors hover:text-foreground">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-3 text-2xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            Help
          </p>
          <ul className="space-y-2 text-sm text-foreground/80">
            <li>Order status</li>
            <li>Returns & exchanges</li>
            <li>Store pickup</li>
            <li>Size & fit guides</li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-2xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            About
          </p>
          <ul className="space-y-2 text-sm text-foreground/80">
            <li>Our stores</li>
            <li>Careers</li>
            <li>Sustainability</li>
            <li>Accessibility</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="shelf-container flex flex-col gap-2 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Atelier Rack. Prices reflect off-price retail.</p>
          <p>Compare-at prices are based on MSRP or original ticket.</p>
        </div>
      </div>
    </footer>
  )
}

import { Link } from "react-router-dom"
import { SearchX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useFilterStore } from "@/stores/filterStore"

const RECOVERY = [
  { label: "Designer Shop", to: "/designer-shop" },
  { label: "Under $50", to: "/under-50" },
  { label: "Clearance", to: "/clearance" },
  { label: "Women", to: "/department/women" },
] as const

export function EmptyCatalogState() {
  const clearFilters = useFilterStore((s) => s.clearFilters)
  const setQuery = useFilterStore((s) => s.setQuery)
  const query = useFilterStore((s) => s.query)

  return (
    <div className="flex min-h-[42vh] flex-col items-center justify-center rounded-lg border border-dashed border-border bg-surface/60 px-6 py-16 text-center shadow-soft">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-sky-soft">
        <SearchX className="h-5 w-5 text-navy" />
      </div>
      <h2 className="font-display text-xl font-bold tracking-tight text-navy">
        {query ? `No results for “${query}”` : "Nothing matches these filters"}
      </h2>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        Inventory turns over daily at Marshalls — try a broader search or jump into a
        treasure-hunt edit below.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        <Button
          className="bg-navy hover:bg-navy/90"
          onClick={() => {
            clearFilters()
            setQuery("")
          }}
        >
          Clear all filters
        </Button>
        <Button variant="outline" onClick={() => setQuery("")}>
          Clear search
        </Button>
      </div>
      <ul className="mt-8 flex flex-wrap items-center justify-center gap-2">
        {RECOVERY.map((item) => (
          <li key={item.to}>
            <Link
              to={item.to}
              className="inline-flex rounded-full border border-border bg-surface px-3 py-1.5 text-sm font-semibold text-navy no-underline hover:border-navy/40"
              onClick={() => {
                clearFilters()
                setQuery("")
              }}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

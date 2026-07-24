import { SearchX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useFilterStore } from "@/stores/filterStore"

export function EmptyCatalogState() {
  const clearFilters = useFilterStore((s) => s.clearFilters)
  const setQuery = useFilterStore((s) => s.setQuery)
  const query = useFilterStore((s) => s.query)

  return (
    <div className="flex min-h-[42vh] flex-col items-center justify-center rounded-lg border border-dashed border-border bg-surface/60 px-6 py-16 text-center shadow-soft">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
        <SearchX className="h-5 w-5 text-muted-foreground" />
      </div>
      <h2 className="font-display text-xl font-bold tracking-tight">
        {query ? `No results for “${query}”` : "No products match these filters"}
      </h2>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        Try broadening your size, brand, or price range — new finds land daily
        at Marshalls.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        <Button
          variant="outline"
          onClick={() => {
            clearFilters()
            setQuery("")
          }}
        >
          Clear all filters
        </Button>
        <Button variant="ghost" onClick={() => setQuery("")}>
          Clear search
        </Button>
      </div>
    </div>
  )
}

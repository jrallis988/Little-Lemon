import { useMemo, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { Clock, MapPin, Phone, Store } from "lucide-react"
import { STORE_LOCATIONS } from "@/data/stores"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useDocumentMeta } from "@/hooks/useDocumentMeta"
import { cn } from "@/lib/utils"

export function StoreFinderPage() {
  useDocumentMeta({
    title: "Find a Store | Marshalls",
    description:
      "Locate a Marshalls near you for in-store shopping, BOPIS pickup, and easy returns.",
  })

  const [params] = useSearchParams()
  const [zip, setZip] = useState(params.get("zip") ?? "10003")
  const [query, setQuery] = useState(zip)
  const [selectedId, setSelectedId] = useState(STORE_LOCATIONS[0]?.id ?? "")

  const stores = useMemo(
    () => [...STORE_LOCATIONS].sort((a, b) => a.distanceMi - b.distanceMi),
    [],
  )
  const selected = stores.find((s) => s.id === selectedId) ?? stores[0]

  return (
    <div className="shelf-container py-8 md:py-12">
      <div className="max-w-2xl">
        <p className="text-2xs font-bold uppercase tracking-[0.12em] text-primary">
          Store locator
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-navy md:text-4xl">
          Find a Marshalls near you
        </h1>
        <p className="mt-3 text-muted-foreground">
          Check hours, services, and reserve eligible styles for pickup.
        </p>
      </div>

      <form
        className="mt-8 flex max-w-xl gap-2"
        onSubmit={(e) => {
          e.preventDefault()
          setZip(query.trim() || zip)
        }}
      >
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter ZIP or city"
          className="h-11"
          aria-label="ZIP or city"
        />
        <Button type="submit" className="shrink-0">
          Search
        </Button>
      </form>
      <p className="mt-2 text-xs text-muted-foreground">
        Showing stores near <span className="font-semibold text-foreground">{zip}</span>
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <ul className="space-y-3">
          {stores.map((store) => {
            const active = store.id === selectedId
            return (
              <li key={store.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(store.id)}
                  className={cn(
                    "w-full rounded-md border px-4 py-4 text-left transition-colors",
                    active
                      ? "border-primary bg-sky-soft/50 shadow-soft"
                      : "border-border bg-surface hover:border-primary/40",
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold">{store.name}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {store.address}, {store.city}, {store.state} {store.zip}
                      </p>
                    </div>
                    <span className="shrink-0 text-xs font-semibold text-primary">
                      {store.distanceMi} mi
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {store.services.map((service) => (
                      <Badge
                        key={service}
                        className="bg-secondary text-secondary-foreground"
                      >
                        {service}
                      </Badge>
                    ))}
                  </div>
                </button>
              </li>
            )
          })}
        </ul>

        {selected && (
          <div className="rounded-lg border border-border bg-surface p-6 shadow-soft">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-deal-soft text-primary">
                <Store className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold">{selected.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {selected.address}
                  <br />
                  {selected.city}, {selected.state} {selected.zip}
                </p>
              </div>
            </div>

            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex gap-2">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <div>
                  <dt className="font-semibold">Hours</dt>
                  <dd className="text-muted-foreground">{selected.hours}</dd>
                </div>
              </div>
              <div className="flex gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <div>
                  <dt className="font-semibold">Phone</dt>
                  <dd className="text-muted-foreground">{selected.phone}</dd>
                </div>
              </div>
              <div className="flex gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <div>
                  <dt className="font-semibold">Distance</dt>
                  <dd className="text-muted-foreground">
                    {selected.distanceMi} miles from {zip}
                  </dd>
                </div>
              </div>
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link to={`/catalog`}>Shop for pickup</Link>
              </Button>
              <Button asChild variant="outline">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(
                    `${selected.address}, ${selected.city}, ${selected.state} ${selected.zip}`,
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Get directions
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

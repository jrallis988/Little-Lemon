import { useEffect, useId, useRef, useState, type FormEvent, type KeyboardEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Clock3, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useFilterStore } from "@/stores/filterStore"
import {
  getSearchSuggestions,
  pushRecentSearch,
  type SearchSuggestion,
} from "@/lib/search"
import { track } from "@/lib/analytics"
import { cn } from "@/lib/utils"

type SearchTypeaheadProps = {
  className?: string
  inputClassName?: string
  onNavigate?: () => void
}

export function SearchTypeahead({
  className,
  inputClassName,
  onNavigate,
}: SearchTypeaheadProps) {
  const navigate = useNavigate()
  const query = useFilterStore((s) => s.query)
  const setQuery = useFilterStore((s) => s.setQuery)
  const [draft, setDraft] = useState(query)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(-1)
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const rootRef = useRef<HTMLFormElement>(null)
  const listId = useId()

  useEffect(() => {
    setDraft(query)
  }, [query])

  useEffect(() => {
    setSuggestions(getSearchSuggestions(draft))
    setActive(-1)
  }, [draft])

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", onDoc)
    return () => document.removeEventListener("mousedown", onDoc)
  }, [])

  function go(to: string, label?: string) {
    if (label) pushRecentSearch(label)
    const q = label ?? draft.trim()
    if (q) {
      setQuery(q)
      track("search", { query: q, destination: to })
    }
    setOpen(false)
    onNavigate?.()
    navigate(to)
  }

  function submitSearch(e: FormEvent) {
    e.preventDefault()
    const next = draft.trim()
    const destination = next ? `/catalog?q=${encodeURIComponent(next)}` : "/catalog"
    go(destination, next || undefined)
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (!open || suggestions.length === 0) return
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActive((i) => (i + 1) % suggestions.length)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActive((i) => (i <= 0 ? suggestions.length - 1 : i - 1))
    } else if (e.key === "Enter" && active >= 0) {
      e.preventDefault()
      const item = suggestions[active]
      if (item) go(item.to, item.label)
    } else if (e.key === "Escape") {
      setOpen(false)
    }
  }

  return (
    <form
      ref={rootRef}
      className={cn("relative", className)}
      onSubmit={submitSearch}
      role="search"
    >
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={draft}
        onChange={(e) => {
          setDraft(e.target.value)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        placeholder="Search Marshalls"
        className={cn(
          "h-10 border-border bg-surface-muted pl-9 shadow-none focus-visible:bg-surface",
          inputClassName,
        )}
        aria-label="Search Marshalls"
        aria-autocomplete="list"
        aria-controls={listId}
        aria-expanded={open}
        role="combobox"
      />
      {open && suggestions.length > 0 && (
        <ul
          id={listId}
          role="listbox"
          className="absolute left-0 right-0 top-[calc(100%+0.35rem)] z-50 max-h-80 overflow-y-auto rounded-md border border-border bg-surface py-1 shadow-drawer animate-fade-in"
        >
          {suggestions.map((item, index) => (
            <li key={`${item.type}-${item.label}-${item.to}`} role="option" aria-selected={active === index}>
              <Link
                to={item.to}
                className={cn(
                  "flex items-start gap-2 px-3 py-2 no-underline hover:bg-secondary",
                  active === index && "bg-secondary",
                )}
                onMouseEnter={() => setActive(index)}
                onClick={(e) => {
                  e.preventDefault()
                  go(item.to, item.label)
                }}
              >
                {item.type === "recent" ? (
                  <Clock3 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                ) : (
                  <Search className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                )}
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium text-foreground">
                    {item.label}
                  </span>
                  {item.meta && (
                    <span className="block truncate text-2xs text-muted-foreground">
                      {item.meta}
                    </span>
                  )}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </form>
  )
}

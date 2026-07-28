import { Link } from "react-router-dom"
import { Home, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useDocumentMeta } from "@/hooks/useDocumentMeta"

export function NotFoundPage() {
  useDocumentMeta({
    title: "Page Not Found | Marshalls",
    description: "We couldn’t find that page. Keep hunting — new finds land daily.",
  })

  return (
    <div className="shelf-container flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <p className="marshalls-wordmark mb-4 text-3xl">
        <span className="m-wide">M</span>arshalls
      </p>
      <p className="text-2xs font-bold uppercase tracking-[0.14em] text-primary">404</p>
      <h1 className="mt-2 font-display text-3xl font-bold tracking-tight">
        This find walked out already
      </h1>
      <p className="mt-3 max-w-md text-sm text-muted-foreground">
        The page you’re looking for isn’t here — but thousands of brand-name styles still are.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link to="/">
            <Home className="h-4 w-4" />
            Back home
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/catalog">
            <Search className="h-4 w-4" />
            Shop the catalog
          </Link>
        </Button>
      </div>
    </div>
  )
}

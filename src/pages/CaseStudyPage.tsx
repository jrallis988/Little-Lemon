import { Link } from "react-router-dom"
import { ArrowRight, Layers, Palette, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useDocumentMeta } from "@/hooks/useDocumentMeta"

const DECISIONS = [
  {
    title: "Brand lock, not a clone",
    body: "Live Marshalls.com is a full retail platform. This piece is a redesign concept: Marshalls blue, off-price voice, and treasure-hunt IA — not a pixel-for-pixel rebuild.",
  },
  {
    title: "Happy-path commerce",
    body: "Home → catalog → PDP → bag → checkout is fully clickable. Auth, payments, and inventory are simulated so the interaction design can be reviewed without a backend.",
  },
  {
    title: "Mobile as a first surface",
    body: "Sticky purchase bars, a functional hamburger drawer, and touch-friendly product cards — the same 21 screens, not a shrunk desktop.",
  },
] as const

const STACK = [
  "React 18 + TypeScript",
  "Vite + Tailwind",
  "Zustand + localStorage",
  "React Router",
] as const

export function CaseStudyPage() {
  useDocumentMeta({
    title: "Case Study | Marshalls Concept",
    description:
      "Portfolio redesign concept for a Marshalls off-price storefront — not affiliated with TJX.",
  })

  return (
    <div>
      <section className="border-b border-border bg-navy text-navy-foreground">
        <div className="shelf-container py-12 md:py-16">
          <p className="text-2xs font-bold uppercase tracking-[0.14em] text-white/70">
            Portfolio concept
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold italic md:text-5xl">
            Marshalls storefront redesign
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/85 md:text-lg">
            An interaction and visual design study for an off-price retailer. Independent
            portfolio work — not a live Marshalls site, and not affiliated with TJX Companies.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-white text-navy hover:bg-white/90">
              <Link to="/">
                Enter the storefront
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/50 bg-white/10 text-white hover:bg-white/20 hover:text-white"
            >
              <Link to="/design-system">Design system</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="shelf-container py-12 md:py-14">
        <h2 className="font-display text-2xl font-bold italic text-navy">The brief</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Reimagine Marshalls.com as a cleaner, mobile-first hunt: compare-at pricing,
          department landings, and a guest checkout that still feels retail — without
          copying the current production chrome.
        </p>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {DECISIONS.map((item) => (
            <li
              key={item.title}
              className="rounded-md border border-border bg-surface p-5 shadow-soft"
            >
              <h3 className="font-display text-lg font-bold text-navy">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y border-border bg-surface-muted/50">
        <div className="shelf-container grid gap-8 py-12 md:grid-cols-3 md:py-14">
          <div>
            <Palette className="h-5 w-5 text-primary" />
            <h2 className="mt-3 font-display text-xl font-bold italic text-navy">
              Visual system
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Marshalls blue <span className="font-semibold text-navy">#003DA5</span>,
              Libre Baskerville wordmark, Source Sans 3 UI.
            </p>
          </div>
          <div>
            <ShoppingBag className="h-5 w-5 text-primary" />
            <h2 className="mt-3 font-display text-xl font-bold italic text-navy">
              21 mapped screens
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Home, PLP, PDP, merch edits, stores, account, bag, checkout, chat, and 404 —
              documented on the contact sheet.
            </p>
          </div>
          <div>
            <Layers className="h-5 w-5 text-primary" />
            <h2 className="mt-3 font-display text-xl font-bold italic text-navy">Stack</h2>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              {STACK.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="shelf-container py-12 md:py-14">
        <h2 className="font-display text-2xl font-bold italic text-navy">
          How to review this piece
        </h2>
        <ol className="mt-5 max-w-xl list-decimal space-y-3 pl-5 text-sm text-muted-foreground">
          <li>
            Walk the happy path: Women → a product → add to bag → checkout (test card{" "}
            <span className="font-semibold text-foreground">4242…4242</span>).
          </li>
          <li>Open the design system for tokens, type, and the full screen index.</li>
          <li>
            Resize to a phone width — sticky PDP / bag CTAs and the hamburger drawer are
            part of the study.
          </li>
        </ol>
        <p className="mt-8 max-w-2xl text-xs text-muted-foreground">
          Photography is Unsplash stand-in imagery. Brand names appear as off-price
          merchandising fiction. This concept is for portfolio demonstration only.
        </p>
      </section>
    </div>
  )
}

import { Link } from "react-router-dom"
import { ArrowUpRight, Layers, Smartphone, Monitor } from "lucide-react"
import { SCREENS, screensByGroup } from "@/data/screens"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useDocumentMeta } from "@/hooks/useDocumentMeta"
import { cn } from "@/lib/utils"

const COLOR_TOKENS = [
  { name: "Brand blue / Navy", swatch: "bg-navy", hex: "#003DA5", token: "--navy / --brand-blue" },
  { name: "Primary CTA", swatch: "bg-primary", hex: "#003DA5", token: "--primary" },
  { name: "Sky soft", swatch: "bg-sky-soft", hex: "hsl(205 90% 96%)", token: "--sky-soft" },
  { name: "Deal soft", swatch: "bg-deal-soft", hex: "hsl(218 80% 96%)", token: "--deal-soft" },
  { name: "Surface", swatch: "bg-surface border border-border", hex: "#FFFFFF", token: "--surface" },
  { name: "Surface muted", swatch: "bg-surface-muted", hex: "hsl(210 16% 97%)", token: "--surface-muted" },
  { name: "Foreground", swatch: "bg-foreground", hex: "hsl(220 18% 12%)", token: "--foreground" },
  { name: "Muted text", swatch: "bg-muted-foreground", hex: "hsl(215 12% 42%)", token: "--muted-foreground" },
] as const

const TYPE_SAMPLES = [
  {
    label: "Display / Wordmark",
    className: "marshalls-wordmark text-[2.5rem]",
    sample: (
      <>
        <span className="m-wide">M</span>arshalls
      </>
    ),
    note: "Libre Baskerville italic · brand blue",
  },
  {
    label: "Section title",
    className: "font-display text-3xl font-bold italic text-navy",
    sample: "This Week’s Best Finds",
    note: "font-display · italic · navy",
  },
  {
    label: "Body",
    className: "font-sans text-base text-foreground",
    sample: "Brand names for less — never the same store twice.",
    note: "Source Sans 3 · body",
  },
  {
    label: "Utility / eyebrow",
    className: "text-2xs font-bold uppercase tracking-[0.12em] text-primary",
    sample: "Secure guest checkout",
    note: "2xs · uppercase · tracking",
  },
] as const

const HIERARCHY = [
  {
    title: "App shell",
    items: ["SiteHeader", "SiteFooter", "BagDrawer", "SupportChat", "ToastHost", "WelcomeEmailModal"],
  },
  {
    title: "Catalog",
    items: ["CatalogView", "FilterSidebar", "CatalogToolbar", "ProductCard", "QuickViewDialog"],
  },
  {
    title: "Commerce",
    items: ["BagPage", "CheckoutPage", "cartStore", "checkoutStore", "accountStore"],
  },
  {
    title: "Primitives (ui/)",
    items: ["Button", "Input", "Dialog", "Select", "Badge", "Checkbox", "Tooltip"],
  },
] as const

export function DesignSystemPage() {
  useDocumentMeta({
    title: "Design System | Marshalls Prototype",
    description:
      "Contact sheet, tokens, and component hierarchy for the Marshalls redesign prototype.",
  })

  const groups = screensByGroup()

  return (
    <div className="bg-surface-muted/40">
      <section className="border-b border-border bg-surface">
        <div className="shelf-container py-10 md:py-14">
          <p className="text-2xs font-bold uppercase tracking-[0.14em] text-primary">
            00 · Global contact sheet
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold italic text-navy md:text-5xl">
            Design system
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Responsive, minimalist Marshalls storefront prototype — {SCREENS.length}{" "}
            documented surfaces, shared tokens, and a clean component hierarchy on Vite +
            React + Tailwind.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Badge className="bg-navy text-navy-foreground">Vite · React · TypeScript</Badge>
            <Badge className="bg-sky-soft text-navy">Tailwind tokens</Badge>
            <Badge className="bg-secondary text-secondary-foreground">
              Zustand + localStorage
            </Badge>
          </div>
        </div>
      </section>

      {/* Tokens */}
      <section className="shelf-container py-10 md:py-12">
        <h2 className="section-rule-title font-display text-2xl font-bold italic text-navy">
          Color tokens
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {COLOR_TOKENS.map((token) => (
            <div
              key={token.name}
              className="overflow-hidden rounded-md border border-border bg-surface shadow-soft"
            >
              <div className={cn("h-16", token.swatch)} />
              <div className="space-y-0.5 p-3">
                <p className="text-sm font-semibold">{token.name}</p>
                <p className="text-2xs text-muted-foreground">{token.hex}</p>
                <p className="font-mono text-[10px] text-muted-foreground">{token.token}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Typography */}
      <section className="border-y border-border bg-surface">
        <div className="shelf-container py-10 md:py-12">
          <h2 className="section-rule-title font-display text-2xl font-bold italic text-navy">
            Typography
          </h2>
          <ul className="mt-6 space-y-5">
            {TYPE_SAMPLES.map((item) => (
              <li
                key={item.label}
                className="rounded-md border border-border bg-surface-muted/40 px-4 py-4"
              >
                <p className="text-2xs font-bold uppercase tracking-[0.1em] text-muted-foreground">
                  {item.label}
                </p>
                <div className={cn("mt-2", item.className)}>{item.sample}</div>
                <p className="mt-1 text-xs text-muted-foreground">{item.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Hierarchy */}
      <section className="shelf-container py-10 md:py-12">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-bold italic text-navy">
            Component hierarchy
          </h2>
          <p className="text-sm text-muted-foreground">
            <Layers className="mr-1 inline h-4 w-4" />
            Modular feature folders under <code className="text-xs">src/components</code>
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HIERARCHY.map((block) => (
            <div
              key={block.title}
              className="rounded-md border border-border bg-surface p-4 shadow-soft"
            >
              <p className="text-sm font-bold text-navy">{block.title}</p>
              <ul className="mt-3 space-y-1.5">
                {block.items.map((item) => (
                  <li key={item} className="text-sm text-muted-foreground">
                    <code className="text-xs text-foreground">{item}</code>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Contact sheet */}
      <section id="screens" className="border-t border-border bg-surface">
        <div className="shelf-container py-10 md:py-14">
          <h2 className="font-display text-2xl font-bold italic text-navy md:text-3xl">
            All screens
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Click any tile to open that route. Support Chat is a global overlay — open it from
            the floating button on any page.
          </p>

          <div className="mt-10 space-y-12">
            {groups.map(({ group, screens }) => (
              <div key={group}>
                <h3 className="text-2xs font-bold uppercase tracking-[0.14em] text-primary">
                  {group}
                </h3>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {screens.map((screen) => (
                    <Link
                      key={screen.id}
                      to={screen.path}
                      className="group flex flex-col overflow-hidden rounded-md border border-border bg-surface no-underline shadow-soft transition-all hover:-translate-y-0.5 hover:border-navy/30 hover:shadow-lift"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-surface-muted">
                        {screen.preview ? (
                          <img
                            src={screen.preview}
                            alt=""
                            className="h-full w-full object-cover object-top transition-transform duration-500 ease-retail group-hover:scale-[1.02]"
                            loading="lazy"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                            No preview
                          </div>
                        )}
                        <span className="absolute left-2 top-2 rounded-sm bg-navy px-1.5 py-0.5 text-[10px] font-bold text-navy-foreground">
                          {screen.number}
                        </span>
                        {screen.overlay && (
                          <span className="absolute right-2 top-2 rounded-sm bg-foreground/80 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                            Overlay
                          </span>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col gap-1 p-3">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-semibold text-foreground">{screen.title}</p>
                          <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                        </div>
                        <p className="line-clamp-2 text-2xs leading-relaxed text-muted-foreground">
                          {screen.description}
                        </p>
                        <p className="mt-auto flex items-center gap-1 pt-2 text-[10px] font-medium text-muted-foreground">
                          {screen.viewport === "mobile" ? (
                            <Smartphone className="h-3 w-3" />
                          ) : (
                            <Monitor className="h-3 w-3" />
                          )}
                          {screen.viewport ?? "both"} · {screen.page}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div
            id="support-chat"
            className="mt-12 rounded-md border border-navy/20 bg-sky-soft px-5 py-5"
          >
            <p className="text-sm font-semibold text-navy">Support Chat (global)</p>
            <p className="mt-1 text-sm text-muted-foreground">
              The chat widget is mounted in <code className="text-xs">AppShell</code> and
              available on every route via the floating Chat button — not a standalone page.
            </p>
            <Button
              type="button"
              className="mt-4 bg-navy hover:bg-navy/90"
              onClick={() => window.dispatchEvent(new CustomEvent("marshalls:open-chat"))}
            >
              Open support chat
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

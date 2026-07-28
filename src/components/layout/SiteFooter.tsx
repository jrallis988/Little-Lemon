import { useState, type FormEvent } from "react"
import { Link } from "react-router-dom"
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Minus,
  Plus,
  Youtube,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

const UTILITY_TILES = [
  {
    title: "Shop IRL, too",
    body: "Every store is different, but they all have the good stuff.",
    links: [{ label: "Find Your Store", to: "/stores" }],
  },
  {
    title: "TJX Rewards",
    body: "Enjoy 10% off your first purchase when you open a TJX Rewards credit card today.",
    links: [{ label: "Learn More & Apply", to: "/catalog" }],
  },
  {
    title: "Gift cards",
    body: "In case you wanna let them pick.",
    links: [
      { label: "Shop Gift Cards", to: "/catalog" },
      { label: "Check Your Balance", to: "/catalog" },
    ],
  },
  {
    title: "Need to make a return?",
    body: "Bring your shipping confirmation email to store for free returns. Some exclusions apply.",
    links: [{ label: "Learn More", to: "/catalog" }],
  },
] as const

const SISTER_BRANDS: {
  name: string
  href: string
  className: string
  internal?: boolean
}[] = [
  {
    name: "T.J.Maxx",
    href: "https://tjmaxx.tjx.com",
    className: "font-sans text-[1.65rem] font-black tracking-tight text-[#C8102E]",
  },
  {
    name: "Marshalls",
    href: "/",
    className: "marshalls-wordmark text-[1.75rem]",
    internal: true,
  },
  {
    name: "HomeGoods",
    href: "https://www.homegoods.com",
    className: "font-display text-[1.55rem] font-bold italic tracking-tight text-[#C8102E]",
  },
  {
    name: "Sierra",
    href: "https://www.sierra.com",
    className: "font-sans text-[1.45rem] font-bold tracking-[0.04em] text-[#C47A2C]",
  },
  {
    name: "Homesense",
    href: "https://www.homesense.com",
    className:
      "inline-block bg-[#2F6B3A] px-3 py-1 font-sans text-[1.15rem] font-bold tracking-wide text-white",
  },
]

type FooterLink = {
  label: string
  to: string
  external?: boolean
}

const FOOTER_ACCORDIONS: {
  id: string
  title: string
  links: FooterLink[]
}[] = [
  {
    id: "shop",
    title: "Shop",
    links: [
      { label: "Women", to: "/catalog?department=Women" },
      { label: "Men", to: "/catalog?department=Men" },
      { label: "Boys", to: "/catalog?department=Boys" },
      { label: "Girls", to: "/catalog?department=Girls" },
      { label: "Jr's", to: "/catalog?department=Juniors" },
      { label: "Kids", to: "/catalog?department=Kids" },
      { label: "Home", to: "/catalog?department=Home" },
      { label: "Beauty", to: "/catalog?department=Beauty" },
      { label: "Pet", to: "/catalog?department=Pets" },
      { label: "Clearance", to: "/catalog?sort=discount" },
    ],
  },
  {
    id: "brands",
    title: "Brands",
    links: [
      { label: "Designer Shop", to: "/catalog?sort=price_desc" },
      { label: "Under $50", to: "/catalog" },
      { label: "New Finds", to: "/catalog?sort=newest" },
      { label: "T.J.Maxx", to: "https://tjmaxx.tjx.com", external: true },
      { label: "HomeGoods", to: "https://www.homegoods.com", external: true },
      { label: "Sierra", to: "https://www.sierra.com", external: true },
      { label: "Homesense", to: "https://www.homesense.com", external: true },
    ],
  },
  {
    id: "support",
    title: "Support",
    links: [
      { label: "Help center", to: "/catalog" },
      { label: "Order status", to: "/order-confirmation" },
      { label: "Shipping & returns", to: "/catalog" },
      { label: "Gift cards", to: "/catalog" },
      { label: "Find a store", to: "/stores" },
    ],
  },
  {
    id: "rewards",
    title: "TJX Rewards® Credit Card",
    links: [
      { label: "Learn more & apply", to: "/catalog" },
      { label: "Manage your account", to: "/catalog" },
      { label: "Cardmember benefits", to: "/catalog" },
    ],
  },
  {
    id: "shopping",
    title: "Shopping & App",
    links: [
      { label: "Download the app", to: "/catalog" },
      { label: "Email sign up", to: "#email-signup" },
      { label: "Store mode tips", to: "/stores" },
    ],
  },
  {
    id: "company",
    title: "Our Company",
    links: [
      { label: "About Marshalls", to: "/" },
      { label: "Careers", to: "/catalog" },
      { label: "TJX Companies", to: "https://www.tjx.com", external: true },
      { label: "Accessibility", to: "/catalog" },
    ],
  },
  {
    id: "privacy",
    title: "Privacy & Terms",
    links: [
      { label: "Privacy statement", to: "/catalog" },
      { label: "Terms of use", to: "/catalog" },
      { label: "CA supply chains act", to: "/catalog" },
      { label: "Do not sell my info", to: "/catalog" },
    ],
  },
]

function FooterAccordion({
  title,
  links,
  open,
  onToggle,
  onEmailSignup,
}: {
  title: string
  links: FooterLink[]
  open: boolean
  onToggle: () => void
  onEmailSignup?: () => void
}) {
  return (
    <div className="border-b border-border">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-3 py-4 text-left"
        aria-expanded={open}
        onClick={onToggle}
      >
        <span className="text-sm font-bold text-foreground">{title}</span>
        {open ? (
          <Minus className="h-4 w-4 shrink-0 text-navy" aria-hidden />
        ) : (
          <Plus className="h-4 w-4 shrink-0 text-navy" aria-hidden />
        )}
      </button>
      {open && (
        <ul className="space-y-2.5 pb-4">
          {links.map((link) => (
            <li key={link.label}>
              {link.external ? (
                <a
                  href={link.to}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-muted-foreground no-underline hover:text-navy hover:underline"
                >
                  {link.label}
                </a>
              ) : link.to === "#email-signup" ? (
                <button
                  type="button"
                  className="text-sm text-muted-foreground hover:text-navy hover:underline"
                  onClick={onEmailSignup}
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  to={link.to}
                  className="text-sm text-muted-foreground no-underline hover:text-navy hover:underline"
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function EmailSignupDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setSubmitted(true)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next)
        if (!next) {
          setSubmitted(false)
          setEmail("")
        }
      }}
    >
      <DialogContent className="max-w-md rounded-none border-border p-6 sm:rounded-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl font-bold italic text-navy">
            Shipping&apos;s on us.
          </DialogTitle>
          <DialogDescription className="text-base text-navy/80">
            Sign up for email and your first order ships free.*
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="space-y-4 py-2">
            <p className="text-sm text-foreground">
              You&apos;re in — watch your inbox for finds and free-shipping details.
            </p>
            <Button className="w-full bg-navy text-navy-foreground hover:bg-navy/90" onClick={() => onOpenChange(false)}>
              Keep shopping
            </Button>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="footer-email" className="text-sm font-medium text-navy">
                Email Address <span className="text-primary">*</span>
              </label>
              <Input
                id="footer-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 h-11 border-navy/40 focus-visible:ring-navy"
                autoComplete="email"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-navy text-navy-foreground hover:bg-navy/90"
            >
              GET FREE SHIPPING
            </Button>
            <button
              type="button"
              className="w-full text-center text-sm text-navy underline"
              onClick={() => onOpenChange(false)}
            >
              I don&apos;t want free shipping
            </button>
            <p className="text-2xs leading-relaxed text-muted-foreground">
              By signing up you agree to our Terms of Use and Privacy Statement. Free
              shipping offer applies to your first online order of $25+; exclusions may
              apply. Offer details subject to change.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}

export function SiteFooter() {
  const [openSections, setOpenSections] = useState<string[]>(["shop"])
  const [emailOpen, setEmailOpen] = useState(false)

  function toggleSection(id: string) {
    setOpenSections((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )
  }

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      {/* Utility grid — Shop IRL / Rewards / Gifts / Returns */}
      <div className="border-b border-border bg-surface-muted/60">
        <div className="shelf-container grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {UTILITY_TILES.map((tile) => (
            <div key={tile.title}>
              <h3 className="font-display text-lg font-bold italic text-navy">
                {tile.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {tile.body}
              </p>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                {tile.links.map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    className="text-sm font-semibold text-navy underline underline-offset-2 hover:text-primary"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legal fine print */}
      <div className="shelf-container border-b border-border py-6">
        <p className="mx-auto max-w-3xl text-center text-2xs leading-relaxed text-muted-foreground">
          Savings percentages are based on our research of comparable goods or original
          ticketed prices. Free shipping offers and TJX Rewards® credit card benefits are
          subject to terms and exclusions. Selection varies by store and online inventory
          turns over daily — never the same store twice. Compare-at prices may not
          represent prices charged in all markets.
        </p>
      </div>

      {/* Shop Our Brands */}
      <div className="shelf-container py-10">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-border" />
          <h2 className="shrink-0 text-sm font-bold uppercase tracking-[0.12em] text-foreground">
            Shop Our Brands
          </h2>
          <div className="h-px flex-1 bg-border" />
        </div>

        <ul className="mt-8 flex flex-col items-center gap-6">
          {SISTER_BRANDS.map((brand) => (
            <li key={brand.name} className="text-center">
              {"internal" in brand && brand.internal ? (
                <Link to={brand.href} className={cn(brand.className, "no-underline")}>
                  {brand.name === "Marshalls" ? (
                    <>
                      <span className="m-wide">M</span>arshalls
                    </>
                  ) : (
                    brand.name
                  )}
                </Link>
              ) : (
                <a
                  href={brand.href}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(brand.className, "no-underline")}
                >
                  {brand.name}
                </a>
              )}
              <p className="mt-1 text-xs font-medium text-navy">Visit</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Primary CTAs */}
      <div className="border-t border-navy/80">
        <div className="shelf-container flex flex-col gap-3 py-6 sm:mx-auto sm:max-w-md">
          <Button
            asChild
            className="h-12 w-full rounded-full bg-navy text-base font-semibold text-navy-foreground hover:bg-navy/90"
          >
            <Link to="/stores">
              <MapPin className="mr-2 h-4 w-4" />
              Find A Store Near You
            </Link>
          </Button>
          <Button
            type="button"
            className="h-12 w-full rounded-full bg-navy text-base font-semibold text-navy-foreground hover:bg-navy/90"
            onClick={() => setEmailOpen(true)}
          >
            <Mail className="mr-2 h-4 w-4" />
            Email Sign Up
          </Button>
        </div>
      </div>

      {/* Accordion nav — Shop, Brands, Support, etc. */}
      <div className="border-t border-border bg-surface">
        <div className="shelf-container max-w-xl py-2 lg:max-w-none">
          <div className="lg:grid lg:grid-cols-3 lg:gap-x-10 lg:gap-y-0 xl:grid-cols-4">
            {FOOTER_ACCORDIONS.map((section) => (
              <div key={section.id} className="lg:border-0">
                {/* Mobile accordion */}
                <div className="lg:hidden">
                  <FooterAccordion
                    title={section.title}
                    links={section.links}
                    open={openSections.includes(section.id)}
                    onToggle={() => toggleSection(section.id)}
                    onEmailSignup={() => setEmailOpen(true)}
                  />
                </div>
                {/* Desktop columns */}
                <div className="hidden py-6 lg:block">
                  <p className="mb-3 text-sm font-bold text-foreground">{section.title}</p>
                  <ul className="space-y-2">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        {link.external ? (
                          <a
                            href={link.to}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm text-muted-foreground no-underline hover:text-navy hover:underline"
                          >
                            {link.label}
                          </a>
                        ) : link.to === "#email-signup" ? (
                          <button
                            type="button"
                            className="text-sm text-muted-foreground hover:text-navy hover:underline"
                            onClick={() => setEmailOpen(true)}
                          >
                            {link.label}
                          </button>
                        ) : (
                          <Link
                            to={link.to}
                            className="text-sm text-muted-foreground no-underline hover:text-navy hover:underline"
                          >
                            {link.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Social + copyright */}
      <div className="border-t border-border bg-surface">
        <div className="shelf-container flex flex-col items-center gap-5 py-8">
          <ul className="flex items-center gap-3">
            {[
              { label: "TikTok", icon: "TT" },
              { label: "Instagram", Icon: Instagram },
              { label: "Facebook", Icon: Facebook },
              { label: "YouTube", Icon: Youtube },
            ].map((social) => (
              <li key={social.label}>
                <a
                  href={`https://www.${social.label.toLowerCase()}.com`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-navy-foreground transition-opacity hover:opacity-90"
                >
                  {"Icon" in social && social.Icon ? (
                    <social.Icon className="h-4 w-4" />
                  ) : (
                    <span className="text-[10px] font-bold tracking-tight">TT</span>
                  )}
                </a>
              </li>
            ))}
          </ul>
          <p className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>© {new Date().getFullYear()} Marshalls</span>
            <span aria-hidden>|</span>
            <button
              type="button"
              className="inline-flex items-center gap-1 hover:text-navy"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              Feedback
            </button>
          </p>
        </div>
      </div>

      <EmailSignupDialog open={emailOpen} onOpenChange={setEmailOpen} />
    </footer>
  )
}

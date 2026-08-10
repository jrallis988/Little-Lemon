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
import { useAccountStore } from "@/stores/accountStore"
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
    body: "Every store is different — that’s the hunt.",
    links: [{ label: "Find a store", to: "/stores" }],
  },
  {
    title: "TJX Rewards",
    body: "10% off your first purchase when you open a TJX Rewards® card.",
    links: [{ label: "Learn more", to: "/account" }],
  },
  {
    title: "Gift cards",
    body: "In case you wanna let them pick.",
    links: [{ label: "Shop gift cards", to: "/gift-cards" }],
  },
  {
    title: "Returns",
    body: "Free in-store returns with your shipping confirmation email.",
    links: [{ label: "Shipping & returns", to: "/shipping-returns" }],
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
    className: "font-sans text-[1.35rem] font-black tracking-tight text-[#C8102E]",
  },
  {
    name: "Marshalls",
    href: "/",
    className: "marshalls-wordmark text-[1.45rem]",
    internal: true,
  },
  {
    name: "HomeGoods",
    href: "https://www.homegoods.com",
    className: "font-display text-[1.3rem] font-bold italic tracking-tight text-[#C8102E]",
  },
  {
    name: "Sierra",
    href: "https://www.sierra.com",
    className: "font-sans text-[1.2rem] font-bold tracking-[0.04em] text-[#C47A2C]",
  },
  {
    name: "Homesense",
    href: "https://www.homesense.com",
    className:
      "inline-block bg-[#2F6B3A] px-2.5 py-0.5 font-sans text-[1rem] font-bold tracking-wide text-white",
  },
]

type FooterLink = {
  label: string
  to: string
  external?: boolean
}

/** Four short columns — no full taxonomy dump */
const FOOTER_COLUMNS: {
  id: string
  title: string
  links: FooterLink[]
}[] = [
  {
    id: "shop",
    title: "Shop",
    links: [
      { label: "Women", to: "/department/women" },
      { label: "Men", to: "/department/men" },
      { label: "Kids", to: "/department/boys-girls" },
      { label: "Home", to: "/department/home" },
      { label: "Shoes", to: "/department/footwear" },
      { label: "Clearance", to: "/shop/clearance" },
    ],
  },
  {
    id: "discover",
    title: "Discover",
    links: [
      { label: "Designer Shop", to: "/shop/designer" },
      { label: "Under $50", to: "/shop/under-50" },
      { label: "New finds", to: "/catalog?sort=newest" },
      { label: "Fit quiz", to: "/fit-quiz" },
      { label: "Gift cards", to: "/gift-cards" },
    ],
  },
  {
    id: "help",
    title: "Help",
    links: [
      { label: "Order status", to: "/order-status" },
      { label: "Shipping & returns", to: "/shipping-returns" },
      { label: "Account", to: "/account" },
      { label: "TJX Rewards®", to: "/account" },
      { label: "Email sign up", to: "#email-signup" },
    ],
  },
  {
    id: "company",
    title: "Company",
    links: [
      { label: "About Marshalls", to: "/" },
      { label: "Careers", to: "/account" },
      { label: "Privacy", to: "/shipping-returns" },
      { label: "Terms", to: "/shipping-returns" },
      { label: "Do not sell my info", to: "/account" },
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
        className="flex w-full items-center justify-between gap-3 py-3.5 text-left"
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
        <ul className="space-y-2 pb-3.5">
          {links.map((link) => (
            <li key={link.label}>
              <FooterLinkItem link={link} onEmailSignup={onEmailSignup} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function FooterLinkItem({
  link,
  onEmailSignup,
}: {
  link: FooterLink
  onEmailSignup?: () => void
}) {
  if (link.external) {
    return (
      <a
        href={link.to}
        target="_blank"
        rel="noreferrer"
        className="text-sm text-muted-foreground no-underline hover:text-navy hover:underline"
      >
        {link.label}
      </a>
    )
  }
  if (link.to === "#email-signup") {
    return (
      <button
        type="button"
        className="text-sm text-muted-foreground hover:text-navy hover:underline"
        onClick={onEmailSignup}
      >
        {link.label}
      </button>
    )
  }
  return (
    <Link
      to={link.to}
      className="text-sm text-muted-foreground no-underline hover:text-navy hover:underline"
    >
      {link.label}
    </Link>
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
  const [already, setAlready] = useState(false)
  const subscribeEmail = useAccountStore((s) => s.subscribeEmail)
  const isEmailSubscribed = useAccountStore((s) => s.isEmailSubscribed)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    const existed = isEmailSubscribed(email)
    subscribeEmail(email)
    setAlready(existed)
    setSubmitted(true)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next)
        if (!next) {
          setSubmitted(false)
          setAlready(false)
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
              {already
                ? "You’re already on the list — we’ll keep the finds coming."
                : "You’re in — watch your inbox for finds and free-shipping details."}
            </p>
            <Button
              className="w-full bg-navy text-navy-foreground hover:bg-navy/90"
              onClick={() => onOpenChange(false)}
            >
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
              apply.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}

export function SiteFooter() {
  const [openSections, setOpenSections] = useState<string[]>([])
  const [emailOpen, setEmailOpen] = useState(false)

  function toggleSection(id: string) {
    setOpenSections((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )
  }

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      {/* Utility strip — compact */}
      <div className="border-b border-border bg-surface-muted/50">
        <div className="shelf-container grid gap-6 py-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {UTILITY_TILES.map((tile) => (
            <div key={tile.title}>
              <h3 className="font-display text-base font-bold italic text-navy">
                {tile.title}
              </h3>
              <p className="mt-1.5 text-sm leading-snug text-muted-foreground">
                {tile.body}
              </p>
              <div className="mt-2 flex flex-wrap gap-x-3">
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

      {/* Sister brands + CTAs in one band */}
      <div className="shelf-container py-7">
        <h2 className="section-rule-title justify-center text-center text-2xs font-bold uppercase tracking-[0.14em] text-foreground">
          Shop Our Brands
        </h2>
        <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
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
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-7 flex max-w-xl flex-col gap-2.5 sm:flex-row">
          <Button
            asChild
            className="h-11 flex-1 rounded-full bg-navy text-sm font-semibold text-navy-foreground hover:bg-navy/90"
          >
            <Link to="/stores">
              <MapPin className="mr-1.5 h-4 w-4" />
              Find a store
            </Link>
          </Button>
          <Button
            type="button"
            className="h-11 flex-1 rounded-full bg-navy text-sm font-semibold text-navy-foreground hover:bg-navy/90"
            onClick={() => setEmailOpen(true)}
          >
            <Mail className="mr-1.5 h-4 w-4" />
            Email sign up
          </Button>
        </div>
      </div>

      {/* Link columns — 4 short lists */}
      <div className="border-t border-border bg-surface">
        <div className="shelf-container max-w-xl py-1 lg:max-w-none lg:py-0">
          <div className="lg:grid lg:grid-cols-4 lg:gap-8">
            {FOOTER_COLUMNS.map((section) => (
              <div key={section.id}>
                <div className="lg:hidden">
                  <FooterAccordion
                    title={section.title}
                    links={section.links}
                    open={openSections.includes(section.id)}
                    onToggle={() => toggleSection(section.id)}
                    onEmailSignup={() => setEmailOpen(true)}
                  />
                </div>
                <div className="hidden py-6 lg:block">
                  <p className="mb-2.5 text-sm font-bold text-foreground">{section.title}</p>
                  <ul className="space-y-1.5">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <FooterLinkItem
                          link={link}
                          onEmailSignup={() => setEmailOpen(true)}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Social + legal */}
      <div className="border-t border-border bg-surface">
        <div className="shelf-container flex flex-col items-center gap-3 py-6">
          <ul className="flex items-center gap-2.5">
            {[
              {
                label: "TikTok",
                href: "https://www.tiktok.com/@marshalls",
                glyph: "TT",
              },
              {
                label: "Instagram",
                href: "https://www.instagram.com/marshalls",
                Icon: Instagram,
              },
              {
                label: "Facebook",
                href: "https://www.facebook.com/Marshalls",
                Icon: Facebook,
              },
              {
                label: "YouTube",
                href: "https://www.youtube.com/@Marshalls",
                Icon: Youtube,
              },
            ].map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-navy-foreground transition-opacity hover:opacity-90"
                >
                  {"Icon" in social && social.Icon ? (
                    <social.Icon className="h-3.5 w-3.5" />
                  ) : (
                    <span className="text-[10px] font-bold tracking-tight">
                      {social.glyph}
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
          <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
            <span>© {new Date().getFullYear()} Marshalls</span>
            <span aria-hidden>|</span>
            <Link to="/design-system" className="hover:text-navy hover:underline">
              Design system
            </Link>
            <span aria-hidden>|</span>
            <button
              type="button"
              className="inline-flex items-center gap-1 hover:text-navy"
              onClick={() => {
                window.dispatchEvent(new CustomEvent("marshalls:open-chat"))
              }}
            >
              <MessageCircle className="h-3.5 w-3.5" />
              Feedback
            </button>
          </p>
          <p className="max-w-2xl text-center text-[10px] leading-relaxed text-muted-foreground">
            Savings based on comparable goods or original ticketed prices. Selection varies
            by store — never the same store twice.
          </p>
        </div>
      </div>

      <EmailSignupDialog open={emailOpen} onOpenChange={setEmailOpen} />
    </footer>
  )
}

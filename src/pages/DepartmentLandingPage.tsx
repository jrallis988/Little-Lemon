import { Link, useParams } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { PRODUCTS } from "@/data/products"
import { SHOP_NAV, navHref, type NavPreset } from "@/data/navigation"
import { ProductCard } from "@/components/catalog/ProductCard"
import { retailPhotoUrl, RETAIL_IMAGE_POOLS, poolForCategory } from "@/data/images"
import { useDocumentMeta } from "@/hooks/useDocumentMeta"
import type { Department, Product } from "@/types"

function resolveNav(slug: string): NavPreset | undefined {
  return (
    SHOP_NAV.find((d) => d.id === slug) ??
    SHOP_NAV.find((d) => d.label.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug) ??
    SHOP_NAV.find((d) => d.menuLabel.toLowerCase().includes(slug.replace(/-/g, " ")))
  )
}

function filterForNav(nav: NavPreset | undefined, slug: string): Product[] {
  if (!nav) {
    const dept = slug.charAt(0).toUpperCase() + slug.slice(1)
    return PRODUCTS.filter((p) => p.department === dept).slice(0, 12)
  }
  return PRODUCTS.filter((p) => {
    if (nav.departments?.length && !nav.departments.includes(p.department)) return false
    if (nav.categories?.length && !nav.categories.includes(p.category)) return false
    if (nav.query) {
      const q = nav.query.toLowerCase()
      return [p.name, p.brand, ...p.tags].join(" ").toLowerCase().includes(q)
    }
    return Boolean(nav.departments?.length || nav.categories?.length)
  }).slice(0, 12)
}

function heroFor(nav: NavPreset | undefined, items: Product[]) {
  const sample = items[0]
  const key = sample
    ? poolForCategory(sample.category, sample.department)
    : nav?.departments?.[0] === "Home"
      ? "home"
      : nav?.departments?.[0] === "Beauty"
        ? "beauty"
        : nav?.id === "footwear"
          ? "shoes"
          : nav?.id === "handbags"
            ? "bags"
            : nav?.id === "gourmet"
              ? "gourmet"
              : nav?.id === "stationery"
                ? "stationery"
                : "apparel"
  const pool = RETAIL_IMAGE_POOLS[key]
  return retailPhotoUrl(pool[2] ?? pool[0]!, 1)
}

export function DepartmentLandingPage() {
  const { slug = "women" } = useParams()
  const nav = resolveNav(slug)
  const items = filterForNav(nav, slug)
  const title = nav?.menuLabel ?? nav?.label ?? slug.replace(/-/g, " ")
  const hero = heroFor(nav, items)
  const departmentParam = nav?.departments?.[0] as Department | undefined

  useDocumentMeta({
    title: `${title} | Marshalls`,
    description: nav?.description ?? `Shop ${title} at Marshalls — brand names for less.`,
  })

  const shopLinks =
    nav?.categories?.slice(0, 9) ??
    Array.from(new Set(items.map((p) => p.category))).slice(0, 9)

  return (
    <div>
      <section className="relative min-h-[42vh] overflow-hidden md:min-h-[48vh]">
        <img src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/15" />
        <div className="relative shelf-container flex min-h-[42vh] flex-col justify-end py-10 text-white md:min-h-[48vh] md:py-14">
          <p className="marshalls-wordmark text-[clamp(1.75rem,4vw,2.4rem)] text-white">
            <span className="m-wide">M</span>arshalls
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold italic sm:text-5xl">{title}</h1>
          <p className="mt-3 max-w-xl text-sm text-white/85 sm:text-base">
            {nav?.description ?? "Designer and brand-name finds, priced for the hunt."}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to={nav ? navHref(nav) : `/catalog?department=${encodeURIComponent(title)}`}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-navy no-underline"
            >
              Shop all {nav?.label ?? title} <ArrowRight className="h-4 w-4" />
            </Link>
            {!(
              nav?.departments?.every((d) =>
                ["Home", "Beauty", "Pets"].includes(d),
              ) ||
              ["home", "beauty", "kitchen", "gourmet", "stationery", "pet"].includes(
                slug,
              )
            ) && (
              <Link
                to="/fit-quiz"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white no-underline backdrop-blur"
              >
                Take the fit quiz
              </Link>
            )}
          </div>
        </div>
      </section>

      {shopLinks.length > 0 && (
        <section className="border-b border-border bg-surface">
          <div className="shelf-container py-8">
            <h2 className="section-rule-title font-display text-2xl font-bold italic text-navy">
              Shop by category
            </h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {shopLinks.map((item) => (
                <li key={item}>
                  <Link
                    to={`/catalog?${
                      departmentParam
                        ? `department=${encodeURIComponent(departmentParam)}&`
                        : ""
                    }q=${encodeURIComponent(item)}`}
                    className="inline-flex rounded-sm border border-border bg-surface-muted px-3 py-1.5 text-sm font-semibold text-foreground no-underline transition-colors hover:border-navy/40 hover:bg-sky-soft"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="shelf-container py-10">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-bold italic text-navy">
            Fresh in {title}
          </h2>
          <Link
            to={nav ? navHref(nav) : "/catalog"}
            className="text-sm font-semibold text-navy underline-offset-2 hover:underline"
          >
            View all
          </Link>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        {items.length === 0 && (
          <p className="mt-6 text-sm text-muted-foreground">
            Nothing in this department yet —{" "}
            <Link to="/catalog" className="font-semibold text-navy underline">
              browse the full catalog
            </Link>
            .
          </p>
        )}
      </section>
    </div>
  )
}

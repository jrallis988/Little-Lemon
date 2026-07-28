import { Link } from "react-router-dom"
import { useDocumentMeta } from "@/hooks/useDocumentMeta"

export function ShippingReturnsPage() {
  useDocumentMeta({
    title: "Shipping & Returns | Marshalls",
    description: "Shipping thresholds, delivery timing, and free in-store returns.",
  })

  return (
    <div className="shelf-container py-8 md:py-12">
      <p className="text-2xs font-bold uppercase tracking-[0.12em] text-primary">
        Customer service
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold text-navy md:text-4xl">
        Shipping & returns
      </h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Straightforward policies for this Marshalls prototype — modeled on the live site’s
        free-shipping threshold and in-store return flow.
      </p>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <section className="rounded-md border border-border bg-surface p-5 shadow-soft">
          <h2 className="font-display text-xl font-bold">Shipping</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>Free standard shipping on orders $89+.</li>
            <li>Orders under $89 ship for a flat $8.99.</li>
            <li>Most orders arrive in 3–7 business days.</li>
            <li>Email signup may unlock free shipping on your first qualifying order.</li>
          </ul>
        </section>
        <section className="rounded-md border border-border bg-surface p-5 shadow-soft">
          <h2 className="font-display text-xl font-bold">Returns</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>Bring your shipping confirmation email to any Marshalls for free returns.</li>
            <li>Most items accepted within 30 days with tags attached.</li>
            <li>Some exclusions apply (final sale, beauty, intimate apparel).</li>
            <li>Store credit or original tender, depending on purchase method.</li>
          </ul>
          <Link
            to="/stores"
            className="mt-4 inline-block text-sm font-semibold text-navy underline"
          >
            Find a store for returns
          </Link>
        </section>
      </div>
    </div>
  )
}

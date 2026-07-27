import Link from "next/link";
import { ArrowRight, HeartHandshake, MapPinned, ScanBarcode } from "lucide-react";
import { DrugSearch } from "@/components/search/drug-search";
import { buttonVariants } from "@/components/ui/button";
import { DRUGS } from "@/lib/data/drugs";
import { cn } from "@/lib/utils";

const POPULAR = DRUGS.slice(0, 6);

export default function HomePage() {
  return (
    <div className="trx-atmosphere relative overflow-hidden">
      <div className="trx-hero-grid pointer-events-none absolute inset-0" aria-hidden />

      <section className="relative mx-auto flex min-h-[calc(100dvh-8.5rem)] max-w-6xl flex-col justify-center px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14">
        <div className="max-w-3xl">
          <p className="animate-trx-fade-up font-display text-4xl font-semibold tracking-tight text-primary sm:text-5xl md:text-6xl">
            Trump RX
          </p>
          <h1 className="animate-trx-fade-up-delay mt-3 max-w-2xl font-display text-3xl font-medium leading-tight tracking-tight text-foreground sm:text-4xl md:text-[2.75rem]">
            Lower drug prices. Clearer choices. Real pharmacies near you.
          </h1>
          <p className="animate-trx-fade-up-delay-2 mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            A better Trump RX experience — search brand <em>and</em> generic
            meds, compare coupon prices across local pharmacies, and show a
            digital discount at the counter in seconds.
          </p>
        </div>

        <div className="animate-trx-fade-up-delay-2 mt-8 max-w-2xl">
          <DrugSearch size="hero" autoFocus />
          <p className="mt-3 text-sm text-muted-foreground">
            Try{" "}
            {POPULAR.slice(0, 3).map((d, i) => (
              <span key={d.id}>
                {i > 0 && ", "}
                <Link
                  href={`/search?drug=${d.id}`}
                  className="font-medium text-primary underline-offset-2 hover:underline"
                >
                  {d.genericName}
                </Link>
              </span>
            ))}
          </p>
        </div>
      </section>

      <section
        aria-labelledby="how-it-works"
        className="border-t border-border/60 bg-background/70"
      >
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2
            id="how-it-works"
            className="font-display text-3xl font-semibold tracking-tight"
          >
            Built to beat the boutique catalog
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Where the old experience felt narrow, Trump RX puts supermarket-style
            coverage, local price comparison, and a pharmacist-ready coupon in
            one calm flow.
          </p>

          <ol className="mt-10 grid gap-10 md:grid-cols-3">
            <li className="space-y-3">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground">
                <ScanBarcode className="size-6" aria-hidden />
              </span>
              <h3 className="text-xl font-semibold">1. Search any common med</h3>
              <p className="leading-relaxed text-muted-foreground">
                Autocomplete finds brand and generic names, dosages, and common
                quantities — not just a short brand-deal list.
              </p>
            </li>
            <li className="space-y-3">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground">
                <MapPinned className="size-6" aria-hidden />
              </span>
              <h3 className="text-xl font-semibold">2. Compare nearby prices</h3>
              <p className="leading-relaxed text-muted-foreground">
                See a clear matrix of coupon prices sorted by cost or distance —
                including 30- vs 90-day supply.
              </p>
            </li>
            <li className="space-y-3">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground">
                <HeartHandshake className="size-6" aria-hidden />
              </span>
              <h3 className="text-xl font-semibold">3. Show the digital coupon</h3>
              <p className="leading-relaxed text-muted-foreground">
                Large barcode plus BIN / PCN / Group / Member ID — ready for the
                pharmacist counter.
              </p>
            </li>
          </ol>

          <div className="mt-12 flex flex-wrap gap-3">
            <Link
              href="/search"
              className={cn(
                buttonVariants({ size: "lg" }),
                "min-h-12 gap-1.5 text-base"
              )}
            >
              Compare prices
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link
              href="/pharmacies"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "min-h-12 text-base"
              )}
            >
              Find pharmacies
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-border/60 bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="font-display text-2xl font-semibold">Popular searches</h2>
          <ul className="mt-6 flex flex-wrap gap-3">
            {POPULAR.map((d) => (
              <li key={d.id}>
                <Link
                  href={`/search?drug=${d.id}`}
                  className="inline-flex min-h-11 items-center rounded-xl border border-border bg-card px-4 text-base font-medium transition-colors hover:border-primary/40 hover:bg-accent"
                >
                  {d.genericName}
                  <span className="ml-2 text-sm text-muted-foreground">
                    ({d.brandName})
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

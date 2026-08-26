import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DrugSearch } from "@/components/search/drug-search";
import { buttonVariants } from "@/components/ui/button";
import { prisma } from "@/lib/db";
import { isIncludedMedication } from "@/lib/program-catalog";
import {
  isLimitedV1Launch,
  V1_PHARMACY_PICKUP_DRUG_IDS,
} from "@/lib/launch-mode";
import { mapDrug } from "@/lib/pricing-service";
import { cn } from "@/lib/utils";

export default async function HomePage() {
  const limited = isLimitedV1Launch();
  const included = (
    await prisma.drug.findMany({
      orderBy: { brandName: "asc" },
      include: { strengths: true, quantities: true },
    })
  )
    .map(mapDrug)
    .filter((d) => isIncludedMedication(d.id));

  return (
    <div>
      <section className="relative isolate min-h-[calc(100dvh-7.5rem)] overflow-hidden sm:min-h-[calc(100dvh-6.5rem)]">
        <Image
          src="/images/hero-pharmacy.webp"
          alt=""
          fill
          priority
          className="object-cover object-[center_32%] animate-trx-ken-burns"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-trust/95 via-trust/78 to-trust/35"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-trust via-transparent to-trust/25"
          aria-hidden
        />

        <div className="relative mx-auto flex min-h-[calc(100dvh-7.5rem)] max-w-6xl flex-col justify-end px-4 pb-14 pt-16 sm:min-h-[calc(100dvh-6.5rem)] sm:justify-center sm:px-6 sm:pb-16 sm:pt-12">
          <div className="max-w-3xl text-trust-foreground">
            <p className="animate-trx-fade-up font-display text-5xl font-bold uppercase leading-[0.9] tracking-tight sm:text-6xl md:text-7xl">
              Trump RX
            </p>
            <h1 className="animate-trx-fade-up-delay mt-4 max-w-xl font-display text-2xl font-semibold uppercase leading-tight tracking-tight sm:text-3xl md:text-4xl">
              See if your medication is included.
            </h1>
            <p className="animate-trx-fade-up-delay-2 mt-4 max-w-lg text-base leading-relaxed text-trust-foreground/95 sm:text-lg">
              {limited ? (
                <>
                  TrumpRx currently includes{" "}
                  {V1_PHARMACY_PICKUP_DRUG_IDS.length} generic medications for
                  pharmacy pickup. Search below to see if yours is on the list.
                </>
              ) : (
                <>
                  TrumpRx provides lower-cost options for select medications.
                  Search below or browse all currently included medications.
                </>
              )}
            </p>
          </div>

          <div className="animate-trx-scale-in mt-7 max-w-2xl sm:mt-8">
            <DrugSearch size="hero" autoFocus />
            <p className="mt-3 text-sm text-trust-foreground/85">
              Only select medications are included — this is not a universal
              pharmacy database.{" "}
              <Link
                href="/medications"
                className="font-semibold underline underline-offset-2"
              >
                Browse included medications
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
          <h2 className="font-display text-2xl font-semibold uppercase tracking-tight sm:text-3xl">
            What TrumpRx does
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Help you determine whether a TrumpRx pricing option is available,
            compare it with what you currently pay, understand eligibility, and
            see exactly how to obtain the medication.
          </p>
          <ol className="mt-6 grid gap-4 sm:grid-cols-4">
            {[
              {
                n: "01",
                t: "Check coverage",
                d: "See if your medication is in the select program.",
              },
              {
                n: "02",
                t: "Compare cost",
                d: "Stack the TrumpRx option against what you pay today.",
              },
              {
                n: "03",
                t: "Review eligibility",
                d: "Understand who may qualify — and who decides.",
              },
              {
                n: "04",
                t: "Access path",
                d: limited
                  ? "Participating pharmacy pickup — clearly labeled."
                  : "Pharmacy pickup or manufacturer-direct — clearly labeled.",
              },
            ].map((s) => (
              <li key={s.n} className="border border-border bg-card p-4">
                <p className="font-display text-sm font-semibold text-primary">
                  {s.n}
                </p>
                <h3 className="mt-1 font-display text-lg font-semibold uppercase tracking-tight">
                  {s.t}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div>
              <h2 className="font-display text-2xl font-semibold uppercase tracking-tight sm:text-3xl">
                Currently included
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {included.length} medication{included.length === 1 ? "" : "s"} in
                the program directory right now
                {limited ? " (v1 limited launch)" : ""}.
              </p>
            </div>
            <Link
              href="/medications"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "min-h-10 gap-1.5"
              )}
            >
              Browse all
              <ArrowRight className="size-4" />
            </Link>
          </div>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {included.slice(0, limited ? included.length : 9).map((d) => (
              <li key={d.id}>
                <Link
                  href={`/drugs/${d.id}`}
                  className="flex h-full flex-col border border-border bg-card px-3 py-3 transition-colors hover:border-primary/40 hover:bg-accent"
                >
                  <span className="font-semibold">{d.brandName}</span>
                  <span className="text-sm text-muted-foreground">
                    {d.genericName}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-primary">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="max-w-xl text-primary-foreground">
            <h2 className="font-display text-2xl font-semibold uppercase tracking-tight sm:text-3xl">
              Not a universal pharmacy
            </h2>
            <p className="mt-2 text-sm text-primary-foreground/90 sm:text-base">
              TrumpRx does not replace CVS, Walgreens, GoodRx, or your existing
              pharmacy. It helps you decide whether a supported savings option
              exists — and how to use it.
            </p>
          </div>
          <Link
            href="/search"
            className={cn(
              buttonVariants({ variant: "secondary", size: "lg" }),
              "min-h-11 shrink-0 gap-1.5 border-0 bg-background text-base text-foreground"
            )}
          >
            Check coverage
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

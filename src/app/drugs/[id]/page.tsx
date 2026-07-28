import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { TrustCallout } from "@/components/design/trust-callout";
import { prisma } from "@/lib/db";
import { formatCurrency } from "@/lib/pricing";
import { getDrugById } from "@/lib/pricing-service";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const drugs = await prisma.drug.findMany({ select: { id: true } });
  return drugs.map(({ id }) => ({ id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const drug = await getDrugById(id);
  if (!drug) return { title: "Medication" };
  return {
    title: `${drug.genericName} (${drug.brandName}) prices`,
    description: `Compare Trump RX coupon prices for ${drug.genericName} near you.`,
  };
}

export default async function DrugDetailPage({ params }: PageProps) {
  const { id } = await params;
  const drug = await getDrugById(id);
  if (!drug) notFound();

  return (
    <div className="min-h-[70dvh] bg-background">
      <div className="relative isolate overflow-hidden border-b border-border">
        <Image
          src="/images/step-search.webp"
          alt=""
          fill
          className="object-cover opacity-35"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/92 to-background/70" />
        <div className="relative mx-auto max-w-6xl px-4 py-7 sm:px-6">
          <p className="text-sm font-medium text-primary">{drug.therapeuticClass}</p>
          <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight md:text-4xl">
            {drug.genericName}
          </h1>
          <p className="mt-1 text-lg text-muted-foreground">
            Brand name: {drug.brandName}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href={`/search?drug=${drug.id}`}
              className={cn(buttonVariants({ size: "lg" }), "min-h-11 gap-1.5")}
            >
              Compare local prices
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/help"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "min-h-11"
              )}
            >
              How coupons work
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-5 px-4 py-6 sm:px-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-4">
          <section className="rounded-2xl border border-border bg-card p-4">
            <h2 className="font-display text-xl font-semibold">Common dosages</h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {drug.strengths.map((s) => (
                <li
                  key={s.id}
                  className="rounded-xl bg-surface px-3 py-2.5 text-sm font-medium"
                >
                  {s.label}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-border bg-card p-4">
            <h2 className="font-display text-xl font-semibold">
              Estimated cash retail
            </h2>
            <dl className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl bg-surface px-3 py-3">
                <dt className="text-sm text-muted-foreground">30-day supply</dt>
                <dd className="trx-price-md mt-1">
                  {formatCurrency(drug.retailCashPrice30)}
                </dd>
              </div>
              <div className="rounded-xl bg-surface px-3 py-3">
                <dt className="text-sm text-muted-foreground">90-day supply</dt>
                <dd className="trx-price-md mt-1">
                  {formatCurrency(drug.retailCashPrice90)}
                </dd>
              </div>
            </dl>
            <p className="mt-3 text-sm text-muted-foreground">
              Retail estimates are before Trump RX coupons. Local coupon prices
              are usually much lower.
            </p>
          </section>

          <TrustCallout title="Generic vs brand">
            Ask your pharmacist about generic <strong>{drug.genericName}</strong>{" "}
            when appropriate. It usually has the same active ingredient as{" "}
            <strong>{drug.brandName}</strong> at a lower cash price.
          </TrustCallout>
        </div>

        <aside className="space-y-3">
          <div className="trx-photo relative aspect-[4/5]">
            <Image
              src="/images/prescription-bottle.webp"
              alt="Prescription medication packaging"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 30vw"
            />
          </div>
          <TrustCallout variant="warning" title="Not insurance">
            Always compare this coupon price with your plan copay before you
            fill.
          </TrustCallout>
        </aside>
      </div>
    </div>
  );
}

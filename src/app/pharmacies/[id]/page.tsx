import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, MapPin, Navigation, Phone, Printer } from "lucide-react";
import { CHAIN_LABELS } from "@/lib/chains";
import { getLaunchFeatures } from "@/lib/launch-mode";
import { getPharmacyById } from "@/lib/pricing-service";
import { ChainMark } from "@/components/pharmacy/chain-mark";
import { TrustCallout } from "@/components/design/trust-callout";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const pharmacy = await getPharmacyById((await params).id);
  return {
    title: pharmacy ? `${pharmacy.name} prescription discounts` : "Pharmacy",
  };
}

export default async function PharmacyDetailPage({ params }: PageProps) {
  const pharmacy = await getPharmacyById((await params).id);
  if (!pharmacy) notFound();
  const features = getLaunchFeatures();

  const mapsQuery = encodeURIComponent(
    `${pharmacy.address}, ${pharmacy.city}, ${pharmacy.state} ${pharmacy.zip}`
  );
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`;

  return (
    <div className="min-h-[70dvh] bg-background">
      <div className="relative isolate overflow-hidden border-b border-border">
        <Image
          src="/images/pharmacy-aisle.webp"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/88 to-background/45" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-4 px-4 py-7 sm:flex-row sm:items-end sm:justify-between sm:px-6">
          <div className="flex items-start gap-3">
            <ChainMark chain={pharmacy.chain} className="size-12 text-xs" />
            <div>
              <p className="text-sm font-medium text-primary">
                {CHAIN_LABELS[pharmacy.chain]}
              </p>
              <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
                {pharmacy.name}
              </h1>
              <p className="mt-1 text-muted-foreground">
                {pharmacy.address}, {pharmacy.city}, {pharmacy.state}{" "}
                {pharmacy.zip}
                {typeof pharmacy.distanceMiles === "number" &&
                  ` · ${pharmacy.distanceMiles.toFixed(1)} mi`}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/search"
              className={cn(buttonVariants({ size: "lg" }), "min-h-11")}
            >
              Compare prices here
            </Link>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "min-h-11"
              )}
            >
              <Navigation className="size-4" />
              Directions
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-4 px-4 py-5 sm:px-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-3">
          <section className="rounded-2xl border border-border bg-card p-4">
            <h2 className="font-display text-xl font-semibold">Store details</h2>
            <ul className="mt-3 space-y-2.5 text-sm sm:text-base">
              <li className="flex gap-2">
                <Clock className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <span>
                  Weekdays {pharmacy.hours.weekday}
                  <br />
                  Saturday {pharmacy.hours.saturday}
                  <br />
                  Sunday {pharmacy.hours.sunday}
                </span>
              </li>
              <li className="flex gap-2">
                <Phone className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <a
                  href={`tel:${pharmacy.phone.replace(/\D/g, "")}`}
                  className="font-medium underline-offset-2 hover:underline"
                >
                  {pharmacy.phone}
                </a>
              </li>
              <li className="flex gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <span>
                  {pharmacy.address}, {pharmacy.city}, {pharmacy.state}{" "}
                  {pharmacy.zip}
                </span>
              </li>
            </ul>
            <div className="mt-3 flex flex-wrap gap-2">
              {pharmacy.acceptsTrumpRxCoupon ? (
                <Badge variant="secondary">Accepts Trump RX coupon</Badge>
              ) : (
                <Badge variant="outline">Call to confirm discount</Badge>
              )}
              {pharmacy.driveThru && <Badge variant="outline">Drive-thru</Badge>}
            </div>
            {pharmacy.hours.pharmacyDeskNote && (
              <p className="mt-3 text-sm text-muted-foreground">
                {pharmacy.hours.pharmacyDeskNote}
              </p>
            )}
          </section>

          <section className="rounded-2xl border border-border bg-card p-4">
            <h2 className="font-display text-xl font-semibold">At the counter</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Open your digital coupon, compare with insurance, and show BIN /
              PCN / Group / Member ID. Hand the pharmacist guide to the desk if
              needed.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link
                href="/help/pharmacist"
                className={cn(buttonVariants({ variant: "secondary" }), "min-h-10")}
              >
                <Printer className="size-4" />
                Pharmacist guide
              </Link>
              <Link
                href="/help/counter-issue"
                className={cn(buttonVariants({ variant: "outline" }), "min-h-10")}
              >
                Price mismatch help
              </Link>
              {features.transfer && (
                <Link
                  href="/transfer"
                  className={cn(buttonVariants({ variant: "outline" }), "min-h-10")}
                >
                  Transfer Rx here
                </Link>
              )}
            </div>
          </section>

          <TrustCallout title="Prices depend on your prescription">
            Search your exact medication, strength, quantity, and supply length
            to see current network cash-discount pricing at nearby pharmacies.
          </TrustCallout>
        </div>

        <aside className="space-y-3">
          <div className="trx-photo relative aspect-[4/3]">
            <Image
              src="/images/pharmacist-helping.webp"
              alt="Pharmacist helping a patient"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 35vw"
            />
          </div>
          <Link
            href="/search"
            className={cn(buttonVariants({ size: "lg" }), "min-h-11 w-full")}
          >
            Compare medications here
          </Link>
          <Link
            href="/pharmacies"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "min-h-11 w-full"
            )}
          >
            Back to all pharmacies
          </Link>
        </aside>
      </div>
    </div>
  );
}

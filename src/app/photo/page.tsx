import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PHOTO_OFFERS } from "@/lib/data/stores";
import { PhotoOrderForm } from "@/components/photo/photo-order-form";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Photo center",
  description: "Same-day prints, photo books, and yard signs at Walgreens RX.",
};

export default function PhotoPage() {
  return (
    <div>
      <section className="relative isolate min-h-[340px] overflow-hidden">
        <Image
          src="/images/family-care.jpg"
          alt="Family making memories ready for photo prints"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/25" />
        <div className="relative mx-auto flex min-h-[340px] max-w-6xl items-center px-4 py-12 sm:px-6">
          <div className="max-w-xl text-white">
            <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-5xl">
              Make summer memories
            </h1>
            <p className="mt-3 text-white/85">
              Same-day photo books, prints, and yard signs — pick up at your
              neighborhood Walgreens RX.
            </p>
            <Button
              className="mt-6 bg-brand text-brand-foreground hover:bg-brand/90"
              nativeButton={false}
              render={<Link href="#photo-order" />}
            >
              Start a photo order
            </Button>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-12 px-4 py-12 sm:px-6">
        <div>
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            Photo offers
          </h2>
          <ul className="mt-6 grid gap-6 md:grid-cols-3">
            {PHOTO_OFFERS.map((offer) => (
              <li key={offer.id} className="border-t border-border pt-4">
                <h3 className="font-display text-lg font-semibold">{offer.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{offer.detail}</p>
              </li>
            ))}
          </ul>
        </div>

        <div id="photo-order">
          <PhotoOrderForm />
        </div>
      </div>
    </div>
  );
}

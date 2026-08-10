"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";

/** Compact join promo inspired by live PF offer messaging. */
export function JoinOffer() {
  return (
    <section
      aria-labelledby="join-offer-heading"
      className="overflow-hidden bg-gradient-to-br from-pf-purple via-pf-purple to-[#7a3bb8] text-white"
    >
      <div className="mx-auto grid max-w-5xl gap-5 px-4 py-7 md:grid-cols-[1.2fr_0.8fr] md:items-center md:px-6">
        <div>
          <p className="text-sm text-white/85">Get up to</p>
          <h2
            id="join-offer-heading"
            className="mt-1 font-display text-3xl tracking-tight md:text-4xl"
          >
            <span className="text-pf-yellow">3 FREE</span> Months of{" "}
            <span className="text-pf-yellow">Apple Music</span>
          </h2>
          <p className="mt-2 text-lg text-white">
            When you join for <span className="font-semibold">$1 DOWN</span>
          </p>
          <p className="mt-1 text-sm text-white/85">No Commitment</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button asChild variant="app">
              <a
                href="/join"
                onClick={() =>
                  track("plan_select", { source: "join_offer", plan: "classic" })
                }
              >
                Join Now
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <a href="#pricing">Compare Memberships</a>
            </Button>
          </div>
          <p className="mt-3 max-w-xl text-[11px] leading-relaxed text-white/65">
            New and qualified returning subscribers only. $10.99/month after free
            trial. Plan automatically renews until canceled. Terms apply.
          </p>
        </div>
        <div className="relative mx-auto aspect-[4/3] w-full max-w-sm overflow-hidden rounded-3xl">
          <Image
            src="/images/hero-gym.jpg"
            alt="Member training during a Planet Fitness join offer"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 360px"
          />
        </div>
      </div>
    </section>
  );
}

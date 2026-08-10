"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";

export function SummerPass() {
  return (
    <section
      id="summer-pass"
      aria-labelledby="summer-pass-heading"
      className="scroll-mt-14 bg-white"
    >
      <div className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-12">
        <div className="mb-4 flex justify-center">
          <a
            href="#pricing"
            className="inline-flex h-11 items-center justify-center rounded-full border border-pf-purple bg-white px-5 text-sm font-semibold text-pf-purple"
          >
            Compare Memberships
          </a>
        </div>

        <div className="overflow-hidden rounded-3xl border border-pf-purple/30 bg-white shadow-[0_12px_28px_-18px_rgba(61,9,88,0.3)]">
          <div className="relative aspect-[16/10]">
            <Image
              src="/images/cardio-gym.jpg"
              alt="Teens training during High School Summer Pass at Planet Fitness"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 720px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-pf-purple-ink/85 via-pf-purple/35 to-transparent" />
            <div className="absolute inset-x-4 bottom-4 text-white">
              <p className="font-display text-lg leading-none tracking-tight">
                planet fitness
              </p>
              <p className="mt-1 font-display text-2xl uppercase tracking-tight text-pf-yellow md:text-3xl">
                High School Summer Pass
              </p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/85">
                Powered by Gymshark
              </p>
            </div>
          </div>

          <div className="p-5 md:p-6">
            <h2
              id="summer-pass-heading"
              className="font-display text-2xl uppercase tracking-tight text-pf-ink md:text-3xl"
            >
              High School Summer Pass® is here
            </h2>
            <p className="mt-2 text-sm text-pf-ink/70 md:text-base">
              NOW – August 31, teens ages 14–19 can work out for FREE. Build
              strength where it counts this summer – with progress that’s all
              yours. Plus, enjoy 20% off Gymshark when you sign up.
            </p>
            <Button asChild variant="purple" className="mt-4 w-full">
              <a
                href="https://www.planetfitness.com/SummerPass"
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  track("summer_pass_click", { source: "home_promo" })
                }
              >
                Sign Up Now
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

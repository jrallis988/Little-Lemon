import Link from "next/link";
import { LandingHero } from "@/components/landing/LandingHero";
import { FeatureCards } from "@/components/landing/FeatureCards";
import { PLATFORM_AUDIENCE, PLATFORM_NAME } from "@/lib/constants";

export default function LandingPage() {
  return (
    <main id="main-content" className="min-h-screen bg-[#F5F5F5]">
      <div className="border-b border-[#E5E5E5] bg-[#FF7A18]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link
            href="/"
            className="text-lg font-black tracking-tight text-white no-underline hover:text-[#EEE9FF]"
          >
            {PLATFORM_NAME}
          </Link>
          <div className="flex items-center gap-2">
            <span className="hidden text-xs font-bold uppercase tracking-wide text-[#EEE9FF] sm:inline">
              {PLATFORM_AUDIENCE}
            </span>
            <Link
              href="/login"
              className="rounded-[4px] px-3 py-1.5 text-sm font-bold text-white no-underline hover:bg-white/10"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="rounded-[4px] bg-[#7B61FF] px-3 py-1.5 text-sm font-bold text-white no-underline hover:bg-[#6348E0]"
            >
              Create Your Profile
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <LandingHero />
        <section className="pb-6" aria-labelledby="features-heading">
          <h2 id="features-heading" className="mb-4 text-2xl font-black text-[#222222]">
            The customizable profile teens actually want
          </h2>
          <p className="mb-4 max-w-2xl text-sm text-[#6E6E6E]">
            Same freedom as the old personal-page energy — rebuilt for how teens hang out
            online now: music, friends, photos, and a page that does not look like everyone
            else&apos;s.
          </p>
          <FeatureCards />
        </section>

        <section className="pb-16">
          <div className="mp-card grid items-center gap-6 p-6 md:grid-cols-[1fr_auto]">
            <div>
              <h2 className="text-2xl font-black text-[#222222]">
                Ready to set your vibe?
              </h2>
              <p className="mt-2 text-[#6E6E6E]">
                Ages 13–17 only. Try the demo ({`nova@example.com`} / demo1234) or create
                your own teen profile and theme it during onboarding.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/login"
                className="rounded-[4px] border border-[#7B61FF] bg-white px-4 py-2 text-sm font-bold text-[#222222] no-underline hover:bg-[#EEE9FF]"
              >
                Try demo login
              </Link>
              <Link
                href="/signup"
                className="rounded-[4px] bg-[#FF7A18] px-4 py-2 text-sm font-bold text-white no-underline hover:bg-[#E5670A]"
              >
                I&apos;m 13–17 — sign up
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

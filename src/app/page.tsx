import Link from "next/link";
import { LandingHero } from "@/components/landing/LandingHero";
import { FeatureCards } from "@/components/landing/FeatureCards";
import { PLATFORM_AUDIENCE, PLATFORM_NAME } from "@/lib/constants";

export default function LandingPage() {
  return (
    <main id="main-content" className="min-h-screen bg-[#e9eef4]">
      <div className="border-b border-[#c5d0dc] bg-[#0f2744]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link
            href="/"
            className="text-lg font-black tracking-tight text-white no-underline hover:text-[#d7e4f3]"
          >
            {PLATFORM_NAME}
          </Link>
          <div className="flex items-center gap-2">
            <span className="hidden text-xs font-bold uppercase tracking-wide text-[#d7e4f3] sm:inline">
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
              className="rounded-[4px] bg-[#3b6ea5] px-3 py-1.5 text-sm font-bold text-white no-underline hover:bg-[#2f5f91]"
            >
              Create Your Profile
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <LandingHero />
        <section className="pb-6" aria-labelledby="features-heading">
          <h2 id="features-heading" className="mb-4 text-2xl font-black text-[#0f2744]">
            The customizable profile teens actually want
          </h2>
          <p className="mb-4 max-w-2xl text-sm text-[#5b6b7c]">
            Same freedom as the old personal-page energy — rebuilt for how teens hang out
            online now: music, friends, photos, and a page that does not look like everyone
            else&apos;s.
          </p>
          <FeatureCards />
        </section>

        <section className="pb-16">
          <div className="mp-card grid items-center gap-6 p-6 md:grid-cols-[1fr_auto]">
            <div>
              <h2 className="text-2xl font-black text-[#0f2744]">
                Ready to set your vibe?
              </h2>
              <p className="mt-2 text-[#5b6b7c]">
                Ages 13–17 only. Try the demo ({`nova@example.com`} / demo1234) or create
                your own teen profile and theme it during onboarding.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/login"
                className="rounded-[4px] border border-[#3b6ea5] bg-white px-4 py-2 text-sm font-bold text-[#0f2744] no-underline hover:bg-[#d7e4f3]"
              >
                Try demo login
              </Link>
              <Link
                href="/signup"
                className="rounded-[4px] bg-[#0f2744] px-4 py-2 text-sm font-bold text-white no-underline hover:bg-[#0a1b30]"
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

import Link from "next/link";
import { PLATFORM_NAME } from "@/lib/constants";

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="flex min-h-screen items-center justify-center bg-[#e9eef4] px-4 py-12"
    >
      <section className="mp-card max-w-lg p-8 text-center">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-[#3b6ea5]">
          404
        </p>
        <h1 className="mt-3 text-4xl font-black text-[#0f2744]">
          This place is missing.
        </h1>
        <p className="mt-3 text-sm text-[#5b6b7c]">
          The {PLATFORM_NAME} page you wanted may have moved, changed names, or never existed.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/home"
            className="rounded-[4px] bg-[#0f2744] px-4 py-2 text-sm font-bold text-white no-underline hover:bg-[#0a1b30]"
          >
            Go home
          </Link>
          <Link
            href="/browse"
            className="rounded-[4px] border border-[#3b6ea5] bg-white px-4 py-2 text-sm font-bold text-[#0f2744] no-underline hover:bg-[#d7e4f3]"
          >
            Browse profiles
          </Link>
        </div>
      </section>
    </main>
  );
}

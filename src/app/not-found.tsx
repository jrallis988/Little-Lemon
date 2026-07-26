import Link from "next/link";
import { PLATFORM_NAME } from "@/lib/constants";

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="flex min-h-screen items-center justify-center bg-[#F5F5F5] px-4 py-12"
    >
      <section className="mp-card max-w-lg p-8 text-center">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-[#7B61FF]">
          404
        </p>
        <h1 className="mt-3 text-4xl font-black text-[#222222]">
          This place is missing.
        </h1>
        <p className="mt-3 text-sm text-[#6E6E6E]">
          The {PLATFORM_NAME} page you wanted may have moved, changed names, or never existed.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/home"
            className="rounded-[4px] bg-[#FF7A18] px-4 py-2 text-sm font-bold text-white no-underline hover:bg-[#E5670A]"
          >
            Go home
          </Link>
          <Link
            href="/browse"
            className="rounded-[4px] border border-[#7B61FF] bg-white px-4 py-2 text-sm font-bold text-[#222222] no-underline hover:bg-[#EEE9FF]"
          >
            Browse profiles
          </Link>
        </div>
      </section>
    </main>
  );
}

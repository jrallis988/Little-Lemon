import { siteConfig } from "@/lib/site";

export function StagingBanner() {
  if (!siteConfig.showStagingBanner) return null;

  return (
    <div
      className="border-b border-[#7a5b00]/40 bg-[#fff4cc] text-[#5c4500]"
      role="status"
    >
      <div className="wrap py-2 text-center text-xs font-semibold leading-snug sm:text-sm">
        Staging site — content and intake are for development. Not an official
        Boston Children&apos;s Hospital production property. Set{" "}
        <code className="rounded bg-black/5 px-1">NEXT_PUBLIC_SITE_MODE=production</code>{" "}
        to hide this banner after go-live checks.
      </div>
    </div>
  );
}

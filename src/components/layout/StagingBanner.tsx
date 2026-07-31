import { siteConfig } from "@/lib/site";

export function StagingBanner() {
  if (!siteConfig.showStagingBanner && siteConfig.isOfficial) return null;

  if (siteConfig.showStagingBanner) {
    return (
      <div
        className="border-b border-[#7a5b00]/40 bg-[#fff4cc] text-[#5c4500]"
        role="status"
      >
        <div className="wrap py-2 text-center text-xs font-semibold leading-snug sm:text-sm">
          Staging site — intake and content are for launch validation. Set{" "}
          <code className="rounded bg-black/5 px-1">
            NEXT_PUBLIC_SITE_MODE=production
          </code>{" "}
          after go-live checks in <code className="rounded bg-black/5 px-1">DEPLOY.md</code>.
        </div>
      </div>
    );
  }

  if (!siteConfig.isOfficial) {
    return (
      <div
        className="border-b border-border bg-surface text-text-body"
        role="note"
      >
        <div className="wrap py-2 text-center text-xs font-medium leading-snug sm:text-sm">
          Independent care-platform redesign inspired by pediatric hospital UX.
          Not an official Boston Children&apos;s Hospital website. Set{" "}
          <code className="rounded bg-black/5 px-1">
            NEXT_PUBLIC_SITE_OFFICIAL=true
          </code>{" "}
          only with authorization.
        </div>
      </div>
    );
  }

  return null;
}

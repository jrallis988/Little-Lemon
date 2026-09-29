import Image from "next/image";
import { cn } from "@/lib/cn";

type BadgeProps = {
  className?: string;
};

/**
 * Official U.S. News Honor Roll 2026–2027 badge artwork from childrenshospital.org.
 */
export function UsNewsHonorRollBadge({ className }: BadgeProps) {
  return (
    <Image
      src="/images/brand/usnews-honor-roll-2026-27.png"
      alt="U.S. News Best Children's Hospitals Honor Roll 2026-2027"
      width={140}
      height={162}
      className={cn("h-[88px] w-auto drop-shadow-md", className)}
      priority={false}
    />
  );
}

/**
 * Official Newsweek / Statista World's Best Specialized Hospitals 2027 badge
 * artwork from childrenshospital.org.
 */
export function NewsweekBestBadge({ className }: BadgeProps) {
  return (
    <Image
      src="/images/brand/newsweek-2027.png"
      alt="Newsweek World's Best Specialized Hospitals 2027"
      width={117}
      height={167}
      className={cn("h-[88px] w-auto drop-shadow-md", className)}
      priority={false}
    />
  );
}

export function AwardBadgeRow({ className }: BadgeProps) {
  return (
    <div className={cn("flex flex-wrap items-end gap-s3", className)}>
      <UsNewsHonorRollBadge />
      <NewsweekBestBadge />
    </div>
  );
}

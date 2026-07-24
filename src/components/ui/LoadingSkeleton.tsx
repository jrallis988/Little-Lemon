import { cn } from "@/lib/utils/cn";

type LoadingSkeletonVariant = "card" | "feed" | "profile";

export interface LoadingSkeletonProps {
  variant?: LoadingSkeletonVariant;
  count?: number;
  className?: string;
}

function SkeletonBlock({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-[4px] bg-[#c5d0dc]/70",
        className
      )}
    />
  );
}

function CardSkeleton() {
  return (
    <div className="mp-card space-y-3 p-4">
      <SkeletonBlock className="h-4 w-1/3" />
      <SkeletonBlock className="h-3 w-full" />
      <SkeletonBlock className="h-3 w-5/6" />
      <SkeletonBlock className="h-20 w-full" />
    </div>
  );
}

function FeedSkeleton() {
  return (
    <div className="mp-card p-4">
      <div className="flex gap-3">
        <SkeletonBlock className="h-10 w-10 shrink-0" />
        <div className="flex-1 space-y-2">
          <SkeletonBlock className="h-3 w-1/4" />
          <SkeletonBlock className="h-3 w-1/6" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <SkeletonBlock className="h-3 w-full" />
        <SkeletonBlock className="h-3 w-11/12" />
        <SkeletonBlock className="h-3 w-2/3" />
      </div>
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="mp-card overflow-hidden">
      <SkeletonBlock className="h-28 w-full rounded-none" />
      <div className="space-y-4 p-4">
        <div className="flex items-end gap-3">
          <SkeletonBlock className="-mt-10 h-20 w-20 border-4 border-white" />
          <div className="mb-1 flex-1 space-y-2">
            <SkeletonBlock className="h-5 w-1/3" />
            <SkeletonBlock className="h-3 w-1/4" />
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <SkeletonBlock className="h-24 w-full" />
          <SkeletonBlock className="h-24 w-full" />
        </div>
      </div>
    </div>
  );
}

export function LoadingSkeleton({
  variant = "card",
  count = 1,
  className,
}: LoadingSkeletonProps) {
  const safeCount = Math.max(1, count);
  const items = Array.from({ length: safeCount }, (_, index) => index);

  return (
    <div className={cn("space-y-3", className)} aria-busy="true">
      <span className="sr-only">Loading content</span>
      {items.map((item) => {
        if (variant === "feed") return <FeedSkeleton key={item} />;
        if (variant === "profile") return <ProfileSkeleton key={item} />;
        return <CardSkeleton key={item} />;
      })}
    </div>
  );
}

import type { Profile, OnlineStatus } from "@/lib/types/database";
import { cn } from "@/lib/utils/cn";
import { OnlineIndicator } from "./OnlineIndicator";

type AvatarProfile = Pick<
  Profile,
  "avatar_url" | "display_name" | "username" | "online_status"
>;

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-base",
  xl: "h-20 w-20 text-xl",
};

const indicatorSizes = {
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "lg",
} as const;

function getInitials(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "?";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0][0]}${words[1][0]}`.toUpperCase();
}

export interface AvatarProps {
  profile?: AvatarProfile | null;
  src?: string | null;
  name?: string | null;
  alt?: string;
  size?: keyof typeof sizeClasses;
  status?: OnlineStatus;
  showOnline?: boolean;
  className?: string;
}

export function Avatar({
  profile,
  src,
  name,
  alt,
  size = "md",
  status,
  showOnline = false,
  className,
}: AvatarProps) {
  const imageSrc = src ?? profile?.avatar_url ?? null;
  const displayName =
    name ?? profile?.display_name ?? profile?.username ?? "MyPlace member";
  const onlineStatus = status ?? profile?.online_status ?? "offline";
  const imageAlt = alt ?? `${displayName} profile photo`;

  return (
    <span className={cn("relative inline-flex shrink-0", className)}>
      <span
        className={cn(
          "flex overflow-hidden rounded-[4px] border border-[#c5d0dc] bg-[#d7e4f3] font-bold text-[#0f2744] shadow-[0_1px_2px_rgba(15,39,68,0.08)]",
          sizeClasses[size]
        )}
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={imageAlt}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center">
            {getInitials(displayName)}
          </span>
        )}
      </span>
      {showOnline ? (
        <span className="absolute -bottom-0.5 -right-0.5">
          <OnlineIndicator
            status={onlineStatus}
            size={indicatorSizes[size]}
          />
        </span>
      ) : null}
    </span>
  );
}

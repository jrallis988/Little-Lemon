import Link from "next/link";
import { MapPin } from "lucide-react";

import type { OnlineStatus, Profile } from "@/lib/types/database";
import { PLACEHOLDER_AVATAR } from "@/lib/constants";
import { cn } from "@/lib/utils/cn";

type ProfileCardProps = {
  profile: Profile;
  className?: string;
  interestsLimit?: number;
};

function statusLabel(status: OnlineStatus) {
  if (status === "online") return "Online now";
  if (status === "away") return "Away";
  return "Offline";
}

function statusClasses(status: OnlineStatus) {
  if (status === "online") return "bg-emerald-500 animate-online";
  if (status === "away") return "bg-amber-400";
  return "bg-slate-400";
}

export function ProfileCard({
  profile,
  className,
  interestsLimit = 4,
}: ProfileCardProps) {
  const interests = profile.interests.slice(0, interestsLimit);
  const extraInterests = Math.max(profile.interests.length - interests.length, 0);

  return (
    <Link
      href={`/profile/${profile.username}`}
      className={cn(
        "profile-module group block transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-offset-4",
        className
      )}
    >
      <article className="flex gap-3">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md border border-[color-mix(in_srgb,var(--mp-primary,#1a365d)_25%,transparent)] bg-white">
          <img
            src={profile.avatar_url ?? PLACEHOLDER_AVATAR}
            alt={`${profile.display_name}'s avatar`}
            className="h-full w-full object-cover"
          />
          <span
            className={cn(
              "absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full border-2 border-white",
              statusClasses(profile.online_status)
            )}
            title={statusLabel(profile.online_status)}
            aria-label={statusLabel(profile.online_status)}
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="profile-heading truncate text-lg font-bold leading-tight group-hover:underline">
                {profile.display_name}
              </h3>
              <p className="truncate text-sm opacity-75">@{profile.username}</p>
            </div>
            <span className="rounded-full border border-current px-2 py-0.5 text-xs font-semibold opacity-80">
              {profile.online_status}
            </span>
          </div>

          {profile.location ? (
            <p className="mt-2 flex items-center gap-1 text-sm opacity-80">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="truncate">{profile.location}</span>
            </p>
          ) : null}

          {profile.bio ? (
            <p className="mt-2 line-clamp-2 text-sm opacity-90">{profile.bio}</p>
          ) : null}

          {interests.length > 0 ? (
            <p className="mt-3 flex flex-wrap gap-1.5 text-xs">
              {interests.map((interest) => (
                <span
                  key={interest}
                  className="rounded-full bg-[color-mix(in_srgb,var(--mp-secondary,#3b6ea5)_18%,white)] px-2 py-0.5 text-[color:var(--mp-text,#1a2332)]"
                >
                  {interest}
                </span>
              ))}
              {extraInterests > 0 ? (
                <span className="rounded-full border border-current px-2 py-0.5 opacity-70">
                  +{extraInterests}
                </span>
              ) : null}
            </p>
          ) : null}
        </div>
      </article>
    </Link>
  );
}

export default ProfileCard;

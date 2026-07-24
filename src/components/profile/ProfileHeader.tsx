"use client";

import {
  CalendarDays,
  Eye,
  HeartHandshake,
  Mail,
  MapPin,
  MessageCircle,
  Plus,
  Radio,
  UserCheck,
  UserPlus,
} from "lucide-react";

import type { OnlineStatus, Profile } from "@/lib/types/database";
import { PLACEHOLDER_AVATAR } from "@/lib/constants";
import { cn } from "@/lib/utils/cn";
import { formatDate, formatRelative } from "@/lib/utils/format";

export type ProfileFriendshipStatus =
  | "none"
  | "pending_sent"
  | "pending_received"
  | "friends"
  | "self";

type ProfileHeaderProps = {
  profile: Profile;
  isOwn: boolean;
  friendshipStatus?: ProfileFriendshipStatus;
  onAddFriend?: (profile: Profile) => void;
  onAcceptFriend?: (profile: Profile) => void;
  onMessage?: (profile: Profile) => void;
  onFollow?: (profile: Profile) => void;
  profileViews?: number;
  className?: string;
};

function statusTone(status: OnlineStatus) {
  if (status === "online") return "bg-emerald-500 text-emerald-950";
  if (status === "away") return "bg-amber-400 text-amber-950";
  return "bg-slate-400 text-slate-950";
}

function statusText(profile: Profile) {
  if (profile.online_status === "online") return "Online now";
  if (profile.online_status === "away") return "Away";
  return `Offline${profile.last_active_at ? ` · active ${formatRelative(profile.last_active_at)}` : ""}`;
}

function actionButtonClass(variant: "primary" | "secondary" = "secondary") {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded border px-3 py-2 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-60",
    variant === "primary"
      ? "border-[color:var(--mp-primary,#1a365d)] bg-[color:var(--mp-primary,#1a365d)] text-white hover:brightness-110"
      : "border-[color-mix(in_srgb,var(--mp-primary,#1a365d)_35%,transparent)] bg-white/80 text-[color:var(--mp-primary,#1a365d)] hover:bg-white"
  );
}

export function ProfileHeader({
  profile,
  isOwn,
  friendshipStatus = isOwn ? "self" : "none",
  onAddFriend,
  onAcceptFriend,
  onMessage,
  onFollow,
  profileViews,
  className,
}: ProfileHeaderProps) {
  const views = profileViews ?? profile.profile_views;
  const showAddFriend =
    !isOwn && (friendshipStatus === "none" || friendshipStatus === "pending_received");

  return (
    <header className={cn("profile-module overflow-hidden p-0", className)}>
      <div className="relative min-h-44 bg-[linear-gradient(135deg,var(--mp-primary,#1a365d),var(--mp-secondary,#3b6ea5))]">
        {profile.header_image_url ? (
          <img
            src={profile.header_image_url}
            alt={`${profile.display_name}'s profile header`}
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
        <div className="relative flex min-h-44 flex-col justify-end gap-4 p-4 text-white sm:flex-row sm:items-end sm:justify-between sm:p-6">
          <div className="flex min-w-0 items-end gap-4">
            <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-md border-4 border-white bg-white shadow-lg sm:h-36 sm:w-36">
              <img
                src={profile.avatar_url ?? PLACEHOLDER_AVATAR}
                alt={`${profile.display_name}'s avatar`}
                className="h-full w-full object-cover"
              />
              <span
                className={cn(
                  "absolute bottom-2 right-2 h-4 w-4 rounded-full border-2 border-white",
                  profile.online_status === "online"
                    ? "bg-emerald-500 animate-online"
                    : profile.online_status === "away"
                      ? "bg-amber-400"
                      : "bg-slate-400"
                )}
                aria-label={statusText(profile)}
              />
            </div>

            <div className="min-w-0 pb-1">
              <h1 className="truncate text-3xl font-black text-white drop-shadow-sm sm:text-4xl">
                {profile.display_name}
              </h1>
              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/90">
                <span>@{profile.username}</span>
                {profile.pronouns ? <span>{profile.pronouns}</span> : null}
                {profile.show_age && profile.age ? <span>{profile.age}</span> : null}
                {profile.location ? (
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                    {profile.location}
                  </span>
                ) : null}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {showAddFriend ? (
              <button
                type="button"
                className={actionButtonClass("primary")}
                onClick={() =>
                  friendshipStatus === "pending_received"
                    ? onAcceptFriend?.(profile)
                    : onAddFriend?.(profile)
                }
              >
                {friendshipStatus === "pending_received" ? (
                  <UserCheck className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <UserPlus className="h-4 w-4" aria-hidden="true" />
                )}
                {friendshipStatus === "pending_received" ? "Accept Friend" : "Add Friend"}
              </button>
            ) : null}

            {friendshipStatus === "pending_sent" ? (
              <button type="button" className={actionButtonClass("secondary")} disabled>
                <HeartHandshake className="h-4 w-4" aria-hidden="true" />
                Request Sent
              </button>
            ) : null}

            {friendshipStatus === "friends" ? (
              <span className={actionButtonClass("secondary")}>
                <UserCheck className="h-4 w-4" aria-hidden="true" />
                Friends
              </span>
            ) : null}

            {!isOwn ? (
              <>
                <button
                  type="button"
                  className={actionButtonClass("secondary")}
                  onClick={() => onMessage?.(profile)}
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Message
                </button>
                <button
                  type="button"
                  className={actionButtonClass("secondary")}
                  onClick={() => onFollow?.(profile)}
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                  Follow
                </button>
              </>
            ) : (
              <a className={actionButtonClass("secondary")} href={`mailto:?subject=MyPlace profile`}>
                <Mail className="h-4 w-4" aria-hidden="true" />
                Share
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-4 p-4 sm:grid-cols-[1fr_auto] sm:p-6">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-bold",
                statusTone(profile.online_status)
              )}
            >
              <Radio className="h-3.5 w-3.5" aria-hidden="true" />
              {statusText(profile)}
            </span>
            {profile.status_message ? (
              <p className="rounded-full bg-[color-mix(in_srgb,var(--mp-secondary,#3b6ea5)_16%,white)] px-3 py-1 text-sm font-semibold">
                {profile.status_message}
              </p>
            ) : null}
          </div>

          {profile.bio ? <p className="max-w-3xl text-sm opacity-90">{profile.bio}</p> : null}
          {profile.content_warning ? (
            <p className="rounded border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-950">
              Content warning: {profile.content_warning}
            </p>
          ) : null}
        </div>

        <dl className="grid min-w-48 grid-cols-2 gap-3 text-sm sm:grid-cols-1">
          <div className="rounded border border-[color-mix(in_srgb,var(--mp-primary,#1a365d)_20%,transparent)] bg-white/60 p-3">
            <dt className="flex items-center gap-1 text-xs font-bold uppercase tracking-wide opacity-70">
              <Eye className="h-3.5 w-3.5" aria-hidden="true" />
              Views
            </dt>
            <dd className="mt-1 text-lg font-black">{views.toLocaleString()}</dd>
          </div>
          <div className="rounded border border-[color-mix(in_srgb,var(--mp-primary,#1a365d)_20%,transparent)] bg-white/60 p-3">
            <dt className="flex items-center gap-1 text-xs font-bold uppercase tracking-wide opacity-70">
              <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
              Member since
            </dt>
            <dd className="mt-1 font-semibold">{formatDate(profile.member_since)}</dd>
          </div>
        </dl>
      </div>
    </header>
  );
}

export default ProfileHeader;

import {
  BookOpen,
  BriefcaseBusiness,
  Clapperboard,
  GraduationCap,
  Heart,
  Link as LinkIcon,
  Music,
  Sparkles,
  Star,
  Tv,
  UserRoundSearch,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type { Profile, Visibility } from "@/lib/types/database";
import { cn } from "@/lib/utils/cn";

type ProfileDetailsVariant = "all" | "about" | "details";

type ProfileDetailsProps = {
  profile: Profile;
  isOwner: boolean;
  isFriend: boolean;
  variant?: ProfileDetailsVariant;
  className?: string;
};

type DetailItem = {
  key: keyof Profile["field_visibility"] | string;
  label: string;
  icon: LucideIcon;
  value: string | string[] | null;
  type?: "paragraph" | "list" | "link";
  group: "about" | "details";
};

function canViewField(
  fieldVisibility: Record<string, Visibility>,
  field: string,
  isOwner: boolean,
  isFriend: boolean
) {
  if (isOwner) return true;
  const visibility = fieldVisibility[field] ?? "public";
  if (visibility === "public") return true;
  if (visibility === "friends") return isFriend;
  return false;
}

function hasValue(value: string | string[] | null) {
  if (Array.isArray(value)) return value.length > 0;
  return Boolean(value?.trim());
}

function renderValue(item: DetailItem) {
  if (Array.isArray(item.value)) {
    return (
      <div className="flex flex-wrap gap-1.5">
        {item.value.map((value) => (
          <span
            key={value}
            className="rounded-full bg-[color-mix(in_srgb,var(--mp-secondary,#3b6ea5)_18%,white)] px-2 py-1 text-sm"
          >
            {value}
          </span>
        ))}
      </div>
    );
  }

  if (!item.value) return null;

  if (item.type === "link") {
    return (
      <a
        href={item.value}
        target="_blank"
        rel="noreferrer"
        className="break-all font-semibold underline"
      >
        {item.value}
      </a>
    );
  }

  return (
    <p className={cn("whitespace-pre-line", item.type === "paragraph" ? "leading-relaxed" : "")}>
      {item.value}
    </p>
  );
}

export function ProfileDetails({
  profile,
  isOwner,
  isFriend,
  variant = "all",
  className,
}: ProfileDetailsProps) {
  const items: DetailItem[] = [
    {
      key: "about_me",
      label: "About Me",
      icon: Sparkles,
      value: profile.about_me,
      type: "paragraph",
      group: "about",
    },
    {
      key: "who_id_like_to_meet",
      label: "Who I'd Like to Meet",
      icon: UserRoundSearch,
      value: profile.who_id_like_to_meet,
      type: "paragraph",
      group: "about",
    },
    {
      key: "interests",
      label: "Interests",
      icon: Star,
      value: profile.interests,
      type: "list",
      group: "details",
    },
    {
      key: "music",
      label: "Music",
      icon: Music,
      value: profile.music,
      type: "list",
      group: "details",
    },
    {
      key: "movies",
      label: "Movies",
      icon: Clapperboard,
      value: profile.movies,
      type: "list",
      group: "details",
    },
    {
      key: "television",
      label: "Television",
      icon: Tv,
      value: profile.television,
      type: "list",
      group: "details",
    },
    {
      key: "books",
      label: "Books",
      icon: BookOpen,
      value: profile.books,
      type: "list",
      group: "details",
    },
    {
      key: "heroes",
      label: "Heroes",
      icon: Heart,
      value: profile.heroes,
      type: "list",
      group: "details",
    },
    {
      key: "occupation",
      label: "Occupation",
      icon: BriefcaseBusiness,
      value: profile.occupation,
      group: "details",
    },
    {
      key: "education",
      label: "Education",
      icon: GraduationCap,
      value: profile.education,
      group: "details",
    },
    {
      key: "relationship_status",
      label: "Relationship status",
      icon: Heart,
      value: profile.relationship_status,
      group: "details",
    },
    {
      key: "website",
      label: "Website",
      icon: LinkIcon,
      value: profile.website,
      type: "link",
      group: "details",
    },
  ];

  const visibleItems = items.filter((item) => {
    if (variant !== "all" && item.group !== variant) return false;
    return hasValue(item.value) && canViewField(profile.field_visibility, item.key, isOwner, isFriend);
  });

  if (visibleItems.length === 0) {
    return (
      <section className={cn("profile-module", className)}>
        <h2 className="profile-heading text-xl font-black">
          {variant === "about" ? "About" : "Profile Details"}
        </h2>
        <p className="mt-3 text-sm opacity-75">No public details to show.</p>
      </section>
    );
  }

  return (
    <section className={cn("profile-module", className)}>
      <h2 className="profile-heading text-xl font-black">
        {variant === "about" ? "About" : variant === "details" ? "Profile Details" : "Details"}
      </h2>
      <div className="mt-4 grid gap-4">
        {visibleItems.map((item) => {
          const Icon = item.icon;
          return (
            <article
              key={item.key}
              className="rounded border border-[color-mix(in_srgb,var(--mp-primary,#1a365d)_18%,transparent)] bg-white/50 p-3"
            >
              <h3 className="mb-2 flex items-center gap-2 text-sm font-black uppercase tracking-wide opacity-80">
                <Icon className="h-4 w-4" aria-hidden="true" />
                {item.label}
              </h3>
              <div className="text-sm">{renderValue(item)}</div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default ProfileDetails;

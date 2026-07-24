import {
  BookOpen,
  MessageSquare,
  Music,
  Palette,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils/cn";

const features: Array<{
  title: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    title: "Music",
    description: "Feature the songs, playlists, and artists that set the tone.",
    icon: Music,
  },
  {
    title: "Profile themes",
    description: "Pick a preset or tune the colors, fonts, borders, and modules.",
    icon: Palette,
  },
  {
    title: "Blogging",
    description: "Post longer updates with moods, dates, and personal context.",
    icon: BookOpen,
  },
  {
    title: "Friends",
    description: "Build a network that feels personal, visible, and easy to browse.",
    icon: Users,
  },
  {
    title: "Messaging",
    description: "Keep conversations close with unread states and friend-first threads.",
    icon: MessageSquare,
  },
];

export interface FeatureCardsProps {
  className?: string;
}

export function FeatureCards({ className }: FeatureCardsProps) {
  return (
    <section className={cn("grid gap-3 sm:grid-cols-2 lg:grid-cols-5", className)}>
      {features.map((feature) => {
        const Icon = feature.icon;

        return (
          <article
            key={feature.title}
            className="rounded-[4px] border border-[#c5d0dc] bg-white/75 p-4 shadow-[0_1px_2px_rgba(15,39,68,0.08)]"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-[4px] border border-[#c5d0dc] bg-[#d7e4f3] text-[#0f2744]">
              <Icon className="h-4 w-4" aria-hidden="true" />
            </span>
            <h2 className="mt-3 text-base font-black text-[#0f2744]">
              {feature.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#5b6b7c]">
              {feature.description}
            </p>
          </article>
        );
      })}
    </section>
  );
}

export default FeatureCards;

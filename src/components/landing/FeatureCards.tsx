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
    title: "Music on your page",
    description: "Pin the song you’re looping and show friends what’s stuck in your head.",
    icon: Music,
  },
  {
    title: "Themes that slap",
    description: "Pick a preset or remix colors, fonts, stickers, and module order.",
    icon: Palette,
  },
  {
    title: "Mini blogs",
    description: "Rant, journal, or spill — with mood tags and currently listening.",
    icon: BookOpen,
  },
  {
    title: "Featured Friends",
    description: "Spotlight your people. Not a follower count — a real friend grid.",
    icon: Users,
  },
  {
    title: "DMs with friends",
    description: "Private chats, unread badges, and conversations that stay between you.",
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

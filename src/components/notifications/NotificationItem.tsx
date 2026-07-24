"use client";

import Link from "next/link";
import {
  AtSign,
  Bell,
  Heart,
  Mail,
  MessageCircle,
  UserCheck,
  UserPlus,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/Button";
import type {
  Notification,
  NotificationType,
} from "@/lib/types/database";
import { cn } from "@/lib/utils/cn";
import { formatRelative } from "@/lib/utils/format";

const notificationIcons: Record<NotificationType, LucideIcon> = {
  friend_request: UserPlus,
  friend_accepted: UserCheck,
  message: Mail,
  profile_comment: MessageCircle,
  photo_comment: MessageCircle,
  blog_comment: MessageCircle,
  reaction: Heart,
  mention: AtSign,
};

export interface NotificationItemProps {
  notification: Notification;
  onRead: (notification: Notification) => void | Promise<void>;
  className?: string;
}

export function NotificationItem({
  notification,
  onRead,
  className,
}: NotificationItemProps) {
  const Icon = notificationIcons[notification.type] ?? Bell;
  const href = notification.link ?? "/notifications";

  function markRead() {
    if (!notification.read) {
      void onRead(notification);
    }
  }

  return (
    <article
      className={cn(
        "mp-card flex items-start gap-3 p-4",
        !notification.read && "border-[#3b6ea5] bg-[#f8fbff]",
        className
      )}
    >
      <span
        className={cn(
          "mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[4px] border",
          notification.read
            ? "border-[#c5d0dc] bg-white text-[#5b6b7c]"
            : "border-[#3b6ea5] bg-[#d7e4f3] text-[#0f2744]"
        )}
      >
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>

      <Link href={href} onClick={markRead} className="min-w-0 flex-1">
        <span className="flex items-start justify-between gap-3">
          <span className="min-w-0">
            <span
              className={cn(
                "block truncate text-sm text-[#0f2744]",
                notification.read ? "font-semibold" : "font-bold"
              )}
            >
              {notification.title}
            </span>
            <span className="mt-1 block text-sm text-[#1a2332]">
              {notification.body}
            </span>
          </span>
          {!notification.read ? (
            <span
              className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#b42318]"
              aria-label="Unread"
            />
          ) : null}
        </span>
        <time
          dateTime={notification.created_at}
          className="mt-2 block text-xs text-[#5b6b7c]"
        >
          {formatRelative(notification.created_at)}
        </time>
      </Link>

      <Button
        variant="ghost"
        size="sm"
        onClick={markRead}
        disabled={notification.read}
        aria-label={`Mark ${notification.title} as read`}
      >
        Mark read
      </Button>
    </article>
  );
}

export default NotificationItem;

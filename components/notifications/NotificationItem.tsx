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
  X,
} from "lucide-react";

import type { Notification, NotificationType, Profile } from "@/lib/types";
import { cn, formatRelativeTime } from "@/lib/utils";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";

export interface NotificationItemProps {
  notification: Notification;
  actor?: Profile;
  onOpen?: (notification: Notification) => void;
  onMarkRead?: (notification: Notification) => void;
  onDismiss?: (notification: Notification) => void;
  className?: string;
}

const icons: Record<NotificationType, typeof Bell> = {
  friend_request: UserPlus,
  friend_accepted: UserCheck,
  message: Mail,
  profile_comment: MessageCircle,
  photo_comment: MessageCircle,
  blog_comment: MessageCircle,
  reaction: Heart,
  mention: AtSign,
};

export function NotificationItem({
  notification,
  actor,
  onOpen,
  onMarkRead,
  onDismiss,
  className,
}: NotificationItemProps) {
  const Icon = icons[notification.type] ?? Bell;
  const content = (
    <div className="flex min-w-0 flex-1 gap-3">
      {actor ? (
        <Avatar name={actor.displayName} src={actor.avatarUrl} size="sm" />
      ) : (
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-card border border-surface-border bg-brand-soft text-brand">
          <Icon className="h-4 w-4" aria-hidden />
        </span>
      )}
      <span className="min-w-0">
        <span className="block truncate text-sm font-bold text-navy-900">
          {notification.title}
        </span>
        <span className="block text-sm leading-5 text-navy-600">
          {notification.body}
        </span>
        <span className="mt-1 block text-xs text-navy-500">
          {formatRelativeTime(notification.createdAt)}
        </span>
      </span>
    </div>
  );

  return (
    <article
      className={cn(
        "flex items-start gap-3 rounded-card border p-3 shadow-soft transition",
        notification.read
          ? "border-surface-border bg-white"
          : "border-brand/30 bg-brand-soft",
        className
      )}
    >
      {notification.href ? (
        <Link
          href={notification.href}
          className="min-w-0 flex-1"
          onClick={() => onOpen?.(notification)}
        >
          {content}
        </Link>
      ) : (
        <button
          type="button"
          className="min-w-0 flex-1 text-left"
          onClick={() => onOpen?.(notification)}
        >
          {content}
        </button>
      )}
      <div className="flex shrink-0 gap-1">
        {!notification.read && onMarkRead ? (
          <Button
            variant="ghost"
            size="sm"
            className="px-2"
            onClick={() => onMarkRead(notification)}
          >
            <Bell className="h-4 w-4" aria-hidden />
            <span className="sr-only">Mark read</span>
          </Button>
        ) : null}
        {onDismiss ? (
          <Button
            variant="ghost"
            size="sm"
            className="px-2"
            onClick={() => onDismiss(notification)}
          >
            <X className="h-4 w-4" aria-hidden />
            <span className="sr-only">Dismiss</span>
          </Button>
        ) : null}
      </div>
    </article>
  );
}

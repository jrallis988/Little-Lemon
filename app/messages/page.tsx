"use client";

import * as React from "react";
import Link from "next/link";
import { Mail, Search } from "lucide-react";
import { useRouter } from "next/navigation";

import { AuthenticatedShell } from "@/components/auth/AuthenticatedShell";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/lib/auth/AuthProvider";
import { mockApi } from "@/lib/mock/store";
import { friendProfiles, profileByUserId, useMockStore } from "@/lib/mock/social";
import { formatRelativeTime } from "@/lib/utils";
import type { Conversation, Profile } from "@/lib/types";

export default function MessagesPage() {
  return (
    <RequireAuth>
      <AuthenticatedShell>
        <MessagesContent />
      </AuthenticatedShell>
    </RequireAuth>
  );
}

function MessagesContent() {
  const { user } = useAuth();
  const state = useMockStore();
  const router = useRouter();
  const [query, setQuery] = React.useState("");

  if (!user) return null;

  const friends = friendProfiles(state, user.id);
  const conversations = state.conversations
    .filter((conversation) => conversation.memberIds.includes(user.id))
    .sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  const visibleConversations = conversations.filter((conversation) => {
    const participants = conversation.memberIds
      .map((id) => profileByUserId(state.profiles, id))
      .filter((profile): profile is Profile => Boolean(profile));
    const haystack = [
      conversation.lastMessagePreview,
      ...participants.map((profile) => profile.displayName),
      ...participants.map((profile) => profile.username),
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(query.toLowerCase().trim());
  });

  const start = (friend: Profile) => {
    const conversation = mockApi.startConversation(user.id, friend.userId);
    router.push(`/messages/${conversation.id}`);
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black text-navy-900">Messages</h1>
        <p className="text-sm text-navy-600">
          Search conversations, catch unread messages, and start a new thread.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
        <Card>
          <CardHeader>
            <CardTitle>Inbox</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Search messages"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name, username, or latest message..."
            />
            {visibleConversations.length ? (
              <div className="divide-y divide-surface-border overflow-hidden rounded-card border border-surface-border">
                {visibleConversations.map((conversation) => (
                  <ConversationLink
                    key={conversation.id}
                    conversation={conversation}
                    currentUserId={user.id}
                    profiles={state.profiles}
                    unread={state.notifications.some(
                      (notification) =>
                        notification.userId === user.id &&
                        !notification.read &&
                        notification.href === `/messages/${conversation.id}`
                    )}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={Search}
                title="No conversations found"
                description="Try another search, or start a new conversation."
              />
            )}
          </CardContent>
        </Card>

        <aside className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Start a message</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {friends.length ? (
                friends.map((friend) => (
                  <button
                    key={friend.id}
                    type="button"
                    onClick={() => start(friend)}
                    className="flex w-full items-center gap-3 rounded-card border border-surface-border bg-white p-2 text-left transition hover:border-brand/50 hover:bg-brand-soft"
                  >
                    <Avatar
                      name={friend.displayName}
                      src={friend.avatarUrl}
                      size="sm"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-bold text-navy-900">
                        {friend.displayName}
                      </span>
                      <span className="block truncate text-xs text-navy-500">
                        @{friend.username}
                      </span>
                    </span>
                    <Mail className="h-4 w-4 text-brand" aria-hidden />
                  </button>
                ))
              ) : (
                <EmptyState
                  title="No friends yet"
                  description="Add friends before starting new messages."
                />
              )}
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}

function ConversationLink({
  conversation,
  currentUserId,
  profiles,
  unread,
}: {
  conversation: Conversation;
  currentUserId: string;
  profiles: Profile[];
  unread: boolean;
}) {
  const others = conversation.memberIds
    .filter((id) => id !== currentUserId)
    .map((id) => profileByUserId(profiles, id))
    .filter((profile): profile is Profile => Boolean(profile));
  const title = others.length
    ? others.map((profile) => profile.displayName).join(", ")
    : "Saved notes";

  return (
    <Link
      href={`/messages/${conversation.id}`}
      className={`flex items-center gap-3 bg-white p-3 no-underline transition hover:bg-brand-soft ${
        unread ? "border-l-4 border-brand" : ""
      }`}
    >
      <div className="flex -space-x-2">
        {(others.length ? others : profiles.filter((p) => p.userId === currentUserId))
          .slice(0, 3)
          .map((profile) => (
            <Avatar
              key={profile.id}
              name={profile.displayName}
              src={profile.avatarUrl}
              size="sm"
              className="border-2 border-white"
            />
          ))}
      </div>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="truncate text-sm font-bold text-navy-900">{title}</span>
          {unread ? <Badge variant="info">Unread</Badge> : null}
        </span>
        <span className="block truncate text-sm text-navy-600">
          {conversation.lastMessagePreview || "No messages yet"}
        </span>
      </span>
      <span className="text-xs text-navy-500">
        {formatRelativeTime(conversation.updatedAt)}
      </span>
    </Link>
  );
}

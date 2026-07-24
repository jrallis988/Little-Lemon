"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import { MessageSquare, Search } from "lucide-react";

import { Avatar } from "@/components/ui/Avatar";
import { EmptyState } from "@/components/ui/EmptyState";
import { Input } from "@/components/ui/Input";
import type {
  Conversation,
  Message,
  Profile,
} from "@/lib/types/database";
import { cn } from "@/lib/utils/cn";
import { formatRelative } from "@/lib/utils/format";

export interface ConversationListItem extends Conversation {
  otherParticipant: Profile;
  lastMessage?: Message | null;
  unreadCount?: number;
}

export interface ConversationListProps {
  conversations: ConversationListItem[];
  activeId?: string | null;
  className?: string;
}

function messagePreview(message?: Message | null) {
  if (!message) return "No messages yet";
  const normalized = message.body.replace(/\s+/g, " ").trim();
  if (normalized.length <= 72) return normalized;
  return `${normalized.slice(0, 72).trim()}...`;
}

function matchesConversation(conversation: ConversationListItem, query: string) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return true;

  const participant = conversation.otherParticipant;
  const searchable = [
    participant.display_name,
    participant.username,
    conversation.lastMessage?.body ?? "",
  ]
    .join(" ")
    .toLowerCase();

  return searchable.includes(normalizedQuery);
}

export function ConversationList({
  conversations,
  activeId,
  className,
}: ConversationListProps) {
  const searchId = useId();
  const [query, setQuery] = useState("");

  const filteredConversations = useMemo(
    () =>
      conversations.filter((conversation) =>
        matchesConversation(conversation, query)
      ),
    [conversations, query]
  );

  return (
    <aside className={cn("space-y-4", className)}>
      <Input
        id={searchId}
        label="Search messages"
        type="search"
        value={query}
        placeholder="Search conversations"
        onChange={(event) => setQuery(event.target.value)}
      />

      {conversations.length === 0 ? (
        <EmptyState
          title="No conversations"
          description="Messages from friends will show up here."
          icon={MessageSquare}
        />
      ) : filteredConversations.length === 0 ? (
        <EmptyState
          title="No conversations found"
          description="Try searching for another friend or message."
          icon={Search}
        />
      ) : (
        <nav className="space-y-2" aria-label="Conversations">
          {filteredConversations.map((conversation) => {
            const participant = conversation.otherParticipant;
            const unreadCount = conversation.unreadCount ?? 0;
            const timestamp =
              conversation.lastMessage?.created_at ??
              conversation.last_message_at ??
              conversation.updated_at;

            return (
              <Link
                key={conversation.id}
                href={`/messages/${conversation.id}`}
                aria-current={activeId === conversation.id ? "page" : undefined}
                className={cn(
                  "mp-card flex gap-3 p-3 transition hover:border-[#3b6ea5] hover:bg-[#f8fbff]",
                  activeId === conversation.id &&
                    "border-[#3b6ea5] bg-[#d7e4f3]/55"
                )}
              >
                <Avatar profile={participant} size="md" showOnline />
                <span className="min-w-0 flex-1">
                  <span className="flex items-start justify-between gap-2">
                    <span className="min-w-0">
                      <span className="block truncate font-bold text-[#0f2744]">
                        {participant.display_name}
                      </span>
                      <span className="block truncate text-xs text-[#5b6b7c]">
                        @{participant.username}
                      </span>
                    </span>
                    <span className="shrink-0 text-xs text-[#5b6b7c]">
                      {formatRelative(timestamp)}
                    </span>
                  </span>
                  <span className="mt-1 flex items-center gap-2">
                    <span
                      className={cn(
                        "truncate text-sm",
                        unreadCount > 0
                          ? "font-bold text-[#0f2744]"
                          : "text-[#5b6b7c]"
                      )}
                    >
                      {messagePreview(conversation.lastMessage)}
                    </span>
                    {unreadCount > 0 ? (
                      <span className="ml-auto inline-flex min-w-5 items-center justify-center rounded-full bg-[#b42318] px-1.5 py-0.5 text-xs font-bold text-white">
                        {unreadCount}
                      </span>
                    ) : null}
                  </span>
                </span>
              </Link>
            );
          })}
        </nav>
      )}
    </aside>
  );
}

export default ConversationList;

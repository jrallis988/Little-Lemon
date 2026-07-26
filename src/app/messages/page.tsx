"use client";

import { useRouter } from "next/navigation";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/lib/auth/context";
import { formatRelative } from "@/lib/utils/format";
import {
  Card,
  EmptyNotice,
  LoadingCard,
  VibeShell,
  SectionTitle,
  conversationSummaries,
  useMockStoreState,
} from "@/app/_components/vibe-page-utils";

function MessagesContent() {
  const router = useRouter();
  const { profile } = useAuth();
  const { store } = useMockStoreState();

  if (!profile || !store) return <LoadingCard label="Loading conversations..." />;

  const conversations = conversationSummaries(store, profile.id);

  if (conversations.length === 0) {
    return (
      <EmptyNotice title="No conversations yet" actionHref="/browse" actionLabel="Browse profiles">
        Visit profiles and use the Message button to start a conversation.
      </EmptyNotice>
    );
  }

  return (
    <div className="space-y-5">
      <Card>
        <h1 className="text-3xl font-black text-[#222222]">Messages</h1>
        <p className="mt-2 text-sm text-[#6E6E6E]">Pick a conversation to keep chatting.</p>
      </Card>

      <Card>
        <SectionTitle title="Conversation list" />
        <div className="space-y-2">
          {conversations.map((summary) => (
            <article
              key={summary.conversation?.id}
              className="flex items-center justify-between gap-3 rounded border border-[#E5E5E5] bg-white p-3"
            >
              <button
                type="button"
                className="flex min-w-0 flex-1 items-center gap-3 text-left"
                onClick={() => {
                  router.push(`/messages/${summary.conversation?.id}`);
                }}
              >
                <Avatar profile={summary.otherProfile} size="lg" showOnline />
                <span className="min-w-0">
                  <span className="block font-bold text-[#222222]">
                    {summary.otherProfile?.display_name}
                  </span>
                  <span className="block truncate text-sm text-[#6E6E6E]">
                    {summary.lastMessage?.body ?? "No messages yet."}
                  </span>
                  {summary.lastMessage ? (
                    <span className="block text-xs text-[#6E6E6E]">
                      {formatRelative(summary.lastMessage.created_at)}
                    </span>
                  ) : null}
                </span>
              </button>
              {summary.unread > 0 ? (
                <span className="rounded-full bg-[#FF7A18] px-2 py-1 text-xs font-black text-white">
                  {summary.unread}
                </span>
              ) : null}
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  router.push(`/messages/${summary.conversation?.id}`);
                }}
              >
                Open
              </Button>
            </article>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default function MessagesPage() {
  return (
    <VibeShell>
      <MessagesContent />
    </VibeShell>
  );
}

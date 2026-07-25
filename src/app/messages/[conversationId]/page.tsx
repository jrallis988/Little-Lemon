"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { useAuth } from "@/lib/auth/context";
import { mutateStore, sendMessage } from "@/lib/mock/store";
import { formatDateTime } from "@/lib/utils/format";
import {
  Card,
  EmptyNotice,
  LoadingCard,
  VibeShell,
  conversationSummaries,
  profileById,
  useMockStoreState,
} from "@/app/_components/vibe-page-utils";

function MessageThreadContent() {
  const params = useParams<{ conversationId: string }>();
  const router = useRouter();
  const { profile } = useAuth();
  const { store, refresh } = useMockStoreState();
  const [draft, setDraft] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!profile || !params.conversationId) return;
    mutateStore((current) => {
      const member = current.conversationMembers.find(
        (item) =>
          item.conversation_id === params.conversationId && item.profile_id === profile.id
      );
      if (member) member.last_read_at = new Date().toISOString();
    });
  }, [params.conversationId, profile]);

  if (!profile || !store) return <LoadingCard label="Loading message thread..." />;

  const summary = conversationSummaries(store, profile.id).find(
    (item) => item.conversation?.id === params.conversationId
  );

  if (!summary || !summary.conversation || !summary.otherProfile) {
    return (
      <EmptyNotice title="Conversation not found" actionHref="/messages" actionLabel="Back to messages">
        This conversation is not available for your mock account.
      </EmptyNotice>
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = draft.trim();
    if (!body || !profile) return;
    sendMessage(params.conversationId, profile.id, body);
    mutateStore((current) => {
      const member = current.conversationMembers.find(
        (item) =>
          item.conversation_id === params.conversationId && item.profile_id === profile.id
      );
      if (member) member.last_read_at = new Date().toISOString();
    });
    setDraft("");
    setStatus("Message sent.");
    refresh();
  }

  return (
    <div className="space-y-5">
      <Card className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar profile={summary.otherProfile} size="lg" showOnline />
          <div>
            <h1 className="text-2xl font-black text-[#0f2744]">
              {summary.otherProfile.display_name}
            </h1>
            <p className="text-sm text-[#5b6b7c]">@{summary.otherProfile.username}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() => {
              router.push(`/profile/${summary.otherProfile?.username}`);
            }}
          >
            View profile
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              router.push("/messages");
            }}
          >
            Back
          </Button>
        </div>
      </Card>

      <Card className="min-h-[420px]">
        <h2 className="mp-section-title">MessageThread</h2>
        <div className="space-y-3">
          {summary.messages.length === 0 ? (
            <p className="text-sm text-[#5b6b7c]">No messages yet. Say hello below.</p>
          ) : (
            summary.messages.map((message) => {
              const sender = profileById(store, message.sender_id);
              const mine = message.sender_id === profile.id;
              return (
                <article
                  key={message.id}
                  className={`flex gap-3 ${mine ? "justify-end" : "justify-start"}`}
                >
                  {!mine ? <Avatar profile={sender} size="sm" /> : null}
                  <div
                    className={`max-w-[78%] rounded-[8px] border p-3 ${
                      mine
                        ? "border-[#0f2744] bg-[#0f2744] text-white"
                        : "border-[#c5d0dc] bg-white text-[#1a2332]"
                    }`}
                  >
                    <p className="whitespace-pre-line text-sm">{message.body}</p>
                    <time
                      dateTime={message.created_at}
                      className={`mt-1 block text-xs ${mine ? "text-white/75" : "text-[#5b6b7c]"}`}
                    >
                      {formatDateTime(message.created_at)}
                    </time>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </Card>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Textarea
            id="message-body"
            label={`Message ${summary.otherProfile.display_name}`}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            rows={3}
            placeholder="Write a message..."
            required
          />
          <div className="flex flex-wrap items-center justify-between gap-3">
            {status ? <p className="text-sm font-semibold text-[#1f7a4d]">{status}</p> : <span />}
            <Button type="submit">Send message</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default function MessageThreadPage() {
  return (
    <VibeShell>
      <MessageThreadContent />
    </VibeShell>
  );
}

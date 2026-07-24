"use client";

import * as React from "react";
import { Flag, Send, Trash2 } from "lucide-react";

import type { Conversation, Message, Profile } from "@/lib/types";
import { cn, formatDateTime, formatRelativeTime } from "@/lib/utils";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Textarea } from "@/components/ui/Textarea";

export interface MessageThreadProps {
  conversation: Conversation;
  messages: Message[];
  participants: Record<string, Profile>;
  currentUser: Profile;
  hasMore?: boolean;
  isLoadingMore?: boolean;
  onSendMessage: (body: string) => void | Promise<void>;
  onLoadMore?: () => void;
  onReportMessage?: (message: Message) => void;
  onDeleteMessage?: (message: Message) => void;
  className?: string;
}

function participantFor(
  participants: Record<string, Profile>,
  senderId: string
) {
  return (
    participants[senderId] ??
    Object.values(participants).find(
      (profile) => profile.id === senderId || profile.userId === senderId
    )
  );
}

export function MessageThread({
  conversation,
  messages,
  participants,
  currentUser,
  hasMore = false,
  isLoadingMore = false,
  onSendMessage,
  onLoadMore,
  onReportMessage,
  onDeleteMessage,
  className,
}: MessageThreadProps) {
  const [body, setBody] = React.useState("");
  const [sending, setSending] = React.useState(false);
  const endRef = React.useRef<HTMLDivElement>(null);
  const sortedMessages = React.useMemo(
    () =>
      [...messages].sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      ),
    [messages]
  );

  React.useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [sortedMessages.length]);

  const others = conversation.memberIds
    .map((id) => participantFor(participants, id))
    .filter((profile): profile is Profile => Boolean(profile))
    .filter((profile) => profile.userId !== currentUser.userId);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = body.trim();
    if (!trimmed) return;
    setSending(true);
    try {
      await onSendMessage(trimmed);
      setBody("");
    } finally {
      setSending(false);
    }
  };

  return (
    <Card className={cn("flex h-[620px] flex-col overflow-hidden", className)}>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {(others.length ? others : [currentUser]).slice(0, 3).map((profile) => (
              <Avatar
                key={profile.id}
                name={profile.displayName}
                src={profile.avatarUrl}
                size="sm"
                className="border-2 border-white"
              />
            ))}
          </div>
          <div className="min-w-0">
            <CardTitle>
              {others.length
                ? others.map((profile) => profile.displayName).join(", ")
                : "Saved notes"}
            </CardTitle>
            <p className="mt-0.5 text-xs text-navy-500">
              Updated {formatRelativeTime(conversation.updatedAt)}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex min-h-0 flex-1 flex-col p-0">
        <div className="border-b border-surface-border bg-surface-muted px-4 py-2 text-center">
          {hasMore && onLoadMore ? (
            <Button
              variant="secondary"
              size="sm"
              onClick={onLoadMore}
              isLoading={isLoadingMore}
            >
              Load earlier messages
            </Button>
          ) : (
            <span className="text-xs text-navy-500">Start of conversation</span>
          )}
        </div>
        <div className="min-h-0 flex-1 space-y-3 overflow-y-auto bg-white p-4">
          {sortedMessages.length > 0 ? (
            sortedMessages.map((message) => {
              const sender = participantFor(participants, message.senderId);
              const mine = message.senderId === currentUser.userId;
              const senderName = sender?.displayName ?? "Unknown member";

              return (
                <article
                  key={message.id}
                  className={cn("flex gap-2", mine && "flex-row-reverse")}
                >
                  <Avatar
                    name={senderName}
                    src={sender?.avatarUrl}
                    size="sm"
                    className={mine ? "mt-1" : "mt-1"}
                  />
                  <div
                    className={cn(
                      "max-w-[75%] rounded-card border px-3 py-2 text-sm shadow-soft",
                      mine
                        ? "border-brand/30 bg-brand text-white"
                        : "border-surface-border bg-surface-muted text-navy-800"
                    )}
                  >
                    <div className="mb-1 flex items-center justify-between gap-3">
                      <span className="text-xs font-bold">
                        {mine ? "You" : senderName}
                      </span>
                      <time
                        className={cn(
                          "text-[10px]",
                          mine ? "text-blue-100" : "text-navy-500"
                        )}
                        dateTime={message.createdAt}
                      >
                        {formatDateTime(message.createdAt)}
                      </time>
                    </div>
                    <p className="whitespace-pre-wrap leading-6">{message.body}</p>
                    <div className="mt-1 flex justify-end gap-1">
                      {onReportMessage && !mine ? (
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 text-[10px] font-bold uppercase opacity-80 hover:opacity-100"
                          onClick={() => onReportMessage(message)}
                        >
                          <Flag className="h-3 w-3" aria-hidden />
                          Report
                        </button>
                      ) : null}
                      {onDeleteMessage && mine ? (
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 text-[10px] font-bold uppercase opacity-80 hover:opacity-100"
                          onClick={() => onDeleteMessage(message)}
                        >
                          <Trash2 className="h-3 w-3" aria-hidden />
                          Delete
                        </button>
                      ) : null}
                    </div>
                  </div>
                </article>
              );
            })
          ) : (
            <EmptyState
              title="No messages yet"
              description="Send a message to start the thread."
            />
          )}
          <div ref={endRef} />
        </div>
        <form onSubmit={submit} className="border-t border-surface-border bg-surface-muted p-3">
          <div className="flex gap-2">
            <Textarea
              aria-label="Message"
              value={body}
              onChange={(event) => setBody(event.target.value)}
              rows={2}
              maxLength={2000}
              placeholder="Type a message..."
              className="min-h-16"
            />
            <Button
              type="submit"
              className="self-end"
              isLoading={sending}
              disabled={!body.trim()}
            >
              <Send className="h-4 w-4" aria-hidden />
              Send
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

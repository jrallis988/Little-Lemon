"use client";

import { FormEvent, useEffect, useId, useRef, useState } from "react";
import { Flag, Send, Shield } from "lucide-react";

import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import type { Message, Profile } from "@/lib/types/database";
import { cn } from "@/lib/utils/cn";
import { formatDateTime } from "@/lib/utils/format";

export interface MessageThreadProps {
  messages: Message[];
  currentProfile: Profile;
  otherParticipant: Profile;
  onSend: (body: string) => void | Promise<void>;
  onBlock?: (profile: Profile) => void;
  onReport?: (profile: Profile) => void;
  isSending?: boolean;
  className?: string;
}

export function MessageThread({
  messages,
  currentProfile,
  otherParticipant,
  onSend,
  onBlock,
  onReport,
  isSending = false,
  className,
}: MessageThreadProps) {
  const textareaId = useId();
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [body, setBody] = useState("");
  const [localSending, setLocalSending] = useState(false);

  const sending = isSending || localSending;
  const trimmedBody = body.trim();
  const disabled = sending || trimmedBody.length === 0;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [messages.length]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (disabled) return;

    setLocalSending(true);
    try {
      await onSend(trimmedBody);
      setBody("");
    } finally {
      setLocalSending(false);
    }
  }

  return (
    <section className={cn("mp-card flex h-full min-h-[32rem] flex-col", className)}>
      <header className="flex items-center justify-between gap-3 border-b border-[#E5E5E5] p-4">
        <div className="flex min-w-0 items-center gap-3">
          <Avatar profile={otherParticipant} size="md" showOnline />
          <div className="min-w-0">
            <h2 className="truncate font-bold text-[#222222]">
              {otherParticipant.display_name}
            </h2>
            <p className="truncate text-xs text-[#6E6E6E]">
              @{otherParticipant.username}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap gap-2">
          {onBlock ? (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onBlock(otherParticipant)}
            >
              <Shield className="h-4 w-4" aria-hidden="true" />
              Block
            </Button>
          ) : null}
          {onReport ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onReport(otherParticipant)}
            >
              <Flag className="h-4 w-4" aria-hidden="true" />
              Report
            </Button>
          ) : null}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto bg-[#f8fbff] p-4">
        <div className="space-y-4">
          {messages.map((message) => {
            const isOwn = message.sender_id === currentProfile.id;
            const sender = isOwn ? currentProfile : otherParticipant;

            return (
              <article
                key={message.id}
                className={cn("flex gap-2", isOwn ? "justify-end" : "justify-start")}
              >
                {!isOwn ? <Avatar profile={sender} size="sm" /> : null}
                <div
                  className={cn(
                    "max-w-[78%] rounded-[4px] border px-3 py-2 shadow-[0_1px_2px_rgba(34,34,34,0.08)]",
                    isOwn
                      ? "border-[#FF7A18] bg-[#FF7A18] text-white"
                      : "border-[#E5E5E5] bg-white text-[#222222]"
                  )}
                >
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">
                    {message.body}
                  </p>
                  <time
                    dateTime={message.created_at}
                    className={cn(
                      "mt-1 block text-[11px]",
                      isOwn ? "text-white/75" : "text-[#6E6E6E]"
                    )}
                  >
                    {formatDateTime(message.created_at)}
                  </time>
                </div>
                {isOwn ? <Avatar profile={sender} size="sm" /> : null}
              </article>
            );
          })}
          <div ref={bottomRef} />
        </div>
      </div>

      <form className="border-t border-[#E5E5E5] bg-white p-4" onSubmit={handleSubmit}>
        <Textarea
          id={textareaId}
          label="Write a message"
          rows={3}
          value={body}
          placeholder={`Message ${otherParticipant.display_name}`}
          disabled={sending}
          onChange={(event) => setBody(event.target.value)}
        />
        <div className="mt-3 flex justify-end">
          <Button type="submit" disabled={disabled}>
            <Send className="h-4 w-4" aria-hidden="true" />
            {sending ? "Sending..." : "Send"}
          </Button>
        </div>
      </form>
    </section>
  );
}

export default MessageThread;

import { ContactAvatar } from "@/components/mail/ContactAvatar";
import { SafetyBadge } from "@/components/mail/SafetyBadge";
import { cn, formatMessageTime } from "@/lib/utils";
import type { Contact, Message } from "@/types/mail";
import { Paperclip } from "lucide-react";

interface MessageListItemProps {
  message: Message;
  contact?: Contact;
  selected: boolean;
  onSelect: () => void;
}

export function MessageListItem({
  message,
  contact,
  selected,
  onSelect,
}: MessageListItemProps) {
  const fallbackContact: Contact = {
    id: "unknown",
    name: "Unknown sender",
    email: "",
    avatarColor: "#9CA3AF",
    initials: "?",
    safety: "unknown",
  };
  const sender = contact ?? fallbackContact;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "group flex w-full items-start gap-3 rounded-3xl px-3 py-3 text-left transition-all animate-fade-up",
        selected
          ? "bg-primary/10 shadow-panel ring-2 ring-primary/20"
          : "hover:bg-white/70",
        message.unread && !selected && "bg-white/55",
      )}
    >
      <ContactAvatar contact={sender} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p
            className={cn(
              "truncate text-sm",
              message.unread ? "font-extrabold text-foreground" : "font-bold text-foreground/90",
            )}
          >
            {message.folder === "sent" ? message.toLabel : sender.name}
          </p>
          <span className="ml-auto shrink-0 text-xs font-bold text-muted-foreground">
            {formatMessageTime(message.sentAt)}
          </span>
        </div>
        <div className="mt-0.5 flex items-center gap-2">
          <p
            className={cn(
              "truncate text-sm",
              message.unread ? "font-bold text-foreground" : "font-semibold text-foreground/80",
            )}
          >
            {message.subject}
          </p>
          {message.unread && (
            <span
              className="h-2 w-2 shrink-0 rounded-full bg-nest-coral animate-soft-pulse"
              aria-label="Unread"
            />
          )}
        </div>
        <p className="mt-0.5 truncate text-sm font-medium text-muted-foreground">
          {message.preview}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {sender.safety !== "unknown" ? (
            <SafetyBadge level={sender.safety} />
          ) : (
            <SafetyBadge level="unknown" />
          )}
          {message.hasAttachment && (
            <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-xs font-bold text-muted-foreground">
              <Paperclip className="size-3" />
              Attachment
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

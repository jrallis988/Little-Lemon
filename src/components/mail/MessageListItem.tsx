import { CategoryTag } from "@/components/mail/CategoryTag";
import { ContactAvatar } from "@/components/mail/ContactAvatar";
import { SafetyBadge } from "@/components/mail/SafetyBadge";
import { cn, formatMessageTime } from "@/lib/utils";
import type { Contact, Message } from "@/types/mail";
import { CheckCircle2, Paperclip, RotateCcw } from "lucide-react";

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
  const returned = message.approvalStatus === "rejected";

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "group flex w-full items-start gap-3 rounded-[1.5rem] border-[2.5px] px-3.5 py-3.5 text-left transition-all animate-fade-up",
        selected
          ? "border-rail/35 bg-[#EEF0FF] shadow-card ring-[3px] ring-rail/20"
          : "border-transparent bg-white/90 hover:border-rail/20 hover:bg-white",
        message.unread && !selected && "border-rail/10 bg-white",
      )}
    >
      <ContactAvatar contact={sender} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p
            className={cn(
              "truncate text-[15px]",
              message.unread
                ? "font-extrabold text-foreground"
                : "font-bold text-foreground/90",
            )}
          >
            {message.folder === "sent" ||
            message.folder === "pending" ||
            message.folder === "drafts"
              ? message.toLabel
              : sender.name}
          </p>
          <span className="ml-auto shrink-0 text-xs font-extrabold text-muted-foreground">
            {formatMessageTime(message.sentAt)}
          </span>
        </div>

        <div className="mt-1 flex flex-wrap items-center gap-1.5">
          {message.folder === "inbox" && (
            <CategoryTag category={sender.category} />
          )}
          {message.folder === "sent" && (
            <span className="inline-flex items-center gap-1 rounded-full bg-safe-soft px-2 py-0.5 text-[11px] font-extrabold text-safe">
              <CheckCircle2 className="size-3.5" />
              Sent
            </span>
          )}
          {message.folder === "pending" && (
            <span className="rounded-full bg-pending-soft px-2.5 py-0.5 text-[11px] font-extrabold text-amber-700">
              Pending
            </span>
          )}
          {returned && (
            <span className="inline-flex items-center gap-1 rounded-full bg-warn-soft px-2.5 py-0.5 text-[11px] font-extrabold text-warn">
              <RotateCcw className="size-3" />
              Returned
            </span>
          )}
        </div>

        <p
          className={cn(
            "mt-1 truncate text-[15px]",
            message.unread
              ? "font-extrabold text-foreground"
              : "font-bold text-foreground/80",
          )}
        >
          {message.subject}
        </p>
        <p className="mt-0.5 truncate text-sm font-semibold text-muted-foreground">
          {message.preview}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {message.folder === "inbox" && (
            <SafetyBadge level={sender.safety} />
          )}
          {message.hasAttachment && (
            <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs font-extrabold text-primary">
              <Paperclip className="size-3.5" />
              Attachment
            </span>
          )}
          {message.unread && (
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full bg-primary animate-soft-pulse"
              aria-label="Unread"
            />
          )}
        </div>
      </div>
    </button>
  );
}

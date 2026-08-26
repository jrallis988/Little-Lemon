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

function categoryLabel(contact?: Contact): string | null {
  if (!contact?.category) return contact?.relationship ?? null;
  if (contact.category === "teacher") return "Teacher";
  if (contact.category === "classmate") return "Classmate";
  if (contact.category === "family") return "Family";
  if (contact.category === "school") return "School";
  return null;
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
  const category = categoryLabel(sender);
  const returned = message.approvalStatus === "rejected";

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "group flex w-full items-start gap-3 rounded-2xl px-3 py-3 text-left transition-all animate-fade-up",
        selected
          ? "bg-primary/10 shadow-card ring-2 ring-primary/20"
          : "hover:bg-white/80",
        message.unread && !selected && "bg-white/70",
      )}
    >
      <ContactAvatar contact={sender} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p
            className={cn(
              "truncate text-sm",
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
          <span className="ml-auto shrink-0 text-xs font-bold text-muted-foreground">
            {formatMessageTime(message.sentAt)}
          </span>
        </div>

        <div className="mt-0.5 flex flex-wrap items-center gap-1.5">
          {category && message.folder === "inbox" && (
            <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-muted-foreground">
              {category}
            </span>
          )}
          {message.folder === "sent" && (
            <CheckCircle2 className="size-3.5 text-safe" />
          )}
          {message.folder === "pending" && (
            <span className="rounded-full bg-pending-soft px-2 py-0.5 text-[10px] font-extrabold text-amber-700">
              Pending
            </span>
          )}
          {returned && (
            <span className="inline-flex items-center gap-1 rounded-full bg-warn-soft px-2 py-0.5 text-[10px] font-extrabold text-warn">
              <RotateCcw className="size-3" />
              Returned
            </span>
          )}
        </div>

        <p
          className={cn(
            "mt-0.5 truncate text-sm",
            message.unread
              ? "font-bold text-foreground"
              : "font-semibold text-foreground/80",
          )}
        >
          {message.subject}
        </p>
        <p className="mt-0.5 truncate text-sm font-medium text-muted-foreground">
          {message.preview}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {message.folder === "inbox" && (
            <SafetyBadge level={sender.safety} />
          )}
          {message.hasAttachment && (
            <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-xs font-bold text-muted-foreground">
              <Paperclip className="size-3" />
              Attachment
            </span>
          )}
          {message.unread && (
            <span
              className="h-2 w-2 shrink-0 rounded-full bg-primary animate-soft-pulse"
              aria-label="Unread"
            />
          )}
        </div>
      </div>
    </button>
  );
}

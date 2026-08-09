import { ContactAvatar } from "@/components/mail/ContactAvatar";
import { SafetyBadge } from "@/components/mail/SafetyBadge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatBytes } from "@/lib/compose";
import { copyForGrade } from "@/lib/stageCopy";
import { cn, formatMessageTime } from "@/lib/utils";
import { getContact, useMailStore } from "@/store/mailStore";
import { Flag, Paperclip, PenLine, Reply, Share2 } from "lucide-react";
import { Link } from "react-router-dom";

function draftIdFromMessage(messageId: string): string | null {
  if (messageId.startsWith("draft-msg-")) {
    return messageId.replace("draft-msg-", "");
  }
  return null;
}

export function MessagePreview() {
  const messages = useMailStore((s) => s.messages);
  const contacts = useMailStore((s) => s.contacts);
  const selectedMessageId = useMailStore((s) => s.selectedMessageId);
  const folder = useMailStore((s) => s.folder);
  const grade = useMailStore((s) => s.grade);
  const learningStage = useMailStore((s) => s.learningStage);
  const teacherUnlocked = useMailStore((s) => s.teacherUnlocked);
  const approveMessage = useMailStore((s) => s.approveMessage);
  const rejectMessage = useMailStore((s) => s.rejectMessage);
  const reportUnknownSender = useMailStore((s) => s.reportUnknownSender);
  const copy = copyForGrade(grade);

  const message = messages.find((m) => m.id === selectedMessageId);
  const contact = message
    ? getContact(contacts, message.fromContactId)
    : undefined;

  if (folder === "safe-contacts") {
    return <SafeContactsPane />;
  }

  if (!message || !contact) {
    return (
      <section className="flex h-full items-center justify-center bg-gradient-to-br from-white/30 to-nest-mist/40 p-8">
        <div className="max-w-sm rounded-3xl bg-card/90 px-6 py-10 text-center shadow-panel animate-fade-up">
          <p className="font-display text-2xl font-extrabold text-foreground">
            Select a message
          </p>
          <p className="mt-2 text-sm font-medium text-muted-foreground">
            Choose a message from the list to read it here.
          </p>
        </div>
      </section>
    );
  }

  const linkedDraftId = draftIdFromMessage(message.id);
  const showApprovalActions =
    message.folder === "pending" && teacherUnlocked;

  return (
    <section
      className={cn(
        "flex h-full min-w-0 flex-col",
        learningStage === "high"
          ? "bg-card"
          : "bg-gradient-to-br from-white/50 via-white/30 to-nest-mist/50",
      )}
    >
      <header className="border-b border-border/70 px-6 py-5">
        <div className="flex flex-wrap items-start gap-4">
          <ContactAvatar contact={contact} size="lg" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-display text-2xl font-extrabold tracking-tight text-foreground">
                {message.subject}
              </h2>
              {message.folder === "pending" ? (
                <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-800">
                  Waiting for approval
                </span>
              ) : (
                <SafetyBadge level={contact.safety} />
              )}
            </div>
            <p className="mt-1 text-sm font-semibold text-foreground/85">
              {message.folder === "sent" ||
              message.folder === "pending" ||
              message.folder === "drafts" ? (
                <>
                  To <span className="text-primary">{message.toLabel}</span>
                </>
              ) : (
                <>
                  From <span className="text-primary">{contact.name}</span>
                  {contact.relationship ? (
                    <span className="text-muted-foreground">
                      {" "}
                      · {contact.relationship}
                    </span>
                  ) : null}
                </>
              )}
            </p>
            <p className="text-xs font-semibold text-muted-foreground">
              {formatMessageTime(message.sentAt)}
              {contact.email ? ` · ${contact.email}` : ""}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {linkedDraftId ? (
              <Button variant="coral" size="sm" asChild>
                <Link to={`/compose?draft=${linkedDraftId}`}>
                  <PenLine className="size-4" />
                  Continue editing
                </Link>
              </Button>
            ) : (
              <Button variant="outline" size="sm" asChild>
                <Link to={`/compose?replyTo=${message.id}`}>
                  <Reply className="size-4" />
                  Reply
                </Link>
              </Button>
            )}
            <Button variant="ghost" size="icon" aria-label="Forward" asChild>
              <Link
                to={`/compose?replyTo=${message.id}`}
                aria-label="Forward"
              >
                <Share2 className="size-4" />
              </Link>
            </Button>
          </div>
        </div>

        {contact.safety === "unknown" && message.folder === "inbox" && (
          <div className="mt-4 space-y-3 rounded-3xl border-2 border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900 animate-fade-up">
            <p>{copy.unknownSenderHint}</p>
            <Button
              size="sm"
              variant="outline"
              onClick={() => void reportUnknownSender(message.id)}
            >
              <Flag className="size-4" />
              Mark as reported
            </Button>
          </div>
        )}

        {showApprovalActions && (
          <div className="mt-4 flex flex-wrap gap-2">
            <Button onClick={() => void approveMessage(message.id)}>
              Approve & send
            </Button>
            <Button
              variant="outline"
              onClick={() => void rejectMessage(message.id)}
            >
              Return to drafts
            </Button>
          </div>
        )}
      </header>

      <ScrollArea className="flex-1">
        <article className="space-y-4 px-6 py-6">
          {(message.attachments?.length ?? 0) > 0 && (
            <ul className="flex flex-wrap gap-2">
              {message.attachments?.map((file) => (
                <li
                  key={file.id}
                  className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1.5 text-xs font-bold"
                >
                  <Paperclip className="size-3.5" />
                  {file.name}
                  <span className="text-muted-foreground">
                    {formatBytes(file.size)}
                  </span>
                </li>
              ))}
            </ul>
          )}
          <div
            className={cn(
              "bg-card p-6 animate-fade-up",
              learningStage === "high"
                ? "rounded-xl border border-border"
                : "rounded-[1.75rem] shadow-panel",
            )}
          >
            <p
              className={cn(
                "whitespace-pre-wrap font-medium leading-8 text-foreground/90",
                learningStage === "elementary" ? "text-base" : "text-[15px]",
              )}
            >
              {message.body}
            </p>
          </div>
        </article>
      </ScrollArea>
    </section>
  );
}

function SafeContactsPane() {
  const contacts = useMailStore((s) => s.contacts);
  const grade = useMailStore((s) => s.grade);
  const learningStage = useMailStore((s) => s.learningStage);
  const teacherUnlocked = useMailStore((s) => s.teacherUnlocked);
  const copy = copyForGrade(grade);
  const safe = contacts.filter((c) => c.safety !== "unknown");

  return (
    <section
      className={cn(
        "flex h-full flex-col",
        learningStage === "high"
          ? "bg-card"
          : "bg-gradient-to-br from-safe-soft/40 via-white/40 to-nest-mist/50",
      )}
    >
      <header className="border-b border-border/70 px-6 py-5">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="font-display text-2xl font-extrabold tracking-tight">
            Safe Contacts
          </h2>
          <SafetyBadge level="verified" />
        </div>
        <p className="mt-1 text-sm font-medium text-muted-foreground">
          {copy.safeContactsHint}
          {teacherUnlocked
            ? " Teachers can add or update contacts in Teacher controls."
            : " Ask a teacher to unlock controls if someone should be added."}
        </p>
      </header>
      <ScrollArea className="flex-1">
        <ul className="grid gap-3 p-6 sm:grid-cols-2">
          {safe.map((contact) => (
            <li
              key={contact.id}
              className={cn(
                "flex items-center gap-3 bg-card p-4 animate-fade-up",
                learningStage === "high"
                  ? "rounded-xl border border-border"
                  : "rounded-3xl shadow-panel",
              )}
            >
              <ContactAvatar contact={contact} size="lg" />
              <div className="min-w-0">
                <p className="truncate font-bold text-foreground">
                  {contact.name}
                </p>
                <p className="truncate text-sm font-medium text-muted-foreground">
                  {contact.relationship ?? contact.email}
                </p>
                <div className="mt-2">
                  <SafetyBadge level={contact.safety} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </section>
  );
}

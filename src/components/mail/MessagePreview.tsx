import { ContactAvatar } from "@/components/mail/ContactAvatar";
import { SafetyBadge } from "@/components/mail/SafetyBadge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { copyForGrade } from "@/lib/stageCopy";
import { cn, formatMessageTime } from "@/lib/utils";
import { getContact, useMailStore } from "@/store/mailStore";
import { Reply, Share2 } from "lucide-react";
import { Link } from "react-router-dom";

export function MessagePreview() {
  const messages = useMailStore((s) => s.messages);
  const contacts = useMailStore((s) => s.contacts);
  const selectedMessageId = useMailStore((s) => s.selectedMessageId);
  const folder = useMailStore((s) => s.folder);
  const grade = useMailStore((s) => s.grade);
  const learningStage = useMailStore((s) => s.learningStage);
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
              <SafetyBadge level={contact.safety} />
            </div>
            <p className="mt-1 text-sm font-semibold text-foreground/85">
              {message.folder === "sent" ? (
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
              {formatMessageTime(message.sentAt)} · {contact.email}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/compose">
                <Reply className="size-4" />
                Reply
              </Link>
            </Button>
            <Button variant="ghost" size="icon" aria-label="Forward">
              <Share2 className="size-4" />
            </Button>
          </div>
        </div>

        {contact.safety === "unknown" && (
          <div className="mt-4 rounded-3xl border-2 border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900 animate-fade-up">
            {copy.unknownSenderHint}
          </div>
        )}
      </header>

      <ScrollArea className="flex-1">
        <article className="px-6 py-6">
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

import { ContactAvatar } from "@/components/mail/ContactAvatar";
import { SafetyBadge } from "@/components/mail/SafetyBadge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn, formatMessageTime } from "@/lib/utils";
import { getContact, useMailStore } from "@/store/mailStore";
import { Reply, Share2 } from "lucide-react";
import { Link } from "react-router-dom";

export function MessagePreview() {
  const messages = useMailStore((s) => s.messages);
  const contacts = useMailStore((s) => s.contacts);
  const selectedMessageId = useMailStore((s) => s.selectedMessageId);
  const folder = useMailStore((s) => s.folder);

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
            Pick a message
          </p>
          <p className="mt-2 text-sm font-semibold text-muted-foreground">
            Choose something from the list to read it in a calm, quiet space.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex h-full min-w-0 flex-col bg-gradient-to-br from-white/50 via-white/30 to-nest-mist/50">
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
            <p className="mt-1 text-sm font-bold text-foreground/85">
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
            <p className="text-xs font-bold text-muted-foreground">
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
            <Button variant="ghost" size="icon" aria-label="Share safely">
              <Share2 className="size-4" />
            </Button>
          </div>
        </div>

        {contact.safety === "unknown" && (
          <div
            className={cn(
              "mt-4 rounded-3xl border-2 border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900 animate-fade-up",
            )}
          >
            This sender is not on your Safe Contacts list. Ask a grown-up before
            tapping links or sharing personal information.
          </div>
        )}
      </header>

      <ScrollArea className="flex-1">
        <article className="px-6 py-6">
          <div className="rounded-[1.75rem] bg-card p-6 shadow-panel animate-fade-up">
            <p className="whitespace-pre-wrap text-base font-semibold leading-8 text-foreground/90">
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
  const safe = contacts.filter((c) => c.safety !== "unknown");

  return (
    <section className="flex h-full flex-col bg-gradient-to-br from-safe-soft/40 via-white/40 to-nest-mist/50">
      <header className="border-b border-border/70 px-6 py-5">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="font-display text-2xl font-extrabold tracking-tight">
            Safe Contacts
          </h2>
          <SafetyBadge level="verified" />
        </div>
        <p className="mt-1 text-sm font-semibold text-muted-foreground">
          These are people and places your family has marked as okay to message.
        </p>
      </header>
      <ScrollArea className="flex-1">
        <ul className="grid gap-3 p-6 sm:grid-cols-2">
          {safe.map((contact) => (
            <li
              key={contact.id}
              className="flex items-center gap-3 rounded-3xl bg-card p-4 shadow-panel animate-fade-up"
            >
              <ContactAvatar contact={contact} size="lg" />
              <div className="min-w-0">
                <p className="truncate font-extrabold text-foreground">
                  {contact.name}
                </p>
                <p className="truncate text-sm font-semibold text-muted-foreground">
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

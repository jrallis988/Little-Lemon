import { TipCard } from "@/components/brand/MailboxBrand";
import { MessageListItem } from "@/components/mail/MessageListItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { getContact, useMailStore } from "@/store/mailStore";
import type { ContactCategory, InboxFilter } from "@/types/mail";

const FILTERS: { id: InboxFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "unread", label: "Unread" },
  { id: "teachers", label: "Teachers" },
  { id: "classmates", label: "Classmates" },
  { id: "family", label: "Family" },
  { id: "school", label: "School" },
];

function matchesFilter(
  filter: InboxFilter,
  category: ContactCategory | undefined,
  unread: boolean,
) {
  if (filter === "all") return true;
  if (filter === "unread") return unread;
  if (filter === "teachers") return category === "teacher";
  if (filter === "classmates") return category === "classmate";
  if (filter === "family") return category === "family";
  if (filter === "school") return category === "school";
  return true;
}

export function MessageList() {
  const folder = useMailStore((s) => s.folder);
  const messages = useMailStore((s) => s.messages);
  const contacts = useMailStore((s) => s.contacts);
  const selectedMessageId = useMailStore((s) => s.selectedMessageId);
  const selectMessage = useMailStore((s) => s.selectMessage);
  const markRead = useMailStore((s) => s.markRead);
  const searchQuery = useMailStore((s) => s.searchQuery);
  const inboxFilter = useMailStore((s) => s.inboxFilter);
  const setInboxFilter = useMailStore((s) => s.setInboxFilter);

  const filtered = messages.filter((message) => {
    if (message.folder !== folder) return false;
    const contact = getContact(contacts, message.fromContactId);

    if (
      folder === "inbox" &&
      !matchesFilter(inboxFilter, contact?.category, message.unread)
    ) {
      return false;
    }

    if (!searchQuery.trim()) return true;
    const haystack = [
      message.subject,
      message.preview,
      message.toLabel,
      contact?.name ?? "",
      ...(message.attachments?.map((a) => a.name) ?? []),
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(searchQuery.trim().toLowerCase());
  });

  return (
    <section className="flex h-full min-w-0 flex-col border-r border-border/70 bg-card/70">
      {folder === "inbox" && (
        <div className="flex gap-1.5 overflow-x-auto border-b border-border/60 px-3 py-3">
          {FILTERS.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => setInboxFilter(filter.id)}
              className={cn(
                "shrink-0 rounded-full px-3.5 py-2 text-xs font-extrabold transition-colors",
                inboxFilter === filter.id
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "bg-secondary text-muted-foreground hover:text-foreground",
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>
      )}

      <ScrollArea className="flex-1">
        <div className="space-y-1.5 p-2.5">
          {filtered.length === 0 ? (
            <div className="rounded-3xl bg-white/80 px-4 py-10 text-center">
              <p className="font-display text-lg font-semibold text-foreground">
                No messages here
              </p>
            </div>
          ) : (
            filtered.map((message) => (
              <MessageListItem
                key={message.id}
                message={message}
                contact={getContact(contacts, message.fromContactId)}
                selected={selectedMessageId === message.id}
                onSelect={() => {
                  selectMessage(message.id);
                  if (message.unread) void markRead(message.id);
                }}
              />
            ))
          )}
        </div>
      </ScrollArea>

      {folder === "inbox" && (
        <div className="border-t border-border/60 p-3">
          <TipCard title="Tip of the day">
            Look for the green Verified badge before you reply.
          </TipCard>
        </div>
      )}
    </section>
  );
}

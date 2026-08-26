import { TipCard } from "@/components/brand/MailboxBrand";
import { MessageListItem } from "@/components/mail/MessageListItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { getContact, useMailStore } from "@/store/mailStore";
import type { ContactCategory, FolderId, InboxFilter } from "@/types/mail";

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

function FolderTip({ folder }: { folder: FolderId }) {
  if (folder === "inbox") {
    return (
      <TipCard title="Tip of the day">
        Look for the green Verified badge before you reply.
      </TipCard>
    );
  }
  if (folder === "drafts") {
    return (
      <div className="rounded-[1.6rem] border-[2.5px] border-pending/40 bg-pending-soft p-3 shadow-card">
        <div className="flex items-center gap-3">
          <img
            src="/illust-notebook.png"
            alt=""
            className="h-16 w-16 object-contain"
            draggable={false}
          />
          <div>
            <p className="font-display text-base font-semibold text-amber-900">
              Keep going!
            </p>
            <p className="text-sm font-bold text-amber-950/80">
              Drafts save your ideas until you’re ready to send.
            </p>
          </div>
        </div>
      </div>
    );
  }
  if (folder === "sent") {
    return (
      <div className="rounded-[1.6rem] border-[2.5px] border-primary/25 bg-[#DCE4FF] p-3 shadow-card">
        <div className="flex items-center gap-3">
          <img
            src="/illust-airplane.png"
            alt=""
            className="h-16 w-16 object-contain"
            draggable={false}
          />
          <div>
            <p className="font-display text-base font-semibold text-rail">
              Nice send!
            </p>
            <p className="text-sm font-bold text-rail/80">
              Approved messages land here after teacher review.
            </p>
          </div>
        </div>
      </div>
    );
  }
  if (folder === "pending") {
    return (
      <div className="rounded-[1.6rem] border-[2.5px] border-pending/40 bg-pending-soft p-3 shadow-card">
        <div className="flex items-center gap-3">
          <img
            src="/illust-pending.png"
            alt=""
            className="h-16 w-16 object-contain"
            draggable={false}
          />
          <div>
            <p className="font-display text-base font-semibold text-amber-900">
              Waiting…
            </p>
            <p className="text-sm font-bold text-amber-950/80">
              Your teacher will review this before it sends.
            </p>
          </div>
        </div>
      </div>
    );
  }
  if (folder === "safe-contacts") {
    return null;
  }
  return null;
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

  const tip = <FolderTip folder={folder} />;

  return (
    <section className="flex h-full min-w-0 flex-col border-r-2 border-primary/10 bg-white/75">
      {folder === "inbox" && (
        <div className="flex gap-1.5 overflow-x-auto border-b-2 border-primary/10 px-3 py-3">
          {FILTERS.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => setInboxFilter(filter.id)}
              className={cn(
                "shrink-0 rounded-full px-3.5 py-2 text-xs font-extrabold transition-colors",
                inboxFilter === filter.id
                  ? "bg-rail text-white shadow-soft"
                  : "bg-secondary text-muted-foreground hover:text-foreground",
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>
      )}

      <ScrollArea className="flex-1">
        <div className="space-y-2 p-3">
          {filtered.length === 0 ? (
            <div className="rounded-[1.6rem] border-2 border-dashed border-primary/25 bg-white/90 px-4 py-10 text-center">
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

      {tip ? <div className="border-t-2 border-primary/10 p-3">{tip}</div> : null}
    </section>
  );
}

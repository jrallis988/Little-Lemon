import { MessageListItem } from "@/components/mail/MessageListItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { getContact, useMailStore } from "@/store/mailStore";
import { Search } from "lucide-react";

export function MessageList() {
  const folder = useMailStore((s) => s.folder);
  const messages = useMailStore((s) => s.messages);
  const contacts = useMailStore((s) => s.contacts);
  const selectedMessageId = useMailStore((s) => s.selectedMessageId);
  const selectMessage = useMailStore((s) => s.selectMessage);
  const markRead = useMailStore((s) => s.markRead);
  const searchQuery = useMailStore((s) => s.searchQuery);
  const setSearchQuery = useMailStore((s) => s.setSearchQuery);

  const filtered = messages.filter((message) => {
    if (message.folder !== folder) return false;
    if (!searchQuery.trim()) return true;
    const contact = getContact(contacts, message.fromContactId);
    const haystack = [
      message.subject,
      message.preview,
      message.toLabel,
      contact?.name ?? "",
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(searchQuery.trim().toLowerCase());
  });

  return (
    <section className="flex h-full min-w-0 flex-col border-r border-border/70 bg-white/40">
      <div className="space-y-3 border-b border-border/70 px-4 py-4">
        <div>
          <h2 className="font-display text-xl font-extrabold tracking-tight text-foreground">
            Messages
          </h2>
          <p className="text-sm font-semibold text-muted-foreground">
            {filtered.length} in this folder
          </p>
        </div>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Find a message…"
            className="pl-10"
            aria-label="Search messages"
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-1 p-2">
          {filtered.length === 0 ? (
            <div className="rounded-3xl bg-white/60 px-4 py-10 text-center">
              <p className="font-extrabold text-foreground">No messages here</p>
              <p className="mt-1 text-sm font-semibold text-muted-foreground">
                Try another folder, or write someone a note.
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
    </section>
  );
}

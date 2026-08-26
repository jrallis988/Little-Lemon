import { MessageList } from "@/components/mail/MessageList";
import { MessagePreview } from "@/components/mail/MessagePreview";
import { useMailStore } from "@/store/mailStore";

export function InboxPage() {
  const folder = useMailStore((s) => s.folder);
  const searchQuery = useMailStore((s) => s.searchQuery);

  if (folder === "safe-contacts" || folder === "settings") {
    return (
      <div className="h-full min-h-0">
        <MessagePreview />
      </div>
    );
  }

  if (searchQuery.trim()) {
    return (
      <div className="grid h-full min-h-0 grid-cols-1 lg:grid-cols-[minmax(300px,380px)_minmax(0,1fr)]">
        <MessageList />
        <MessagePreview />
      </div>
    );
  }

  return (
    <div className="grid h-full min-h-0 grid-cols-1 lg:grid-cols-[minmax(300px,380px)_minmax(0,1fr)]">
      <MessageList />
      <MessagePreview />
    </div>
  );
}

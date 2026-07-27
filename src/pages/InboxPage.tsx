import { MessageList } from "@/components/mail/MessageList";
import { MessagePreview } from "@/components/mail/MessagePreview";
import { useMailStore } from "@/store/mailStore";

export function InboxPage() {
  const folder = useMailStore((s) => s.folder);

  if (folder === "safe-contacts") {
    return (
      <div className="h-full min-h-0">
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

import { ContactAvatar } from "@/components/mail/ContactAvatar";
import { Input } from "@/components/ui/input";
import { useMailStore } from "@/store/mailStore";
import { Search } from "lucide-react";

export function TopBar() {
  const folder = useMailStore((s) => s.folder);
  const grade = useMailStore((s) => s.grade);
  const settings = useMailStore((s) => s.settings);
  const searchQuery = useMailStore((s) => s.searchQuery);
  const setSearchQuery = useMailStore((s) => s.setSearchQuery);
  const messages = useMailStore((s) => s.messages);

  const titles: Record<string, string> = {
    inbox: "Inbox",
    drafts: "Drafts",
    pending: "Pending",
    sent: "Sent",
    "safe-contacts": "Safe Contacts",
    settings: "Settings",
  };

  const count =
    folder === "safe-contacts" || folder === "settings"
      ? null
      : messages.filter((m) => m.folder === folder).length;

  return (
    <header className="flex shrink-0 items-center gap-4 border-b border-border/70 bg-card/90 px-5 py-3 backdrop-blur">
      <div className="min-w-0">
        <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground">
          {titles[folder] ?? "Mailbox"}
          {count != null ? (
            <span className="ml-2 rounded-full bg-pending-soft px-2.5 py-0.5 text-sm font-extrabold text-amber-800">
              {count}
            </span>
          ) : null}
        </h1>
      </div>

      <div className="relative mx-auto hidden w-full max-w-md md:block">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search messages, people, attachments…"
          className="h-12 rounded-3xl border-2 border-border/80 bg-white pl-10 text-sm font-bold"
          aria-label="Search"
        />
      </div>

      <div className="ml-auto flex items-center gap-3">
        <span className="hidden rounded-full border-2 border-brand/20 bg-brand-soft px-3.5 py-1.5 text-xs font-extrabold text-brand sm:inline">
          Grade {grade}
        </span>
        <div className="flex items-center gap-2 rounded-full border-2 border-primary/15 bg-white py-1 pl-1 pr-3.5 shadow-card">
          <ContactAvatar
            contact={{
              id: "me",
              name: settings.studentName,
              email: "",
              avatarColor: "#4361EE",
              initials: settings.studentName
                .split(/\s+/)
                .map((p) => p[0])
                .join("")
                .slice(0, 2)
                .toUpperCase(),
              safety: "verified",
            }}
            size="sm"
          />
          <span className="hidden text-sm font-bold text-foreground md:inline">
            {settings.studentName.split(" ")[0]}
          </span>
        </div>
      </div>
    </header>
  );
}

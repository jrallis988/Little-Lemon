import { SafetyBadge } from "@/components/mail/SafetyBadge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FOLDERS } from "@/data/seed";
import { cn } from "@/lib/utils";
import { useMailStore } from "@/store/mailStore";
import type { FolderId } from "@/types/mail";
import {
  FileText,
  Inbox,
  PenSquare,
  Send,
  ShieldCheck,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const icons: Record<FolderId, typeof Inbox> = {
  inbox: Inbox,
  drafts: FileText,
  sent: Send,
  "safe-contacts": ShieldCheck,
};

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const folder = useMailStore((s) => s.folder);
  const setFolder = useMailStore((s) => s.setFolder);
  const messages = useMailStore((s) => s.messages);
  const contacts = useMailStore((s) => s.contacts);

  const unreadInbox = messages.filter(
    (m) => m.folder === "inbox" && m.unread,
  ).length;
  const draftCount = messages.filter((m) => m.folder === "drafts").length;
  const safeCount = contacts.filter((c) => c.safety !== "unknown").length;

  const counts: Partial<Record<FolderId, number>> = {
    inbox: unreadInbox,
    drafts: draftCount,
    "safe-contacts": safeCount,
  };

  return (
    <aside className="flex h-full w-[260px] shrink-0 flex-col border-r border-border/70 bg-white/55 backdrop-blur-sm">
      <div className="px-5 pb-2 pt-6">
        <Link to="/" className="group block" onClick={() => setFolder("inbox")}>
          <p className="font-display text-3xl font-extrabold tracking-tight text-primary transition-transform group-hover:translate-x-0.5">
            MailNest
          </p>
          <p className="mt-1 text-sm font-bold text-muted-foreground">
            Your cozy mailbox
          </p>
        </Link>
      </div>

      <div className="px-4 py-4">
        <Button asChild variant="coral" size="lg" className="w-full justify-start gap-3">
          <Link to="/compose">
            <PenSquare className="size-5" />
            Write a message
          </Link>
        </Button>
      </div>

      <nav className="flex-1 space-y-1 px-3" aria-label="Mail folders">
        {FOLDERS.map((item) => {
          const Icon = icons[item.id];
          const active =
            location.pathname === "/" && folder === item.id;
          const count = counts[item.id];

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setFolder(item.id);
                if (location.pathname !== "/") navigate("/");
              }}
              className={cn(
                "flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition-all",
                active
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "text-foreground/90 hover:bg-white/80",
              )}
            >
              <Icon className="size-5 shrink-0" />
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-extrabold">{item.label}</span>
                <span
                  className={cn(
                    "block truncate text-xs font-semibold",
                    active ? "text-primary-foreground/80" : "text-muted-foreground",
                  )}
                >
                  {item.description}
                </span>
              </span>
              {typeof count === "number" && count > 0 && (
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-xs font-extrabold",
                    active
                      ? "bg-white/20 text-primary-foreground"
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto space-y-3 p-4">
        <Separator />
        <div className="rounded-3xl bg-safe-soft/80 p-4">
          <div className="flex items-center gap-2">
            <SafetyBadge level="verified" />
          </div>
          <p className="mt-2 text-sm font-bold leading-snug text-safe">
            Verified folders and safe contacts help you spot trustworthy mail.
          </p>
        </div>
      </div>
    </aside>
  );
}

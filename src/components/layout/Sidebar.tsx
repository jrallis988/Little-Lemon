import { MailboxLogo } from "@/components/brand/MailboxBrand";
import { TeacherPanel } from "@/components/teacher/TeacherPanel";
import { Button } from "@/components/ui/button";
import { FOLDERS } from "@/data/seed";
import { cn } from "@/lib/utils";
import { useMailStore } from "@/store/mailStore";
import type { FolderId } from "@/types/mail";
import {
  Clock3,
  FileText,
  Inbox,
  PenSquare,
  Send,
  Settings,
  ShieldCheck,
  GraduationCap,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const icons: Record<Exclude<FolderId, "settings">, typeof Inbox> = {
  inbox: Inbox,
  drafts: FileText,
  pending: Clock3,
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
  const [teacherOpen, setTeacherOpen] = useState(false);

  const unreadInbox = messages.filter(
    (m) => m.folder === "inbox" && m.unread,
  ).length;
  const draftCount = messages.filter((m) => m.folder === "drafts").length;
  const pendingCount = messages.filter((m) => m.folder === "pending").length;
  const safeCount = contacts.filter((c) => c.safety !== "unknown").length;

  const counts: Partial<Record<FolderId, number>> = {
    inbox: unreadInbox,
    drafts: draftCount,
    pending: pendingCount,
    "safe-contacts": safeCount,
  };

  function goFolder(id: FolderId) {
    setFolder(id);
    if (location.pathname !== "/") navigate("/");
  }

  return (
    <>
      <aside className="flex h-full w-[232px] shrink-0 flex-col border-r border-border/70 bg-card">
        <div className="flex items-center gap-2.5 px-5 pb-3 pt-6">
          <MailboxLogo size={36} className="animate-float" />
          <Link
            to="/"
            className="font-display text-xl font-extrabold tracking-tight text-brand"
            onClick={() => setFolder("inbox")}
          >
            mailbox
          </Link>
        </div>

        <div className="space-y-2 px-4 pb-3 pt-2">
          <Button
            asChild
            variant="default"
            className="w-full justify-start gap-3 rounded-2xl shadow-soft"
          >
            <Link to="/compose">
              <PenSquare className="size-5" />
              Compose
            </Link>
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full justify-start gap-3 rounded-2xl border-brand/20 bg-brand-soft/60 text-brand hover:bg-brand-soft"
            onClick={() => setTeacherOpen(true)}
          >
            <GraduationCap className="size-5" />
            Teacher
          </Button>
        </div>

        <nav
          className="flex-1 space-y-1 overflow-y-auto px-3 py-2"
          aria-label="Mail folders"
        >
          {FOLDERS.map((item) => {
            const Icon = icons[item.id as Exclude<FolderId, "settings">];
            const active =
              location.pathname === "/" &&
              folder === item.id &&
              folder !== "settings";
            const count = counts[item.id];

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => goFolder(item.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-all",
                  active
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "text-foreground/85 hover:bg-secondary",
                )}
              >
                <Icon className="size-5 shrink-0" />
                <span className="min-w-0 flex-1 text-sm font-bold">
                  {item.label}
                </span>
                {typeof count === "number" && count > 0 && (
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-xs font-extrabold",
                      active
                        ? "bg-white/20 text-primary-foreground"
                        : "bg-primary/10 text-primary",
                    )}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-3">
          <button
            type="button"
            onClick={() => goFolder("settings")}
            className={cn(
              "flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm font-bold transition-all",
              folder === "settings"
                ? "bg-primary text-primary-foreground shadow-soft"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground",
            )}
          >
            <Settings className="size-5" />
            Settings
          </button>
        </div>
      </aside>

      {teacherOpen && <TeacherPanel onClose={() => setTeacherOpen(false)} />}
    </>
  );
}

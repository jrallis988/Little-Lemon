import { MailboxLogo } from "@/components/brand/MailboxBrand";
import { TeacherPanel } from "@/components/teacher/TeacherPanel";
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
      <aside className="relative flex h-full w-[256px] shrink-0 flex-col overflow-hidden bg-[#5850EC] text-white shadow-[8px_0_28px_-18px_rgba(60,70,200,0.55)]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 10%, rgba(255,255,255,0.35) 0 2px, transparent 3px), radial-gradient(circle at 80% 30%, rgba(255,220,120,0.35) 0 2px, transparent 3px), radial-gradient(circle at 30% 85%, rgba(255,255,255,0.25) 0 2px, transparent 3px)",
          }}
        />

        <div className="relative z-10 flex items-center gap-2.5 px-5 pb-4 pt-6">
          <MailboxLogo size={48} className="animate-float drop-shadow-md" />
          <Link
            to="/"
            className="font-display text-[1.7rem] font-semibold tracking-tight text-white"
            onClick={() => setFolder("inbox")}
          >
            mailbox
          </Link>
        </div>

        <div className="relative z-10 space-y-2.5 px-4 pb-4">
          <Link
            to="/compose"
            className="flex h-12 w-full items-center justify-start gap-3 rounded-3xl bg-white px-4 text-base font-extrabold text-[#5850EC] shadow-soft transition hover:brightness-105 active:translate-y-px"
          >
            <PenSquare className="size-5" />
            Compose
          </Link>
          <button
            type="button"
            className="flex h-12 w-full items-center justify-start gap-3 rounded-3xl border-[2.5px] border-white/35 bg-white/10 px-4 text-base font-extrabold text-white backdrop-blur transition hover:bg-white/18"
            onClick={() => setTeacherOpen(true)}
          >
            <GraduationCap className="size-5" />
            Teacher
          </button>
        </div>

        <nav
          className="relative z-10 flex-1 space-y-1.5 overflow-y-auto px-3 py-1"
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
                  "flex w-full items-center gap-3 rounded-3xl px-3.5 py-3 text-left transition-all",
                  active
                    ? "bg-white text-[#5850EC] shadow-soft"
                    : "text-white/90 hover:bg-white/12",
                )}
              >
                <span
                  className={cn(
                    "flex size-9 items-center justify-center rounded-2xl",
                    active ? "bg-[#5850EC]/10" : "bg-white/12",
                  )}
                >
                  <Icon className="size-5 shrink-0" />
                </span>
                <span className="min-w-0 flex-1 text-[15px] font-extrabold">
                  {item.label}
                </span>
                {typeof count === "number" && count > 0 && (
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-0.5 text-xs font-extrabold",
                      active
                        ? "bg-pending text-amber-950"
                        : "bg-pending text-amber-950",
                    )}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="relative z-10 p-3 pb-4">
          <button
            type="button"
            onClick={() => goFolder("settings")}
            className={cn(
              "flex w-full items-center gap-3 rounded-3xl px-3.5 py-3 text-left text-[15px] font-extrabold transition-all",
              folder === "settings"
                ? "bg-white text-[#5850EC] shadow-soft"
                : "text-white/85 hover:bg-white/12",
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

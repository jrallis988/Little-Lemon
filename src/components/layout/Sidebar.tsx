import { TeacherPanel } from "@/components/teacher/TeacherPanel";
import { Button } from "@/components/ui/button";
import { FOLDERS } from "@/data/seed";
import { copyForGrade } from "@/lib/stageCopy";
import { cn } from "@/lib/utils";
import { useMailStore } from "@/store/mailStore";
import type { FolderId, GradeLevel } from "@/types/mail";
import {
  Clock3,
  FileText,
  Inbox,
  PenSquare,
  Send,
  ShieldCheck,
  GraduationCap,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const icons: Record<FolderId, typeof Inbox> = {
  inbox: Inbox,
  drafts: FileText,
  pending: Clock3,
  sent: Send,
  "safe-contacts": ShieldCheck,
};

const GRADE_GROUPS: { label: string; grades: GradeLevel[] }[] = [
  { label: "1–5", grades: [1, 2, 3, 4, 5] },
  { label: "6–8", grades: [6, 7, 8] },
  { label: "9–12", grades: [9, 10, 11, 12] },
];

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const folder = useMailStore((s) => s.folder);
  const setFolder = useMailStore((s) => s.setFolder);
  const messages = useMailStore((s) => s.messages);
  const contacts = useMailStore((s) => s.contacts);
  const grade = useMailStore((s) => s.grade);
  const learningStage = useMailStore((s) => s.learningStage);
  const setGrade = useMailStore((s) => s.setGrade);
  const copy = copyForGrade(grade);
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

  return (
    <>
      <aside className="flex h-full w-[280px] shrink-0 flex-col border-r border-border/80 bg-card">
        <div className="px-5 pb-2 pt-6">
          <Link
            to="/"
            className="group block"
            onClick={() => setFolder("inbox")}
          >
            <p
              className={cn(
                "font-serif font-semibold tracking-tight text-primary",
                learningStage === "high" ? "text-2xl" : "text-[1.65rem]",
              )}
            >
              Mailbox
            </p>
          </Link>
        </div>

        <div className="space-y-2 px-4 py-4">
          <Button
            asChild
            variant="default"
            size={learningStage === "elementary" ? "lg" : "default"}
            className="w-full justify-start gap-3"
          >
            <Link to="/compose">
              <PenSquare className="size-5" />
              {copy.composeCta}
            </Link>
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full justify-start gap-3"
            onClick={() => setTeacherOpen(true)}
          >
            <GraduationCap className="size-5" />
            Teacher
          </Button>
        </div>

        <nav
          className="flex-1 space-y-1 overflow-y-auto px-3"
          aria-label="Mail folders"
        >
          {FOLDERS.map((item) => {
            const Icon = icons[item.id];
            const active = location.pathname === "/" && folder === item.id;
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
                  "flex w-full items-center gap-3 rounded-xl px-3 text-left transition-all",
                  learningStage === "elementary" ? "py-3" : "py-2.5",
                  active
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "text-foreground/90 hover:bg-white/80",
                )}
              >
                <Icon className="size-5 shrink-0" />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold">{item.label}</span>
                  {copy.showFolderDescriptions && (
                    <span
                      className={cn(
                        "block truncate text-xs font-medium",
                        active
                          ? "text-primary-foreground/80"
                          : "text-muted-foreground",
                      )}
                    >
                      {item.description}
                    </span>
                  )}
                </span>
                {typeof count === "number" && count > 0 && (
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-xs font-bold",
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
          <div className="space-y-2">
            <div className="flex items-baseline justify-between px-1">
              <p className="text-xs font-semibold text-muted-foreground">
                Grade {grade}
              </p>
            </div>

            <div className="space-y-2 rounded-2xl bg-muted/80 p-2">
              {GRADE_GROUPS.map((group) => (
                <div key={group.label} className="space-y-1">
                  <p className="px-1 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                    {group.label}
                  </p>
                  <div
                    className={cn(
                      "grid gap-1",
                      group.grades.length === 3
                        ? "grid-cols-3"
                        : group.grades.length === 4
                          ? "grid-cols-4"
                          : "grid-cols-5",
                    )}
                  >
                    {group.grades.map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setGrade(value)}
                        className={cn(
                          "rounded-xl py-2 text-xs font-bold transition-colors",
                          grade === value
                            ? "bg-card text-foreground shadow-sm ring-1 ring-primary/25"
                            : "text-muted-foreground hover:bg-card/70 hover:text-foreground",
                        )}
                        aria-pressed={grade === value}
                        aria-label={`Grade ${value}`}
                        title={`Grade ${value}`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {teacherOpen && <TeacherPanel onClose={() => setTeacherOpen(false)} />}
    </>
  );
}

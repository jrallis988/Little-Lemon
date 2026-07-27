import { SafetyBadge } from "@/components/mail/SafetyBadge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FOLDERS, LEARNING_STAGE_LABELS } from "@/data/seed";
import { STAGE_COPY } from "@/lib/stageCopy";
import { cn } from "@/lib/utils";
import { useMailStore } from "@/store/mailStore";
import type { FolderId, LearningStage } from "@/types/mail";
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

const stages: LearningStage[] = ["elementary", "middle", "high"];

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const folder = useMailStore((s) => s.folder);
  const setFolder = useMailStore((s) => s.setFolder);
  const messages = useMailStore((s) => s.messages);
  const contacts = useMailStore((s) => s.contacts);
  const learningStage = useMailStore((s) => s.learningStage);
  const setLearningStage = useMailStore((s) => s.setLearningStage);
  const copy = STAGE_COPY[learningStage];

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
    <aside
      className={cn(
        "flex h-full shrink-0 flex-col border-r border-border/70 bg-white/70 backdrop-blur-sm",
        learningStage === "high" ? "w-[232px]" : "w-[260px]",
      )}
    >
      <div className="px-5 pb-2 pt-6">
        <Link to="/" className="group block" onClick={() => setFolder("inbox")}>
          <p
            className={cn(
              "font-display font-extrabold tracking-tight text-primary transition-transform group-hover:translate-x-0.5",
              learningStage === "high" ? "text-2xl" : "text-3xl",
            )}
          >
            Mailbox
          </p>
          <p className="mt-1 text-sm font-semibold text-muted-foreground">
            {copy.tagline}
          </p>
        </Link>
      </div>

      <div className="px-4 py-4">
        <Button
          asChild
          variant={learningStage === "high" ? "default" : "coral"}
          size={learningStage === "elementary" ? "lg" : "default"}
          className="w-full justify-start gap-3"
        >
          <Link to="/compose">
            <PenSquare className="size-5" />
            {copy.composeCta}
          </Link>
        </Button>
      </div>

      <nav className="flex-1 space-y-1 px-3" aria-label="Mail folders">
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
                "flex w-full items-center gap-3 rounded-2xl px-3 text-left transition-all",
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
          <p className="px-1 text-xs font-bold uppercase tracking-wide text-muted-foreground">
            Learning stage
          </p>
          <div className="grid grid-cols-3 gap-1 rounded-2xl bg-muted/80 p-1">
            {stages.map((stage) => (
              <button
                key={stage}
                type="button"
                onClick={() => setLearningStage(stage)}
                className={cn(
                  "rounded-xl px-1 py-2 text-[11px] font-bold transition-colors",
                  learningStage === stage
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
                aria-pressed={learningStage === stage}
                title={LEARNING_STAGE_LABELS[stage]}
              >
                {stage === "elementary"
                  ? "1–5"
                  : stage === "middle"
                    ? "6–8"
                    : "9–12"}
              </button>
            ))}
          </div>
        </div>
        <Separator />
        <div
          className={cn(
            "rounded-3xl p-4",
            learningStage === "high" ? "bg-muted/70" : "bg-safe-soft/80",
          )}
        >
          <div className="flex items-center gap-2">
            <SafetyBadge level="verified" />
          </div>
          <p
            className={cn(
              "mt-2 text-sm font-semibold leading-snug",
              learningStage === "high" ? "text-foreground/80" : "text-safe",
            )}
          >
            {copy.safetyFooter}
          </p>
        </div>
      </div>
    </aside>
  );
}

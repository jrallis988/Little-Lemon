import { FormEvent, useEffect, useMemo, useState } from "react";
import { Loader2, Sparkles, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MILO_NAME,
  MILO_SHORT_NAME,
  MILO_TAGLINE,
} from "@/brand/identity";
import { askMilo, isMiloConfigured } from "@/services/miloAi";
import { MILO_QUICK_ACTIONS, useMiloStore } from "@/stores/miloStore";
import { useNavigationStore } from "@/stores/navigationStore";
import { useProfileStore } from "@/stores/profileStore";
import { cn } from "@/lib/utils";

type Props = {
  open: boolean;
  onClose: () => void;
  className?: string;
};

export function AskMiloPanel({ open, onClose, className }: Props) {
  const query = useNavigationStore((s) => s.query);
  const academic = useNavigationStore((s) => s.academicResponse);
  const article = useNavigationStore((s) => s.activeArticle);
  const grade = useProfileStore((s) => s.getActiveProfile()?.grade);
  const ensureThread = useMiloStore((s) => s.ensureThread);
  const appendMessage = useMiloStore((s) => s.appendMessage);
  const clearThread = useMiloStore((s) => s.clearThread);
  const threads = useMiloStore((s) => s.threads);
  const activeThreadId = useMiloStore((s) => s.activeThreadId);

  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [live, setLive] = useState(false);

  const topic = article?.title || academic?.query || query || "General help";
  const threadId = useMemo(() => threadKey(topic), [topic]);
  const messages = threads[threadId]?.messages ?? [];

  useEffect(() => {
    if (!open) return;
    ensureThread(topic);
  }, [open, topic, ensureThread]);

  if (!open) return null;

  const runPrompt = async (question: string) => {
    const trimmed = question.trim();
    if (!trimmed || loading) return;
    const id = ensureThread(topic);
    appendMessage(id, { role: "user", content: trimmed });
    setLoading(true);
    const history = useMiloStore.getState().threads[id]?.messages ?? [];
    const result = await askMilo(trimmed, {
      query: academic?.query || query,
      academic,
      article,
      grade,
      history: history.slice(0, -1),
    });
    appendMessage(id, { role: "assistant", content: result.reply });
    setLive(result.live);
    setPrompt("");
    setLoading(false);
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await runPrompt(prompt);
  };

  return (
    <aside
      className={cn(
        "fixed bottom-20 right-4 z-40 flex w-[22rem] max-w-[calc(100vw-2rem)] flex-col rounded-3xl border border-white/70 bg-white/95 p-4 shadow-glass md:bottom-6 md:top-28",
        className,
      )}
      aria-label={MILO_NAME}
    >
      <header className="flex items-start justify-between gap-3 border-b border-border/70 pb-3">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-navy text-foam">
            <Sparkles className="h-4 w-4" />
          </span>
          <div>
            <h2 className="font-display text-lg font-semibold text-navy">
              {MILO_NAME}
            </h2>
            <p className="text-xs text-slate">{MILO_TAGLINE}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Clear conversation"
            onClick={() => activeThreadId && clearThread(activeThreadId)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label={`Close ${MILO_NAME}`}
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <p className="mt-3 text-[11px] font-medium text-slate">
        Topic: {topic}
        {" · "}
        {isMiloConfigured()
          ? live
            ? "Live tutor"
            : "Live tutor ready"
          : "Offline tutor mode"}
      </p>

      <div className="mt-2 flex flex-wrap gap-1.5">
        {MILO_QUICK_ACTIONS.map((action) => (
          <button
            key={action.id}
            type="button"
            disabled={loading}
            onClick={() => void runPrompt(action.prompt)}
            className="rounded-full bg-navy-mist px-2.5 py-1 text-[11px] font-semibold text-navy hover:bg-secondary disabled:opacity-50"
          >
            {action.label}
          </button>
        ))}
      </div>

      <div className="mt-3 max-h-56 flex-1 space-y-2 overflow-auto rounded-2xl bg-cream/70 p-3 text-sm leading-relaxed text-slate">
        {messages.length === 0 && (
          <p>
            {MILO_SHORT_NAME} can explain “{academic?.query || topic}”, quiz
            vocabulary, compare sources, or help you cite — without doing the
            assignment for you.
          </p>
        )}
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={cn(
              "rounded-xl px-3 py-2 whitespace-pre-wrap",
              message.role === "user"
                ? "bg-white text-navy"
                : "bg-navy-mist/70 text-slate-deep",
            )}
          >
            <p className="mb-1 text-[10px] font-bold uppercase tracking-wide text-slate">
              {message.role === "user" ? "You" : MILO_SHORT_NAME}
            </p>
            {message.content}
          </div>
        ))}
      </div>

      <form className="mt-3 space-y-2" onSubmit={onSubmit}>
        <Input
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder="Ask Milo about this topic…"
          aria-label={`${MILO_NAME} prompt`}
          disabled={loading}
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Thinking…
            </>
          ) : (
            MILO_NAME
          )}
        </Button>
      </form>
    </aside>
  );
}

function threadKey(topic: string): string {
  return topic.trim().toLowerCase() || "general";
}

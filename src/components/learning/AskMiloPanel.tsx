import { FormEvent, useEffect, useMemo, useState } from "react";
import { Loader2, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MILO_NAME,
  MILO_SHORT_NAME,
  MILO_TAGLINE,
} from "@/brand/identity";
import { askMilo, isMiloConfigured } from "@/services/miloAi";
import { useNavigationStore } from "@/stores/navigationStore";
import { useProfileStore } from "@/stores/profileStore";
import { cn } from "@/lib/utils";

type Props = {
  open: boolean;
  onClose: () => void;
  className?: string;
};

/**
 * Ask Milo — Surf’s AI learning aide (live model when configured).
 */
export function AskMiloPanel({ open, onClose, className }: Props) {
  const query = useNavigationStore((s) => s.query);
  const academic = useNavigationStore((s) => s.academicResponse);
  const article = useNavigationStore((s) => s.activeArticle);
  const grade = useProfileStore((s) => s.getActiveProfile()?.grade);
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [live, setLive] = useState(false);

  const starter = useMemo(() => {
    if (academic?.keyVocabulary?.length) {
      return `Explain “${academic.keyVocabulary[0]}” in simpler words`;
    }
    if (query) return `Help me understand ${query}`;
    return "";
  }, [academic, query]);

  useEffect(() => {
    if (!open) return;
    setReply(null);
    setLive(false);
  }, [open, query, academic?.query]);

  if (!open) return null;

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const question = (prompt.trim() || starter).trim();
    if (!question || loading) return;
    setLoading(true);
    const result = await askMilo(question, {
      query,
      academic,
      article,
      grade,
    });
    setReply(result.reply);
    setLive(result.live);
    setPrompt("");
    setLoading(false);
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
        <Button
          variant="ghost"
          size="icon"
          aria-label={`Close ${MILO_NAME}`}
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </header>

      <p className="mt-3 text-[11px] font-medium text-slate">
        {isMiloConfigured()
          ? live
            ? "Live tutor connected"
            : "Live tutor ready"
          : "Offline tutor mode — add VITE_SURF_AI_API_KEY for live answers"}
      </p>

      <form className="mt-2 space-y-2" onSubmit={onSubmit}>
        <Input
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder={starter || "Ask Milo about this topic…"}
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

      <div className="mt-4 flex-1 overflow-auto rounded-2xl bg-cream/70 p-3 text-sm leading-relaxed text-slate whitespace-pre-wrap">
        {reply ??
          (academic
            ? `${MILO_SHORT_NAME} can explain “${academic.query}”, unpack vocabulary, or help you compare the sources on this page.`
            : "Search a topic first, then ask me to explain it, define a word, or point you to the best citation.")}
      </div>
    </aside>
  );
}

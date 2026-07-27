import { useMemo, useState } from "react";
import { Bot, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AI_ACTIONS, runAiAction } from "@/services/aiAssistant";
import { pageContextFromTab } from "@/services/browserBridge";
import type { AiActionResult, BrowserTab } from "@/types";

type Props = {
  activeTab: BrowserTab | null;
  onClose: () => void;
};

export function AiAssistantPanel({ activeTab, onClose }: Props) {
  const context = useMemo(() => pageContextFromTab(activeTab), [activeTab]);
  const [result, setResult] = useState<AiActionResult | null>(null);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  return (
    <aside className="fixed bottom-4 right-4 top-32 z-40 flex w-[22rem] max-w-[calc(100vw-2rem)] flex-col rounded-3xl border border-white/70 bg-white/95 p-4 shadow-glass">
      <header className="flex items-start justify-between gap-3 border-b border-border/70 pb-3">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-navy text-foam">
            <Bot className="h-4 w-4" />
          </span>
          <div>
            <h2 className="font-display text-lg font-semibold text-navy">
              Surf AI
            </h2>
            <p className="text-xs text-slate">
              Uses current page context when configured.
            </p>
          </div>
        </div>
        <Button variant="ghost" size="icon" aria-label="Close AI panel" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </header>

      <div className="mt-4 rounded-2xl bg-cream/70 p-3 text-xs text-slate">
        {context ? (
          <>
            <p className="font-semibold text-navy">{context.title}</p>
            <p className="mt-1 break-all">{context.url}</p>
          </>
        ) : (
          "Open a web page to give Surf AI page context."
        )}
      </div>

      <div className="mt-4 space-y-2">
        {AI_ACTIONS.map((action) => (
          <Button
            key={action.id}
            variant="outline"
            className="h-auto w-full justify-start rounded-2xl px-3 py-3 text-left"
            onClick={async () => {
              setLoadingAction(action.id);
              setResult(await runAiAction(action, context));
              setLoadingAction(null);
            }}
          >
            <span>
              <span className="flex items-center gap-2 text-sm font-semibold text-navy">
                {loadingAction === action.id && (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                )}
                {action.label}
              </span>
              <span className="mt-1 block text-xs text-slate">
                {action.description}
              </span>
            </span>
          </Button>
        ))}
      </div>

      {result && (
        <section className="mt-4 rounded-2xl border border-border bg-white p-3 text-sm">
          <p className="font-semibold text-navy">{result.title}</p>
          <p className="mt-2 leading-relaxed text-slate">{result.message}</p>
        </section>
      )}
    </aside>
  );
}

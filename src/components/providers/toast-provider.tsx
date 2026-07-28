"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

export type ToastTone = "default" | "success" | "error";

interface ToastItem {
  id: string;
  title: string;
  description?: string;
  tone: ToastTone;
}

interface ToastContextValue {
  toast: (input: {
    title: string;
    description?: string;
    tone?: ToastTone;
  }) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const toast = useCallback(
    (input: { title: string; description?: string; tone?: ToastTone }) => {
      const id = `t_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
      setItems((prev) => [
        ...prev,
        {
          id,
          title: input.title,
          description: input.description,
          tone: input.tone ?? "default",
        },
      ]);
      window.setTimeout(() => {
        setItems((prev) => prev.filter((t) => t.id !== id));
      }, 4200);
    },
    []
  );

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-[min(100%-2rem,22rem)] flex-col gap-2"
        aria-live="polite"
      >
        {items.map((item) => (
          <div
            key={item.id}
            className={cn(
              "pointer-events-auto rounded-xl border px-4 py-3 shadow-lg",
              item.tone === "error" &&
                "border-destructive/40 bg-destructive text-destructive-foreground",
              item.tone === "success" &&
                "border-savings/40 bg-savings text-savings-foreground",
              item.tone === "default" &&
                "border-border bg-card text-foreground"
            )}
            role="status"
          >
            <p className="text-sm font-semibold">{item.title}</p>
            {item.description && (
              <p className="mt-0.5 text-sm opacity-90">{item.description}</p>
            )}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return ctx;
}

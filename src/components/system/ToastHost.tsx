import { Link } from "react-router-dom"
import { X } from "lucide-react"
import { useToastStore } from "@/stores/toastStore"

export function ToastHost() {
  const toasts = useToastStore((s) => s.toasts)
  const dismiss = useToastStore((s) => s.dismiss)

  if (toasts.length === 0) return null

  return (
    <div
      className="pointer-events-none fixed bottom-24 left-4 z-[70] flex w-[min(100%-2rem,22rem)] flex-col gap-2 sm:left-auto sm:right-6"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto animate-fade-in rounded-md border border-border bg-surface p-3 shadow-drawer"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold">{toast.title}</p>
              {toast.description && (
                <p className="mt-0.5 text-xs text-muted-foreground">{toast.description}</p>
              )}
              {toast.href && (
                <Link
                  to={toast.href}
                  className="mt-2 inline-block text-xs font-semibold text-navy underline"
                  onClick={() => dismiss(toast.id)}
                >
                  {toast.hrefLabel ?? "View"}
                </Link>
              )}
            </div>
            <button
              type="button"
              className="rounded p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
              aria-label="Dismiss"
              onClick={() => dismiss(toast.id)}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

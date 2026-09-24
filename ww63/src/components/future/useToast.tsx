import { useCallback, useState } from "react";
import { Toast, type ToastTone } from "./PrototypePolish";

export function useToast() {
  const [toast, setToast] = useState<{ message: string; tone?: ToastTone } | null>(null);

  const showToast = useCallback((message: string, tone: ToastTone = "success") => {
    setToast({ message, tone });
  }, []);

  const dismissToast = useCallback(() => setToast(null), []);

  return {
    toast,
    showToast,
    dismissToast,
    toastNode: (
      <Toast
        message={toast?.message ?? null}
        tone={toast?.tone}
        onDismiss={dismissToast}
      />
    ),
  };
}

"use client";

import { useEffect, useRef } from "react";
import { focusFirst, trapTabKey } from "@/lib/a11y";

/**
 * Traps focus inside `ref` while `active` is true.
 * Restores focus to the previously focused element on deactivate.
 */
export function useFocusTrap(
  active: boolean,
  containerRef: React.RefObject<HTMLElement | null>,
  options?: { restoreFocus?: boolean; initialFocus?: boolean },
) {
  const restoreFocus = options?.restoreFocus ?? true;
  const initialFocus = options?.initialFocus ?? true;
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!active) return;
    const container = containerRef.current;
    if (!container) return;

    previousFocus.current = document.activeElement as HTMLElement | null;

    if (initialFocus) {
      const t = window.setTimeout(() => focusFirst(container), 20);
      const onKeyDown = (e: KeyboardEvent) => trapTabKey(e, container);
      document.addEventListener("keydown", onKeyDown);

      return () => {
        window.clearTimeout(t);
        document.removeEventListener("keydown", onKeyDown);
        if (restoreFocus) {
          previousFocus.current?.focus?.();
        }
      };
    }

    const onKeyDown = (e: KeyboardEvent) => trapTabKey(e, container);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      if (restoreFocus) {
        previousFocus.current?.focus?.();
      }
    };
  }, [active, containerRef, initialFocus, restoreFocus]);
}

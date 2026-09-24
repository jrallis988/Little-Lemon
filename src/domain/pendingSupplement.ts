import type { Supplement } from './models';

/** Holds a supplement across confirm/analyzing when label review edits the formula. */
let pending: Supplement | null = null;

export function setPendingSupplement(supplement: Supplement): void {
  pending = supplement;
}

export function peekPendingSupplement(id?: string): Supplement | null {
  if (!pending) return null;
  if (id && pending.id !== id) return null;
  return pending;
}

export function clearPendingSupplement(): void {
  pending = null;
}

"use client";

/**
 * Legacy cart hydrator — intentionally a no-op.
 * Limited v1 does not use ecommerce checkout; root layout no longer mounts this.
 * Kept so older imports do not crash if referenced during a full-mode revival.
 */
export function CartHydrator() {
  return null;
}

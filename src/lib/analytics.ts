type AnalyticsValue = string | number | boolean | null | undefined;

export type AnalyticsEvent = Record<string, AnalyticsValue>;

/**
 * Lightweight analytics boundary. It remains a no-op until an analytics ID is
 * configured, and can later be replaced without changing callers.
 */
export function trackEvent(name: string, properties: AnalyticsEvent = {}) {
  if (!process.env.NEXT_PUBLIC_ANALYTICS_ID || typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent("bch:analytics", {
      detail: {
        analyticsId: process.env.NEXT_PUBLIC_ANALYTICS_ID,
        name,
        properties,
      },
    }),
  );
}

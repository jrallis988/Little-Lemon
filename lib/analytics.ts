export type AnalyticsPayload = Record<
  string,
  string | number | boolean | null | undefined
>;

export type FunnelEvent =
  | "club_search"
  | "club_select"
  | "plan_select"
  | "join_step"
  | "join_complete"
  | "app_banner_click";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

/** Lightweight acquisition funnel analytics (dataLayer + console in dev). */
export function track(event: FunnelEvent, payload: AnalyticsPayload = {}) {
  const entry = {
    event,
    ...payload,
    ts: Date.now(),
  };

  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(entry);
    if (process.env.NODE_ENV !== "production") {
      console.info("[analytics]", entry);
    }
  }
}

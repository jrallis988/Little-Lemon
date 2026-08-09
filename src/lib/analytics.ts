type AnalyticsEvent = {
  name: string
  props?: Record<string, string | number | boolean | undefined>
  at: number
}

const STORAGE_KEY = "marshalls-analytics"
const MAX_EVENTS = 200

function readEvents(): AnalyticsEvent[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as AnalyticsEvent[]) : []
  } catch {
    return []
  }
}

function writeEvents(events: AnalyticsEvent[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events.slice(-MAX_EVENTS)))
  } catch {
    /* ignore quota */
  }
}

export function track(
  name: string,
  props?: Record<string, string | number | boolean | undefined>,
) {
  const event: AnalyticsEvent = { name, props, at: Date.now() }
  const next = [...readEvents(), event]
  writeEvents(next)
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.info("[analytics]", name, props ?? {})
  }
}

export function getAnalyticsEvents() {
  return readEvents()
}

export function clearAnalytics() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    /* ignore */
  }
}

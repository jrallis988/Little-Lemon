export function formatBytes(size: number): string {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${Math.round(size / 1024)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export function replySubject(subject: string): string {
  const trimmed = subject.trim();
  if (/^re:/i.test(trimmed)) return trimmed;
  return `Re: ${trimmed || "(No subject)"}`;
}

export function wrapSelection(
  value: string,
  start: number,
  end: number,
  before: string,
  after: string,
): { value: string; selectionStart: number; selectionEnd: number } {
  const selected = value.slice(start, end) || "text";
  const next = `${value.slice(0, start)}${before}${selected}${after}${value.slice(end)}`;
  const selectionStart = start + before.length;
  const selectionEnd = selectionStart + selected.length;
  return { value: next, selectionStart, selectionEnd };
}

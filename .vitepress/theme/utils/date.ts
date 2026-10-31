const DATE_ONLY = /^(\d{4})-(\d{2})-(\d{2})$/;

/**
 * Frontmatter dates may arrive as Date objects, ISO strings or `YYYY-MM-DD`.
 * The blog plugin treats a date without a time as the start of that day, so
 * we normalise to an ISO string and only show a time when one was provided.
 */
export function toDate(value: unknown): Date | null {
  if (value instanceof Date)
    return Number.isNaN(value.getTime()) ? null : value;
  if (typeof value !== "string" && typeof value !== "number") return null;
  const text = String(value).trim();
  if (!text) return null;
  const date = new Date(text);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function hasTime(value: unknown): boolean {
  if (value instanceof Date) return true;
  if (typeof value !== "string") return false;
  return !DATE_ONLY.test(value.trim()) && /\d{1,2}:\d{2}/.test(value);
}

export function formatPostDate(value: unknown, withTime = false): string {
  const date = toDate(value);
  if (!date) return "";
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Shanghai",
  };
  if (withTime && hasTime(value)) {
    options.hour = "2-digit";
    options.minute = "2-digit";
  }
  return new Intl.DateTimeFormat("zh-CN", options).format(date);
}

export function toIso(value: unknown): string {
  return toDate(value)?.toISOString() ?? "";
}

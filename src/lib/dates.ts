/** Returns the next upcoming Sunday from today (or today if it is Sunday). */
export function getNextSunday(now: Date = new Date()): Date {
  const d = new Date(now);
  const day = d.getDay();
  const diff = day === 0 ? 0 : 7 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * True when the (UTC-midnight) content date is today or later.
 * Dates from content are parsed as UTC midnight (z.coerce.date), so both
 * sides are compared in the UTC frame to avoid timezone day-shifts.
 */
export function isUpcoming(date: Date, now: Date = new Date()): boolean {
  const todayUtc = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  return date.getTime() >= todayUtc;
}

export function formatLongDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatShortDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatDay(date: Date): string {
  return date.toLocaleDateString('en-US', { day: 'numeric' });
}

export function formatMonth(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
}

/**
 * Google Calendar "add to calendar" link — works without an API key.
 * A missing end date falls back to start + 2 hours so the entry is valid.
 */
export function googleCalendarUrl(title: string, start: Date, end: Date, location: string, details: string): string {
  const safeEnd = end.getTime() > start.getTime() ? end : new Date(start.getTime() + 2 * 60 * 60 * 1000);
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${fmt(start)}/${fmt(safeEnd)}`,
    location,
    details,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

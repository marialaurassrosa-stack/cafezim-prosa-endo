import { formatHourBadge } from "@/lib/format";
import type { DayConfig } from "@/types";

/**
 * The 3 days of the event. Dates come from the official banner ("De 8 a 10
 * de outubro" — COBE 2026). If that ever changes, update `date` here
 * ("YYYY-MM-DD") — every date shown across the site is derived from this file.
 */
export const days: DayConfig[] = [
  { id: "day1", code: "D1", label: "DIA 01", date: "2026-10-08" },
  { id: "day2", code: "D2", label: "DIA 02", date: "2026-10-09" },
  { id: "day3", code: "D3", label: "DIA 03", date: "2026-10-10" },
];

export function getDayById(dayId: string): DayConfig | undefined {
  return days.find((d) => d.id === dayId);
}

export function formatDayDate(date: string | null): string {
  if (!date) return "Data a confirmar";
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}

const MONTHS_LONG_PT = [
  "janeiro", "fevereiro", "março", "abril", "maio", "junho",
  "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",
];

const MONTHS_SHORT_PT = [
  "JAN", "FEV", "MAR", "ABR", "MAI", "JUN",
  "JUL", "AGO", "SET", "OUT", "NOV", "DEZ",
];

/** "De 8 a 10 de outubro" once every day has a confirmed date, else a safe fallback. */
export function formatDateRangeLabel(allDays: DayConfig[]): string {
  const dates = allDays.map((d) => d.date);
  if (dates.some((d) => !d)) return "Datas a confirmar";

  const parsed = (dates as string[]).map((d) => {
    const [year, month, day] = d.split("-").map(Number);
    return { day, month: month - 1, year };
  });
  const first = parsed[0];
  const last = parsed[parsed.length - 1];

  if (first.month === last.month) {
    return `De ${first.day} a ${last.day} de ${MONTHS_LONG_PT[first.month]}`;
  }
  return `De ${first.day} de ${MONTHS_LONG_PT[first.month]} a ${last.day} de ${MONTHS_LONG_PT[last.month]}`;
}

/** "08 OUT • 14H" once the day has a confirmed date, else "DIA 01 • 09H30". */
export function formatCardDateBadge(day: DayConfig, time: string): string {
  const hourLabel = formatHourBadge(time);
  if (!day.date) return `${day.label} • ${hourLabel}`;
  const [, month, dayOfMonth] = day.date.split("-").map(Number);
  return `${String(dayOfMonth).padStart(2, "0")} ${MONTHS_SHORT_PT[month - 1]} • ${hourLabel}`;
}

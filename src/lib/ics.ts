import type { SessionWithAvailability } from "@/types";

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

/** "2026-05-14" + "09:30" -> "20260514T093000" (local/floating time). */
function toIcsDateTime(date: string, time: string): string {
  const [y, m, d] = date.split("-").map(Number);
  const [h, min] = time.split(":").map(Number);
  return `${y}${pad(m)}${pad(d)}T${pad(h)}${pad(min)}00`;
}

function escapeIcsText(text: string): string {
  return text.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
}

/**
 * Builds a .ics file with one VEVENT per session that already has a
 * confirmed date. Sessions without a date (days.ts date === null) are
 * skipped — call `hasSchedulableSessions` first to decide whether to show
 * the "Adicionar à agenda" button at all.
 */
export function buildIcsCalendar(sessions: SessionWithAvailability[], standLabel: string): string {
  const events = sessions
    .filter((s) => s.day.date)
    .map((s) => {
      const uid = `${s.id}@cafezim-prosa-endo`;
      const dtStart = toIcsDateTime(s.day.date as string, s.startTime);
      const dtEnd = toIcsDateTime(s.day.date as string, s.endTime);
      const title = escapeIcsText(s.title.replace(/\n/g, " "));
      const description = escapeIcsText(`${s.shortDescription}\nCom ${s.speaker.name}.`);
      const location = escapeIcsText(standLabel);
      return [
        "BEGIN:VEVENT",
        `UID:${uid}`,
        `DTSTAMP:${toIcsDateTime(s.day.date as string, s.startTime)}Z`,
        `DTSTART:${dtStart}`,
        `DTEND:${dtEnd}`,
        `SUMMARY:${title}`,
        `DESCRIPTION:${description}`,
        `LOCATION:${location}`,
        "END:VEVENT",
      ].join("\r\n");
    });

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Biodental//Cafezim Prosa e Endo//PT-BR",
    "CALSCALE:GREGORIAN",
    ...events,
    "END:VCALENDAR",
  ].join("\r\n");
}

export function hasSchedulableSessions(sessions: SessionWithAvailability[]): boolean {
  return sessions.some((s) => Boolean(s.day.date));
}

export function downloadIcsFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

import type { SessionWithAvailability } from "@/types";

/** "09:30" -> 570 (minutes since midnight) */
export function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export function durationMinutes(start: string, end: string): number {
  return timeToMinutes(end) - timeToMinutes(start);
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h}h` : `${h}h${m}min`;
}

/**
 * Two sessions conflict when they happen on the same day and their time
 * ranges overlap. Sessions that merely touch (one ends exactly when the
 * other starts) do NOT conflict.
 */
export function sessionsConflict(
  a: Pick<SessionWithAvailability, "dayId" | "startTime" | "endTime">,
  b: Pick<SessionWithAvailability, "dayId" | "startTime" | "endTime">
): boolean {
  if (a.dayId !== b.dayId) return false;
  const aStart = timeToMinutes(a.startTime);
  const aEnd = timeToMinutes(a.endTime);
  const bStart = timeToMinutes(b.startTime);
  const bEnd = timeToMinutes(b.endTime);
  return aStart < bEnd && bStart < aEnd;
}

export function getInitials(name: string): string {
  const cleaned = name.replace(/^(Prof\.|Profa\.|Dr\.|Dra\.)\s*/i, "");
  // Ignora tokens puramente numéricos (ex.: sufixos de nomes placeholder
  // como "Nome Sobrenome 1"), para não gerar iniciais como "N1".
  const parts = cleaned.trim().split(/\s+/).filter((part) => !/^\d+$/.test(part));
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

/** "17:00" -> "17H" · "09:30" -> "09H30" */
export function formatHourBadge(time: string): string {
  const [h, m] = time.split(":");
  return m === "00" ? `${h}H` : `${h}H${m}`;
}

export function availableSeatsLabel(availableSeats: number): string {
  if (availableSeats <= 0) return "Vagas esgotadas";
  if (availableSeats === 1) return "Resta 1 lugar nesta roda";
  return `${availableSeats} vagas disponíveis`;
}

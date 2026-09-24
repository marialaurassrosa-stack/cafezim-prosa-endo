import { days } from "@/data/days";
import { sessions as sessionDefs } from "@/data/sessions";
import { getSpeakerById } from "@/data/speakers";
import { db } from "@/lib/db";
import { durationMinutes } from "@/lib/format";
import type { ScheduleResponse, SessionStatus, SessionWithAvailability } from "@/types";

/** Builds the full schedule (days + sessions merged with live availability). */
export async function buildSchedule(): Promise<ScheduleResponse> {
  const counts = await db.getAvailabilityCounts();

  const sessionsWithAvailability: SessionWithAvailability[] = sessionDefs
    .filter((s) => s.status !== "hidden")
    .map((s) => {
      const day = days.find((d) => d.id === s.dayId)!;
      const speaker = getSpeakerById(s.speakerId)!;
      const count = counts.get(s.id) ?? { confirmed: 0, waitlist: 0 };
      const availableSeats = Math.max(0, s.capacity - count.confirmed);

      let effectiveStatus: SessionStatus = s.status;
      if (effectiveStatus === "active" && availableSeats <= 0) {
        effectiveStatus = "sold_out";
      }

      return {
        ...s,
        day,
        speaker,
        durationMinutes: durationMinutes(s.startTime, s.endTime),
        confirmedCount: count.confirmed,
        waitlistCount: count.waitlist,
        availableSeats,
        effectiveStatus,
      };
    })
    .sort((a, b) => {
      if (a.dayId !== b.dayId) return a.dayId.localeCompare(b.dayId);
      return a.startTime.localeCompare(b.startTime);
    });

  return { days, sessions: sessionsWithAvailability };
}

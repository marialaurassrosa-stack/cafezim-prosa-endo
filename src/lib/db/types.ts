import type { ParticipantInput, RegistrationResultItem, RegistrationStatus } from "@/types";

export interface AvailabilityCount {
  confirmed: number;
  waitlist: number;
}

export interface AdminRegistrationRow {
  registrationId: string;
  createdAt: string;
  status: RegistrationStatus;
  participantId: string;
  name: string;
  email: string;
  phone: string;
  cro: string;
  state: string;
  profileType: string;
  sessionId: string;
  sessionTitle: string;
  dayId: string;
  startTime: string;
  activityType: string;
  speakerName: string;
}

export interface Db {
  /** Confirmed + waitlisted counts per session id, computed from live registrations. */
  getAvailabilityCounts(): Promise<Map<string, AvailabilityCount>>;

  /**
   * Upserts the participant (matched by email) and creates one registration
   * per requested session id, deciding confirmed/waitlist/duplicate per
   * session under a single write lock so two people can never win the same
   * last seat.
   */
  registerParticipant(
    input: ParticipantInput,
    sessionIds: string[]
  ): Promise<{ participantId: string; results: RegistrationResultItem[] }>;

  /** Flat, joined rows for the admin dashboard / CSV export. */
  listRegistrations(): Promise<AdminRegistrationRow[]>;

  /**
   * Marks a registration as cancelled (soft delete — the row stays for
   * history, but stops counting toward confirmed/waitlist and disappears
   * from listRegistrations()/the admin table). Frees the seat immediately,
   * same as any other cancelled registration.
   */
  cancelRegistration(registrationId: string): Promise<void>;
}

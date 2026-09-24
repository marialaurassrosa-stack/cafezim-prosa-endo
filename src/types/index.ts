export type DayId = "day1" | "day2" | "day3";

export interface DayConfig {
  id: DayId;
  /** Short code used inside session ids, e.g. "D1" */
  code: string;
  /** Label shown on the day selector, e.g. "DIA 01" */
  label: string;
  /** ISO date (YYYY-MM-DD) once confirmed by the organizers, or null while TBD. */
  date: string | null;
}

export type ActivityType =
  | "roda_de_conversa"
  | "hands_on"
  | "demonstracao"
  | "caso_clinico"
  | "roda_hands_on";

export type SessionStatus = "active" | "sold_out" | "cancelled" | "hidden";

export type RegistrationStatus = "confirmed" | "waitlist" | "cancelled";

export type ProfileType =
  | "dentista"
  | "endodontista"
  | "pos_graduando"
  | "graduando"
  | "outro";

export interface Speaker {
  id: string;
  name: string;
  credentials: string;
  institution: string;
  bio: string;
  /** Path under /public, or null to fall back to the initials placeholder. */
  photoUrl: string | null;
  /** Marks entries that must be replaced with official data before launch. */
  isPlaceholder?: boolean;
}

/** Master/content definition for a session, edited by hand in src/data/sessions.ts. */
export interface SessionDef {
  id: string;
  dayId: DayId;
  startTime: string; // "HH:mm"
  endTime: string; // "HH:mm"
  activityType: ActivityType;
  title: string;
  speakerId: string;
  shortDescription: string;
  fullDescription: string;
  highlights: string[];
  capacity: number;
  status: SessionStatus;
}

/** Session enriched with live availability + resolved speaker/day, as returned by the API. */
export interface SessionWithAvailability extends SessionDef {
  day: DayConfig;
  speaker: Speaker;
  durationMinutes: number;
  confirmedCount: number;
  waitlistCount: number;
  availableSeats: number;
  effectiveStatus: SessionStatus;
}

export interface ScheduleResponse {
  days: DayConfig[];
  sessions: SessionWithAvailability[];
}

export interface ParticipantInput {
  name: string;
  email: string;
  phone: string;
  cro?: string;
  state?: string;
  profileType: ProfileType;
  consent: boolean;
}

export interface RegistrationResultItem {
  sessionId: string;
  status: RegistrationStatus | "duplicate" | "error";
  message?: string;
}

export interface RegisterResponse {
  participantId: string;
  results: RegistrationResultItem[];
  schedule: ScheduleResponse;
}

export const PROFILE_TYPE_LABELS: Record<ProfileType, string> = {
  dentista: "Dentista",
  endodontista: "Endodontista",
  pos_graduando: "Pós-graduando",
  graduando: "Graduando",
  outro: "Outro",
};

export const ACTIVITY_TYPE_LABELS: Record<ActivityType, string> = {
  roda_de_conversa: "Roda de conversa",
  hands_on: "Hands-on",
  demonstracao: "Demonstração",
  caso_clinico: "Caso clínico",
  roda_hands_on: "Roda + Hands-on",
};

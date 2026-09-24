import { NextResponse } from "next/server";
import { sessions as sessionDefs } from "@/data/sessions";
import { db } from "@/lib/db";
import { buildSchedule } from "@/lib/schedule";
import type { ParticipantInput, ProfileType, RegisterResponse } from "@/types";

const PROFILE_TYPES: ProfileType[] = [
  "dentista",
  "endodontista",
  "pos_graduando",
  "graduando",
  "outro",
];

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function validate(body: unknown): { participant: ParticipantInput; sessionIds: string[] } | null {
  if (typeof body !== "object" || body === null) return null;
  const b = body as Record<string, unknown>;
  const participant = b.participant as Record<string, unknown> | undefined;
  const sessionIds = b.sessionIds;

  if (!participant || !Array.isArray(sessionIds) || sessionIds.length === 0) return null;
  if (!sessionIds.every((id) => typeof id === "string")) return null;

  if (!isNonEmptyString(participant.name)) return null;
  if (!isNonEmptyString(participant.email) || !participant.email.includes("@")) return null;
  if (!isNonEmptyString(participant.phone)) return null;
  if (!PROFILE_TYPES.includes(participant.profileType as ProfileType)) return null;
  if (participant.consent !== true) return null;

  const validSessionIds = sessionIds.filter((id) => sessionDefs.some((s) => s.id === id));
  if (validSessionIds.length === 0) return null;

  return {
    participant: {
      name: (participant.name as string).trim(),
      email: (participant.email as string).trim(),
      phone: (participant.phone as string).trim(),
      cro: isNonEmptyString(participant.cro) ? (participant.cro as string).trim() : "",
      state: isNonEmptyString(participant.state) ? (participant.state as string).trim() : "",
      profileType: participant.profileType as ProfileType,
      consent: true,
    },
    sessionIds: validSessionIds,
  };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const parsed = validate(body);
  if (!parsed) {
    return NextResponse.json(
      { error: "Dados inválidos. Confira os campos obrigatórios e tente novamente." },
      { status: 400 }
    );
  }

  const { participantId, results } = await db.registerParticipant(
    parsed.participant,
    parsed.sessionIds
  );
  const schedule = await buildSchedule();

  const response: RegisterResponse = { participantId, results, schedule };
  return NextResponse.json(response);
}

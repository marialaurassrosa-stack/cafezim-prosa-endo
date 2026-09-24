import { promises as fs } from "fs";
import os from "os";
import path from "path";
import { randomUUID } from "crypto";
import { sessions as sessionDefs } from "@/data/sessions";
import { getSpeakerById } from "@/data/speakers";
import type { ParticipantInput, RegistrationResultItem, RegistrationStatus } from "@/types";
import type { AdminRegistrationRow, AvailabilityCount, Db } from "./types";

/**
 * Local, file-backed implementation of the Db interface. It mirrors the same
 * participants/registrations shape described in the Supabase migration
 * (see supabase/migrations/0001_init.sql) so this can be swapped for the real
 * Supabase-backed implementation (src/lib/db/supabase.ts) with no changes to
 * calling code — see src/lib/db/index.ts. This is what runs out of the box
 * (no Supabase project required) so every interaction can be tested end to
 * end during development.
 */

interface StoredParticipant {
  id: string;
  name: string;
  email: string;
  phone: string;
  cro: string;
  state: string;
  profileType: string;
  createdAt: string;
}

interface StoredRegistration {
  id: string;
  participantId: string;
  sessionId: string;
  status: RegistrationStatus;
  createdAt: string;
}

interface DbShape {
  participants: StoredParticipant[];
  registrations: StoredRegistration[];
}

// Uses the OS temp dir (not process.cwd()) so this also works unmodified on
// serverless hosts like Vercel, where the deployed project folder is
// read-only and only /tmp is writable. Note this means data does not
// necessarily persist across cold starts/deployments there — configure
// Supabase (see src/lib/db/supabase.ts) before relying on this for real
// registrations in production.
const DB_PATH = path.join(os.tmpdir(), "cafezim-prosa-endo", "db.json");

async function readDb(): Promise<DbShape> {
  try {
    const raw = await fs.readFile(DB_PATH, "utf-8");
    return JSON.parse(raw) as DbShape;
  } catch (err: unknown) {
    if ((err as NodeJS.ErrnoException)?.code === "ENOENT") {
      return { participants: [], registrations: [] };
    }
    throw err;
  }
}

async function writeDb(db: DbShape): Promise<void> {
  await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), "utf-8");
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

// Simple in-process mutex: queues writers so two concurrent registrations
// for the last seat in a session are always resolved one after the other,
// never both reading a stale confirmed count and overbooking.
let writeLock: Promise<unknown> = Promise.resolve();
function withLock<T>(fn: () => Promise<T>): Promise<T> {
  const run = writeLock.then(fn, fn);
  writeLock = run.then(
    () => undefined,
    () => undefined
  );
  return run;
}

export const localDb: Db = {
  async getAvailabilityCounts() {
    const db = await readDb();
    const counts = new Map<string, AvailabilityCount>();
    for (const reg of db.registrations) {
      if (reg.status === "cancelled") continue;
      const entry = counts.get(reg.sessionId) ?? { confirmed: 0, waitlist: 0 };
      if (reg.status === "confirmed") entry.confirmed += 1;
      else if (reg.status === "waitlist") entry.waitlist += 1;
      counts.set(reg.sessionId, entry);
    }
    return counts;
  },

  async registerParticipant(input: ParticipantInput, sessionIds: string[]) {
    return withLock(async () => {
      const db = await readDb();
      const email = normalizeEmail(input.email);

      let participant = db.participants.find((p) => normalizeEmail(p.email) === email);
      if (participant) {
        participant.name = input.name;
        participant.phone = input.phone;
        participant.cro = input.cro ?? "";
        participant.state = input.state ?? "";
        participant.profileType = input.profileType;
      } else {
        participant = {
          id: randomUUID(),
          name: input.name,
          email: input.email,
          phone: input.phone,
          cro: input.cro ?? "",
          state: input.state ?? "",
          profileType: input.profileType,
          createdAt: new Date().toISOString(),
        };
        db.participants.push(participant);
      }

      const results: RegistrationResultItem[] = [];

      for (const sessionId of sessionIds) {
        const sessionDef = sessionDefs.find((s) => s.id === sessionId);
        if (!sessionDef) {
          results.push({ sessionId, status: "error", message: "Atividade não encontrada." });
          continue;
        }

        const alreadyRegistered = db.registrations.find(
          (r) =>
            r.participantId === participant!.id &&
            r.sessionId === sessionId &&
            r.status !== "cancelled"
        );
        if (alreadyRegistered) {
          results.push({
            sessionId,
            status: "duplicate",
            message: "Você já está inscrito nesta atividade.",
          });
          continue;
        }

        if (sessionDef.status === "cancelled" || sessionDef.status === "hidden") {
          results.push({ sessionId, status: "error", message: "Atividade indisponível." });
          continue;
        }

        const confirmedCount = db.registrations.filter(
          (r) => r.sessionId === sessionId && r.status === "confirmed"
        ).length;

        const isManuallySoldOut = sessionDef.status === "sold_out";
        const status: RegistrationStatus =
          !isManuallySoldOut && confirmedCount < sessionDef.capacity ? "confirmed" : "waitlist";

        db.registrations.push({
          id: randomUUID(),
          participantId: participant.id,
          sessionId,
          status,
          createdAt: new Date().toISOString(),
        });

        results.push({ sessionId, status });
      }

      await writeDb(db);
      return { participantId: participant.id, results };
    });
  },

  async listRegistrations() {
    const db = await readDb();
    const rows: AdminRegistrationRow[] = [];
    for (const reg of db.registrations) {
      if (reg.status === "cancelled") continue;
      const participant = db.participants.find((p) => p.id === reg.participantId);
      const sessionDef = sessionDefs.find((s) => s.id === reg.sessionId);
      if (!participant || !sessionDef) continue;
      const speaker = getSpeakerById(sessionDef.speakerId);
      rows.push({
        registrationId: reg.id,
        createdAt: reg.createdAt,
        status: reg.status,
        participantId: participant.id,
        name: participant.name,
        email: participant.email,
        phone: participant.phone,
        cro: participant.cro,
        state: participant.state,
        profileType: participant.profileType,
        sessionId: sessionDef.id,
        sessionTitle: sessionDef.title.replace(/\n/g, " "),
        dayId: sessionDef.dayId,
        startTime: sessionDef.startTime,
        activityType: sessionDef.activityType,
        speakerName: speaker?.name ?? "—",
      });
    }
    return rows.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  },
};

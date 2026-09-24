import { createClient } from "@supabase/supabase-js";
import type { ParticipantInput, RegistrationResultItem } from "@/types";
import type { AdminRegistrationRow, AvailabilityCount, Db } from "./types";

/**
 * Supabase-backed implementation of the Db interface (see supabase/migrations
 * for the schema + the register_for_sessions() function this relies on for
 * atomic, race-free seat allocation). It's only used when
 * NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are both set — see
 * src/lib/db/index.ts. The service role key never reaches the browser: every
 * call here happens inside a Route Handler (server-only).
 */

function getClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Supabase env vars are not configured.");
  }
  return createClient(url, key, { auth: { persistSession: false } });
}

interface JoinedRegistrationRow {
  id: string;
  status: string;
  created_at: string;
  participant: {
    id: string;
    name: string;
    email: string;
    phone: string;
    cro: string | null;
    state: string | null;
    profile_type: string;
  } | null;
  session: {
    id: string;
    title: string;
    day: string;
    start_time: string;
    activity_type: string;
    speaker_name: string | null;
  } | null;
}

export const supabaseDb: Db = {
  async getAvailabilityCounts() {
    const supabase = getClient();
    const { data, error } = await supabase
      .from("registrations")
      .select("session_id, status")
      .neq("status", "cancelled");
    if (error) throw error;

    const counts = new Map<string, AvailabilityCount>();
    for (const row of data ?? []) {
      const entry = counts.get(row.session_id) ?? { confirmed: 0, waitlist: 0 };
      if (row.status === "confirmed") entry.confirmed += 1;
      else if (row.status === "waitlist") entry.waitlist += 1;
      counts.set(row.session_id, entry);
    }
    return counts;
  },

  async registerParticipant(input: ParticipantInput, sessionIds: string[]) {
    const supabase = getClient();
    const { data, error } = await supabase.rpc("register_for_sessions", {
      p_name: input.name,
      p_email: input.email,
      p_phone: input.phone,
      p_cro: input.cro ?? null,
      p_state: input.state ?? null,
      p_profile_type: input.profileType,
      p_session_ids: sessionIds,
    });
    if (error) throw error;

    const rows = (data ?? []) as Array<{
      participant_id: string;
      session_id: string;
      status: string;
    }>;
    const participantId = rows[0]?.participant_id ?? "";
    const results: RegistrationResultItem[] = rows.map((r) => ({
      sessionId: r.session_id,
      status: r.status as RegistrationResultItem["status"],
    }));
    return { participantId, results };
  },

  async listRegistrations() {
    const supabase = getClient();
    const { data, error } = await supabase
      .from("registrations")
      .select(
        "id, status, created_at, participant:participants(id,name,email,phone,cro,state,profile_type), session:sessions(id,title,day,start_time,activity_type,speaker_name)"
      )
      .neq("status", "cancelled")
      .order("created_at", { ascending: true });
    if (error) throw error;

    const rows = (data ?? []) as unknown as JoinedRegistrationRow[];
    const result: AdminRegistrationRow[] = rows.map((row) => ({
      registrationId: row.id,
      createdAt: row.created_at,
      status: row.status as AdminRegistrationRow["status"],
      participantId: row.participant?.id ?? "",
      name: row.participant?.name ?? "",
      email: row.participant?.email ?? "",
      phone: row.participant?.phone ?? "",
      cro: row.participant?.cro ?? "",
      state: row.participant?.state ?? "",
      profileType: row.participant?.profile_type ?? "",
      sessionId: row.session?.id ?? "",
      sessionTitle: row.session?.title ?? "",
      dayId: row.session?.day ?? "",
      startTime: row.session?.start_time ?? "",
      activityType: row.session?.activity_type ?? "",
      speakerName: row.session?.speaker_name ?? "—",
    }));
    return result;
  },
};

import { localDb } from "./local";
import { supabaseDb } from "./supabase";
import type { Db } from "./types";

/**
 * Picks the Supabase-backed store when it's fully configured, otherwise
 * falls back to the local JSON-file store (src/lib/db/local.ts) so the whole
 * booking flow works out of the box during development/demo. Configure
 * NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY (see .env.example) to
 * switch to Supabase — no other code changes needed.
 */
const useSupabase = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
);

export const db: Db = useSupabase ? supabaseDb : localDb;
export type { AdminRegistrationRow, AvailabilityCount, Db } from "./types";

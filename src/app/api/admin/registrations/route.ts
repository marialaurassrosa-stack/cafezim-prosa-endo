import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { sessions as sessionDefs } from "@/data/sessions";
import { ADMIN_COOKIE_NAME, isValidAdminSessionToken } from "@/lib/adminAuth";
import { db } from "@/lib/db";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!isValidAdminSessionToken(token)) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const rows = await db.listRegistrations();
  const summary = sessionDefs.map((s) => {
    const relevant = rows.filter((r) => r.sessionId === s.id);
    const confirmed = relevant.filter((r) => r.status === "confirmed").length;
    const waitlist = relevant.filter((r) => r.status === "waitlist").length;
    return {
      sessionId: s.id,
      title: s.title.replace(/\n/g, " "),
      dayId: s.dayId,
      capacity: s.capacity,
      confirmed,
      waitlist,
      available: Math.max(0, s.capacity - confirmed),
    };
  });

  return NextResponse.json({ rows, summary });
}

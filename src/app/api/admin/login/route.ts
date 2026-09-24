import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, createAdminSessionToken, safeStringEqual } from "@/lib/adminAuth";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { password?: unknown };
  const password = typeof body.password === "string" ? body.password : "";
  const expected = process.env.ADMIN_PASSWORD || "biodental2026";

  if (!safeStringEqual(password, expected)) {
    return NextResponse.json({ error: "Senha incorreta." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE_NAME, createAdminSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return response;
}

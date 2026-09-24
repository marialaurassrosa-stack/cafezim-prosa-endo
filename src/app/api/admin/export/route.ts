import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getDayById } from "@/data/days";
import { ADMIN_COOKIE_NAME, isValidAdminSessionToken } from "@/lib/adminAuth";
import { db } from "@/lib/db";
import { ACTIVITY_TYPE_LABELS, PROFILE_TYPE_LABELS, type ActivityType, type ProfileType } from "@/types";

function csvEscape(value: string): string {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!isValidAdminSessionToken(token)) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const dayFilter = searchParams.get("day");
  const activityFilter = searchParams.get("activityType");
  const statusFilter = searchParams.get("status");

  let rows = await db.listRegistrations();
  if (dayFilter) rows = rows.filter((r) => r.dayId === dayFilter);
  if (activityFilter) rows = rows.filter((r) => r.activityType === activityFilter);
  if (statusFilter) rows = rows.filter((r) => r.status === statusFilter);

  const header = [
    "Nome",
    "E-mail",
    "WhatsApp",
    "CRO",
    "UF",
    "Perfil",
    "Dia",
    "Horário",
    "Atividade",
    "Tipo",
    "Professor",
    "Status",
    "Inscrito em",
  ];

  const lines = [header.join(",")];
  for (const r of rows) {
    const day = getDayById(r.dayId);
    lines.push(
      [
        r.name,
        r.email,
        r.phone,
        r.cro,
        r.state,
        PROFILE_TYPE_LABELS[r.profileType as ProfileType] ?? r.profileType,
        day?.label ?? r.dayId,
        r.startTime,
        r.sessionTitle,
        ACTIVITY_TYPE_LABELS[r.activityType as ActivityType] ?? r.activityType,
        r.speakerName,
        r.status,
        r.createdAt,
      ]
        .map((v) => csvEscape(String(v)))
        .join(",")
    );
  }

  const csv = "﻿" + lines.join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="cafezim-inscricoes.csv"',
    },
  });
}

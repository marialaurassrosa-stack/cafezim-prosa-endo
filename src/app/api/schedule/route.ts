import { NextResponse } from "next/server";
import { buildSchedule } from "@/lib/schedule";

export async function GET() {
  const schedule = await buildSchedule();
  return NextResponse.json(schedule);
}

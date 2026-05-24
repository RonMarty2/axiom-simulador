import { NextResponse } from "next/server";
import { clearSession } from "@/lib/session-mock";

export async function POST() {
  await clearSession();
  return NextResponse.json({ ok: true });
}

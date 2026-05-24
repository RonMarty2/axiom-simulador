import { NextResponse } from "next/server";
import { getCurrentUser, isAdmin } from "@/lib/session-mock";

export async function GET() {
  const usuario = await getCurrentUser();
  const admin = await isAdmin();
  return NextResponse.json({ usuario, admin });
}

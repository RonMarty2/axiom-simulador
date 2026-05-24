import { NextResponse } from "next/server";
import { getEstadisticasGlobales } from "@/lib/data-store";
import { isAdmin } from "@/lib/session";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Solo admin" }, { status: 403 });
  }
  const stats = await getEstadisticasGlobales();
  return NextResponse.json(stats);
}

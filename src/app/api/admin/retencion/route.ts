import { NextResponse } from "next/server";
import { getHistorial } from "@/lib/data-store";
import { resumenMetricas } from "@/lib/metricas-retencion";
import { isAdmin } from "@/lib/session";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Solo admin" }, { status: 403 });
  }
  const historial = await getHistorial();
  return NextResponse.json(resumenMetricas(historial));
}

import { NextResponse } from "next/server";
import { getHistorialUsuario } from "@/lib/data-store";
import { getCurrentUser } from "@/lib/session";

export async function GET() {
  const u = await getCurrentUser();
  if (!u) return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  const historial = await getHistorialUsuario(u.id);
  return NextResponse.json({ historial });
}

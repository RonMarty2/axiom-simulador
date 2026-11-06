import { NextRequest, NextResponse } from "next/server";
import { actualizarUsuario } from "@/lib/data-store";
import { getCurrentUser } from "@/lib/session";
import { limpiarApodo } from "@/lib/apodo";

// El alumno elige (o borra) su apodo del ranking. Vacío = anónimo.
export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Inicia sesión para continuar." }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  const r = limpiarApodo(body?.apodo);
  if (!r.ok) return NextResponse.json({ error: r.error }, { status: 400 });
  try {
    await actualizarUsuario(user.id, { apodo: r.apodo });
  } catch (e) {
    // Si falta la columna (migración 008 sin aplicar) no rompemos la cuenta.
    console.error("No se pudo guardar el apodo:", e);
    return NextResponse.json({ error: "No se pudo guardar el apodo. Inténtalo más tarde." }, { status: 500 });
  }
  return NextResponse.json({ ok: true, apodo: r.apodo });
}

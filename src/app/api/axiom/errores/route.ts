import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { getErroresUsuario, limpiarErroresUsuario, temasReforzarDeErrores } from "@/lib/axiom/errores-db";

// Lista los errores del usuario actual, agrupados y listos para mostrar.
export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const errores = await getErroresUsuario(user.id);
  const items = errores.map((e) => ({
    pregunta_id: e.pregunta_id,
    enunciado: e.pregunta?.enunciado ?? "",
    area: e.area || "general",
    tema: e.tema || "general",
    facultad: e.pregunta?.facultad ?? "",
    veces_fallado: e.veces ?? 1,
    ultima_vez: e.fecha,
  }));

  const por_area: Record<string, number> = {};
  for (const e of items) por_area[e.area] = (por_area[e.area] ?? 0) + 1;

  return NextResponse.json({
    total: items.length,
    errores: items,
    por_area,
    temas_reforzar: temasReforzarDeErrores(errores, 8),
  });
}

// Borra todos los errores del usuario actual.
export async function DELETE() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  await limpiarErroresUsuario(user.id);
  return NextResponse.json({ ok: true });
}

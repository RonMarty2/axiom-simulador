import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { getErroresUsuario, limpiarErroresUsuario, temasReforzarDeErrores } from "@/lib/axiom/errores-db";
import { tocaRepasar, proximoRepaso, contarDominadasDesde } from "@/lib/axiom/repaso";
import { desdeValido } from "@/lib/refuerzo";

// Lista los errores del usuario actual, agrupados y listos para mostrar.
export async function GET(req?: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const desde = desdeValido(req?.url ? new URL(req.url).searchParams.get("desde") : null);

  // las dominadas (3 aciertos seguidos en su fecha, repaso.ts) ya no se muestran, pero no se borran
  const ahora = new Date();
  const todos = await getErroresUsuario(user.id);
  const errores = todos.filter((e) => !e.dominada_en);
  const items = errores.map((e) => ({
    pregunta_id: e.pregunta_id,
    enunciado: e.pregunta?.enunciado ?? "",
    area: e.area || "general",
    tema: e.tema || "general",
    facultad: e.pregunta?.facultad ?? "",
    veces_fallado: e.veces ?? 1,
    ultima_vez: e.fecha,
    toca_hoy: tocaRepasar(e, ahora),
    proximo: e.proximo ?? null,
  }));

  const por_area: Record<string, number> = {};
  for (const e of items) por_area[e.area] = (por_area[e.area] ?? 0) + 1;

  return NextResponse.json({
    total: items.length,
    errores: items,
    por_area,
    temas_reforzar: temasReforzarDeErrores(errores, 8),
    para_hoy: items.filter((e) => e.toca_hoy).length,
    proximo_repaso: proximoRepaso(errores, ahora),
    dominadas: todos.length - errores.length,
    dominadas_desde: desde ? contarDominadasDesde(todos, desde) : 0,
  });
}

// Borra todos los errores del usuario actual.
export async function DELETE() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  await limpiarErroresUsuario(user.id);
  return NextResponse.json({ ok: true });
}

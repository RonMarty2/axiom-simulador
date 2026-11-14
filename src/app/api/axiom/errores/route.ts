import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { formatoVigente } from "@/lib/data-store";
import { agruparPorTemaActual, temaActualDeArea } from "@/lib/axiom/areas";
import { getErroresUsuario, limpiarErroresUsuario, temasReforzarDeErrores } from "@/lib/axiom/errores-db";
import { tocaRepasar, proximoRepaso, contarDominadasDesde } from "@/lib/axiom/repaso";
import { desdeValido } from "@/lib/refuerzo";

// Lista los errores del usuario actual, agrupados por los temas actuales de su carrera.
export async function GET(req?: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const desde = desdeValido(req?.url ? new URL(req.url).searchParams.get("desde") : null);
  const facObjetivo = (user.facultad_objetivo ?? "").toLowerCase();
  const ficha = facObjetivo ? await formatoVigente(facObjetivo) : null;

  // las dominadas (3 aciertos seguidos en su fecha, repaso.ts) ya no se muestran, pero no se borran
  const ahora = new Date();
  const todosRaw = await getErroresUsuario(user.id);
  const todos = facObjetivo
    ? todosRaw.filter((e) => !e.pregunta?.facultad || e.pregunta.facultad.toLowerCase() === facObjetivo)
    : todosRaw;
  const errores = todos.filter((e) => !e.dominada_en);
  const items = errores.map((e) => {
    const facItem = (e.pregunta?.facultad || facObjetivo).toLowerCase();
    const areaActual = temaActualDeArea(
      facItem,
      e.area || "general",
      facItem === facObjetivo ? ficha : undefined
    );
    return {
      pregunta_id: e.pregunta_id,
      enunciado: e.pregunta?.enunciado ?? "",
      area: areaActual,
      tema: e.tema || "general",
      facultad: e.pregunta?.facultad ?? "",
      veces_fallado: e.veces ?? 1,
      ultima_vez: e.fecha,
      toca_hoy: tocaRepasar(e, ahora),
      proximo: e.proximo ?? null,
    };
  });

  const por_area = agruparPorTemaActual(facObjetivo, items, ficha);
  const por_area_hoy = agruparPorTemaActual(
    facObjetivo,
    items.filter((e) => e.toca_hoy),
    ficha
  );

  return NextResponse.json({
    total: items.length,
    errores: items,
    por_area,
    por_area_hoy,
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

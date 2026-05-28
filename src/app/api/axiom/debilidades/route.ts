import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { getHistorialUsuario } from "@/lib/data-store";
import { getErroresUsuario } from "@/lib/axiom/errores-db";

// Devuelve los puntos débiles del usuario para la facultad activa:
// - Secciones (áreas / libros) con su promedio en los simulacros.
// - Temas más fallados (count de errores).
export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  if (!user.facultad_objetivo) {
    return NextResponse.json({ secciones: [], temas: [], total_examenes: 0, facultad: null });
  }

  const facultad = user.facultad_objetivo;
  const historial = (await getHistorialUsuario(user.id)).filter((h) => h.facultad === facultad);
  const errores = (await getErroresUsuario(user.id)).filter((e) => e.pregunta?.facultad === facultad);

  // Promedio por sección (área) a partir del desglose de cada simulacro.
  const acum = new Map<string, { suma: number; n: number }>();
  for (const h of historial) {
    const desg = h.desglose ?? {};
    for (const [seccion, porc] of Object.entries(desg)) {
      const prev = acum.get(seccion) ?? { suma: 0, n: 0 };
      acum.set(seccion, { suma: prev.suma + (porc as number), n: prev.n + 1 });
    }
  }
  const secciones = Array.from(acum.entries())
    .map(([seccion, v]) => ({ seccion, promedio: Math.round(v.suma / v.n), intentos: v.n }))
    .sort((a, b) => a.promedio - b.promedio);

  // Temas con más errores.
  const temaMap = new Map<string, { tema: string; area: string; errores: number; ultima_vez: string }>();
  for (const e of errores) {
    const k = `${e.area || "general"}::${e.tema || "general"}`;
    const prev = temaMap.get(k);
    if (prev) {
      prev.errores++;
      if (e.fecha > prev.ultima_vez) prev.ultima_vez = e.fecha;
    } else {
      temaMap.set(k, { tema: e.tema || "general", area: e.area || "general", errores: 1, ultima_vez: e.fecha });
    }
  }
  const temas = Array.from(temaMap.values()).sort((a, b) => b.errores - a.errores);

  return NextResponse.json({
    facultad,
    total_examenes: historial.length,
    secciones,
    temas,
  });
}

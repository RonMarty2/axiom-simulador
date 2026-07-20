import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import { ES_DEV, isAdmin } from "@/lib/session";

// Ajustes finos de las figuras hechos con el Editor de Figuras
// (/admin/figuras): correcciones de posición (dx/dy) u ocultado de
// elementos puntuales, POR ENCIMA de lo que calcula el motor de geometría.
// Se guardan en data/figuras-overrides.json para que viajen por git igual
// que el resto del contenido.
//
// GET: público (los alumnos necesitan ver las figuras corregidas).
// POST: solo admin y solo en desarrollo local (en Vercel el filesystem es
// de solo lectura — el flujo es ajustar en local y subir con SUBIR).

const ARCHIVO = () => path.join(process.cwd(), "data", "figuras-overrides.json");

export async function GET() {
  try {
    const crudo = await fs.readFile(ARCHIVO(), "utf-8");
    return NextResponse.json(JSON.parse(crudo));
  } catch {
    return NextResponse.json({});
  }
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Solo administradores" }, { status: 403 });
  }
  if (!ES_DEV) {
    return NextResponse.json(
      { error: "En producción no se puede guardar. Ajustá en tu compu local y subí con SUBIR." },
      { status: 400 }
    );
  }
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Cuerpo inválido" }, { status: 400 });
  }
  await fs.writeFile(ARCHIVO(), JSON.stringify(body, null, 2) + "\n", "utf-8");
  return NextResponse.json({ ok: true });
}

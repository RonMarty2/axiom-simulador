import { NextRequest, NextResponse } from "next/server";
import { crearPregunta, estadisticasBanco, listarPreguntas } from "@/lib/axiom/preguntas-store";
import { isAdmin } from "@/lib/session";

export async function GET(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Solo admin" }, { status: 403 });
  }
  const sp = req.nextUrl.searchParams;
  const filtros = {
    facultad: sp.get("facultad") || undefined,
    area: sp.get("area") || undefined,
    anio: sp.get("anio") ? parseInt(sp.get("anio")!, 10) : undefined,
    dificultad: sp.get("dificultad") || undefined,
    tipo: sp.get("tipo") || undefined,
    busqueda: sp.get("q") || undefined,
  };
  const preguntas = await listarPreguntas(filtros);
  const stats = await estadisticasBanco();
  return NextResponse.json({ preguntas, stats });
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Solo admin" }, { status: 403 });
  }
  try {
    const body = await req.json();
    const nueva = await crearPregunta(body);
    return NextResponse.json({ pregunta: nueva }, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Error creando pregunta" },
      { status: 400 }
    );
  }
}

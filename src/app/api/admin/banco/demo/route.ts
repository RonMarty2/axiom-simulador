import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/session";
import {
  importarBulk,
  eliminarPreguntasPorTag,
  contarPreguntasPorTag,
} from "@/lib/axiom/preguntas-store";
import { preguntasDemo, DEMO_TAG } from "@/lib/axiom/demo-seed";

// Cuántas preguntas de prueba hay cargadas.
export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Solo admin" }, { status: 403 });
  }
  const total = await contarPreguntasPorTag(DEMO_TAG);
  return NextResponse.json({ total });
}

// Cargar el set de preguntas de prueba (todos los tipos, las 4 facultades).
export async function POST() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Solo admin" }, { status: 403 });
  }
  // Evita duplicar: si ya hay datos de prueba, primero los borra.
  await eliminarPreguntasPorTag(DEMO_TAG);
  const { creadas, errores } = await importarBulk(preguntasDemo());
  return NextResponse.json({ creadas, errores });
}

// Borrar TODAS las preguntas de prueba de un clic.
export async function DELETE() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Solo admin" }, { status: 403 });
  }
  const borradas = await eliminarPreguntasPorTag(DEMO_TAG);
  return NextResponse.json({ borradas });
}

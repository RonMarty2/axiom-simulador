import { NextRequest, NextResponse } from "next/server";
import { actualizarPregunta, eliminarPregunta, obtenerPregunta } from "@/lib/axiom/preguntas-store";
import { isAdmin } from "@/lib/session-mock";

export async function GET(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Solo admin" }, { status: 403 });
  }
  const { id } = await ctx.params;
  const pregunta = await obtenerPregunta(id);
  if (!pregunta) return NextResponse.json({ error: "No encontrada" }, { status: 404 });
  return NextResponse.json({ pregunta });
}

export async function PATCH(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Solo admin" }, { status: 403 });
  }
  const { id } = await ctx.params;
  const body = await req.json();
  const pregunta = await actualizarPregunta(id, body);
  if (!pregunta) return NextResponse.json({ error: "No encontrada" }, { status: 404 });
  return NextResponse.json({ pregunta });
}

export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Solo admin" }, { status: 403 });
  }
  const { id } = await ctx.params;
  const ok = await eliminarPregunta(id);
  if (!ok) return NextResponse.json({ error: "No encontrada" }, { status: 404 });
  return NextResponse.json({ ok: true });
}

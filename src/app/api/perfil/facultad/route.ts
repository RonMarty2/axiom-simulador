import { NextRequest, NextResponse } from "next/server";
import { actualizarUsuario, getFacultad, type FacultadId } from "@/lib/data-store";
import { getCurrentUser } from "@/lib/session";

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }
  const body = await req.json();
  const facultad = body.facultad as FacultadId | undefined;
  if (!facultad) {
    return NextResponse.json({ error: "Falta facultad" }, { status: 400 });
  }
  const existe = await getFacultad(facultad);
  if (!existe) {
    return NextResponse.json({ error: "Facultad no válida" }, { status: 400 });
  }
  const actualizado = await actualizarUsuario(user.id, { facultad_objetivo: facultad });
  return NextResponse.json({ ok: true, usuario: actualizado });
}

import { NextRequest, NextResponse } from "next/server";
import { actualizarUsuario, getFacultad, getUsuario, type FacultadId } from "@/lib/data-store";
import { getCurrentUser } from "@/lib/session";

export async function POST(req: NextRequest) {
  const userSession = await getCurrentUser();
  if (!userSession) {
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

  // Obtener usuario actual (datos completos) para verificar plan + facultad
  const usuarioCompleto = await getUsuario(userSession.id);
  if (!usuarioCompleto) {
    return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
  }

  // Solo permitimos asignar facultad SI el usuario aún no tiene una (primer login).
  // Cualquier cambio posterior requiere pago — independiente del plan,
  // porque cada facultad es un producto separado con su propio precio.
  const yaTeniaFacultad = !!usuarioCompleto.facultad_objetivo;
  const cambioReal = yaTeniaFacultad && usuarioCompleto.facultad_objetivo !== facultad;

  if (cambioReal) {
    return NextResponse.json({
      error: "Cambiar de facultad requiere comprar el acceso a la nueva carrera",
      codigo: "REQUIERE_PAGO",
    }, { status: 403 });
  }

  const actualizado = await actualizarUsuario(userSession.id, { facultad_objetivo: facultad });
  return NextResponse.json({ ok: true, usuario: actualizado });
}

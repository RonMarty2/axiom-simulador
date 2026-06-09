import { NextRequest, NextResponse } from "next/server";
import { actualizarUsuario, getFacultad, getUsuario, getSuscripcionesActivas, type FacultadId } from "@/lib/data-store";
import { getCurrentUser, esCambioFacultadLibreEmail } from "@/lib/session";

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

  // Cambiar entre facultades a las que YA estás suscrito es gratis (es el
  // selector del header). Asignar la primera facultad también es gratis. Solo
  // se exige pago para activar una facultad nueva sin suscripción.
  // Excepción: cuentas en FREE_FACULTY_CHANGE_EMAILS pueden cambiar a cualquier
  // facultad sin pago — pensado para que el dueño del producto recorra cada
  // facultad COMO ESTUDIANTE (sigue viendo plan gratis/premium real, banners
  // de upgrade, paywall de unidades premium). NO les da poderes admin.
  const yaTeniaFacultad = !!usuarioCompleto.facultad_objetivo;
  const esLaMisma = usuarioCompleto.facultad_objetivo === facultad;
  const subs = await getSuscripcionesActivas(userSession.id);
  const tieneSuscripcion = subs.some((s) => s.facultad === facultad);
  const cambioLibre = esCambioFacultadLibreEmail(userSession.email);

  if (yaTeniaFacultad && !esLaMisma && !tieneSuscripcion && !cambioLibre) {
    return NextResponse.json({
      error: "Activar una facultad nueva requiere comprar su acceso",
      codigo: "REQUIERE_PAGO",
    }, { status: 403 });
  }

  const actualizado = await actualizarUsuario(userSession.id, { facultad_objetivo: facultad });
  return NextResponse.json({ ok: true, usuario: actualizado });
}

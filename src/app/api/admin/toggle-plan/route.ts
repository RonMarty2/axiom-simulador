import { NextResponse } from "next/server";
import { getCurrentUser, isAdmin, isTester } from "@/lib/session";
import { agregarOExtenderSuscripcion, eliminarSuscripcion, getSuscripcionesActivas } from "@/lib/data-store";

// Para cuentas de prueba (admin o tester): alterna entre Premium y Gratis en la
// facultad que tienes seleccionada. Sirve para probar el flujo libremente sin
// tener que hacer pagos reales.
export async function POST() {
  const permitido = (await isAdmin()) || (await isTester());
  if (!permitido) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }
  const user = await getCurrentUser();
  if (!user || !user.facultad_objetivo) {
    return NextResponse.json({ error: "Necesitas tener una facultad seleccionada" }, { status: 400 });
  }

  const subs = await getSuscripcionesActivas(user.id);
  const tieneActiva = subs.some((s) => s.facultad === user.facultad_objetivo);

  if (tieneActiva) {
    await eliminarSuscripcion(user.id, user.facultad_objetivo);
    return NextResponse.json({ plan: "gratis", facultad: user.facultad_objetivo });
  } else {
    const sub = await agregarOExtenderSuscripcion(user.id, user.facultad_objetivo, 1);
    return NextResponse.json({ plan: "premium", facultad: user.facultad_objetivo, vence: sub.vence });
  }
}

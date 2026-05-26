import { NextRequest, NextResponse } from "next/server";
import { actualizarPago, actualizarUsuario, getUsuario } from "@/lib/data-store";
import { isAdmin } from "@/lib/session";

export async function PATCH(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Solo admin" }, { status: 403 });
  }
  const { id } = await ctx.params;
  const body = await req.json();
  const { accion, motivo_rechazo } = body as { accion: "aprobar" | "rechazar"; motivo_rechazo?: string };

  if (accion === "aprobar") {
    const validoHasta = new Date();
    validoHasta.setMonth(validoHasta.getMonth() + 1);
    const pago = await actualizarPago(id, {
      estado: "aprobado",
      valido_hasta: validoHasta.toISOString().slice(0, 10),
    });
    if (!pago) return NextResponse.json({ error: "Pago no encontrado" }, { status: 404 });

    // Aplicar el efecto del pago según su tipo
    const usuario = await getUsuario(pago.usuario_id);
    if (usuario) {
      if (pago.tipo === "cambio_facultad" && pago.destino_facultad) {
        // Cambio de facultad: actualizar facultad_objetivo del usuario
        await actualizarUsuario(usuario.id, { facultad_objetivo: pago.destino_facultad });
      } else if (pago.tipo === "plan" && pago.plan) {
        // Compra de plan: subir al usuario y guardar hasta cuándo está activo.
        await actualizarUsuario(usuario.id, { plan: pago.plan, plan_vence: pago.valido_hasta });
      }
    }

    return NextResponse.json({ pago });
  }

  if (accion === "rechazar") {
    const pago = await actualizarPago(id, {
      estado: "rechazado",
      motivo_rechazo: motivo_rechazo ?? "Sin motivo especificado",
    });
    if (!pago) return NextResponse.json({ error: "Pago no encontrado" }, { status: 404 });
    return NextResponse.json({ pago });
  }

  return NextResponse.json({ error: "Acción no válida" }, { status: 400 });
}

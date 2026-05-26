import { NextRequest, NextResponse } from "next/server";
import { crearPago, getPagos, getPagosUsuario, getFacultad, type FacultadId, type TipoPago } from "@/lib/data-store";
import { getCurrentUser, isAdmin } from "@/lib/session";

// Precios fijos por ahora. Centralizados aquí para que el cliente no pueda
// inventar montos. Cuando quieras precios distintos por facultad, lee del
// objeto Facultad.
const PRECIO_PRO_BOB = 50;
const PRECIO_PREMIUM_BOB = 100;
const PRECIO_CAMBIO_FACULTAD_BOB = 50;

export async function GET() {
  if (await isAdmin()) {
    const pagos = await getPagos();
    return NextResponse.json({ pagos });
  }
  const u = await getCurrentUser();
  if (!u) return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  const pagos = await getPagosUsuario(u.id);
  return NextResponse.json({ pagos });
}

export async function POST(req: NextRequest) {
  const u = await getCurrentUser();
  if (!u) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const body = await req.json();
  const tipo = (body.tipo ?? "plan") as TipoPago;
  const metodo = body.metodo as "tigo_money" | "qr_bancario" | "transferencia";
  const referencia = (body.referencia as string) || `${(metodo ?? "PAGO").toUpperCase()}-${Date.now().toString().slice(-8)}`;

  if (!metodo) {
    return NextResponse.json({ error: "Falta método de pago" }, { status: 400 });
  }

  if (tipo === "cambio_facultad") {
    const destino = body.destino_facultad as FacultadId | undefined;
    if (!destino) {
      return NextResponse.json({ error: "Falta facultad destino" }, { status: 400 });
    }
    const f = await getFacultad(destino);
    if (!f) {
      return NextResponse.json({ error: "Facultad destino inválida" }, { status: 400 });
    }
    const pago = await crearPago({
      usuario_id: u.id,
      tipo: "cambio_facultad",
      plan: null,
      destino_facultad: destino,
      monto: PRECIO_CAMBIO_FACULTAD_BOB,
      moneda: "BOB",
      metodo,
      referencia,
    });
    return NextResponse.json({ pago });
  }

  // tipo === "plan"
  const plan = body.plan as "pro" | "premium" | undefined;
  if (!plan) {
    return NextResponse.json({ error: "Falta plan" }, { status: 400 });
  }
  const monto = plan === "premium" ? PRECIO_PREMIUM_BOB : PRECIO_PRO_BOB;
  const pago = await crearPago({
    usuario_id: u.id,
    tipo: "plan",
    plan,
    monto,
    moneda: "BOB",
    metodo,
    referencia,
  });
  return NextResponse.json({ pago });
}

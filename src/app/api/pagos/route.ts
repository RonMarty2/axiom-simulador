import { NextRequest, NextResponse } from "next/server";
import { crearPago, getPagos, getPagosUsuario } from "@/lib/data-store";
import { getCurrentUser, isAdmin } from "@/lib/session";

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
  const { plan, metodo, referencia } = body as { plan: "pro" | "premium"; metodo: "tigo_money" | "qr_bancario" | "transferencia"; referencia: string };
  if (!plan || !metodo || !referencia) {
    return NextResponse.json({ error: "Faltan campos" }, { status: 400 });
  }
  const monto = plan === "premium" ? 100 : 50;
  const pago = await crearPago({
    usuario_id: u.id,
    plan,
    monto,
    moneda: "BOB",
    metodo,
    referencia,
  });
  return NextResponse.json({ pago });
}

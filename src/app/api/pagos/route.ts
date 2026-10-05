import { NextRequest, NextResponse } from "next/server";
import { crearPago, guardarComprobante, idsConComprobante, getPagos, getPagosUsuario, getFacultad, type FacultadId, type TipoPago } from "@/lib/data-store";
import { getCurrentUser, isAdmin } from "@/lib/session";
import { montoCambioFacultadEn, montoPlanEn, type Moneda } from "@/lib/precios";
import { METODOS_ACTIVOS, esMetodoActivo, type MetodoActivo } from "@/lib/pagos-config";

// Los precios viven en src/lib/precios.ts, no acá: estaban escritos tres
// veces y coincidían de casualidad. El servidor sigue siendo el que MANDA
// (calcula el monto con esas tablas y nunca confía en lo que manda el
// cliente); lo único que cambió es de dónde los lee. La moneda la decide el
// método: QR bancario cobra en Bs., Binance Pay y RedotPay en USDT.

// ~1,4 MB en base64: el navegador la reduce a ~150 KB, esto es solo el techo.
const MAX_COMPROBANTE = 1_400_000;

export async function GET() {
  if (await isAdmin()) {
    const [pagos, conFoto] = await Promise.all([getPagos(), idsConComprobante()]);
    return NextResponse.json({ pagos: pagos.map((p) => ({ ...p, tiene_comprobante: conFoto.has(p.id) })) });
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
  const metodo = body.metodo;
  if (!metodo) {
    return NextResponse.json({ error: "Falta método de pago" }, { status: 400 });
  }
  // Solo los métodos que hoy se ofrecen: antes se aceptaba cualquier texto, y
  // la tabla de pagos solo admite un conjunto cerrado.
  if (!esMetodoActivo(metodo)) {
    return NextResponse.json({ error: "Ese método de pago no está disponible" }, { status: 400 });
  }
  const moneda = METODOS_ACTIVOS[metodo].moneda;
  const referencia = (body.referencia as string) || `${metodo.toUpperCase()}-${Date.now().toString().slice(-8)}`;

  // Foto opcional del comprobante: una imagen ya reducida por el navegador.
  const comprobante = typeof body.comprobante === "string" ? body.comprobante : null;
  if (comprobante && (!/^data:image\/(jpeg|png|webp);base64,/.test(comprobante) || comprobante.length > MAX_COMPROBANTE)) {
    return NextResponse.json({ error: "La foto del comprobante no es válida o pesa demasiado" }, { status: 400 });
  }

  try {
    return await registrarPago({ usuarioId: u.id, body, tipo, metodo, moneda, referencia, comprobante });
  } catch (e) {
    // Si la base todavía no tiene el método en su restricción (falta correr
    // supabase/migration-006-pagos-metodos.sql), que el alumno vea algo útil
    // y no un error de base de datos.
    const msg = e instanceof Error ? e.message : (e as { message?: string })?.message ?? "";
    if (msg.includes("pagos_metodo_check")) {
      return NextResponse.json(
        { error: "Ese método de pago todavía no está habilitado. Prueba con otro." },
        { status: 503 },
      );
    }
    throw e;
  }
}

async function registrarPago(d: {
  usuarioId: string;
  body: Record<string, unknown>;
  tipo: TipoPago;
  metodo: MetodoActivo;
  moneda: Moneda;
  referencia: string;
  comprobante: string | null;
}) {
  const { usuarioId, body, tipo, metodo, moneda, referencia, comprobante } = d;
  const guardarFoto = async (pagoId: string) => {
    if (comprobante) await guardarComprobante(pagoId, comprobante);
  };

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
      usuario_id: usuarioId,
      tipo: "cambio_facultad",
      plan: null,
      destino_facultad: destino,
      monto: montoCambioFacultadEn(moneda),
      moneda,
      metodo,
      referencia,
    });
    await guardarFoto(pago.id);
    return NextResponse.json({ pago });
  }

  // tipo === "plan"
  const plan = body.plan as "pro" | "premium" | undefined;
  if (!plan) {
    return NextResponse.json({ error: "Falta plan" }, { status: 400 });
  }
  const pago = await crearPago({
    usuario_id: usuarioId,
    tipo: "plan",
    plan,
    monto: montoPlanEn(plan, moneda),
    moneda,
    metodo,
    referencia,
  });
  await guardarFoto(pago.id);
  return NextResponse.json({ pago });
}

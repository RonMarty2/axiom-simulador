import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { construirSimulador } from "@/lib/axiom/simulador-builder";
import { axiomDB } from "@/lib/axiom/db";
import { verifySessionToken, SESSION_COOKIE } from "@/lib/auth";
import type { ConfiguracionSimulacion } from "@/lib/axiom/types";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const config = body.config as ConfiguracionSimulacion | undefined;

    if (!config || !config.modo || !config.universidad || !config.facultad) {
      return NextResponse.json(
        { error: "Faltan campos en config: modo, universidad, facultad" },
        { status: 400 }
      );
    }

    // Resolver usuario: auth real o demo anónimo
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE)?.value;
    const user = token ? await verifySessionToken(token) : null;
    const usuarioId =
      user?.id ?? `anon-${Math.random().toString(36).slice(2, 12)}`;

    const { simulador } = await construirSimulador(config, usuarioId);
    await axiomDB.createSimulador(simulador);

    return NextResponse.json({ simulador });
  } catch (err) {
    console.error("[api/axiom/simulador POST] error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Error creando simulador" },
      { status: 500 }
    );
  }
}

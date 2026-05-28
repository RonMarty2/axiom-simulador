import { NextResponse } from "next/server";
import { construirSimulador } from "@/lib/axiom/simulador-builder";
import { axiomDB } from "@/lib/axiom/db";
import { getCurrentUser } from "@/lib/session";
import { getHistorialUsuario } from "@/lib/data-store";
import {
  esPago,
  categoriaModo,
  inicioSemanaISO,
  LIMITE_SEMANAL_PASADAS,
  LIMITE_SEMANAL_PRONOSTICADAS,
} from "@/lib/plan";
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

    const user = await getCurrentUser();
    const usuarioId = user?.id ?? `anon-${Math.random().toString(36).slice(2, 12)}`;

    // ── Candado freemium ──────────────────────────────────────────────────────
    // Los usuarios de pago no tienen límites. A los gratis (y a quien crea sin
    // cuenta) se les aplican las reglas del modelo.
    if (!esPago(user?.plan)) {
      const cat = categoriaModo(config.modo);

      // Funciones exclusivas de pago.
      if (cat === "ia") {
        return NextResponse.json(
          { error: "Los simulacros generados con IA son parte del plan Premium.", upgrade: true },
          { status: 402 }
        );
      }
      if (cat === "errores") {
        return NextResponse.json(
          { error: "La práctica enfocada en tus errores es parte del plan Premium.", upgrade: true },
          { status: 402 }
        );
      }

      // Límites semanales para usuarios registrados gratis.
      if (user) {
        const historial = await getHistorialUsuario(user.id);
        const desde = inicioSemanaISO();
        const estaSemana = historial.filter((h) => h.fecha >= desde);
        const usadasPasadas = estaSemana.filter((h) => categoriaModo(h.modo) === "pasada").length;
        const usadasPron = estaSemana.filter((h) => categoriaModo(h.modo) === "pronosticada").length;

        if (cat === "pasada" && usadasPasadas >= LIMITE_SEMANAL_PASADAS) {
          return NextResponse.json(
            {
              error: `Ya usaste tus ${LIMITE_SEMANAL_PASADAS} simulacros de exámenes pasados de esta semana. Pásate a Premium para simulacros ilimitados.`,
              upgrade: true,
            },
            { status: 402 }
          );
        }
        if (cat === "pronosticada" && usadasPron >= LIMITE_SEMANAL_PRONOSTICADAS) {
          return NextResponse.json(
            {
              error: `Ya usaste tus ${LIMITE_SEMANAL_PRONOSTICADAS} simulacros inteligentes de esta semana. Pásate a Premium para simulacros ilimitados.`,
              upgrade: true,
            },
            { status: 402 }
          );
        }
      }
    }

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

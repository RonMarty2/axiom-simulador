import { NextRequest, NextResponse } from "next/server";
import { axiomDB } from "@/lib/axiom/db";

interface DesgloceData {
  matematicas: number;
  economicas: number;
  verbal: number;
}

interface HistorialItem {
  id: string;
  fecha: string;
  nota: number;
  desglose: DesgloceData | null;
}

interface ProgresoResponse {
  total_simulaciones: number;
  nota_promedio: number;
  mejor_nota: number;
  peor_nota: number;
  ultimas_notas: number[];
  historial: HistorialItem[];
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const usuarioId = req.nextUrl.searchParams.get("usuario_id") || "demo-user";

    const simuladores = await axiomDB.getSimuladoresByUsuario(usuarioId);
    const notas: number[] = simuladores.map((s) => s.nota_final || 0);

    const progreso: ProgresoResponse = {
      total_simulaciones: simuladores.length,
      nota_promedio:
        notas.length > 0
          ? Math.round((notas.reduce((a, b) => a + b, 0) / notas.length) * 100) / 100
          : 0,
      mejor_nota: notas.length > 0 ? Math.max(...notas) : 0,
      peor_nota: notas.length > 0 ? Math.min(...notas) : 0,
      ultimas_notas: notas.slice(-5),
      historial: simuladores.map((s) => ({
        id: s.id,
        fecha: s.fecha_inicio,
        nota: s.nota_final || 0,
        desglose: s.desglose
          ? {
              matematicas: (s.desglose.matematicas as number) || 0,
              economicas: (s.desglose.economicas as number) || 0,
              verbal: (s.desglose.verbal as number) || 0,
            }
          : null,
      })),
    };

    return NextResponse.json(progreso);
  } catch (error) {
    console.error("Error fetching progress statistics:", error);
    return NextResponse.json(
      { error: "Failed to fetch progress" },
      { status: 500 }
    );
  }
}

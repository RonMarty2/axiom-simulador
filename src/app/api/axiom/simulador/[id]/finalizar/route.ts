import { NextResponse } from "next/server";
import { axiomDB } from "@/lib/axiom/db";
import { cargarExamen } from "@/lib/axiom/banco-loader";
import { evaluarSimulador } from "@/lib/axiom/simulador-builder";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const simulador = await axiomDB.getSimulador(id);
  if (!simulador) {
    return NextResponse.json({ error: "Simulador no encontrado" }, { status: 404 });
  }
  if (simulador.estado === "calificado") {
    return NextResponse.json({ simulador });
  }

  // Si vino de un examen real, cargar ponderacion del banco
  let examenOrigen;
  if (simulador.config?.modo === "examen_real" && simulador.config.anio) {
    const examenId = [
      simulador.config.universidad,
      simulador.config.facultad,
      simulador.config.anio,
    ]
      .map((s) => String(s).toLowerCase().replace(/\s+/g, "-"))
      .join("-");
    examenOrigen = (await cargarExamen(examenId)) ?? undefined;
  }

  const resultado = evaluarSimulador(simulador, examenOrigen);

  await axiomDB.updateSimulador(id, {
    estado: "calificado",
    fecha_fin: new Date().toISOString(),
    nota_final: resultado.nota_final,
    desglose: resultado.desglose,
    tiempo_usado_segundos: resultado.tiempo_usado_segundos,
  });

  const actualizado = await axiomDB.getSimulador(id);
  return NextResponse.json({ simulador: actualizado, evaluacion: resultado });
}

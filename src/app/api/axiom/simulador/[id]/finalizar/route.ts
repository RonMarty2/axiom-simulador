import { NextResponse } from "next/server";
import { axiomDB } from "@/lib/axiom/db";
import { cargarExamen } from "@/lib/axiom/banco-loader";
import { evaluarSimulador } from "@/lib/axiom/simulador-builder";
import { agregarHistorial, getUsuario, getHistorialUsuario, type FacultadId } from "@/lib/data-store";

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

  // Agregar al historial del usuario si está logueado
  const usuarioId = simulador.usuario_id;
  if (usuarioId && !usuarioId.startsWith("anon-")) {
    const usuario = await getUsuario(usuarioId);
    if (usuario && simulador.config) {
      await agregarHistorial({
        usuario_id: usuarioId,
        facultad: simulador.config.facultad as FacultadId,
        modo: simulador.config.modo,
        anio_examen: simulador.config.anio,
        tema: simulador.config.tema,
        nota: resultado.nota_final,
        correctas: resultado.correctas,
        incorrectas: resultado.incorrectas,
        sin_responder: resultado.sin_responder,
        tiempo_segundos: resultado.tiempo_usado_segundos,
        desglose: resultado.desglose,
      });

      // Actualizar stats del usuario
      const historial = await getHistorialUsuario(usuarioId);
      usuario.examenes_completados = historial.length;
      usuario.mejor_nota = Math.max(...historial.map((h) => h.nota));
      usuario.nota_promedio = Math.round(historial.reduce((s, h) => s + h.nota, 0) / historial.length);
    }
  }

  const actualizado = await axiomDB.getSimulador(id);
  return NextResponse.json({ simulador: actualizado, evaluacion: resultado });
}

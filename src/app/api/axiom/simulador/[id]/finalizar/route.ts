import { NextResponse } from "next/server";
import { axiomDB } from "@/lib/axiom/db";
import { cargarExamen } from "@/lib/axiom/banco-loader";
import { evaluarSimulador } from "@/lib/axiom/simulador-builder";
import { guardarErroresFallados } from "@/lib/axiom/errores-db";
import { agregarHistorial, getUsuario, getHistorialUsuario, actualizarUsuario, type FacultadId } from "@/lib/data-store";
import type { Simulador } from "@/lib/axiom/types";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Intentar leer del store. Si la lambda no lo tiene (serverless), aceptar
  // el simulador completo desde el body (cliente lo manda desde localStorage).
  let simulador = await axiomDB.getSimulador(id);
  let bodyCliente: { simulador?: Simulador } = {};
  try {
    bodyCliente = await req.json();
  } catch {
    // body opcional
  }
  if (!simulador && bodyCliente.simulador) {
    simulador = bodyCliente.simulador;
    await axiomDB.createSimulador(simulador);
  }
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

  // Guardar los errores del usuario (para "Mis errores" y práctica enfocada).
  const usuarioId = simulador.usuario_id;
  if (usuarioId && !usuarioId.startsWith("anon-")) {
    try {
      await guardarErroresFallados(
        usuarioId,
        simulador.preguntas ?? [],
        simulador.respuestas_usuario ?? {},
        simulador.id
      );
    } catch (e) {
      console.warn("[finalizar] no se pudieron guardar errores:", e);
    }
  }

  // Agregar al historial del usuario si está logueado
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

      // Actualizar stats del usuario (y PERSISTIRLAS en la base).
      const historial = await getHistorialUsuario(usuarioId);
      await actualizarUsuario(usuarioId, {
        examenes_completados: historial.length,
        mejor_nota: historial.length ? Math.max(...historial.map((h) => h.nota)) : 0,
        nota_promedio: historial.length
          ? Math.round(historial.reduce((s, h) => s + h.nota, 0) / historial.length)
          : 0,
      });
    }
  }

  const actualizado = await axiomDB.getSimulador(id);
  return NextResponse.json({ simulador: actualizado, evaluacion: resultado });
}

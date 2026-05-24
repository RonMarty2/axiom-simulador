import { NextResponse } from "next/server";
import { axiomDB } from "@/lib/axiom/db";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const simulador = await axiomDB.getSimulador(id);
  if (!simulador) {
    return NextResponse.json({ error: "Simulador no encontrado" }, { status: 404 });
  }
  return NextResponse.json({ simulador });
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  // En serverless puede no estar en memoria. Si viene body.simulador, lo
  // recreamos para que el PATCH no falle entre lambdas.
  let simulador = await axiomDB.getSimulador(id);
  if (!simulador && body.simulador) {
    simulador = body.simulador;
    await axiomDB.createSimulador(simulador!);
  }
  if (!simulador) {
    return NextResponse.json({ error: "Simulador no encontrado" }, { status: 404 });
  }
  if (simulador.estado !== "activo") {
    return NextResponse.json(
      { error: "El simulador ya fue finalizado" },
      { status: 400 }
    );
  }

  // Registrar respuesta
  if (typeof body.pregunta_id === "string" && typeof body.respuesta === "string") {
    simulador.respuestas_usuario = {
      ...simulador.respuestas_usuario,
      [body.pregunta_id]: body.respuesta,
    };
  }

  // Limpiar respuesta (deseleccionar)
  if (typeof body.limpiar_pregunta_id === "string") {
    const next = { ...simulador.respuestas_usuario };
    delete next[body.limpiar_pregunta_id];
    simulador.respuestas_usuario = next;
  }

  // Toggle marcada
  if (typeof body.toggle_marcada === "string") {
    const set = new Set(simulador.marcadas ?? []);
    if (set.has(body.toggle_marcada)) set.delete(body.toggle_marcada);
    else set.add(body.toggle_marcada);
    simulador.marcadas = Array.from(set);
  }

  await axiomDB.updateSimulador(id, simulador);
  return NextResponse.json({ simulador });
}

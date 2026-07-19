import { NextResponse } from "next/server";
import { cargarExamen } from "@/lib/axiom/banco-loader";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const examen = await cargarExamen(id);
    if (!examen) {
      return NextResponse.json({ error: "Examen no encontrado" }, { status: 404 });
    }

    // La respuesta correcta y la explicación paso a paso son gratis para
    // cualquier usuario (con o sin plan pago) — no hay gating acá.
    return NextResponse.json({ examen });
  } catch (error) {
    console.error(`[api/axiom/examenes/${id}] error:`, error);
    return NextResponse.json(
      { error: "Error cargando examen" },
      { status: 500 }
    );
  }
}

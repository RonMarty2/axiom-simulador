import { NextResponse } from "next/server";
import { cargarExamen } from "@/lib/axiom/banco-loader";
import { getCurrentUser } from "@/lib/session";
import { puedeVerResolucionBiblioteca } from "@/lib/plan";

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

    // Gating premium: respuestas correctas y explicaciones son contenido pago.
    // Sin login o sin plan premium devolvemos el examen SIN ellas (las preguntas
    // y opciones siguen visibles, como preview). El frontend ya muestra el banner
    // "actualizá a premium" basándose en el plan del usuario.
    const user = await getCurrentUser();
    const esPremium = !!user && puedeVerResolucionBiblioteca(user.plan);

    if (!esPremium) {
      const examenLimpio = {
        ...examen,
        preguntas: examen.preguntas.map((p) => ({
          ...p,
          respuesta_correcta: "",
          explicacion: undefined,
        })),
      };
      return NextResponse.json({ examen: examenLimpio, premium_requerido: true });
    }

    return NextResponse.json({ examen });
  } catch (error) {
    console.error(`[api/axiom/examenes/${id}] error:`, error);
    return NextResponse.json(
      { error: "Error cargando examen" },
      { status: 500 }
    );
  }
}

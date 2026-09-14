import { NextResponse } from "next/server";
import { cargarExamen } from "@/lib/axiom/banco-loader";
import { getCurrentUser } from "@/lib/session";
import { puedeVerResolucionBiblioteca } from "@/lib/plan";
import type { PreguntaBanco } from "@/lib/axiom/types";

// Saca la solución de una pregunta dejando el enunciado y las opciones.
// El examen se sigue pudiendo ojear (es el catálogo, y es lo que engancha);
// lo que se cobra es la respuesta y el paso a paso.
function sinSolucion(p: PreguntaBanco): PreguntaBanco {
  return { ...p, respuesta_correcta: "", explicacion: undefined };
}

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

    // Por qué se filtra acá y no en la pantalla: antes esta ruta devolvía el
    // examen entero sin mirar la sesión, así que los 140 exámenes resueltos
    // se bajaban con un curl sin login. Esconderlo solo en el cliente no
    // sirve: la respuesta del fetch se lee igual desde el navegador.
    const usuario = await getCurrentUser();
    if (puedeVerResolucionBiblioteca(usuario?.plan)) {
      return NextResponse.json({ examen, resolucion_bloqueada: false });
    }

    return NextResponse.json({
      examen: { ...examen, preguntas: examen.preguntas.map(sinSolucion) },
      resolucion_bloqueada: true,
    });
  } catch (error) {
    console.error(`[api/axiom/examenes/${id}] error:`, error);
    return NextResponse.json(
      { error: "Error cargando examen" },
      { status: 500 }
    );
  }
}

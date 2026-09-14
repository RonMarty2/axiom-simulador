import { NextResponse } from "next/server";
import { listarMetadata } from "@/lib/axiom/banco-loader";
import { getCurrentUser } from "@/lib/session";

// El banco tiene los exámenes de TODAS las carreras juntos (139 de Ingeniería
// contra 1 de Económicas hoy). Si se devuelve entero, al alumno de Económicas
// su único examen se le pierde entre 139 que no le sirven. Se filtra por la
// facultad que eligió: cada carrera tiene su propio examen de admisión y solo
// le corresponde el suyo.
//
// Va en el servidor y no en la pantalla para no mandarle al celular un JSON
// con 140 exámenes cuando va a mostrar uno.
export async function GET() {
  try {
    const todos = await listarMetadata();
    const usuario = await getCurrentUser();
    const facultad = usuario?.facultad_objetivo ?? null;

    // Sin sesión (o sin carrera elegida todavía) no hay con qué filtrar: se
    // devuelve el banco completo, que es como se muestra públicamente.
    const examenes = facultad ? todos.filter((e) => e.facultad === facultad) : todos;

    return NextResponse.json({ examenes, facultad, total_banco: todos.length });
  } catch (error) {
    console.error("[api/axiom/examenes] error:", error);
    return NextResponse.json(
      { error: "Error cargando banco de examenes" },
      { status: 500 }
    );
  }
}

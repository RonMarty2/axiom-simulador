import { NextRequest, NextResponse } from "next/server";
import { getFacultades, actualizarFacultad } from "@/lib/data-store";
import { listarMetadata } from "@/lib/axiom/banco-loader";
import { isAdmin } from "@/lib/session";

export async function GET() {
  const facultades = await getFacultades();

  // Cuántos exámenes tiene cada una. La landing anuncia las cuatro facultades,
  // pero hoy Medicina y Derecho no tienen ninguno: el alumno elegía su
  // facultad y caía en un simulador vacío, sin ningún aviso. Con este dato la
  // UI puede marcarlas como "Próximamente" — y se corrige solo el día que se
  // carguen exámenes, sin tocar código.
  let porFacultad: Record<string, number> = {};
  try {
    for (const e of await listarMetadata()) {
      porFacultad[e.facultad] = (porFacultad[e.facultad] ?? 0) + 1;
    }
  } catch {
    // Si el banco no se puede leer, se prefiere no marcar nada como pendiente
    // antes que marcar todo por error.
    porFacultad = {};
  }

  return NextResponse.json({
    facultades: facultades.map((f) => ({ ...f, examenes: porFacultad[f.id] ?? 0 })),
  });
}

// Editar las secciones (áreas) y sus pesos de una facultad. Solo admin.
export async function PATCH(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Solo admin" }, { status: 403 });
  }
  try {
    const body = await req.json();
    const { id, areas, ponderacion } = body as {
      id?: string;
      areas?: string[];
      ponderacion?: Record<string, number>;
    };
    if (!id) {
      return NextResponse.json({ error: "Falta el id de la facultad" }, { status: 400 });
    }
    const updates: { areas?: string[]; ponderacion?: Record<string, number> } = {};
    if (Array.isArray(areas)) {
      updates.areas = areas.map((a) => String(a).trim()).filter(Boolean);
    }
    if (ponderacion && typeof ponderacion === "object") {
      updates.ponderacion = ponderacion;
    }
    const actualizada = await actualizarFacultad(id, updates);
    if (!actualizada) {
      return NextResponse.json({ error: "Facultad no encontrada" }, { status: 404 });
    }
    return NextResponse.json({ facultad: actualizada });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Error actualizando facultad" },
      { status: 400 }
    );
  }
}

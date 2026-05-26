import { NextRequest, NextResponse } from "next/server";
import { getFacultades, actualizarFacultad } from "@/lib/data-store";
import { isAdmin } from "@/lib/session";

export async function GET() {
  const facultades = await getFacultades();
  return NextResponse.json({ facultades });
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

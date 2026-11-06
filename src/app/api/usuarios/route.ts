import { NextResponse } from "next/server";
import { getUsuarios } from "@/lib/data-store";
import { getCurrentUser } from "@/lib/session";
import { nombrePublico } from "@/lib/apodo";

// Endpoint público (lo consume el ranking). Hay alumnos menores: NO sale el
// nombre real, ni el id, ni el plan (decisión de Ronald, 6-nov-2026). Cada uno
// aparece con su apodo o como "Alumno anónimo". `es_tu` marca la fila propia.
// Para el listado admin, usar /api/admin/usuarios (protegido).
export async function GET() {
  const [usuarios, yo] = await Promise.all([getUsuarios(), getCurrentUser().catch(() => null)]);
  return NextResponse.json({
    usuarios: usuarios.map((u) => ({
      nombre: nombrePublico(u.apodo),
      es_tu: !!yo && yo.id === u.id,
      facultad_objetivo: u.facultad_objetivo,
      avatar_color: u.avatar_color,
      examenes_completados: u.examenes_completados,
      mejor_nota: u.mejor_nota,
      nota_promedio: u.nota_promedio,
    })),
  });
}

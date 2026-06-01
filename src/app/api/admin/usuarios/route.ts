import { NextResponse } from "next/server";
import { getUsuarios } from "@/lib/data-store";
import { isAdmin } from "@/lib/session";

// Endpoint admin: devuelve usuarios CON email (necesario para identificar
// usuarios desde el panel de admin y pagos). Protegido con isAdmin.
export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Solo admin" }, { status: 403 });
  }
  const usuarios = await getUsuarios();
  return NextResponse.json({
    usuarios: usuarios.map((u) => ({
      id: u.id,
      nombre: u.nombre,
      email: u.email,
      facultad_objetivo: u.facultad_objetivo,
      plan: u.plan,
      avatar_color: u.avatar_color,
      examenes_completados: u.examenes_completados,
      mejor_nota: u.mejor_nota,
      nota_promedio: u.nota_promedio,
    })),
  });
}

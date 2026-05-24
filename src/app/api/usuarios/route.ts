import { NextResponse } from "next/server";
import { getUsuarios } from "@/lib/data-store";

export async function GET() {
  const usuarios = await getUsuarios();
  // Devolver lista pública (sin datos sensibles)
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

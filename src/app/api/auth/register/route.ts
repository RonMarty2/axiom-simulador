import { NextRequest, NextResponse } from "next/server";
import { crearUsuario, getUsuarioByEmail, type FacultadId } from "@/lib/data-store";
import { setUserSession, clearSession } from "@/lib/session";

const COLORES = ["#a855f7", "#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#06b6d4", "#ec4899", "#8b5cf6"];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nombre, email, facultad_objetivo } = body as {
      nombre?: string;
      email?: string;
      facultad_objetivo?: FacultadId;
    };

    if (!nombre || !email || !facultad_objetivo) {
      return NextResponse.json(
        { error: "Faltan campos: nombre, email, facultad_objetivo" },
        { status: 400 }
      );
    }

    const existente = await getUsuarioByEmail(email);
    if (existente) {
      return NextResponse.json({ error: "Ya existe un usuario con ese email" }, { status: 409 });
    }

    const nuevo = await crearUsuario({
      nombre,
      email,
      facultad_objetivo,
      plan: "gratis",
      fecha_registro: new Date().toISOString().slice(0, 10),
      avatar_color: COLORES[Math.floor(Math.random() * COLORES.length)],
    });

    await clearSession();
    await setUserSession(nuevo.id);
    return NextResponse.json({ ok: true, usuario: nuevo });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Error en registro" },
      { status: 500 }
    );
  }
}

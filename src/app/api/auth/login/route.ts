import { NextRequest, NextResponse } from "next/server";
import { getUsuario, getUsuarioByEmail } from "@/lib/data-store";
import { setUserSession, setAdminSession, clearSession } from "@/lib/session";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin1234";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, email, adminPassword } = body as {
      userId?: string;
      email?: string;
      adminPassword?: string;
    };

    // Login como admin
    if (adminPassword) {
      if (adminPassword !== ADMIN_PASSWORD) {
        return NextResponse.json({ error: "Contraseña de admin incorrecta" }, { status: 401 });
      }
      await clearSession();
      await setAdminSession();
      return NextResponse.json({ ok: true, role: "admin" });
    }

    // Login con ID o email
    let usuario = null;
    if (userId) usuario = await getUsuario(userId);
    else if (email) usuario = await getUsuarioByEmail(email);

    if (!usuario) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    await clearSession();
    await setUserSession(usuario.id);
    return NextResponse.json({ ok: true, usuario });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Error en login" },
      { status: 500 }
    );
  }
}

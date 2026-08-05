import { NextRequest, NextResponse } from "next/server";
import { DUENO_EMAIL, esAdminEmail, setSessionCookie, clearAllSessions } from "@/lib/session";
import { crearUsuario, getUsuarioByEmail } from "@/lib/data-store";

// ─────────────────────────────────────────────────────────────
// LOGIN MAESTRO — acceso directo con contraseña, sin pasar por Google.
//
// Pensado para Ronald (dueño del producto): funciona en producción (a
// diferencia de /api/auth/dev-login, que solo existe en local), da acceso
// admin + tester completo (cambio libre de facultad y de plan), y no
// depende de que el flujo de OAuth de Google ande bien en el celular/app.
//
// Requiere la env var MASTER_LOGIN_PASSWORD configurada en Vercel. Si no
// está configurada, este endpoint queda inutilizable (falla siempre) —
// nunca hay una contraseña por defecto.
// ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const configurada = process.env.MASTER_LOGIN_PASSWORD;
  if (!configurada) {
    return NextResponse.json({ error: "Login maestro no configurado" }, { status: 503 });
  }

  const body = await req.json().catch(() => null);
  const password = body?.password;
  if (typeof password !== "string" || password !== configurada) {
    return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 401 });
  }

  let usuario = await getUsuarioByEmail(DUENO_EMAIL);
  if (!usuario) {
    usuario = await crearUsuario({
      nombre: "Ronald",
      email: DUENO_EMAIL,
      facultad_objetivo: "ingenieria",
      plan: "gratis",
      fecha_registro: new Date().toISOString().slice(0, 10),
      avatar_color: "#6366f1",
    });
  }

  await clearAllSessions();
  await setSessionCookie({
    id: usuario.id,
    email: usuario.email,
    nombre: usuario.nombre,
    rol: esAdminEmail(usuario.email) ? "admin" : "estudiante",
  });

  return NextResponse.json({ ok: true });
}

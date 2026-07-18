import { NextRequest, NextResponse } from "next/server";
import {
  ES_DEV, DEV_ADMIN_EMAIL, DEV_TESTER_EMAIL, DEV_ESTUDIANTE_EMAIL,
  esAdminEmail, setSessionCookie, clearAllSessions,
} from "@/lib/session";
import { crearUsuario, getUsuarioByEmail } from "@/lib/data-store";

// ─────────────────────────────────────────────────────────────
// LOGIN DE DESARROLLO — SOLO LOCAL
//
// Permite entrar sin Google ni Supabase para previsualizar la app en distintos
// roles. Está COMPLETAMENTE DESACTIVADO en producción: si NODE_ENV es
// "production" (como en Vercel), responde 404 y no hace absolutamente nada.
//
// Uso: /api/auth/dev-login?rol=admin  (o rol=tester, rol=estudiante)
// ─────────────────────────────────────────────────────────────

const COLORES = ["#a855f7", "#3b82f6", "#ef4444", "#10b981", "#f59e0b"];

export async function GET(req: NextRequest) {
  // Candado duro: en producción este endpoint no existe.
  if (!ES_DEV) {
    return NextResponse.json({ error: "No disponible" }, { status: 404 });
  }

  const url = new URL(req.url);
  const proto = req.headers.get("x-forwarded-proto") ?? url.protocol.replace(":", "");
  const host = req.headers.get("host") ?? url.host;
  const baseUrl = `${proto}://${host}`;

  const rol = url.searchParams.get("rol") ?? "estudiante";

  // Mapear el rol pedido a un email canónico + nombre de display.
  let email = DEV_ESTUDIANTE_EMAIL;
  let nombre = "Estudiante Prueba";
  if (rol === "admin") {
    email = DEV_ADMIN_EMAIL;
    nombre = "Admin Local";
  } else if (rol === "tester") {
    email = DEV_TESTER_EMAIL;
    nombre = "Ronald (tester)";
  }

  // Permitir también un email arbitrario para casos puntuales.
  const emailParam = url.searchParams.get("email");
  if (emailParam) {
    email = emailParam.toLowerCase();
    nombre = url.searchParams.get("nombre") ?? email.split("@")[0];
  }

  try {
    let usuario = await getUsuarioByEmail(email);
    let esNuevo = false;
    if (!usuario) {
      usuario = await crearUsuario({
        nombre,
        email,
        // Estudiante arranca en Económicas para tener contenido gratis visible.
        facultad_objetivo: rol === "admin" ? null : "economicas",
        plan: "gratis",
        fecha_registro: new Date().toISOString().slice(0, 10),
        avatar_color: COLORES[Math.floor(Math.random() * COLORES.length)],
      });
      esNuevo = true;
    }

    const esAdmin = esAdminEmail(usuario.email);

    await clearAllSessions();
    await setSessionCookie({
      id: usuario.id,
      email: usuario.email,
      nombre: usuario.nombre,
      rol: esAdmin ? "admin" : "estudiante",
    });

    let destino = "/dashboard";
    if (esAdmin) destino = "/admin";
    else if (esNuevo || !usuario.facultad_objetivo) destino = "/dashboard";

    return NextResponse.redirect(`${baseUrl}${destino}`);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.redirect(`${baseUrl}/login?error=${encodeURIComponent("dev-login: " + msg)}`);
  }
}

import { NextRequest, NextResponse } from "next/server";
import { intercambiarCodeGoogle, setSessionCookie, esAdminEmail, clearAllSessions } from "@/lib/session";
import { crearUsuario, getUsuarioByEmail, type FacultadId } from "@/lib/data-store";

const COLORES = ["#a855f7", "#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#06b6d4", "#ec4899", "#8b5cf6"];

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");
  const proto = req.headers.get("x-forwarded-proto") ?? url.protocol.replace(":", "");
  const host = req.headers.get("host") ?? url.host;
  const baseUrl = `${proto}://${host}`;
  const redirectUri = `${baseUrl}/api/auth/callback/google`;

  if (error) {
    return NextResponse.redirect(`${baseUrl}/login?error=${encodeURIComponent(error)}`);
  }
  if (!code) {
    return NextResponse.redirect(`${baseUrl}/login?error=falta_code`);
  }

  try {
    const perfil = await intercambiarCodeGoogle(code, redirectUri);
    if (!perfil) {
      return NextResponse.redirect(`${baseUrl}/login?error=perfil_invalido`);
    }

    // Buscar o crear usuario en el store
    let usuario = await getUsuarioByEmail(perfil.email);
    if (!usuario) {
      usuario = await crearUsuario({
        nombre: perfil.name,
        email: perfil.email,
        facultad_objetivo: "economicas" as FacultadId,
        plan: "gratis",
        fecha_registro: new Date().toISOString().slice(0, 10),
        avatar_color: COLORES[Math.floor(Math.random() * COLORES.length)],
      });
    }

    // Determinar rol
    const esAdmin = esAdminEmail(perfil.email);

    // Limpiar sesiones anteriores
    await clearAllSessions();

    // Crear sesión JWT
    await setSessionCookie({
      id: usuario.id,
      email: usuario.email,
      nombre: usuario.nombre,
      picture: perfil.picture,
      rol: esAdmin ? "admin" : "estudiante",
    });

    // Redirigir según rol
    return NextResponse.redirect(`${baseUrl}${esAdmin ? "/admin" : "/dashboard"}`);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "error";
    return NextResponse.redirect(`${baseUrl}/login?error=${encodeURIComponent(msg)}`);
  }
}

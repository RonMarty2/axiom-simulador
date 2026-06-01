import { NextRequest, NextResponse } from "next/server";
import { intercambiarCodeGoogle, setSessionCookie, esAdminEmail, clearAllSessions } from "@/lib/session";
import { crearUsuario, getUsuarioByEmail } from "@/lib/data-store";

const COLORES = ["#a855f7", "#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#06b6d4", "#ec4899", "#8b5cf6"];
const OAUTH_STATE_COOKIE = "axiom_oauth_state";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
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

  // Validación anti-CSRF: comparar state de la URL contra el guardado en cookie
  // por el endpoint /api/auth/google. Si no matchea, alguien intentó completar
  // un login en nombre de otro (login CSRF / session fixation).
  const cookieState = req.cookies.get(OAUTH_STATE_COOKIE)?.value;
  if (!state || !cookieState || state !== cookieState) {
    const res = NextResponse.redirect(`${baseUrl}/login?error=state_invalido`);
    res.cookies.delete(OAUTH_STATE_COOKIE);
    return res;
  }

  try {
    const perfil = await intercambiarCodeGoogle(code, redirectUri);
    if (!perfil) {
      return NextResponse.redirect(`${baseUrl}/login?error=perfil_invalido`);
    }

    // Buscar o crear usuario en el store. Si es nuevo, NO asignamos facultad —
    // el primer login lo manda a /onboarding para elegir.
    let usuario = await getUsuarioByEmail(perfil.email);
    let esNuevo = false;
    if (!usuario) {
      usuario = await crearUsuario({
        nombre: perfil.name,
        email: perfil.email,
        facultad_objetivo: null,
        plan: "gratis",
        fecha_registro: new Date().toISOString().slice(0, 10),
        avatar_color: COLORES[Math.floor(Math.random() * COLORES.length)],
      });
      esNuevo = true;
    }

    const esAdmin = esAdminEmail(perfil.email);

    await clearAllSessions();
    await setSessionCookie({
      id: usuario.id,
      email: usuario.email,
      nombre: usuario.nombre,
      picture: perfil.picture,
      rol: esAdmin ? "admin" : "estudiante",
    });

    // Redirección:
    //  - Admin → siempre al panel admin
    //  - Estudiante sin facultad → onboarding
    //  - Estudiante con facultad → dashboard
    let destino = "/dashboard";
    if (esAdmin) destino = "/admin";
    else if (esNuevo || !usuario.facultad_objetivo) destino = "/onboarding";

    return NextResponse.redirect(`${baseUrl}${destino}`);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "error";
    return NextResponse.redirect(`${baseUrl}/login?error=${encodeURIComponent(msg)}`);
  }
}

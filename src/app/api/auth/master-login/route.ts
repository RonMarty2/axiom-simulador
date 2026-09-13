import { timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { DUENO_EMAIL, setSessionCookie, clearAllSessions } from "@/lib/session";
import { crearUsuario, getUsuarioByEmail } from "@/lib/data-store";
import { consultarLimite, registrarFallo, limpiarLimite, ipDe } from "@/lib/rate-limit";

// Compara sin filtrar por tiempo. Con === la comparación corta en el primer
// carácter distinto, y medir esa diferencia permite adivinar la contraseña
// carácter por carácter en vez de probar todas las combinaciones.
function igualSinFiltrarTiempo(a: string, b: string): boolean {
  const ba = Buffer.from(a, "utf8");
  const bb = Buffer.from(b, "utf8");
  // timingSafeEqual exige el mismo largo; comparar largos no filtra nada útil.
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}

// ─────────────────────────────────────────────────────────────
// LOGIN MAESTRO — acceso directo con contraseña, sin pasar por Google.
//
// Pensado para Ronald (dueño del producto): funciona en producción (a
// diferencia de /api/auth/dev-login, que solo existe en local), y no
// depende de que el flujo de OAuth de Google ande bien en el celular/app.
// Entra SIEMPRE como estudiante con permisos de tester — ve la app tal cual
// la ve un cliente real (Aprende, Láminas, Practicar, exámenes), con el
// extra de poder cambiar de facultad y de plan libremente desde su menú. No
// entra como admin — el panel de backend es otra cosa, se accede aparte.
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

  // Antes este endpoint aceptaba intentos ilimitados: era cuestión de tiempo
  // sentarse a probar contraseñas contra la cuenta del dueño.
  const clave = `master:${ipDe(req)}`;
  const limite = consultarLimite(clave);
  if (!limite.permitido) {
    return NextResponse.json(
      { error: `Demasiados intentos. Probá de nuevo en ${Math.ceil(limite.esperaSegundos / 60)} minutos.` },
      { status: 429, headers: { "Retry-After": String(limite.esperaSegundos) } },
    );
  }

  const body = await req.json().catch(() => null);
  const password = body?.password;
  if (typeof password !== "string" || !igualSinFiltrarTiempo(password, configurada)) {
    const tras = registrarFallo(clave);
    return NextResponse.json(
      {
        error: tras.permitido
          ? `Contraseña incorrecta. Te quedan ${tras.restantes} intentos.`
          : `Demasiados intentos. Probá de nuevo en ${Math.ceil(tras.esperaSegundos / 60)} minutos.`,
      },
      { status: tras.permitido ? 401 : 429 },
    );
  }

  limpiarLimite(clave);

  try {
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
      rol: "estudiante",
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    // Los errores de Supabase (PostgrestError) no son instancias de Error —
    // e.message no existe ahí. Mismo problema ya resuelto en el callback de
    // Google (ver ese archivo); acá faltaba el mismo manejo.
    let msg = "error desconocido";
    if (e instanceof Error) msg = e.message;
    else if (e && typeof e === "object" && "message" in e && typeof (e as { message: unknown }).message === "string") {
      msg = (e as { message: string }).message;
    } else if (typeof e === "string") msg = e;
    console.error("[AXIOM] master-login falló:", e);
    return NextResponse.json({ error: `No se pudo entrar: ${msg}` }, { status: 500 });
  }
}

// Sistema de sesión real con JWT (jose) + Google OAuth.
// Reemplaza session-mock pero mantiene compatibilidad: si no hay JWT,
// busca cookie axiom_uid (modo demo) para no romper logins de prueba.

import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { getUsuario, getUsuarioByEmail, crearUsuario, getSuscripcionesActivas, type Usuario, type FacultadId } from "@/lib/data-store";

// El plan se DERIVA de las suscripciones: el usuario es "premium" si tiene una
// suscripción activa para la facultad que tiene seleccionada (facultad_objetivo).
// Cada facultad es un producto mensual independiente. Se adjuntan también todas
// las suscripciones activas para el selector del header.
async function aplicarSuscripciones(usuario: Usuario): Promise<Usuario> {
  const subs = await getSuscripcionesActivas(usuario.id);
  usuario.suscripciones = subs;
  const activa = subs.find((s) => s.facultad === usuario.facultad_objetivo);
  usuario.plan = activa ? "premium" : "gratis";
  usuario.plan_vence = activa?.vence ?? null;
  return usuario;
}

export const SESSION_COOKIE = "axiom_session";
export const LEGACY_COOKIE = "axiom_uid";
export const LEGACY_ADMIN_COOKIE = "axiom_admin";
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 días

export type Rol = "estudiante" | "admin" | "docente";

export interface SessionUser {
  id: string;
  email: string;
  nombre: string;
  picture?: string;
  rol: Rol;
}

// En desarrollo local (npm run dev) permitimos correr sin configurar nada:
// hay un secret fijo y emails de rol predefinidos. NADA de esto aplica en
// producción (Vercel corre con NODE_ENV=production), donde se exigen las env
// vars reales. Esto habilita el "login de desarrollo" sin Google ni Supabase.
export const ES_DEV = process.env.NODE_ENV !== "production";

// Emails canónicos del login de desarrollo. Cada uno mapea a un rol para poder
// alternar entre Admin / Estudiante / etc. sin tocar variables de entorno.
export const DEV_ADMIN_EMAIL = "admin@local.dev";
export const DEV_TESTER_EMAIL = "tester@local.dev";
export const DEV_ESTUDIANTE_EMAIL = "estudiante@local.dev";

function getSecret(): Uint8Array {
  const value = process.env.AUTH_SECRET;
  if (!value || value.length < 16) {
    if (ES_DEV) {
      // Secret fijo SOLO para desarrollo local. Nunca se usa en producción.
      return new TextEncoder().encode("axiom-dev-only-insecure-secret-no-usar-en-prod");
    }
    throw new Error("AUTH_SECRET no configurada (mínimo 32 caracteres aleatorios)");
  }
  return new TextEncoder().encode(value);
}

function obtenerAdminEmails(): string[] {
  const base = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  // En dev, el email de admin del login de desarrollo siempre es admin.
  if (ES_DEV && !base.includes(DEV_ADMIN_EMAIL)) base.push(DEV_ADMIN_EMAIL);
  return base;
}

export function esAdminEmail(email: string): boolean {
  return obtenerAdminEmails().includes(email.toLowerCase());
}

// Cuentas de prueba: usuarios normales (no admin) que tienen permiso para
// alternar su plan entre Gratis y Premium para probar el flujo libremente.
// Se definen en la variable de entorno TESTER_EMAILS (separadas por coma).
function obtenerTesterEmails(): string[] {
  const base = (process.env.TESTER_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  // En dev, el email "tester" del login de desarrollo siempre es tester.
  if (ES_DEV && !base.includes(DEV_TESTER_EMAIL)) base.push(DEV_TESTER_EMAIL);
  return base;
}

export function esTesterEmail(email: string): boolean {
  return obtenerTesterEmails().includes(email.toLowerCase());
}

export async function isTester(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return false;
  const session = await verificarTokenSesion(token);
  return !!(session && esTesterEmail(session.email));
}

// Cuentas con permiso de CAMBIO LIBRE DE FACULTAD: usuarios normales (no admin)
// que pueden alternar su facultad_objetivo sin pasar por el checkout. Útil para
// el dueño del producto que quiere recorrer cada facultad COMO ESTUDIANTE
// (manteniendo plan gratis/premium real, banners, restricciones) pero sin
// pagar varias veces. Se definen en la env var FREE_FACULTY_CHANGE_EMAILS.
// IMPORTANTE: NO da poderes admin (panel admin, toggle plan test, etc.). Solo
// saltea la verificación REQUIERE_PAGO al cambiar facultad.
function obtenerCambioFacultadLibreEmails(): string[] {
  const base = (process.env.FREE_FACULTY_CHANGE_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  // En dev, el email "tester" también puede cambiar de facultad libremente,
  // para poder recorrer todas las carreras como estudiante.
  if (ES_DEV && !base.includes(DEV_TESTER_EMAIL)) base.push(DEV_TESTER_EMAIL);
  return base;
}

export function esCambioFacultadLibreEmail(email: string): boolean {
  return obtenerCambioFacultadLibreEmails().includes(email.toLowerCase());
}

// Quién puede cambiar de facultad SIN pagar (para probar el contenido):
//   - los admins (ADMIN_EMAILS),
//   - los testers (TESTER_EMAILS) — acá entra rnd261190@gmail.com,
//   - y cualquier email extra en FREE_FACULTY_CHANGE_EMAILS.
// Todos ellos siguen viendo la app como estudiante (plan real, banners, etc.);
// solo se les levanta el cobro al cambiar de carrera. Nadie más.
export function puedeCambiarFacultadLibreEmail(email: string): boolean {
  return esAdminEmail(email) || esTesterEmail(email) || esCambioFacultadLibreEmail(email);
}

export async function puedeCambiarFacultadLibre(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return false;
  const session = await verificarTokenSesion(token);
  return !!(session && puedeCambiarFacultadLibreEmail(session.email));
}

// ─────────────────────────────────────────────────────────────
// JWT firma / verifica
// ─────────────────────────────────────────────────────────────

export async function crearTokenSesion(user: SessionUser): Promise<string> {
  return new SignJWT({ user })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(getSecret());
}

export async function verificarTokenSesion(token: string): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return (payload as { user: SessionUser }).user;
  } catch {
    return null;
  }
}

// ─────────────────────────────────────────────────────────────
// API pública
// ─────────────────────────────────────────────────────────────

export async function getCurrentUser(): Promise<Usuario | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;

  // Modo real: JWT
  if (token) {
    const session = await verificarTokenSesion(token);
    if (session) {
      // Buscar/crear usuario en el store
      let usuario = await getUsuarioByEmail(session.email);
      if (!usuario) {
        usuario = await crearUsuario({
          nombre: session.nombre,
          email: session.email,
          facultad_objetivo: "economicas" as FacultadId,
          plan: "gratis",
          fecha_registro: new Date().toISOString().slice(0, 10),
          avatar_color: "#6366f1",
        });
      }
      return aplicarSuscripciones(usuario);
    }
  }

  // Cookies legacy (axiom_uid) ya NO se aceptan: permitían suplantar a cualquier
  // usuario poniendo su id en la cookie. El login real usa JWT (axiom_session).
  // Si el usuario tenía una cookie residual, se ignora y queda como no logueado.

  return null;
}

export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;

  // Modo real: ver email en JWT
  if (token) {
    const session = await verificarTokenSesion(token);
    if (session && esAdminEmail(session.email)) return true;
  }

  // Cookie axiom_admin=1 (legacy) ya NO se acepta: era una escalada directa a
  // admin con setear una cookie. Hoy admin se valida solo por JWT + email en
  // ADMIN_EMAILS. Las cookies residuales se borran al hacer clearAllSessions.

  return false;
}

export async function setSessionCookie(user: SessionUser): Promise<void> {
  const token = await crearTokenSesion(user);
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });
}

export async function clearAllSessions(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  store.delete(LEGACY_COOKIE);
  store.delete(LEGACY_ADMIN_COOKIE);
}

// Las funciones setUserSession / setAdminSession y los aliases AXIOM_COOKIE /
// AXIOM_ADMIN_COOKIE fueron ELIMINADOS. Permitían crear sesiones legacy sin
// firma criptográfica, que eran un bypass de auth (cualquiera podía setear
// la cookie con un id ajeno). Hoy la única forma de loguearse es vía Google
// OAuth con JWT firmado (setSessionCookie).

export async function clearSession(): Promise<void> {
  await clearAllSessions();
}

// ─────────────────────────────────────────────────────────────
// Google OAuth helpers
// ─────────────────────────────────────────────────────────────

export function urlAuthGoogle(redirectUri: string, state?: string): string {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID ?? "",
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
    prompt: "select_account",
  });
  // state: token anti-CSRF. El cliente lo genera y lo guarda en cookie httpOnly;
  // al volver del callback debe matchear. Sin esto, un atacante podría inducir
  // al usuario a loguearse con OTRA cuenta Google (login CSRF / session fixation).
  if (state) params.set("state", state);
  return `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
}

export async function intercambiarCodeGoogle(
  code: string,
  redirectUri: string
): Promise<{ id: string; email: string; name: string; picture?: string } | null> {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error("Faltan GOOGLE_CLIENT_ID y GOOGLE_CLIENT_SECRET");
  }

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }),
  });
  if (!tokenRes.ok) return null;
  const tokens = await tokenRes.json();
  if (!tokens.access_token) return null;

  const profileRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
    headers: { Authorization: `Bearer ${tokens.access_token}` },
  });
  if (!profileRes.ok) return null;
  const profile = await profileRes.json();

  // Google nos dice si el email está verificado. Rechazar emails no verificados
  // evita un caso teórico: alguien crea una cuenta Google con email de admin
  // ajeno sin verificarlo y entra como admin (esAdminEmail compara por email).
  if (!profile.email || profile.verified_email === false) {
    return null;
  }

  return {
    id: profile.id,
    email: profile.email,
    name: profile.name,
    picture: profile.picture,
  };
}

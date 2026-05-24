import { SignJWT, jwtVerify } from "jose";

/**
 * 🛡️ Secrets de JWT — DEBEN venir del entorno.
 *
 * Antes había un fallback hardcodeado que estaba publicado en GitHub. Si la
 * env var no se seteaba en producción, el sistema firmaba tokens con un
 * secret conocido por todo el mundo: cualquiera podía falsificar una cookie
 * admin y entrar al panel.
 *
 * Ahora: si las variables faltan, el sistema lanza error explícito en la
 * primera llamada que las use. Es preferible un error visible a una
 * vulnerabilidad silenciosa.
 *
 * En desarrollo local, settear en .env.local:
 *   ADMIN_JWT_SECRET=<32+ chars aleatorios>
 *   AUTH_SECRET=<otros 32+ chars aleatorios>
 *
 * En Vercel, settear las mismas variables en Project Settings → Environment.
 */
function requireSecret(name: "ADMIN_JWT_SECRET" | "AUTH_SECRET"): Uint8Array {
  const value = process.env[name];
  if (!value || value.length < 16) {
    throw new Error(
      `${name} no está configurada (o es demasiado corta). ` +
      `Definila en .env.local (dev) o en las variables de entorno de Vercel (prod) ` +
      `con al menos 32 caracteres aleatorios.`,
    );
  }
  return new TextEncoder().encode(value);
}

// Lazy: se evalúan en el primer uso, no al cargar el módulo, para no
// crashear todo el proceso si una env var falta cuando esa función no se usa.
let _adminSecret: Uint8Array | null = null;
let _sessionSecret: Uint8Array | null = null;
function getAdminSecret(): Uint8Array {
  if (!_adminSecret) _adminSecret = requireSecret("ADMIN_JWT_SECRET");
  return _adminSecret;
}
function getSessionSecret(): Uint8Array {
  if (!_sessionSecret) _sessionSecret = requireSecret("AUTH_SECRET");
  return _sessionSecret;
}

export const SESSION_COOKIE = "lab_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export type UserRole = "admin" | "estudiante" | "docente";
export type UserPlan = "estandar" | "pro" | "elite";

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  picture?: string;
  role: UserRole;
  plan?: UserPlan;
  active: boolean;
}

export function getAdminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdmin(email: string): boolean {
  return getAdminEmails().includes(email.toLowerCase());
}

export async function createSessionToken(user: SessionUser): Promise<string> {
  return new SignJWT({ user })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSessionSecret());
}

export async function verifySessionToken(token: string): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtVerify(token, getSessionSecret());
    return (payload as { user: SessionUser }).user;
  } catch {
    return null;
  }
}

export async function verifyAdminToken(token: string): Promise<boolean> {
  try {
    const { payload } = await jwtVerify(token, getAdminSecret());
    return payload.role === "admin";
  } catch {
    return false;
  }
}

export function buildGoogleAuthUrl(redirectUri: string): string {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID ?? "",
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
    prompt: "select_account",
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
}

export async function exchangeCodeForGoogleProfile(
  code: string,
  redirectUri: string
): Promise<{ id: string; email: string; name: string; picture?: string } | null> {
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID ?? "",
      client_secret: process.env.GOOGLE_CLIENT_SECRET ?? "",
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

  return {
    id: profile.id,
    email: profile.email,
    name: profile.name,
    picture: profile.picture,
  };
}

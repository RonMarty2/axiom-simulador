// Sistema de sesión real con JWT (jose) + Google OAuth.
// Reemplaza session-mock pero mantiene compatibilidad: si no hay JWT,
// busca cookie axiom_uid (modo demo) para no romper logins de prueba.

import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { getUsuario, getUsuarioByEmail, crearUsuario, actualizarUsuario, type Usuario, type FacultadId } from "@/lib/data-store";

// Si el plan de pago ya venció, devuelve al usuario a "gratis" (y lo guarda).
// Centralizado aquí para que todo el sistema lea siempre el plan vigente.
async function aplicarVencimientoPlan(usuario: Usuario): Promise<Usuario> {
  if (usuario.plan === "gratis") return usuario;
  const vence = usuario.plan_vence;
  if (!vence) return usuario; // sin fecha: se trata como acceso permanente
  const hoy = new Date().toISOString().slice(0, 10);
  if (vence >= hoy) return usuario; // todavía vigente
  const actualizado = await actualizarUsuario(usuario.id, { plan: "gratis", plan_vence: null });
  return actualizado ?? { ...usuario, plan: "gratis", plan_vence: null };
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

function getSecret(): Uint8Array {
  const value = process.env.AUTH_SECRET;
  if (!value || value.length < 16) {
    throw new Error("AUTH_SECRET no configurada (mínimo 32 caracteres aleatorios)");
  }
  return new TextEncoder().encode(value);
}

function obtenerAdminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function esAdminEmail(email: string): boolean {
  return obtenerAdminEmails().includes(email.toLowerCase());
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
      return aplicarVencimientoPlan(usuario);
    }
  }

  // Modo demo: cookie legacy axiom_uid (compatibilidad con login mock)
  const legacy = store.get(LEGACY_COOKIE)?.value;
  if (legacy) {
    const u = await getUsuario(legacy);
    return u ? aplicarVencimientoPlan(u) : null;
  }

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

  // Modo demo: cookie axiom_admin
  if (store.get(LEGACY_ADMIN_COOKIE)?.value === "1") return true;

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

// ─────────────────────────────────────────────────────────────
// Legacy / modo DEMO (login mock con cookies simples)
// Se mantienen para no romper el login mock existente.
// ─────────────────────────────────────────────────────────────

export async function setUserSession(userId: string): Promise<void> {
  const store = await cookies();
  store.set(LEGACY_COOKIE, userId, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });
}

export async function setAdminSession(): Promise<void> {
  const store = await cookies();
  store.set(LEGACY_ADMIN_COOKIE, "1", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });
}

export async function clearSession(): Promise<void> {
  await clearAllSessions();
}

// Alias para retrocompatibilidad con código antiguo
export const AXIOM_COOKIE = LEGACY_COOKIE;
export const AXIOM_ADMIN_COOKIE = LEGACY_ADMIN_COOKIE;

// ─────────────────────────────────────────────────────────────
// Google OAuth helpers
// ─────────────────────────────────────────────────────────────

export function urlAuthGoogle(redirectUri: string): string {
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

  return {
    id: profile.id,
    email: profile.email,
    name: profile.name,
    picture: profile.picture,
  };
}

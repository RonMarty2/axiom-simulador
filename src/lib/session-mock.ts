// Sesión simple para Axiom standalone (MVP).
// Cookie httpOnly axiom_uid con el ID del usuario. Sin password real.
// Cuando se conecte auth real (Google OAuth), reemplazar por verifySessionToken.

import { cookies } from "next/headers";
import { getUsuario, type Usuario } from "@/lib/data-store";

export const AXIOM_COOKIE = "axiom_uid";
export const AXIOM_ADMIN_COOKIE = "axiom_admin";
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 días

export async function getCurrentUser(): Promise<Usuario | null> {
  const store = await cookies();
  const uid = store.get(AXIOM_COOKIE)?.value;
  if (!uid) return null;
  return await getUsuario(uid);
}

export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  return store.get(AXIOM_ADMIN_COOKIE)?.value === "1";
}

export async function setUserSession(userId: string): Promise<void> {
  const store = await cookies();
  store.set(AXIOM_COOKIE, userId, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });
}

export async function setAdminSession(): Promise<void> {
  const store = await cookies();
  store.set(AXIOM_ADMIN_COOKIE, "1", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });
}

export async function clearSession(): Promise<void> {
  const store = await cookies();
  store.delete(AXIOM_COOKIE);
  store.delete(AXIOM_ADMIN_COOKIE);
}

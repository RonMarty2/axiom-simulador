// Helpers de autorización para rutas API.
// requireAdmin valida la sesión real (JWT con email en ADMIN_EMAILS, o cookie
// demo axiom_admin). Si no hay admin, lanza AuthError(403) y la ruta responde 403.

import type { SessionUser } from "@/lib/auth";
import { isAdmin, getCurrentUser } from "@/lib/session";

export class AuthError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = "AuthError";
  }
}

export interface AuthResult {
  user: SessionUser;
}

export async function requireAuth(): Promise<AuthResult> {
  const user = await getCurrentUser();
  if (!user) {
    throw new AuthError(401, "No autenticado");
  }
  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.nombre,
      role: "estudiante",
      active: true,
    },
  };
}

export async function requireAdmin(): Promise<AuthResult> {
  if (!(await isAdmin())) {
    throw new AuthError(403, "Se requiere acceso de administrador");
  }
  return {
    user: {
      id: "admin",
      email: "admin@axiom.local",
      name: "Admin",
      role: "admin",
      active: true,
    },
  };
}

// Stub minimo para Axiom standalone.
// En este MVP el admin no tiene login todavia; las rutas /api/admin/*
// quedan accesibles. Cuando se agregue login real, reescribir requireAdmin
// para validar la cookie de sesion admin.

import type { SessionUser } from "@/lib/auth";

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
  // En MVP standalone: usuario anonimo permitido
  return {
    user: {
      id: "anon",
      email: "anon@axiom.local",
      name: "Anonimo",
      role: "estudiante",
      active: true,
    },
  };
}

export async function requireAdmin(): Promise<AuthResult> {
  // TODO: implementar verificacion real de cookie admin_session
  return {
    user: {
      id: "admin-local",
      email: "admin@axiom.local",
      name: "Admin Local",
      role: "admin",
      active: true,
    },
  };
}

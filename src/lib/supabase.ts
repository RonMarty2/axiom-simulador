// Cliente Supabase para Axiom.
//
// Estrategia:
//   - supabaseAdmin: usa SERVICE_ROLE_KEY, solo en server (API routes, server actions).
//     Salta Row Level Security. Usar para writes y reads protegidos.
//   - supabasePublic: usa ANON_KEY (publishable), seguro para browser.
//     Solo si quieres leer datos publicos directo desde React. Por ahora no lo
//     necesitamos: todo va via API routes con supabaseAdmin.
//
// Si las env vars no estan configuradas, las funciones lanzan error claro
// pero el modulo no crashea al cargar (importante para builds en CI).

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

let _admin: SupabaseClient | null = null;
let _public: SupabaseClient | null = null;

export function supabaseAdmin(): SupabaseClient {
  if (_admin) return _admin;
  if (!URL || !SERVICE_KEY) {
    throw new Error(
      "Supabase no configurado. Falta NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY."
    );
  }
  _admin = createClient(URL, SERVICE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return _admin;
}

export function supabasePublic(): SupabaseClient {
  if (_public) return _public;
  if (!URL || !ANON_KEY) {
    throw new Error(
      "Supabase no configurado. Falta NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
  }
  _public = createClient(URL, ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return _public;
}

export function supabaseConfigurado(): boolean {
  return !!(URL && SERVICE_KEY);
}

// Aviso defensivo: si en producción falta Supabase, la app caería en modo
// memoria y perdería usuarios/pagos silenciosamente. Gritamos en los logs
// para que el deploy quede marcado como ROTO en Vercel y no pase desapercibido.
if (process.env.NODE_ENV === "production" && !(URL && SERVICE_KEY)) {
  console.error(
    "[AXIOM] ⚠️ FALTA SUPABASE EN PRODUCCIÓN — los datos NO se guardan. " +
      "Configurá NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY en Vercel."
  );
}

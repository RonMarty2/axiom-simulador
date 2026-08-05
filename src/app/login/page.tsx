"use client";

import { Suspense, type CSSProperties } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function devBtn(color: string): CSSProperties {
  return {
    display: "block", padding: "11px 14px", textAlign: "center",
    background: `${color}15`, border: `1px solid ${color}`, borderRadius: 10,
    color, textDecoration: "none", fontWeight: 700, fontSize: 13.5,
  };
}

function LoginContent() {
  const params = useSearchParams();
  const error = params.get("error");

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 440, background: "var(--bg-card)", borderRadius: 20, padding: 40, boxShadow: "var(--shadow-lg)" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>⚡</div>
          <h1 className="font-crimson" style={{ fontSize: 32, fontWeight: 800, color: "var(--fg-primary)", marginBottom: 8 }}>
            Entrar a Axiom
          </h1>
          <p style={{ color: "var(--fg-muted)", fontSize: 15 }}>
            Simulador de exámenes UMSS
          </p>
        </div>

        <a
          href="/api/auth/google"
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
            width: "100%", padding: "16px 20px",
            background: "white", color: "#1f2937",
            border: "1px solid var(--border)", borderRadius: 14,
            textDecoration: "none", fontWeight: 700, fontSize: 16,
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            transition: "transform 0.15s ease, box-shadow 0.15s ease",
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continuar con Google
        </a>

        {error && (
          <div style={{ marginTop: 16, padding: 12, background: "rgba(239,68,68,0.08)", borderRadius: 10, color: "#b91c1c", fontSize: 13, textAlign: "center" }}>
            ⚠️ No se pudo iniciar sesión: {error}
          </div>
        )}

        {/* Panel de desarrollo: SOLO aparece en local (npm run dev). En Vercel
            producción NODE_ENV es "production" y este bloque no se renderiza. */}
        {process.env.NODE_ENV !== "production" && (
          <div style={{ marginTop: 24, padding: 16, background: "rgba(245,158,11,0.08)", border: "1px dashed #f59e0b", borderRadius: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: "#d97706", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>
              🛠️ Solo desarrollo local
            </div>
            <div style={{ fontSize: 12.5, color: "var(--fg-muted)", marginBottom: 12, lineHeight: 1.5 }}>
              Entrá sin Google para previsualizar. No aparece en producción.
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <a href="/api/auth/dev-login?rol=estudiante" style={devBtn("#3b82f6")}>
                👤 Entrar como Estudiante (plan gratis)
              </a>
              <a href="/api/auth/dev-login?rol=tester" style={devBtn("#10b981")}>
                🎓 Entrar como Ronald (tester + cambio libre)
              </a>
              <a href="/api/auth/dev-login?rol=admin" style={devBtn("#a855f7")}>
                ⚡ Entrar como Super Admin
              </a>
            </div>
          </div>
        )}

        <p style={{ marginTop: 22, textAlign: "center", fontSize: 13, color: "var(--fg-muted)", lineHeight: 1.5 }}>
          Al entrar se crea tu cuenta automáticamente.<br/>
          Empiezas con plan <strong>Gratis</strong> (2 simulacros al mes).
        </p>

        <div style={{ marginTop: 28, textAlign: "center" }}>
          <Link href="/" style={{ color: "var(--fg-muted)", fontSize: 13, textDecoration: "none" }}>
            ← Volver al inicio
          </Link>
        </div>

        {/* Link discreto al acceso directo (/login/master) — necesario porque
            dentro de la app Android (Custom Tab, sin dirección editable) no
            hay otra forma de llegar ahí tocando la pantalla. Chico y apagado
            a propósito: no es para promocionar, es para que vos lo encuentres. */}
        <div style={{ marginTop: 14, textAlign: "center" }}>
          <Link href="/login/master" style={{ color: "var(--fg-muted)", fontSize: 11, textDecoration: "none", opacity: 0.4, padding: 8, display: "inline-block" }}>
            acceso interno
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div style={{ padding: 40, textAlign: "center" }}>Cargando…</div>}>
      <LoginContent />
    </Suspense>
  );
}

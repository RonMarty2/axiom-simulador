"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Facultad } from "@/lib/data-store";

export default function RegisterPage() {
  const router = useRouter();
  const [facultades, setFacultades] = useState<Facultad[]>([]);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [facultadObjetivo, setFacultadObjetivo] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/facultades")
      .then((r) => r.json())
      .then((d) => setFacultades(d.facultades ?? []))
      .catch(() => setFacultades([]));
  }, []);

  const registrar = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, facultad_objetivo: facultadObjetivo }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error");
      router.push("/dashboard");
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 480, background: "var(--bg-card)", borderRadius: 20, padding: 32, boxShadow: "var(--shadow-lg)" }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🎓</div>
          <h1 className="font-crimson" style={{ fontSize: 28, fontWeight: 700, color: "var(--fg-primary)", marginBottom: 6 }}>
            Crear cuenta
          </h1>
          <p style={{ color: "var(--fg-muted)", fontSize: 14 }}>Empieza gratis con 2 exámenes al mes</p>
        </div>

        <a
          href="/api/auth/google"
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            width: "100%", padding: "14px 18px", marginBottom: 20,
            background: "white", color: "#1f2937",
            border: "1px solid var(--border)", borderRadius: 12,
            textDecoration: "none", fontWeight: 700, fontSize: 15,
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          Crear cuenta con Google
        </a>

        <div style={{ position: "relative", textAlign: "center", margin: "0 0 16px" }}>
          <hr style={{ border: 0, borderTop: "1px solid var(--border)" }} />
          <span style={{ position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)", background: "var(--bg-card)", padding: "0 12px", fontSize: 11, color: "var(--fg-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            o cuenta demo
          </span>
        </div>

        <div style={{ display: "grid", gap: 14 }}>
          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6, color: "var(--fg-primary)" }}>
              Nombre completo
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ana López"
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid var(--border)",
                fontSize: 14,
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6, color: "var(--fg-primary)" }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid var(--border)",
                fontSize: 14,
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 8, color: "var(--fg-primary)" }}>
              ¿A qué facultad postulas?
            </label>
            <div style={{ display: "grid", gap: 8 }}>
              {facultades.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFacultadObjetivo(f.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: 12,
                    border: facultadObjetivo === f.id ? `2px solid ${f.color}` : "1px solid var(--border)",
                    background: facultadObjetivo === f.id ? `${f.color}15` : "transparent",
                    borderRadius: 10,
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span style={{ fontSize: 24 }}>{f.emoji}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "var(--fg-primary)" }}>{f.nombre_corto}</div>
                    <div style={{ fontSize: 11, color: "var(--fg-muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {f.descripcion.slice(0, 80)}{f.descripcion.length > 80 ? "…" : ""}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div style={{ padding: 10, background: "rgba(239,68,68,0.1)", borderRadius: 8, color: "#b91c1c", fontSize: 13 }}>
              ⚠️ {error}
            </div>
          )}

          <button
            onClick={registrar}
            disabled={!nombre || !email || !facultadObjetivo || loading}
            style={{
              width: "100%",
              padding: "14px",
              background: !nombre || !email || !facultadObjetivo ? "var(--bg-subtle)" : "var(--accent)",
              color: !nombre || !email || !facultadObjetivo ? "var(--fg-muted)" : "white",
              border: "none",
              borderRadius: 10,
              fontWeight: 700,
              fontSize: 15,
              cursor: !nombre || !email || !facultadObjetivo ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Creando cuenta..." : "🚀 Crear cuenta y empezar"}
          </button>
        </div>

        <div style={{ marginTop: 20, textAlign: "center", fontSize: 13, color: "var(--fg-muted)" }}>
          ¿Ya tienes cuenta? <Link href="/login" style={{ color: "var(--accent)", fontWeight: 600 }}>Entra aquí</Link>
        </div>

        <div style={{ marginTop: 16, textAlign: "center" }}>
          <Link href="/" style={{ color: "var(--fg-muted)", fontSize: 13, textDecoration: "none" }}>
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

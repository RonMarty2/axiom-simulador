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

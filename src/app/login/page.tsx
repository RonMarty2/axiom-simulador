"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Usuario } from "@/lib/data-store";

export default function LoginPage() {
  const router = useRouter();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [modo, setModo] = useState<"usuario" | "admin">("usuario");
  const [seleccionado, setSeleccionado] = useState<string>("");
  const [emailLibre, setEmailLibre] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/usuarios")
      .then((r) => r.json())
      .then((d) => setUsuarios(d.usuarios ?? []))
      .catch(() => setUsuarios([]));
  }, []);

  const entrarComoUsuario = async (idOEmail: string, esEmail = false) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(esEmail ? { email: idOEmail } : { userId: idOEmail }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error");
      router.push("/dashboard");
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setLoading(false);
    }
  };

  const entrarComoAdmin = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error");
      router.push("/admin");
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 480, background: "var(--bg-card)", borderRadius: 20, padding: 32, boxShadow: "var(--shadow-lg)" }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>⚡</div>
          <h1 className="font-crimson" style={{ fontSize: 28, fontWeight: 700, color: "var(--fg-primary)", marginBottom: 6 }}>
            Entrar a Axiom
          </h1>
          <p style={{ color: "var(--fg-muted)", fontSize: 14 }}>Simulador de exámenes UMSS</p>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 24, background: "var(--bg-subtle)", padding: 4, borderRadius: 10 }}>
          <button
            onClick={() => setModo("usuario")}
            style={{
              flex: 1,
              padding: "10px 12px",
              border: "none",
              borderRadius: 8,
              background: modo === "usuario" ? "var(--accent)" : "transparent",
              color: modo === "usuario" ? "white" : "var(--fg-primary)",
              fontWeight: 600,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            👨‍🎓 Estudiante
          </button>
          <button
            onClick={() => setModo("admin")}
            style={{
              flex: 1,
              padding: "10px 12px",
              border: "none",
              borderRadius: 8,
              background: modo === "admin" ? "var(--accent)" : "transparent",
              color: modo === "admin" ? "white" : "var(--fg-primary)",
              fontWeight: 600,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            ⚡ Admin
          </button>
        </div>

        {modo === "usuario" && (
          <div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 8, color: "var(--fg-primary)" }}>
                Entrar con email
              </label>
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  type="email"
                  value={emailLibre}
                  onChange={(e) => setEmailLibre(e.target.value)}
                  placeholder="tu@email.com"
                  style={{
                    flex: 1,
                    padding: "10px 12px",
                    borderRadius: 8,
                    border: "1px solid var(--border)",
                    fontSize: 14,
                  }}
                />
                <button
                  onClick={() => entrarComoUsuario(emailLibre, true)}
                  disabled={!emailLibre || loading}
                  style={{
                    padding: "10px 20px",
                    background: "var(--accent)",
                    color: "white",
                    border: "none",
                    borderRadius: 8,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Entrar
                </button>
              </div>
            </div>

            <div style={{ position: "relative", textAlign: "center", margin: "20px 0" }}>
              <hr style={{ border: 0, borderTop: "1px solid var(--border)" }} />
              <span style={{ position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)", background: "var(--bg-card)", padding: "0 12px", fontSize: 12, color: "var(--fg-muted)" }}>
                o entra rápido con un usuario de prueba
              </span>
            </div>

            <div style={{ maxHeight: 240, overflowY: "auto", display: "grid", gap: 6 }}>
              {usuarios.slice(0, 8).map((u) => (
                <button
                  key={u.id}
                  onClick={() => entrarComoUsuario(u.id)}
                  disabled={loading}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: 10,
                    background: "transparent",
                    border: "1px solid var(--border)",
                    borderRadius: 10,
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%", background: u.avatar_color,
                    color: "white", display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 700, fontSize: 14,
                  }}>
                    {u.nombre.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "var(--fg-primary)" }}>{u.nombre}</div>
                    <div style={{ fontSize: 12, color: "var(--fg-muted)" }}>{u.facultad_objetivo} · {u.plan}</div>
                  </div>
                </button>
              ))}
            </div>

            <div style={{ marginTop: 20, textAlign: "center", fontSize: 13, color: "var(--fg-muted)" }}>
              ¿No tienes cuenta? <Link href="/register" style={{ color: "var(--accent)", fontWeight: 600 }}>Crea una</Link>
            </div>
          </div>
        )}

        {modo === "admin" && (
          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 8, color: "var(--fg-primary)" }}>
              Contraseña de administrador
            </label>
            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              placeholder="••••••••"
              onKeyDown={(e) => e.key === "Enter" && entrarComoAdmin()}
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: 8,
                border: "1px solid var(--border)",
                fontSize: 14,
                marginBottom: 12,
              }}
            />
            <button
              onClick={entrarComoAdmin}
              disabled={!adminPassword || loading}
              style={{
                width: "100%",
                padding: "12px",
                background: "var(--accent)",
                color: "white",
                border: "none",
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              Entrar al panel admin
            </button>
            <p style={{ fontSize: 12, color: "var(--fg-muted)", marginTop: 10, textAlign: "center" }}>
              💡 Tip de prueba: la contraseña por defecto es <code style={{ background: "var(--bg-subtle)", padding: "2px 6px", borderRadius: 4 }}>admin1234</code>
            </p>
          </div>
        )}

        {error && (
          <div style={{ marginTop: 16, padding: 10, background: "rgba(239,68,68,0.1)", borderRadius: 8, color: "#b91c1c", fontSize: 13 }}>
            ⚠️ {error}
          </div>
        )}

        <div style={{ marginTop: 24, textAlign: "center" }}>
          <Link href="/" style={{ color: "var(--fg-muted)", fontSize: 13, textDecoration: "none" }}>
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

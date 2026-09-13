"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Icono from "../../components/Icono";

// Acceso directo para Ronald — no está linkeado desde ningún lado de la app
// a propósito (no es el login público). Ver /api/auth/master-login.
export default function MasterLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  async function entrar(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setCargando(true);
    try {
      const res = await fetch("/api/auth/master-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "No se pudo entrar");
        setCargando(false);
        return;
      }
      router.push("/dashboard");
    } catch {
      setError("Error de conexión");
      setCargando(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <form onSubmit={entrar} style={{ width: "100%", maxWidth: 360, background: "var(--bg-card)", borderRadius: 20, padding: 32, boxShadow: "var(--shadow-lg)" }}>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 8, color: "var(--accent)" }}>
            <Icono nombre="rayo" tamano={34} grosor={1.7} />
          </div>
          <h1 className="font-crimson" style={{ fontSize: 22, fontWeight: 800, color: "var(--fg-primary)" }}>
            Acceso directo
          </h1>
        </div>

        <input
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          style={{
            width: "100%", padding: "12px 14px", borderRadius: 10,
            border: "1px solid var(--border)", fontSize: 15, marginBottom: 12,
            background: "var(--bg-base)", color: "var(--fg-primary)",
          }}
        />

        <button
          type="submit"
          disabled={cargando || !password}
          style={{
            width: "100%", padding: "12px 14px", borderRadius: 10, border: "none",
            background: "var(--accent)", color: "white", fontWeight: 700, fontSize: 15,
            cursor: cargando ? "default" : "pointer", opacity: cargando ? 0.7 : 1,
          }}
        >
          {cargando ? "Entrando…" : "Entrar"}
        </button>

        {error && (
          <div style={{ marginTop: 12, padding: 10, background: "rgba(239,68,68,0.08)", borderRadius: 8, color: "#b91c1c", fontSize: 13, textAlign: "center" }}>
            {error}
          </div>
        )}
      </form>
    </div>
  );
}

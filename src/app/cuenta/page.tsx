"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AppHeader from "../components/AppHeader";
import type { Usuario, Pago, Facultad } from "@/lib/data-store";

export default function CuentaPage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [pagos, setPagos] = useState<Pago[]>([]);
  const [facultades, setFacultades] = useState<Facultad[]>([]);
  const [loading, setLoading] = useState(true);
  const [cambiandoFacultad, setCambiandoFacultad] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/auth/me").then((r) => r.json()),
      fetch("/api/pagos").then((r) => r.json()).catch(() => ({ pagos: [] })),
      fetch("/api/facultades").then((r) => r.json()),
    ]).then(([me, p, f]) => {
      if (!me.usuario) { router.push("/login"); return; }
      setUsuario(me.usuario);
      setPagos(p.pagos ?? []);
      setFacultades(f.facultades ?? []);
      setLoading(false);
    });
  }, [router]);

  const cambiarFacultad = async (nuevaId: string) => {
    if (!usuario || nuevaId === usuario.facultad_objetivo) return;
    if (!confirm("¿Cambiar tu facultad? Tus prácticas pasadas se mantienen pero los simulacros futuros serán de la nueva carrera.")) return;
    setCambiandoFacultad(true);
    const r = await fetch("/api/perfil/facultad", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ facultad: nuevaId }),
    });
    if (r.ok) {
      const data = await r.json();
      setUsuario(data.usuario);
    }
    setCambiandoFacultad(false);
  };

  if (loading || !usuario) return <div style={{ padding: 40, textAlign: "center" }}>Cargando...</div>;

  return (
    <div style={{ minHeight: "100vh" }}>
      <AppHeader />
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px" }}>
        <h1 className="font-crimson" style={{ fontSize: 32, fontWeight: 800, color: "var(--fg-primary)", marginBottom: 28 }}>Mi cuenta</h1>

        <div style={{ background: "var(--bg-card)", borderRadius: 14, padding: 24, border: "1px solid var(--border)", marginBottom: 20, display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: usuario.avatar_color, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 28 }}>
            {usuario.nombre.split(" ").map((n) => n[0]).join("").slice(0, 2)}
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: "var(--fg-primary)" }}>{usuario.nombre}</h2>
            <p style={{ fontSize: 14, color: "var(--fg-muted)" }}>{usuario.email}</p>
            <p style={{ fontSize: 13, color: "var(--fg-muted)", marginTop: 4 }}>Postulando a <strong style={{ color: "var(--accent)", textTransform: "capitalize" }}>{usuario.facultad_objetivo}</strong></p>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ display: "inline-block", padding: "6px 14px", background: usuario.plan === "premium" ? "#fbbf24" : usuario.plan === "pro" ? "#a78bfa" : "var(--bg-subtle)", color: usuario.plan === "gratis" ? "var(--fg-muted)" : "#1e1b4b", borderRadius: 999, fontSize: 13, fontWeight: 800, textTransform: "uppercase", marginBottom: 8 }}>{usuario.plan}</div>
            <div>
              <Link href="/precios" style={{ fontSize: 13, color: "var(--accent)", textDecoration: "none", fontWeight: 700 }}>
                {usuario.plan === "premium" ? "Tu plan actual" : "Mejorar plan →"}
              </Link>
            </div>
          </div>
        </div>

        {/* Facultad objetivo (cambiable) */}
        <div style={{ background: "var(--bg-card)", borderRadius: 14, padding: 24, border: "1px solid var(--border)", marginBottom: 20 }}>
          <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--fg-primary)", marginBottom: 6 }}>🎓 Tu facultad objetivo</h3>
          <p style={{ fontSize: 13, color: "var(--fg-muted)", marginBottom: 14 }}>
            La plataforma se enfoca en esta carrera. Cambiarla afecta tus simulacros futuros (no los pasados).
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10 }}>
            {facultades.map((f) => {
              const activa = usuario.facultad_objetivo === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => cambiarFacultad(f.id)}
                  disabled={cambiandoFacultad || activa}
                  style={{
                    display: "flex", alignItems: "center", gap: 10, padding: 14,
                    border: activa ? `2px solid ${f.color}` : "1px solid var(--border)",
                    background: activa ? `${f.color}10` : "transparent",
                    borderRadius: 10, textAlign: "left",
                    cursor: activa ? "default" : "pointer",
                    opacity: cambiandoFacultad && !activa ? 0.5 : 1,
                  }}
                >
                  <span style={{ fontSize: 26 }}>{f.emoji}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "var(--fg-primary)" }}>{f.nombre_corto}</div>
                    {activa && <div style={{ fontSize: 10, fontWeight: 700, color: f.color, textTransform: "uppercase" }}>✓ Tu carrera</div>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--fg-primary)", marginTop: 28, marginBottom: 12 }}>Historial de pagos</h3>
        <div style={{ background: "var(--bg-card)", borderRadius: 14, border: "1px solid var(--border)", overflow: "hidden" }}>
          {pagos.length === 0 ? (
            <div style={{ padding: 30, textAlign: "center", color: "var(--fg-muted)", fontSize: 14 }}>
              No tienes pagos aún. <Link href="/precios" style={{ color: "var(--accent)" }}>Ver planes</Link>
            </div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ background: "var(--bg-subtle)" }}>
                  <th style={{ padding: "10px 14px", textAlign: "left", fontSize: 11, color: "var(--fg-muted)", fontWeight: 700, textTransform: "uppercase" }}>Fecha</th>
                  <th style={{ padding: "10px 14px", textAlign: "left", fontSize: 11, color: "var(--fg-muted)", fontWeight: 700, textTransform: "uppercase" }}>Plan</th>
                  <th style={{ padding: "10px 14px", textAlign: "left", fontSize: 11, color: "var(--fg-muted)", fontWeight: 700, textTransform: "uppercase" }}>Método</th>
                  <th style={{ padding: "10px 14px", textAlign: "right", fontSize: 11, color: "var(--fg-muted)", fontWeight: 700, textTransform: "uppercase" }}>Monto</th>
                  <th style={{ padding: "10px 14px", textAlign: "center", fontSize: 11, color: "var(--fg-muted)", fontWeight: 700, textTransform: "uppercase" }}>Estado</th>
                </tr>
              </thead>
              <tbody>
                {pagos.map((p) => (
                  <tr key={p.id} style={{ borderTop: "1px solid var(--border)" }}>
                    <td style={{ padding: "10px 14px" }}>{new Date(p.fecha).toLocaleDateString("es-BO")}</td>
                    <td style={{ padding: "10px 14px", textTransform: "capitalize" }}>{p.plan}</td>
                    <td style={{ padding: "10px 14px" }}>{p.metodo.replace("_", " ")}</td>
                    <td style={{ padding: "10px 14px", textAlign: "right", fontWeight: 700 }}>Bs. {p.monto}</td>
                    <td style={{ padding: "10px 14px", textAlign: "center" }}>
                      <span style={{ display: "inline-block", padding: "3px 10px", background: p.estado === "aprobado" ? "#10b98115" : p.estado === "pendiente" ? "#f59e0b15" : "#ef444415", color: p.estado === "aprobado" ? "#059669" : p.estado === "pendiente" ? "#d97706" : "#dc2626", borderRadius: 999, fontSize: 11, fontWeight: 700, textTransform: "uppercase" }}>{p.estado}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

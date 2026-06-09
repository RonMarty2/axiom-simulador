"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AppHeader from "../components/AppHeader";
import type { Usuario, Pago, Facultad } from "@/lib/data-store";

export default function CuentaPage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [esAdmin, setEsAdmin] = useState(false);
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
      setEsAdmin(!!me.admin);
      setPagos(p.pagos ?? []);
      setFacultades(f.facultades ?? []);
      setLoading(false);
    });
  }, [router]);

  const irACambiarFacultad = async (nuevaId: string) => {
    if (!usuario || nuevaId === usuario.facultad_objetivo) return;
    // Admins (ADMIN_EMAILS) cambian directo, sin pasar por checkout.
    if (esAdmin) {
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
      return;
    }
    router.push(`/cambiar-facultad?destino=${nuevaId}`);
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

        {/* Facultad objetivo */}
        <div style={{ background: "var(--bg-card)", borderRadius: 14, padding: 24, border: "1px solid var(--border)", marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8, flexWrap: "wrap", gap: 8 }}>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--fg-primary)" }}>🎓 Tu facultad objetivo</h3>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 10px", background: "rgba(251,191,36,0.15)", color: "#d97706", borderRadius: 999, fontSize: 11, fontWeight: 800 }}>
              🔒 CAMBIO PAGADO
            </span>
          </div>
          <p style={{ fontSize: 13, color: "var(--fg-muted)", marginBottom: 16 }}>
            Cada facultad es un producto separado con su propio temario y precio. Cambiar de carrera requiere comprar el acceso a la nueva. Tu progreso de la carrera actual se mantiene siempre.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10 }}>
            {facultades.map((f) => {
              const activa = usuario.facultad_objetivo === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => irACambiarFacultad(f.id)}
                  disabled={cambiandoFacultad || activa}
                  style={{
                    position: "relative",
                    display: "flex", alignItems: "center", gap: 10, padding: 14,
                    border: activa ? `2px solid ${f.color}` : "1px solid var(--border)",
                    background: activa ? `${f.color}10` : "transparent",
                    borderRadius: 10, textAlign: "left",
                    cursor: activa ? "default" : "pointer",
                  }}
                >
                  <span style={{ fontSize: 26, filter: activa ? "none" : "grayscale(0.4)" }}>{f.emoji}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: activa ? "var(--fg-primary)" : "var(--fg-muted)" }}>{f.nombre_corto}</div>
                    {activa
                      ? <div style={{ fontSize: 10, fontWeight: 700, color: f.color, textTransform: "uppercase" }}>✓ Tu carrera actual</div>
                      : esAdmin
                        ? <div style={{ fontSize: 10, fontWeight: 700, color: "#059669", textTransform: "uppercase" }}>⚡ Cambiar (admin)</div>
                        : <div style={{ fontSize: 10, fontWeight: 700, color: "#d97706", textTransform: "uppercase" }}>🔒 Cambiar (pago)</div>}
                  </div>
                </button>
              );
            })}
          </div>

          <div style={{ marginTop: 16, padding: 14, background: "linear-gradient(135deg, #fbbf24, #f59e0b)", borderRadius: 12, color: "#1e1b4b" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 4 }}>¿Te equivocaste de carrera o quieres cambiar?</div>
                <div style={{ fontSize: 12.5, opacity: 0.85 }}>
                  Compras el acceso a la nueva facultad por una sola vez. Tu progreso actual se conserva.
                </div>
              </div>
              <Link href="/cambiar-facultad" style={{
                padding: "10px 20px", background: "#1e1b4b", color: "#fbbf24",
                textDecoration: "none", borderRadius: 10, fontWeight: 800, fontSize: 13,
                whiteSpace: "nowrap",
              }}>
                Ver opciones de cambio →
              </Link>
            </div>
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

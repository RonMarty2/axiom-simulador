"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AppHeader from "../../components/AppHeader";
import type { Pago } from "@/lib/data-store";

interface UsuarioMini {
  id: string;
  nombre: string;
  email: string;
}

export default function AdminPagos() {
  const router = useRouter();
  const [pagos, setPagos] = useState<Pago[]>([]);
  const [usuariosMap, setUsuariosMap] = useState<Record<string, UsuarioMini>>({});
  const [filtroEstado, setFiltroEstado] = useState<string>("pendiente");
  const [procesando, setProcesando] = useState<string | null>(null);

  const cargar = () => {
    Promise.all([
      fetch("/api/pagos").then((r) => r.json()),
      fetch("/api/usuarios").then((r) => r.json()),
    ]).then(([p, u]) => {
      setPagos(p.pagos ?? []);
      const map: Record<string, UsuarioMini> = {};
      (u.usuarios ?? []).forEach((x: UsuarioMini) => { map[x.id] = x; });
      setUsuariosMap(map);
    });
  };

  useEffect(() => {
    fetch("/api/auth/me").then((r) => r.json()).then((d) => {
      if (!d.admin) { router.push("/login"); return; }
      cargar();
    });
  }, [router]);

  const accionarPago = async (id: string, accion: "aprobar" | "rechazar") => {
    let motivo = "";
    if (accion === "rechazar") {
      motivo = prompt("Motivo del rechazo:") || "Sin motivo";
    }
    setProcesando(id);
    await fetch(`/api/pagos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accion, motivo_rechazo: motivo }),
    });
    cargar();
    setProcesando(null);
  };

  const filtrados = pagos.filter((p) => filtroEstado === "todos" || p.estado === filtroEstado);

  return (
    <div style={{ minHeight: "100vh" }}>
      <AppHeader />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: 24 }}>
          <h1 className="font-crimson" style={{ fontSize: 32, fontWeight: 800, color: "var(--fg-primary)", marginBottom: 4 }}>💳 Pagos</h1>
          <p style={{ color: "var(--fg-muted)" }}>Aprobar o rechazar comprobantes</p>
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
          {["pendiente", "aprobado", "rechazado", "todos"].map((e) => {
            const count = e === "todos" ? pagos.length : pagos.filter((p) => p.estado === e).length;
            return (
              <button key={e} onClick={() => setFiltroEstado(e)} style={{
                padding: "8px 16px", borderRadius: 999, border: filtroEstado === e ? "1px solid var(--accent)" : "1px solid var(--border)",
                background: filtroEstado === e ? "var(--accent)" : "transparent", color: filtroEstado === e ? "white" : "var(--fg-primary)",
                fontWeight: 600, fontSize: 13, cursor: "pointer", textTransform: "capitalize",
              }}>{e} ({count})</button>
            );
          })}
        </div>

        <div style={{ background: "var(--bg-card)", borderRadius: 14, border: "1px solid var(--border)", overflow: "hidden" }}>
          {filtrados.length === 0 ? (
            <div style={{ padding: 40, textAlign: "center", color: "var(--fg-muted)" }}>No hay pagos con este filtro.</div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ background: "var(--bg-subtle)" }}>
                  <th style={th()}>Fecha</th>
                  <th style={th()}>Usuario</th>
                  <th style={th()}>Concepto</th>
                  <th style={th()}>Método</th>
                  <th style={th()}>Comprobante</th>
                  <th style={th()}>Monto</th>
                  <th style={th()}>Estado</th>
                  <th style={th()}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filtrados.map((p) => {
                  const u = usuariosMap[p.usuario_id];
                  return (
                    <tr key={p.id} style={{ borderTop: "1px solid var(--border)" }}>
                      <td style={td()}>{new Date(p.fecha).toLocaleDateString("es-BO", { day: "numeric", month: "short" })}</td>
                      <td style={td()}>
                        {u ? <div><div style={{ fontWeight: 600 }}>{u.nombre}</div><div style={{ fontSize: 12, color: "var(--fg-muted)" }}>{u.email}</div></div> : p.usuario_id}
                      </td>
                      <td style={td()}>
                        {p.tipo === "cambio_facultad" ? (
                          <div>
                            <span style={{ padding: "2px 8px", background: "#fbbf2415", color: "#d97706", borderRadius: 999, fontSize: 10, fontWeight: 800, textTransform: "uppercase" }}>🔄 Cambio facultad</span>
                            <div style={{ fontSize: 11, color: "var(--fg-muted)", marginTop: 4, textTransform: "capitalize" }}>→ {p.destino_facultad ?? "-"}</div>
                          </div>
                        ) : (
                          <span style={{ textTransform: "capitalize", fontWeight: 700, color: p.plan === "premium" ? "#d97706" : "#7c3aed" }}>Plan {p.plan}</span>
                        )}
                      </td>
                      <td style={td()}>{p.metodo.replace("_", " ")}</td>
                      <td style={td()}><code style={{ fontSize: 12, background: "var(--bg-subtle)", padding: "2px 6px", borderRadius: 4 }}>{p.referencia}</code></td>
                      <td style={{ ...td(), fontWeight: 700 }}>Bs. {p.monto}</td>
                      <td style={td()}><span style={{ padding: "3px 10px", borderRadius: 999, fontSize: 11, fontWeight: 700, textTransform: "uppercase", background: p.estado === "aprobado" ? "#10b98115" : p.estado === "pendiente" ? "#f59e0b15" : "#ef444415", color: p.estado === "aprobado" ? "#059669" : p.estado === "pendiente" ? "#d97706" : "#dc2626" }}>{p.estado}</span></td>
                      <td style={td()}>
                        {p.estado === "pendiente" ? (
                          <div style={{ display: "flex", gap: 6 }}>
                            <button disabled={procesando === p.id} onClick={() => accionarPago(p.id, "aprobar")} style={{ padding: "4px 10px", background: "#10b981", color: "white", border: "none", borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>✓ Aprobar</button>
                            <button disabled={procesando === p.id} onClick={() => accionarPago(p.id, "rechazar")} style={{ padding: "4px 10px", background: "#ef4444", color: "white", border: "none", borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>✗ Rechazar</button>
                          </div>
                        ) : (
                          <span style={{ fontSize: 12, color: "var(--fg-muted)" }}>—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

function th(): React.CSSProperties {
  return { padding: "10px 14px", textAlign: "left", fontSize: 11, color: "var(--fg-muted)", fontWeight: 700, textTransform: "uppercase" };
}
function td(): React.CSSProperties {
  return { padding: "10px 14px", color: "var(--fg-primary)" };
}

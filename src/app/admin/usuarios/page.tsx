"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AppHeader from "../../components/AppHeader";

interface UsuarioListado {
  id: string;
  nombre: string;
  email: string;
  facultad_objetivo: string;
  plan: string;
  avatar_color: string;
  examenes_completados: number;
  mejor_nota: number;
  nota_promedio: number;
}

export default function AdminUsuarios() {
  const router = useRouter();
  const [usuarios, setUsuarios] = useState<UsuarioListado[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [filtroPlan, setFiltroPlan] = useState<string>("todos");

  useEffect(() => {
    fetch("/api/auth/me").then((r) => r.json()).then((d) => {
      if (!d.admin) { router.push("/login"); return; }
      fetch("/api/admin/usuarios").then((r) => r.json()).then((u) => setUsuarios(u.usuarios ?? []));
    });
  }, [router]);

  const filtrados = usuarios
    .filter((u) => filtroPlan === "todos" || u.plan === filtroPlan)
    .filter((u) =>
      busqueda === "" ||
      u.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      u.email.toLowerCase().includes(busqueda.toLowerCase())
    );

  return (
    <div style={{ minHeight: "100vh" }}>
      <AppHeader />
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: 24 }}>
          <h1 className="font-crimson" style={{ fontSize: 32, fontWeight: 800, color: "var(--fg-primary)", marginBottom: 4 }}>👥 Usuarios</h1>
          <p style={{ color: "var(--fg-muted)" }}>{usuarios.length} cuentas registradas</p>
        </div>

        {/* Filtros */}
        <div style={{ display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap" }}>
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por nombre o email..."
            style={{ flex: 1, minWidth: 240, padding: "10px 14px", borderRadius: 10, border: "1px solid var(--border)", fontSize: 14 }}
          />
          {["todos", "gratis", "pro", "premium"].map((p) => (
            <button key={p} onClick={() => setFiltroPlan(p)} style={{
              padding: "8px 16px", borderRadius: 999, border: filtroPlan === p ? "1px solid var(--accent)" : "1px solid var(--border)",
              background: filtroPlan === p ? "var(--accent)" : "transparent", color: filtroPlan === p ? "white" : "var(--fg-primary)",
              fontWeight: 600, fontSize: 13, cursor: "pointer", textTransform: "capitalize",
            }}>{p}</button>
          ))}
        </div>

        <div style={{ background: "var(--bg-card)", borderRadius: 14, border: "1px solid var(--border)", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ background: "var(--bg-subtle)" }}>
                <th style={th()}>Usuario</th>
                <th style={th()}>Facultad</th>
                <th style={th()}>Plan</th>
                <th style={th()}>Exámenes</th>
                <th style={th()}>Mejor</th>
                <th style={th()}>Promedio</th>
                <th style={th()}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map((u) => (
                <tr key={u.id} style={{ borderTop: "1px solid var(--border)" }}>
                  <td style={{ padding: "10px 14px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 34, height: 34, borderRadius: "50%", background: u.avatar_color, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 12 }}>
                        {u.nombre.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, color: "var(--fg-primary)" }}>{u.nombre}</div>
                        <div style={{ fontSize: 12, color: "var(--fg-muted)" }}>{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={td()}><span style={{ textTransform: "capitalize" }}>{u.facultad_objetivo}</span></td>
                  <td style={td()}><span style={{ padding: "3px 10px", background: u.plan === "premium" ? "#fbbf24" : u.plan === "pro" ? "#a78bfa" : "var(--bg-subtle)", color: u.plan === "gratis" ? "var(--fg-muted)" : "#1e1b4b", borderRadius: 999, fontSize: 11, fontWeight: 700, textTransform: "uppercase" }}>{u.plan}</span></td>
                  <td style={td()}>{u.examenes_completados}</td>
                  <td style={{ ...td(), fontWeight: 800, color: "#10b981" }}>{u.mejor_nota}</td>
                  <td style={td()}>{u.nota_promedio}</td>
                  <td style={td()}>
                    <button style={{ padding: "4px 10px", background: "transparent", border: "1px solid var(--border)", borderRadius: 6, cursor: "pointer", fontSize: 12 }}>Ver</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

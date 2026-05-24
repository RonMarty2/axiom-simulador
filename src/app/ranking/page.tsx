"use client";

import { useEffect, useState } from "react";
import AppHeader from "../components/AppHeader";

interface UsuarioRanking {
  id: string;
  nombre: string;
  facultad_objetivo: string;
  plan: string;
  avatar_color: string;
  mejor_nota: number;
  nota_promedio: number;
  examenes_completados: number;
}

const FAC_EMOJI: Record<string, string> = { economicas: "📊", ingenieria: "⚙️", medicina: "⚕️", derecho: "⚖️" };

export default function RankingPage() {
  const [usuarios, setUsuarios] = useState<UsuarioRanking[]>([]);
  const [filtroFacultad, setFiltroFacultad] = useState<string>("todas");
  const [orden, setOrden] = useState<"mejor" | "promedio">("mejor");

  useEffect(() => {
    fetch("/api/usuarios").then((r) => r.json()).then((d) => setUsuarios(d.usuarios ?? []));
  }, []);

  const filtrados = usuarios
    .filter((u) => filtroFacultad === "todas" || u.facultad_objetivo === filtroFacultad)
    .sort((a, b) => (orden === "mejor" ? b.mejor_nota - a.mejor_nota : b.nota_promedio - a.nota_promedio));

  const top3 = filtrados.slice(0, 3);
  const restantes = filtrados.slice(3, 20);

  return (
    <div style={{ minHeight: "100vh" }}>
      <AppHeader />
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <h1 className="font-crimson" style={{ fontSize: 36, fontWeight: 800, color: "var(--fg-primary)", marginBottom: 6 }}>🏆 Ranking</h1>
          <p style={{ color: "var(--fg-muted)" }}>Los mejores postulantes de la plataforma</p>
        </div>

        {/* Filtros */}
        <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap", justifyContent: "center" }}>
          {(["todas", "economicas", "ingenieria", "medicina", "derecho"] as const).map((f) => (
            <button key={f} onClick={() => setFiltroFacultad(f)} style={{
              padding: "8px 16px", borderRadius: 999, border: filtroFacultad === f ? "1px solid var(--accent)" : "1px solid var(--border)",
              background: filtroFacultad === f ? "var(--accent)" : "transparent", color: filtroFacultad === f ? "white" : "var(--fg-primary)",
              fontWeight: 600, fontSize: 13, cursor: "pointer", textTransform: "capitalize",
            }}>
              {f === "todas" ? "Todas" : `${FAC_EMOJI[f]} ${f}`}
            </button>
          ))}
          <div style={{ width: 1, background: "var(--border)" }} />
          <button onClick={() => setOrden(orden === "mejor" ? "promedio" : "mejor")} style={{ padding: "8px 16px", borderRadius: 999, border: "1px solid var(--border)", background: "var(--bg-card)", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
            Ordenar: {orden === "mejor" ? "Mejor nota" : "Promedio"} ⇄
          </button>
        </div>

        {/* Podios Top 3 */}
        {top3.length >= 3 && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, alignItems: "flex-end", marginBottom: 28 }}>
            <PodioCard usuario={top3[1]} pos={2} altura={180} medalla="🥈" orden={orden} />
            <PodioCard usuario={top3[0]} pos={1} altura={220} medalla="🥇" orden={orden} />
            <PodioCard usuario={top3[2]} pos={3} altura={140} medalla="🥉" orden={orden} />
          </div>
        )}

        {/* Resto */}
        <div style={{ background: "var(--bg-card)", borderRadius: 14, border: "1px solid var(--border)" }}>
          {restantes.map((u, i) => (
            <div key={u.id} style={{ display: "flex", alignItems: "center", padding: 14, gap: 14, borderBottom: i < restantes.length - 1 ? "1px solid var(--border)" : "none" }}>
              <div style={{ width: 30, fontWeight: 800, color: "var(--fg-muted)", fontSize: 14 }}>#{i + 4}</div>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: u.avatar_color, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14 }}>
                {u.nombre.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--fg-primary)" }}>{u.nombre}</div>
                <div style={{ fontSize: 12, color: "var(--fg-muted)" }}>
                  {FAC_EMOJI[u.facultad_objetivo]} {u.facultad_objetivo} · {u.examenes_completados} exámenes
                </div>
              </div>
              <div style={{ fontSize: 22, fontWeight: 800, color: orden === "mejor" ? "#10b981" : "#6366f1" }}>
                {orden === "mejor" ? u.mejor_nota : u.nota_promedio}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PodioCard({ usuario, pos, altura, medalla, orden }: { usuario: UsuarioRanking; pos: number; altura: number; medalla: string; orden: "mejor" | "promedio" }) {
  const nota = orden === "mejor" ? usuario.mejor_nota : usuario.nota_promedio;
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 32, marginBottom: 6 }}>{medalla}</div>
      <div style={{ width: 70, height: 70, margin: "0 auto", borderRadius: "50%", background: usuario.avatar_color, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 22, marginBottom: 8, border: pos === 1 ? "3px solid #fbbf24" : "none" }}>
        {usuario.nombre.split(" ").map((n) => n[0]).join("").slice(0, 2)}
      </div>
      <div style={{ fontSize: 13, fontWeight: 700, color: "var(--fg-primary)", marginBottom: 2 }}>{usuario.nombre}</div>
      <div style={{ fontSize: 11, color: "var(--fg-muted)", marginBottom: 6 }}>{FAC_EMOJI[usuario.facultad_objetivo]} {usuario.facultad_objetivo}</div>
      <div style={{
        background: `linear-gradient(180deg, ${pos === 1 ? "#fbbf24" : pos === 2 ? "#a3a3a3" : "#cd7f32"}, ${pos === 1 ? "#d97706" : pos === 2 ? "#737373" : "#92400e"})`,
        height: altura, borderRadius: "12px 12px 0 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "white",
      }}>
        <div style={{ fontSize: 36, fontWeight: 900 }}>{nota}</div>
        <div style={{ fontSize: 11, opacity: 0.9, fontWeight: 700 }}>{orden === "mejor" ? "MEJOR NOTA" : "PROMEDIO"}</div>
        <div style={{ fontSize: 28, fontWeight: 900, marginTop: 8 }}>#{pos}</div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import AppHeader from "../components/AppHeader";
import Icono, { iconoFacultad, nombreFacultad } from "../components/Icono";

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

function Facultad({ id }: { id: string }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
      <Icono nombre={iconoFacultad(id)} tamano={13} /> {nombreFacultad(id)}
    </span>
  );
}

const COLORES_PODIO = {
  1: {
    borde: "#b45309",
    fondo: "linear-gradient(180deg, #d97706 0%, #92400e 100%)",
    medalla: "#b45309",
    avatarBg: "#1a1f2e",
    avatarBorder: "#f59e0b",
  },
  2: {
    borde: "#64748b",
    fondo: "linear-gradient(180deg, #64748b 0%, #334155 100%)",
    medalla: "#64748b",
    avatarBg: "#1a1f2e",
    avatarBorder: "#94a3b8",
  },
  3: {
    borde: "#9c3d1c",
    fondo: "linear-gradient(180deg, #9c3d1c 0%, #6b240c 100%)",
    medalla: "#9c3d1c",
    avatarBg: "#1a1f2e",
    avatarBorder: "#c2410c",
  },
};

function PodioCard({
  usuario,
  pos,
  altura,
  orden,
}: {
  usuario: UsuarioRanking;
  pos: 1 | 2 | 3;
  altura: number;
  orden: "mejor" | "promedio";
}) {
  const cfg = COLORES_PODIO[pos];
  const nota = orden === "mejor" ? usuario.mejor_nota : usuario.nota_promedio;

  return (
    <div style={{ textAlign: "center", minWidth: 0 }}>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 6, color: cfg.medalla }}>
        <Icono nombre="medalla" tamano={28} grosor={2} />
      </div>

      <div
        style={{
          width: 58,
          height: 58,
          margin: "0 auto 8px",
          borderRadius: "50%",
          background: cfg.avatarBg,
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 800,
          fontSize: 18,
          border: `2.5px solid ${cfg.avatarBorder}`,
          boxShadow: "var(--shadow-sm)",
        }}
      >
        {usuario.nombre
          .split(" ")
          .map((n) => n[0])
          .join("")
          .slice(0, 2)}
      </div>

      <div
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: "var(--fg-primary)",
          marginBottom: 2,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          padding: "0 4px",
        }}
      >
        {usuario.nombre}
      </div>

      <div
        style={{
          fontSize: 11,
          color: "var(--fg-muted)",
          marginBottom: 8,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        <Facultad id={usuario.facultad_objetivo} />
      </div>

      <div
        style={{
          background: cfg.fondo,
          height: altura,
          borderRadius: "14px 14px 0 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ fontSize: 32, fontWeight: 800, lineHeight: 1 }}>{nota}</div>
        <div style={{ fontSize: 10, opacity: 0.85, fontWeight: 700, letterSpacing: "0.04em", marginTop: 4 }}>
          {orden === "mejor" ? "MEJOR NOTA" : "PROMEDIO"}
        </div>
        <div style={{ fontSize: 22, fontWeight: 900, marginTop: 8 }}>#{pos}</div>
      </div>
    </div>
  );
}

export default function RankingPage() {
  const [usuarios, setUsuarios] = useState<UsuarioRanking[]>([]);
  const [filtroFacultad, setFiltroFacultad] = useState<string>("todas");
  const [orden, setOrden] = useState<"mejor" | "promedio">("mejor");

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        if (d.usuario?.facultad_objetivo) setFiltroFacultad(d.usuario.facultad_objetivo);
      });
    fetch("/api/usuarios")
      .then((r) => r.json())
      .then((d) => setUsuarios(d.usuarios ?? []));
  }, []);

  const filtrados = usuarios
    .filter((u) => filtroFacultad === "todas" || u.facultad_objetivo === filtroFacultad)
    .sort((a, b) =>
      orden === "mejor" ? b.mejor_nota - a.mejor_nota : b.nota_promedio - a.nota_promedio
    );

  const top3 = filtrados.slice(0, 3);
  const restantes = filtrados.slice(3, 20);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)" }}>
      <AppHeader />
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 20px 100px" }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <h1
            className="font-crimson"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              fontSize: 36,
              fontWeight: 800,
              color: "var(--fg-primary)",
              marginBottom: 6,
            }}
          >
            <Icono nombre="ranking" tamano={30} /> Ranking Oficial
          </h1>
          <p style={{ color: "var(--fg-muted)", fontSize: 15 }}>
            Los mejores puntajes medidos en exámenes reales de la UMSS
          </p>
        </div>

        {/* Filtros */}
        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 28,
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {(["todas", "economicas", "ingenieria", "medicina", "derecho"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFiltroFacultad(f)}
              style={{
                padding: "8px 16px",
                borderRadius: 999,
                border:
                  filtroFacultad === f
                    ? "1.5px solid var(--accent)"
                    : "1px solid var(--border)",
                background: filtroFacultad === f ? "var(--accent)" : "var(--bg-card)",
                color: filtroFacultad === f ? "white" : "var(--fg-primary)",
                fontWeight: 600,
                fontSize: 13,
                cursor: "pointer",
                textTransform: "capitalize",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              {f === "todas" ? "Todas" : <Facultad id={f} />}
            </button>
          ))}

          <button
            onClick={() => setOrden(orden === "mejor" ? "promedio" : "mejor")}
            style={{
              padding: "8px 16px",
              borderRadius: 999,
              border: "1px solid var(--border)",
              background: "var(--bg-card)",
              fontWeight: 600,
              fontSize: 13,
              cursor: "pointer",
              color: "var(--fg-secondary)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            Ordenar: {orden === "mejor" ? "Mejor nota" : "Promedio"} ⇄
          </button>
        </div>

        {/* Podios Top 3 */}
        {top3.length >= 3 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 10,
              alignItems: "flex-end",
              marginBottom: 32,
            }}
          >
            <PodioCard usuario={top3[1]} pos={2} altura={160} orden={orden} />
            <PodioCard usuario={top3[0]} pos={1} altura={200} orden={orden} />
            <PodioCard usuario={top3[2]} pos={3} altura={130} orden={orden} />
          </div>
        )}

        {/* Resto */}
        <div
          style={{
            background: "var(--bg-card)",
            borderRadius: 16,
            border: "1px solid var(--border)",
            boxShadow: "var(--shadow-sm)",
            overflow: "hidden",
          }}
        >
          {restantes.map((u, i) => (
            <div
              key={u.id}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "14px 18px",
                gap: 14,
                borderBottom: i < restantes.length - 1 ? "1px solid var(--border)" : "none",
              }}
            >
              <div style={{ width: 28, fontWeight: 800, color: "var(--fg-muted)", fontSize: 13 }}>
                #{i + 4}
              </div>
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  background: "var(--bg-subtle)",
                  border: "1px solid var(--border)",
                  color: "var(--fg-primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: 13,
                }}
              >
                {u.nombre
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--fg-primary)" }}>
                  {u.nombre}
                </div>
                <div style={{ fontSize: 12, color: "var(--fg-muted)", marginTop: 2 }}>
                  <Facultad id={u.facultad_objetivo} /> · {u.examenes_completados} exámenes
                </div>
              </div>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  color: orden === "mejor" ? "var(--accent)" : "var(--fg-primary)",
                }}
              >
                {orden === "mejor" ? u.mejor_nota : u.nota_promedio}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

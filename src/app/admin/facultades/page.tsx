"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AppHeader from "../../components/AppHeader";
import type { Facultad, Materia } from "@/lib/data-store";

export default function AdminFacultades() {
  const router = useRouter();
  const [facultades, setFacultades] = useState<Facultad[]>([]);
  const [materias, setMaterias] = useState<Record<string, Materia[]>>({});
  const [expandida, setExpandida] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/auth/me").then((r) => r.json()).then((d) => {
      if (!d.admin) { router.push("/login"); return; }
      Promise.all([
        fetch("/api/facultades").then((r) => r.json()),
        fetch("/api/materias").then((r) => r.json()),
      ]).then(([f, m]) => {
        setFacultades(f.facultades ?? []);
        setMaterias(m.materias_por_facultad ?? {});
      });
    });
  }, [router]);

  return (
    <div style={{ minHeight: "100vh" }}>
      <AppHeader />
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div>
            <h1 className="font-crimson" style={{ fontSize: 32, fontWeight: 800, color: "var(--fg-primary)", marginBottom: 4 }}>🏛️ Facultades y materias</h1>
            <p style={{ color: "var(--fg-muted)" }}>{facultades.length} facultades · {Object.values(materias).flat().length} materias en total</p>
          </div>
          <button style={{ padding: "10px 20px", background: "var(--accent)", color: "white", border: "none", borderRadius: 10, fontWeight: 700, cursor: "pointer" }}>
            + Nueva facultad
          </button>
        </div>

        <div style={{ display: "grid", gap: 14 }}>
          {facultades.map((f) => {
            const mats = materias[f.id] ?? [];
            const expand = expandida === f.id;
            return (
              <div key={f.id} style={{ background: "var(--bg-card)", borderRadius: 14, border: "1px solid var(--border)", overflow: "hidden" }}>
                <div style={{ padding: 20, display: "flex", alignItems: "center", gap: 18 }}>
                  <div style={{ fontSize: 40 }}>{f.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--fg-primary)", marginBottom: 2 }}>{f.nombre}</h3>
                    <p style={{ fontSize: 13, color: "var(--fg-muted)" }}>{f.descripcion}</p>
                    <div style={{ display: "flex", gap: 14, marginTop: 8, fontSize: 12 }}>
                      <span style={{ color: "var(--fg-muted)" }}>📐 {f.duracion_minutos} min</span>
                      <span style={{ color: "var(--fg-muted)" }}>📝 {f.preguntas_examen} preguntas</span>
                      <span style={{ color: "var(--fg-muted)" }}>📚 {mats.length} materias</span>
                      <span style={{ color: "var(--fg-muted)" }}>📅 Banco desde {f.ano_inicio_banco}</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <button onClick={() => setExpandida(expand ? null : f.id)} style={{ padding: "8px 14px", background: "transparent", border: "1px solid var(--border)", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
                      {expand ? "Ocultar materias" : "Ver materias"}
                    </button>
                    <Link href={`/admin/banco?facultad=${f.id}`} style={{ padding: "8px 14px", background: f.color, color: "white", borderRadius: 8, fontWeight: 700, textDecoration: "none", fontSize: 13, textAlign: "center" }}>
                      Banco →
                    </Link>
                  </div>
                </div>

                {expand && (
                  <div style={{ borderTop: "1px solid var(--border)", padding: 20, background: "var(--bg-subtle)" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 10 }}>
                      {mats.map((m) => (
                        <div key={m.id} style={{ background: "var(--bg-card)", borderRadius: 10, padding: 12, border: "1px solid var(--border)" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                            <span style={{ fontSize: 14, fontWeight: 700, color: "var(--fg-primary)" }}>{m.nombre}</span>
                            <span style={{ fontSize: 10, padding: "2px 8px", background: `${f.color}15`, color: f.color, borderRadius: 999, fontWeight: 700, textTransform: "uppercase" }}>{m.area}</span>
                          </div>
                          <div style={{ fontSize: 11, color: "var(--fg-muted)" }}>
                            📖 {m.libros_referencia.join(" · ")}
                          </div>
                        </div>
                      ))}
                    </div>
                    <button style={{ marginTop: 14, padding: "8px 14px", background: "transparent", border: "1px dashed var(--border)", borderRadius: 8, cursor: "pointer", fontSize: 13, color: "var(--accent)", fontWeight: 600 }}>
                      + Agregar materia
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AppHeader from "../../components/AppHeader";
import Cargando from "@/app/components/Cargando";
import type { PreguntaBanco } from "@/lib/axiom/types";
import type { Facultad } from "@/lib/data-store";

interface Stats {
  total: number;
  por_facultad: Record<string, number>;
  por_tipo: Record<string, number>;
  por_dificultad: Record<string, number>;
}

const TIPO_LABEL: Record<string, string> = {
  seleccion_simple: "Opción múltiple",
  seleccion_multiple: "Multi-respuesta",
  verdadero_falso: "V / F",
  emparejamiento: "Emparejamiento",
  completar: "Completar",
  abierta: "Abierta",
};

export default function AdminBancoPage() {
  const router = useRouter();
  const [facultades, setFacultades] = useState<Facultad[]>([]);
  const [preguntas, setPreguntas] = useState<PreguntaBanco[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [filtros, setFiltros] = useState({ facultad: "", area: "", dificultad: "", q: "" });
  const [eliminando, setEliminando] = useState<string | null>(null);
  const [demoCount, setDemoCount] = useState(0);
  const [demoTrabajando, setDemoTrabajando] = useState(false);

  const cargarDemoCount = async () => {
    const r = await fetch("/api/admin/banco/demo");
    if (r.ok) { const d = await r.json(); setDemoCount(d.total ?? 0); }
  };

  const cargarDatosPrueba = async () => {
    setDemoTrabajando(true);
    const r = await fetch("/api/admin/banco/demo", { method: "POST" });
    const d = await r.json();
    if (r.ok) alert(`✓ Se cargaron ${d.creadas} preguntas de prueba en las 4 facultades.`);
    else alert("⚠️ " + (d.error ?? "Error"));
    await Promise.all([cargar(), cargarDemoCount()]);
    setDemoTrabajando(false);
  };

  const borrarDatosPrueba = async () => {
    if (!confirm("¿Borrar TODAS las preguntas de prueba? Esto no afecta tus preguntas reales.")) return;
    setDemoTrabajando(true);
    const r = await fetch("/api/admin/banco/demo", { method: "DELETE" });
    const d = await r.json();
    if (r.ok) alert(`✓ Se borraron ${d.borradas} preguntas de prueba.`);
    else alert("⚠️ " + (d.error ?? "Error"));
    await Promise.all([cargar(), cargarDemoCount()]);
    setDemoTrabajando(false);
  };

  const cargar = async () => {
    const sp = new URLSearchParams();
    if (filtros.facultad) sp.set("facultad", filtros.facultad);
    if (filtros.area) sp.set("area", filtros.area);
    if (filtros.dificultad) sp.set("dificultad", filtros.dificultad);
    if (filtros.q) sp.set("q", filtros.q);
    const r = await fetch(`/api/admin/preguntas?${sp.toString()}`);
    if (!r.ok) return;
    const d = await r.json();
    setPreguntas(d.preguntas ?? []);
    setStats(d.stats ?? null);
  };

  useEffect(() => {
    fetch("/api/auth/me").then((r) => r.json()).then((d) => {
      if (!d.admin) { router.push("/login"); return; }
      fetch("/api/facultades").then((r) => r.json()).then((f) => setFacultades(f.facultades ?? []));
      cargarDemoCount();
      cargar().finally(() => setLoading(false));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  useEffect(() => {
    if (!loading) cargar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtros]);

  const eliminar = async (id: string) => {
    if (!confirm("¿Eliminar esta pregunta? No se puede deshacer.")) return;
    setEliminando(id);
    await fetch(`/api/admin/preguntas/${id}`, { method: "DELETE" });
    await cargar();
    setEliminando(null);
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <AppHeader />
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 24px" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, flexWrap: "wrap", gap: 16 }}>
          <div>
            <h1 className="font-crimson" style={{ fontSize: 32, fontWeight: 800, color: "var(--fg-primary)", marginBottom: 4 }}>📚 Banco de preguntas</h1>
            <p style={{ color: "var(--fg-muted)" }}>
              {stats ? `${stats.total} preguntas creadas a mano + las de los exámenes oficiales` : "Cargando..."}
            </p>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Link href="/admin/banco/plantillas" style={btnSecondary()}>📄 Plantillas para IA</Link>
            <Link href="/admin/banco/importar" style={btnSecondary()}>📥 Importar lote</Link>
            <Link href="/admin/banco/nueva" style={btnPrimary()}>+ Nueva pregunta</Link>
          </div>
        </div>

        {/* Datos de prueba: cargar/borrar de un clic */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 20, padding: "12px 16px", background: "rgba(99,102,241,0.06)", border: "1px dashed var(--accent)", borderRadius: 12 }}>
          <span style={{ fontSize: 13, color: "var(--fg-primary)", flex: 1, minWidth: 220 }}>
            🧪 <strong>Datos de prueba</strong> (todos los tipos, 4 facultades) — {demoCount} cargadas. Úsalos para probar el flujo y bórralos cuando quieras.
          </span>
          <button onClick={cargarDatosPrueba} disabled={demoTrabajando} style={{ ...btnSecondary(), cursor: demoTrabajando ? "wait" : "pointer", opacity: demoTrabajando ? 0.6 : 1 }}>
            {demoTrabajando ? "Trabajando…" : "⬇️ Cargar datos de prueba"}
          </button>
          <button onClick={borrarDatosPrueba} disabled={demoTrabajando || demoCount === 0} style={{ padding: "8px 14px", background: "transparent", border: "1px solid #ef4444", color: "#dc2626", borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: demoTrabajando || demoCount === 0 ? "not-allowed" : "pointer", opacity: demoCount === 0 ? 0.45 : 1 }}>
            🗑️ Borrar datos de prueba
          </button>
        </div>

        {/* Cards de stats */}
        {stats && stats.total > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginBottom: 24 }}>
            <StatMini label="Total" valor={stats.total} color="#6366f1" />
            <StatMini label="Opción múltiple" valor={stats.por_tipo["seleccion_simple"] ?? 0} color="#10b981" />
            <StatMini label="V / F" valor={stats.por_tipo["verdadero_falso"] ?? 0} color="#f59e0b" />
            <StatMini label="Fáciles" valor={stats.por_dificultad["facil"] ?? 0} color="#06b6d4" />
            <StatMini label="Medio" valor={stats.por_dificultad["medio"] ?? 0} color="#8b5cf6" />
            <StatMini label="Difícil" valor={stats.por_dificultad["dificil"] ?? 0} color="#ef4444" />
          </div>
        )}

        {/* Filtros */}
        <div style={{ background: "var(--bg-card)", borderRadius: 12, padding: 14, border: "1px solid var(--border)", marginBottom: 14, display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
          <input
            type="text"
            placeholder="🔍 Buscar por enunciado o tema..."
            value={filtros.q}
            onChange={(e) => setFiltros({ ...filtros, q: e.target.value })}
            style={{ flex: 1, minWidth: 200, padding: "8px 12px", borderRadius: 8, border: "1px solid var(--border)", fontSize: 14 }}
          />
          <select value={filtros.facultad} onChange={(e) => setFiltros({ ...filtros, facultad: e.target.value })} style={selectStyle()}>
            <option value="">Todas las facultades</option>
            {facultades.map((f) => <option key={f.id} value={f.id}>{f.emoji} {f.nombre_corto}</option>)}
          </select>
          <select value={filtros.dificultad} onChange={(e) => setFiltros({ ...filtros, dificultad: e.target.value })} style={selectStyle()}>
            <option value="">Todas las dificultades</option>
            <option value="facil">Fácil</option>
            <option value="medio">Medio</option>
            <option value="dificil">Difícil</option>
          </select>
          {(filtros.q || filtros.facultad || filtros.dificultad || filtros.area) && (
            <button onClick={() => setFiltros({ facultad: "", area: "", dificultad: "", q: "" })} style={{ padding: "8px 14px", background: "transparent", border: "1px solid var(--border)", borderRadius: 8, cursor: "pointer", fontSize: 13 }}>
              Limpiar filtros
            </button>
          )}
        </div>

        {/* Tabla / Empty state */}
        {loading ? (
          <Cargando />
        ) : preguntas.length === 0 ? (
          <div style={{ background: "var(--bg-card)", borderRadius: 14, padding: 60, textAlign: "center", border: "1px solid var(--border)" }}>
            <div style={{ fontSize: 60, marginBottom: 12 }}>📭</div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--fg-primary)", marginBottom: 6 }}>
              {stats && stats.total === 0 ? "Tu banco está vacío" : "No hay preguntas con esos filtros"}
            </h3>
            <p style={{ color: "var(--fg-muted)", fontSize: 14, marginBottom: 18 }}>
              {stats && stats.total === 0 ? "Empieza agregando una pregunta a mano o importa un lote." : "Cambia los filtros o limpia para ver todas."}
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/admin/banco/nueva" style={btnPrimary()}>+ Nueva pregunta</Link>
              <Link href="/admin/banco/importar" style={btnSecondary()}>📥 Importar lote</Link>
            </div>
          </div>
        ) : (
          <div style={{ background: "var(--bg-card)", borderRadius: 14, border: "1px solid var(--border)", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ background: "var(--bg-subtle)" }}>
                  <th style={th()}>Pregunta</th>
                  <th style={th()}>Facultad</th>
                  <th style={th()}>Área / Tema</th>
                  <th style={th()}>Tipo</th>
                  <th style={th()}>Dif.</th>
                  <th style={th()}>Resp.</th>
                  <th style={th()}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {preguntas.map((p) => (
                  <tr key={p.id} style={{ borderTop: "1px solid var(--border)" }}>
                    <td style={{ ...td(), maxWidth: 380 }}>
                      <div style={{ fontWeight: 600, color: "var(--fg-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.enunciado}</div>
                      <div style={{ fontSize: 11, color: "var(--fg-muted)", marginTop: 2 }}>{p.id}</div>
                    </td>
                    <td style={td()}><span style={{ textTransform: "capitalize" }}>{p.facultad}</span></td>
                    <td style={td()}>
                      <div style={{ fontWeight: 600 }}>{p.area}</div>
                      <div style={{ fontSize: 12, color: "var(--fg-muted)" }}>{p.tema}</div>
                    </td>
                    <td style={td()}>
                      <span style={{ padding: "3px 8px", background: "var(--bg-subtle)", borderRadius: 999, fontSize: 11, fontWeight: 600 }}>
                        {TIPO_LABEL[p.tipo ?? "seleccion_simple"] ?? p.tipo}
                      </span>
                    </td>
                    <td style={td()}>
                      <span style={{
                        padding: "3px 8px", borderRadius: 999, fontSize: 11, fontWeight: 700,
                        background: p.dificultad === "facil" ? "#10b98115" : p.dificultad === "medio" ? "#f59e0b15" : "#ef444415",
                        color: p.dificultad === "facil" ? "#059669" : p.dificultad === "medio" ? "#d97706" : "#dc2626",
                      }}>
                        {p.dificultad === "facil" ? "Fácil" : p.dificultad === "medio" ? "Medio" : "Difícil"}
                      </span>
                    </td>
                    <td style={{ ...td(), fontWeight: 800, color: "#10b981" }}>{p.respuesta_correcta}</td>
                    <td style={td()}>
                      <div style={{ display: "flex", gap: 6 }}>
                        <Link href={`/admin/banco/editar/${p.id}`} style={{ padding: "4px 10px", border: "1px solid var(--border)", borderRadius: 6, textDecoration: "none", fontSize: 12, color: "var(--fg-primary)" }}>Editar</Link>
                        <button disabled={eliminando === p.id} onClick={() => eliminar(p.id)} style={{ padding: "4px 10px", background: "#ef4444", color: "white", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 12 }}>Eliminar</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function StatMini({ label, valor, color }: { label: string; valor: number; color: string }) {
  return (
    <div style={{ background: "var(--bg-card)", borderRadius: 10, padding: 12, border: "1px solid var(--border)" }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "var(--fg-muted)", textTransform: "uppercase" }}>{label}</div>
      <div style={{ fontSize: 24, fontWeight: 800, color }}>{valor}</div>
    </div>
  );
}

function btnPrimary(): React.CSSProperties {
  return { padding: "10px 18px", background: "var(--accent)", color: "white", borderRadius: 10, textDecoration: "none", fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer" };
}
function btnSecondary(): React.CSSProperties {
  return { padding: "10px 18px", background: "var(--bg-card)", color: "var(--fg-primary)", borderRadius: 10, textDecoration: "none", fontWeight: 600, fontSize: 14, border: "1px solid var(--border)", cursor: "pointer" };
}
function th(): React.CSSProperties {
  return { padding: "10px 14px", textAlign: "left", fontSize: 11, color: "var(--fg-muted)", fontWeight: 700, textTransform: "uppercase" };
}
function td(): React.CSSProperties {
  return { padding: "10px 14px", color: "var(--fg-primary)", verticalAlign: "top" };
}
function selectStyle(): React.CSSProperties {
  return { padding: "8px 12px", borderRadius: 8, border: "1px solid var(--border)", fontSize: 13, background: "var(--bg-card)", color: "var(--fg-primary)" };
}

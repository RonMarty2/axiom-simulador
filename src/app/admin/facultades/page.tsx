"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AppHeader from "../../components/AppHeader";
import type { Facultad, Materia } from "@/lib/data-store";

interface SeccionEdit {
  nombre: string;
  peso: number; // porcentaje 0..100
}

export default function AdminFacultades() {
  const router = useRouter();
  const [facultades, setFacultades] = useState<Facultad[]>([]);
  const [materias, setMaterias] = useState<Record<string, Materia[]>>({});
  const [expandida, setExpandida] = useState<string | null>(null);

  // Edición de secciones
  const [editando, setEditando] = useState<string | null>(null);
  const [secciones, setSecciones] = useState<SeccionEdit[]>([]);
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState<string | null>(null);

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

  const abrirEditor = (f: Facultad) => {
    setMensaje(null);
    setEditando(f.id);
    const pond = f.ponderacion ?? {};
    setSecciones((f.areas ?? []).map((a) => ({
      nombre: a,
      peso: Math.round((pond[a] ?? (1 / Math.max(1, (f.areas ?? []).length))) * 100),
    })));
  };

  const cerrarEditor = () => { setEditando(null); setSecciones([]); setMensaje(null); };

  const setSeccion = (i: number, campo: keyof SeccionEdit, valor: string) => {
    setSecciones((prev) => {
      const copia = [...prev];
      if (campo === "peso") copia[i] = { ...copia[i], peso: Math.max(0, Math.min(100, parseInt(valor, 10) || 0)) };
      else copia[i] = { ...copia[i], nombre: valor };
      return copia;
    });
  };

  const agregarSeccion = () => setSecciones((p) => [...p, { nombre: "", peso: 0 }]);
  const quitarSeccion = (i: number) => setSecciones((p) => p.filter((_, idx) => idx !== i));

  const totalPeso = secciones.reduce((s, x) => s + x.peso, 0);

  const guardarSecciones = async () => {
    if (!editando) return;
    const limpias = secciones
      .map((s) => ({ nombre: s.nombre.trim().toLowerCase().replace(/\s+/g, "_"), peso: s.peso }))
      .filter((s) => s.nombre);
    if (limpias.length === 0) { setMensaje("Agrega al menos una sección."); return; }

    setGuardando(true);
    setMensaje(null);
    const areas = limpias.map((s) => s.nombre);
    // Normaliza pesos a fracción (suman 1). Si todos son 0, reparte parejo.
    const suma = limpias.reduce((s, x) => s + x.peso, 0);
    const ponderacion: Record<string, number> = {};
    for (const s of limpias) {
      ponderacion[s.nombre] = suma > 0 ? s.peso / suma : 1 / limpias.length;
    }
    try {
      const r = await fetch("/api/facultades", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editando, areas, ponderacion }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error ?? "Error");
      setFacultades((prev) => prev.map((f) => (f.id === editando ? data.facultad : f)));
      setMensaje("✓ Secciones guardadas.");
      setTimeout(cerrarEditor, 900);
    } catch (e) {
      setMensaje("⚠️ " + (e instanceof Error ? e.message : String(e)));
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <AppHeader />
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div>
            <h1 className="font-crimson" style={{ fontSize: 32, fontWeight: 800, color: "var(--fg-primary)", marginBottom: 4 }}>🏛️ Facultades y materias</h1>
            <p style={{ color: "var(--fg-muted)" }}>{facultades.length} facultades · {Object.values(materias).flat().length} materias en total</p>
          </div>
        </div>

        <div style={{ display: "grid", gap: 14 }}>
          {facultades.map((f) => {
            const mats = materias[f.id] ?? [];
            const expand = expandida === f.id;
            const editandoEsta = editando === f.id;
            return (
              <div key={f.id} style={{ background: "var(--bg-card)", borderRadius: 14, border: "1px solid var(--border)", overflow: "hidden" }}>
                <div style={{ padding: 20, display: "flex", alignItems: "center", gap: 18 }}>
                  <div style={{ fontSize: 40 }}>{f.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--fg-primary)", marginBottom: 2 }}>{f.nombre}</h3>
                    <p style={{ fontSize: 13, color: "var(--fg-muted)" }}>{f.descripcion}</p>
                    <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
                      {(f.areas ?? []).map((a) => (
                        <span key={a} style={{ fontSize: 11, padding: "2px 10px", background: `${f.color}15`, color: f.color, borderRadius: 999, fontWeight: 700 }}>
                          {a}{f.ponderacion?.[a] != null ? ` ${Math.round(f.ponderacion[a] * 100)}%` : ""}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <button onClick={() => (editandoEsta ? cerrarEditor() : abrirEditor(f))} style={{ padding: "8px 14px", background: editandoEsta ? "var(--accent)" : "transparent", color: editandoEsta ? "white" : "var(--fg-primary)", border: "1px solid var(--border)", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 700 }}>
                      {editandoEsta ? "Cerrar" : "✏️ Editar secciones"}
                    </button>
                    <button onClick={() => setExpandida(expand ? null : f.id)} style={{ padding: "8px 14px", background: "transparent", border: "1px solid var(--border)", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
                      {expand ? "Ocultar materias" : "Ver materias"}
                    </button>
                    <Link href={`/admin/banco?facultad=${f.id}`} style={{ padding: "8px 14px", background: f.color, color: "white", borderRadius: 8, fontWeight: 700, textDecoration: "none", fontSize: 13, textAlign: "center" }}>
                      Banco →
                    </Link>
                  </div>
                </div>

                {editandoEsta && (
                  <div style={{ borderTop: "1px solid var(--border)", padding: 20, background: "var(--bg-subtle)" }}>
                    <h4 style={{ fontSize: 14, fontWeight: 800, color: "var(--fg-primary)", marginBottom: 4 }}>Secciones del examen</h4>
                    <p style={{ fontSize: 12, color: "var(--fg-muted)", marginBottom: 14 }}>
                      Define cómo se divide el examen de esta facultad. Ej: Medicina → <code>libro_1</code>, <code>libro_2</code>, <code>libro_3</code>. El peso (%) es cuánto vale cada sección en la nota.
                    </p>
                    <div style={{ display: "grid", gap: 8, maxWidth: 540 }}>
                      {secciones.map((s, i) => (
                        <div key={i} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                          <input
                            value={s.nombre}
                            onChange={(e) => setSeccion(i, "nombre", e.target.value)}
                            placeholder="ej. libro_1"
                            style={{ flex: 1, padding: "8px 10px", borderRadius: 8, border: "1px solid var(--border)", background: "var(--bg-card)", color: "var(--fg-primary)", fontSize: 14 }}
                          />
                          <input
                            type="number"
                            value={s.peso}
                            onChange={(e) => setSeccion(i, "peso", e.target.value)}
                            style={{ width: 80, padding: "8px 10px", borderRadius: 8, border: "1px solid var(--border)", background: "var(--bg-card)", color: "var(--fg-primary)", fontSize: 14 }}
                          />
                          <span style={{ fontSize: 13, color: "var(--fg-muted)", width: 16 }}>%</span>
                          <button onClick={() => quitarSeccion(i)} style={{ padding: "6px 10px", background: "transparent", border: "1px solid var(--border)", borderRadius: 8, cursor: "pointer", color: "#b91c1c", fontWeight: 700 }}>✕</button>
                        </div>
                      ))}
                    </div>
                    <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 12 }}>
                      <button onClick={agregarSeccion} style={{ padding: "8px 14px", background: "transparent", border: "1px dashed var(--border)", borderRadius: 8, cursor: "pointer", fontSize: 13, color: "var(--accent)", fontWeight: 700 }}>+ Agregar sección</button>
                      <span style={{ fontSize: 12, color: totalPeso === 100 ? "#059669" : "var(--fg-muted)" }}>Suma de pesos: {totalPeso}%{totalPeso !== 100 ? " (se reparte automáticamente al guardar)" : ""}</span>
                    </div>
                    <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                      <button onClick={guardarSecciones} disabled={guardando} style={{ padding: "10px 20px", background: "var(--accent)", color: "white", border: "none", borderRadius: 10, fontWeight: 800, cursor: "pointer", opacity: guardando ? 0.6 : 1 }}>
                        {guardando ? "Guardando..." : "💾 Guardar secciones"}
                      </button>
                      <button onClick={cerrarEditor} style={{ padding: "10px 20px", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 10, fontWeight: 600, cursor: "pointer" }}>Cancelar</button>
                      {mensaje && <span style={{ fontSize: 13, alignSelf: "center", color: mensaje.startsWith("✓") ? "#059669" : "#b91c1c" }}>{mensaje}</span>}
                    </div>
                  </div>
                )}

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

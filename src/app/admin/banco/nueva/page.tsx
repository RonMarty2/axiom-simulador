"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AppHeader from "../../../components/AppHeader";
import BackLink from "../../../components/BackLink";
import MathText from "../../../components/MathText";
import type { Facultad, Materia } from "@/lib/data-store";
import type { Dificultad, TipoPregunta, Area } from "@/lib/axiom/types";

export default function NuevaPreguntaPage() {
  const router = useRouter();
  const [facultades, setFacultades] = useState<Facultad[]>([]);
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [enviando, setEnviando] = useState(false);
  const [exito, setExito] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    facultad: "",
    anio: new Date().getFullYear(),
    tipo: "seleccion_simple" as TipoPregunta,
    area: "general" as Area,
    tema: "",
    dificultad: "medio" as Dificultad,
    enunciado: "",
    opciones: [
      { letra: "A", texto: "" },
      { letra: "B", texto: "" },
      { letra: "C", texto: "" },
      { letra: "D", texto: "" },
    ],
    respuesta_correcta: "A",
    espacios_completar: [""] as string[],
    explicacion: "",
    tags: "",
  });

  useEffect(() => {
    fetch("/api/auth/me").then((r) => r.json()).then((d) => {
      if (!d.admin) { router.push("/login"); return; }
      fetch("/api/facultades").then((r) => r.json()).then((f) => {
        const facs = f.facultades ?? [];
        setFacultades(facs);
        if (facs.length > 0) setForm((p) => ({ ...p, facultad: facs[0].id }));
      });
    });
  }, [router]);

  // Secciones de la facultad elegida (Económicas: matematicas…; Medicina: libro_1…).
  const facActual = facultades.find((f) => f.id === form.facultad);
  const secciones = facActual?.areas ?? [];

  useEffect(() => {
    if (!form.facultad) return;
    fetch(`/api/materias?facultad=${form.facultad}`).then((r) => r.json()).then((d) => setMaterias(d.materias ?? []));
    // Ajusta la sección seleccionada a una válida para esta facultad.
    const fac = facultades.find((f) => f.id === form.facultad);
    const secs = fac?.areas ?? [];
    if (secs.length > 0) {
      setForm((p) => (secs.includes(p.area) ? p : { ...p, area: secs[0] as Area }));
    }
  }, [form.facultad, facultades]);

  // Si cambia tipo a V/F, ajustar opciones
  useEffect(() => {
    if (form.tipo === "verdadero_falso") {
      setForm((p) => ({
        ...p,
        opciones: [
          { letra: "A", texto: "Verdadero" },
          { letra: "B", texto: "Falso" },
        ],
        respuesta_correcta: p.respuesta_correcta === "A" || p.respuesta_correcta === "B" ? p.respuesta_correcta : "A",
      }));
    }
  }, [form.tipo]);

  const updateOpcion = (idx: number, texto: string) => {
    const nuevas = [...form.opciones];
    nuevas[idx] = { ...nuevas[idx], texto };
    setForm({ ...form, opciones: nuevas });
  };

  const agregarOpcion = () => {
    const letras = ["A", "B", "C", "D", "E", "F"];
    const nueva = letras[form.opciones.length];
    if (!nueva) return;
    setForm({ ...form, opciones: [...form.opciones, { letra: nueva, texto: "" }] });
  };

  const removerOpcion = () => {
    if (form.opciones.length <= 2) return;
    setForm({ ...form, opciones: form.opciones.slice(0, -1) });
  };

  const enviar = async () => {
    setEnviando(true);
    setError(null);
    try {
      const r = await fetch("/api/admin/preguntas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          // En llenado no van opciones; van los espacios. En el resto, al revés.
          opciones: form.tipo === "completar" ? [] : form.opciones,
          espacios_completar: form.tipo === "completar"
            ? form.espacios_completar.map((e) => e.trim()).filter(Boolean)
            : undefined,
          tags: form.tags ? form.tags.split(",").map((t) => t.trim()) : undefined,
        }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error ?? "Error");
      setExito(true);
      setTimeout(() => router.push("/admin/banco"), 1500);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setEnviando(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <AppHeader />
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "32px 24px" }}>
        <BackLink href="/admin/banco" label="Volver al banco" />
        <h1 className="font-crimson" style={{ fontSize: 32, fontWeight: 800, color: "var(--fg-primary)", marginTop: 10, marginBottom: 8 }}>+ Nueva pregunta</h1>
        <p style={{ color: "var(--fg-muted)", marginBottom: 24 }}>Crea una pregunta y se guardará en tu banco para usarla en simulacros.</p>

        {exito && (
          <div style={{ padding: 14, background: "rgba(16,185,129,0.1)", color: "#059669", borderRadius: 10, marginBottom: 14, fontWeight: 700 }}>
            ✓ Pregunta guardada. Redirigiendo al banco...
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {/* Columna 1: form */}
          <div style={{ background: "var(--bg-card)", borderRadius: 14, padding: 24, border: "1px solid var(--border)" }}>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--fg-primary)", marginBottom: 16 }}>Datos</h3>

            <div style={{ display: "grid", gap: 12 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <Campo label="Facultad">
                  <select value={form.facultad} onChange={(e) => setForm({ ...form, facultad: e.target.value })} style={inp()}>
                    {facultades.map((f) => <option key={f.id} value={f.id}>{f.emoji} {f.nombre_corto}</option>)}
                  </select>
                </Campo>
                <Campo label="Año">
                  <input type="number" value={form.anio} onChange={(e) => setForm({ ...form, anio: parseInt(e.target.value, 10) || 2024 })} style={inp()} />
                </Campo>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <Campo label="Tipo de pregunta">
                  <select value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value as TipoPregunta })} style={inp()}>
                    <option value="seleccion_simple">Opción múltiple (1 correcta)</option>
                    <option value="verdadero_falso">Verdadero / Falso</option>
                    <option value="seleccion_multiple">Multi-respuesta</option>
                    <option value="completar">Completar / llenado (escribir)</option>
                    <option value="abierta">Abierta</option>
                  </select>
                </Campo>
                <Campo label="Dificultad">
                  <select value={form.dificultad} onChange={(e) => setForm({ ...form, dificultad: e.target.value as Dificultad })} style={inp()}>
                    <option value="facil">Fácil</option>
                    <option value="medio">Medio</option>
                    <option value="dificil">Difícil</option>
                  </select>
                </Campo>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <Campo label="Sección">
                  <select value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value as Area })} style={inp()}>
                    {secciones.length === 0
                      ? <option value="general">general</option>
                      : secciones.map((a) => <option key={a} value={a}>{a}</option>)}
                  </select>
                </Campo>
                <Campo label="Tema">
                  <input list="temas-list" value={form.tema} onChange={(e) => setForm({ ...form, tema: e.target.value })} placeholder="Ej. derivadas" style={inp()} />
                  <datalist id="temas-list">
                    {materias.map((m) => <option key={m.id} value={m.id}>{m.nombre}</option>)}
                  </datalist>
                </Campo>
              </div>

              <Campo label="Enunciado (admite fórmulas con $...$ o $$...$$)">
                <textarea
                  value={form.enunciado}
                  onChange={(e) => setForm({ ...form, enunciado: e.target.value })}
                  placeholder="Calcular la derivada de $f(x) = 3x^2 + 5x - 2$"
                  rows={4}
                  style={{ ...inp(), resize: "vertical", fontFamily: "monospace", fontSize: 13 }}
                />
              </Campo>

              {form.tipo === "completar" && (
                <div>
                  <label style={{ fontSize: 13, fontWeight: 700, color: "var(--fg-primary)", display: "block", marginBottom: 4 }}>
                    Respuestas correctas (lo que el alumno debe escribir)
                  </label>
                  <p style={{ fontSize: 11, color: "var(--fg-muted)", marginBottom: 8 }}>
                    Escribe los espacios en el enunciado con <code>___</code> (tres guiones bajos). Aquí pon la respuesta de cada uno, en orden. No distingue mayúsculas ni tildes.
                  </p>
                  {form.espacios_completar.map((esp, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
                      <span style={{ width: 24, textAlign: "center", fontWeight: 800, color: "var(--accent)" }}>{i + 1}.</span>
                      <input
                        type="text"
                        value={esp}
                        onChange={(e) => {
                          const nuevas = [...form.espacios_completar];
                          nuevas[i] = e.target.value;
                          setForm({ ...form, espacios_completar: nuevas });
                        }}
                        placeholder={`Respuesta del espacio ${i + 1}`}
                        style={{ ...inp(), flex: 1 }}
                      />
                      {form.espacios_completar.length > 1 && (
                        <button onClick={() => setForm({ ...form, espacios_completar: form.espacios_completar.filter((_, idx) => idx !== i) })} style={btnSm()}>✕</button>
                      )}
                    </div>
                  ))}
                  <button onClick={() => setForm({ ...form, espacios_completar: [...form.espacios_completar, ""] })} style={btnSm()}>+ Agregar espacio</button>
                </div>
              )}

              {form.tipo !== "abierta" && form.tipo !== "completar" && (
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <label style={{ fontSize: 13, fontWeight: 700, color: "var(--fg-primary)" }}>Opciones</label>
                    {form.tipo !== "verdadero_falso" && (
                      <div style={{ display: "flex", gap: 4 }}>
                        <button onClick={removerOpcion} disabled={form.opciones.length <= 2} style={btnSm()}>− Quitar</button>
                        <button onClick={agregarOpcion} disabled={form.opciones.length >= 6} style={btnSm()}>+ Agregar</button>
                      </div>
                    )}
                  </div>
                  {form.opciones.map((o, i) => (
                    <div key={o.letra} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
                      <span style={{ width: 24, textAlign: "center", fontWeight: 800, color: "var(--accent)" }}>{o.letra})</span>
                      <input
                        type="text"
                        value={o.texto}
                        onChange={(e) => updateOpcion(i, e.target.value)}
                        placeholder={form.tipo === "verdadero_falso" ? (i === 0 ? "Verdadero" : "Falso") : `Opción ${o.letra}`}
                        style={{ ...inp(), flex: 1 }}
                        disabled={form.tipo === "verdadero_falso"}
                      />
                      <label style={{ display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }}>
                        <input
                          type="radio"
                          checked={form.respuesta_correcta === o.letra}
                          onChange={() => setForm({ ...form, respuesta_correcta: o.letra })}
                        />
                        <span style={{ fontSize: 11, color: "#059669", fontWeight: 700 }}>Correcta</span>
                      </label>
                    </div>
                  ))}
                </div>
              )}

              <Campo label="Explicación (opcional)">
                <textarea
                  value={form.explicacion}
                  onChange={(e) => setForm({ ...form, explicacion: e.target.value })}
                  placeholder="$f'(x) = 6x + 5$ aplicando la regla de la potencia."
                  rows={3}
                  style={{ ...inp(), resize: "vertical", fontFamily: "monospace", fontSize: 13 }}
                />
              </Campo>

              <Campo label="Tags (separados por coma, opcional)">
                <input type="text" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="calculo, derivadas, basico" style={inp()} />
              </Campo>
            </div>
          </div>

          {/* Columna 2: preview */}
          <div style={{ background: "var(--bg-card)", borderRadius: 14, padding: 24, border: "1px solid var(--border)", position: "sticky", top: 20, alignSelf: "flex-start" }}>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--fg-primary)", marginBottom: 16 }}>👁️ Vista previa</h3>
            <div style={{ background: "var(--bg-subtle)", borderRadius: 10, padding: 18 }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 10, fontSize: 11, textTransform: "uppercase", color: "var(--fg-muted)", fontWeight: 700 }}>
                <span>{form.facultad || "facultad"}</span> · <span>{form.area}</span> · <span>{form.dificultad}</span>
              </div>
              <div style={{ fontSize: 15, color: "var(--fg-primary)", marginBottom: 14, fontWeight: 600 }}>
                <MathText>{form.enunciado || "Escribe el enunciado..."}</MathText>
              </div>
              <div style={{ display: "grid", gap: 6 }}>
                {form.opciones.map((o) => (
                  <div key={o.letra} style={{
                    padding: 10, borderRadius: 8,
                    background: form.respuesta_correcta === o.letra ? "rgba(16,185,129,0.1)" : "var(--bg-card)",
                    border: form.respuesta_correcta === o.letra ? "1px solid #10b981" : "1px solid var(--border)",
                    fontSize: 14,
                  }}>
                    <strong style={{ color: "var(--accent)" }}>{o.letra})</strong>{" "}
                    <MathText>{o.texto || `Opción ${o.letra}`}</MathText>
                  </div>
                ))}
              </div>
              {form.explicacion && (
                <div style={{ marginTop: 14, padding: 10, background: "rgba(99,102,241,0.06)", borderRadius: 8, fontSize: 13 }}>
                  <strong>💡 Explicación: </strong>
                  <MathText>{form.explicacion}</MathText>
                </div>
              )}
            </div>
          </div>
        </div>

        {error && (
          <div style={{ marginTop: 16, padding: 14, background: "rgba(239,68,68,0.1)", color: "#b91c1c", borderRadius: 10 }}>⚠️ {error}</div>
        )}

        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          <button
            onClick={enviar}
            disabled={enviando || !form.enunciado || !form.facultad}
            style={{ flex: 1, padding: 14, background: "var(--accent)", color: "white", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 800, cursor: "pointer", opacity: enviando || !form.enunciado ? 0.5 : 1 }}
          >
            {enviando ? "Guardando..." : "💾 Guardar en banco"}
          </button>
          <Link href="/admin/banco" style={{ padding: 14, background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--fg-primary)", textDecoration: "none", borderRadius: 12, fontWeight: 600 }}>
            Cancelar
          </Link>
        </div>
      </div>
    </div>
  );
}

function Campo({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label>
      <div style={{ fontSize: 12, fontWeight: 700, color: "var(--fg-primary)", marginBottom: 4 }}>{label}</div>
      {children}
    </label>
  );
}

function inp(): React.CSSProperties {
  return { width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid var(--border)", fontSize: 14, background: "var(--bg-card)", color: "var(--fg-primary)" };
}
function btnSm(): React.CSSProperties {
  return { padding: "4px 10px", background: "var(--bg-subtle)", border: "1px solid var(--border)", borderRadius: 6, cursor: "pointer", fontSize: 12, fontWeight: 600 };
}

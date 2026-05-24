"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import AppHeader from "../../../../components/AppHeader";
import MathText from "../../../../components/MathText";
import type { Facultad, Materia } from "@/lib/data-store";
import type { Dificultad, TipoPregunta, Area, PreguntaBanco } from "@/lib/axiom/types";

const AREAS: Area[] = ["matematicas", "economicas", "verbal", "razonamiento", "fisica", "quimica", "biologia", "civica", "historia", "general"];

export default function EditarPreguntaPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [facultades, setFacultades] = useState<Facultad[]>([]);
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [pregunta, setPregunta] = useState<PreguntaBanco | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [exito, setExito] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/auth/me").then((r) => r.json()).then((d) => {
      if (!d.admin) { router.push("/login"); return; }
      Promise.all([
        fetch("/api/facultades").then((r) => r.json()),
        fetch(`/api/admin/preguntas/${id}`).then((r) => r.json()),
      ]).then(([f, p]) => {
        setFacultades(f.facultades ?? []);
        setPregunta(p.pregunta);
      });
    });
  }, [router, id]);

  useEffect(() => {
    if (!pregunta?.facultad) return;
    fetch(`/api/materias?facultad=${pregunta.facultad}`).then((r) => r.json()).then((d) => setMaterias(d.materias ?? []));
  }, [pregunta?.facultad]);

  if (!pregunta) return (
    <div style={{ minHeight: "100vh" }}>
      <AppHeader />
      <div style={{ padding: 40, textAlign: "center" }}>Cargando pregunta...</div>
    </div>
  );

  const update = (k: keyof PreguntaBanco, v: unknown) => setPregunta({ ...pregunta, [k]: v });

  const updateOpcion = (idx: number, texto: string) => {
    const nuevas = [...(pregunta.opciones ?? [])];
    nuevas[idx] = { ...nuevas[idx], texto };
    update("opciones", nuevas);
  };

  const enviar = async () => {
    setEnviando(true);
    setError(null);
    try {
      const r = await fetch(`/api/admin/preguntas/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pregunta),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error ?? "Error");
      setExito(true);
      setTimeout(() => router.push("/admin/banco"), 1200);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setEnviando(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <AppHeader />
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "32px 24px" }}>
        <Link href="/admin/banco" style={{ color: "var(--fg-muted)", fontSize: 14, textDecoration: "none" }}>← Volver al banco</Link>
        <h1 className="font-crimson" style={{ fontSize: 30, fontWeight: 800, color: "var(--fg-primary)", marginTop: 10, marginBottom: 8 }}>✏️ Editar pregunta</h1>
        <p style={{ color: "var(--fg-muted)", marginBottom: 20, fontSize: 13 }}>ID: <code>{pregunta.id}</code></p>

        {exito && (
          <div style={{ padding: 14, background: "rgba(16,185,129,0.1)", color: "#059669", borderRadius: 10, marginBottom: 14, fontWeight: 700 }}>
            ✓ Cambios guardados. Volviendo al banco...
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div style={{ background: "var(--bg-card)", borderRadius: 14, padding: 24, border: "1px solid var(--border)" }}>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--fg-primary)", marginBottom: 16 }}>Editar</h3>

            <div style={{ display: "grid", gap: 12 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <label>
                  <div style={lbl()}>Facultad</div>
                  <select value={pregunta.facultad} onChange={(e) => update("facultad", e.target.value)} style={inp()}>
                    {facultades.map((f) => <option key={f.id} value={f.id}>{f.emoji} {f.nombre_corto}</option>)}
                  </select>
                </label>
                <label>
                  <div style={lbl()}>Año</div>
                  <input type="number" value={pregunta.anio} onChange={(e) => update("anio", parseInt(e.target.value, 10) || 2024)} style={inp()} />
                </label>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <label>
                  <div style={lbl()}>Tipo</div>
                  <select value={pregunta.tipo ?? "seleccion_simple"} onChange={(e) => update("tipo", e.target.value as TipoPregunta)} style={inp()}>
                    <option value="seleccion_simple">Opción múltiple</option>
                    <option value="verdadero_falso">Verdadero/Falso</option>
                    <option value="seleccion_multiple">Multi-respuesta</option>
                    <option value="abierta">Abierta</option>
                  </select>
                </label>
                <label>
                  <div style={lbl()}>Dificultad</div>
                  <select value={pregunta.dificultad} onChange={(e) => update("dificultad", e.target.value as Dificultad)} style={inp()}>
                    <option value="facil">Fácil</option>
                    <option value="medio">Medio</option>
                    <option value="dificil">Difícil</option>
                  </select>
                </label>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <label>
                  <div style={lbl()}>Área</div>
                  <select value={pregunta.area} onChange={(e) => update("area", e.target.value as Area)} style={inp()}>
                    {AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
                  </select>
                </label>
                <label>
                  <div style={lbl()}>Tema</div>
                  <input list="temas-edit" value={pregunta.tema} onChange={(e) => update("tema", e.target.value)} style={inp()} />
                  <datalist id="temas-edit">{materias.map((m) => <option key={m.id} value={m.id}>{m.nombre}</option>)}</datalist>
                </label>
              </div>
              <label>
                <div style={lbl()}>Enunciado</div>
                <textarea value={pregunta.enunciado} onChange={(e) => update("enunciado", e.target.value)} rows={4} style={{ ...inp(), fontFamily: "monospace", fontSize: 13 }} />
              </label>

              <div>
                <div style={lbl()}>Opciones</div>
                {(pregunta.opciones ?? []).map((o, i) => (
                  <div key={o.letra} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
                    <span style={{ width: 24, fontWeight: 800, color: "var(--accent)" }}>{o.letra})</span>
                    <input type="text" value={o.texto} onChange={(e) => updateOpcion(i, e.target.value)} style={{ ...inp(), flex: 1 }} />
                    <label style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <input type="radio" checked={pregunta.respuesta_correcta === o.letra} onChange={() => update("respuesta_correcta", o.letra)} />
                      <span style={{ fontSize: 11, color: "#059669", fontWeight: 700 }}>Correcta</span>
                    </label>
                  </div>
                ))}
              </div>

              <label>
                <div style={lbl()}>Explicación</div>
                <textarea value={pregunta.explicacion ?? ""} onChange={(e) => update("explicacion", e.target.value)} rows={3} style={{ ...inp(), fontFamily: "monospace", fontSize: 13 }} />
              </label>
            </div>
          </div>

          <div style={{ background: "var(--bg-card)", borderRadius: 14, padding: 24, border: "1px solid var(--border)", alignSelf: "flex-start" }}>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--fg-primary)", marginBottom: 16 }}>Vista previa</h3>
            <div style={{ background: "var(--bg-subtle)", borderRadius: 10, padding: 18 }}>
              <div style={{ fontSize: 15, color: "var(--fg-primary)", marginBottom: 14, fontWeight: 600 }}>
                <MathText>{pregunta.enunciado}</MathText>
              </div>
              {(pregunta.opciones ?? []).map((o) => (
                <div key={o.letra} style={{
                  padding: 10, borderRadius: 8, marginBottom: 6,
                  background: pregunta.respuesta_correcta === o.letra ? "rgba(16,185,129,0.1)" : "var(--bg-card)",
                  border: pregunta.respuesta_correcta === o.letra ? "1px solid #10b981" : "1px solid var(--border)",
                  fontSize: 14,
                }}>
                  <strong style={{ color: "var(--accent)" }}>{o.letra})</strong> <MathText>{o.texto}</MathText>
                </div>
              ))}
            </div>
          </div>
        </div>

        {error && (
          <div style={{ marginTop: 16, padding: 14, background: "rgba(239,68,68,0.1)", color: "#b91c1c", borderRadius: 10 }}>⚠️ {error}</div>
        )}

        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          <button onClick={enviar} disabled={enviando} style={{ flex: 1, padding: 14, background: "var(--accent)", color: "white", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 800, cursor: "pointer", opacity: enviando ? 0.5 : 1 }}>
            {enviando ? "Guardando..." : "💾 Guardar cambios"}
          </button>
          <Link href="/admin/banco" style={{ padding: 14, background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--fg-primary)", textDecoration: "none", borderRadius: 12, fontWeight: 600 }}>Cancelar</Link>
        </div>
      </div>
    </div>
  );
}

function lbl(): React.CSSProperties { return { fontSize: 12, fontWeight: 700, color: "var(--fg-primary)", marginBottom: 4 }; }
function inp(): React.CSSProperties { return { width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid var(--border)", fontSize: 14, background: "var(--bg-card)", color: "var(--fg-primary)" }; }

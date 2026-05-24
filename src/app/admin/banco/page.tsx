"use client";

/**
 * /admin/axiom-banco
 *
 * Panel de administracion del banco de examenes Axiom.
 * Lista los .md curados, permite subir nuevos con preview, ver/editar
 * existentes y eliminar. Apunta a /api/admin/axiom-banco (GET/POST),
 * /api/admin/axiom-banco/[id] (GET/DELETE) y /api/admin/axiom-banco/preview.
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import AdminShell, { StaggerRow, useCountUp } from "@/components/admin/AdminShell";

interface ExamenRow {
  id: string;
  universidad: string;
  facultad: string;
  anio: number;
  fecha_examen?: string;
  duracion_minutos: number;
  total_preguntas: number;
  areas_resumen: { area: string; cantidad: number }[];
  archivo: string;
  bytes: number;
  modificado: string | null;
}

interface ListadoResponse {
  examenes: ExamenRow[];
}

interface PreviewExamen {
  id: string;
  universidad: string;
  facultad: string;
  anio: number;
  fecha_examen?: string;
  duracion_minutos: number;
  total_preguntas: number;
  ponderacion: Record<string, number>;
  preguntas: Array<{
    id: string;
    numero: number;
    area: string;
    tema: string;
    dificultad: string;
    enunciado: string;
    opciones: { letra: string; texto: string }[];
    respuesta_correcta: string;
    explicacion?: string;
  }>;
}

interface PreviewResponse {
  ok: boolean;
  examen?: PreviewExamen;
  error?: string;
}

const PLANTILLA_MD = `---
universidad: UMSS
facultad: economicas
anio: 2024
fecha_examen: 2024-02-15
duracion_minutos: 180
total_preguntas: 1
ponderacion:
  matematicas: 0.40
  economicas: 0.35
  verbal: 0.25
---

## Pregunta 1
area: matematicas
tema: integrales
dificultad: medio

Calcular el valor de la integral definida:

$$\\int_0^1 (3x^2 + 2x)\\,dx$$

- A) $1$
- B) $2$
- C) $3$
- D) $4$

**respuesta:** B
**explicacion:** Sumando ambas integrales el resultado es 2.
`;

const ETIQUETAS_AREA: Record<string, string> = {
  matematicas: "Matemáticas",
  economicas: "Económicas",
  verbal: "Verbal",
  razonamiento: "Razonamiento",
  general: "General",
};

function fmtFecha(iso: string | null) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString("es-BO", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

function fmtBytes(b: number) {
  if (b < 1024) return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / (1024 * 1024)).toFixed(2)} MB`;
}

function Kpi({
  code,
  value,
  label,
  color,
  index,
}: {
  code: string;
  value: number;
  label: string;
  color?: string;
  index: number;
}) {
  const counted = useCountUp(value, 700, 150 + index * 60);
  return (
    <StaggerRow index={index}>
      <div className="adm-card adm-card-strong p-4 h-full">
        <div className="adm-label mb-2">{code}</div>
        <div style={{ fontSize: 32, fontWeight: 700, color: color ?? "#edf2fb", lineHeight: 1 }}>
          {counted}
        </div>
        <div className="adm-caption mt-2">{label}</div>
      </div>
    </StaggerRow>
  );
}

export default function AdminAxiomBancoPage() {
  const [examenes, setExamenes] = useState<ExamenRow[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filtroUni, setFiltroUni] = useState<string>("");
  const [filtroFac, setFiltroFac] = useState<string>("");

  // Drawer "Nuevo / Editar"
  const [editorAbierto, setEditorAbierto] = useState(false);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [contenidoMD, setContenidoMD] = useState(PLANTILLA_MD);
  const [preview, setPreview] = useState<PreviewExamen | null>(null);
  const [previewError, setPreviewError] = useState<string | null>(null);
  const [previewCargando, setPreviewCargando] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [mensajeOk, setMensajeOk] = useState<string | null>(null);

  // Confirmacion de borrado
  const [borrarId, setBorrarId] = useState<string | null>(null);
  const [borrando, setBorrando] = useState(false);

  const cargarLista = useCallback(async () => {
    setCargando(true);
    setError(null);
    try {
      const r = await fetch("/api/admin/banco");
      const data: ListadoResponse & { error?: string } = await r.json();
      if (!r.ok) throw new Error(data.error ?? `HTTP ${r.status}`);
      setExamenes(data.examenes ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargarLista();
  }, [cargarLista]);

  const universidades = useMemo(() => {
    const s = new Set<string>();
    examenes.forEach((e) => s.add(e.universidad.toLowerCase()));
    return Array.from(s).sort();
  }, [examenes]);

  const facultades = useMemo(() => {
    const s = new Set<string>();
    examenes
      .filter((e) => (filtroUni ? e.universidad.toLowerCase() === filtroUni : true))
      .forEach((e) => s.add(e.facultad.toLowerCase()));
    return Array.from(s).sort();
  }, [examenes, filtroUni]);

  const examenesFiltrados = useMemo(() => {
    return examenes.filter(
      (e) =>
        (filtroUni ? e.universidad.toLowerCase() === filtroUni : true) &&
        (filtroFac ? e.facultad.toLowerCase() === filtroFac : true)
    );
  }, [examenes, filtroUni, filtroFac]);

  const totalPreguntas = useMemo(
    () => examenes.reduce((sum, e) => sum + e.total_preguntas, 0),
    [examenes]
  );

  // ─── Editor: abrir vacio o cargar existente ────────────────
  const abrirNuevo = useCallback(() => {
    setEditandoId(null);
    setContenidoMD(PLANTILLA_MD);
    setPreview(null);
    setPreviewError(null);
    setMensajeOk(null);
    setEditorAbierto(true);
  }, []);

  const abrirEditar = useCallback(async (id: string) => {
    setEditandoId(id);
    setPreview(null);
    setPreviewError(null);
    setMensajeOk(null);
    setEditorAbierto(true);
    try {
      const r = await fetch(`/api/admin/banco/${encodeURIComponent(id)}`);
      const data = await r.json();
      if (!r.ok) throw new Error(data.error ?? `HTTP ${r.status}`);
      setContenidoMD(data.contenido ?? "");
    } catch (e) {
      setPreviewError(e instanceof Error ? e.message : String(e));
    }
  }, []);

  const cerrarEditor = useCallback(() => {
    setEditorAbierto(false);
    setEditandoId(null);
    setPreview(null);
    setPreviewError(null);
    setMensajeOk(null);
  }, []);

  // ─── Preview en vivo ───────────────────────────────────────
  const ejecutarPreview = useCallback(async () => {
    setPreviewCargando(true);
    setPreviewError(null);
    try {
      const r = await fetch("/api/admin/banco/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contenido: contenidoMD }),
      });
      const data: PreviewResponse = await r.json();
      if (!data.ok) {
        setPreview(null);
        setPreviewError(data.error ?? "Error parseando");
      } else {
        setPreview(data.examen ?? null);
      }
    } catch (e) {
      setPreviewError(e instanceof Error ? e.message : String(e));
    } finally {
      setPreviewCargando(false);
    }
  }, [contenidoMD]);

  // ─── Guardar (crea o sobreescribe) ─────────────────────────
  const guardar = useCallback(async () => {
    setGuardando(true);
    setMensajeOk(null);
    setPreviewError(null);
    try {
      const r = await fetch("/api/admin/banco", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contenido: contenidoMD }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error ?? `HTTP ${r.status}`);
      setMensajeOk(
        `Guardado: ${data.examen_id} (${data.total_preguntas} preguntas)`
      );
      await cargarLista();
    } catch (e) {
      setPreviewError(e instanceof Error ? e.message : String(e));
    } finally {
      setGuardando(false);
    }
  }, [contenidoMD, cargarLista]);

  // ─── Borrar ────────────────────────────────────────────────
  const confirmarBorrar = useCallback(async () => {
    if (!borrarId) return;
    setBorrando(true);
    try {
      const r = await fetch(`/api/admin/banco/${encodeURIComponent(borrarId)}`, {
        method: "DELETE",
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error ?? `HTTP ${r.status}`);
      setBorrarId(null);
      await cargarLista();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBorrando(false);
    }
  }, [borrarId, cargarLista]);

  return (
    <AdminShell
      title="Banco de exámenes Axiom"
      code="CMD AXIOM"
      subtitle="Repositorio curado de exámenes pasados. Sube .md, valida con preview y publica al banco que consume el simulador."
    >
      {/* KPIs */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 mb-8">
        <Kpi code="EX" value={examenes.length} label="exámenes en banco" index={0} />
        <Kpi code="UNI" value={universidades.length} label="universidades cubiertas" index={1} />
        <Kpi
          code="FAC"
          value={new Set(examenes.map((e) => `${e.universidad}/${e.facultad}`)).size}
          label="facultades únicas"
          index={2}
        />
        <Kpi
          code="QS"
          value={totalPreguntas}
          label="preguntas totales"
          color="#a78bfa"
          index={3}
        />
      </div>

      {/* Toolbar */}
      <div className="adm-card p-4 mb-6">
        <div className="flex flex-wrap items-end gap-3">
          <div className="flex-1 min-w-[140px]">
            <div className="adm-label mb-2">universidad</div>
            <select
              value={filtroUni}
              onChange={(e) => {
                setFiltroUni(e.target.value);
                setFiltroFac("");
              }}
              className="w-full px-3 py-2 rounded-md text-[13px]"
              style={{
                background: "rgba(140,154,176,0.10)",
                border: "1px solid rgba(140,154,176,0.25)",
                color: "#edf2fb",
              }}
            >
              <option value="">Todas</option>
              {universidades.map((u) => (
                <option key={u} value={u}>
                  {u.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1 min-w-[140px]">
            <div className="adm-label mb-2">facultad</div>
            <select
              value={filtroFac}
              onChange={(e) => setFiltroFac(e.target.value)}
              className="w-full px-3 py-2 rounded-md text-[13px]"
              style={{
                background: "rgba(140,154,176,0.10)",
                border: "1px solid rgba(140,154,176,0.25)",
                color: "#edf2fb",
              }}
            >
              <option value="">Todas</option>
              {facultades.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={cargarLista}
            className="adm-surface px-4 py-2 text-[13px] font-semibold"
            style={{ color: "#edf2fb" }}
          >
            ↻ Recargar
          </button>
          <button
            type="button"
            onClick={abrirNuevo}
            className="px-4 py-2 rounded-md text-[13px] font-bold"
            style={{
              background: "linear-gradient(135deg, #a78bfa, #818cf8)",
              color: "#0b0f17",
            }}
          >
            + Subir examen .md
          </button>
        </div>
      </div>

      {/* Estado de error general */}
      {error && (
        <div
          className="adm-card p-4 mb-6"
          style={{ borderColor: "rgba(239,68,68,0.35)", background: "rgba(239,68,68,0.06)" }}
        >
          <div className="adm-label" style={{ color: "#fca5a5" }}>
            error
          </div>
          <div className="text-[13px] mt-1" style={{ color: "#edf2fb" }}>
            {error}
          </div>
        </div>
      )}

      {/* Lista de examenes */}
      <div className="adm-card p-5 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="adm-label">exámenes ({examenesFiltrados.length})</div>
          <div className="adm-muted">
            archivos en <code style={{ color: "#a78bfa" }}>data/examenes/</code>
          </div>
        </div>

        {cargando ? (
          <div className="adm-caption py-10 text-center">Cargando banco…</div>
        ) : examenesFiltrados.length === 0 ? (
          <div className="adm-surface p-8 text-center">
            <div className="text-[14px] font-bold mb-1" style={{ color: "#edf2fb" }}>
              No hay exámenes que coincidan
            </div>
            <div className="adm-caption">
              {examenes.length === 0
                ? "El banco está vacío. Sube tu primer .md con el botón de arriba."
                : "Ajusta los filtros o limpia la selección de universidad / facultad."}
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {examenesFiltrados.map((ex, i) => (
              <StaggerRow key={ex.id} index={i}>
                <div className="adm-surface p-4">
                  <div className="flex flex-wrap items-start gap-4">
                    <div className="flex-1 min-w-[200px]">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                          style={{
                            background: "rgba(167,139,250,0.15)",
                            color: "#a78bfa",
                            letterSpacing: "0.06em",
                            textTransform: "uppercase",
                          }}
                        >
                          {ex.universidad}
                        </span>
                        <span
                          className="text-[10px] px-2 py-0.5 rounded-full"
                          style={{
                            background: "rgba(140,154,176,0.10)",
                            color: "#94a3b8",
                          }}
                        >
                          {ex.facultad}
                        </span>
                        <span className="text-[12px] font-bold" style={{ color: "#edf2fb" }}>
                          · {ex.anio}
                        </span>
                      </div>
                      <div className="text-[13px] font-bold" style={{ color: "#edf2fb" }}>
                        {ex.total_preguntas} preguntas · {ex.duracion_minutos} min
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {ex.areas_resumen.map((a) => (
                          <span
                            key={a.area}
                            className="text-[10.5px] px-2 py-0.5 rounded-full"
                            style={{
                              background: "rgba(140,154,176,0.10)",
                              border: "1px solid rgba(140,154,176,0.22)",
                              color: "#cbd5e1",
                            }}
                          >
                            {ETIQUETAS_AREA[a.area] ?? a.area} · {a.cantidad}
                          </span>
                        ))}
                      </div>
                      <div className="adm-caption mt-2">
                        <code style={{ color: "#94a3b8" }}>{ex.archivo}</code>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="adm-caption mb-1">{fmtBytes(ex.bytes)}</div>
                      <div className="adm-caption">mod. {fmtFecha(ex.modificado)}</div>
                    </div>

                    <div className="flex flex-col gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => abrirEditar(ex.id)}
                        className="px-3 py-1.5 rounded-md text-[12px] font-semibold"
                        style={{
                          background: "rgba(167,139,250,0.12)",
                          border: "1px solid rgba(167,139,250,0.3)",
                          color: "#cbd5e1",
                        }}
                      >
                        Ver / Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => setBorrarId(ex.id)}
                        className="px-3 py-1.5 rounded-md text-[12px] font-semibold"
                        style={{
                          background: "rgba(239,68,68,0.08)",
                          border: "1px solid rgba(239,68,68,0.30)",
                          color: "#fca5a5",
                        }}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </StaggerRow>
            ))}
          </div>
        )}
      </div>

      {/* Ayuda rapida */}
      <div className="adm-card p-5 mb-8">
        <div className="adm-label mb-3">formato de archivo</div>
        <div className="text-[13px] leading-relaxed mb-3" style={{ color: "#cbd5e1" }}>
          Cada examen es un <code style={{ color: "#a78bfa" }}>.md</code> con frontmatter YAML
          (universidad, facultad, año, duración, ponderación por área) seguido de bloques
          <code style={{ color: "#a78bfa" }}> ## Pregunta N</code>. Cada pregunta declara{" "}
          <code style={{ color: "#a78bfa" }}>area</code>,{" "}
          <code style={{ color: "#a78bfa" }}>tema</code>,{" "}
          <code style={{ color: "#a78bfa" }}>dificultad</code>, enunciado, 4 opciones{" "}
          <code style={{ color: "#a78bfa" }}>- A) ...</code>, respuesta correcta y explicación.
        </div>
        <div className="text-[13px]" style={{ color: "#94a3b8" }}>
          El parser valida el formato antes de guardar. Usa &quot;Previsualizar&quot; para
          asegurarte de que no haya errores.
        </div>
      </div>

      {/* ═══ DRAWER EDITOR ═══ */}
      {editorAbierto && (
        <div
          className="fixed inset-0 z-30 flex items-stretch justify-end"
          style={{ background: "rgba(7,10,15,0.66)", backdropFilter: "blur(6px)" }}
        >
          <div
            className="adm-card adm-card-strong w-full max-w-3xl h-full overflow-y-auto p-6"
            style={{ borderRadius: "20px 0 0 20px" }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="adm-label mb-2">
                  {editandoId ? "editar examen" : "nuevo examen .md"}
                </div>
                <div className="text-[18px] font-bold" style={{ color: "#edf2fb" }}>
                  {editandoId
                    ? `Editando ${editandoId}`
                    : "Pega o escribe el .md y valida antes de guardar"}
                </div>
              </div>
              <button
                type="button"
                onClick={cerrarEditor}
                className="adm-surface px-3 py-1 text-[13px] font-semibold"
                style={{ color: "#edf2fb" }}
              >
                Cerrar ✕
              </button>
            </div>

            <textarea
              value={contenidoMD}
              onChange={(e) => {
                setContenidoMD(e.target.value);
                setPreview(null);
                setPreviewError(null);
                setMensajeOk(null);
              }}
              spellCheck={false}
              className="w-full mb-3 p-3 rounded-md font-mono text-[12.5px] leading-relaxed"
              style={{
                background: "rgba(7,10,15,0.6)",
                border: "1px solid rgba(140,154,176,0.25)",
                color: "#edf2fb",
                minHeight: 320,
                resize: "vertical",
              }}
            />

            <div className="flex flex-wrap items-center gap-2 mb-4">
              <button
                type="button"
                onClick={ejecutarPreview}
                disabled={previewCargando || !contenidoMD.trim()}
                className="px-4 py-2 rounded-md text-[13px] font-bold"
                style={{
                  background: "rgba(167,139,250,0.18)",
                  border: "1px solid rgba(167,139,250,0.4)",
                  color: "#edf2fb",
                  opacity: previewCargando || !contenidoMD.trim() ? 0.5 : 1,
                }}
              >
                {previewCargando ? "Validando…" : "Previsualizar"}
              </button>
              <button
                type="button"
                onClick={guardar}
                disabled={guardando || !contenidoMD.trim()}
                className="px-4 py-2 rounded-md text-[13px] font-bold"
                style={{
                  background: "linear-gradient(135deg, #22c55e, #16a34a)",
                  color: "#0b0f17",
                  opacity: guardando || !contenidoMD.trim() ? 0.5 : 1,
                }}
              >
                {guardando ? "Guardando…" : editandoId ? "Sobrescribir" : "Guardar en banco"}
              </button>
              <span className="adm-caption ml-auto">
                {contenidoMD.length} chars · {contenidoMD.split(/\r?\n/).length} líneas
              </span>
            </div>

            {previewError && (
              <div
                className="p-3 rounded-md mb-4 text-[13px]"
                style={{
                  background: "rgba(239,68,68,0.08)",
                  border: "1px solid rgba(239,68,68,0.35)",
                  color: "#fecaca",
                }}
              >
                <strong>Error:</strong> {previewError}
              </div>
            )}

            {mensajeOk && (
              <div
                className="p-3 rounded-md mb-4 text-[13px]"
                style={{
                  background: "rgba(34,197,94,0.08)",
                  border: "1px solid rgba(34,197,94,0.35)",
                  color: "#bbf7d0",
                }}
              >
                ✓ {mensajeOk}
              </div>
            )}

            {preview && (
              <div className="adm-surface p-4">
                <div className="adm-label mb-3">preview · {preview.id}</div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <Stat label="Universidad" value={preview.universidad} />
                  <Stat label="Facultad" value={preview.facultad} />
                  <Stat label="Año" value={String(preview.anio)} />
                  <Stat label="Duración" value={`${preview.duracion_minutos} min`} />
                  <Stat
                    label="Total preguntas"
                    value={String(preview.preguntas.length)}
                  />
                  <Stat
                    label="Fecha examen"
                    value={preview.fecha_examen ?? "—"}
                  />
                </div>

                <div className="mb-3">
                  <div className="adm-label mb-2">ponderación</div>
                  <div className="flex flex-wrap gap-1.5">
                    {Object.entries(preview.ponderacion).map(([area, peso]) => (
                      <span
                        key={area}
                        className="text-[11px] px-2 py-0.5 rounded-full"
                        style={{
                          background: "rgba(140,154,176,0.12)",
                          border: "1px solid rgba(140,154,176,0.25)",
                          color: "#cbd5e1",
                        }}
                      >
                        {ETIQUETAS_AREA[area] ?? area}: {(peso * 100).toFixed(0)}%
                      </span>
                    ))}
                  </div>
                </div>

                <div className="adm-label mb-2">preguntas detectadas</div>
                <div className="space-y-1.5 max-h-[260px] overflow-y-auto pr-1">
                  {preview.preguntas.map((p) => (
                    <div
                      key={p.id}
                      className="px-3 py-2 rounded-md"
                      style={{
                        background: "rgba(140,154,176,0.06)",
                        border: "1px solid rgba(140,154,176,0.18)",
                      }}
                    >
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span
                          className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                          style={{ background: "#a78bfa", color: "#0b0f17" }}
                        >
                          #{p.numero}
                        </span>
                        <span className="text-[10.5px]" style={{ color: "#94a3b8" }}>
                          {ETIQUETAS_AREA[p.area] ?? p.area} · {p.tema} · {p.dificultad}
                        </span>
                        <span
                          className="ml-auto text-[10.5px] font-bold"
                          style={{ color: "#86efac" }}
                        >
                          ✓ {p.respuesta_correcta}
                        </span>
                      </div>
                      <div
                        className="text-[12.5px] line-clamp-2"
                        style={{ color: "#edf2fb" }}
                      >
                        {p.enunciado.slice(0, 160)}
                        {p.enunciado.length > 160 ? "…" : ""}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ═══ MODAL CONFIRMACION BORRADO ═══ */}
      {borrarId && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center p-4"
          style={{ background: "rgba(7,10,15,0.7)" }}
        >
          <div className="adm-card adm-card-strong p-6 max-w-md w-full">
            <div className="adm-label mb-2" style={{ color: "#fca5a5" }}>
              eliminar examen
            </div>
            <div className="text-[15px] font-bold mb-2" style={{ color: "#edf2fb" }}>
              ¿Eliminar permanentemente <code style={{ color: "#a78bfa" }}>{borrarId}</code>?
            </div>
            <div className="adm-caption mb-5">
              Se borrará el archivo .md del disco. Esta acción no se puede deshacer.
            </div>
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => setBorrarId(null)}
                disabled={borrando}
                className="adm-surface px-4 py-2 text-[13px] font-semibold"
                style={{ color: "#edf2fb" }}
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={confirmarBorrar}
                disabled={borrando}
                className="px-4 py-2 rounded-md text-[13px] font-bold"
                style={{
                  background: "rgba(239,68,68,0.18)",
                  border: "1px solid rgba(239,68,68,0.45)",
                  color: "#fecaca",
                  opacity: borrando ? 0.6 : 1,
                }}
              >
                {borrando ? "Borrando…" : "Sí, eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="px-3 py-2 rounded-md"
      style={{
        background: "rgba(140,154,176,0.06)",
        border: "1px solid rgba(140,154,176,0.18)",
      }}
    >
      <div className="adm-caption">{label}</div>
      <div className="text-[14px] font-bold mt-0.5" style={{ color: "#edf2fb" }}>
        {value}
      </div>
    </div>
  );
}

"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import MathText from "../../components/MathText";
import type { Simulador, PreguntaBanco } from "@/lib/axiom/types";
import { leerSimulador, guardarSimulador } from "@/lib/sim-storage";
import { SEP_LLENADO, cantidadEspacios } from "@/lib/axiom/respuestas";

const ETIQUETAS_AREA: Record<string, string> = {
  matematicas: "Matemáticas",
  economicas: "Económicas",
  verbal: "Verbal",
  razonamiento: "Razonamiento",
  general: "General",
};

export default function SimuladorActivoPage() {
  const router = useRouter();
  const params = useParams();
  const simId = params.simId as string;

  const [simulador, setSimulador] = useState<Simulador | null>(null);
  const [indice, setIndice] = useState(0);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [finalizando, setFinalizando] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState<number | null>(null);
  const [confirmFinalizar, setConfirmFinalizar] = useState(false);
  const [sidebarAbierto, setSidebarAbierto] = useState(false);
  // Vista del examen: "hoja" (estilo UMSS: hoja por área, DEFAULT) | "una" (clásica: una pregunta)
  const [vista, setVista] = useState<"una" | "hoja">("hoja");
  const [areaActualIdx, setAreaActualIdx] = useState(0);
  const [tipVisible, setTipVisible] = useState(false);

  // Cargar preferencia de vista guardada (si no hay, queda en "hoja" por default)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const v = localStorage.getItem("axiom_vista_simulador_v2");
    if (v === "hoja" || v === "una") setVista(v);
    // Mostrar tip si nunca lo ha visto
    const tipVisto = localStorage.getItem("axiom_tip_hoja_visto_v2");
    if (!tipVisto) setTipVisible(true);
  }, []);

  const cambiarVista = (v: "una" | "hoja") => {
    setVista(v);
    if (typeof window !== "undefined") {
      localStorage.setItem("axiom_vista_simulador_v2", v);
      localStorage.setItem("axiom_tip_hoja_visto_v2", "1");
      setTipVisible(false);
    }
  };

  const cerrarTip = () => {
    setTipVisible(false);
    if (typeof window !== "undefined") localStorage.setItem("axiom_tip_hoja_visto_v2", "1");
  };

  // Cargar simulador: primero de localStorage (sobrevive a serverless),
  // luego del servidor como fallback.
  useEffect(() => {
    const local = leerSimulador(simId);
    if (local) {
      setSimulador(local);
      setCargando(false);
      return;
    }
    fetch(`/api/axiom/simulador/${simId}`)
      .then(async (r) => {
        const data = await r.json();
        if (!r.ok) throw new Error(data.error ?? "Error");
        setSimulador(data.simulador);
        guardarSimulador(data.simulador);
      })
      .catch((e) => setError(e instanceof Error ? e.message : String(e)))
      .finally(() => setCargando(false));
  }, [simId]);

  const preguntas: PreguntaBanco[] = useMemo(
    () => simulador?.preguntas ?? [],
    [simulador]
  );

  // Agrupar preguntas por área (manteniendo orden original dentro de cada grupo)
  const grupos = useMemo(() => {
    const ordenAreas: string[] = [];
    const porArea: Record<string, { area: string; preguntas: PreguntaBanco[]; indices: number[] }> = {};
    preguntas.forEach((p, i) => {
      if (!porArea[p.area]) {
        porArea[p.area] = { area: p.area, preguntas: [], indices: [] };
        ordenAreas.push(p.area);
      }
      porArea[p.area].preguntas.push(p);
      porArea[p.area].indices.push(i);
    });
    return ordenAreas.map((a) => porArea[a]);
  }, [preguntas]);

  const finalizar = useCallback(async () => {
    setFinalizando(true);
    try {
      const local = leerSimulador(simId);
      await fetch(`/api/axiom/simulador/${simId}/finalizar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ simulador: local }),
      });
      router.push(`/simulador/${simId}/resultados`);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setFinalizando(false);
    }
  }, [router, simId]);

  // Cronómetro descendente
  const finalizarRef = useRef(finalizar);
  useEffect(() => {
    finalizarRef.current = finalizar;
  }, [finalizar]);

  useEffect(() => {
    if (!simulador || simulador.estado !== "activo" || !simulador.duracion_minutos) return;
    const inicio = new Date(simulador.fecha_inicio).getTime();
    const finMs = inicio + simulador.duracion_minutos * 60_000;
    const update = () => {
      const restante = Math.max(0, Math.floor((finMs - Date.now()) / 1000));
      setTiempoRestante(restante);
      if (restante === 0) {
        finalizarRef.current();
      }
    };
    update();
    const tid = setInterval(update, 1000);
    return () => clearInterval(tid);
  }, [simulador]);

  // Si el simulador ya fue calificado, redirigir
  useEffect(() => {
    if (simulador?.estado === "calificado") {
      router.replace(`/simulador/${simId}/resultados`);
    }
  }, [simulador, router, simId]);

  const elegirOpcion = async (preguntaId: string, letra: string) => {
    if (!simulador) return;
    const nuevo = {
      ...simulador,
      respuestas_usuario: { ...simulador.respuestas_usuario, [preguntaId]: letra },
    };
    setSimulador(nuevo);
    guardarSimulador(nuevo);
    // Best effort: actualizar servidor (puede fallar entre lambdas frias)
    fetch(`/api/axiom/simulador/${simId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pregunta_id: preguntaId, respuesta: letra, simulador: nuevo }),
    }).catch(() => {});
  };

  // Guarda lo que el alumno escribe en preguntas de llenado. Para varias
  // casillas, las une con SEP_LLENADO en un solo string.
  const responderTexto = async (preguntaId: string, indiceCasilla: number, valor: string, totalCasillas: number) => {
    if (!simulador) return;
    const actual = (simulador.respuestas_usuario[preguntaId] ?? "").split(SEP_LLENADO);
    const partes = Array.from({ length: totalCasillas }, (_, i) => actual[i] ?? "");
    partes[indiceCasilla] = valor;
    const unido = partes.some((p) => p.trim() !== "") ? partes.join(SEP_LLENADO) : "";
    const nuevo = {
      ...simulador,
      respuestas_usuario: { ...simulador.respuestas_usuario, [preguntaId]: unido },
    };
    setSimulador(nuevo);
    guardarSimulador(nuevo);
    fetch(`/api/axiom/simulador/${simId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pregunta_id: preguntaId, respuesta: unido, simulador: nuevo }),
    }).catch(() => {});
  };

  const toggleMarcada = async (preguntaId: string) => {
    if (!simulador) return;
    const marcadas = new Set(simulador.marcadas ?? []);
    if (marcadas.has(preguntaId)) marcadas.delete(preguntaId);
    else marcadas.add(preguntaId);
    const nuevo = { ...simulador, marcadas: Array.from(marcadas) };
    setSimulador(nuevo);
    guardarSimulador(nuevo);
    fetch(`/api/axiom/simulador/${simId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ toggle_marcada: preguntaId, simulador: nuevo }),
    }).catch(() => {});
  };

  if (cargando) {
    return <div className="p-8 text-center text-neutral-500">Cargando simulador…</div>;
  }
  if (error || !simulador) {
    return (
      <div className="mx-auto max-w-2xl p-8">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
          {error ?? "No se encontró el simulador"}
        </div>
      </div>
    );
  }
  if (preguntas.length === 0) {
    return (
      <div className="mx-auto max-w-2xl p-8">
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-amber-800">
          El simulador no tiene preguntas.
        </div>
      </div>
    );
  }

  const pregunta = preguntas[indice];
  const respondidas = Object.keys(simulador.respuestas_usuario).length;
  const marcadas = new Set(simulador.marcadas ?? []);
  const seleccion = simulador.respuestas_usuario[pregunta.id];

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      {/* Header con cronómetro */}
      <div className="sticky top-0 z-20 border-b border-neutral-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="min-w-0">
            <h1 className="text-sm font-bold text-neutral-900 sm:text-base">
              Simulacro · {simulador.config?.universidad ?? "UMSS"}
            </h1>
            <p className="text-xs text-neutral-500">
              {respondidas} de {preguntas.length} respondidas
            </p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Toggle de vista */}
            <div className="hidden sm:flex items-center gap-1 rounded-full border border-neutral-300 bg-neutral-50 p-1">
              <button
                type="button"
                onClick={() => cambiarVista("una")}
                title="Una pregunta a la vez"
                className={`rounded-full px-3 py-1 text-xs font-bold transition-colors ${vista === "una" ? "bg-white text-violet-700 shadow-sm" : "text-neutral-500 hover:text-neutral-700"}`}
              >
                📝 Una por una
              </button>
              <button
                type="button"
                onClick={() => cambiarVista("hoja")}
                title="Hoja completa por área (estilo examen real UMSS)"
                className={`rounded-full px-3 py-1 text-xs font-bold transition-colors ${vista === "hoja" ? "bg-white text-violet-700 shadow-sm" : "text-neutral-500 hover:text-neutral-700"}`}
              >
                📄 Hoja por área
              </button>
            </div>
            <Cronometro segundos={tiempoRestante} />
          </div>
        </div>
        {/* Toggle móvil */}
        <div className="flex sm:hidden items-center justify-center gap-1 border-t border-neutral-100 px-4 py-2">
          <div className="flex items-center gap-1 rounded-full border border-neutral-300 bg-neutral-50 p-1">
            <button
              type="button"
              onClick={() => cambiarVista("una")}
              className={`rounded-full px-3 py-1 text-xs font-bold transition-colors ${vista === "una" ? "bg-white text-violet-700 shadow-sm" : "text-neutral-500"}`}
            >
              📝 Una por una
            </button>
            <button
              type="button"
              onClick={() => cambiarVista("hoja")}
              className={`rounded-full px-3 py-1 text-xs font-bold transition-colors ${vista === "hoja" ? "bg-white text-violet-700 shadow-sm" : "text-neutral-500"}`}
            >
              📄 Hoja por área
            </button>
          </div>
        </div>
      </div>

      {/* Tip flotante explicando el formato hoja por área */}
      {tipVisible && (
        <div className="mx-auto max-w-6xl px-4 pt-4 sm:px-6">
          <div className="flex items-start gap-3 rounded-2xl border border-violet-200 bg-violet-50/70 p-4">
            <div className="text-2xl">💡</div>
            <div className="flex-1 text-sm text-violet-900">
              <strong>Estás en modo &ldquo;Hoja por área&rdquo;:</strong> así es el examen real UMSS. Cada hoja tiene todas las preguntas de un área (Matemáticas, Económicas, etc.) y respondes en el orden que prefieras. Si prefieres ver una pregunta a la vez, usa el toggle arriba.
            </div>
            <button onClick={cerrarTip} className="text-xl text-violet-500 hover:text-violet-700" aria-label="Cerrar tip">×</button>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
        {/* Pregunta principal */}
        {vista === "una" && (
        <main>
          <div className="mb-4 flex items-center gap-2 text-xs">
            <span className="rounded bg-neutral-900 px-2 py-0.5 font-bold text-white">
              {indice + 1} / {preguntas.length}
            </span>
            <span className="rounded bg-violet-50 px-2 py-0.5 text-violet-700">
              {ETIQUETAS_AREA[pregunta.area] ?? pregunta.area}
            </span>
            <span className="text-neutral-400">·</span>
            <span className="text-neutral-600">{pregunta.tema}</span>
            <button
              type="button"
              onClick={() => toggleMarcada(pregunta.id)}
              className={`ml-auto rounded-lg border px-3 py-1 font-medium transition-colors ${
                marcadas.has(pregunta.id)
                  ? "border-amber-400 bg-amber-50 text-amber-700"
                  : "border-neutral-300 text-neutral-600 hover:bg-neutral-50"
              }`}
            >
              {marcadas.has(pregunta.id) ? "★ Marcada" : "☆ Marcar"}
            </button>
          </div>

          <motion.div
            key={pregunta.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
          >
            <div className="mb-6 text-base leading-relaxed text-neutral-900 sm:text-lg">
              <MathText block>{pregunta.enunciado}</MathText>
            </div>
            {(pregunta.tipo ?? "seleccion_simple") === "completar" ? (
              <div className="space-y-3">
                <p className="text-sm text-neutral-500">Escribe tu respuesta:</p>
                {Array.from({ length: cantidadEspacios(pregunta) }, (_, i) => {
                  const partes = (seleccion ?? "").split(SEP_LLENADO);
                  const total = cantidadEspacios(pregunta);
                  return (
                    <div key={i} className="flex items-center gap-2">
                      {total > 1 && (
                        <span className="text-sm font-semibold text-neutral-500">{i + 1}.</span>
                      )}
                      <input
                        type="text"
                        value={partes[i] ?? ""}
                        onChange={(e) => responderTexto(pregunta.id, i, e.target.value, total)}
                        placeholder="Tu respuesta…"
                        className="w-full rounded-xl border border-neutral-300 p-3 text-sm focus:border-violet-500 focus:outline-none sm:text-base"
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-2">
                {pregunta.opciones.map((op) => {
                  const elegida = seleccion === op.letra;
                  return (
                    <button
                      key={op.letra}
                      type="button"
                      onClick={() => elegirOpcion(pregunta.id, op.letra)}
                      className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left transition-all ${
                        elegida
                          ? "border-violet-500 bg-violet-50"
                          : "border-neutral-200 bg-white hover:border-violet-300 hover:bg-violet-50/30"
                      }`}
                    >
                      <span
                        className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                          elegida
                            ? "bg-violet-600 text-white"
                            : "border border-neutral-400 text-neutral-700"
                        }`}
                      >
                        {op.letra}
                      </span>
                      <span className="flex-1 text-sm sm:text-base">
                        <MathText>{op.texto}</MathText>
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </motion.div>

          {/* Navegación */}
          <div className="mt-6 flex items-center justify-between gap-3">
            <button
              type="button"
              disabled={indice === 0}
              onClick={() => setIndice((i) => Math.max(0, i - 1))}
              className="rounded-xl border border-neutral-300 px-5 py-2.5 font-semibold text-neutral-700 hover:bg-neutral-50 disabled:opacity-40"
            >
              ← Anterior
            </button>
            {indice < preguntas.length - 1 ? (
              <button
                type="button"
                onClick={() => setIndice((i) => Math.min(preguntas.length - 1, i + 1))}
                className="rounded-xl bg-violet-600 px-5 py-2.5 font-semibold text-white hover:bg-violet-700"
              >
                Siguiente →
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmFinalizar(true)}
                className="rounded-xl bg-emerald-600 px-5 py-2.5 font-bold text-white shadow-lg hover:bg-emerald-700"
              >
                Finalizar examen
              </button>
            )}
          </div>
        </main>
        )}

        {/* MODO HOJA — todas las preguntas del área seleccionada */}
        {vista === "hoja" && grupos.length > 0 && (
        <main>
          {/* Indicador de progreso secuencial (no clickeable, como examen real) */}
          <div className="mb-4 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between gap-2 flex-wrap">
              <div className="text-xs font-bold uppercase tracking-wide text-neutral-500">
                Progreso del examen
              </div>
              <div className="text-xs text-neutral-500">
                Hoja {areaActualIdx + 1} de {grupos.length}
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              {grupos.map((g, gi) => {
                const respondidasArea = g.indices.filter((i) => !!simulador.respuestas_usuario[preguntas[i].id]).length;
                const completa = respondidasArea === g.preguntas.length;
                const actual = gi === areaActualIdx;
                const pasada = gi < areaActualIdx;
                return (
                  <div key={g.area} className="flex-1 flex flex-col items-center gap-1 min-w-0">
                    <div className={`h-2 w-full rounded-full transition-all ${
                      actual ? "bg-violet-500" :
                      pasada ? "bg-emerald-500" :
                      "bg-neutral-200"
                    }`} />
                    <div className={`text-[10px] font-bold uppercase tracking-wide truncate w-full text-center ${
                      actual ? "text-violet-700" :
                      pasada ? "text-emerald-700" :
                      "text-neutral-400"
                    }`}>
                      {ETIQUETAS_AREA[g.area] ?? g.area}
                    </div>
                    <div className="text-[10px] text-neutral-500">
                      {pasada ? "✓ completada" : actual ? `${respondidasArea}/${g.preguntas.length}` : `${g.preguntas.length} preg.`}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Hoja del área actual */}
          {(() => {
            const grupo = grupos[areaActualIdx];
            if (!grupo) return null;
            return (
              <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
                <div className="border-b border-neutral-200 bg-neutral-50 px-5 py-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wide text-neutral-500">Hoja {areaActualIdx + 1} de {grupos.length}</div>
                      <div className="text-lg font-bold text-neutral-900">{ETIQUETAS_AREA[grupo.area] ?? grupo.area}</div>
                    </div>
                    <div className="text-xs text-neutral-500">
                      {grupo.preguntas.length} preguntas
                    </div>
                  </div>
                </div>
                <div className="divide-y divide-neutral-200">
                  {grupo.preguntas.map((p, idxLocal) => {
                    const numeroGlobal = grupo.indices[idxLocal] + 1;
                    const sel = simulador.respuestas_usuario[p.id];
                    const marc = marcadas.has(p.id);
                    return (
                      <div key={p.id} id={`pregunta-${p.id}`} className="p-5">
                        <div className="mb-3 flex items-start gap-3">
                          <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-violet-600 text-xs font-bold text-white">
                            {numeroGlobal}
                          </span>
                          <div className="flex-1 text-sm font-medium leading-relaxed text-neutral-900 sm:text-base">
                            <MathText block>{p.enunciado}</MathText>
                          </div>
                          <button
                            type="button"
                            onClick={() => toggleMarcada(p.id)}
                            className={`flex-shrink-0 rounded-md border px-2 py-1 text-xs font-medium transition-colors ${
                              marc ? "border-amber-400 bg-amber-50 text-amber-700" : "border-neutral-300 text-neutral-500 hover:bg-neutral-50"
                            }`}
                          >
                            {marc ? "★" : "☆"}
                          </button>
                        </div>
                        {(p.tipo ?? "seleccion_simple") === "completar" ? (
                          <div className="ml-10 space-y-2">
                            {Array.from({ length: cantidadEspacios(p) }, (_, ci) => {
                              const partes = (sel ?? "").split(SEP_LLENADO);
                              const total = cantidadEspacios(p);
                              return (
                                <input
                                  key={ci}
                                  type="text"
                                  value={partes[ci] ?? ""}
                                  onChange={(e) => responderTexto(p.id, ci, e.target.value, total)}
                                  placeholder={total > 1 ? `Respuesta ${ci + 1}…` : "Tu respuesta…"}
                                  className="w-full rounded-lg border border-neutral-300 p-2.5 text-sm focus:border-violet-500 focus:outline-none"
                                />
                              );
                            })}
                          </div>
                        ) : (
                        <div className="ml-10 grid gap-2 sm:grid-cols-2">
                          {p.opciones.map((op) => {
                            const elegida = sel === op.letra;
                            return (
                              <button
                                key={op.letra}
                                type="button"
                                onClick={() => elegirOpcion(p.id, op.letra)}
                                className={`flex items-start gap-2 rounded-lg border p-2.5 text-left text-sm transition-all ${
                                  elegida
                                    ? "border-violet-500 bg-violet-50"
                                    : "border-neutral-200 bg-white hover:border-violet-300 hover:bg-violet-50/30"
                                }`}
                              >
                                <span className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                                  elegida ? "bg-violet-600 text-white" : "border border-neutral-400 text-neutral-700"
                                }`}>
                                  {op.letra}
                                </span>
                                <span className="flex-1">
                                  <MathText>{op.texto}</MathText>
                                </span>
                              </button>
                            );
                          })}
                        </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}

          {/* Navegación: solo avanzar (no se puede volver, como examen real UMSS) */}
          <div className="mt-6 flex items-center justify-end gap-3">
            {areaActualIdx < grupos.length - 1 ? (
              (() => {
                const siguiente = grupos[areaActualIdx + 1];
                return (
                  <button
                    type="button"
                    onClick={() => {
                      if (!confirm("¿Pasar a la siguiente hoja? Una vez avanzas, no podrás volver a esta sección (igual que el examen real).")) return;
                      setAreaActualIdx((i) => Math.min(grupos.length - 1, i + 1));
                      if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="rounded-xl bg-violet-600 px-6 py-3 font-bold text-white shadow-lg hover:bg-violet-700"
                  >
                    Continuar a {ETIQUETAS_AREA[siguiente.area] ?? siguiente.area} →
                  </button>
                );
              })()
            ) : (
              <button
                type="button"
                onClick={() => setConfirmFinalizar(true)}
                className="rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white shadow-lg hover:bg-emerald-700"
              >
                ✓ Finalizar examen
              </button>
            )}
          </div>
          <p className="mt-2 text-right text-xs text-neutral-500">
            ⚠️ Avanzar es irreversible. Asegúrate de responder todas las preguntas antes de pasar.
          </p>
        </main>
        )}

      </div>

      {/* Modal confirmación finalizar */}
      {confirmFinalizar && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md rounded-2xl bg-white p-6 shadow-2xl"
          >
            <h3 className="text-xl font-bold text-neutral-900">
              ¿Finalizar el examen?
            </h3>
            <p className="mt-2 text-sm text-neutral-600">
              Tienes <b>{respondidas}</b> respondidas y{" "}
              <b>{preguntas.length - respondidas}</b> sin responder. Una vez
              finalizado verás tu nota y desglose.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setConfirmFinalizar(false)}
                className="flex-1 rounded-xl border border-neutral-300 py-2.5 font-semibold text-neutral-700 hover:bg-neutral-50"
              >
                Seguir respondiendo
              </button>
              <button
                type="button"
                onClick={finalizar}
                disabled={finalizando}
                className="flex-1 rounded-xl bg-emerald-600 py-2.5 font-bold text-white hover:bg-emerald-700 disabled:opacity-50"
              >
                {finalizando ? "Calificando…" : "Sí, finalizar"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

function Cronometro({ segundos }: { segundos: number | null }) {
  if (segundos === null) return null;
  const m = Math.floor(segundos / 60);
  const s = segundos % 60;
  const critico = segundos < 300;
  return (
    <div
      className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 font-mono text-base font-bold ${
        critico
          ? "border-red-300 bg-red-50 text-red-700"
          : "border-neutral-300 bg-white text-neutral-900"
      }`}
    >
      <span>⏱</span>
      <span>
        {String(m).padStart(2, "0")}:{String(s).padStart(2, "0")}
      </span>
    </div>
  );
}

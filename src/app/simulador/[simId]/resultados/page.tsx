"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import MathText from "../../../components/MathText";
import type { PreguntaBanco, Simulador } from "@/lib/axiom/types";
import { esRespuestaCorrecta } from "@/lib/axiom/respuestas";
import { esPago } from "@/lib/plan";

const ETIQUETAS_AREA: Record<string, string> = {
  matematicas: "Matemáticas",
  economicas: "Económicas",
  verbal: "Verbal",
  razonamiento: "Razonamiento",
  fisica: "Física",
  quimica: "Química",
  biologia: "Biología",
  civica: "Cívica",
  historia: "Historia",
  general: "General",
};

// Nombre lindo de la sección. Para secciones propias de cada facultad
// (ej. "libro_1") devuelve "Libro 1".
function etiquetaSeccion(area: string): string {
  if (ETIQUETAS_AREA[area]) return ETIQUETAS_AREA[area];
  return (area || "general")
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

// Agrupa preguntas por sección, conservando el orden de aparición.
function agruparPorSeccion(preguntas: PreguntaBanco[]): { seccion: string; items: PreguntaBanco[] }[] {
  const orden: string[] = [];
  const mapa = new Map<string, PreguntaBanco[]>();
  for (const p of preguntas) {
    const s = p.area || "general";
    if (!mapa.has(s)) { mapa.set(s, []); orden.push(s); }
    mapa.get(s)!.push(p);
  }
  return orden.map((s) => ({ seccion: s, items: mapa.get(s)! }));
}

export default function ResultadosPage() {
  const params = useParams();
  const router = useRouter();
  const simId = params.simId as string;
  const [simulador, setSimulador] = useState<Simulador | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [verSoloFalladas, setVerSoloFalladas] = useState(true);
  const [reforzando, setReforzando] = useState(false);
  const [errorReforzar, setErrorReforzar] = useState<string | null>(null);
  const [generandoPlan, setGenerandoPlan] = useState(false);
  const [plan, setPlan] = useState<{
    area_debil: string;
    dias: { dia: number; tema: string; tiempo_minutos: number; ejercicios: number; descripcion: string }[];
  } | null>(null);
  const [errorPlan, setErrorPlan] = useState<string | null>(null);
  const [pagado, setPagado] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me").then((r) => r.json()).then((me) => setPagado(esPago(me?.usuario?.plan))).catch(() => {});
  }, []);

  useEffect(() => {
    // Intentar primero del servidor (que tiene la nota final calculada).
    // Si la lambda se durmio, hacemos fallback a localStorage (sin nota).
    fetch(`/api/axiom/simulador/${simId}`)
      .then(async (r) => {
        const data = await r.json();
        if (!r.ok) {
          // Fallback: leer del navegador
          if (typeof window !== "undefined") {
            const raw = localStorage.getItem(`axiom_sim_${simId}`);
            if (raw) {
              const local = JSON.parse(raw);
              setSimulador(local);
              return;
            }
          }
          throw new Error(data.error ?? "Error");
        }
        setSimulador(data.simulador);
        // Los errores ya se guardan en la base de datos al finalizar el examen
        // (server-side), atados a la cuenta del usuario.
      })
      .catch((e) => setError(e instanceof Error ? e.message : String(e)))
      .finally(() => setCargando(false));
  }, [simId]);

  const generarPlanIA = async () => {
    setGenerandoPlan(true);
    setErrorPlan(null);
    try {
      const r = await fetch("/api/axiom/plan-personalizado", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ simuladorId: simId }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error ?? "Error generando plan");
      setPlan({
        area_debil: data.plan.area_debil,
        dias: data.plan.dias,
      });
    } catch (e) {
      setErrorPlan(e instanceof Error ? e.message : String(e));
    } finally {
      setGenerandoPlan(false);
    }
  };

  const reforzarMisErrores = async () => {
    setReforzando(true);
    setErrorReforzar(null);
    try {
      const errData = await fetch("/api/axiom/errores").then((r) => r.json()).catch(() => ({}));
      const temas: string[] = errData.temas_reforzar ?? [];
      if (temas.length === 0) {
        setErrorReforzar("No hay temas a reforzar todavía. Termina otro examen.");
        setReforzando(false);
        return;
      }
      const config = {
        modo: "mis_errores" as const,
        universidad: simulador?.config?.universidad ?? "UMSS",
        facultad: simulador?.config?.facultad ?? "economicas",
        cantidad_preguntas: 10,
        dificultad: "medio" as const,
        temas_reforzar: temas,
      };
      const r = await fetch("/api/axiom/simulador", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ config }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error ?? "Error");
      router.push(`/simulador/${data.simulador.id}`);
    } catch (e) {
      setErrorReforzar(e instanceof Error ? e.message : String(e));
      setReforzando(false);
    }
  };

  const preguntas: PreguntaBanco[] = useMemo(
    () => simulador?.preguntas ?? [],
    [simulador]
  );

  const falladas = useMemo(() => {
    if (!simulador) return [];
    return preguntas.filter((p) => !esRespuestaCorrecta(p, simulador.respuestas_usuario[p.id]));
  }, [simulador, preguntas]);

  if (cargando) {
    return <div className="p-8 text-center text-neutral-500">Cargando resultados…</div>;
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

  const nota = simulador.nota_final ?? 0;
  const desglose = simulador.desglose ?? {};
  const tiempo = simulador.tiempo_usado_segundos ?? 0;
  const mins = Math.floor(tiempo / 60);
  const secs = tiempo % 60;

  const correctas = preguntas.filter(
    (p) => esRespuestaCorrecta(p, simulador.respuestas_usuario[p.id])
  ).length;
  const sinResponder = preguntas.filter(
    (p) => !simulador.respuestas_usuario[p.id]
  ).length;
  const incorrectas = preguntas.length - correctas - sinResponder;

  const nivel = nivelDeNota(nota);
  const mostrar = verSoloFalladas ? falladas : preguntas;

  // Feedback personalizado (sin IA): punto débil/fuerte y qué hacer ahora.
  const ordenadasFb = Object.entries(desglose).sort((a, b) => a[1] - b[1]);
  const peor = ordenadasFb[0];
  const mejor = ordenadasFb[ordenadasFb.length - 1];
  const tituloFb = nota >= 70 ? "¡Buen trabajo! 🎉" : nota >= 50 ? "Vas por buen camino 💪" : "A reforzar — tú puedes 🔥";
  const textoFb = nota >= 70
    ? "Dominas la mayoría del examen. Pule los detalles y mantén el ritmo."
    : nota >= 50
      ? "Tienes una buena base. Enfócate en tu punto más débil y subirás rápido."
      : "No te desanimes: identificamos exactamente dónde reforzar. Un paso a la vez.";

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      {/* Hero con nota */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`border-b ${nivel.fondoClase}`}
      >
        <div className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-6 sm:py-16">
          <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">
            Tu resultado
          </p>
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className={`my-4 text-7xl font-black sm:text-8xl ${nivel.textoClase}`}
          >
            {nota}
            <span className="text-3xl text-neutral-400">/100</span>
          </motion.div>
          <p className="mx-auto max-w-xl text-lg text-neutral-700">
            {nivel.mensaje}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
            <Badge color="emerald">✓ {correctas} correctas</Badge>
            {incorrectas > 0 && <Badge color="red">✗ {incorrectas} incorrectas</Badge>}
            {sinResponder > 0 && <Badge color="neutral">○ {sinResponder} sin responder</Badge>}
            <Badge color="neutral">⏱ {mins}m {secs}s</Badge>
          </div>
        </div>
      </motion.div>

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        {/* Feedback personalizado */}
        <section className="mb-10">
          <div className="rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-indigo-50 p-6">
            <h2 className="text-xl font-bold text-violet-900">{tituloFb}</h2>
            <p className="mt-1 text-sm text-violet-800">{textoFb}</p>

            {peor && mejor && (
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-red-200 bg-white p-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-red-600">Reforzar</div>
                  <div className="mt-0.5 text-sm font-semibold text-neutral-900">
                    {etiquetaSeccion(peor[0])} — {peor[1]}%
                  </div>
                </div>
                <div className="rounded-xl border border-emerald-200 bg-white p-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-600">Tu fortaleza</div>
                  <div className="mt-0.5 text-sm font-semibold text-neutral-900">
                    {etiquetaSeccion(mejor[0])} — {mejor[1]}%
                  </div>
                </div>
              </div>
            )}

            <div className="mt-4 rounded-xl bg-white/70 p-3 text-sm text-neutral-700">
              <span className="font-semibold">Qué hacer ahora: </span>
              {falladas.length > 0
                ? `Repasa las ${falladas.length} preguntas que fallaste (abajo) y vuelve a practicar tu punto débil.`
                : "¡Sin errores! Sube la dificultad o prueba otra sección para seguir mejorando."}
              {!pagado && (
                <span> Con <Link href="/precios" className="font-bold text-violet-700 underline">Premium</Link> desbloqueas el plan de estudio que ataca justo tus fallos.</span>
              )}
            </div>
          </div>
        </section>

        {/* Desglose por área */}
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-bold text-neutral-900">
            Desglose por área
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(desglose).map(([area, porc]) => (
              <DesgloseArea key={area} area={area} porcentaje={porc} />
            ))}
          </div>
        </section>

        {/* CTA principal: reforzar con IA + secundarios */}
        <section className="mb-10 space-y-3">
          {falladas.length > 0 && pagado && (
            <button
              type="button"
              onClick={reforzarMisErrores}
              disabled={reforzando}
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 px-6 py-5 font-bold text-white shadow-xl transition-all hover:-translate-y-0.5 hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-60"
            >
              {reforzando ? (
                <>
                  <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  La IA está creando 10 preguntas sobre lo que fallaste...
                </>
              ) : (
                <>
                  🎯 Reforzar lo que fallé con la IA
                  <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider">
                    Recomendado
                  </span>
                </>
              )}
            </button>
          )}
          {falladas.length > 0 && !pagado && (
            <Link
              href="/precios"
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 px-6 py-5 font-bold text-white shadow-xl transition-all hover:-translate-y-0.5 hover:shadow-2xl"
            >
              🔒 Reforzar lo que fallé con la IA — Premium
            </Link>
          )}
          {errorReforzar && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              ⚠️ {errorReforzar}
            </div>
          )}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Link
              href="/practicar"
              className="flex items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white px-6 py-3.5 font-semibold text-neutral-700 hover:bg-neutral-50"
            >
              Practicar otro examen
            </Link>
            <Link
              href="/"
              className="flex items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white px-6 py-3.5 font-semibold text-neutral-700 hover:bg-neutral-50"
            >
              Volver a Axiom
            </Link>
          </div>
        </section>

        {/* Plan personalizado IA */}
        <section className="mb-10">
          {!plan && (
            <div className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-bold text-amber-900">
                    📋 ¿Quieres un plan de estudio personalizado?
                  </h3>
                  <p className="mt-1 text-sm text-amber-800">
                    La IA analiza tus errores reales y arma un plan de 3 días
                    enfocado en lo que más te costó.
                  </p>
                </div>
                {pagado ? (
                  <button
                    type="button"
                    onClick={generarPlanIA}
                    disabled={generandoPlan}
                    className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-amber-600 px-5 py-3 font-bold text-white shadow-lg transition-all hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {generandoPlan ? (
                      <>
                        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                        Generando...
                      </>
                    ) : (
                      "Generar mi plan IA"
                    )}
                  </button>
                ) : (
                  <Link
                    href="/precios"
                    className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-amber-600 px-5 py-3 font-bold text-white shadow-lg transition-all hover:bg-amber-700"
                  >
                    🔒 Desbloquear con Premium →
                  </Link>
                )}
              </div>
              {errorPlan && (
                <div className="mt-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  ⚠️ {errorPlan}
                </div>
              )}
            </div>
          )}

          {plan && (
            <div className="rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-indigo-50 p-6">
              <div className="mb-4 flex items-center gap-2">
                <span className="text-2xl">📋</span>
                <div>
                  <h3 className="text-lg font-bold text-violet-900">
                    Tu plan de estudio personalizado
                  </h3>
                  <p className="text-sm text-violet-700">
                    Área a reforzar: <strong>{plan.area_debil}</strong>
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {plan.dias.map((d) => (
                  <div
                    key={d.dia}
                    className="rounded-xl border border-violet-200 bg-white p-4"
                  >
                    <div className="mb-1 text-xs font-bold uppercase tracking-wider text-violet-600">
                      Día {d.dia}
                    </div>
                    <div className="mb-2 text-base font-bold text-neutral-900">
                      {d.tema}
                    </div>
                    <div className="mb-2 flex gap-3 text-xs text-neutral-600">
                      <span>⏱ {d.tiempo_minutos} min</span>
                      <span>📝 {d.ejercicios} ejercicios</span>
                    </div>
                    <p className="text-sm text-neutral-700">{d.descripcion}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Preguntas */}
        <section>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-bold text-neutral-900">
              {verSoloFalladas
                ? `Tus errores (${falladas.length})`
                : `Todas las preguntas (${preguntas.length})`}
            </h2>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setVerSoloFalladas(true)}
                className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${
                  verSoloFalladas
                    ? "bg-neutral-900 text-white"
                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                }`}
              >
                Solo errores
              </button>
              <button
                type="button"
                onClick={() => setVerSoloFalladas(false)}
                className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${
                  !verSoloFalladas
                    ? "bg-neutral-900 text-white"
                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                }`}
              >
                Todas
              </button>
            </div>
          </div>

          {mostrar.length === 0 ? (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-10 text-center">
              <p className="text-2xl font-bold text-emerald-700">
                🎉 ¡Sin errores!
              </p>
              <p className="mt-1 text-emerald-600">
                Lograste un puntaje perfecto. Sigue así.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {agruparPorSeccion(mostrar).map(({ seccion, items }) => (
                <div key={seccion}>
                  <div className="mb-3 flex items-center gap-2 border-b border-neutral-200 pb-2">
                    <span className="rounded-lg bg-neutral-900 px-3 py-1 text-sm font-bold text-white">
                      {etiquetaSeccion(seccion)}
                    </span>
                    <span className="text-sm text-neutral-500">
                      {items.length} pregunta{items.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="space-y-4">
                    {items.map((p, i) => (
                      <PreguntaRevision
                        key={p.id}
                        pregunta={p}
                        indice={preguntas.indexOf(p)}
                        respuesta={simulador.respuestas_usuario[p.id]}
                        totalMostrados={i}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function nivelDeNota(nota: number): {
  mensaje: string;
  fondoClase: string;
  textoClase: string;
} {
  if (nota >= 80) {
    return {
      mensaje: "¡Excelente! Estás en el camino correcto. Sigue así.",
      fondoClase: "bg-emerald-50 border-emerald-100",
      textoClase: "text-emerald-600",
    };
  }
  if (nota >= 60) {
    return {
      mensaje: "Buen trabajo. Identifica las áreas débiles y vuelve a practicar.",
      fondoClase: "bg-violet-50 border-violet-100",
      textoClase: "text-violet-600",
    };
  }
  if (nota >= 40) {
    return {
      mensaje: "Vas avanzando. Enfócate en los temas que más fallaste.",
      fondoClase: "bg-amber-50 border-amber-100",
      textoClase: "text-amber-600",
    };
  }
  return {
    mensaje: "Cada intento te acerca. Revisa tus errores con calma.",
    fondoClase: "bg-red-50 border-red-100",
    textoClase: "text-red-600",
  };
}

function Badge({
  children,
  color,
}: {
  children: React.ReactNode;
  color: "emerald" | "red" | "neutral";
}) {
  const cls = {
    emerald: "bg-emerald-100 text-emerald-700",
    red: "bg-red-100 text-red-700",
    neutral: "bg-neutral-100 text-neutral-700",
  }[color];
  return (
    <span className={`rounded-full px-3 py-1 font-semibold ${cls}`}>
      {children}
    </span>
  );
}

function DesgloseArea({ area, porcentaje }: { area: string; porcentaje: number }) {
  const color =
    porcentaje >= 80
      ? "from-emerald-500 to-emerald-600"
      : porcentaje >= 60
      ? "from-violet-500 to-violet-600"
      : porcentaje >= 40
      ? "from-amber-500 to-amber-600"
      : "from-red-500 to-red-600";
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="mb-1 text-xs uppercase tracking-wider text-neutral-500">
        {etiquetaSeccion(area)}
      </div>
      <div className="text-3xl font-black text-neutral-900">{porcentaje}%</div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-neutral-100">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${porcentaje}%` }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
        />
      </div>
    </div>
  );
}

function PreguntaRevision({
  pregunta,
  indice,
  respuesta,
  totalMostrados,
}: {
  pregunta: PreguntaBanco;
  indice: number;
  respuesta?: string;
  totalMostrados: number;
}) {
  const correcta = esRespuestaCorrecta(pregunta, respuesta);
  const sinResponder = !respuesta;
  const esLlenado = (pregunta.tipo ?? "seleccion_simple") === "completar";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: Math.min(totalMostrados * 0.05, 0.5) }}
      className={`rounded-2xl border bg-white p-5 shadow-sm ${
        correcta ? "border-emerald-200" : sinResponder ? "border-neutral-300" : "border-red-200"
      }`}
    >
      <div className="mb-3 flex items-center gap-2 text-xs">
        <span className="rounded bg-neutral-900 px-2 py-0.5 font-bold text-white">
          {indice + 1}
        </span>
        <span className="rounded bg-violet-50 px-2 py-0.5 text-violet-700">
          {etiquetaSeccion(pregunta.area)}
        </span>
        <span className="text-neutral-400">·</span>
        <span className="text-neutral-600">{pregunta.tema}</span>
        <span className="ml-auto">
          {correcta && (
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-700">
              ✓ Correcta
            </span>
          )}
          {sinResponder && (
            <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-bold text-neutral-700">
              ○ Sin responder
            </span>
          )}
          {!correcta && !sinResponder && (
            <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-bold text-red-700">
              ✗ Incorrecta
            </span>
          )}
        </span>
      </div>

      <div className="mb-4 text-sm leading-relaxed text-neutral-800 sm:text-base">
        <MathText block>{pregunta.enunciado}</MathText>
      </div>

      {esLlenado ? (
        <div className="space-y-2 text-sm">
          <div className={`rounded-lg border p-2.5 ${correcta ? "border-emerald-400 bg-emerald-50 text-emerald-900" : "border-red-400 bg-red-50 text-red-900"}`}>
            <span className="font-semibold">Tu respuesta: </span>
            {sinResponder ? <em className="text-neutral-500">(sin responder)</em> : (respuesta ?? "").split("|||").join(", ")}
          </div>
          <div className="rounded-lg border border-emerald-400 bg-emerald-50 p-2.5 text-emerald-900">
            <span className="font-semibold">Respuesta correcta: </span>
            {(pregunta.espacios_completar ?? []).join(", ")}
          </div>
        </div>
      ) : (
      <div className="space-y-2">
        {pregunta.opciones.map((op) => {
          const esCorrecta = op.letra === pregunta.respuesta_correcta;
          const fueElegida = op.letra === respuesta;
          let cls = "border-neutral-200 bg-white text-neutral-700";
          if (esCorrecta) cls = "border-emerald-400 bg-emerald-50 text-emerald-900";
          else if (fueElegida) cls = "border-red-400 bg-red-50 text-red-900";
          return (
            <div
              key={op.letra}
              className={`flex items-start gap-3 rounded-lg border p-2.5 text-sm ${cls}`}
            >
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-current text-xs font-bold">
                {op.letra}
              </span>
              <span className="flex-1">
                <MathText>{op.texto}</MathText>
              </span>
              {esCorrecta && <span className="text-emerald-600">✓</span>}
              {fueElegida && !esCorrecta && <span className="text-red-600">✗</span>}
            </div>
          );
        })}
      </div>
      )}

      {pregunta.explicacion && (
        <div className="mt-4 rounded-xl border border-violet-100 bg-violet-50/50 p-4">
          <div className="mb-1 text-xs font-bold uppercase tracking-wider text-violet-700">
            Explicación
          </div>
          <div className="text-sm leading-relaxed text-neutral-800">
            <MathText block>{pregunta.explicacion}</MathText>
          </div>
        </div>
      )}
    </motion.div>
  );
}

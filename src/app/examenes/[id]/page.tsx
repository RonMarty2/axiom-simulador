"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import BackLink from "../../components/BackLink";
import MathText from "../../components/MathText";
import FiguraExamen, { FiguraSVGLibre } from "../../components/FiguraExamen";
import Cargando from "../../components/Cargando";
import type { ExamenBanco, PreguntaBanco } from "@/lib/axiom/types";

const ETIQUETAS_AREA: Record<string, string> = {
  matematicas: "Matemáticas",
  aritmetica_algebra: "Aritmética-Álgebra",
  geometria_trigonometria: "Geometría-Trigonometría",
  economicas: "Económicas",
  verbal: "Verbal",
  razonamiento: "Razonamiento",
  general: "General",
};

// Formatea "2025-07-21" -> "21 jul 2025" (evita ambigüedad de fecha en el detalle).
function formatearFecha(fechaISO: string): string {
  const [anio, mes, dia] = fechaISO.split("-").map(Number);
  if (!anio || !mes || !dia) return fechaISO;
  const MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  return `${dia} ${MESES[mes - 1]} ${anio}`;
}

export default function ExamenDetallePage() {
  const params = useParams();
  const id = params.id as string;
  const [examen, setExamen] = useState<ExamenBanco | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [revelar, setRevelar] = useState<Record<string, boolean>>({});
  const [seleccion, setSeleccion] = useState<Record<string, string>>({});
  const [bloqueada, setBloqueada] = useState(false);

  useEffect(() => {
    fetch(`/api/axiom/examenes/${id}`)
      .then(async (r) => {
        const data = await r.json();
        if (!r.ok) throw new Error(data.error ?? "Error");
        setExamen(data.examen);
        setBloqueada(!!data.resolucion_bloqueada);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  const toggleRevelar = (pid: string) =>
    setRevelar((prev) => ({ ...prev, [pid]: !prev[pid] }));

  const elegir = (pid: string, letra: string) =>
    setSeleccion((prev) => ({ ...prev, [pid]: letra }));

  if (loading) {
    return <Cargando texto="Cargando examen…" />;
  }

  if (error || !examen) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
          {error ?? "Examen no encontrado"}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="mb-4">
          <BackLink href="/examenes" label="Volver al banco" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 rounded-2xl border border-neutral-200/80 bg-white/82 p-6 backdrop-blur-xl"
        >
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
              {examen.universidad}
            </span>
            <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
              {examen.facultad}
            </span>
            <span className="text-sm text-neutral-500">· {examen.anio}</span>
          </div>
          <h1 className="text-3xl font-black text-[#171545]">
            {examen.titulo ?? `Examen ${examen.anio}${examen.opcion ? ` · ${examen.opcion}` : ""} · ${examen.universidad}`}
          </h1>
          <p className="mt-1 text-sm text-neutral-600">
            {examen.preguntas.length} preguntas · {examen.duracion_minutos} min
            {examen.fecha_examen ? ` · tomado el ${formatearFecha(examen.fecha_examen)}` : ""}
          </p>
        </motion.div>

        <div className="space-y-6">
          {examen.preguntas.map((p, idx) => (
            <PreguntaCard
              key={p.id}
              pregunta={p}
              indice={idx}
              seleccion={seleccion[p.id]}
              revelada={!!revelar[p.id]}
              bloqueada={bloqueada}
              onElegir={(letra) => elegir(p.id, letra)}
              onRevelar={() => toggleRevelar(p.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface PreguntaCardProps {
  pregunta: PreguntaBanco;
  indice: number;
  seleccion?: string;
  revelada: boolean;
  bloqueada: boolean;
  onElegir: (letra: string) => void;
  onRevelar: () => void;
}

function PreguntaCard({
  pregunta,
  indice,
  seleccion,
  revelada,
  bloqueada,
  onElegir,
  onRevelar,
}: PreguntaCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl border border-neutral-200/80 bg-white/82 p-6 backdrop-blur-xl"
    >
      <div className="mb-3 flex items-center gap-2 text-xs font-medium text-neutral-500">
        <span className="rounded bg-neutral-900 px-2 py-0.5 font-bold text-white">
          {indice + 1}
        </span>
        <span className="rounded bg-[var(--accent-soft)] px-2 py-0.5 text-[var(--accent)]">
          {ETIQUETAS_AREA[pregunta.area] ?? pregunta.area}
        </span>
        <span className="text-neutral-400">·</span>
        <span>{pregunta.tema}</span>
        <span className="text-neutral-400">·</span>
        <span className="capitalize">{pregunta.dificultad}</span>
      </div>

      <div className="mb-5 text-base leading-relaxed text-neutral-900">
        <MathText block>{pregunta.enunciado}</MathText>
      </div>

      {/* Figura: SVG del propio .md (exámenes en lote) o figura del motor */}
      {pregunta.figura_svg ? (
        <FiguraSVGLibre svg={pregunta.figura_svg} />
      ) : (
        pregunta.figura && <FiguraExamen id={pregunta.figura} />
      )}

      <div className="space-y-2">
        {pregunta.opciones.map((op) => {
          const elegida = seleccion === op.letra;
          const esCorrecta = pregunta.respuesta_correcta === op.letra;
          let estilo =
            "border-neutral-200 bg-white hover:border-[var(--border-hover)] hover:bg-[var(--accent-soft)]/50";
          if (revelada && esCorrecta) {
            estilo = "border-emerald-400 bg-emerald-50";
          } else if (revelada && elegida && !esCorrecta) {
            estilo = "border-red-400 bg-red-50";
          } else if (elegida) {
            estilo = "border-[var(--accent)] bg-[var(--accent-soft)]";
          }
          return (
            <button
              key={op.letra}
              type="button"
              onClick={() => onElegir(op.letra)}
              disabled={revelada}
              className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left transition-all ${estilo} ${
                revelada ? "cursor-default" : "cursor-pointer"
              }`}
            >
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-current text-sm font-bold">
                {op.letra}
              </span>
              <span className="min-w-0 flex-1 text-sm">
                <MathText>{op.texto}</MathText>
              </span>
              {revelada && esCorrecta && <span className="text-emerald-600">✓</span>}
              {revelada && elegida && !esCorrecta && (
                <span className="text-red-600">✗</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Sin plan pago el servidor no manda ni la respuesta ni el paso a paso,
          así que acá no hay nada que revelar. Se dice en pantalla en vez de
          dejar un botón que no haría nada. */}
      {bloqueada ? (
        <div
          className="mt-4 rounded-xl border p-4"
          style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
        >
          <div className="text-sm font-semibold" style={{ color: "var(--fg-primary)" }}>
            La respuesta y el paso a paso son de Premium
          </div>
          <p className="mt-1 text-sm" style={{ color: "var(--fg-muted)" }}>
            Puedes leer el examen completo. Para ver la respuesta correcta y la
            explicación resuelta de cada pregunta, necesitas un plan activo.
          </p>
          <Link
            href="/precios?motivo=resolucion"
            className="mt-3 inline-block text-sm font-semibold text-[var(--accent)] hover:underline"
          >
            Ver planes
          </Link>
        </div>
      ) : (
      <div className="mt-4 flex items-center justify-between">
        <button
          type="button"
          onClick={onRevelar}
          className="text-sm font-semibold text-[var(--accent)] hover:underline"
        >
          {revelada ? "Ocultar respuesta" : "Ver respuesta y explicación"}
        </button>
        {revelada && seleccion && (
          <span className="text-sm font-medium">
            {seleccion === pregunta.respuesta_correcta ? (
              <span className="text-emerald-600">¡Correcto!</span>
            ) : (
              <span className="text-red-600">
                Incorrecto · correcta: {pregunta.respuesta_correcta}
              </span>
            )}
          </span>
        )}
      </div>
      )}

      {revelada && pregunta.explicacion && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-4 overflow-hidden rounded-xl border p-4"
          style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
        >
          <div className="mb-1 text-xs font-bold uppercase tracking-wider" style={{ color: "var(--accent)" }}>
            Explicación
          </div>
          {/* line-height holgado a propósito: las explicaciones llevan
              fracciones \dfrac en línea, que miden ~34px contra los ~23px de
              un renglón normal (leading-relaxed). El renglón tiene que ser
              al menos tan alto como la fórmula más alta o se montan entre sí,
              y con algo de aire encima: 2.9 × 14px ≈ 41px contra los ~35px
              que mide una fracción. */}
          <div className="text-sm" style={{ color: "var(--fg-secondary)", lineHeight: 2.9 }}>
            <MathText block>{pregunta.explicacion}</MathText>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

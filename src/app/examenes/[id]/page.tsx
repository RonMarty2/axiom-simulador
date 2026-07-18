"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import MathText from "../../components/MathText";
import type { ExamenBanco, PreguntaBanco } from "@/lib/axiom/types";
import { esPago } from "@/lib/plan";

const ETIQUETAS_AREA: Record<string, string> = {
  matematicas: "Matemáticas",
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
  const [pagado, setPagado] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me").then((r) => r.json()).then((me) => setPagado(esPago(me?.usuario?.plan))).catch(() => {});
    fetch(`/api/axiom/examenes/${id}`)
      .then(async (r) => {
        const data = await r.json();
        if (!r.ok) throw new Error(data.error ?? "Error");
        setExamen(data.examen);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  const toggleRevelar = (pid: string) =>
    setRevelar((prev) => ({ ...prev, [pid]: !prev[pid] }));

  const elegir = (pid: string, letra: string) =>
    setSeleccion((prev) => ({ ...prev, [pid]: letra }));

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 text-center text-neutral-500">
        Cargando examen…
      </div>
    );
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
        <Link
          href="/examenes"
          className="mb-4 inline-flex items-center gap-1 text-sm text-violet-600 hover:underline"
        >
          ← Volver al banco
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 rounded-2xl border border-neutral-200/80 bg-white/82 p-6 backdrop-blur-xl"
        >
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-violet-700">
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
              onElegir={(letra) => elegir(p.id, letra)}
              onRevelar={() => toggleRevelar(p.id)}
              pagado={pagado}
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
  onElegir: (letra: string) => void;
  onRevelar: () => void;
  pagado: boolean;
}

function PreguntaCard({
  pregunta,
  indice,
  seleccion,
  revelada,
  onElegir,
  onRevelar,
  pagado,
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
        <span className="rounded bg-violet-50 px-2 py-0.5 text-violet-700">
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

      <div className="space-y-2">
        {pregunta.opciones.map((op) => {
          const elegida = seleccion === op.letra;
          const esCorrecta = pregunta.respuesta_correcta === op.letra;
          let estilo =
            "border-neutral-200 bg-white hover:border-violet-400 hover:bg-violet-50/50";
          if (revelada && esCorrecta) {
            estilo = "border-emerald-400 bg-emerald-50";
          } else if (revelada && elegida && !esCorrecta) {
            estilo = "border-red-400 bg-red-50";
          } else if (elegida) {
            estilo = "border-violet-500 bg-violet-50";
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
              <span className="flex-1 text-sm">
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

      <div className="mt-4 flex items-center justify-between">
        <button
          type="button"
          onClick={onRevelar}
          className="text-sm font-semibold text-violet-600 hover:underline"
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

      {revelada && pregunta.explicacion && pagado && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-4 overflow-hidden rounded-xl border border-violet-100 bg-violet-50/50 p-4"
        >
          <div className="mb-1 text-xs font-bold uppercase tracking-wider text-violet-700">
            Explicación
          </div>
          <div className="text-sm leading-relaxed text-neutral-800">
            <MathText block>{pregunta.explicacion}</MathText>
          </div>
        </motion.div>
      )}
      {revelada && pregunta.explicacion && !pagado && (
        <div className="mt-4 rounded-xl border border-violet-100 bg-violet-50/50 p-4 text-center">
          <div className="text-sm text-neutral-800">🔒 La explicación paso a paso es parte de <strong>Premium</strong>.</div>
          <Link href="/precios" className="mt-2 inline-block rounded-lg bg-violet-600 px-4 py-2 text-sm font-bold text-white">
            Ver planes →
          </Link>
        </div>
      )}
    </motion.div>
  );
}

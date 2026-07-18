"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { ExamenMetadata } from "@/lib/axiom/types";

const ETIQUETAS_AREA: Record<string, string> = {
  matematicas: "Matemáticas",
  economicas: "Económicas",
  verbal: "Verbal",
  razonamiento: "Razonamiento",
  general: "General",
};

const ETIQUETAS_FACULTAD: Record<string, string> = {
  economicas: "Económicas",
  ingenieria: "Ingeniería",
  medicina: "Medicina",
  derecho: "Derecho",
};

// Formatea "2025-07-21" -> "21 jul 2025" (evita ambigüedad de fecha en el listado).
function formatearFecha(fechaISO: string): string {
  const [anio, mes, dia] = fechaISO.split("-").map(Number);
  if (!anio || !mes || !dia) return fechaISO;
  const MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  return `${dia} ${MESES[mes - 1]} ${anio}`;
}

export default function ExamenesPage() {
  const [examenes, setExamenes] = useState<ExamenMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/axiom/examenes")
      .then(async (r) => {
        const data = await r.json();
        if (!r.ok) throw new Error(data.error ?? "Error");
        setExamenes(data.examenes ?? []);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-transparent">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <Link
            href="/"
            className="mb-4 inline-flex items-center gap-1 text-sm text-violet-600 hover:underline"
          >
            ← Volver a Axiom
          </Link>
          <h1 className="text-4xl font-black text-[#171545] sm:text-5xl">
            Base de exámenes UMSS
          </h1>
          <p className="mt-3 max-w-2xl text-base text-neutral-600 sm:text-lg">
            Practica con exámenes reales de años pasados. Cada uno tiene las
            preguntas originales con su respuesta y explicación.
          </p>
        </motion.div>

        {loading && (
          <div className="rounded-2xl border border-neutral-200 bg-white/70 p-8 text-center text-neutral-500 backdrop-blur">
            Cargando banco de exámenes…
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
            {error}
          </div>
        )}

        {!loading && !error && examenes.length === 0 && (
          <div className="rounded-2xl border border-dashed border-neutral-300 bg-white/60 p-10 text-center backdrop-blur">
            <p className="text-lg font-semibold text-neutral-700">
              No hay exámenes cargados todavía
            </p>
            <p className="mt-2 text-sm text-neutral-500">
              Sube archivos .md a <code className="rounded bg-neutral-100 px-1.5 py-0.5">data/examenes/</code> para
              que aparezcan aquí.
            </p>
          </div>
        )}

        {!loading && examenes.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {examenes.map((ex, idx) => (
              <motion.div
                key={ex.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <Link href={`/examenes/${ex.id}`}>
                  <div className="group h-full cursor-pointer rounded-2xl border border-neutral-200/80 bg-white/82 p-6 shadow-[0_14px_36px_rgba(24,24,70,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-xl">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-violet-700">
                        {ex.universidad}
                      </span>
                      <span className="text-2xl font-black text-neutral-300">
                        {ex.anio}
                      </span>
                    </div>
                    <h3 className="mb-0.5 text-xl font-bold text-[#171545] group-hover:text-violet-600">
                      {ETIQUETAS_FACULTAD[ex.facultad] ?? ex.facultad}
                    </h3>
                    {ex.opcion && (
                      <p className="mb-1 text-sm font-semibold text-violet-500">
                        {ex.opcion}
                      </p>
                    )}
                    {ex.fecha_examen && (
                      <p className="mb-4 text-xs text-neutral-500">
                        Tomado el {formatearFecha(ex.fecha_examen)}
                      </p>
                    )}
                    <div className="mb-4 flex flex-wrap gap-2">
                      {ex.areas_resumen.map((a) => (
                        <span
                          key={a.area}
                          className="rounded-md bg-neutral-100 px-2 py-1 text-xs text-neutral-700"
                        >
                          {ETIQUETAS_AREA[a.area] ?? a.area} · {a.cantidad}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between border-t border-neutral-100 pt-3 text-sm">
                      <span className="text-neutral-500">
                        {ex.total_preguntas} preguntas · {ex.duracion_minutos} min
                      </span>
                      <span className="font-semibold text-violet-600 group-hover:translate-x-1 transition-transform">
                        Ver →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

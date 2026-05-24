"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type {
  ExamenMetadata,
  ModoSimulacion,
  ConfiguracionSimulacion,
  Dificultad,
} from "@/lib/axiom/types";
import {
  contarErrores,
  obtenerTemasReforzar,
  obtenerAreasDebiles,
} from "@/lib/axiom/errores-storage";

interface BancoInfo {
  facultades: string[];
  examenes: ExamenMetadata[];
  temas?: { tema: string; area: string; cantidad: number }[];
}

const UNIVERSIDAD = "UMSS";

const ETIQUETAS_FACULTAD: Record<string, string> = {
  economicas: "Económicas",
  ingenieria: "Ingeniería",
  medicina: "Medicina",
  derecho: "Derecho",
};

const MODOS: Array<{
  valor: ModoSimulacion;
  titulo: string;
  desc: string;
  emoji: string;
  disponible: boolean;
  destacado?: boolean;
}> = [
  {
    valor: "ia_generado",
    titulo: "IA infinita ⚡",
    desc: "La IA genera preguntas frescas siguiendo el temario oficial. Cada examen es único.",
    emoji: "🤖",
    disponible: true,
    destacado: true,
  },
  {
    valor: "mis_errores",
    titulo: "Mis errores",
    desc: "La IA genera preguntas nuevas sobre los temas donde fallaste antes. Requiere haber completado un examen.",
    emoji: "🎯",
    disponible: true,
  },
  {
    valor: "examen_real",
    titulo: "Examen real",
    desc: "Un examen pasado completo, tal como fue tomado.",
    emoji: "📜",
    disponible: true,
  },
  {
    valor: "mixto",
    titulo: "Mixto",
    desc: "Preguntas aleatorias de varios años. Variedad máxima.",
    emoji: "🎲",
    disponible: true,
  },
  {
    valor: "por_tema",
    titulo: "Por tema",
    desc: "Solo preguntas de un tema específico (integrales, oferta-demanda, etc.).",
    emoji: "🎯",
    disponible: true,
  },
  {
    valor: "predictivo",
    titulo: "Predictivo",
    desc: "Distribución estadística del banco. Los temas más frecuentes pesan más.",
    emoji: "🔮",
    disponible: true,
  },
];

export default function PracticarPage() {
  const router = useRouter();
  const [paso, setPaso] = useState<1 | 2 | 3>(1);
  const [info, setInfo] = useState<BancoInfo | null>(null);
  const [facultad, setFacultad] = useState<string>("");
  const [modo, setModo] = useState<ModoSimulacion | null>(null);
  const [anio, setAnio] = useState<number | null>(null);
  const [tema, setTema] = useState<string | null>(null);
  const [cantidad, setCantidad] = useState<number>(20);
  const [dificultad, setDificultad] = useState<Dificultad>("medio");
  const [creando, setCreando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [erroresGuardados, setErroresGuardados] = useState<number>(0);
  const [areasDebiles, setAreasDebiles] = useState<{ area: string; cantidad: number }[]>([]);

  // Leer estado de errores guardados (solo cliente)
  useEffect(() => {
    setErroresGuardados(contarErrores());
    setAreasDebiles(obtenerAreasDebiles());
  }, []);

  // Cargar facultades + exámenes al inicio
  useEffect(() => {
    fetch(`/api/axiom/banco/info?universidad=${UNIVERSIDAD}`)
      .then((r) => r.json())
      .then((d) => setInfo(d))
      .catch((e) => setError(String(e)));
  }, []);

  // Cuando elige facultad, recargar con temas
  useEffect(() => {
    if (!facultad) return;
    fetch(
      `/api/axiom/banco/info?universidad=${UNIVERSIDAD}&facultad=${encodeURIComponent(
        facultad
      )}`
    )
      .then((r) => r.json())
      .then((d) => setInfo(d));
  }, [facultad]);

  const examenesFacultad = info?.examenes ?? [];
  const temasFacultad = info?.temas ?? [];

  const puedeAvanzar2 = !!facultad;
  const puedeAvanzar3 = (() => {
    if (!modo) return false;
    if (modo === "examen_real") return !!anio;
    if (modo === "por_tema") return !!tema;
    if (modo === "ia_generado") return true;
    if (modo === "mis_errores") return erroresGuardados > 0;
    return true;
  })();

  const handleEmpezar = async () => {
    if (!modo || !facultad) return;
    setCreando(true);
    setError(null);
    try {
      const temasReforzar =
        modo === "mis_errores" ? obtenerTemasReforzar(8) : undefined;

      const config: ConfiguracionSimulacion = {
        modo,
        universidad: UNIVERSIDAD,
        facultad,
        ...(anio ? { anio } : {}),
        ...(tema ? { tema } : {}),
        ...(modo !== "examen_real" ? { cantidad_preguntas: cantidad } : {}),
        ...(modo === "ia_generado" || modo === "mis_errores"
          ? { dificultad }
          : {}),
        ...(temasReforzar?.length ? { temas_reforzar: temasReforzar } : {}),
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
      setError(e instanceof Error ? e.message : String(e));
      setCreando(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <Link
          href="/"
          className="mb-4 inline-flex items-center gap-1 text-sm text-violet-600 hover:underline"
        >
          ← Volver a Axiom
        </Link>
        <h1 className="mb-2 text-4xl font-black text-[#171545] sm:text-5xl">
          Practicar
        </h1>
        <p className="mb-8 text-base text-neutral-600">
          Configura tu simulacro en 3 pasos.
        </p>

        {/* Stepper */}
        <div className="mb-10 flex items-center gap-2">
          {[1, 2, 3].map((n) => (
            <div key={n} className="flex flex-1 items-center gap-2">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                  paso >= n
                    ? "bg-violet-600 text-white"
                    : "bg-neutral-200 text-neutral-500"
                }`}
              >
                {n}
              </div>
              <div
                className={`text-xs font-medium ${
                  paso >= n ? "text-violet-700" : "text-neutral-400"
                }`}
              >
                {n === 1 ? "Facultad" : n === 2 ? "Modo" : "Iniciar"}
              </div>
              {n < 3 && (
                <div
                  className={`mx-2 h-px flex-1 ${
                    paso > n ? "bg-violet-600" : "bg-neutral-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        <AnimatePresence mode="wait">
          {paso === 1 && (
            <motion.div
              key="paso1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <h2 className="mb-4 text-xl font-bold text-neutral-900">
                ¿A qué facultad postulas?
              </h2>
              {!info && (
                <div className="text-neutral-500">Cargando facultades…</div>
              )}
              {info && info.facultades.length === 0 && (
                <div className="rounded-2xl border border-dashed border-neutral-300 bg-white/60 p-8 text-center">
                  <p className="font-semibold text-neutral-700">
                    No hay facultades en el banco aún.
                  </p>
                  <p className="mt-1 text-sm text-neutral-500">
                    Carga al menos un examen en{" "}
                    <code>data/examenes/{UNIVERSIDAD.toLowerCase()}/</code>.
                  </p>
                </div>
              )}
              {info && info.facultades.length > 0 && (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {info.facultades.map((f) => {
                    const elegida = facultad === f;
                    return (
                      <button
                        key={f}
                        type="button"
                        onClick={() => setFacultad(f)}
                        className={`flex items-center justify-between rounded-2xl border p-5 text-left transition-all ${
                          elegida
                            ? "border-violet-500 bg-violet-50 shadow-md"
                            : "border-neutral-200 bg-white/80 hover:border-violet-300"
                        }`}
                      >
                        <div>
                          <div className="text-lg font-bold text-neutral-900">
                            {ETIQUETAS_FACULTAD[f] ?? f}
                          </div>
                          <div className="text-xs text-neutral-500">
                            {info.examenes.filter((e) => e.facultad === f).length}{" "}
                            exámenes disponibles
                          </div>
                        </div>
                        <span
                          className={`h-5 w-5 rounded-full border-2 ${
                            elegida
                              ? "border-violet-600 bg-violet-600"
                              : "border-neutral-300"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              )}
              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  disabled={!puedeAvanzar2}
                  onClick={() => setPaso(2)}
                  className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Siguiente →
                </button>
              </div>
            </motion.div>
          )}

          {paso === 2 && (
            <motion.div
              key="paso2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <h2 className="mb-4 text-xl font-bold text-neutral-900">
                ¿Cómo quieres practicar?
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {MODOS.map((m) => {
                  const elegido = modo === m.valor;
                  return (
                    <button
                      key={m.valor}
                      type="button"
                      onClick={() => {
                        setModo(m.valor);
                        setAnio(null);
                        setTema(null);
                      }}
                      disabled={!m.disponible}
                      className={`relative flex flex-col items-start rounded-2xl border p-5 text-left transition-all ${
                        elegido
                          ? m.destacado
                            ? "border-violet-500 bg-gradient-to-br from-violet-50 to-indigo-50 shadow-md"
                            : "border-violet-500 bg-violet-50 shadow-md"
                          : m.destacado
                          ? "border-violet-300 bg-gradient-to-br from-violet-50/50 to-indigo-50/30 hover:border-violet-400 hover:shadow-md"
                          : "border-neutral-200 bg-white/80 hover:border-violet-300"
                      } ${!m.disponible ? "opacity-50" : ""}`}
                    >
                      {m.destacado && (
                        <span className="absolute -top-2 right-3 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow">
                          Recomendado
                        </span>
                      )}
                      <span className="text-3xl">{m.emoji}</span>
                      <div className="mt-2 font-bold text-neutral-900">
                        {m.titulo}
                      </div>
                      <div className="mt-1 text-sm text-neutral-600">
                        {m.desc}
                      </div>
                    </button>
                  );
                })}
              </div>

              {modo === "examen_real" && (
                <div className="mt-5 rounded-2xl border border-neutral-200 bg-white/80 p-5">
                  <div className="mb-2 text-sm font-semibold text-neutral-700">
                    Elige el año del examen
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {examenesFacultad.map((ex) => (
                      <button
                        key={ex.id}
                        type="button"
                        onClick={() => setAnio(ex.anio)}
                        className={`rounded-xl border px-4 py-2 text-sm font-medium transition-all ${
                          anio === ex.anio
                            ? "border-violet-500 bg-violet-50 text-violet-700"
                            : "border-neutral-200 bg-white text-neutral-700 hover:border-violet-300"
                        }`}
                      >
                        {ex.anio} · {ex.total_preguntas} preguntas
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {modo === "por_tema" && (
                <div className="mt-5 rounded-2xl border border-neutral-200 bg-white/80 p-5">
                  <div className="mb-2 text-sm font-semibold text-neutral-700">
                    Elige el tema
                  </div>
                  {temasFacultad.length === 0 ? (
                    <p className="text-sm text-neutral-500">
                      Cargando temas…
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {temasFacultad.map((t) => (
                        <button
                          key={t.tema}
                          type="button"
                          onClick={() => setTema(t.tema)}
                          className={`rounded-xl border px-3 py-1.5 text-sm transition-all ${
                            tema === t.tema
                              ? "border-violet-500 bg-violet-50 text-violet-700"
                              : "border-neutral-200 bg-white text-neutral-700 hover:border-violet-300"
                          }`}
                        >
                          {t.tema} <span className="text-xs opacity-60">({t.cantidad})</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {(modo === "mixto" || modo === "predictivo" || modo === "por_tema" || modo === "ia_generado" || modo === "mis_errores") && (
                <div className="mt-5 rounded-2xl border border-neutral-200 bg-white/80 p-5">
                  <div className="mb-2 text-sm font-semibold text-neutral-700">
                    Cantidad de preguntas
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[10, 20, 30, 50].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setCantidad(n)}
                        className={`rounded-xl border px-4 py-2 text-sm font-medium transition-all ${
                          cantidad === n
                            ? "border-violet-500 bg-violet-50 text-violet-700"
                            : "border-neutral-200 bg-white text-neutral-700 hover:border-violet-300"
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {modo === "mis_errores" && (
                <div className="mt-5 rounded-2xl border border-violet-200 bg-violet-50/60 p-5">
                  {erroresGuardados === 0 ? (
                    <div>
                      <div className="mb-1 text-sm font-semibold text-violet-900">
                        Aún no tienes errores guardados
                      </div>
                      <p className="text-sm text-violet-700">
                        Completa al menos un examen primero. Cuando termines,
                        los temas donde falles se guardan automáticamente y
                        la IA podrá reforzar justo eso.
                      </p>
                    </div>
                  ) : (
                    <div>
                      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-violet-900">
                        ✓ Tienes <strong>{erroresGuardados}</strong> errores guardados
                      </div>
                      {areasDebiles.length > 0 && (
                        <div className="text-sm text-violet-700">
                          Áreas más débiles:{" "}
                          {areasDebiles.slice(0, 3).map((a, i) => (
                            <span key={a.area}>
                              {i > 0 && ", "}
                              <strong className="capitalize">
                                {a.area === "matematicas"
                                  ? "Matemáticas"
                                  : a.area === "economicas"
                                  ? "Economía"
                                  : a.area === "verbal"
                                  ? "Verbal"
                                  : a.area === "razonamiento"
                                  ? "Razonamiento"
                                  : a.area}
                              </strong>{" "}
                              ({a.cantidad})
                            </span>
                          ))}
                        </div>
                      )}
                      <p className="mt-2 text-xs text-violet-600">
                        La IA generará preguntas <strong>nuevas</strong> sobre estos
                        temas, no las mismas que ya fallaste.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {(modo === "ia_generado" || modo === "mis_errores") && (
                <div className="mt-5 rounded-2xl border border-neutral-200 bg-white/80 p-5">
                  <div className="mb-2 text-sm font-semibold text-neutral-700">
                    Dificultad
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(["facil", "medio", "dificil"] as Dificultad[]).map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setDificultad(d)}
                        className={`rounded-xl border px-4 py-2 text-sm font-medium capitalize transition-all ${
                          dificultad === d
                            ? "border-violet-500 bg-violet-50 text-violet-700"
                            : "border-neutral-200 bg-white text-neutral-700 hover:border-violet-300"
                        }`}
                      >
                        {d === "facil" ? "Fácil" : d === "medio" ? "Medio" : "Difícil"}
                      </button>
                    ))}
                  </div>
                  <p className="mt-3 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-2.5">
                    ⏳ Generar con IA toma 20-40 segundos. Vas a esperar mientras se crean preguntas únicas para ti.
                  </p>
                </div>
              )}

              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={() => setPaso(1)}
                  className="rounded-xl border border-neutral-300 px-6 py-3 font-semibold text-neutral-700 hover:bg-neutral-50"
                >
                  ← Atrás
                </button>
                <button
                  type="button"
                  disabled={!puedeAvanzar3}
                  onClick={() => setPaso(3)}
                  className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Siguiente →
                </button>
              </div>
            </motion.div>
          )}

          {paso === 3 && modo && (
            <motion.div
              key="paso3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <h2 className="mb-4 text-xl font-bold text-neutral-900">
                Listo para empezar
              </h2>
              <div className="rounded-2xl border border-neutral-200 bg-white/80 p-6">
                <Resumen
                  facultad={ETIQUETAS_FACULTAD[facultad] ?? facultad}
                  modo={MODOS.find((m) => m.valor === modo)?.titulo ?? modo}
                  anio={anio}
                  tema={tema}
                  cantidad={
                    modo === "examen_real"
                      ? examenesFacultad.find((e) => e.anio === anio)
                          ?.total_preguntas
                      : cantidad
                  }
                  dificultad={modo === "ia_generado" ? dificultad : null}
                />
                <div className="mt-6 rounded-xl bg-amber-50 p-4 text-sm text-amber-800 border border-amber-200">
                  ⏱ Una vez que empieces, el cronómetro corre. Podrás marcar preguntas
                  para revisar y finalizar antes de que se agote el tiempo.
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={() => setPaso(2)}
                  className="rounded-xl border border-neutral-300 px-6 py-3 font-semibold text-neutral-700 hover:bg-neutral-50"
                >
                  ← Atrás
                </button>
                <button
                  type="button"
                  onClick={handleEmpezar}
                  disabled={creando}
                  className="rounded-xl bg-emerald-600 px-8 py-3 font-bold text-white shadow-lg transition-all hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {creando
                    ? modo === "ia_generado" || modo === "mis_errores"
                      ? "La IA está creando tus preguntas..."
                      : "Preparando…"
                    : "Empezar simulacro 🚀"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Resumen({
  facultad,
  modo,
  anio,
  tema,
  cantidad,
  dificultad,
}: {
  facultad: string;
  modo: string;
  anio: number | null;
  tema: string | null;
  cantidad?: number;
  dificultad?: Dificultad | null;
}) {
  const items = [
    { label: "Facultad", valor: facultad },
    { label: "Modo", valor: modo },
    ...(anio ? [{ label: "Año", valor: String(anio) }] : []),
    ...(tema ? [{ label: "Tema", valor: tema }] : []),
    ...(cantidad ? [{ label: "Preguntas", valor: String(cantidad) }] : []),
    ...(dificultad
      ? [
          {
            label: "Dificultad",
            valor:
              dificultad === "facil"
                ? "Fácil"
                : dificultad === "medio"
                ? "Medio"
                : "Difícil",
          },
        ]
      : []),
  ];
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-3">
      {items.map((it) => (
        <div key={it.label}>
          <dt className="text-xs uppercase tracking-wider text-neutral-500">
            {it.label}
          </dt>
          <dd className="mt-0.5 text-base font-semibold text-neutral-900">
            {it.valor}
          </dd>
        </div>
      ))}
    </dl>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { esPago } from "@/lib/plan";
import BackLink from "../components/BackLink";
import Cargando from "../components/Cargando";
import type { Facultad, Usuario } from "@/lib/data-store";

// ─────────────────────────────────────────────────────────────────────────────
// El catálogo de "Aprende paso a paso" es distinto por facultad (cada una
// tiene su propio examen de admisión con áreas distintas). Ver
// BLOQUES_POR_FACULTAD más abajo. Las lecciones de Física, Química y
// Geometría-Trigonometría (módulos FIS-*/QUI-*/GT-*) ya estaban escritas
// desde antes pero nunca habían sido conectadas a ningún índice — un
// usuario de Ingeniería veía el catálogo de Económicas en su lugar. Se
// detectó y corrigió en esta sesión.
// ─────────────────────────────────────────────────────────────────────────────

type Leccion = { slug?: string; titulo: string; tags?: string[] };
type Unidad = { numero: string; titulo: string; lecciones: Leccion[] };
type Bloque = { id: string; titulo: string; descripcion: string; unidades: Unidad[] };

const MATEMATICAS_UNIDADES: Unidad[] = [
  {
    numero: "01", titulo: "Los números naturales, enteros, racionales y reales",
    lecciones: [
      { slug: "operaciones-fundamentales", titulo: "Operaciones fundamentales", tags: ["✨ Animada"] },
      { slug: "mcd-mcm", titulo: "MCD y MCM", tags: ["✨ Animada"] },
      { slug: "potenciacion", titulo: "Potenciación y sus propiedades", tags: ["✨ Animada"] },
      { slug: "radicacion", titulo: "Radicación y propiedades", tags: ["✨ Animada"] },
      { slug: "operaciones-radicales", titulo: "Operaciones con radicales", tags: ["✨ Animada"] },
    ],
  },
  { numero: "02", titulo: "La proporcionalidad", lecciones: [
    { slug: "razones-proporciones", titulo: "Razones y proporciones" },
    { slug: "regla-de-tres", titulo: "Regla de tres · Interés simple" },
    { slug: "repartos-proporcionales", titulo: "Repartos proporcionales" },
  ] },
  { numero: "03", titulo: "Conceptos fundamentales de Álgebra", lecciones: [
    { slug: "expresiones-algebraicas", titulo: "Expresiones algebraicas" },
    { slug: "factorizacion", titulo: "Factorización" },
    { slug: "mcd-mcm-algebraico", titulo: "MCD y MCM algebraicos" },
  ] },
  { numero: "04", titulo: "Funciones y gráficas", lecciones: [
    { slug: "funcion-lineal-cuadratica", titulo: "Función lineal y cuadrática" },
    { slug: "dominio-rango", titulo: "Dominio, rango y gráfica" },
  ] },
  { numero: "05", titulo: "Ecuaciones de primer grado", lecciones: [{ slug: "ecuaciones-primer-grado", titulo: "Resolución y problemas" }] },
  { numero: "06", titulo: "Sistemas de ecuaciones lineales", lecciones: [{ slug: "sistemas-lineales", titulo: "Sistemas 2×2 y 3×3" }] },
  { numero: "07", titulo: "Potenciación y radicación (profundo)", lecciones: [{ slug: "teoria-exponentes", titulo: "Teoría de exponentes" }] },
  { numero: "08", titulo: "Ecuaciones de segundo grado", lecciones: [{ slug: "ecuaciones-segundo-grado", titulo: "Métodos de resolución" }] },
  { numero: "09", titulo: "Desigualdades", lecciones: [{ slug: "desigualdades", titulo: "Inecuaciones lineales y cuadráticas" }] },
  { numero: "10", titulo: "Logaritmación", lecciones: [{ slug: "logaritmacion", titulo: "Propiedades y ecuaciones" }] },
  { numero: "11", titulo: "Sucesiones y series", lecciones: [{ slug: "sucesiones-series", titulo: "Progresiones aritméticas y geométricas" }] },
];

// Geometría y trigonometría — área propia del banco de exámenes de
// Ingeniería (tag `geometria_trigonometria`, separado de aritmética-álgebra).
// Códigos de unidad en cada page.tsx: GT-01 a GT-10.
const GEOMETRIA_TRIGONOMETRIA_UNIDADES: Unidad[] = [
  { numero: "01", titulo: "Segmentos y ángulos", lecciones: [{ slug: "segmentos-angulos", titulo: "Punto, recta y plano · los 3 indefinidos", tags: ["✨ Animada"] }] },
  { numero: "02", titulo: "Triángulos", lecciones: [{ slug: "triangulos", titulo: "Elementos y propiedades base", tags: ["✨ Animada"] }] },
  { numero: "03", titulo: "Congruencia y semejanza", lecciones: [{ slug: "congruencia-semejanza", titulo: "Diferencia clave entre ambas", tags: ["✨ Animada"] }] },
  { numero: "04", titulo: "Polígonos y cuadriláteros", lecciones: [{ slug: "poligonos-cuadrilateros", titulo: "Concepto y elementos", tags: ["✨ Animada"] }] },
  { numero: "05", titulo: "Circunferencia", lecciones: [{ slug: "circunferencia", titulo: "Elementos de la circunferencia", tags: ["✨ Animada"] }] },
  { numero: "06", titulo: "Razones trigonométricas", lecciones: [{ slug: "razones-trigonometricas", titulo: "Las 3 razones fundamentales: sen, cos, tan", tags: ["✨ Animada"] }] },
  { numero: "07", titulo: "Identidades y ecuaciones trigonométricas", lecciones: [{ slug: "identidades-trigonometricas", titulo: "Identidades fundamentales", tags: ["✨ Animada"] }] },
  { numero: "08", titulo: "Ley de senos y cosenos", lecciones: [{ slug: "ley-senos-cosenos", titulo: "Cuando el triángulo no es rectángulo", tags: ["✨ Animada"] }] },
  { numero: "09", titulo: "Ecuación analítica de la recta", lecciones: [{ slug: "ecuacion-recta", titulo: "Sistema cartesiano · distancia y punto medio", tags: ["✨ Animada"] }] },
  { numero: "10", titulo: "Geometría analítica: circunferencia y parábola", lecciones: [{ slug: "circunferencia-parabola-analitica", titulo: "Ecuación canónica", tags: ["✨ Animada"] }] },
];

// Física — área propia del banco de exámenes de Ingeniería. Códigos de
// unidad en cada page.tsx: FIS-01 a FIS-07.
const FISICA_UNIDADES: Unidad[] = [
  { numero: "01", titulo: "Vectores", lecciones: [{ slug: "vectores-fisica", titulo: "Magnitudes escalares vs vectoriales", tags: ["✨ Animada"] }] },
  { numero: "02", titulo: "Cinemática en una dimensión", lecciones: [{ slug: "cinematica-1d", titulo: "Posición, velocidad, aceleración, MRU y MRUA", tags: ["✨ Animada"] }] },
  { numero: "03", titulo: "Cinemática en dos dimensiones", lecciones: [{ slug: "cinematica-2d", titulo: "Independencia de ejes, tiro parabólico", tags: ["✨ Animada"] }] },
  { numero: "04", titulo: "Dinámica · Leyes de Newton", lecciones: [{ slug: "dinamica-newton", titulo: "Fuerza, masa y aceleración", tags: ["✨ Animada"] }] },
  { numero: "05", titulo: "Trabajo y energía", lecciones: [{ slug: "trabajo-energia", titulo: "Trabajo · concepto y fórmula", tags: ["✨ Animada"] }] },
  { numero: "06", titulo: "Electrostática", lecciones: [{ slug: "electrostatica", titulo: "Carga eléctrica · conceptos básicos", tags: ["✨ Animada"] }] },
  { numero: "07", titulo: "Circuitos de corriente continua", lecciones: [{ slug: "circuitos-dc", titulo: "Corriente eléctrica · concepto", tags: ["✨ Animada"] }] },
];

// Química — área propia del banco de exámenes de Ingeniería. Códigos de
// unidad en cada page.tsx: QUI-01 a QUI-10.
const QUIMICA_UNIDADES: Unidad[] = [
  { numero: "01", titulo: "Nociones fundamentales de química", lecciones: [{ slug: "nociones-quimica", titulo: "¿Qué es la química? Clasificación de la materia", tags: ["✨ Animada"] }] },
  { numero: "02", titulo: "Nomenclatura inorgánica", lecciones: [{ slug: "nomenclatura-inorganica", titulo: "Mapa de compuestos inorgánicos", tags: ["✨ Animada"] }] },
  { numero: "03", titulo: "Estructura atómica", lecciones: [{ slug: "estructura-atomica", titulo: "Partículas subatómicas", tags: ["✨ Animada"] }] },
  { numero: "04", titulo: "Enlace químico", lecciones: [{ slug: "enlace-quimico", titulo: "Regla del octeto · estructura de Lewis", tags: ["✨ Animada"] }] },
  { numero: "05", titulo: "Leyes fundamentales de la química", lecciones: [{ slug: "leyes-fundamentales-quimica", titulo: "El mol · concepto clave de la química", tags: ["✨ Animada"] }] },
  { numero: "06", titulo: "Reacciones químicas y balanceo", lecciones: [{ slug: "reacciones-balanceo", titulo: "Tipos de reacciones", tags: ["✨ Animada"] }] },
  { numero: "07", titulo: "Estequiometría", lecciones: [{ slug: "estequiometria", titulo: "Cálculos con reactivos y productos" }] },
  { numero: "08", titulo: "Gases ideales", lecciones: [{ slug: "gases-ideales", titulo: "Leyes y ecuación de estado" }] },
  { numero: "09", titulo: "Soluciones", lecciones: [{ slug: "soluciones", titulo: "Unidades de concentración" }] },
  { numero: "10", titulo: "Propiedades coligativas", lecciones: [{ slug: "propiedades-coligativas", titulo: "Cambios por soluto" }] },
];

// Estructura alineada con la guía oficial FCE-UMSS "Fundamentos de las
// Ciencias Económicas, Contables y Administrativas" (Oficina Educativa,
// gestión 2024). Respeta sus 4 unidades y todos sus subpuntos.
const FUNDAMENTOS_UNIDADES: Unidad[] = [
  {
    numero: "01", titulo: "Introducción general a la ciencia económica",
    lecciones: [
      { slug: "perspectiva-historica-economia", titulo: "1.1 · Definiciones de la economía: perspectiva histórica" },
      { slug: "metodologia-leyes", titulo: "1.2 · 1.3 · Metodología y leyes económicas (ceteris paribus)" },
      { slug: "divisiones-economia", titulo: "1.4 · Divisiones de la economía" },
      { slug: "escasez-necesidades", titulo: "1.5 · Escasez de recursos y necesidades ilimitadas", tags: ["✨ Animada"] },
      { slug: "diez-principios", titulo: "1.6 · Los diez principios de la economía", tags: ["✨ Animada"] },
      { slug: "modelos-economicos", titulo: "1.7 · Modelos económicos · flujo circular y FPP", tags: ["✨ Animada"] },
    ],
  },
  {
    numero: "02", titulo: "Introducción a la contabilidad",
    lecciones: [
      { slug: "contabilidad-intro", titulo: "2.1–2.4 · Concepto, historia, objetivos e importancia" },
      { slug: "usuarios-pcga", titulo: "2.5 · 2.6 · Usuarios de la información y PCGA" },
      { slug: "clasificacion-estados", titulo: "2.7 · 2.8 · Clasificación y estados financieros", tags: ["✨ Animada"] },
      { slug: "ciclo-contable", titulo: "2.9 · El ciclo contable", tags: ["✨ Animada"] },
    ],
  },
  {
    numero: "03", titulo: "Conceptos fundamentales de la administración",
    lecciones: [
      { slug: "naturaleza-admin", titulo: "3.1 · 3.2 · Naturaleza de la administración y la empresa como sistema" },
      { slug: "objetivos-funciones-admin", titulo: "3.3 · Objetivos y funciones de la administración" },
      { slug: "evolucion-escuelas", titulo: "3.4 · Evolución histórica y escuelas (Taylor, Fayol, Mayo)", tags: ["✨ Animada"] },
      { slug: "rol-retos-admin", titulo: "3.5 · 3.6 · 3.7 · Rol del administrador, retos y funciones gerenciales" },
    ],
  },
  {
    numero: "04", titulo: "Proceso administrativo",
    lecciones: [
      { slug: "planeacion", titulo: "4.1 · Planeación" },
      { slug: "organizacion-admin", titulo: "4.2 · Organización", tags: ["✨ Animada"] },
      { slug: "integracion-personal", titulo: "4.3 · Integración de personal" },
      { slug: "direccion-admin", titulo: "4.4 · Dirección" },
      { slug: "control-admin", titulo: "4.5 · Control" },
    ],
  },
];

// Razonamiento verbal-lógico (10 unidades, según guía oficial FCE-UMSS 2024).
// Por ahora solo está poblada la Unidad 1; las demás aparecen como "próximamente"
// con el orden y los títulos correctos para que se vea el roadmap completo.
const RAZONAMIENTO_VERBAL_UNIDADES: Unidad[] = [
  {
    numero: "01", titulo: "Comprensión de lectura",
    lecciones: [
      { slug: "lectura-comprension", titulo: "Estrategia y prácticas guiadas" },
    ],
  },
  { numero: "02", titulo: "Denotación, connotación y homonimia", lecciones: [
    { slug: "denotacion-connotacion", titulo: "Significado literal, figurado y homónimos" },
  ] },
  { numero: "03", titulo: "Léxico contextual", lecciones: [
    { slug: "lexico-contextual", titulo: "Significado de palabras según el contexto" },
  ] },
  { numero: "04", titulo: "Cohesión", lecciones: [
    { slug: "cohesion-textual", titulo: "Conectores y fluidez del texto" },
  ] },
  { numero: "05", titulo: "Plan de redacción", lecciones: [
    { slug: "plan-redaccion", titulo: "Ordenar oraciones lógicamente" },
  ] },
  { numero: "06", titulo: "Expresión correcta de la oración", lecciones: [
    { slug: "expresion-oracion", titulo: "Gramática, concordancia y puntuación" },
  ] },
  { numero: "07", titulo: "Analogías verbales", lecciones: [
    { slug: "analogias-verbales", titulo: "Relaciones entre conceptos" },
  ] },
  { numero: "08", titulo: "Aseveraciones y cuantificadores", lecciones: [
    { slug: "aseveraciones-cuantificadores", titulo: "Diagramas de Venn y razonamiento" },
  ] },
  { numero: "09", titulo: "Silogismos como argumento", lecciones: [
    { slug: "silogismos", titulo: "Razonamiento deductivo" },
  ] },
  { numero: "10", titulo: "Secuencias numéricas y literales", lecciones: [
    { slug: "secuencias-logicas", titulo: "Reconocimiento de patrones" },
  ] },
];

const BLOQUES_ECONOMICAS: Bloque[] = [
  {
    id: "fundamentos",
    titulo: "Fundamentos de las ciencias económicas, contables y administrativas",
    descripcion: "Conceptos clave de economía, contabilidad y administración que toma el examen.",
    unidades: FUNDAMENTOS_UNIDADES,
  },
  {
    id: "razonamiento-matematico",
    titulo: "Razonamiento matemático",
    descripcion: "Operaciones, álgebra, funciones, ecuaciones, secuencias.",
    unidades: MATEMATICAS_UNIDADES,
  },
  {
    id: "razonamiento-verbal-logico",
    titulo: "Razonamiento verbal y lógico",
    descripcion: "Comprensión de lectura, vocabulario, analogías, silogismos y secuencias lógicas.",
    unidades: RAZONAMIENTO_VERBAL_UNIDADES,
  },
];

// Estructura del examen de admisión FCyT-UMSS (Ingeniería): matemáticas,
// física, química y razonamiento (ver data/facultades.json). Matemáticas
// y razonamiento reutilizan las mismas unidades que Económicas (contenido
// genérico, no específico de ninguna carrera); Geometría-Trigonometría,
// Física y Química son propias de Ingeniería.
const BLOQUES_INGENIERIA: Bloque[] = [
  {
    id: "matematicas",
    titulo: "Matemáticas: aritmética y álgebra",
    descripcion: "Operaciones, álgebra, funciones, ecuaciones, secuencias.",
    unidades: MATEMATICAS_UNIDADES,
  },
  {
    id: "geometria-trigonometria",
    titulo: "Geometría y trigonometría",
    descripcion: "Figuras planas, triángulos, circunferencia, razones trigonométricas y geometría analítica.",
    unidades: GEOMETRIA_TRIGONOMETRIA_UNIDADES,
  },
  {
    id: "fisica",
    titulo: "Física",
    descripcion: "Vectores, cinemática, dinámica, trabajo y energía, electricidad.",
    unidades: FISICA_UNIDADES,
  },
  {
    id: "quimica",
    titulo: "Química",
    descripcion: "Estructura atómica, enlace químico, nomenclatura, reacciones y estequiometría.",
    unidades: QUIMICA_UNIDADES,
  },
  {
    id: "razonamiento-verbal-logico",
    titulo: "Razonamiento verbal y lógico",
    descripcion: "Comprensión de lectura, vocabulario, analogías, silogismos y secuencias lógicas.",
    unidades: RAZONAMIENTO_VERBAL_UNIDADES,
  },
];

// Facultades sin catálogo propio todavía (ej. Medicina, Derecho) no deben
// heredar el contenido de otra facultad — mejor mostrar el estado vacío
// (ver "Todavía no hay lecciones para tu facultad" en AprendePage) que
// mezclar carreras.
const BLOQUES_POR_FACULTAD: Record<string, Bloque[]> = {
  economicas: BLOQUES_ECONOMICAS,
  ingenieria: BLOQUES_INGENIERIA,
};

// Chevron (flecha) hacia abajo, dibujada en SVG para que se vea nítida y NO
// parezca un exponente como el carácter "⌃". Rota 180° al abrir la sección.
function Chevron({ size = 18, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 9l6 6 6-6" stroke={color} strokeWidth="2.4"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function AprendePage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [facultad, setFacultad] = useState<Facultad | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((me) => {
        if (!me.usuario) { router.push("/login"); return; }
        if (!me.usuario.facultad_objetivo) { router.push("/onboarding"); return; }
        setUsuario(me.usuario);
        fetch("/api/facultades")
          .then((r) => r.json())
          .then((f) => {
            const fac = (f.facultades ?? []).find((x: Facultad) => x.id === me.usuario.facultad_objetivo);
            setFacultad(fac ?? null);
            setLoading(false);
          })
          .catch(() => setLoading(false));
      })
      .catch(() => {
        // Si falla la red, igual mostramos el contenido gratis (no colgamos la pantalla).
        // El usuario queda como "no premium" hasta que /api/auth/me responda.
        setLoading(false);
      });
  }, [router]);

  if (loading) return <Cargando />;

  const usuarioEsPremium = esPago(usuario?.plan);
  const bloques = usuario?.facultad_objetivo ? BLOQUES_POR_FACULTAD[usuario.facultad_objetivo] : undefined;

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)" }}>
      <header style={{
        padding: "20px 24px", borderBottom: "1px solid var(--border)",
        background: "var(--bg-glass)", backdropFilter: "blur(8px)",
      }}>
        <div style={{ maxWidth: 920, margin: "0 auto" }}>
          <BackLink href="/dashboard" label="Volver" />
          <h1 className="font-crimson" style={{
            fontSize: 36, fontWeight: 800, color: "var(--fg-primary)",
            margin: "8px 0 4px",
          }}>
            Aprende paso a paso
          </h1>
          <p style={{ color: "var(--fg-muted)", fontSize: 16 }}>
            Las áreas del examen de admisión · {facultad?.nombre_corto ?? "tu facultad"}
          </p>

          {!usuarioEsPremium && bloques && (
            <div style={{
              marginTop: 14, padding: "12px 16px",
              background: "linear-gradient(135deg, #fef3c7, #fde68a)",
              borderRadius: 12, border: "1px solid #fbbf24",
              display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap",
            }}>
              <span style={{ fontSize: 20 }}>🔓</span>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#78350f" }}>
                  Plan gratis: Unidad 01 de cada área desbloqueada
                </div>
                <div style={{ fontSize: 13, color: "#92400e" }}>
                  Hacete Premium para acceder al resto del contenido.
                </div>
              </div>
              <Link href="/precios" style={{
                padding: "8px 16px", background: "#f59e0b", color: "white",
                borderRadius: 8, textDecoration: "none", fontWeight: 700, fontSize: 14,
              }}>
                Ver planes →
              </Link>
            </div>
          )}
        </div>
      </header>

      <main style={{ maxWidth: 920, margin: "0 auto", padding: "28px 24px" }}>
        {!bloques && (
          <div style={{
            padding: "30px 24px", background: "var(--bg-card)",
            borderRadius: 14, border: "1px dashed var(--border)",
            textAlign: "center", color: "var(--fg-muted)",
          }}>
            Todavía no hay lecciones para tu facultad. Arrancamos por Ingeniería y Economía, el resto viene después.
          </div>
        )}
        {bloques?.map((b, bi) => (
          <BloqueArea key={b.id} bloque={b} indice={bi + 1} esPremium={usuarioEsPremium} />
        ))}
      </main>
    </div>
  );
}

function BloqueArea({ bloque, indice, esPremium }: { bloque: Bloque; indice: number; esPremium: boolean }) {
  const tieneContenido = bloque.unidades.length > 0;
  const color = indice === 1 ? "#0ea5e9" : "var(--accent)";
  const colorGradient = indice === 1 ? "#38bdf8" : "#8b5cf6";
  const [abierto, setAbierto] = useState(false);
  const totalLecciones = bloque.unidades.reduce((acc, u) => acc + u.lecciones.length, 0);

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: indice * 0.1 }}
      style={{ marginBottom: 32 }}
    >
      {/* Cabecera del área (clickeable) */}
      <button
        onClick={() => setAbierto((v) => !v)}
        style={{
          all: "unset", cursor: "pointer", display: "block", width: "100%",
          padding: "20px 24px",
          background: `linear-gradient(135deg, ${color}, ${colorGradient})`,
          borderRadius: abierto ? "18px 18px 18px 18px" : 18, color: "white",
          boxShadow: "var(--shadow-md)", marginBottom: abierto ? 16 : 0,
          boxSizing: "border-box",
        }}
        aria-expanded={abierto}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
              <span style={{
                fontSize: 11, fontWeight: 800, background: "rgba(255,255,255,0.25)",
                padding: "3px 10px", borderRadius: 8, letterSpacing: 1.2,
              }}>ÁREA {indice}</span>
              {tieneContenido && (
                <span style={{
                  fontSize: 11, fontWeight: 700, background: "rgba(255,255,255,0.15)",
                  padding: "3px 10px", borderRadius: 8, letterSpacing: 0.6,
                }}>{bloque.unidades.length} unidades · {totalLecciones} lecciones</span>
              )}
            </div>
            <h2 className="font-crimson" style={{ fontSize: 22, fontWeight: 700, margin: 0, lineHeight: 1.3 }}>
              {bloque.titulo}
            </h2>
            <p style={{ fontSize: 14, opacity: 0.92, marginTop: 6, marginBottom: 0 }}>
              {bloque.descripcion}
            </p>
          </div>
          <motion.span
            animate={{ rotate: abierto ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            style={{ flexShrink: 0, opacity: 0.9, display: "flex" }}
          >
            <Chevron size={22} color="white" />
          </motion.span>
        </div>
      </button>

      {/* Cuerpo del área */}
      <AnimatePresence initial={false}>
        {abierto && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ paddingTop: 16 }}>
              {!tieneContenido ? (
                <div style={{
                  padding: "30px 24px", background: "var(--bg-card)",
                  borderRadius: 14, border: "1px dashed var(--border)",
                  textAlign: "center", color: "var(--fg-muted)",
                }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>🚧</div>
                  <div style={{ fontSize: 15, fontWeight: 600 }}>Contenido en desarrollo</div>
                  <div style={{ fontSize: 13, marginTop: 4 }}>
                    Estamos preparando las lecciones de esta área. Mientras tanto, podés practicar con los simulacros.
                  </div>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {bloque.unidades.map((u) => (
                    <UnidadCard key={u.numero} unidad={u} esPremium={esPremium} />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

function UnidadCard({ unidad, esPremium }: { unidad: Unidad; esPremium: boolean }) {
  const esGratis = unidad.numero === "01";
  const accesible = esGratis || esPremium;
  // Default: TODAS cerradas. El usuario abre solo lo que le interesa.
  const [abierto, setAbierto] = useState(false);

  return (
    <section style={{
      background: "var(--bg-card)", borderRadius: 14,
      border: "1px solid var(--border)",
      boxShadow: "var(--shadow-sm)", opacity: accesible ? 1 : 0.85,
      overflow: "hidden",
    }}>
      <button
        onClick={() => setAbierto((v) => !v)}
        style={{
          all: "unset", cursor: "pointer", display: "block", width: "100%",
          padding: 18, boxSizing: "border-box",
        }}
        aria-expanded={abierto}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
          <span style={{
            fontSize: 11, fontWeight: 800, color: accesible ? "var(--accent)" : "var(--fg-muted)",
            background: "var(--bg-subtle)", padding: "4px 10px", borderRadius: 8, letterSpacing: 1,
          }}>UNIDAD {unidad.numero}</span>
          <h3 className="font-crimson" style={{
            fontSize: 18, fontWeight: 700, color: "var(--fg-primary)", margin: 0, flex: 1, minWidth: 180,
          }}>{unidad.titulo}</h3>
          {!accesible && (
            <span style={{
              fontSize: 11, fontWeight: 800, color: "#92400e",
              background: "linear-gradient(135deg, #fde68a, #fcd34d)",
              padding: "4px 10px", borderRadius: 8, letterSpacing: 0.6,
            }}>🔒 SOLO PREMIUM</span>
          )}
          {esGratis && (
            <span style={{
              fontSize: 11, fontWeight: 800, color: "#065f46",
              background: "linear-gradient(135deg, #d1fae5, #a7f3d0)",
              padding: "4px 10px", borderRadius: 8, letterSpacing: 0.6,
            }}>GRATIS</span>
          )}
          <span style={{
            fontSize: 12, color: "var(--fg-muted)", fontWeight: 600,
            display: "flex", alignItems: "center", gap: 8, flexShrink: 0,
          }}>
            <span style={{
              background: "var(--bg-subtle)", borderRadius: 999,
              padding: "3px 9px", whiteSpace: "nowrap",
            }}>
              {unidad.lecciones.length} {unidad.lecciones.length === 1 ? "lección" : "lecciones"}
            </span>
            <motion.span
              animate={{ rotate: abierto ? 180 : 0 }}
              transition={{ duration: 0.25 }}
              style={{ display: "flex" }}
            >
              <Chevron size={16} color="var(--fg-muted)" />
            </motion.span>
          </span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {abierto && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: "hidden" }}
          >
            <ul style={{
              listStyle: "none", padding: "0 18px 18px", margin: 0,
              display: "flex", flexDirection: "column", gap: 6,
            }}>
              {unidad.lecciones.map((l, i) => {
                if (accesible && l.slug) {
                  return (
                    <li key={i}>
                      <Link href={`/aprende/${l.slug}`} style={leccionEstilo("activa")}>
                        <span>{l.titulo}</span>
                        <span style={{ display: "flex", gap: 8, alignItems: "center" }}>
                          {l.tags?.map((t) => (<span key={t} style={tagEstilo}>{t}</span>))}
                          <span style={{ color: "var(--accent)", fontWeight: 700 }}>→</span>
                        </span>
                      </Link>
                    </li>
                  );
                }
                if (!accesible) {
                  return (
                    <li key={i}>
                      <Link href="/precios" style={leccionEstilo("bloqueada")}>
                        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ opacity: 0.6 }}>🔒</span>
                          {l.titulo}
                        </span>
                        <span style={{ fontSize: 11, fontWeight: 700, color: "#92400e", letterSpacing: 0.5 }}>
                          DESBLOQUEAR →
                        </span>
                      </Link>
                    </li>
                  );
                }
                return (
                  <li key={i}>
                    <div style={leccionEstilo("proximamente")}>
                      <span>{l.titulo}</span>
                      <span style={{ fontSize: 12, color: "var(--border)", fontWeight: 600 }}>próximamente</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

const leccionEstilo = (variante: "activa" | "bloqueada" | "proximamente"): React.CSSProperties => ({
  display: "flex", justifyContent: "space-between", alignItems: "center",
  padding: "12px 14px", borderRadius: 10,
  background: variante === "activa" ? "var(--bg-base)" :
              variante === "bloqueada" ? "#fffbeb" :
              "transparent",
  border: variante === "activa" ? "1px solid var(--border)" :
          variante === "bloqueada" ? "1px solid #fde68a" :
          "1px dashed transparent",
  color: variante === "activa" ? "var(--fg-primary)" :
         variante === "bloqueada" ? "#78350f" :
         "var(--fg-muted)",
  textDecoration: "none", fontSize: 15, fontWeight: 600,
  cursor: variante === "proximamente" ? "default" : "pointer",
  transition: "background 0.2s",
});

const tagEstilo: React.CSSProperties = {
  fontSize: 11, fontWeight: 700, color: "var(--accent)",
  background: "rgba(99, 102, 241, 0.1)",
  padding: "3px 8px", borderRadius: 6, letterSpacing: 0.5,
};

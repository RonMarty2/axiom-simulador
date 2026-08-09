// ─────────────────────────────────────────────────────────────
// Catálogo de "Láminas de Repaso" — contenido premium, formato
// hoja-de-referencia de una sola página. Ver BITÁCORA §4.5 para las
// reglas de diseño didáctico y la historia de por qué está estructurado
// como módulo → láminas atómicas (no 1 familia grande = 1 lámina).
//
// El banco de exámenes (`data/examenes/...`, campo `tema:`) se usó como
// MAPA para armar esta lista, agrupando 496 tags crudos de
// Aritmética-Álgebra de Ingeniería en 24 familias reales. Cada familia es
// un módulo que se abre en varias láminas atómicas encadenadas.
// ─────────────────────────────────────────────────────────────

export type Lamina = {
  slug: string;
  titulo: string;
  publicada: boolean;
};

export type Modulo = {
  slug: string;
  titulo: string;
  laminas: Lamina[];
};

export type FacultadLaminas = {
  facultad: string;   // ej. "ingenieria" — mismo id que usa el banco de exámenes
  area: string;        // ej. "aritmetica_algebra"
  areaLabel: string;
  modulos: Modulo[];
};

export const LAMINAS: FacultadLaminas[] = [
  {
    facultad: "ingenieria",
    area: "aritmetica_algebra",
    areaLabel: "Aritmética-Álgebra",
    modulos: [
      {
        slug: "logaritmos-y-exponenciales",
        titulo: "Logaritmos y exponenciales",
        laminas: [
          { slug: "que-es-un-logaritmo", titulo: "¿Qué es un logaritmo?", publicada: false },
          { slug: "propiedades-de-logaritmos", titulo: "Propiedades de los logaritmos", publicada: false },
          { slug: "cambio-de-base", titulo: "Cambio de base", publicada: false },
          { slug: "ecuaciones-exponenciales", titulo: "Ecuaciones exponenciales", publicada: false },
          { slug: "ecuaciones-logaritmicas-simples", titulo: "Ecuaciones logarítmicas simples", publicada: false },
          { slug: "ecuaciones-logaritmicas-complejas", titulo: "Ecuaciones logarítmicas complejas", publicada: false },
          { slug: "dominio-funcion-logaritmica", titulo: "Dominio de funciones logarítmicas", publicada: false },
          { slug: "crecimiento-y-decaimiento", titulo: "Aplicaciones: crecimiento y decaimiento", publicada: false },
        ],
      },
      {
        slug: "progresiones",
        titulo: "Progresiones",
        laminas: [
          { slug: "progresion-aritmetica", titulo: "Progresión aritmética", publicada: false },
          { slug: "suma-progresion-aritmetica", titulo: "Suma de una progresión aritmética", publicada: false },
          { slug: "progresion-geometrica", titulo: "Progresión geométrica", publicada: false },
          { slug: "suma-progresion-geometrica-finita", titulo: "Suma de una progresión geométrica finita", publicada: false },
          { slug: "suma-progresion-geometrica-infinita", titulo: "Suma de una progresión geométrica infinita", publicada: false },
          { slug: "progresiones-aplicadas", titulo: "Progresiones aplicadas a problemas", publicada: false },
        ],
      },
      {
        slug: "teorema-del-resto",
        titulo: "Teorema del Resto y división de polinomios",
        laminas: [
          { slug: "division-de-polinomios", titulo: "División de polinomios", publicada: true },
          { slug: "division-sintetica", titulo: "División sintética (Ruffini)", publicada: true },
          { slug: "teorema-del-resto", titulo: "Teorema del Resto", publicada: true },
          { slug: "teorema-del-factor", titulo: "Teorema del Factor", publicada: true },
          { slug: "aplicaciones-teorema-resto", titulo: "Aplicaciones combinadas", publicada: true },
        ],
      },
      {
        slug: "cuadraticas-y-vieta",
        titulo: "Ecuaciones cuadráticas y relaciones de Vieta",
        laminas: [
          { slug: "ecuacion-cuadratica-discriminante", titulo: "Ecuación cuadrática y discriminante", publicada: true },
          { slug: "relaciones-de-vieta", titulo: "Relaciones de Vieta", publicada: true },
          { slug: "ecuaciones-desde-raices-transformadas", titulo: "Construir ecuaciones desde raíces transformadas", publicada: true },
          { slug: "naturaleza-de-las-raices", titulo: "Naturaleza de las raíces", publicada: true },
          { slug: "ecuaciones-cubicas-vieta", titulo: "Ecuaciones cúbicas (Vieta extendido)", publicada: true },
        ],
      },
      {
        slug: "sistemas-de-ecuaciones",
        titulo: "Sistemas de ecuaciones",
        laminas: [
          { slug: "sistemas-lineales-2x2", titulo: "Sistemas lineales 2×2", publicada: true },
          { slug: "sistemas-lineales-3x3", titulo: "Sistemas lineales 3×3 y más", publicada: true },
          { slug: "sistemas-no-lineales", titulo: "Sistemas no lineales", publicada: true },
          { slug: "sistemas-aplicados-a-planteo", titulo: "Sistemas aplicados a problemas de planteo", publicada: true },
        ],
      },
      {
        slug: "ecuaciones-racionales",
        titulo: "Ecuaciones y expresiones racionales",
        laminas: [
          { slug: "expresion-racional-y-simplificacion", titulo: "Qué es una expresión racional y cómo simplificarla", publicada: true },
          { slug: "ecuaciones-racionales", titulo: "Ecuaciones racionales", publicada: true },
          { slug: "ecuaciones-literales", titulo: "Ecuaciones literales (despeje)", publicada: true },
          { slug: "fracciones-parciales", titulo: "Fracciones parciales", publicada: true },
        ],
      },
      {
        slug: "ecuaciones-irracionales",
        titulo: "Ecuaciones e inecuaciones irracionales",
        laminas: [
          { slug: "ecuacion-irracional-y-raices-extranas", titulo: "Ecuación irracional y raíces extrañas", publicada: true },
          { slug: "racionalizacion", titulo: "Racionalización", publicada: true },
          { slug: "irracionales-complejas", titulo: "Irracionales complejas (radicales anidados)", publicada: false },
        ],
      },
      {
        slug: "divisores-mcd-mcm",
        titulo: "Divisores, MCD y MCM",
        laminas: [
          { slug: "factorizacion-prima-y-divisores", titulo: "Factorización prima y número de divisores", publicada: false },
          { slug: "mcd-y-mcm", titulo: "MCD y MCM", publicada: false },
          { slug: "aplicaciones-mcd-mcm", titulo: "Aplicaciones (reparto, encuentros periódicos)", publicada: false },
        ],
      },
      {
        slug: "regla-de-tres-y-reparto",
        titulo: "Regla de tres y reparto proporcional",
        laminas: [
          { slug: "regla-de-tres-simple", titulo: "Regla de tres simple", publicada: false },
          { slug: "regla-de-tres-compuesta", titulo: "Regla de tres compuesta", publicada: false },
          { slug: "reparto-proporcional", titulo: "Reparto proporcional", publicada: false },
        ],
      },
      {
        slug: "binomio-de-newton",
        titulo: "Binomio de Newton",
        laminas: [
          { slug: "que-es-el-binomio-de-newton", titulo: "Qué es y coeficientes binomiales", publicada: false },
          { slug: "termino-general", titulo: "Término general", publicada: false },
          { slug: "termino-independiente-o-central", titulo: "Término independiente / central", publicada: false },
        ],
      },
      {
        slug: "funciones-racionales",
        titulo: "Funciones racionales",
        laminas: [
          { slug: "dominio-funcion-racional", titulo: "Dominio de funciones racionales", publicada: false },
          { slug: "asintotas", titulo: "Asíntotas", publicada: false },
        ],
      },
      {
        slug: "porcentajes-mezclas-interes",
        titulo: "Porcentajes, mezclas e interés",
        laminas: [
          { slug: "porcentajes", titulo: "Porcentajes", publicada: false },
          { slug: "mezclas", titulo: "Problemas de mezclas", publicada: false },
          { slug: "interes-simple-y-compuesto", titulo: "Interés simple y compuesto", publicada: false },
        ],
      },
      {
        slug: "factorizacion-productos-notables",
        titulo: "Factorización y productos notables",
        laminas: [
          { slug: "productos-notables", titulo: "Productos notables", publicada: false },
          { slug: "factorizacion-basica", titulo: "Factorización: casos básicos", publicada: false },
          { slug: "factorizacion-casos-especiales", titulo: "Factorización: casos especiales", publicada: false },
        ],
      },
      {
        slug: "funciones-cuadraticas-optimizacion",
        titulo: "Funciones cuadráticas: optimización",
        laminas: [
          { slug: "la-parabola-vertice", titulo: "La parábola: vértice y eje de simetría", publicada: false },
          { slug: "optimizacion-aplicada", titulo: "Optimización aplicada", publicada: false },
        ],
      },
      {
        slug: "trabajo-combinado",
        titulo: "Trabajo combinado",
        laminas: [
          { slug: "problemas-de-trabajo-combinado", titulo: "Problemas de trabajo combinado", publicada: false },
        ],
      },
      {
        slug: "inecuaciones",
        titulo: "Inecuaciones",
        laminas: [
          { slug: "inecuaciones-lineales-y-cuadraticas", titulo: "Inecuaciones lineales y cuadráticas", publicada: false },
          { slug: "inecuaciones-racionales", titulo: "Inecuaciones racionales", publicada: false },
        ],
      },
      {
        slug: "planteo-verbal-general",
        titulo: "Planteo verbal general",
        laminas: [
          { slug: "traducir-palabras-a-ecuaciones", titulo: "Traducir un problema verbal a ecuaciones", publicada: false },
        ],
      },
      {
        slug: "polinomios-grado",
        titulo: "Polinomios: grado y definiciones",
        laminas: [
          { slug: "que-es-un-polinomio", titulo: "Qué es un polinomio: grado absoluto y relativo", publicada: false },
        ],
      },
      {
        slug: "problemas-de-cifras",
        titulo: "Problemas de cifras y dígitos",
        laminas: [
          { slug: "problemas-de-cifras", titulo: "Problemas de cifras (notación posicional)", publicada: false },
        ],
      },
      {
        slug: "exponentes-y-radicales",
        titulo: "Exponentes y radicales: simplificación",
        laminas: [
          { slug: "leyes-de-exponentes-y-radicales", titulo: "Leyes de exponentes y simplificación de radicales", publicada: false },
        ],
      },
      {
        slug: "problemas-de-moviles",
        titulo: "Problemas de móviles",
        laminas: [
          { slug: "movimiento-encuentro-y-alcance", titulo: "Movimiento, encuentro y alcance (MRU)", publicada: false },
        ],
      },
      {
        slug: "combinatoria-basica",
        titulo: "Combinatoria básica",
        laminas: [
          { slug: "permutaciones-y-conteo", titulo: "Permutaciones y conteo", publicada: false },
        ],
      },
      {
        slug: "problemas-de-edades",
        titulo: "Problemas de edades",
        laminas: [
          { slug: "planteo-de-problemas-de-edades", titulo: "Planteo de problemas de edades", publicada: false },
        ],
      },
    ],
  },
];

export function obtenerFacultadLaminas(facultad: string): FacultadLaminas | undefined {
  return LAMINAS.find((f) => f.facultad === facultad);
}

export function obtenerModulo(facultad: string, moduloSlug: string): Modulo | undefined {
  return obtenerFacultadLaminas(facultad)?.modulos.find((m) => m.slug === moduloSlug);
}

export function obtenerLamina(facultad: string, moduloSlug: string, laminaSlug: string): Lamina | undefined {
  return obtenerModulo(facultad, moduloSlug)?.laminas.find((l) => l.slug === laminaSlug);
}

// Catálogo de "Aprende paso a paso": qué bloques, unidades y lecciones ve
// cada facultad. Vivía dentro de aprende/page.tsx, que es un componente
// cliente; se sacó acá para que el guard de servidor (aprende/layout.tsx)
// pueda saber si una lección es gratis SIN cargar toda la pantalla.
//
// Regla del plan gratis (decisión D2 de la bitácora): la Unidad 01 de cada
// bloque es gratis; el resto pide suscripción activa.
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

export { BLOQUES_POR_FACULTAD, BLOQUES_ECONOMICAS, BLOQUES_INGENIERIA };
export type { Leccion, Unidad, Bloque };

// Slugs de las lecciones abiertas en el plan gratis: las de toda Unidad 01,
// de cualquier bloque y de cualquier facultad.
export const SLUGS_GRATIS: ReadonlySet<string> = new Set(
  Object.values(BLOQUES_POR_FACULTAD)
    .flat()
    .flatMap((b) => b.unidades)
    .filter((u) => u.numero === "01")
    .flatMap((u) => u.lecciones)
    .map((l) => l.slug)
    .filter((s): s is string => Boolean(s)),
);

// ─────────────────────────────────────────────────────────────
// Banco de exámenes (contenido estático curado offline)
// ─────────────────────────────────────────────────────────────

// Una "sección" del examen. Cada facultad define las suyas con el nombre que
// quiera (Económicas usa "matematicas", "economicas"…; Medicina usa "libro_1",
// "libro_2"…). Por eso es un string libre, no una lista cerrada: el catálogo
// real vive en cada facultad (facultades.json / tabla facultades).
export type Area = string;

// Secciones de ejemplo (sólo sugerencias para autocompletar; NO limitan nada).
export const AREAS_SUGERIDAS = [
  "matematicas",
  "economicas",
  "verbal",
  "razonamiento",
  "general",
  "fisica",
  "quimica",
  "biologia",
  "civica",
  "historia",
] as const;

export type Dificultad = "facil" | "medio" | "dificil";

export interface OpcionPregunta {
  letra: string;        // "A" | "B" | "C" | "D"
  texto: string;        // puede contener $...$ KaTeX
}

export type TipoPregunta =
  | "seleccion_simple"      // A/B/C/D, 1 correcta (clasica)
  | "seleccion_multiple"    // varias correctas
  | "verdadero_falso"       // V/F
  | "emparejamiento"        // par A-X, B-Y
  | "completar"             // espacios en blanco
  | "abierta";              // respuesta libre (para banco didactico)

export interface OpcionEmparejamiento {
  izquierda: string;
  derecha: string;
}

export interface PreguntaBanco {
  id: string;                       // umss-economicas-2024-001
  universidad: string;              // UMSS
  facultad: string;                 // economicas
  anio: number;                     // 2024
  numero: number;                   // 1..N
  area: Area;
  tema: string;                     // "integrales", "oferta_demanda", ...
  dificultad: Dificultad;
  enunciado: string;                // texto con $...$ y $$...$$ inline
  opciones: OpcionPregunta[];
  respuesta_correcta: string;       // "A" | "B" | "C" | "D" — o "A,C" para multi
  explicacion?: string;
  figura?: string;                  // id de figura del motor de geometría (ej. "g6-isosceles")
  figura_svg?: string;              // dibujo en código SVG crudo (viene del .md, ej. generado por otra IA)
  figura_descripcion?: string;      // descripción textual de la figura (curaduría, no se muestra al alumno)
  tags?: string[];
  // Campos opcionales para nuevos tipos:
  tipo?: TipoPregunta;              // por defecto "seleccion_simple" (retrocompatible)
  pares_emparejamiento?: OpcionEmparejamiento[];
  espacios_completar?: string[];    // respuestas para cada espacio
  fecha_creacion?: string;
  creado_por?: string;
  materia_id?: string;              // referencia a materias.json
}

export type MotivoFaltante =
  | "ilegible"          // la pregunta está en la hoja pero el escaneo no se lee
  | "pagina-ausente"    // el PDF directamente no trae esa página
  | "sin-opciones"      // está el enunciado pero no las alternativas
  | "sin-respuesta";    // está todo menos cuál es la correcta

// Una pregunta que el examen SÍ tomó y que no se pudo transcribir. Se declara
// en vez de saltearla, por dos razones: el alumno tiene que ver que el examen
// tenía 10 preguntas y no 9, y el día que aparezca un escaneo mejor hay que
// poder ir derecho a la página. Ver "Convención para lo que no se puede leer"
// en examenes pasados/INVENTARIO.md.
//
// LA NUMERACIÓN NO SE TOCA: si falta la 7, la siguiente sigue siendo la 8.
export interface PreguntaFaltante {
  numero: number;
  motivo: MotivoFaltante;
  fuente: string;       // archivo y página exactos, ej "FCE/.../Banco.pdf p.21"
  detalle?: string;     // qué es puntualmente lo que no se lee
}

export interface ExamenBanco {
  id: string;                       // umss-ingenieria-2023-segundo-parcial-curso-propedeutico-gestion-2-2006 (sufijo = slug(titulo), o slug(opcion) si no hay titulo)
  universidad: string;
  facultad: string;
  anio: number;
  fecha_examen?: string;
  duracion_minutos: number;
  total_preguntas: number;
  ponderacion: Record<string, number>;
  // Distingue examenes del MISMO año (la UMSS toma varias convocatorias):
  opcion?: string;                  // "1ra Opción", "2da Opción", "3ra Opción"...
  titulo?: string;                  // display explicito, ej "Examen de Ingreso 1-2023 (1ra Opción)" — tambien se usa para el sufijo del id (ver banco-parser.ts:construirId), porque "anio"+"opcion" solo no alcanza para distinguir convocatorias del mismo año calendario
  // Distingue Examenes de Admision (el banco principal) de Parciales/Finales
  // de Curso Propedeutico/Pre-Facultativo. Default "admision" si no se
  // especifica en el frontmatter — retrocompatible. /resueltos usa este
  // campo para mostrar un toggle entre ambas categorias.
  categoria?: string;
  // Secciones que el examen SÍ tomó pero que todavía no están transcriptas,
  // con el motivo: { historia: "no-esta-en-ningun-pdf" }. Los facsímiles vienen
  // partidos por materia entre varios PDF, así que es normal tener Matemáticas
  // de una gestión y que falte Historia. La sección se declara igual en
  // `ponderacion` y se muestra vacía: el alumno tiene que seguir viendo el
  // examen COMPLETO de esa gestión, con una materia en preparación, y no uno
  // al que le falta un pedazo sin avisar.
  secciones_pendientes?: Record<string, string>;
  // Preguntas que no se pudieron transcribir, con su número original.
  faltantes?: PreguntaFaltante[];
  preguntas: PreguntaBanco[];
}

export interface ExamenMetadata {
  id: string;
  universidad: string;
  facultad: string;
  anio: number;
  fecha_examen?: string;
  duracion_minutos: number;
  total_preguntas: number;
  opcion?: string;
  titulo?: string;
  categoria?: string;
  // Secciones que el examen SÍ tomó pero que todavía no están transcriptas,
  // con el motivo: { historia: "no-esta-en-ningun-pdf" }. Los facsímiles vienen
  // partidos por materia entre varios PDF, así que es normal tener Matemáticas
  // de una gestión y que falte Historia. La sección se declara igual en
  // `ponderacion` y se muestra vacía: el alumno tiene que seguir viendo el
  // examen COMPLETO de esa gestión, con una materia en preparación, y no uno
  // al que le falta un pedazo sin avisar.
  secciones_pendientes?: Record<string, string>;
  faltantes?: PreguntaFaltante[];
  areas_resumen: { area: string; cantidad: number }[];
}

// ─────────────────────────────────────────────────────────────
// Modos de simulación (decide cómo se arma el set de preguntas)
// ─────────────────────────────────────────────────────────────

export type ModoSimulacion =
  | "examen_real"        // un examen pasado completo, tal cual
  | "mixto"              // mezcla aleatoria de varios años
  | "predictivo"         // distribución estadística del banco (sin IA)
  | "por_tema"           // solo preguntas de un tema específico
  | "mis_errores"        // solo las que el usuario falló antes
  | "ia_generado";       // preguntas frescas generadas por IA según temario oficial

export interface ConfiguracionSimulacion {
  modo: ModoSimulacion;
  universidad: string;
  facultad: string;
  anio?: number;                    // modo "examen_real": filtro por año (ambiguo si hay varias opciones ese año — preferir examen_id)
  examen_id?: string;               // modo "examen_real": id EXACTO del examen (ej. umss-ingenieria-2025-2op-2-2025). Evita ambigüedad cuando hay varias convocatorias/opciones el mismo año.
  tema?: string;                    // requerido para modo "por_tema"
  area?: string;                    // filtro por sección (área/libro) para mixto y por_tema
  cantidad_preguntas?: number;      // override opcional para mixto/predictivo/ia_generado
  dificultad?: Dificultad;          // override opcional para ia_generado
  temas_reforzar?: string[];        // para ia_generado: temas a priorizar (debilidades del usuario)
  temas_evitar?: string[];          // para ia_generado: temas que ya domina
}

// ─────────────────────────────────────────────────────────────
// Simulador (sesión activa del usuario)
// ─────────────────────────────────────────────────────────────

export interface Simulador {
  id: string;
  usuario_id: string;
  config?: ConfiguracionSimulacion;
  preguntas?: PreguntaBanco[];                  // snapshot al crear el simulador (nuevo)
  /** @deprecated usar `preguntas` (PreguntaBanco[]) — se mantiene por compatibilidad con código legacy */
  preguntas_generadas?: Pregunta[];
  respuestas_usuario: Record<string, string>;   // { preguntaId: letra }
  marcadas?: string[];                          // ids de preguntas marcadas para revisar
  estado: "activo" | "completado" | "calificado";
  fecha_inicio: string;                         // ISO
  fecha_fin?: string;
  nota_final?: number;                          // 0..100
  desglose?: Record<string, number>;            // { area: nota }
  tiempo_usado_segundos?: number;
  duracion_minutos?: number;                    // limite de tiempo (para cronometro)
  pregunta_texto?: string;                      // legacy
}

export interface RespuestaUsuario {
  pregunta_id: string;
  respuesta: string;             // letra elegida
  correcta: boolean;
  tiempo_segundos: number;
}

// ─────────────────────────────────────────────────────────────
// Plan personalizado (1 llamada IA bajo demanda)
// ─────────────────────────────────────────────────────────────

export interface PlanPersonalizado {
  id: string;
  usuario_id: string;
  simulador_id: string;
  area_debil: string;
  dias: {
    dia: number;
    tema: string;
    tiempo_minutos: number;
    ejercicios: number;
    descripcion: string;
  }[];
  generado: string;
  pdf_url?: string;
}

// ─────────────────────────────────────────────────────────────
// Feedback post-examen (1 llamada IA al terminar)
// ─────────────────────────────────────────────────────────────

export interface FeedbackExamen {
  resumen: string;                 // 1-2 párrafos personalizados
  fortalezas: string[];
  debilidades: string[];
  recomendacion: string;
  nivel: "minimo" | "profundo";    // según plan del usuario
  generado: string;
}

// ─────────────────────────────────────────────────────────────
// Legacy / compatibilidad con código existente
// ─────────────────────────────────────────────────────────────

/** @deprecated usar PreguntaBanco */
export interface Pregunta {
  id: string;
  area: string;
  contenido: string;
  opciones: string[];
  respuesta_correcta: string;
  explicacion: string;
  dificultad: "facil" | "medio" | "dificil";
}

export interface ExamenConfig {
  id: string;
  nombre: string;
  areas: { nombre: string; cantidad: number; ponderacion: number }[];
  tiempo_minutos: number;
  activo: boolean;
  creado: string;
}

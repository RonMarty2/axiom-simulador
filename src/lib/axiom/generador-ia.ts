import crypto from "crypto";
import { llamarIA, extraerJSON } from "@/lib/aiProvider";
import type { Area, Dificultad, PreguntaBanco } from "./types";

export interface ConfigGeneracionIA {
  universidad: string;             // "UMSS"
  facultad: string;                // id de la facultad: "economicas", "medicina"…
  facultad_nombre?: string;        // nombre legible: "Facultad de Medicina"
  cantidad: number;                // total de preguntas (10..50 razonable)
  secciones?: string[];            // secciones reales de la facultad (libro_1, matematicas…)
  ponderacion?: Record<string, number>; // peso de cada sección (fracción 0..1)
  dificultad?: Dificultad;         // por defecto "medio"
  temas_evitar?: string[];         // ids/temas que el estudiante ya dominó
  temas_reforzar?: string[];       // temas donde el estudiante falló
}

interface PreguntaIA {
  area: string;
  tema: string;
  dificultad: string;
  enunciado: string;
  opciones: { letra: string; texto: string }[];
  respuesta_correcta: string;
  explicacion: string;
}

// Reparte `cantidad` preguntas entre las secciones según su peso.
function distribuirCantidad(
  cantidad: number,
  secciones: string[],
  ponderacion: Record<string, number>
): Record<string, number> {
  const out: Record<string, number> = {};
  if (secciones.length === 0) return { general: cantidad };

  // Pesos: usa ponderacion si existe, sino reparte parejo entre secciones.
  const pesos = secciones.map((s) => ponderacion[s] ?? 1 / secciones.length);
  const sumaPesos = pesos.reduce((a, b) => a + b, 0) || 1;

  let acumulado = 0;
  for (let i = 0; i < secciones.length; i++) {
    if (i === secciones.length - 1) {
      out[secciones[i]] = Math.max(0, cantidad - acumulado);
    } else {
      const n = Math.round((cantidad * pesos[i]) / sumaPesos);
      out[secciones[i]] = n;
      acumulado += n;
    }
  }
  return out;
}

function promptSistema(facultadNombre: string, secciones: string[]): string {
  const listaSecciones = secciones.length > 0 ? secciones.join(", ") : "general";
  return [
    `Eres un profesor universitario boliviano experto en el examen de ingreso a ${facultadNombre} de la UMSS (Universidad Mayor de San Simón, Cochabamba).`,
    "",
    "Tu tarea es generar preguntas REALISTAS, de nivel y estilo IDÉNTICO al examen oficial UMSS de esta facultad. NUNCA inventes contenido fuera del temario propio de la carrera.",
    "",
    `Este examen se divide en estas secciones: ${listaSecciones}.`,
    "Cada pregunta debe pertenecer a UNA de esas secciones (usa exactamente ese nombre en el campo \"area\").",
    "El contenido de cada pregunta debe corresponder al temario real de la facultad y de esa sección.",
    "",
    "FORMATO OBLIGATORIO:",
    "- Cada pregunta tiene EXACTAMENTE 4 opciones (A, B, C, D).",
    "- Solo UNA respuesta correcta.",
    "- Las opciones incorrectas deben ser plausibles (distractores realistas), no obviamente absurdas.",
    "- En matemáticas/física/química, usa LaTeX con $...$ inline o $$...$$ en bloque.",
    "- Si aplica dinero boliviano, usa Bs. (bolivianos).",
    "- Explicación BREVE (1-3 líneas) que enseñe el concepto, no solo dé la respuesta.",
    "- Enunciados claros, sin ambigüedad, sin errores de redacción.",
    "",
    "ANTI-ALUCINACIÓN:",
    "- NO inventes datos específicos que no estén bien verificados.",
    "- Usa hechos generales estables (conceptos), no cifras exactas dudosas.",
    "- NO uses fechas posteriores a 2025.",
    "- NO uses nombres de personas reales bolivianas en contextos sensibles.",
    "",
    "Devuelve SOLO JSON válido, sin texto antes ni después, sin markdown ni triple backtick.",
  ].join("\n");
}

function promptUsuario(
  facultadNombre: string,
  config: ConfigGeneracionIA,
  distribucion: Record<string, number>
): string {
  const dif = config.dificultad ?? "medio";
  const refuerzo = config.temas_reforzar?.length
    ? `\n\nPRIORIZA estos temas (el estudiante falló en ellos antes): ${config.temas_reforzar.join(", ")}.`
    : "";
  const evitar = config.temas_evitar?.length
    ? `\n\nEvita estos temas (ya los domina): ${config.temas_evitar.join(", ")}.`
    : "";

  const primeraSeccion = Object.keys(distribucion)[0] ?? "general";
  const lineas: string[] = [
    `Genera ${config.cantidad} preguntas para el examen de ingreso UMSS ${facultadNombre}.`,
    "",
    `Distribución por sección:`,
  ];
  for (const [seccion, n] of Object.entries(distribucion)) {
    if (n && n > 0) lineas.push(`- ${seccion}: ${n} preguntas`);
  }
  lineas.push("");
  lineas.push(`Dificultad general: ${dif}.${refuerzo}${evitar}`);
  lineas.push("");
  lineas.push("Devuelve EXACTAMENTE este JSON (sin envoltura, sin markdown):");
  lineas.push("");
  lineas.push("{");
  lineas.push('  "preguntas": [');
  lineas.push("    {");
  lineas.push(`      "area": "${primeraSeccion}",`);
  lineas.push('      "tema": "nombre_del_tema",');
  lineas.push('      "dificultad": "medio",');
  lineas.push('      "enunciado": "Texto de la pregunta con $LaTeX$ si aplica",');
  lineas.push('      "opciones": [');
  lineas.push('        { "letra": "A", "texto": "..." },');
  lineas.push('        { "letra": "B", "texto": "..." },');
  lineas.push('        { "letra": "C", "texto": "..." },');
  lineas.push('        { "letra": "D", "texto": "..." }');
  lineas.push("      ],");
  lineas.push('      "respuesta_correcta": "B",');
  lineas.push('      "explicacion": "Razonamiento corto y didáctico"');
  lineas.push("    }");
  lineas.push("  ]");
  lineas.push("}");
  return lineas.join("\n");
}

function validarYNormalizar(
  raw: PreguntaIA,
  universidad: string,
  facultad: string,
  numero: number,
  seccionesValidas: string[]
): PreguntaBanco | null {
  if (!raw || typeof raw !== "object") return null;
  if (!raw.enunciado || !raw.respuesta_correcta || !raw.opciones) return null;
  if (!Array.isArray(raw.opciones) || raw.opciones.length !== 4) return null;

  const areaNorm = (raw.area ?? "general").toLowerCase().trim().replace(/\s+/g, "_");
  // Si la IA respeta una de las secciones de la facultad, la usamos; si no,
  // caemos a la primera sección válida (o "general"). NUNCA descartamos por sección.
  const areaValida: Area = seccionesValidas.includes(areaNorm)
    ? areaNorm
    : (seccionesValidas[0] ?? "general");

  const difNorm = (raw.dificultad ?? "medio").toLowerCase().trim();
  const dificultad: Dificultad =
    ["facil", "medio", "dificil"].includes(difNorm)
      ? (difNorm as Dificultad)
      : "medio";

  const letraOk = ["A", "B", "C", "D"].includes(raw.respuesta_correcta);
  if (!letraOk) return null;

  return {
    id: `ia-${universidad.toLowerCase()}-${facultad.toLowerCase()}-${Date.now()}-${numero}-${crypto.randomBytes(2).toString("hex")}`,
    universidad,
    facultad,
    anio: new Date().getFullYear(),
    numero,
    area: areaValida,
    tema: (raw.tema ?? "general").toLowerCase().trim().replace(/\s+/g, "_"),
    dificultad,
    enunciado: raw.enunciado.trim(),
    opciones: raw.opciones.map((o) => ({
      letra: o.letra.toUpperCase(),
      texto: o.texto.trim(),
    })),
    respuesta_correcta: raw.respuesta_correcta.toUpperCase(),
    explicacion: raw.explicacion?.trim() ?? "",
    tags: ["ia_generado"],
  };
}

export async function generarPreguntasIA(
  config: ConfigGeneracionIA
): Promise<PreguntaBanco[]> {
  const cantidad = Math.max(5, Math.min(50, config.cantidad));
  const facultadNombre = config.facultad_nombre || `la Facultad de ${config.facultad}`;
  const secciones = (config.secciones ?? []).filter(Boolean);
  const ponderacion = config.ponderacion ?? {};

  const distribucion = distribuirCantidad(cantidad, secciones, ponderacion);

  const system = promptSistema(facultadNombre, secciones);
  const user = promptUsuario(facultadNombre, { ...config, cantidad }, distribucion);

  const { text } = await llamarIA(system, user, 8000);
  const json = extraerJSON(text);

  if (!json || !Array.isArray((json as { preguntas?: unknown }).preguntas)) {
    throw new Error(
      "La IA no devolvió preguntas en formato válido. Por favor intenta de nuevo."
    );
  }

  const preguntasRaw = (json as { preguntas: PreguntaIA[] }).preguntas;
  const preguntas: PreguntaBanco[] = [];
  let numero = 1;
  for (const raw of preguntasRaw) {
    const p = validarYNormalizar(raw, config.universidad, config.facultad, numero, secciones);
    if (p) {
      preguntas.push(p);
      numero++;
    }
  }

  if (preguntas.length === 0) {
    throw new Error(
      "Ninguna de las preguntas generadas pasó la validación. Por favor intenta de nuevo."
    );
  }

  return preguntas;
}

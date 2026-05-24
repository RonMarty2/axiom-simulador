import crypto from "crypto";
import { llamarIA, extraerJSON } from "@/lib/aiProvider";
import type { Area, Dificultad, PreguntaBanco } from "./types";

export interface ConfigGeneracionIA {
  universidad: string;             // "UMSS"
  facultad: string;                // "economicas"
  cantidad: number;                // total de preguntas (10..50 razonable)
  areas?: Partial<Record<Area, number>>; // cuántas por área. Si no se da, distribuye automático
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

const DISTRIBUCION_DEFAULT_ECONOMICAS: Record<Area, number> = {
  matematicas: 0.40,
  economicas: 0.35,
  verbal: 0.15,
  razonamiento: 0.10,
  general: 0,
};

function distribuirCantidad(
  cantidad: number,
  ponderacion: Record<Area, number>
): Partial<Record<Area, number>> {
  const out: Partial<Record<Area, number>> = {};
  let acumulado = 0;
  const entries = Object.entries(ponderacion) as [Area, number][];
  for (let i = 0; i < entries.length; i++) {
    const [area, peso] = entries[i];
    if (peso === 0) continue;
    if (i === entries.length - 1) {
      out[area] = cantidad - acumulado;
    } else {
      const n = Math.round(cantidad * peso);
      out[area] = n;
      acumulado += n;
    }
  }
  return out;
}

function promptSistemaUMSSEconomia(): string {
  return [
    "Eres un profesor universitario boliviano experto en el examen de ingreso a la Facultad de Ciencias Económicas de la UMSS (Universidad Mayor de San Simón, Cochabamba).",
    "",
    "Tu tarea es generar preguntas REALISTAS, de nivel y estilo IDÉNTICO al examen oficial UMSS. NUNCA inventes contenido fuera del temario.",
    "",
    "TEMARIO OFICIAL UMSS - INGRESO ECONOMÍA:",
    "",
    "ÁREA MATEMÁTICAS (40%):",
    "- Álgebra: ecuaciones lineales y cuadráticas, sistemas, factorización, productos notables",
    "- Funciones: lineal, cuadrática, exponencial, logarítmica",
    "- Cálculo básico: límites simples, derivadas de polinomios, integrales definidas simples",
    "- Probabilidad y estadística básica: media, mediana, moda, eventos simples",
    "- Geometría analítica: recta, distancia, pendiente",
    "",
    "ÁREA ECONOMÍA (35%):",
    "- Microeconomía: oferta, demanda, elasticidad, equilibrio de mercado, costos",
    "- Macroeconomía: PIB nominal vs real, inflación, desempleo, balanza comercial",
    "- Economía boliviana: bolivianos, INE, exportaciones, hidrocarburos, minería",
    "- Conceptos básicos: escasez, costo de oportunidad, factores de producción",
    "",
    "ÁREA VERBAL (15%):",
    "- Sinónimos, antónimos, analogías",
    "- Comprensión lectora de textos cortos",
    "- Significado en contexto",
    "",
    "ÁREA RAZONAMIENTO (10%):",
    "- Series numéricas, series de letras",
    "- Lógica proposicional simple",
    "- Razonamiento aritmético: regla de tres, porcentajes, proporciones",
    "",
    "FORMATO OBLIGATORIO:",
    "- Cada pregunta tiene EXACTAMENTE 4 opciones (A, B, C, D)",
    "- Solo UNA respuesta correcta",
    "- Las opciones incorrectas deben ser plausibles (distractores realistas), no obviamente absurdas",
    "- En matemáticas, usa LaTeX con $...$ inline o $$...$$ en bloque",
    "- En economía Bolivia, usa Bs. (bolivianos) cuando aplique",
    "- Explicación BREVE (1-3 líneas) que enseñe el concepto, no solo dé la respuesta",
    "- Enunciados claros, sin ambigüedad, sin errores de redacción",
    "",
    "ANTI-ALUCINACIÓN:",
    "- NO inventes datos económicos específicos de Bolivia que no estén bien verificados",
    "- Si usas un dato (ej. PIB Bolivia), usa hechos generales que sean estables (concepto, no cifra exacta)",
    "- NO uses fechas posteriores a 2025",
    "- NO uses nombres de personas reales bolivianas en contextos sensibles",
    "",
    "Devuelve SOLO JSON válido, sin texto antes ni después, sin markdown ni triple backtick.",
  ].join("\n");
}

function promptUsuario(
  config: ConfigGeneracionIA,
  distribucion: Partial<Record<Area, number>>
): string {
  const dif = config.dificultad ?? "medio";
  const refuerzo = config.temas_reforzar?.length
    ? `\n\nPRIORIZA estos temas (el estudiante falló en ellos antes): ${config.temas_reforzar.join(", ")}.`
    : "";
  const evitar = config.temas_evitar?.length
    ? `\n\nEvita estos temas (ya los domina): ${config.temas_evitar.join(", ")}.`
    : "";

  const lineas: string[] = [
    `Genera ${config.cantidad} preguntas para el examen de ingreso UMSS Facultad de Ciencias Económicas.`,
    "",
    `Distribución por área:`,
  ];
  for (const [area, n] of Object.entries(distribucion)) {
    if (n && n > 0) lineas.push(`- ${area}: ${n} preguntas`);
  }
  lineas.push("");
  lineas.push(`Dificultad general: ${dif}.${refuerzo}${evitar}`);
  lineas.push("");
  lineas.push("Devuelve EXACTAMENTE este JSON (sin envoltura, sin markdown):");
  lineas.push("");
  lineas.push("{");
  lineas.push('  "preguntas": [');
  lineas.push("    {");
  lineas.push('      "area": "matematicas",');
  lineas.push('      "tema": "ecuaciones_lineales",');
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
  numero: number
): PreguntaBanco | null {
  if (!raw || typeof raw !== "object") return null;
  if (!raw.enunciado || !raw.respuesta_correcta || !raw.opciones) return null;
  if (!Array.isArray(raw.opciones) || raw.opciones.length !== 4) return null;

  const areaNorm = (raw.area ?? "general").toLowerCase().trim();
  const areaValida: Area =
    ["matematicas", "economicas", "verbal", "razonamiento", "general"].includes(
      areaNorm
    )
      ? (areaNorm as Area)
      : "general";

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

  let distribucion = config.areas;
  if (!distribucion || Object.keys(distribucion).length === 0) {
    distribucion = distribuirCantidad(cantidad, DISTRIBUCION_DEFAULT_ECONOMICAS);
  }

  const system = promptSistemaUMSSEconomia();
  const user = promptUsuario({ ...config, cantidad }, distribucion);

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
    const p = validarYNormalizar(raw, config.universidad, config.facultad, numero);
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

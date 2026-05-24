// Parsers para importar bancos de preguntas en distintos formatos.
// Soporta: JSON, Markdown (Axiom), CSV, GIFT (Moodle), Aiken, Texto plano.

import type { Area, Dificultad, PreguntaBanco, TipoPregunta } from "./types";
import { parseExamenMD } from "./banco-parser";

type PreguntaInput = Omit<PreguntaBanco, "id" | "numero">;

export type FormatoImport = "json" | "markdown" | "csv" | "gift" | "aiken" | "texto";

export interface DefaultsImport {
  universidad: string;
  facultad: string;
  anio: number;
  dificultad: Dificultad;
}

// ─────────────────────────────────────────────────────────────
// JSON — formato propio de Axiom
// ─────────────────────────────────────────────────────────────

export function parseJSON(texto: string, defaults: DefaultsImport): PreguntaInput[] {
  let data: unknown;
  try {
    data = JSON.parse(texto);
  } catch (e) {
    throw new Error(`JSON inválido: ${e instanceof Error ? e.message : "error"}`);
  }
  const arr = Array.isArray(data) ? data : [data];
  return arr.map((item, i) => normalizar(item as Record<string, unknown>, defaults, i));
}

// ─────────────────────────────────────────────────────────────
// MARKDOWN — formato Axiom (frontmatter YAML + ## Pregunta N)
// Reutiliza el parser existente del banco
// ─────────────────────────────────────────────────────────────

export function parseMarkdown(texto: string, _defaults: DefaultsImport): PreguntaInput[] {
  try {
    const examen = parseExamenMD(texto);
    return examen.preguntas.map((p) => ({
      universidad: p.universidad,
      facultad: p.facultad,
      anio: p.anio,
      area: p.area,
      tema: p.tema,
      dificultad: p.dificultad,
      enunciado: p.enunciado,
      opciones: p.opciones,
      respuesta_correcta: p.respuesta_correcta,
      explicacion: p.explicacion,
      tipo: "seleccion_simple" as TipoPregunta,
    }));
  } catch (e) {
    throw new Error(`Markdown inválido: ${e instanceof Error ? e.message : "error"}`);
  }
}

// ─────────────────────────────────────────────────────────────
// CSV — columnas: enunciado,A,B,C,D,respuesta,area,tema,dificultad,explicacion
// ─────────────────────────────────────────────────────────────

export function parseCSV(texto: string, defaults: DefaultsImport): PreguntaInput[] {
  const lineas = texto.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lineas.length < 2) throw new Error("CSV vacío o sin header");

  const header = parseCsvLine(lineas[0]).map((h) => h.trim().toLowerCase());
  const requeridos = ["enunciado", "a", "b", "c", "d", "respuesta"];
  const faltan = requeridos.filter((r) => !header.includes(r));
  if (faltan.length > 0) {
    throw new Error(`CSV: faltan columnas requeridas: ${faltan.join(", ")}`);
  }

  const out: PreguntaInput[] = [];
  for (let i = 1; i < lineas.length; i++) {
    const cols = parseCsvLine(lineas[i]);
    const get = (k: string) => cols[header.indexOf(k)] ?? "";
    if (!get("enunciado")) continue;
    out.push({
      universidad: defaults.universidad,
      facultad: defaults.facultad,
      anio: defaults.anio,
      area: normalizarArea(get("area") || "general"),
      tema: get("tema") || "general",
      dificultad: normalizarDificultad(get("dificultad") || defaults.dificultad),
      enunciado: get("enunciado"),
      opciones: [
        { letra: "A", texto: get("a") },
        { letra: "B", texto: get("b") },
        { letra: "C", texto: get("c") },
        { letra: "D", texto: get("d") },
      ],
      respuesta_correcta: get("respuesta").trim().toUpperCase(),
      explicacion: get("explicacion") || undefined,
      tipo: "seleccion_simple",
    });
  }
  return out;
}

function parseCsvLine(linea: string): string[] {
  // Parser CSV simple con soporte de comillas dobles
  const out: string[] = [];
  let actual = "";
  let dentroComillas = false;
  for (let i = 0; i < linea.length; i++) {
    const c = linea[i];
    if (c === '"') {
      if (dentroComillas && linea[i + 1] === '"') {
        actual += '"';
        i++;
      } else {
        dentroComillas = !dentroComillas;
      }
    } else if (c === "," && !dentroComillas) {
      out.push(actual);
      actual = "";
    } else {
      actual += c;
    }
  }
  out.push(actual);
  return out;
}

// ─────────────────────────────────────────────────────────────
// GIFT — formato Moodle
//   ::Titulo:: Enunciado {=correcta ~incorrecta ~incorrecta ~incorrecta}
// ─────────────────────────────────────────────────────────────

export function parseGIFT(texto: string, defaults: DefaultsImport): PreguntaInput[] {
  // Las preguntas en GIFT se separan por linea en blanco
  const bloques = texto
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter((b) => b && !b.startsWith("//"));

  const out: PreguntaInput[] = [];
  for (const bloque of bloques) {
    try {
      const sinTitulo = bloque.replace(/^::([^:]*)::\s*/, "");
      const matchOpciones = sinTitulo.match(/\{([^}]+)\}/);
      if (!matchOpciones) continue;

      const enunciado = sinTitulo.replace(/\{[^}]+\}[\s\S]*$/, "").trim();
      const cuerpoOpciones = matchOpciones[1];

      // V/F
      const lower = cuerpoOpciones.trim().toLowerCase();
      if (lower === "t" || lower === "true" || lower === "v" || lower === "verdadero") {
        out.push({
          universidad: defaults.universidad,
          facultad: defaults.facultad,
          anio: defaults.anio,
          area: "general",
          tema: "general",
          dificultad: defaults.dificultad,
          enunciado,
          opciones: [
            { letra: "A", texto: "Verdadero" },
            { letra: "B", texto: "Falso" },
          ],
          respuesta_correcta: "A",
          tipo: "verdadero_falso",
        });
        continue;
      }
      if (lower === "f" || lower === "false" || lower === "falso") {
        out.push({
          universidad: defaults.universidad,
          facultad: defaults.facultad,
          anio: defaults.anio,
          area: "general",
          tema: "general",
          dificultad: defaults.dificultad,
          enunciado,
          opciones: [
            { letra: "A", texto: "Verdadero" },
            { letra: "B", texto: "Falso" },
          ],
          respuesta_correcta: "B",
          tipo: "verdadero_falso",
        });
        continue;
      }

      // Multi-opcion: = correcta, ~ incorrecta
      const itemsRaw = cuerpoOpciones.split(/(?=[=~])/).map((s) => s.trim()).filter(Boolean);
      const opciones: { letra: string; texto: string }[] = [];
      let correcta = "";
      const letras = ["A", "B", "C", "D", "E", "F"];
      let idx = 0;
      for (const item of itemsRaw) {
        const esCorrecta = item.startsWith("=");
        const texto = item.replace(/^[=~]\s*/, "").replace(/#.*$/, "").trim();
        if (!texto) continue;
        const letra = letras[idx];
        opciones.push({ letra, texto });
        if (esCorrecta) correcta = letra;
        idx++;
      }
      if (opciones.length === 0 || !correcta) continue;

      out.push({
        universidad: defaults.universidad,
        facultad: defaults.facultad,
        anio: defaults.anio,
        area: "general",
        tema: "general",
        dificultad: defaults.dificultad,
        enunciado,
        opciones,
        respuesta_correcta: correcta,
        tipo: "seleccion_simple",
      });
    } catch {
      // ignorar bloque malformado
    }
  }
  return out;
}

// ─────────────────────────────────────────────────────────────
// AIKEN — formato Moodle simple
//   Enunciado
//   A) opcion
//   B) opcion
//   C) opcion
//   D) opcion
//   ANSWER: B
// ─────────────────────────────────────────────────────────────

export function parseAiken(texto: string, defaults: DefaultsImport): PreguntaInput[] {
  const bloques = texto.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);
  const out: PreguntaInput[] = [];

  for (const bloque of bloques) {
    const lineas = bloque.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    const matchAnswer = lineas.findIndex((l) => /^ANSWER\s*:/i.test(l));
    if (matchAnswer === -1) continue;
    const respuesta = lineas[matchAnswer].split(":")[1]?.trim().toUpperCase();
    if (!respuesta) continue;

    const opciones: { letra: string; texto: string }[] = [];
    const enunciadoLineas: string[] = [];
    for (let i = 0; i < matchAnswer; i++) {
      const m = lineas[i].match(/^([A-F])\)\s*(.+)$/);
      if (m) {
        opciones.push({ letra: m[1], texto: m[2] });
      } else {
        enunciadoLineas.push(lineas[i]);
      }
    }

    if (opciones.length === 0 || enunciadoLineas.length === 0) continue;
    out.push({
      universidad: defaults.universidad,
      facultad: defaults.facultad,
      anio: defaults.anio,
      area: "general",
      tema: "general",
      dificultad: defaults.dificultad,
      enunciado: enunciadoLineas.join(" "),
      opciones,
      respuesta_correcta: respuesta,
      tipo: "seleccion_simple",
    });
  }
  return out;
}

// ─────────────────────────────────────────────────────────────
// TEXTO PLANO — formato libre tolerante (Q: A) B) C) D) ✓ X)
//   Pregunta?
//   A) opcion uno
//   B) opcion dos *
//   C) opcion tres
//   D) opcion cuatro
//
//   La opcion correcta se marca con * o (correcta) al final.
// ─────────────────────────────────────────────────────────────

export function parseTextoPlano(texto: string, defaults: DefaultsImport): PreguntaInput[] {
  const bloques = texto.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);
  const out: PreguntaInput[] = [];

  for (const bloque of bloques) {
    const lineas = bloque.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    if (lineas.length < 3) continue;

    const opciones: { letra: string; texto: string }[] = [];
    let correcta = "";
    const enunciadoLineas: string[] = [];

    for (const linea of lineas) {
      const m = linea.match(/^([A-F])[\)\.\-:]\s*(.+)$/i);
      if (m) {
        const letra = m[1].toUpperCase();
        let texto = m[2].trim();
        const esCorrecta = /\s*[\*✓]\s*$|\(correcta\)\s*$|\(c\)\s*$/i.test(texto);
        if (esCorrecta) {
          texto = texto.replace(/\s*[\*✓]\s*$|\(correcta\)\s*$|\(c\)\s*$/i, "").trim();
          correcta = letra;
        }
        opciones.push({ letra, texto });
      } else {
        enunciadoLineas.push(linea);
      }
    }

    if (opciones.length === 0 || enunciadoLineas.length === 0) continue;
    if (!correcta) correcta = "A"; // fallback

    out.push({
      universidad: defaults.universidad,
      facultad: defaults.facultad,
      anio: defaults.anio,
      area: "general",
      tema: "general",
      dificultad: defaults.dificultad,
      enunciado: enunciadoLineas.join(" "),
      opciones,
      respuesta_correcta: correcta,
      tipo: "seleccion_simple",
    });
  }
  return out;
}

// ─────────────────────────────────────────────────────────────
// Dispatcher
// ─────────────────────────────────────────────────────────────

export function parsearImport(formato: FormatoImport, texto: string, defaults: DefaultsImport): PreguntaInput[] {
  switch (formato) {
    case "json": return parseJSON(texto, defaults);
    case "markdown": return parseMarkdown(texto, defaults);
    case "csv": return parseCSV(texto, defaults);
    case "gift": return parseGIFT(texto, defaults);
    case "aiken": return parseAiken(texto, defaults);
    case "texto": return parseTextoPlano(texto, defaults);
    default: throw new Error(`Formato no soportado: ${formato}`);
  }
}

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

function normalizar(item: Record<string, unknown>, defaults: DefaultsImport, idx: number): PreguntaInput {
  const opcionesRaw = (item.opciones as unknown[]) ?? [];
  const opciones = opcionesRaw.map((o, i) => {
    const oo = o as Record<string, string>;
    return {
      letra: oo.letra ?? String.fromCharCode(65 + i),
      texto: oo.texto ?? "",
    };
  });
  return {
    universidad: (item.universidad as string) ?? defaults.universidad,
    facultad: (item.facultad as string) ?? defaults.facultad,
    anio: (item.anio as number) ?? defaults.anio,
    area: normalizarArea((item.area as string) ?? "general"),
    tema: (item.tema as string) ?? "general",
    dificultad: normalizarDificultad((item.dificultad as string) ?? defaults.dificultad),
    enunciado: (item.enunciado as string) ?? `Pregunta ${idx + 1}`,
    opciones,
    respuesta_correcta: (item.respuesta_correcta as string) ?? "A",
    explicacion: (item.explicacion as string) ?? undefined,
    tipo: ((item.tipo as TipoPregunta) ?? "seleccion_simple") as TipoPregunta,
  };
}

function normalizarArea(s: string): Area {
  const a = s.toLowerCase().trim();
  const validas: Area[] = ["matematicas", "economicas", "verbal", "razonamiento", "general", "fisica", "quimica", "biologia", "civica", "historia"];
  return (validas.includes(a as Area) ? a : "general") as Area;
}

function normalizarDificultad(s: string): Dificultad {
  const d = s.toLowerCase().trim();
  if (d === "facil" || d === "fácil") return "facil";
  if (d === "dificil" || d === "difícil") return "dificil";
  return "medio";
}

// ─────────────────────────────────────────────────────────────
// PLANTILLAS PARA QUE EL USUARIO USE EN ChatGPT/Claude
// ─────────────────────────────────────────────────────────────

export function obtenerPlantilla(formato: FormatoImport): string {
  switch (formato) {
    case "json":
      return PLANTILLA_JSON;
    case "csv":
      return PLANTILLA_CSV;
    case "markdown":
      return PLANTILLA_MARKDOWN;
    case "gift":
      return PLANTILLA_GIFT;
    case "aiken":
      return PLANTILLA_AIKEN;
    case "texto":
      return PLANTILLA_TEXTO;
  }
}

const PLANTILLA_JSON = `[
  {
    "facultad": "ingenieria",
    "anio": 2024,
    "area": "matematicas",
    "tema": "derivadas",
    "dificultad": "medio",
    "tipo": "seleccion_simple",
    "enunciado": "Calcular la derivada de $f(x) = 3x^2 + 5x - 2$",
    "opciones": [
      { "letra": "A", "texto": "$6x + 5$" },
      { "letra": "B", "texto": "$3x + 5$" },
      { "letra": "C", "texto": "$6x^2 + 5$" },
      { "letra": "D", "texto": "$3x^2 + 5x$" }
    ],
    "respuesta_correcta": "A",
    "explicacion": "Aplicando la regla de la potencia: $f'(x) = 6x + 5$."
  }
]
`;

const PLANTILLA_CSV = `enunciado,A,B,C,D,respuesta,area,tema,dificultad,explicacion
"¿Cuál es 2+2?","3","4","5","6","B","matematicas","aritmetica","facil","2+2=4"
"Capital de Bolivia","La Paz","Sucre","Cochabamba","Santa Cruz","B","civica","geografia","facil","Sucre es la capital constitucional"
`;

const PLANTILLA_MARKDOWN = `---
universidad: UMSS
facultad: ingenieria
anio: 2025
duracion_minutos: 180
total_preguntas: 2
ponderacion:
  matematicas: 0.50
  fisica: 0.50
---

## Pregunta 1
area: matematicas
tema: algebra
dificultad: facil

Si $2x + 5 = 13$, el valor de $x$ es:

- A) $4$
- B) $5$
- C) $9$
- D) $-4$

**respuesta:** A
**explicacion:** $2x = 8 \\Rightarrow x = 4$.

---

## Pregunta 2
area: fisica
tema: cinematica
dificultad: medio

Un auto a 60 km/h recorre 120 km. ¿En cuánto tiempo?

- A) 1 hora
- B) 2 horas
- C) 3 horas
- D) 30 minutos

**respuesta:** B
**explicacion:** $t = d/v = 120/60 = 2$ horas.
`;

const PLANTILLA_GIFT = `// Comentario - se ignora
::Pregunta de matemáticas:: ¿Cuánto es 2+2? {
  =4 #Correcto
  ~3 #Incorrecto
  ~5 #Incorrecto
  ~6 #Incorrecto
}

::Verdadero o falso:: La Tierra es plana. {FALSE}

::Capital:: La capital de Bolivia es: {
  ~La Paz
  =Sucre
  ~Cochabamba
}
`;

const PLANTILLA_AIKEN = `¿Cuál es la capital de Bolivia?
A) La Paz
B) Sucre
C) Cochabamba
D) Santa Cruz
ANSWER: B

¿Cuánto es 2 elevado a la 8?
A) 128
B) 256
C) 64
D) 512
ANSWER: B
`;

const PLANTILLA_TEXTO = `¿Cuál es la fórmula del agua?
A) H2O *
B) CO2
C) O2
D) H2

¿En qué año Bolivia declaró su independencia?
A) 1809
B) 1825 (correcta)
C) 1879
D) 1952
`;

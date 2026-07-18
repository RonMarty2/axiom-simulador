import type {
  Area,
  Dificultad,
  ExamenBanco,
  OpcionPregunta,
  PreguntaBanco,
} from "./types";

interface PreguntaCruda {
  numero: number;
  area: Area;
  tema: string;
  dificultad: Dificultad;
  enunciado: string;
  opciones: OpcionPregunta[];
  respuesta_correcta: string;
  explicacion?: string;
  figura?: string;
}

interface FrontmatterCrudo {
  universidad: string;
  facultad: string;
  anio: number;
  fecha_examen?: string;
  duracion_minutos: number;
  total_preguntas: number;
  ponderacion: Record<string, number>;
  // Distingue exámenes del MISMO año: la UMSS toma varias convocatorias por
  // año (1ra opción, 2da opción, 3ra opción, versión A/B...). Sin esto, dos
  // archivos del mismo año colisionan en el mismo id y se pisan entre si.
  opcion?: string;      // ej: "1ra Opción", "2da Opción", "3ra Opción"
  titulo?: string;       // ej: "Examen de Ingreso 1-2023 (1ra Opción)" — display explicito, opcional
}

const FRONTMATTER_REGEX = /^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n([\s\S]*)$/;
const PREGUNTA_HEADER_REGEX = /^##\s+Pregunta\s+(\d+)\s*$/im;

export function parseExamenMD(contenido: string): ExamenBanco {
  const m = contenido.match(FRONTMATTER_REGEX);
  if (!m) {
    throw new Error("Archivo MD invalido: falta frontmatter '--- ... ---'");
  }
  const [, frontRaw, cuerpoRaw] = m;
  const front = parseFrontmatter(frontRaw);
  // Los archivos .md pueden traer un comentario HTML <!-- ... --> justo
  // despues del frontmatter (notas del curador, ej. "banco consolidado de
  // 4 facsimiles"). Si no se elimina antes de partir en preguntas, el bloque
  // "## Pregunta 1" queda pegado al comentario y el parseo de ESA pregunta
  // (y por lo tanto de TODO el archivo) falla silenciosamente: el examen
  // completo desaparece del listado sin ningun error visible al usuario.
  const cuerpo = cuerpoRaw.replace(/<!--[\s\S]*?-->/g, "");
  const preguntasCrudas = splitPreguntas(cuerpo).map(parsePreguntaBloque);

  const id = construirId(front.universidad, front.facultad, front.anio, front.opcion);

  const preguntas: PreguntaBanco[] = preguntasCrudas.map((p) => ({
    id: `${id}-${String(p.numero).padStart(3, "0")}`,
    universidad: front.universidad,
    facultad: front.facultad,
    anio: front.anio,
    numero: p.numero,
    area: p.area,
    tema: p.tema,
    dificultad: p.dificultad,
    enunciado: p.enunciado,
    opciones: p.opciones,
    respuesta_correcta: p.respuesta_correcta,
    explicacion: p.explicacion,
    figura: p.figura,
  }));

  return {
    id,
    universidad: front.universidad,
    facultad: front.facultad,
    anio: front.anio,
    fecha_examen: front.fecha_examen,
    duracion_minutos: front.duracion_minutos,
    total_preguntas: front.total_preguntas,
    ponderacion: front.ponderacion,
    opcion: front.opcion,
    titulo: front.titulo,
    preguntas,
  };
}

// Slug simple: minusculas, sin tildes, espacios -> guiones. Usado tanto para
// el id del examen como para partes derivadas de "opcion".
function slug(s: string): string {
  return s
    .normalize("NFD").replace(/[̀-ͯ]/g, "") // saca tildes
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function construirId(universidad: string, facultad: string, anio: number, opcion?: string): string {
  const base = [universidad, facultad, String(anio)].map(slug).join("-");
  // Si hay "opcion" (1ra/2da/3ra Opción, versión A/B...) se agrega al id para
  // que dos examenes del MISMO año no colisionen ni se pisen entre si.
  return opcion ? `${base}-${slug(opcion)}` : base;
}

function parseFrontmatter(raw: string): FrontmatterCrudo {
  const lineas = raw.split(/\r?\n/);
  const out: Record<string, unknown> = {};
  const ponderacion: Record<string, number> = {};
  let enPonderacion = false;

  for (const linea of lineas) {
    if (!linea.trim()) continue;
    const indent = linea.startsWith("  ");

    if (enPonderacion && indent) {
      const m = linea.trim().match(/^([\w_]+):\s*(.+)$/);
      if (m) ponderacion[m[1]] = parseFloat(m[2]);
      continue;
    }
    enPonderacion = false;

    const m = linea.match(/^([\w_]+):\s*(.*)$/);
    if (!m) continue;
    const [, key, val] = m;
    if (key === "ponderacion") {
      enPonderacion = true;
      continue;
    }
    out[key] = val.trim();
  }

  const universidad = String(out.universidad ?? "").trim();
  const facultad = String(out.facultad ?? "").trim().toLowerCase();
  const anio = parseInt(String(out.anio ?? "0"), 10);
  const duracion_minutos = parseInt(String(out.duracion_minutos ?? "0"), 10);
  const total_preguntas = parseInt(String(out.total_preguntas ?? "0"), 10);

  if (!universidad) throw new Error("Frontmatter: falta 'universidad'");
  if (!facultad) throw new Error("Frontmatter: falta 'facultad'");
  if (!anio) throw new Error("Frontmatter: falta 'anio'");

  return {
    universidad,
    facultad,
    anio,
    fecha_examen: out.fecha_examen ? String(out.fecha_examen) : undefined,
    duracion_minutos,
    total_preguntas,
    ponderacion,
    opcion: out.opcion ? String(out.opcion) : undefined,
    titulo: out.titulo ? String(out.titulo) : undefined,
  };
}

function splitPreguntas(cuerpo: string): string[] {
  const partes = cuerpo
    .split(/^---\s*$/m)
    .map((p) => p.trim())
    .filter((p) => p.length > 0 && PREGUNTA_HEADER_REGEX.test(p));
  return partes;
}

function parsePreguntaBloque(bloque: string): PreguntaCruda {
  const lineas = bloque.split(/\r?\n/);
  let i = 0;

  const headerMatch = lineas[i]?.match(PREGUNTA_HEADER_REGEX);
  if (!headerMatch) throw new Error("Bloque sin header '## Pregunta N'");
  const numero = parseInt(headerMatch[1], 10);
  i++;

  // Metadata: area, tema, dificultad (key: value lines hasta linea en blanco)
  const meta: Record<string, string> = {};
  while (i < lineas.length && lineas[i].trim() !== "") {
    const m = lineas[i].match(/^([\w_]+):\s*(.+)$/);
    if (m) meta[m[1]] = m[2].trim();
    i++;
  }
  while (i < lineas.length && lineas[i].trim() === "") i++;

  // Enunciado: hasta encontrar primera linea que empiece con "- " (opción)
  const enunciadoLineas: string[] = [];
  while (i < lineas.length && !/^-\s+[A-D]\)/.test(lineas[i].trim())) {
    enunciadoLineas.push(lineas[i]);
    i++;
  }
  const enunciado = enunciadoLineas.join("\n").trim();

  // Opciones: "- A) texto" (acepta A-E para soportar el formato real del
  // examen UMSS que incluye la opción E "Ninguno").
  const opciones: OpcionPregunta[] = [];
  while (i < lineas.length) {
    const m = lineas[i].match(/^-\s+([A-E])\)\s*(.+)$/);
    if (!m) break;
    opciones.push({ letra: m[1], texto: m[2].trim() });
    i++;
  }

  while (i < lineas.length && lineas[i].trim() === "") i++;

  // Respuesta y explicación
  let respuesta = "";
  let explicacion: string | undefined;
  while (i < lineas.length) {
    const linea = lineas[i].trim();
    const respM = linea.match(/^\*\*respuesta:\*\*\s*([A-E])/i);
    if (respM) {
      respuesta = respM[1].toUpperCase();
      i++;
      continue;
    }
    const explM = linea.match(/^\*\*explicacion:\*\*\s*(.*)$/i);
    if (explM) {
      const expl: string[] = [explM[1]];
      i++;
      while (i < lineas.length && lineas[i].trim() !== "") {
        expl.push(lineas[i]);
        i++;
      }
      explicacion = expl.join("\n").trim();
      continue;
    }
    i++;
  }

  if (!respuesta) {
    throw new Error(`Pregunta ${numero}: falta '**respuesta:** [A-E]'`);
  }
  if (opciones.length < 4 || opciones.length > 5) {
    throw new Error(
      `Pregunta ${numero}: debe tener 4 ó 5 opciones (A-E), tiene ${opciones.length}`
    );
  }

  return {
    numero,
    area: (meta.area ?? "general") as Area,
    tema: meta.tema ?? "general",
    dificultad: (meta.dificultad ?? "medio") as Dificultad,
    enunciado,
    opciones,
    respuesta_correcta: respuesta,
    explicacion,
    figura: meta.figura,
  };
}

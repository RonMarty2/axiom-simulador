import { opcionesDeCombinacion } from "./combinacion.ts";
import type {
  Area,
  Dificultad,
  ExamenBanco,
  MotivoFaltante,
  OpcionPregunta,
  PreguntaBanco,
  PreguntaFaltante,
} from "./types";

interface PreguntaCruda {
  numero: number;
  area: Area;
  tema: string;
  dificultad: Dificultad;
  enunciado: string;
  afirmaciones?: string[];
  opciones: OpcionPregunta[];
  respuesta_correcta: string;
  explicacion?: string;
  figura?: string;
  figura_svg?: string;
  figura_descripcion?: string;
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
  categoria?: string;    // "admision" (default) | "parcial_curso" — separa Examenes de Admision de Parciales/Finales de Curso Propedeutico
  secciones_pendientes?: Record<string, string>;   // { area: motivo } — secciones del examen que todavia no se transcribieron
  faltantes?: PreguntaFaltante[];                  // preguntas que el examen tomo y no se pudieron transcribir
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

  const id = construirId(front.universidad, front.facultad, front.anio, front.opcion, front.titulo);

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
    afirmaciones: p.afirmaciones,
    opciones: p.opciones,
    respuesta_correcta: p.respuesta_correcta,
    explicacion: p.explicacion,
    figura: p.figura,
    figura_svg: p.figura_svg,
    figura_descripcion: p.figura_descripcion,
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
    secciones_pendientes: front.secciones_pendientes,
    faltantes: front.faltantes,
    opcion: front.opcion,
    titulo: front.titulo,
    categoria: front.categoria ?? "admision",
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

function construirId(universidad: string, facultad: string, anio: number, opcion?: string, titulo?: string): string {
  const base = [universidad, facultad, String(anio)].map(slug).join("-");
  // "anio" + "opcion" NO alcanza para distinguir examenes: la UMSS toma
  // varias convocatorias por año calendario (ej. "Examen de Ingreso 1-2005"
  // y "Examen de Ingreso 2-2005" son AMBOS "1ra Opción" del mismo anio:2005;
  // los 8 Parciales de Curso Propedeutico 2006 ni siquiera tienen "opcion").
  // "titulo" es el unico campo que en la practica es unico por archivo (lo
  // arma quien carga el examen incluyendo convocatoria/parcial/gestion), asi
  // que se prioriza sobre "opcion" para el sufijo del id y evitar que dos
  // archivos del mismo (universidad, facultad, anio) se pisen con el mismo id.
  const sufijo = titulo ?? opcion;
  return sufijo ? `${base}-${slug(sufijo)}` : base;
}

const MOTIVOS_FALTANTE = new Set<string>([
  "ilegible", "pagina-ausente", "sin-opciones", "sin-respuesta",
]);

function sinComillas(v: string): string {
  return v.trim().replace(/^["'](.*)["']$/, "$1").trim();
}

function asignarFaltante(f: Partial<PreguntaFaltante>, clave: string, valor: string): void {
  const v = sinComillas(valor);
  if (clave === "numero") f.numero = parseInt(v, 10);
  else if (clave === "motivo") f.motivo = v as MotivoFaltante;
  else if (clave === "fuente") f.fuente = v;
  else if (clave === "detalle") f.detalle = v;
}

// Se valida fuerte a propósito. Un `faltantes` mal escrito es peor que no
// tenerlo: el examen diría que le falta una pregunta que en realidad está, o
// al revés. Y como el loader se come los errores del parser con un
// console.error, un dato silenciosamente malo no lo ve nadie.
function validarFaltantes(crudos: Partial<PreguntaFaltante>[]): PreguntaFaltante[] | undefined {
  if (!crudos.length) return undefined;
  const vistos = new Set<number>();
  return crudos.map((f) => {
    if (!Number.isInteger(f.numero) || (f.numero ?? 0) < 1) {
      throw new Error(`Frontmatter 'faltantes': 'numero' tiene que ser un entero >= 1 (vino "${f.numero}")`);
    }
    if (vistos.has(f.numero!)) {
      throw new Error(`Frontmatter 'faltantes': la pregunta ${f.numero} está declarada dos veces`);
    }
    vistos.add(f.numero!);
    if (!f.motivo || !MOTIVOS_FALTANTE.has(f.motivo)) {
      throw new Error(
        `Frontmatter 'faltantes' (pregunta ${f.numero}): 'motivo' tiene que ser uno de ` +
        `${[...MOTIVOS_FALTANTE].join(", ")} (vino "${f.motivo ?? ""}")`,
      );
    }
    if (!f.fuente) {
      throw new Error(`Frontmatter 'faltantes' (pregunta ${f.numero}): falta 'fuente' con archivo y página`);
    }
    return { numero: f.numero!, motivo: f.motivo, fuente: f.fuente, detalle: f.detalle };
  }).sort((a, b) => a.numero - b.numero);
}

function parseFrontmatter(raw: string): FrontmatterCrudo {
  const lineas = raw.split(/\r?\n/);
  const out: Record<string, unknown> = {};
  const ponderacion: Record<string, number> = {};
  const secciones_pendientes: Record<string, string> = {};
  const faltantes: Partial<PreguntaFaltante>[] = [];
  // Cuál de los dos mapas anidados se está leyendo, o null si ninguno.
  let mapaActual: "ponderacion" | "secciones_pendientes" | null = null;
  // `faltantes` no es un mapa sino una lista de objetos, así que va aparte:
  // cada "- numero: N" abre una entrada y las líneas indentadas que siguen le
  // agregan campos.
  let enFaltantes = false;

  for (const linea of lineas) {
    if (!linea.trim()) continue;
    const indent = linea.startsWith("  ");

    if (enFaltantes && indent) {
      const t = linea.trim();
      const abre = t.match(/^-\s*([\w_]+):\s*(.*)$/);
      if (abre) {
        faltantes.push({});
        asignarFaltante(faltantes[faltantes.length - 1], abre[1], abre[2]);
        continue;
      }
      const campo = t.match(/^([\w_]+):\s*(.*)$/);
      if (campo && faltantes.length) {
        asignarFaltante(faltantes[faltantes.length - 1], campo[1], campo[2]);
      }
      continue;
    }
    enFaltantes = false;

    if (mapaActual && indent) {
      const m = linea.trim().match(/^([\w_]+):\s*(.+)$/);
      if (m) {
        if (mapaActual === "ponderacion") ponderacion[m[1]] = parseFloat(m[2]);
        else secciones_pendientes[m[1]] = m[2].trim();
      }
      continue;
    }
    mapaActual = null;

    const m = linea.match(/^([\w_]+):\s*(.*)$/);
    if (!m) continue;
    const [, key, val] = m;
    if (key === "ponderacion" || key === "secciones_pendientes") {
      mapaActual = key;
      continue;
    }
    if (key === "faltantes") {
      enFaltantes = true;
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
    secciones_pendientes,
    faltantes: validarFaltantes(faltantes),
    opcion: out.opcion ? String(out.opcion) : undefined,
    titulo: out.titulo ? String(out.titulo) : undefined,
    categoria: out.categoria ? String(out.categoria) : undefined,
  };
}

function splitPreguntas(cuerpo: string): string[] {
  const partes = cuerpo
    .split(/^---\s*$/m)
    .map((p) => p.trim())
    .filter((p) => p.length > 0 && PREGUNTA_HEADER_REGEX.test(p));
  return partes;
}

function parsePreguntaBloque(bloqueOriginal: string): PreguntaCruda {
  // 1. Extraer el dibujo en código SVG (bloque ```svg ... ``` o un <svg>
  //    suelto), si la pregunta lo trae — es la vía AUTOMÁTICA: otra IA
  //    genera el examen CON sus figuras y acá se separan del texto.
  let figuraSvg: string | undefined;
  let bloque = bloqueOriginal.replace(/```svg\s*\r?\n([\s\S]*?)```/i, (_m, codigo: string) => {
    figuraSvg = codigo.trim();
    return "";
  });
  if (!figuraSvg) {
    bloque = bloque.replace(/<svg[\s\S]*?<\/svg>/i, (m) => {
      figuraSvg = m.trim();
      return "";
    });
  }

  // 2. Extraer la descripción "FIGURA: ..." (para curaduría; el alumno no
  //    la ve — sin esto quedaría pegada dentro del enunciado).
  let figuraDescripcion: string | undefined;
  bloque = bloque.replace(/^\[?FIGURA:\s*([\s\S]*?)\]?\s*(?=\r?\n\s*\r?\n|\r?\n-\s+A\))/m, (_m, desc: string) => {
    figuraDescripcion = desc.trim();
    return "";
  });

  const lineas = bloque.split(/\r?\n/);
  let i = 0;

  const headerMatch = lineas[i]?.match(PREGUNTA_HEADER_REGEX);
  if (!headerMatch) throw new Error("Bloque sin header '## Pregunta N'");
  const numero = parseInt(headerMatch[1], 10);
  i++;

  // Metadata: area, tema, dificultad (key: value hasta linea en blanco).
  // El bloque tambien corta en la primera linea que NO sea `clave: valor`.
  // Sin ese segundo corte, un archivo al que le falta la linea en blanco entre
  // el encabezado y el enunciado pierde el enunciado ENTERO en silencio: la
  // linea no matchea, se descarta, y el alumno ve las opciones sin pregunta.
  // Paso en 14 preguntas y ningun test lo veia (bitacora, 17-sep).
  const meta: Record<string, string> = {};
  while (i < lineas.length && lineas[i].trim() !== "") {
    const m = lineas[i].match(/^([\w_]+):\s*(.+)$/);
    if (!m) break;
    meta[m[1]] = m[2].trim();
    i++;
  }
  while (i < lineas.length && lineas[i].trim() === "") i++;

  // Enunciado: hasta encontrar primera linea que empiece con "- " (opción
  // "- A)" o, en las preguntas de clave de combinación, afirmación "- 1)").
  const enunciadoLineas: string[] = [];
  while (i < lineas.length && !/^-\s+([A-D]|[1-3])\)/.test(lineas[i].trim())) {
    enunciadoLineas.push(lineas[i]);
    i++;
  }
  const enunciado = enunciadoLineas.join("\n").trim();

  // Afirmaciones (Medicina): "- 1) texto", numeradas en orden desde 1. De ahí
  // salen las opciones por la clave de combinación, y escribir además "- A)" a
  // mano sería declarar la misma pregunta dos veces: se rechaza.
  const afirmaciones: string[] = [];
  while (i < lineas.length) {
    const m = lineas[i].match(/^-\s+([1-3])\)\s*(.+)$/);
    if (!m) break;
    if (Number(m[1]) !== afirmaciones.length + 1) {
      throw new Error(`Pregunta ${numero}: las afirmaciones van en orden, vino "- ${m[1]})" después de ${afirmaciones.length}`);
    }
    afirmaciones.push(m[2].trim());
    i++;
  }

  // Opciones: "- A) texto" (acepta A-E para soportar el formato real del
  // examen UMSS que incluye la opción E "Ninguno").
  let opciones: OpcionPregunta[] = [];
  if (afirmaciones.length) {
    if (afirmaciones.length < 2) {
      throw new Error(`Pregunta ${numero}: una pregunta de combinación lleva 2 o 3 afirmaciones, tiene ${afirmaciones.length}`);
    }
    let k = i;
    while (k < lineas.length && lineas[k].trim() === "") k++;
    if (/^-\s+[A-E]\)/.test((lineas[k] ?? "").trim())) {
      throw new Error(`Pregunta ${numero}: tiene afirmaciones "- 1)" Y opciones "- A)"; las opciones salen de la clave de combinación, no se escriben`);
    }
    opciones = opcionesDeCombinacion(afirmaciones.length);
  } else {
    while (i < lineas.length) {
      const m = lineas[i].match(/^-\s+([A-E])\)\s*(.+)$/);
      if (!m) break;
      opciones.push({ letra: m[1], texto: m[2].trim() });
      i++;
    }
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
  if (!afirmaciones.length && (opciones.length < 4 || opciones.length > 5)) {
    throw new Error(
      `Pregunta ${numero}: debe tener 4 ó 5 opciones (A-E), tiene ${opciones.length}`
    );
  }

  if (afirmaciones.length && !opciones.some((o) => o.letra === respuesta)) {
    throw new Error(
      `Pregunta ${numero}: la respuesta "${respuesta}" no existe en la clave de ${afirmaciones.length} afirmaciones ` +
      `(letras válidas: ${opciones.map((o) => o.letra).join(", ")})`,
    );
  }

  return {
    numero,
    area: (meta.area ?? "general") as Area,
    tema: meta.tema ?? "general",
    dificultad: (meta.dificultad ?? "medio") as Dificultad,
    enunciado,
    afirmaciones: afirmaciones.length ? afirmaciones : undefined,
    opciones,
    respuesta_correcta: respuesta,
    explicacion,
    figura: meta.figura,
    figura_svg: figuraSvg,
    figura_descripcion: figuraDescripcion,
  };
}

// Genera docs/registro-examenes.md: una fila por examen del banco, sacada de los
// propios archivos y de git (nada de memoria). Se corre con:
//   node scripts/registro-examenes.mjs
// El nivel de verificación NO se puede deducir: lo pone un humano o un agente en
// data/registro-verificacion.json (ver el encabezado del informe generado).
import { readFileSync, readdirSync, writeFileSync, existsSync } from "node:fs";
import { execSync } from "node:child_process";
import { join } from "node:path";

const RAIZ = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const BANCO = join(RAIZ, "data/examenes/umss");
const VERIF = join(RAIZ, "data/registro-verificacion.json");
const verif = existsSync(VERIF) ? JSON.parse(readFileSync(VERIF, "utf8")) : {};

// Fechas de git: primera vez que entra el archivo y último cambio.
const fechas = {};
try {
  const log = execSync(
    'git log --format=%x00%as --name-only -- data/examenes/umss',
    { cwd: RAIZ, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 },
  );
  for (const bloque of log.split("\0").slice(1)) {
    const [fecha, ...archivos] = bloque.split("\n").filter(Boolean);
    for (const a of archivos) {
      const f = (fechas[a] ??= { alta: fecha, ultimo: fecha });
      if (fecha < f.alta) f.alta = fecha;
      if (fecha > f.ultimo) f.ultimo = fecha;
    }
  }
} catch {
  console.warn("Sin git: las fechas de carga quedan vacías.");
}

function frontmatter(txt) {
  const m = txt.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const fm = {};
  if (!m) return fm;
  for (const l of m[1].split(/\r?\n/)) {
    const k = l.match(/^([a-z_]+):\s*(.*)$/);
    if (k) fm[k[1]] = k[2].trim();
  }
  m[1].includes("secciones_pendientes:") && (fm._pendientes = true);
  m[1].includes("faltantes:") && (fm._faltantes = true);
  return fm;
}

const filas = [];
for (const fac of readdirSync(BANCO)) {
  for (const arch of readdirSync(join(BANCO, fac)).filter((a) => a.endsWith(".md"))) {
    const txt = readFileSync(join(BANCO, fac, arch), "utf8");
    const fm = frontmatter(txt);
    const id = `${fac}/${arch.replace(/\.md$/, "")}`;
    const preguntas = (txt.match(/^## Pregunta \d+/gm) ?? []).length;
    const claveE = (txt.match(/^\*\*respuesta:\*\*\s*E\b/gm) ?? []).length;
    const figuras = (txt.match(/^figura:\s*\S+/gm) ?? []).length;
    const fuente = (txt.match(/FUENTE\s*[·:\-]\s*"?([^"\n]+)/) ?? [])[1]?.trim() ?? "";
    const g = fechas[`data/examenes/umss/${fac}/${arch}`] ?? {};
    filas.push({
      fac, id, titulo: (fm.titulo ?? arch).replace(/\|/g, "/"),
      fecha: fm.fecha_examen ?? "", declaradas: Number(fm.total_preguntas ?? 0), preguntas,
      pendiente: fm._pendientes || fm._faltantes ? "sí" : "",
      claveE, figuras, fuente: fuente.slice(0, 60), alta: g.alta ?? "", ultimo: g.ultimo ?? "",
      v: verif[id] ?? null,
    });
  }
}

const NIVELES = {
  "ninguna": "Transcrito, respuestas resueltas por el transcriptor, nada más.",
  "resuelto-a-ciegas": "Un segundo agente resolvió todo sin ver la clave y coincidió.",
  "contra-facsimil": "Contrastado pregunta por pregunta contra el PDF/foto original.",
  "contra-resolucion-externa": "Contrastado además contra una resolución de instituto (no es clave oficial).",
  "clave-oficial": "Contrastado contra una clave oficial de la facultad.",
};

let out = `# Registro de exámenes del banco

> **Generado** por \`node scripts/registro-examenes.mjs\` el ${new Date().toISOString().slice(0, 10)}. No se edita a mano.
> Lo que sale de los archivos y de git (preguntas, pendientes, fechas de carga) es automático.
> El **nivel de verificación** sale de \`data/registro-verificacion.json\` (se edita a mano o lo escribe un agente
> al terminar una auditoría). Si un examen no está ahí, figura como **sin registrar**: no se asume que esté verificado.

**Niveles de verificación:**
${Object.entries(NIVELES).map(([k, v]) => `- \`${k}\`: ${v}`).join("\n")}

**Columnas:** *Decl.* = preguntas que declara el frontmatter, *Reales* = \`## Pregunta\` encontradas (si no coinciden, hay \`faltantes\` o un error),
*E* = respuestas "Ninguno", *Fig.* = preguntas con figura, *Pend.* = tiene \`faltantes\` o \`secciones_pendientes\`,
*Alta* = fecha del primer commit del archivo, *Últ.* = último cambio.

`;

for (const fac of [...new Set(filas.map((f) => f.fac))].sort()) {
  const fs = filas.filter((f) => f.fac === fac).sort((a, b) => a.id.localeCompare(b.id));
  const sinReg = fs.filter((f) => !f.v).length;
  const desc = fs.filter((f) => f.declaradas !== f.preguntas).length;
  out += `## ${fac} (${fs.length} exámenes, ${fs.reduce((s, f) => s + f.preguntas, 0)} preguntas)\n\n`;
  out += `Sin registro de verificación: **${sinReg}** de ${fs.length}. Con conteo que no cuadra: **${desc}**.\n\n`;
  out += "| Examen | Fecha | Decl. | Reales | E | Fig. | Pend. | Alta | Últ. | Verificación |\n|---|---|--:|--:|--:|--:|:-:|---|---|---|\n";
  for (const f of fs) {
    const v = f.v ? `${f.v.nivel} (${f.v.fecha ?? "?"})` : "sin registrar";
    out += `| ${f.titulo} <br><sub>${f.id}</sub> | ${f.fecha} | ${f.declaradas} | ${f.preguntas}${f.declaradas !== f.preguntas ? " ⚠" : ""} | ${f.claveE} | ${f.figuras} | ${f.pendiente} | ${f.alta} | ${f.ultimo} | ${v} |\n`;
  }
  out += "\n";
}

writeFileSync(join(RAIZ, "docs/registro-examenes.md"), out);
const tot = filas.length, sr = filas.filter((f) => !f.v).length;
console.log(`Registro: ${tot} exámenes, ${sr} sin registro de verificación -> docs/registro-examenes.md`);

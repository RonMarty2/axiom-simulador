/**
 * Fase 0 — Inventario automático del banco Ingeniería UMSS.
 * Genera:
 *   data/research/umss/auditoria-ingenieria.md
 *   data/research/umss/auditoria-ingenieria.json
 *
 * No juzga calidad visual humana; solo estructura + deudas detectables.
 */
import fs from "fs";
import path from "path";

const MD_DIR = path.join("data", "examenes", "umss", "ingenieria");
const PDF_DIR = "examenes pasados";
const MOTOR = path.join("src", "lib", "figuras", "definiciones.ts");
const OUT_MD = path.join("data", "research", "umss", "auditoria-ingenieria.md");
const OUT_JSON = path.join("data", "research", "umss", "auditoria-ingenieria.json");

const motorSrc = fs.readFileSync(MOTOR, "utf8");
const definedFigs = new Set();
const mCtor = motorSrc.match(/const CONSTRUCTORES[\s\S]*?=\s*\{([\s\S]*?)\};/);
if (mCtor) {
  for (const mm of mCtor[1].matchAll(/["']([^"']+)["']\s*:/g)) definedFigs.add(mm[1]);
}

const pdfs = fs.readdirSync(PDF_DIR).filter((f) => f.toLowerCase().endsWith(".pdf")).sort();
const mds = fs.readdirSync(MD_DIR).filter((f) => f.endsWith(".md")).sort();

const MENCION_FIG =
  /figura adjunta|en la figura|mostrad[oa]s? en la figura|seg[uú]n la figura|ver figura|diagrama|como se muestra en|se muestra en la|adjunt[oa]/i;
const PASO = /Paso\s+\d+/i;
const PROVISORIO =
  /provisorio|pendiente.*figura|sin la figura|VERIFICAR|ambig[uü]edad genuina/i;

function parseFront(raw) {
  const out = {};
  for (const line of raw.split(/\r?\n/)) {
    const m = line.match(/^([a-zA-Z_]+):\s*(.*)$/);
    if (!m) continue;
    let v = m[2].trim();
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1);
    }
    out[m[1]] = v;
  }
  return out;
}

function parseExam(file) {
  const full = path.join(MD_DIR, file);
  const c = fs.readFileSync(full, "utf8");
  const fm = c.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n([\s\S]*)$/);
  if (!fm) return { file, error: "sin frontmatter" };
  const front = parseFront(fm[1]);
  const cuerpo = fm[2].replace(/<!--[\s\S]*?-->/g, "");
  const bloques = cuerpo
    .split(/(?=^##\s+Pregunta\s+\d+)/m)
    .filter((b) => /^##\s+Pregunta\s+\d+/m.test(b));

  const preguntas = [];
  const nums = [];
  for (const b of bloques) {
    const nm = b.match(/^##\s+Pregunta\s+(\d+)/m);
    const num = nm ? parseInt(nm[1], 10) : 0;
    nums.push(num);
    const figM = b.match(/^figura:\s*(\S+)/m);
    const fig = figM ? figM[1] : null;
    const svgM = b.match(/^figura_svg:/m);
    const respM = b.match(/\*\*respuesta:\*\*\s*([A-E])/i);
    const expM = b.match(/\*\*explicacion:\*\*[\s\S]*/i);
    const exp = expM ? expM[0] : "";
    const opciones = [...b.matchAll(/^-\s+([A-E])\)/gm)].map((x) => x[1]);
    const enunciado = b.split(/^-\s+[A-E]\)/m)[0] || b;
    const mencionaFig = MENCION_FIG.test(enunciado) || MENCION_FIG.test(b.slice(0, 800));
    preguntas.push({
      num,
      figura: fig,
      tieneSvg: !!svgM,
      respuesta: respM ? respM[1].toUpperCase() : null,
      opciones,
      conPasos: PASO.test(exp),
      mencionaFig,
      provisorio: PROVISORIO.test(exp) || PROVISORIO.test(b),
      respSinOpcion: respM ? !opciones.includes(respM[1].toUpperCase()) : true,
    });
  }

  const huecos = [];
  if (nums.length) {
    const max = Math.max(...nums);
    for (let i = 1; i <= max; i++) if (!nums.includes(i)) huecos.push(i);
  }
  const dups = [...new Set(nums.filter((n, i) => nums.indexOf(n) !== i))];
  const totalFm = parseInt(front.total_preguntas || "0", 10);
  const cat = front.categoria || "admision";
  const conFig = preguntas.filter((p) => p.figura);
  const mencSinFig = preguntas.filter((p) => p.mencionaFig && !p.figura);
  const sinPasos = preguntas.filter((p) => !p.conPasos);
  const figsHuerfanas = conFig.filter((p) => p.figura && !definedFigs.has(p.figura));
  const figsOk = conFig.filter((p) => p.figura && definedFigs.has(p.figura));
  const provis = preguntas.filter((p) => p.provisorio);
  const badResp = preguntas.filter((p) => p.respSinOpcion);

  return {
    file,
    front,
    cat,
    anio: parseInt(front.anio || "0", 10),
    opcion: front.opcion || "",
    titulo: front.titulo || "",
    nPreg: preguntas.length,
    totalFm,
    mismatchTotal: totalFm && totalFm !== preguntas.length,
    huecos,
    dups,
    conFig: conFig.length,
    figsOk: figsOk.length,
    figsHuerfanas: figsHuerfanas.map((p) => ({ n: p.num, id: p.figura })),
    mencSinFig: mencSinFig.map((p) => p.num),
    sinPasos: sinPasos.map((p) => p.num),
    nSinPasos: sinPasos.length,
    provis: provis.map((p) => p.num),
    badResp: badResp.map((p) => p.num),
    preguntas,
  };
}

function risk(e) {
  return (
    e.figsHuerfanas.length * 3 +
    e.mencSinFig.length * 2 +
    e.provis.length * 2 +
    e.badResp.length * 5 +
    (e.huecos.length ? 3 : 0) +
    (e.mismatchTotal ? 2 : 0) +
    Math.min(e.nSinPasos, 5)
  );
}

const parsed = mds.map(parseExam);
const exams = parsed.filter((e) => !e.error);
const errors = parsed.filter((e) => e.error);

let totalQ = 0,
  totalFigRef = 0,
  totalFigOk = 0,
  totalFigH = 0,
  totalMenc = 0,
  totalSinPaso = 0,
  totalProv = 0,
  totalBad = 0;
const allHuerf = new Map();

for (const e of exams) {
  totalQ += e.nPreg;
  totalFigRef += e.conFig;
  totalFigOk += e.figsOk;
  totalFigH += e.figsHuerfanas.length;
  totalMenc += e.mencSinFig.length;
  totalSinPaso += e.nSinPasos;
  totalProv += e.provis.length;
  totalBad += e.badResp.length;
  for (const h of e.figsHuerfanas) {
    if (!allHuerf.has(h.id)) allHuerf.set(h.id, []);
    allHuerf.get(h.id).push(`${e.file}#P${h.n}`);
  }
}

exams.sort((a, b) => {
  if (a.cat !== b.cat) return a.cat === "admision" ? -1 : 1;
  if (b.anio !== a.anio) return b.anio - a.anio;
  return a.file.localeCompare(b.file);
});

const definedList = [...definedFigs].sort();
const usedFigIds = new Set();
for (const e of exams) {
  for (const p of e.preguntas) if (p.figura) usedFigIds.add(p.figura);
}

const lines = [];
lines.push("# Auditoría banco Ingeniería UMSS");
lines.push("");
lines.push(
  "> Generado automáticamente — Fase 0 inventario. **No incluye juicio visual humano** (ángulos, proporciones, legibilidad). Eso se llena en la columna `visual_humano` por lote."
);
lines.push("");
lines.push("**Fecha inventario:** 2026-07-29");
lines.push(
  "**Alcance:** 126 exámenes (ingreso + parciales/finales). Modo: auditar y anotar; fix después."
);
lines.push(
  "**Prioridad de fix (cuando toque):** figuras/bloqueantes visuales → pasos → contenido."
);
lines.push("");
lines.push("---");
lines.push("");
lines.push("## 1. Resumen global");
lines.push("");
lines.push("| Métrica | Valor |");
lines.push("|---------|------:|");
lines.push(`| Archivos MD | ${exams.length} |`);
lines.push(`| PDFs en \`examenes pasados/\` | ${pdfs.length} |`);
lines.push(`| Preguntas totales | ${totalQ} |`);
lines.push(`| Con campo \`figura:\` | ${totalFigRef} |`);
lines.push(`| Figuras con motor OK | ${totalFigOk} |`);
lines.push(`| Figuras huérfanas (ID sin motor) | ${totalFigH} |`);
lines.push(`| Mencionan figura sin campo | ${totalMenc} |`);
lines.push(`| Sin \`Paso N\` en explicación | ${totalSinPaso} |`);
lines.push(`| Marcadores provisorio/ambiguo | ${totalProv} |`);
lines.push(`| Respuesta sin opción matching | ${totalBad} |`);
lines.push(`| Figuras definidas en motor | ${definedList.length} |`);
lines.push("");
lines.push("### Figuras en motor");
lines.push("");
for (const id of definedList) {
  lines.push(
    `- \`${id}\`${usedFigIds.has(id) ? "" : " _(definida, no referenciada en MD)_"}`
  );
}
lines.push("");
lines.push("### Figuras referenciadas sin motor (huérfanas)");
lines.push("");
if (allHuerf.size === 0) {
  lines.push("_Ninguna_");
} else {
  lines.push("| ID figura | Usos |");
  lines.push("|-----------|------|");
  for (const [id, usos] of [...allHuerf.entries()].sort(
    (a, b) => b[1].length - a[1].length
  )) {
    const preview = usos.slice(0, 5).join(", ") + (usos.length > 5 ? "…" : "");
    lines.push(`| \`${id}\` | ${usos.length} · ${preview} |`);
  }
}
lines.push("");
lines.push("### PDFs en carpeta (inventario crudo)");
lines.push("");
lines.push(
  `Hay **${pdfs.length}** PDFs y **${exams.length}** MD. El mapeo 1:1 no es trivial (nombres viejos \`050_...\` vs slugs \`2005-1op-1-2005.md\`). En auditoría humana se cruza por año/opción/tipo.`
);
lines.push("");
lines.push("<details><summary>Lista completa de PDFs</summary>");
lines.push("");
for (const p of pdfs) lines.push(`- \`${p}\``);
lines.push("");
lines.push("</details>");
lines.push("");
lines.push("---");
lines.push("");
lines.push("## 2. Leyenda semáforo (humano)");
lines.push("");
lines.push("| Código | Significado |");
lines.push("|--------|-------------|");
lines.push("| `OK` | Fiel al PDF, pasos claros, figura bien o no hace falta |");
lines.push("| `OK-TEXTO` | Contenido bien; figura ausente o pobre pero usable |");
lines.push("| `FIX-FIGURA` | Dibujo mal/faltante/ID sin motor |");
lines.push("| `FIX-PASOS` | Explicación sin desglose o confusa en UI |");
lines.push("| `FIX-CONTENIDO` | Enunciado/opción/respuesta dudosa vs PDF |");
lines.push("| `BLOQUEANTE` | Respuesta mal o figura engañosa |");
lines.push("| `PENDIENTE` | Aún no auditado a ojo |");
lines.push("");
lines.push(
  "Columnas automáticas ya llenas; columnas `visual_humano` y `notas` se completan en lotes."
);
lines.push("");
lines.push("---");
lines.push("");
lines.push("## 3. Planilla por examen");
lines.push("");
lines.push(
  "Orden: admisión por año descendente, luego parciales. `riesgo_auto` = score heurístico (figuras huérfanas, menciones sin figura, provisorios, errores de respuesta)."
);
lines.push("");
lines.push(
  "| # | archivo | cat | año | título / opción | #preg | ≠total | huecos | fig OK | fig huérf | menc.sin.fig | sin pasos | provis | bad resp | riesgo_auto | visual_humano | notas |"
);
lines.push(
  "|--:|---------|-----|----:|-----------------|------:|:------:|--------|-------:|---------:|-------------:|----------:|-------:|---------:|------------:|:-------------:|-------|"
);

exams.forEach((e, i) => {
  const tit = (e.titulo || e.opcion || e.file).replace(/\|/g, "/");
  const hue = e.huecos.length ? e.huecos.join(",") : "—";
  const fh = e.figsHuerfanas.length
    ? e.figsHuerfanas.map((x) => `P${x.n}:${x.id}`).join("; ")
    : "—";
  const ms = e.mencSinFig.length ? e.mencSinFig.map((n) => `P${n}`).join(",") : "—";
  const sp = e.nSinPasos
    ? `${e.nSinPasos}${e.nSinPasos <= 8 ? ` (${e.sinPasos.map((n) => `P${n}`).join(",")})` : ""}`
    : "0";
  const pr = e.provis.length ? e.provis.map((n) => `P${n}`).join(",") : "—";
  const br = e.badResp.length ? e.badResp.map((n) => `P${n}`).join(",") : "—";
  const mis = e.mismatchTotal ? `⚠ ${e.totalFm}≠${e.nPreg}` : "ok";
  const figHCol =
    (e.figsHuerfanas.length || 0) +
    (e.figsHuerfanas.length ? ` (${fh})` : "");
  const mencCol =
    (e.mencSinFig.length || 0) + (e.mencSinFig.length ? ` (${ms})` : "");
  lines.push(
    `| ${i + 1} | \`${e.file}\` | ${e.cat} | ${e.anio} | ${tit} | ${e.nPreg} | ${mis} | ${hue} | ${e.figsOk} | ${figHCol} | ${mencCol} | ${sp} | ${pr} | ${br} | ${risk(e)} | PENDIENTE |  |`
  );
});

lines.push("");
lines.push("---");
lines.push("");
lines.push("## 4. Top riesgo automático (primeros 30 a mirar en fix)");
lines.push("");
const ranked = [...exams].sort((a, b) => risk(b) - risk(a)).slice(0, 30);
lines.push("| rank | archivo | riesgo | por qué |");
lines.push("|-----:|---------|-------:|---------|");
ranked.forEach((e, i) => {
  const why = [];
  if (e.figsHuerfanas.length) why.push(`${e.figsHuerfanas.length} fig huérf`);
  if (e.mencSinFig.length) why.push(`${e.mencSinFig.length} menc.sin.fig`);
  if (e.provis.length) why.push(`${e.provis.length} provis`);
  if (e.badResp.length) why.push(`${e.badResp.length} bad resp`);
  if (e.nSinPasos) why.push(`${e.nSinPasos} sin pasos`);
  if (e.huecos.length) why.push("huecos");
  if (e.mismatchTotal) why.push("total mismatch");
  lines.push(`| ${i + 1} | \`${e.file}\` | ${risk(e)} | ${why.join(", ")} |`);
});

lines.push("");
lines.push("---");
lines.push("");
lines.push("## 5. Detalle preguntas con deuda visual (auto)");
lines.push("");
lines.push("### 5.1 Campo figura con ID sin motor");
lines.push("");
for (const e of exams) {
  if (!e.figsHuerfanas.length) continue;
  lines.push(`**\`${e.file}\`**`);
  for (const h of e.figsHuerfanas) lines.push(`- P${h.n}: \`${h.id}\``);
  lines.push("");
}
lines.push("### 5.2 Mencionan figura en texto sin campo `figura:`");
lines.push("");
for (const e of exams) {
  if (!e.mencSinFig.length) continue;
  lines.push(
    `- \`${e.file}\`: ${e.mencSinFig.map((n) => `P${n}`).join(", ")}`
  );
}
lines.push("");
lines.push("---");
lines.push("");
lines.push("## 6. Protocolo de lotes (humano)");
lines.push("");
lines.push("1. Tomar 5–10 filas `PENDIENTE` (empezar admisión 2025→ atrás).");
lines.push("2. Abrir PDF facsímil + MD + `/resueltos/[id]` en browser.");
lines.push("3. Llenar `visual_humano` y `notas`.");
lines.push("4. No fix en esta fase.");
lines.push("5. Cuando un bloque de años esté cerrado, sprint de fix ordenado por riesgo.");
lines.push("");
lines.push("### Lote 1 sugerido (arrancar acá)");
lines.push("");
const lote1 = exams.filter((e) => e.cat === "admision" && e.anio >= 2023);
for (const e of lote1) {
  lines.push(`- [ ] \`${e.file}\` (riesgo_auto=${risk(e)})`);
}
lines.push("");
lines.push("---");
lines.push("");
lines.push("## 7. Contadores por categoría");
lines.push("");
const adm = exams.filter((e) => e.cat === "admision");
const par = exams.filter((e) => e.cat !== "admision");
lines.push("| Cat | N | preg | fig ref | fig huérf | menc.sin | sin pasos |");
lines.push("|-----|--:|-----:|--------:|----------:|---------:|----------:|");
function row(label, arr) {
  const q = arr.reduce((s, e) => s + e.nPreg, 0);
  const fr = arr.reduce((s, e) => s + e.conFig, 0);
  const fh = arr.reduce((s, e) => s + e.figsHuerfanas.length, 0);
  const ms = arr.reduce((s, e) => s + e.mencSinFig.length, 0);
  const sp = arr.reduce((s, e) => s + e.nSinPasos, 0);
  lines.push(
    `| ${label} | ${arr.length} | ${q} | ${fr} | ${fh} | ${ms} | ${sp} |`
  );
}
row("admision", adm);
row("parcial_curso", par);
row("TOTAL", exams);

const jsonOut = {
  generated: "2026-07-29",
  definedFigs: definedList,
  orphanFigs: Object.fromEntries([...allHuerf.entries()]),
  pdfs,
  exams: exams.map((e) => ({
    file: e.file,
    cat: e.cat,
    anio: e.anio,
    titulo: e.titulo,
    opcion: e.opcion,
    nPreg: e.nPreg,
    totalFm: e.totalFm,
    mismatchTotal: e.mismatchTotal,
    huecos: e.huecos,
    dups: e.dups,
    figsOk: e.figsOk,
    figsHuerfanas: e.figsHuerfanas,
    mencSinFig: e.mencSinFig,
    sinPasos: e.sinPasos,
    provis: e.provis,
    badResp: e.badResp,
    riesgo: risk(e),
    visual_humano: "PENDIENTE",
    notas: "",
  })),
};

fs.mkdirSync(path.dirname(OUT_MD), { recursive: true });
fs.writeFileSync(OUT_JSON, JSON.stringify(jsonOut, null, 2), "utf8");
fs.writeFileSync(OUT_MD, lines.join("\n"), "utf8");

console.log("OK exams", exams.length, "errors", errors.length);
console.log(
  "Q",
  totalQ,
  "figRef",
  totalFigRef,
  "figOk",
  totalFigOk,
  "figH",
  totalFigH,
  "menc",
  totalMenc,
  "sinPaso",
  totalSinPaso,
  "bad",
  totalBad,
  "provis",
  totalProv
);
console.log("orphan ids", allHuerf.size);
console.log("lote1", lote1.length);
console.log("wrote", OUT_MD);
console.log("wrote", OUT_JSON);
if (errors.length) console.log("ERRORS", errors);

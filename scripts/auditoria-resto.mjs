/**
 * Auditoría del resto del banco (115 PENDIENTE).
 * Solo anota: no modifica data/examenes ni src.
 *
 * Criterios (alineados a Lote 1):
 * - BLOQUEANTE: MD incompleto vs PDF, o VERIFICAR/provisorio en ítems
 *   dependientes de figura sin respuesta confiable, o fig huérfana + provis.
 * - FIX-FIGURA: figura: huérfana o menciona figura sin campo (deuda visual).
 * - FIX-PASOS: muchas explicaciones sin Paso N y sin otra deuda mayor.
 * - FIX-CONTENIDO: provis/ambiguos sin ser figura, o mismatch metadata.
 * - OK-TEXTO: cobertura OK, sin fig huérfana crítica, usable sin dibujo.
 * - OK: casi imposible sin UI; no se asigna en masa.
 */
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const MD_DIR = path.join("data", "examenes", "umss", "ingenieria");
const PDF_DIR = "examenes pasados";
const MOTOR = path.join("src", "lib", "figuras", "definiciones.ts");
const JSON_PATH = "data/research/umss/auditoria-ingenieria.json";
const MD_PATH = "data/research/umss/auditoria-ingenieria.md";

const motorSrc = fs.readFileSync(MOTOR, "utf8");
const definedFigs = new Set();
const mCtor = motorSrc.match(/const CONSTRUCTORES[\s\S]*?=\s*\{([\s\S]*?)\};/);
if (mCtor) {
  for (const mm of mCtor[1].matchAll(/["']([^"']+)["']\s*:/g)) definedFigs.add(mm[1]);
}

const pdfs = fs.readdirSync(PDF_DIR).filter((f) => f.toLowerCase().endsWith(".pdf"));

// Heuristic PDF mapping: score by year + option keywords
function scorePdf(pdfName, exam) {
  const p = pdfName.toLowerCase();
  let s = 0;
  const y = String(exam.anio);
  if (p.includes(y)) s += 5;
  // option
  const op = (exam.opcion || "").toLowerCase();
  const tit = (exam.titulo || "").toLowerCase();
  const file = exam.file.toLowerCase();
  if (file.includes("1op") || op.includes("1ra") || tit.includes("1ra")) {
    if (p.includes("1op") || p.includes("1ra") || p.includes("primer") || p.includes("1-op") || p.includes("primera"))
      s += 3;
  }
  if (file.includes("2op") || op.includes("2da") || tit.includes("2da")) {
    if (p.includes("2op") || p.includes("2da") || p.includes("segunda") || p.includes("2-op") || p.includes("segund"))
      s += 3;
  }
  if (file.includes("3op") || op.includes("3ra") || tit.includes("3ra")) {
    if (p.includes("3op") || p.includes("3ra") || p.includes("tercera") || p.includes("3-op")) s += 3;
  }
  if (file.includes("unica") || op.includes("unica") || tit.includes("única") || tit.includes("unica")) {
    if (p.includes("unica") || p.includes("única") || p.includes("uop")) s += 3;
  }
  // gestion 1 vs 2
  if (file.match(/-1-\d{4}/) || tit.includes("1-") || file.includes("1op-1") || /1-\d{4}/.test(file)) {
    /* weak */
  }
  // convocatoria pattern in slug: 2022-1op-2 = gestion 2
  const mGest = file.match(/(\d)op-(\d)-/);
  if (mGest) {
    const gest = mGest[2];
    if (p.includes(`-${gest}-`) || p.includes(`${gest}op`) || p.includes(`-${gest}op`) || p.includes(`${gest}-`))
      s += 1;
  }
  // partials
  if (exam.cat === "parcial_curso") {
    if (p.includes("parcial") || p.includes("final") || p.includes("proped") || p.includes("pre-fac") || p.includes("prefac"))
      s += 2;
    if (file.includes("parcial1") && (p.includes("primer") || p.includes("1er") || p.includes("1erparcial"))) s += 2;
    if (file.includes("parcial2") && (p.includes("segundo") || p.includes("2do") || p.includes("2doparcial"))) s += 2;
    if (file.includes("parcial3") && (p.includes("tercer") || p.includes("3er"))) s += 2;
    if (file.includes("parcial4") && (p.includes("cuarto") || p.includes("4to"))) s += 2;
    if (file.includes("final") && p.includes("final")) s += 3;
  } else {
    if (p.includes("parcial") || p.includes("proped") || p.includes("pre-fac") || p.includes("preu")) s -= 3;
    if (p.includes("admision") || p.includes("ingreso") || p.includes("op-") || p.includes("opcion") || p.includes("opción"))
      s += 1;
  }
  return s;
}

function bestPdf(exam) {
  let best = null;
  let bestS = -999;
  for (const p of pdfs) {
    const s = scorePdf(p, exam);
    if (s > bestS) {
      bestS = s;
      best = p;
    }
  }
  if (bestS < 5) return { pdf: null, score: bestS };
  return { pdf: best, score: bestS };
}

function pdfQuestionCount(pdfFile) {
  if (!pdfFile) return null;
  const full = path.join(PDF_DIR, pdfFile);
  try {
    const py = `
import pdfplumber, re, sys
path = sys.argv[1]
with pdfplumber.open(path) as doc:
    t = "\\n".join((p.extract_text() or "") for p in doc.pages)
codes = re.findall(r"(?m)^([AFGQBT]\\d+)\\.", t)
seen = []
for c in codes:
    if c not in seen: seen.append(c)
# fallback numbered
if len(seen) < 8:
    nums = re.findall(r"(?m)^(\\d{1,2})[\\.\\)]\\s+\\S", t)
    if len(nums) >= 8:
        print(len(set(nums)))
    else:
        print(len(seen) if seen else 0)
else:
    print(len(seen))
`;
    const out = execSync(`python -c ${JSON.stringify(py)} "${full}"`, {
      encoding: "utf8",
      timeout: 60000,
    }).trim();
    const n = parseInt(out, 10);
    return Number.isFinite(n) ? n : null;
  } catch {
    return null;
  }
}

function parseExamFile(file) {
  const c = fs.readFileSync(path.join(MD_DIR, file), "utf8");
  const fm = c.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n([\s\S]*)$/);
  if (!fm) return null;
  const front = {};
  for (const line of fm[1].split(/\r?\n/)) {
    const m = line.match(/^([a-zA-Z_]+):\s*(.*)$/);
    if (!m) continue;
    let v = m[2].trim();
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    )
      v = v.slice(1, -1);
    front[m[1]] = v;
  }
  const htmlComments = [...c.matchAll(/<!--([\s\S]*?)-->/g)].map((x) => x[1]);
  const estado = htmlComments.join("\n");
  const cuerpo = fm[2].replace(/<!--[\s\S]*?-->/g, "");
  const bloques = cuerpo
    .split(/(?=^##\s+Pregunta\s+\d+)/m)
    .filter((b) => /^##\s+Pregunta\s+\d+/m.test(b));
  const MENCION =
    /figura adjunta|en la figura|mostrad[oa]s? en la figura|seg[uú]n la figura|ver figura|diagrama|como se muestra en|se muestra en la/i;
  const PASO = /Paso\s+\d+/i;
  const PROVISORIO =
    /provisorio|pendiente.*figura|sin la figura|VERIFICAR|ambig[uü]edad genuina|no se puede determinar con certeza|no adivinar/i;

  const preguntas = [];
  for (const b of bloques) {
    const nm = b.match(/^##\s+Pregunta\s+(\d+)/m);
    const num = nm ? parseInt(nm[1], 10) : 0;
    const figM = b.match(/^figura:\s*(\S+)/m);
    const fig = figM ? figM[1] : null;
    const respM = b.match(/\*\*respuesta:\*\*\s*([A-E])/i);
    const expM = b.match(/\*\*explicacion:\*\*[\s\S]*/i);
    const exp = expM ? expM[0] : "";
    const opciones = [...b.matchAll(/^-\s+([A-E])\)/gm)].map((x) => x[1]);
    const enunciado = b.split(/^-\s+[A-E]\)/m)[0] || b;
    const mencionaFig = MENCION.test(enunciado) || MENCION.test(b.slice(0, 900));
    const provisorio = PROVISORIO.test(exp) || PROVISORIO.test(b) || PROVISORIO.test(estado);
    preguntas.push({
      num,
      figura: fig,
      conPasos: PASO.test(exp),
      mencionaFig,
      provisorio,
      resp: respM ? respM[1].toUpperCase() : null,
      respOk: respM ? opciones.includes(respM[1].toUpperCase()) : false,
      huerfana: fig ? !definedFigs.has(fig) : false,
    });
  }
  return {
    file,
    front,
    estado,
    anio: parseInt(front.anio || "0", 10),
    opcion: front.opcion || "",
    titulo: front.titulo || "",
    cat: front.categoria || "admision",
    nPreg: preguntas.length,
    totalFm: parseInt(front.total_preguntas || "0", 10),
    preguntas,
  };
}

function classify(exam, pdfInfo) {
  const qs = exam.preguntas;
  const huerf = qs.filter((p) => p.huerfana);
  const menc = qs.filter((p) => p.mencionaFig && !p.figura);
  const sinPaso = qs.filter((p) => !p.conPasos);
  const provis = qs.filter((p) => p.provisorio);
  const provisFig = provis.filter((p) => p.figura || p.mencionaFig || p.huerfana);
  const badResp = qs.filter((p) => !p.respOk);

  const nPdf = pdfInfo.nPdf;
  const incompleto =
    nPdf != null && nPdf >= 10 && exam.nPreg < nPdf - 2; // tolerancia 2 (doble conteo raro)

  const flags = [];
  if (incompleto) flags.push("incompleto");
  if (huerf.length) flags.push(`fig-huerfana-x${huerf.length}`);
  if (menc.length) flags.push(`menc-sin-campo-x${menc.length}`);
  if (provisFig.length) flags.push(`provis-fig-x${provisFig.length}`);
  if (provis.length && !provisFig.length) flags.push(`provis-x${provis.length}`);
  if (sinPaso.length >= Math.max(5, Math.floor(exam.nPreg * 0.25)))
    flags.push(`sin-pasos-x${sinPaso.length}`);
  if (badResp.length) flags.push(`bad-resp-x${badResp.length}`);
  if (exam.totalFm && exam.totalFm !== exam.nPreg) flags.push("total-mismatch");
  if (exam.estado && /ESTADO|priorizando contenido|sin figura|provisorio/i.test(exam.estado))
    flags.push("nota-curador");

  let visual = "OK-TEXTO";
  let notas = [];

  if (incompleto) {
    visual = "BLOQUEANTE";
    notas.push(
      `Incompleto: MD ${exam.nPreg} preg vs PDF ~${nPdf} (${pdfInfo.pdf || "?"}).`
    );
  }

  if (provisFig.length >= 2 || (provisFig.length >= 1 && huerf.length >= 2)) {
    visual = "BLOQUEANTE";
    notas.push(
      `VERIFICAR/provisorio en ${provisFig.length} ítem(s) con figura: P${provisFig.map((p) => p.num).join(",")}.`
    );
  } else if (provisFig.length === 1 && visual !== "BLOQUEANTE") {
    if (visual !== "BLOQUEANTE") visual = "FIX-FIGURA";
    notas.push(
      `Provisorio en P${provisFig[0].num} (depende de figura).`
    );
  }

  if (huerf.length && visual !== "BLOQUEANTE") {
    visual = "FIX-FIGURA";
    notas.push(
      `Figuras huérfanas: ${huerf.map((p) => `P${p.num}:${p.figura}`).join("; ")}.`
    );
  }

  if (menc.length && visual !== "BLOQUEANTE") {
    if (visual === "OK-TEXTO") visual = "FIX-FIGURA";
    notas.push(
      `Mencionan figura sin campo: P${menc.map((p) => p.num).join(",")}.`
    );
  }

  if (provis.length && !provisFig.length && visual === "OK-TEXTO") {
    visual = "FIX-CONTENIDO";
    notas.push(`Marcadores provisorio/ambiguo: P${provis.map((p) => p.num).join(",")}.`);
  }

  // muchos sin pasos: anotar pero no subir a BLOQUEANTE
  if (sinPaso.length >= Math.max(5, Math.floor(exam.nPreg * 0.25))) {
    notas.push(`${sinPaso.length}/${exam.nPreg} sin Paso N.`);
    if (visual === "OK-TEXTO" && sinPaso.length >= exam.nPreg * 0.5) {
      visual = "FIX-PASOS";
    }
  }

  if (badResp.length) {
    visual = "BLOQUEANTE";
    notas.push(`Respuesta sin opción: P${badResp.map((p) => p.num).join(",")}.`);
  }

  if (exam.estado && /priorizando contenido sobre figuras|ninguna figura fue construida/i.test(exam.estado)) {
    notas.push("Nota curador: cargado priorizando contenido sobre figuras.");
    if (visual === "OK-TEXTO" && (menc.length || /figura/i.test(exam.estado))) {
      visual = "FIX-FIGURA";
    }
  }

  if (!notas.length) {
    notas.push(
      `Cobertura MD ${exam.nPreg}` +
        (nPdf != null ? ` ≈ PDF ${nPdf}` : " (PDF no mapeado con certeza)") +
        `. Sin fig huérfana ni provis crítico. Deuda visual residual posible en geo/fís textual.`
    );
  }

  if (pdfInfo.pdf) notas.push(`PDF cand: ${pdfInfo.pdf} (score ${pdfInfo.score}).`);

  return {
    visual_humano: visual,
    notas: notas.join(" "),
    flags,
    pdf: pdfInfo.pdf,
    n_pdf: nPdf,
    n_md: exam.nPreg,
    figsHuerfanas: huerf.map((p) => ({ n: p.num, id: p.figura })),
    mencSinFig: menc.map((p) => p.num),
    provis: provis.map((p) => p.num),
    sinPasos: sinPaso.map((p) => p.num),
  };
}

// Load existing JSON (keep lote1 results)
const j = JSON.parse(fs.readFileSync(JSON_PATH, "utf8"));
const already = new Set(
  j.exams.filter((e) => e.visual_humano && e.visual_humano !== "PENDIENTE").map((e) => e.file)
);

console.log("Already audited:", already.size);
console.log("Defined figs:", [...definedFigs].join(", "));

// Cache PDF counts
const pdfCountCache = new Map();
function getPdfCount(pdf) {
  if (!pdf) return null;
  if (pdfCountCache.has(pdf)) return pdfCountCache.get(pdf);
  const n = pdfQuestionCount(pdf);
  pdfCountCache.set(pdf, n);
  console.log("  PDF", pdf, "→", n);
  return n;
}

const newResults = {};
const pending = j.exams.filter((e) => !already.has(e.file));
// Sort: admision by year desc, then parciales
pending.sort((a, b) => {
  if (a.cat !== b.cat) return a.cat === "admision" ? -1 : 1;
  if (b.anio !== a.anio) return b.anio - a.anio;
  return a.file.localeCompare(b.file);
});

let i = 0;
for (const row of pending) {
  i++;
  const exam = parseExamFile(row.file);
  if (!exam) {
    newResults[row.file] = {
      visual_humano: "BLOQUEANTE",
      notas: "No se pudo parsear el MD.",
      flags: ["parse-error"],
    };
    console.log(`[${i}/${pending.length}] FAIL parse ${row.file}`);
    continue;
  }
  const { pdf, score } = bestPdf(exam);
  // only count PDF for admision high-confidence, or when score high
  let nPdf = null;
  if (pdf && score >= 6) nPdf = getPdfCount(pdf);
  else if (pdf && score >= 5 && exam.cat === "admision") nPdf = getPdfCount(pdf);

  const r = classify(exam, { pdf, score, nPdf });
  newResults[row.file] = r;
  console.log(
    `[${i}/${pending.length}] ${r.visual_humano.padEnd(14)} ${row.file} (md=${exam.nPreg} pdf=${nPdf ?? "?"} huerf=${r.figsHuerfanas?.length || 0})`
  );
}

// Merge into JSON
const summary = {
  BLOQUEANTE: 0,
  "FIX-FIGURA": 0,
  "FIX-PASOS": 0,
  "FIX-CONTENIDO": 0,
  "OK-TEXTO": 0,
  OK: 0,
};
for (const e of j.exams) {
  if (newResults[e.file]) {
    Object.assign(e, {
      visual_humano: newResults[e.file].visual_humano,
      notas: newResults[e.file].notas,
      pdf: newResults[e.file].pdf,
      flags: newResults[e.file].flags,
      n_pdf: newResults[e.file].n_pdf,
    });
  }
  const v = e.visual_humano;
  if (summary[v] !== undefined) summary[v]++;
  else summary[v] = (summary[v] || 0) + 1;
}

j.lote_resto = {
  closed: "2026-07-29",
  method:
    "semi-auto: parse MD + heuristic PDF map + pdfplumber count + flags (huerf/menc/provis/pasos). Lote1 results preserved (human PDF image review).",
  summary_global: summary,
  count_new: Object.keys(newResults).length,
};
fs.writeFileSync(JSON_PATH, JSON.stringify(j, null, 2));

// Write MD section 9
const bySem = {};
for (const e of j.exams) {
  const v = e.visual_humano || "PENDIENTE";
  if (!bySem[v]) bySem[v] = [];
  bySem[v].push(e);
}

const body = [];
body.push("---");
body.push("");
body.push("## 9. Auditoría completa resto del banco (cerrado 2026-07-29)");
body.push("");
body.push(
  "> Solo anotación. **No se modificaron** archivos en `data/examenes/` ni el motor de figuras."
);
body.push("");
body.push(
  "Método: Lote 1 (2023–2025 admisión) = revisión humana PDF renderizado. Resto = semi-auto (parse MD + mapeo PDF heurístico + conteo preguntas + flags de figura/provisorio/pasos). Los BLOQUEANTE del resto merecen re-chequeo humano al fix."
);
body.push("");
body.push("### Resumen global (126)");
body.push("");
body.push("| Semáforo | Cant |");
body.push("|----------|-----:|");
for (const k of [
  "BLOQUEANTE",
  "FIX-FIGURA",
  "FIX-PASOS",
  "FIX-CONTENIDO",
  "OK-TEXTO",
  "OK",
  "PENDIENTE",
]) {
  body.push(`| ${k} | ${summary[k] || 0} |`);
}
body.push("");

body.push("### BLOQUEANTE (todos)");
body.push("");
const bloqueantes = j.exams.filter((e) => e.visual_humano === "BLOQUEANTE");
for (const e of bloqueantes.sort((a, b) => b.anio - a.anio)) {
  body.push(`- \`${e.file}\` (${e.cat}, ${e.anio}): ${e.notas || ""}`);
}
body.push("");

body.push("### FIX-FIGURA (todos)");
body.push("");
const figs = j.exams.filter((e) => e.visual_humano === "FIX-FIGURA");
for (const e of figs.sort((a, b) => b.anio - a.anio)) {
  body.push(`- \`${e.file}\`: ${e.notas || ""}`);
}
body.push("");

body.push("### FIX-PASOS");
body.push("");
for (const e of j.exams.filter((e) => e.visual_humano === "FIX-PASOS")) {
  body.push(`- \`${e.file}\`: ${e.notas || ""}`);
}
body.push("");

body.push("### FIX-CONTENIDO");
body.push("");
for (const e of j.exams.filter((e) => e.visual_humano === "FIX-CONTENIDO")) {
  body.push(`- \`${e.file}\`: ${e.notas || ""}`);
}
body.push("");

body.push("### OK-TEXTO (conteo por año)");
body.push("");
const oktex = j.exams.filter((e) => e.visual_humano === "OK-TEXTO");
const byYear = {};
for (const e of oktex) {
  const k = `${e.cat}:${e.anio}`;
  byYear[k] = (byYear[k] || 0) + 1;
}
body.push("| cat:año | n OK-TEXTO |");
body.push("|---------|----------:|");
for (const k of Object.keys(byYear).sort().reverse()) {
  body.push(`| ${k} | ${byYear[k]} |`);
}
body.push("");
body.push(`Total OK-TEXTO: **${oktex.length}**`);
body.push("");

body.push("### Backlog de fix global (prioridad)");
body.push("");
body.push("1. Completar MD 2025 incompletos (Lote 1).");
body.push("2. Re-resolver VERIFICAR de 2023-2op-1 y similares BLOQUEANTE.");
body.push("3. Implementar figuras huérfanas (lista en §1 y §8).");
body.push("4. Agregar `figura:` + SVG a menciones sin campo.");
body.push("5. Reescribir explicaciones sin Paso N (sobre todo parciales y 2025).");
body.push("6. Spot-check UI del mejor del banco (2023-1op-1).");
body.push("");
body.push("---");
body.push("");
body.push("*Fin auditoría inventario + Lote1 humano + resto semi-auto. Listo para sprint de fix.*");
body.push("");

// Patch table rows for new results
let md = fs.readFileSync(MD_PATH, "utf8");
// strip old section 9 if re-run
md = md.replace(/\n## 9\. Auditoría completa[\s\S]*$/, "\n");

const lines = md.split(/\n/).map((line) => {
  for (const [file, r] of Object.entries(newResults)) {
    if (line.includes("`" + file + "`") && line.includes("| PENDIENTE |")) {
      const short = (r.notas || "").slice(0, 100).replace(/\|/g, "/") + "…";
      return line.replace(
        "| PENDIENTE |  |",
        "| **" + r.visual_humano + "** | " + short + " |"
      );
    }
  }
  return line;
});

fs.writeFileSync(MD_PATH, lines.join("\n").replace(/\n+$/, "\n") + "\n" + body.join("\n"));
console.log("\n=== SUMMARY GLOBAL ===");
console.log(summary);
console.log("Wrote", MD_PATH);
console.log("Wrote", JSON_PATH);

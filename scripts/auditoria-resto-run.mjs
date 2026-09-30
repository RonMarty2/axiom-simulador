/**
 * Auditoría resto del banco — solo anotación.
 * No modifica data/examenes ni src.
 */
import fs from "fs";
import path from "path";

const MD_DIR = path.join("data", "examenes", "umss", "ingenieria");
const MOTOR = path.join("src", "lib", "figuras", "definiciones.ts");
const JSON_PATH = "data/research/umss/auditoria-ingenieria.json";
const MD_PATH = "data/research/umss/auditoria-ingenieria.md";
const PDF_COUNTS = "data/research/umss/pdf-question-counts.json";

const motor = fs.readFileSync(MOTOR, "utf8");
const defined = new Set();
const mCtor = motor.match(/const CONSTRUCTORES[\s\S]*?=\s*\{([\s\S]*?)\};/);
if (mCtor) {
  for (const x of mCtor[1].matchAll(/["']([^"']+)["']\s*:/g)) defined.add(x[1]);
}
const pdfCounts = JSON.parse(fs.readFileSync(PDF_COUNTS, "utf8"));
const j = JSON.parse(fs.readFileSync(JSON_PATH, "utf8"));

const MENCION =
  /figura adjunta|en la figura|mostrad[oa]s? en la figura|seg[uú]n la figura|ver figura|diagrama|como se muestra en|se muestra en la/i;
const PASO = /Paso\s+\d+/i;
const PROV =
  /provisorio|pendiente.*figura|sin la figura|VERIFICAR|ambig[uü]edad genuina|no se puede determinar con certeza|no adivinar|marcada para confirmar/i;

const manualMap = {
  "2022-1op-2-2022.md": "1-op-2-2022.pdf",
  "2022-2op-2-2022.md": "2-op-2-2022.pdf",
  "2022-3op-2-2022.md": "3-op-2-2022.pdf",
  "2020-1op-1-2020.md": "161_1ra-op-1-2020.pdf",
  "2020-2op-1-2020.md": "162_2da-op-1-2020.pdf",
  "2020-3op-1-2020.md": "163_3ra-op-1-2020.pdf",
  "2019-1op-2-2019.md": "159_1ra-op-2-2019.pdf",
  "2019-2op-2-2019.md": "160_2da-op-2-2019.pdf",
  "2018-1op-1-2018.md": "151_1ra-op-1-2018.pdf",
  "2018-2op-1-2018.md": "152_2da-op-1-2018.pdf",
  "2018-3op-1-2018.md": "153_3ra-op-1-2018.pdf",
  "2018-1op-2-2018.md": "154_1ra-op-2-2018.pdf",
  "2018-2op-2-2018.md": "155_2da-op-2-2018.pdf",
  "2017-1op-1-2017.md": "146_1ra-op-1-2017.pdf",
  "2017-2op-1-2017.md": "147_2da-op-1-2017.pdf",
  "2017-3op-1-2017.md": "148_3ra-op-1-2017.pdf",
  "2017-1op-2-2017.md": "149_1ra-op-2-2017.pdf",
  "2017-2op-2-2017.md": "150_2da-op-2-2017.pdf",
  "2016-1op-1-2016.md": "141_1ra-op-1-2016.pdf",
  "2016-2op-1-2016.md": "142_2da-op-1-2016.pdf",
  "2016-3op-1-2016.md": "143_2ra-op-1-2016.pdf",
  "2016-1op-2-2016.md": "144_1ra-op-2-2016.pdf",
  "2016-2op-2-2016.md": "145_2da-op-2-2016.pdf",
  "2015-1op-1-2015.md": "137_1ra-op-1-2015.pdf",
  "2015-2op-1-2015.md": "138_2da-op-1-2015.pdf",
  "2015-1op-2-2015.md": "139_1ra-op-2-2015.pdf",
  "2015-2op-2-2015.md": "140_2da-op-2-2015.pdf",
  "2014-1op-1-2014.md": "128_1ra-op-1-2014.pdf",
  "2014-2op-1-2014.md": "129_2da-op-1-2014.pdf",
  "2014-unica-2-2014.md": "133_unica2-2014.pdf",
  "2013-unica-2-2013.md": "124_ExamenAdmisionUnicaOpcion2-2013.pdf",
  "2012-1op-1-2012.md": "119_PrimerExamenIngreso1-2012.pdf",
  "2012-2op-1-2012.md": "120_SegundoExamenIngreso1-2012.pdf",
  "2006-2op-1-2006.md": "055_ExamenAdmisionSegundaOpcion1-2006.pdf",
  "2005-1op-1-2005.md": "050_ExamenAdmisionPrimerOpcion1-2005.pdf",
  "2005-2op-1-2005.md": "051_ExamenAdmisionSegundaOpcion1-2005.pdf",
};

function parse(file) {
  const c = fs.readFileSync(path.join(MD_DIR, file), "utf8");
  const fm = c.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n([\s\S]*)$/);
  if (!fm) return null;
  const front = {};
  for (const line of fm[1].split(/\r?\n/)) {
    const mm = line.match(/^([a-zA-Z_]+):\s*(.*)$/);
    if (!mm) continue;
    let v = mm[2].trim();
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    )
      v = v.slice(1, -1);
    front[mm[1]] = v;
  }
  const comments = [...c.matchAll(/<!--([\s\S]*?)-->/g)]
    .map((x) => x[1])
    .join("\n");
  const cuerpo = fm[2].replace(/<!--[\s\S]*?-->/g, "");
  const bloques = cuerpo
    .split(/(?=^##\s+Pregunta\s+\d+)/m)
    .filter((b) => /^##\s+Pregunta\s+\d+/m.test(b));
  const qs = [];
  for (const b of bloques) {
    const num = parseInt(
      (b.match(/^##\s+Pregunta\s+(\d+)/m) || [])[1] || "0",
      10
    );
    const fig = (b.match(/^figura:\s*(\S+)/m) || [])[1] || null;
    const exp = (b.match(/\*\*explicacion:\*\*[\s\S]*/i) || [""])[0];
    const opciones = [...b.matchAll(/^-\s+([A-E])\)/gm)].map((x) => x[1]);
    const respM = b.match(/\*\*respuesta:\*\*\s*([A-E])/i);
    const enu = b.split(/^-\s+[A-E]\)/m)[0] || b;
    const menciona = MENCION.test(enu) || MENCION.test(b.slice(0, 900));
    const provis = PROV.test(exp) || PROV.test(b);
    qs.push({
      num,
      fig,
      huerf: fig ? !defined.has(fig) : false,
      menciona,
      provis,
      pasos: PASO.test(exp),
      respOk: respM ? opciones.includes(respM[1].toUpperCase()) : false,
    });
  }
  return {
    file,
    front,
    comments,
    anio: +front.anio || 0,
    cat: front.categoria || "admision",
    n: qs.length,
    qs,
  };
}

function classify(exam) {
  const huerf = exam.qs.filter((p) => p.huerf);
  const menc = exam.qs.filter((p) => p.menciona && !p.fig);
  const sinP = exam.qs.filter((p) => !p.pasos);
  const provis = exam.qs.filter((p) => p.provis);
  const provisFig = provis.filter((p) => p.fig || p.menciona || p.huerf);
  const bad = exam.qs.filter((p) => !p.respOk);
  const pdf = manualMap[exam.file] || null;
  const nPdf = pdf != null ? pdfCounts[pdf] : null;
  const trustPdf = nPdf != null && nPdf >= 15;
  const incompleto = trustPdf && exam.n < nPdf - 2;

  const flags = [];
  if (incompleto) flags.push("incompleto");
  if (huerf.length) flags.push("fig-huerfana-x" + huerf.length);
  if (menc.length) flags.push("menc-sin-campo-x" + menc.length);
  if (provisFig.length) flags.push("provis-fig-x" + provisFig.length);
  if (provis.length && !provisFig.length)
    flags.push("provis-x" + provis.length);
  if (sinP.length >= Math.max(5, Math.floor(exam.n * 0.25)))
    flags.push("sin-pasos-x" + sinP.length);
  if (bad.length) flags.push("bad-resp");
  if (
    /priorizando contenido|ninguna figura fue construida|sin figura/i.test(
      exam.comments
    )
  )
    flags.push("nota-curador");

  let v = "OK-TEXTO";
  const notes = [];
  if (incompleto) {
    v = "BLOQUEANTE";
    notes.push(`Incompleto: MD ${exam.n} vs PDF ~${nPdf} (${pdf}).`);
  }
  if (provisFig.length >= 2 || (provisFig.length >= 1 && huerf.length >= 2)) {
    v = "BLOQUEANTE";
    notes.push(
      `VERIFICAR/provisorio en figuras: P${provisFig.map((p) => p.num).join(",")}`
    );
  } else if (provisFig.length === 1) {
    if (v !== "BLOQUEANTE") v = "FIX-FIGURA";
    notes.push(`Provisorio figura P${provisFig[0].num}`);
  }
  if (huerf.length && v !== "BLOQUEANTE") {
    v = "FIX-FIGURA";
    notes.push(
      `Huérfanas: ${huerf.map((p) => `P${p.num}:${p.fig}`).join("; ")}`
    );
  }
  if (menc.length && v !== "BLOQUEANTE") {
    if (v === "OK-TEXTO") v = "FIX-FIGURA";
    notes.push(`Menc.sin.campo: P${menc.map((p) => p.num).join(",")}`);
  }
  if (provis.length && !provisFig.length && v === "OK-TEXTO") {
    v = "FIX-CONTENIDO";
    notes.push(`Provisorio: P${provis.map((p) => p.num).join(",")}`);
  }
  if (sinP.length >= Math.max(5, Math.floor(exam.n * 0.25))) {
    notes.push(`${sinP.length}/${exam.n} sin Paso N`);
    if (v === "OK-TEXTO" && sinP.length >= exam.n * 0.5) v = "FIX-PASOS";
  }
  if (bad.length) {
    v = "BLOQUEANTE";
    notes.push(`Resp sin opción: P${bad.map((p) => p.num).join(",")}`);
  }
  if (/priorizando contenido sobre figuras/i.test(exam.comments)) {
    notes.push("Curador: priorizó contenido sobre figuras");
    if (
      v === "OK-TEXTO" &&
      (menc.length || huerf.length || /figura/i.test(exam.comments))
    )
      v = "FIX-FIGURA";
  }
  if (!notes.length) {
    notes.push(
      `MD ${exam.n}` +
        (trustPdf ? ` ≈PDF ${nPdf}` : "") +
        ". Sin deuda visual crítica auto-detectada."
    );
  }
  if (pdf) notes.push(`PDF: ${pdf}` + (nPdf != null ? ` (count ${nPdf})` : ""));

  return {
    visual_humano: v,
    notas: notes.join(" "),
    flags,
    pdf,
    n_pdf: nPdf,
    n_md: exam.n,
  };
}

const already = new Set(
  j.exams
    .filter((e) => e.visual_humano && e.visual_humano !== "PENDIENTE")
    .map((e) => e.file)
);

const results = {};
for (const row of j.exams) {
  if (already.has(row.file)) continue;
  const exam = parse(row.file);
  if (!exam) {
    results[row.file] = {
      visual_humano: "BLOQUEANTE",
      notas: "parse fail",
      flags: ["parse-error"],
    };
    continue;
  }
  results[row.file] = classify(exam);
}

const summary = {};
for (const e of j.exams) {
  if (results[e.file]) {
    Object.assign(e, {
      visual_humano: results[e.file].visual_humano,
      notas: results[e.file].notas,
      pdf: results[e.file].pdf,
      flags: results[e.file].flags,
      n_pdf: results[e.file].n_pdf,
    });
  }
  summary[e.visual_humano] = (summary[e.visual_humano] || 0) + 1;
}

j.lote_resto = {
  closed: "2026-07-29",
  method:
    "semi-auto MD flags + manual PDF map recent + pdfplumber counts (escaneados count=0 ignorados para incompleto)",
  summary_global: summary,
  count_new: Object.keys(results).length,
  note: "Solo anotación. Sin cambios en data/examenes ni src.",
};
fs.writeFileSync(JSON_PATH, JSON.stringify(j, null, 2));

const body = [];
body.push("---");
body.push("");
body.push("## 9. Auditoría completa resto del banco (cerrado 2026-07-29)");
body.push("");
body.push(
  "> Solo anotación. **No se modificaron** `data/examenes/` ni el motor de figuras ni la app."
);
body.push("");
body.push(
  "Método: Lote 1 (admisión 2023–2025) = revisión humana con PDF renderizado. Resto = semi-auto (flags MD: fig huérfana, mención sin campo, VERIFICAR/provisorio, sin Paso N) + mapeo PDF manual de años recientes + conteo pdfplumber (PDFs escaneados viejos suelen dar count 0 → no se usa para marcar incompleto)."
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
body.push("### BLOQUEANTE");
body.push("");
for (const e of j.exams
  .filter((e) => e.visual_humano === "BLOQUEANTE")
  .sort((a, b) => b.anio - a.anio || a.file.localeCompare(b.file))) {
  body.push(`- \`${e.file}\` (${e.cat}, ${e.anio}): ${e.notas || ""}`);
}
body.push("");
body.push("### FIX-FIGURA");
body.push("");
for (const e of j.exams
  .filter((e) => e.visual_humano === "FIX-FIGURA")
  .sort((a, b) => b.anio - a.anio || a.file.localeCompare(b.file))) {
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
const oktex = j.exams.filter((e) => e.visual_humano === "OK-TEXTO");
const byYear = {};
for (const e of oktex) {
  const k = e.cat + ":" + e.anio;
  byYear[k] = (byYear[k] || 0) + 1;
}
body.push("### OK-TEXTO por año");
body.push("");
body.push("| cat:año | n |");
body.push("|---------|--:|");
for (const k of Object.keys(byYear).sort().reverse()) {
  body.push(`| ${k} | ${byYear[k]} |`);
}
body.push("");
body.push(`Total OK-TEXTO: **${oktex.length}**`);
body.push("");
body.push("### Limitaciones del resto semi-auto");
body.push("");
body.push("- No re-renderiza cada PDF viejo escaneado (muchos count=0).");
body.push("- No valida fidelidad numérica de cada enunciado vs facsímil.");
body.push(
  "- Un OK-TEXTO puede esconder error de contenido puntual; el fix sprint debe muestrear."
);
body.push(
  "- Lote 1 humano (2023–2025) sigue siendo la referencia de calidad de método."
);
body.push("");
body.push("### Backlog de fix global");
body.push("");
body.push("1. Completar MD 2025 incompletos (Lote 1).");
body.push("2. Re-resolver todos los BLOQUEANTE (VERIFICAR + incompletos).");
body.push("3. Motor SVG para todas las figuras huérfanas listadas.");
body.push("4. Agregar figura: + dibujo a menciones sin campo.");
body.push("5. Paso N en explicaciones corridas (parciales/2025).");
body.push("6. Spot-check UI 2023-1op-1 (mejor del banco).");
body.push("");
body.push(
  "*Fin auditoría: inventario + Lote1 humano + resto semi-auto. Sin cambios de contenido.*"
);
body.push("");

let md = fs.readFileSync(MD_PATH, "utf8");
md = md.replace(/\n## 9\. Auditoría completa[\s\S]*$/, "\n");
const lines = md.split(/\n/).map((line) => {
  for (const [file, r] of Object.entries(results)) {
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
fs.writeFileSync(
  MD_PATH,
  lines.join("\n").replace(/\n+$/, "\n") + "\n" + body.join("\n")
);

console.log("SUMMARY", summary);
console.log("new audited", Object.keys(results).length);
console.log(
  "PENDIENTE left",
  j.exams.filter((e) => e.visual_humano === "PENDIENTE").length
);

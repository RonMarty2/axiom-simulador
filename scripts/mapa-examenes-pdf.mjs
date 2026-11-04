// Enlaza cada examen del banco (data/examenes/umss) con su PDF en "examenes pasados/"
// por (año, tipo, gestión). Solo cuenta y reporta; no modifica nada. Uso:
//   node scripts/mapa-examenes-pdf.mjs            -> resumen
//   node scripts/mapa-examenes-pdf.mjs --json     -> mapa completo en JSON
// Ingeniería (FCYT) se enlaza con heurística de nombres; lo ambiguo queda como
// "multiple" o "sin_pdf" para resolverlo mirando el PDF (INVENTARIO.md regla FCYT).
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const RAIZ = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const BANCO = join(RAIZ, "data/examenes/umss");
const PDFS = join(RAIZ, "examenes pasados");
const VERIF = join(RAIZ, "data/registro-verificacion.json");
const verif = existsSync(VERIF) ? JSON.parse(readFileSync(VERIF, "utf8")) : {};

const ordinal = { primer: 1, primera: 1, "1ra": 1, "1er": 1, segundo: 2, segunda: 2, "2da": 2, "2do": 2, tercer: 3, tercera: 3, "3ra": 3, cuarto: 4 };

// Clave canónica de un examen del banco de ingeniería: "año|tipo|gestion"
function claveBanco(nombre) {
  const n = nombre.replace(/\.md$/, "");
  const m = n.match(/^(\d{4})-(.+?)-(\d)-(\d{4})/);
  if (!m) return null;
  let [, anio, tipo, gest] = m;
  let curso = "";
  if (tipo.startsWith("2curso-")) { curso = "c2"; tipo = tipo.slice(7); }
  const t = { "1op": "op1", "2op": "op2", "3op": "op3", Uop: "unica", unica: "unica", final: "final" }[tipo]
    ?? (tipo.match(/^parcial(\d)$/) ? "parcial" + tipo.slice(-1) : tipo);
  return `${anio}|${curso}${t}|${gest}`;
}

// Claves posibles de un PDF de FCYT (puede dar más de una si el nombre es ambiguo)
function clavesPdf(archivo) {
  const s = archivo.replace(/\.pdf$/i, "").replace(/^\d+_/, "");
  const low = s.toLowerCase();
  const claves = [];
  const anios = [...low.matchAll(/(20\d\d|19\d\d)/g)].map((x) => x[1]);
  if (!anios.length) return claves;
  const anio = anios[0];
  const mix = (tipo, g) => claves.push(`${anio}|${tipo}|${g}`);

  // ExamenAdmision{Primera|Segunda|Unica}Opcion{g}-{año}
  let m = low.match(/examenadmision(primera|primer|segunda|unica)opcion(\d)-(\d{4})/);
  if (m) { mix({ primera: "op1", primer: "op1", segunda: "op2", unica: "unica" }[m[1]], m[2]); return claves; }
  // 1ra-op-1-2023 / 2da-op-2-2022 / 3ra-op / 1-op-1-2023
  m = low.match(/^(1ra|2da|3ra|1|2|3)-op-(\d)-(\d{4})/);
  if (m) { mix("op" + m[1][0], m[2]); return claves; }
  // 2023-1-1op
  m = low.match(/^(\d{4})-(\d)-(\d)op/);
  if (m) { mix("op" + m[3], m[2]); return claves; }
  // {Primer|Segundo|Tercer|Cuarto}Parcial[{Primer|Segundo}]Curso{Propedeutico|Pre-Facultativo}{g}-{año}
  m = low.match(/^(primer|segundo|tercer|cuarto)parcial(primer|segundo)?curso[a-z-]*?(\d)-(\d{4})/);
  if (m) { mix((m[2] === "segundo" ? "c2" : "") + "parcial" + ordinal[m[1]], m[3]); return claves; }
  // 1erparcial / 2doparcial ... ; final ; unica
  m = low.match(/^(1er|2do|3er)parcial(\d)?-?(\d)?/);
  if (m) { const g = m[2] ?? m[3]; mix("parcial" + m[1][0], g ?? "?"); return claves; }
  if (/final/.test(low)) { mix("final", low.match(/(\d)-(\d{4})/)?.[1] ?? "?"); return claves; }
  if (/unica/.test(low)) { mix("unica", low.match(/(\d)-(\d{4})/)?.[1] ?? "?"); return claves; }
  return claves;
}

const pdfsFcyt = readdirSync(join(PDFS, "FCYT")).filter((f) => /\.pdf$/i.test(f));
const indice = new Map();
const pdfSinClave = [];
for (const f of pdfsFcyt) {
  const cs = clavesPdf(f);
  if (!cs.length) pdfSinClave.push(f);
  for (const c of cs) (indice.get(c) ?? indice.set(c, []).get(c)).push(f);
}

const filas = [];
for (const fac of readdirSync(BANCO)) {
  for (const f of readdirSync(join(BANCO, fac)).filter((x) => x.endsWith(".md"))) {
    const clave = `${fac}/${f.replace(/\.md$/, "")}`;
    const registrado = clave in verif;
    let estado = "revisar_a_mano", pdf = [];
    if (fac === "ingenieria") {
      const k = claveBanco(f);
      pdf = (k && indice.get(k)) || [];
      estado = pdf.length === 1 ? "pdf_unico" : pdf.length > 1 ? "multiple" : "sin_pdf";
      filas.push({ clave, fac, k, registrado, estado, pdf });
    } else {
      filas.push({ clave, fac, registrado, estado: "otra_facultad", pdf });
    }
  }
}

if (process.argv.includes("--json")) {
  console.log(JSON.stringify(filas, null, 2));
} else {
  const sin = filas.filter((x) => !x.registrado);
  const cuenta = (arr, f) => arr.reduce((a, x) => ((a[f(x)] = (a[f(x)] || 0) + 1), a), {});
  console.log("Banco total:", filas.length, "| registrados:", filas.length - sin.length, "| sin registro:", sin.length);
  console.log("Sin registro por facultad/estado:", cuenta(sin, (x) => `${x.fac}:${x.estado}`));
  console.log("PDF de FCYT:", pdfsFcyt.length, "| sin clave interpretable:", pdfSinClave.length);
  if (pdfSinClave.length) console.log("  ", pdfSinClave.join(", "));
  const noAbs = sin.filter((x) => x.estado === "sin_pdf" || x.estado === "multiple");
  for (const x of noAbs) console.log(`  ${x.estado.padEnd(8)} ${x.clave}  [${x.k}] ${x.pdf.join(" | ")}`);
}

// Extrae del PDF maestro de Medicina un BORRADOR por examen (preguntas y afirmaciones,
// más la clave oficial cuando tiene capa de texto) y reporta los conteos.
// No escribe nada en data/: el borrador va a --salida (por defecto, la carpeta temporal).
// Uso:  node scripts/medicina/extraer.mjs [id-de-examen] [--render-claves] [--salida=dir]
// Requiere `pdftotext` y `pdftoppm` (poppler) en el PATH. Solo corre donde están los PDF.
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const mapa = JSON.parse(readFileSync(new URL("./mapa-pdf.json", import.meta.url), "utf8"));
const args = process.argv.slice(2);
const soloId = args.find((a) => !a.startsWith("--"));
const renderClaves = args.includes("--render-claves");
const salida = (args.find((a) => a.startsWith("--salida=")) ?? "").slice(9) || join(tmpdir(), "axiom-medicina");
mkdirSync(salida, { recursive: true });

const paginas = (pdf, desde, hasta) =>
  execFileSync("pdftotext", ["-enc", "UTF-8", "-layout", "-f", String(desde), "-l", String(hasta), pdf, "-"], {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });

const RUIDO = /PREPARATORIA WILLIAM OSLER|WhatsApp:\s*77445856/g;
const limpiar = (t) => t.replace(RUIDO, "").replace(/\f/g, "\n");

// Las preguntas vienen numeradas 1..100 en orden: solo se acepta un número que siga a la
// última pregunta (con hasta 4 de salto, porque el PDF fuente a veces pierde una), así un
// "12." suelto dentro de una afirmación no parte la pregunta en dos.
function parsearPreguntas(texto) {
  const lineas = texto.split(/\r?\n/);
  const preguntas = [];
  let esperado = 1;
  let actual = null;
  const agregar = (texto) => actual.afirmaciones.push(texto);
  for (const cruda of lineas) {
    const l = cruda.trim();
    if (!l) continue;
    // "1.-", "2-", "3. -": con guion es siempre afirmación (la numeración de pregunta no lo lleva).
    const conGuion = l.match(/^([1-3])\s*(?:\.\s*-|-)\s*(.*)$/);
    if (actual && conGuion && Number(conGuion[1]) === actual.afirmaciones.length + 1) {
      agregar(conGuion[2]);
      continue;
    }
    const m = l.match(/^(\d{1,3})\s*[.)]\s*(.*)$/);
    const n = m ? Number(m[1]) : 0;
    // "1. Texto" sin guion: afirmación si es la que sigue. Si además coincide con el número de la
    // próxima pregunta (la 3 tras una de dos afirmaciones) se decide mirando la línea siguiente:
    // una pregunta nueva va seguida de su afirmación 1.
    let plana = Boolean(actual && m && n <= 3 && n === actual.afirmaciones.length + 1);
    if (plana && n === esperado) {
      let k = lineas.indexOf(cruda) + 1;
      while (k < lineas.length && !lineas[k].trim()) k++;
      const sigue = (lineas[k] ?? "").trim();
      if (/^1\s*(?:\.\s*-|-|\.)\s*\S/.test(sigue) || /^1\s*(?:\.\s*-|-|\.)/.test(m[2])) plana = false;
    }
    if (plana) {
      agregar(m[2]);
      continue;
    }
    if (m && n >= esperado && n <= esperado + 4 && n <= 100) {
      actual = { numero: n, enunciado: m[2], afirmaciones: [] };
      preguntas.push(actual);
      esperado = n + 1;
      // "41. 1.- ..." o "18. 1-El ...": la afirmación 1 viene en la misma línea que el número.
      const inline = actual.enunciado.match(/^1\s*(?:\.\s*-|-|\.)\s*(.*)$/);
      if (inline) {
        actual.enunciado = "";
        agregar(inline[1]);
      }
      continue;
    }
    if (!actual) continue;
    if (actual.afirmaciones.length) actual.afirmaciones[actual.afirmaciones.length - 1] += " " + l;
    else actual.enunciado += (actual.enunciado ? " " : "") + l;
  }
  return preguntas;
}

// Clave de texto: pares "N. X" después del marcador PATRON. El orden por columnas del layout
// no importa porque se indexa por número.
function parsearClave(texto) {
  const i = texto.search(/PATR[OÓ]N(?![A-Za-zÀ-ÿ])/);
  if (i < 0) return {};
  const clave = {};
  for (const m of texto.slice(i).matchAll(/(?<![\d.])(\d{1,3})\s*[.)]\s*([A-E](?:\s*(?:-|o)\s*[A-E])?)(?![A-Za-z])/g)) {
    const n = Number(m[1]);
    if (n >= 1 && n <= mapa.preguntas_esperadas && !(n in clave)) clave[n] = m[2].replace(/\s+/g, "");
  }
  return clave;
}

const pdf = mapa.pdf;
let problemas = 0;
for (const ex of mapa.examenes) {
  if (soloId && ex.id !== soloId) continue;
  const [d, h] = ex.paginas;
  const todo = limpiar(paginas(pdf, d, h));
  const corte = todo.search(/PATR[OÓ]N(?![A-Za-zÀ-ÿ])/);
  const cuerpo = corte >= 0 ? todo.slice(0, corte) : todo;
  const preguntas = parsearPreguntas(cuerpo);
  const clave = ex.clave === "texto" ? parsearClave(todo) : {};
  const vistas = new Set(preguntas.map((p) => p.numero));
  const ausentes = Array.from({ length: mapa.preguntas_esperadas }, (_, i) => i + 1).filter((n) => !vistas.has(n));
  const sinAfirmaciones = preguntas.filter((p) => p.afirmaciones.length < 2).map((p) => p.numero);
  const conClave = preguntas.filter((p) => clave[p.numero]).length;
  const ok = ausentes.length === 0 && sinAfirmaciones.length === 0 && (ex.clave !== "texto" || conClave === preguntas.length);
  if (!ok) problemas++;
  writeFileSync(join(salida, `${ex.id}.json`), JSON.stringify({ ...ex, ausentes, preguntas, clave }, null, 2));
  console.log(
    `${ok ? "OK " : "REV"} ${ex.id.padEnd(16)} preguntas ${String(preguntas.length).padStart(3)}/100` +
      `  clave ${ex.clave === "texto" ? `${conClave}/100 (texto)` : "en imagen (vista)"}` +
      (sinAfirmaciones.length ? `  con <2 afirmaciones: ${sinAfirmaciones.join(",")}` : ""),
  );
  if (ausentes.length) console.log(`     sin texto en el PDF: ${ausentes.join(",")}`);
  if (renderClaves && ex.clave === "imagen") {
    execFileSync("pdftoppm", ["-r", "130", "-png", "-f", String(h), "-l", String(h), pdf, join(salida, `${ex.id}-clave`)]);
  }
}
console.log(`\nBorradores en ${salida}. ${problemas ? problemas + " examen(es) para revisar a mano." : "Todo cuadra."}`);

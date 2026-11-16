// Mide la letra más chica de cada dibujo SVG de lecciones y láminas tal como
// se vería en un celular de 360 px (regla 6 de agentes/auditor-pantallas-movil.md).
// Solo lee; no cambia nada.
//
// Cuenta: letra en pantalla = fontSize × escala, con
// escala = min(ANCHO / ancho del viewBox, alto de la Pizarra / alto del viewBox).
// ANCHO = 312 px: lo que ocupa un dibujo a 360 px (medido con Playwright el 16-11
// en la lección de estadística). Es una estimación; un dibujo fuera de
// <Pizarra> o con otro contenedor puede diferir.
//
// Uso: node scripts/medir-letra-dibujos.mjs [--min 11] [--json salida.json]
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const args = process.argv.slice(2);
const MIN = Number(args[args.indexOf("--min") + 1]) || 11;
const SALIDA = args.includes("--json") ? args[args.indexOf("--json") + 1] : null;
const ANCHO = 312;

function paginas(dir) {
  const out = [];
  for (const n of readdirSync(dir)) {
    const p = join(dir, n);
    if (statSync(p).isDirectory()) out.push(...paginas(p));
    else if (n === "page.tsx") out.push(p);
  }
  return out;
}

const filas = [];
for (const raiz of ["src/app/aprende", "src/app/laminas"]) {
  for (const f of paginas(raiz)) {
    const s = readFileSync(f, "utf8");
    const re = /<svg\b[^>]*viewBox="(-?[\d.]+) (-?[\d.]+) ([\d.]+) ([\d.]+)"/g;
    let m;
    while ((m = re.exec(s))) {
      const W = +m[3], H = +m[4];
      if (W < 100) continue; // íconos y marcadores
      const fin = s.indexOf("</svg>", m.index);
      const cuerpo = s.slice(m.index, fin < 0 ? undefined : fin);
      const tamanos = [...cuerpo.matchAll(/font-?[sS]ize(?:=\{|="|:\s*|=)\s*"?([\d.]+)/g)].map((x) => +x[1]);
      if (!tamanos.length) continue;
      const antes = s.slice(Math.max(0, m.index - 300), m.index);
      const altos = [...antes.matchAll(/alto=\{(\d+)\}/g)];
      const alto = altos.length ? +altos[altos.length - 1][1] : null;
      const escala = Math.min(ANCHO / W, alto ? alto / H : Infinity);
      const linea = s.slice(0, m.index).split("\n").length;
      const fmin = Math.min(...tamanos);
      filas.push({
        archivo: f.replace(/\\/g, "/"),
        linea, viewBox: `${W}x${H}`,
        letraMinViewBox: fmin,
        letraMinPx: +(fmin * escala).toFixed(1),
      });
    }
  }
}

const malos = filas.filter((r) => r.letraMinPx < MIN);
const porArchivo = new Map();
for (const r of malos) {
  const a = porArchivo.get(r.archivo) ?? { dibujos: 0, peor: 99 };
  a.dibujos++; a.peor = Math.min(a.peor, r.letraMinPx);
  porArchivo.set(r.archivo, a);
}
const orden = [...porArchivo].sort((a, b) => a[1].peor - b[1].peor);
console.log(`Dibujos medidos: ${filas.length} · con letra < ${MIN} px a 360: ${malos.length} · en ${porArchivo.size} archivos`);
for (const [a, v] of orden) console.log(`${v.peor.toFixed(1).padStart(5)} px  ${String(v.dibujos).padStart(3)} dibujos  ${a}`);
if (SALIDA) writeFileSync(SALIDA, JSON.stringify({ min: MIN, ancho: ANCHO, filas }, null, 2));

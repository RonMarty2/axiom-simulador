// Vuelca a texto plano los pasos de una animacion (todos sus casos), sin colores ni marcas, para leerla sin abrir el navegador.
//   node src/app/prueba-animacion/volcar.ts <tipo>            casos dificiles (casos.ts) y casos del registro (huellas.ts)
//   node src/app/prueba-animacion/volcar.ts <tipo> > salida.txt
// Una linea por cosa: T<n> texto, PQ porque, RG regla, E<n> estado (fichas separadas por |; las etiquetas `debajo` entre {_ }).
import { CASOS_POR_TIPO } from "./casos.ts";
import { construir, type Tipo } from "./construir.ts";
import type { Demo, Ficha } from "./datos.ts";
import { CASOS } from "./huellas.ts";

const limpio = (s: string) =>
  s
    .replace(/\\textcolor\{[^}]*\}/g, "")
    .replace(/\\(?:text|mathrm)\{([^}]*)\}/g, "$1")
    .replace(/[{}§]/g, "");
const estado = (e: Ficha[]) => e.map((f) => (f.debajo ? `${limpio(f.tex)}{_${limpio(f.debajo)}}` : limpio(f.tex))).join(" | ");

function volcar(titulo: string, d: Demo) {
  console.log(`\n##### ${titulo}\nINTRO: ${limpio(d.intro)}`);
  console.log(`E0: ${estado(d.estados[0])}`);
  d.transiciones.forEach((t, i) => {
    console.log(`T${i + 1}: ${limpio(t.texto)}\n   PQ: ${limpio(t.porque)}${t.regla ? `\n   RG: ${limpio(t.regla)}` : ""}\n   E${i + 1}: ${estado(d.estados[i + 1])}`);
  });
}

const tipo = process.argv[2];
if (!tipo) {
  console.log("uso: node src/app/prueba-animacion/volcar.ts <tipo>\ntipos de casos.ts:", Object.keys(CASOS_POR_TIPO).join(", "), "\ntipos del registro:", Object.keys(CASOS).join(", "));
  process.exit(0);
}
const dificiles = (CASOS_POR_TIPO as Record<string, { nombre: string; v: string[] }[]>)[tipo] ?? [];
for (const c of dificiles) {
  const r = construir(tipo as Tipo, c.v as never);
  if ("demo" in r) volcar(`${tipo} / ${c.nombre}`, r.demo);
}
const id = tipo === "raizResto" ? "raiz-con-resto" : tipo === "molesAtomos" ? "moles-atomos" : tipo;
(CASOS[id]?.() ?? []).forEach((d, k) => volcar(`${id} / registro #${k}`, d));

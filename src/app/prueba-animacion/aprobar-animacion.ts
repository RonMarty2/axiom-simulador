// Anota el visto bueno de Ronald a un tipo de animacion (se guarda la huella ACTUAL).
//   node src/app/prueba-animacion/aprobar-animacion.ts <tipo> [<tipo> ...]   aprueba (con TODOS sus casos de casos.ts)
//   node src/app/prueba-animacion/aprobar-animacion.ts --quitar <tipo>      vuelve a revision
import { readFileSync, writeFileSync } from "node:fs";
import { huellaVistoBueno } from "./huellas.ts";
import { CASOS_POR_TIPO } from "./casos.ts";
import type { Tipo } from "./construir.ts";

const RUTA = new URL("../../../data/registro-visto-bueno.json", import.meta.url);
const reg = JSON.parse(readFileSync(RUTA, "utf8"));
const args = process.argv.slice(2);
const quitar = args[0] === "--quitar";
const ids = quitar ? args.slice(1) : args;
if (ids.length === 0) {
  console.log(`tipos: ${Object.keys(CASOS_POR_TIPO).join(", ")}`);
  process.exit(1);
}
for (const id of ids) {
  if (!(id in CASOS_POR_TIPO)) throw new Error(`${id}: no existe. Tipos: ${Object.keys(CASOS_POR_TIPO).join(", ")}`);
  if (quitar) delete reg.generadores[id];
  else reg.generadores[id] = { huella: huellaVistoBueno(id as Tipo), fecha: new Date().toISOString().slice(0, 10) };
}
writeFileSync(RUTA, JSON.stringify(reg, null, 2) + "\n");
console.log(`${quitar ? "vuelven a revision" : "aprobados"}: ${ids.join(", ")}`);

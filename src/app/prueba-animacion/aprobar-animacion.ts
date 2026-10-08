// Anota el visto bueno de Ronald a un tipo de animacion (se guarda la huella ACTUAL).
//   node src/app/prueba-animacion/aprobar-animacion.ts <id> [<id> ...]     aprueba
//   node src/app/prueba-animacion/aprobar-animacion.ts --quitar <id>       vuelve a revision
import { readFileSync, writeFileSync } from "node:fs";
import { huella, IDS } from "./huellas.ts";

const RUTA = new URL("../../../data/registro-visto-bueno.json", import.meta.url);
const reg = JSON.parse(readFileSync(RUTA, "utf8"));
const args = process.argv.slice(2);
const quitar = args[0] === "--quitar";
const ids = quitar ? args.slice(1) : args;
if (ids.length === 0) {
  console.log(`ids: ${IDS.join(", ")}`);
  process.exit(1);
}
for (const id of ids) {
  if (!IDS.includes(id)) throw new Error(`${id}: no existe. Ids: ${IDS.join(", ")}`);
  if (quitar) delete reg.generadores[id];
  else reg.generadores[id] = { huella: huella(id), fecha: new Date().toISOString().slice(0, 10) };
}
writeFileSync(RUTA, JSON.stringify(reg, null, 2) + "\n");
console.log(`${quitar ? "vuelven a revision" : "aprobados"}: ${ids.join(", ")}`);

// Lista lo que rompe las reglas de pasos (hallazgosPasos en estilo.ts), tipo por tipo.
//   node src/app/prueba-animacion/medir-reglas.ts            resumen por tipo
//   node src/app/prueba-animacion/medir-reglas.ts mruv       detalle de un tipo (casos dificiles y casos del registro)
// Cuando un tipo llega a 0, baja su tope en TRINQUETE_* de estilo.test.ts.
import { CASOS_POR_TIPO } from "./casos.ts";
import { construir, type Tipo } from "./construir.ts";
import { hallazgosPasos } from "./estilo.ts";
import { CASOS } from "./huellas.ts";

const quiero = process.argv[2];
const dificiles: Record<string, string[]> = {};
for (const [tipo, casos] of Object.entries(CASOS_POR_TIPO) as [Tipo, (typeof CASOS_POR_TIPO)[Tipo]][]) {
  dificiles[tipo] = casos.flatMap((c) => {
    const r = construir(tipo, c.v);
    return "demo" in r ? hallazgosPasos(r.demo, `${tipo}/${c.nombre}`) : [];
  });
}
const registro: Record<string, string[]> = {};
for (const [id, demos] of Object.entries(CASOS)) registro[id] = demos().flatMap((d, k) => hallazgosPasos(d, `${id}#${k}`));

for (const [titulo, grupo] of [["casos dificiles", dificiles], ["casos del registro", registro]] as const) {
  console.log(`== ${titulo} ==`);
  for (const [k, l] of Object.entries(grupo)) {
    if (quiero ? k === quiero : l.length) console.log(`${k.padEnd(22)} ${l.length}`);
    if (quiero === k) for (const m of l) console.log(`   ${m}`);
  }
}

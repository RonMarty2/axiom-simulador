// Cobertura de animaciones: que operaciones tienen animacion y que pasos NO se mueven.
//   node src/app/prueba-animacion/cobertura.ts            -> tabla por tipo + huecos
//   node src/app/prueba-animacion/cobertura.ts --huecos   -> solo los huecos (sale con codigo 1 si hay)
// Un HUECO es un paso cuyo texto dice que se hace una operacion (sumamos, dividimos, tachamos, reemplazamos...)
// pero que no mueve nada: ni fusion, ni brote, ni visita. Solo "resalta", y el alumno no ve la operacion.
// Lo usa el agente animador-resolucion (tabla "Que vigila que") y lo corre el test cobertura.test.ts.
import { construir, type Tipo } from "./construir.ts";
import { CASOS_POR_TIPO } from "./casos.ts";
import { aplanar, type Demo } from "./datos.ts";

/** verbos que anuncian una operacion que se tiene que VER */
export const VERBOS_OPERACION = /\b(sumamos|restamos|multiplicamos|dividimos|tachamos|se tachan|calculamos|reemplazamos|sustituimos|simplificamos|elevamos|juntamos|pasamos)\b/i;

export interface Hueco {
  tipo: string;
  caso: string;
  paso: number;
  texto: string;
}

/** pasos de un demo que dicen operar pero no mueven nada */
export function huecosDe(d: Demo): { paso: number; texto: string }[] {
  const huecos: { paso: number; texto: string }[] = [];
  d.transiciones.forEach((t, i) => {
    // mover tambien es que una pieza que sigue (mismo id) cambie de lugar o de signo: el arrastre de "pasar al otro lado"
    const a = aplanar(d.estados[i]);
    const b = aplanar(d.estados[i + 1]);
    const comunes = a.filter((f) => b.some((g) => g.id === f.id)).map((f) => f.id);
    const ordenA = comunes.join();
    const ordenB = b.filter((f) => comunes.includes(f.id)).map((f) => f.id).join();
    const cambia = a.some((f) => b.find((g) => g.id === f.id && g.tex !== f.tex)) || ordenA !== ordenB;
    const mueve = t.fusiones.length > 0 || (t.brotes ?? []).length > 0 || (t.visitas ?? []).length > 0 || cambia;
    if (!mueve && VERBOS_OPERACION.test(t.texto)) huecos.push({ paso: i, texto: t.texto });
  });
  return huecos;
}

/** operaciones con animacion: la `regla` de cada paso es la operacion que se anima */
export function operacionesDe(d: Demo): Set<string> {
  return new Set(d.transiciones.flatMap((t) => (t.regla ? [t.regla] : [])));
}

export function recorrer() {
  const huecos: Hueco[] = [];
  const operaciones: Record<string, Set<string>> = {};
  for (const [tipo, casos] of Object.entries(CASOS_POR_TIPO)) {
    operaciones[tipo] = new Set();
    for (const c of casos) {
      const r = construir(tipo as Tipo, c.v);
      if (!("demo" in r)) continue;
      for (const h of huecosDe(r.demo)) huecos.push({ tipo, caso: c.nombre, paso: h.paso, texto: h.texto });
      for (const o of operacionesDe(r.demo)) operaciones[tipo].add(o);
    }
  }
  return { huecos, operaciones };
}

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, "/").split("/").pop() as string)) {
  const solo = process.argv.includes("--huecos");
  const { huecos, operaciones } = recorrer();
  if (!solo) {
    for (const [tipo, ops] of Object.entries(operaciones)) {
      console.log(`\n${tipo}: ${ops.size} operaciones animadas`);
      for (const o of ops) console.log(`   ${o}`);
    }
  }
  console.log(`\nHuecos (paso que dice operar y no mueve nada): ${huecos.length}`);
  for (const h of huecos) console.log(`  ${h.tipo} / ${h.caso} / paso ${h.paso + 1}: ${h.texto}`);
  if (solo && huecos.length > 0) process.exit(1);
}

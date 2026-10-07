// Paso 1 del mapa de temas: lee TODO data/examenes/umss con el parser REAL del
// banco (src/lib/axiom/banco-parser.ts) y vuelca lo que hace falta a un JSON.
// Solo lee; no modifica nada del banco.
// Uso (desde la raiz): node scripts/analisis/extraer-banco.mjs [salida.json]
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { parseExamenMD } from "../../src/lib/axiom/banco-parser.ts";

const RAIZ = join(process.cwd(), "data", "examenes", "umss");
const salida = process.argv[2] ?? join(process.cwd(), "scripts", "analisis", "banco-extraido.json");
const examenes = [];
const errores = [];
for (const fac of readdirSync(RAIZ).sort()) {
  for (const f of readdirSync(join(RAIZ, fac)).filter((x) => x.endsWith(".md")).sort()) {
    try {
      const e = parseExamenMD(readFileSync(join(RAIZ, fac, f), "utf8"));
      examenes.push({
        archivo: f.replace(/\.md$/, ""),
        id: e.id,
        facultad: e.facultad,
        anio: e.anio,
        categoria: e.categoria ?? null,
        titulo: e.titulo ?? null,
        total_declarado: e.total_preguntas,
        ponderacion: e.ponderacion,
        secciones_pendientes: e.secciones_pendientes ?? null,
        faltantes: (e.faltantes ?? []).map((x) => x.numero),
        preguntas: e.preguntas.map((p) => ({
          id: p.id,
          n: Number(p.id.slice(-3)),
          area: p.area ?? null,
          tema: p.tema ?? null,
          tiene_afirmaciones: Array.isArray(p.afirmaciones),
        })),
      });
    } catch (err) {
      errores.push({ archivo: f, error: String(err) });
    }
  }
}
writeFileSync(salida, JSON.stringify({ examenes, errores }));
console.log(`${examenes.length} examenes leidos, ${errores.length} con error de parseo`);

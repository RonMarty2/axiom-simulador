import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { construirFigura, idsDeFiguras } from "./definiciones.ts";

// Cada figura lleva sus propias verificaciones adentro (`verificarAngulo`,
// `verificarDistancia`): si el dibujo no cumple lo que sus etiquetas dicen, la
// construcción TIRA en vez de mostrar algo que enseñe mal.
//
// El problema es que esas verificaciones solo corren cuando la figura se
// construye, y hasta el 18-sep nada la construía fuera de la app: el único que
// las disparaba era el alumno al abrir la pregunta. Y `FiguraExamen` llama a
// `construirFigura` sin try/catch, así que una figura rota no se veía fea, le
// rompía la pantalla.
//
// O sea: 104 redes de seguridad instaladas y ninguna enchufada. Esto las
// enchufa. Es el mismo agujero que el de los 14 enunciados vacíos (bitácora
// §7): el chequeo existía, nadie lo corría, y lo encontró alguien de casualidad.

describe("figuras de examen", () => {
  const IDS = idsDeFiguras();

  test("hay figuras que revisar", () => {
    // Cordura: si el registro deja de exportarse o queda vacío, este test avisa
    // en vez de dar por buenas cero figuras.
    assert.ok(IDS.length > 100, `se esperaban más de 100 figuras, hay ${IDS.length}`);
  });

  test("todas se construyen sin romper sus propias verificaciones", () => {
    const rotas: string[] = [];
    for (const id of IDS) {
      try {
        const f = construirFigura(id);
        if (!f) {
          rotas.push(`${id}: construirFigura devolvió null`);
          continue;
        }
        if (!(f.ancho > 0) || !(f.alto > 0)) rotas.push(`${id}: mide ${f.ancho}x${f.alto}`);
        if (f.elementos.length === 0) rotas.push(`${id}: no dibuja ningún elemento`);
      } catch (err) {
        rotas.push(`${id}: ${err instanceof Error ? err.message : String(err)}`);
      }
    }
    assert.deepEqual(rotas, [], `figuras que no se pueden dibujar:\n${rotas.join("\n")}`);
  });

  test("toda figura que el banco declara se puede construir", () => {
    // El otro trinquete (`el banco no pide figuras nuevas sin dibujar`) mira si
    // el id está ESCRITO en el registro. Este mira si además se puede DIBUJAR,
    // que no es lo mismo.
    const RAIZ = join(process.cwd(), "data", "examenes", "umss");
    if (!existsSync(RAIZ)) return;
    const declaradas = new Set<string>();
    for (const facultad of readdirSync(RAIZ)) {
      const dir = join(RAIZ, facultad);
      for (const archivo of readdirSync(dir).filter((f) => f.endsWith(".md"))) {
        const texto = readFileSync(join(dir, archivo), "utf8");
        for (const bloque of texto.split(/^---\s*$/m)) {
          const m = bloque.match(/^figura:\s*([a-z0-9][a-z0-9-]*)\s*$/im);
          if (!m) continue;
          if (/<svg[\s>]/i.test(bloque)) continue;   // trae su propio dibujo
          declaradas.add(m[1]);
        }
      }
    }
    assert.ok(declaradas.size > 50, `se esperaban decenas de figuras declaradas, hay ${declaradas.size}`);

    const fallan: string[] = [];
    for (const id of declaradas) {
      try {
        if (!construirFigura(id)) fallan.push(`${id}: no está en el registro`);
      } catch (err) {
        fallan.push(`${id}: ${err instanceof Error ? err.message : String(err)}`);
      }
    }
    assert.deepEqual(fallan, [], `el banco declara figuras que no se dibujan:\n${fallan.join("\n")}`);
  });
});

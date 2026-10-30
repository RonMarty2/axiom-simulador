import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { construir, type Tipo } from "./construir.ts";
import { CASOS_POR_TIPO } from "./casos.ts";
import { aplanar } from "./datos.ts";
import { AIRE_MIN, cajaDeMarca, marcasDe, tieneContenido } from "./marcas.ts";

// La pastilla naranja vacia (revision por agentes, 29-oct): la marca de un `salto` de renglon o de una pieza sin nada visible.
describe("marcas: nunca se marca una pieza sin contenido", () => {
  test("ningun caso de ningun tipo marca un salto ni una pieza vacia", () => {
    let saltosEnDesde = 0;
    for (const [tipo, casos] of Object.entries(CASOS_POR_TIPO)) {
      for (const c of casos) {
        const r = construir(tipo as Tipo, c.v);
        assert.ok("demo" in r);
        r.demo.transiciones.forEach((t, i) => {
          const fichas = new Map(aplanar(r.demo.estados[i]).map((f) => [f.id, f]));
          for (const id of marcasDe(t, r.demo.estados[i])) {
            const f = fichas.get(id);
            assert.ok(!f || tieneContenido(f), `${tipo} / ${c.nombre} / paso ${i + 2}: se marca «${id}», que no tiene nada visible`);
          }
          saltosEnDesde += t.fusiones.flatMap((f) => f.desde).filter((id) => fichas.get(id)?.salto).length;
        });
      }
    }
    // los generadores SI ponen saltos en `desde` (la conservacion lo pide): si dejara de pasar, este test ya no vigila nada
    assert.ok(saltosEnDesde > 0, "ningun salto en desde: el test quedo sin casos");
  });

  test("raiz / exacta paso 12: el salto Sg se va con la fusion pero no se marca", () => {
    const r = construir("raiz", ["2", "4", "2"]);
    assert.ok("demo" in r);
    const t = r.demo.transiciones[10];
    assert.ok(t.fusiones.some((f) => f.desde.includes("Sg")));
    assert.ok(!marcasDe(t, r.demo.estados[10]).includes("Sg"));
  });

  test("Fusion.tsx toma las marcas de marcasDe y no pinta marca en piezas sin contenido", () => {
    const src = readFileSync(new URL("./Fusion.tsx", import.meta.url), "utf8");
    assert.match(src, /marcasDe\(t, demo\.estados\[i\]\)/);
    assert.ok(!/t\.fusiones\.flatMap\(\(f\) => \(f\.ancla/.test(src), "Fusion.tsx vuelve a armar la lista de marcas por su cuenta");
    // las dos formas de pintar una pieza (suelta e interna) filtran con tieneContenido
    assert.equal((src.match(/tieneContenido\(f\) && \(marcados\.includes\(f\.id\) \|\| !!f\.destacada\)/g) ?? []).length, 2);
  });
});

// Tercera revision visual (29-oct): la capsula tocaba la tinta, se montaba en la raya de un denominador y «x₂ = 2» destacada salia
// con tres alturas distintas. La cuenta de la caja vive en `cajaDeMarca`; el navegador solo le pasa lo medido.
describe("marcas: la capsula respira y no cruza la raya", () => {
  const fs = 20;
  const base = 100;
  // tintas aproximadas de «x», «=» y «2» a 20 px (alto de x ~0,43 em; el = en el eje; la cifra ~0,65 em)
  const x = { izq: 0, der: 11, arriba: base - 8.6, abajo: base };
  const igual = { izq: 0, der: 15, arriba: base - 7, abajo: base - 3 };
  const dos = { izq: 0, der: 10, arriba: base - 13, abajo: base };
  test("aire minimo por lado aunque se pida menos", () => {
    const c = cajaDeMarca([dos], { base, fs, px: 0, py: 0 })!;
    assert.ok(dos.izq - c.izq >= AIRE_MIN && c.der - dos.der >= AIRE_MIN);
    assert.ok(dos.arriba - c.arriba >= AIRE_MIN && c.abajo - dos.abajo >= AIRE_MIN);
  });
  test("x, = y 2 llevan la misma altura de capsula (renglon destacado parejo)", () => {
    const alto = (t: typeof x) => {
      const c = cajaDeMarca([t], { base, fs, px: 5, py: 3 })!;
      return [c.arriba, c.abajo];
    };
    assert.deepEqual(alto(x), alto(igual));
    assert.deepEqual(alto(x), alto(dos));
  });
  test("en un denominador no sube de la raya; en un numerador no baja", () => {
    const raya = base - 13 - 3; // raya 3 px sobre la cifra, como en `compuesta`
    const d = cajaDeMarca([dos], { base, fs, px: 3, py: 3, rayaArriba: raya })!;
    assert.ok(d.arriba > raya, `la capsula sube a ${d.arriba}, la raya termina en ${raya}`);
    const rayaAbajo = base + 3;
    const n = cajaDeMarca([dos], { base, fs, px: 3, py: 3, rayaAbajo })!;
    assert.ok(n.abajo < rayaAbajo);
  });
  test("un signo dibujado solo (parentesis alto, sin texto) usa su propio alto", () => {
    const paren = { izq: 0, der: 8, arriba: 50, abajo: 110 };
    const c = cajaDeMarca([paren], { base: null, fs, px: 3, py: 3 })!;
    assert.deepEqual([c.arriba, c.abajo], [47, 113]);
  });
  test("sin tinta no hay capsula", () => {
    assert.equal(cajaDeMarca([], { base, fs, px: 3, py: 3 }), null);
  });
});

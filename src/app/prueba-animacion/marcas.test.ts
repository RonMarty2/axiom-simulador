import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { construir, type Tipo } from "./construir.ts";
import { CASOS_POR_TIPO } from "./casos.ts";
import { aplanar } from "./datos.ts";
import { marcasDe, tieneContenido } from "./marcas.ts";

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

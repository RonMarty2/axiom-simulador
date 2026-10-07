import assert from "node:assert/strict";
import type { Demo, Ficha } from "./datos.ts";

// ids de las fichas y, en las fracciones con partes, de sus partes ("f2.n", "f2.d")
const idsConPartes = (e: Ficha[]) => new Set(e.flatMap((f) => (f.frac ? [f.id, f.id + ".n", f.id + ".d"] : [f.id])));

// Una animacion solo es confiable si cada transicion es coherente con los
// estados que une. Esto la comprueba; los tests de cada generador la corren
// sobre TODAS las combinaciones permitidas.
export function revisar(d: Demo, etiqueta: string) {
  assert.equal(d.estados.length, d.transiciones.length + 1, `${etiqueta}: estados y transiciones no encajan`);
  // todo generador (titulo vacio) muestra al menos una regla: la formula o propiedad que justifica la resolucion
  if (d.titulo === "") {
    const reglas = d.transiciones.filter((t) => t.regla);
    assert.ok(reglas.length > 0, `${etiqueta}: ningun paso muestra la regla que se usa`);
    for (const t of reglas) assert.ok(t.regla!.includes("$"), `${etiqueta}: la regla debe ir en LaTeX entre $...$`);
  }
  d.estados.forEach((e, i) => {
    const ids = e.map((f) => f.id);
    assert.equal(new Set(ids).size, ids.length, `${etiqueta}: ids repetidos en el estado ${i}`);
  });
  d.transiciones.forEach((t, i) => {
    const a = idsConPartes(d.estados[i]);
    const b = idsConPartes(d.estados[i + 1]);
    assert.ok(t.porque.trim().length > 0, `${etiqueta}: T${i} sin porque`);
    for (const br of t.brotes ?? []) {
      assert.ok(a.has(br.desde) && b.has(br.desde), `${etiqueta}: T${i} el origen del brote ${br.desde} debe seguir existiendo`);
      assert.ok(b.has(br.hacia) && !a.has(br.hacia), `${etiqueta}: T${i} el brote ${br.hacia} debe ser nuevo`);
    }
    for (const id of t.resaltar ?? []) {
      assert.ok(a.has(id) && b.has(id), `${etiqueta}: T${i} resaltar ${id} debe existir antes y despues`);
    }
    for (const f of t.fusiones) {
      for (const id of f.desde) {
        assert.ok(a.has(id), `${etiqueta}: T${i} desde ${id} no existe antes`);
        assert.ok(!b.has(id), `${etiqueta}: T${i} desde ${id} sigue existiendo despues`);
      }
      if (f.ancla) assert.ok(a.has(f.ancla) && b.has(f.ancla), `${etiqueta}: T${i} ancla ${f.ancla} no persiste`);
      const hs = f.hacia === null ? [] : Array.isArray(f.hacia) ? f.hacia : [f.hacia];
      for (const h of hs) {
        assert.ok(b.has(h), `${etiqueta}: T${i} hacia ${h} no existe despues`);
        assert.ok(!a.has(h), `${etiqueta}: T${i} hacia ${h} ya existia antes`);
      }
    }
    // una orden de LaTeX sin su barra invertida se vería como la palabra suelta ("cdot")
    for (const txt of [t.texto, t.porque, t.regla ?? "", ...d.estados[i].map((f) => f.tex)]) {
      assert.ok(!/(^|[^\\a-zA-Z])(cdot|tfrac|dfrac|frac|sqrt|text)\b/.test(txt), `${etiqueta}: T${i} tiene una orden de LaTeX sin barra: ${txt}`);
    }
    // el texto del alumno no usa "÷" ni fracciones con barra suelta
    for (const txt of [t.texto, t.porque]) {
      assert.ok(!txt.includes("÷"), `${etiqueta}: T${i} usa ÷`);
    }
  });
}

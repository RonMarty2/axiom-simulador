import assert from "node:assert/strict";
import { aplanar, hijas, type Demo, type Ficha } from "./datos.ts";
import { hallazgosEstilo } from "./estilo.ts";

// cuantos numeros calculados nuevos puede traer un solo paso (2 + 3 = 5 trae 1; una cuenta de varios terminos, mas)
const LIMITE_NUMEROS_NUEVOS = 2;

// ids de las fichas y, en las fracciones con partes, de sus partes ("f2.n", "f2.d")
const idsConPartes = (e: Ficha[]) => new Set(aplanar(e).flatMap((f) => (f.frac ? [f.id, f.id + ".n", f.id + ".d"] : [f.id])));

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
  // el texto del alumno (tuteo, sin guion largo, sin / ^ sqrt fuera de LaTeX) es obligatorio en todo generador
  assert.deepEqual(hallazgosEstilo(d, etiqueta, "texto"), [], `${etiqueta}: texto del alumno`);
  d.estados.forEach((e, i) => {
    const ids = e.map((f) => f.id);
    assert.equal(new Set(ids).size, ids.length, `${etiqueta}: ids repetidos en el estado ${i}`);
    // DOS NUMEROS PEGADOS SIN OPERADOR: `3` y `3` seguidos en un renglon se leen como 33 (Ronald, 8-oct: `3x` con x=3 dejaba `3 3`).
    // Una multiplicacion siempre muestra su operador. Un `salto` corta el renglon.
    for (let k = 1; k < e.length; k++) {
      const antes = e[k - 1];
      const ahora = e[k];
      if (antes.salto || ahora.salto || ahora.op || ahora.sup || antes.sup || antes.frac || ahora.frac) continue;
      assert.ok(!(/\d$/.test(antes.tex.trim()) && /^\d/.test(ahora.tex.trim())), `${etiqueta}: estado ${i} tiene dos numeros pegados sin operador (${antes.id} "${antes.tex}" y ${ahora.id} "${ahora.tex}")`);
    }
  });
  d.transiciones.forEach((t, i) => {
    const a = idsConPartes(d.estados[i]);
    const b = idsConPartes(d.estados[i + 1]);
    assert.ok(t.porque.trim().length > 0, `${etiqueta}: T${i} sin porque`);
    // NINGUN PASO VACIO: si no fusiona, no brota y no resalta nada, el alumno ve que no pasa nada
    assert.ok(
      t.fusiones.length > 0 || (t.brotes ?? []).length > 0 || (t.resaltar ?? []).length > 0 || (t.visitas ?? []).length > 0,
      `${etiqueta}: T${i} es un paso vacio (no fusiona, no brota ni resalta nada)`
    );
    // CONSERVACION ("como a lapiz"): nada aparece ni desaparece sin que una fusion o un brote lo explique.
    // Toda ficha nueva del estado siguiente es el `hacia` de una fusion o de un brote; toda ficha que
    // se va es el `desde` de una fusion. Las partes de una fraccion ("f.n", "f.d") siguen a su ficha.
    const cubiertasNuevas = new Set<string>();
    const cubiertasQuitadas = new Set<string>();
    for (const f of t.fusiones) {
      for (const id of f.desde) cubiertasQuitadas.add(id.split(".")[0]);
      for (const h of f.hacia === null ? [] : Array.isArray(f.hacia) ? f.hacia : [f.hacia]) cubiertasNuevas.add(h.split(".")[0]);
    }
    for (const br of t.brotes ?? []) cubiertasNuevas.add(br.hacia.split(".")[0]);
    // las piezas que van DENTRO de una fraccion o raiz siguen a su contenedor: si nace (o se consume) entero, ellas tambien
    const conHijas = (ids: Set<string>, e: Ficha[]) => {
      const visitar = (fs: Ficha[], cubierto: boolean) => {
        for (const f of fs) {
          const c = cubierto || ids.has(f.id);
          if (c) ids.add(f.id);
          visitar(hijas(f), c);
        }
      };
      visitar(e, false);
    };
    conHijas(cubiertasNuevas, d.estados[i + 1]);
    conHijas(cubiertasQuitadas, d.estados[i]);
    // un operador (+, ·, =) que llega junto a un brote es parte de ese brote; solo los numeros y letras deben estar cubiertos
    const operadores = new Set(aplanar(d.estados[i + 1]).filter((f) => f.op).map((f) => f.id));
    for (const id of b) {
      if (a.has(id) || id.includes(".") || operadores.has(id)) continue;
      assert.ok(cubiertasNuevas.has(id), `${etiqueta}: T${i} la ficha ${id} aparece de la nada (no es el hacia de ninguna fusion ni brote)`);
    }
    for (const id of a) {
      if (b.has(id) || id.includes(".")) continue;
      assert.ok(cubiertasQuitadas.has(id), `${etiqueta}: T${i} la ficha ${id} desaparece sin que ninguna fusion la consuma`);
    }
    // NINGUN SALTO ("un numero a la vez"): una fusion no puede producir varios numeros que no estaban ya escritos.
    // Los numeros del resultado que no aparecen en las piezas de origen son numeros calculados; mas de 2 en un
    // mismo paso es un salto que el alumno no puede seguir con lapiz.
    const numeros = (s: string) => new Set(s.match(/\d+/g) ?? []);
    const fichaPorId = new Map<string, Ficha>([...aplanar(d.estados[i]), ...aplanar(d.estados[i + 1])].map((f) => [f.id, f]));
    // UNA OPERACION POR FUSION: cuando una sola pieza se convierte en otra, no puede perder mas de 1 operador
    // (producto, fraccion, potencia, raiz, mas o menos). `4·1·6 -> 24` son dos productos: dos pasos.
    // Se excluyen las factorizaciones (`descompone`) y el tachado, que cancela varias cosas a la vez a proposito.
    const contarOperadores = (tex: string) => (tex.match(/\\cdot|\\dfrac|\\pm|\\sqrt|\^\{/g) ?? []).length;
    for (const f of t.descompone ? [] : t.fusiones) {
      if (f.modo === "tachar" || f.desde.length !== 1 || typeof f.hacia !== "string") continue;
      // una fraccion con partes opera arriba y abajo en paralelo (1·3 sobre 2·3): es lo normal en el colegio
      if (fichaPorId.get(f.desde[0].split(".")[0])?.frac) continue;
      const antes = contarOperadores(fichaPorId.get(f.desde[0].split(".")[0])?.tex ?? "");
      const despues = contarOperadores(fichaPorId.get(f.hacia.split(".")[0])?.tex ?? "");
      assert.ok(antes - despues <= 1, `${etiqueta}: T${i} una sola fusion resuelve ${antes - despues} operaciones a la vez: dividelo en pasos`);
    }
    for (const f of t.descompone ? [] : t.fusiones) {
      const origen = new Set(f.desde.flatMap((id) => [...numeros(fichaPorId.get(id.split(".")[0])?.tex ?? "")]));
      const destinos = f.hacia === null ? [] : Array.isArray(f.hacia) ? f.hacia : [f.hacia];
      const nuevosNum = new Set<string>();
      for (const h of destinos) for (const n of numeros(fichaPorId.get(h.split(".")[0])?.tex ?? "")) if (!origen.has(n)) nuevosNum.add(n);
      assert.ok(nuevosNum.size <= LIMITE_NUMEROS_NUEVOS, `${etiqueta}: T${i} un solo paso calcula ${nuevosNum.size} numeros nuevos (${[...nuevosNum].join(", ")}): dividelo en pasos`);
    }
    for (const br of t.brotes ?? []) {
      // el origen sigue existiendo, o es una pieza que viaja (la consume una fusion "viajar")
      const viaja = t.fusiones.some((f) => f.modo === "viajar" && f.desde.includes(br.desde));
      assert.ok(a.has(br.desde) && (b.has(br.desde) || viaja), `${etiqueta}: T${i} el origen del brote ${br.desde} debe seguir existiendo (o viajar)`);
      assert.ok(b.has(br.hacia) && !a.has(br.hacia), `${etiqueta}: T${i} el brote ${br.hacia} debe ser nuevo`);
    }
    // una visita: la pieza que viaja y las que visita existen antes (y la que viaja no desaparece sola)
    for (const v of t.visitas ?? []) {
      assert.ok(a.has(v.desde), `${etiqueta}: T${i} la visita sale de ${v.desde}, que no existe antes`);
      assert.ok(v.hacia.length > 0, `${etiqueta}: T${i} una visita sin destinos`);
      for (const h of v.hacia) assert.ok(a.has(h), `${etiqueta}: T${i} la visita va a ${h}, que no existe antes`);
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
    for (const txt of [t.texto, t.porque, t.regla ?? "", ...aplanar(d.estados[i]).map((f) => f.tex)]) {
      assert.ok(!/(^|[^\\a-zA-Z])(cdot|tfrac|dfrac|frac|sqrt|text)\b/.test(txt), `${etiqueta}: T${i} tiene una orden de LaTeX sin barra: ${txt}`);
    }
    // el texto del alumno no usa "÷" ni fracciones con barra suelta
    for (const txt of [t.texto, t.porque]) {
      assert.ok(!txt.includes("÷"), `${etiqueta}: T${i} usa ÷`);
    }
  });
}

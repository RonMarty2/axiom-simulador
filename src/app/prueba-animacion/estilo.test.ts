import { test } from "node:test";
import assert from "node:assert/strict";
import { CASOS_POR_TIPO } from "./casos.ts";
import { construir, type Tipo } from "./construir.ts";
import { hallazgosEstilo } from "./estilo.ts";

// TRINQUETE del movimiento: cuantas veces, en los casos dificiles de cada tipo, una pieza desaparece y reaparece igual
// en otro lugar sin viajar, o se escribe el opuesto en los dos lados (reglas de Ronald, 7-oct: ARRASTRAR). Los numeros son
// la deuda de hoy: este test falla si SUBE (un ejercicio nuevo nace con techo 0) y avisa cuando BAJA para bajar el techo.
// Cuando arregles un tipo, baja su numero aqui. Detalle de cada caso: `node --test` con este archivo y mira el mensaje.
const TECHO: Record<Tipo, number> = {
  potencia: 3,
  raiz: 3,
  raizResto: 1,
  lineal: 0,
  fracciones: 0,
  cuadrados: 3,
  logaritmos: 3,
  cuadratica: 24,
  mruv: 1,
  charles: 0,
  estequiometria: 6,
  molesAtomos: 2,
};

for (const [tipo, casos] of Object.entries(CASOS_POR_TIPO) as [Tipo, (typeof CASOS_POR_TIPO)[Tipo]][]) {
  test(`estilo de movimiento: ${tipo}`, () => {
    const malos = casos.flatMap((c) => {
      const r = construir(tipo, c.v);
      return "demo" in r ? hallazgosEstilo(r.demo, `${tipo}/${c.nombre}`, "movimiento") : [];
    });
    assert.ok(malos.length <= TECHO[tipo], `${tipo}: ${malos.length} problemas de movimiento (techo ${TECHO[tipo]}). Nuevos o peores:\n${malos.join("\n")}`);
    if (malos.length < TECHO[tipo]) console.log(`AVISO ${tipo}: bajo a ${malos.length}, baja el techo en estilo.test.ts`);
  });
}

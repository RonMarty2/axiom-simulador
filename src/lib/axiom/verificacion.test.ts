import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { parseExamenMD } from "./banco-parser.ts";
import { NIVELES, leerRegistro, idsVerificados, cumpleNivelMinimo } from "./verificacion.ts";

// El registro dice qué exámenes tienen respaldo en el escaneo original. No hace
// falta tener los PDF para cuidarlo: se cuida que cada entrada sea coherente con
// el banco, para que la app nunca muestre como "verificado" algo que el propio
// banco declara incompleto.

const RAIZ = join(process.cwd(), "data", "examenes", "umss");

function bancoPorClave() {
  const out = new Map<string, ReturnType<typeof parseExamenMD>>();
  for (const fac of readdirSync(RAIZ)) {
    for (const arch of readdirSync(join(RAIZ, fac)).filter((f) => f.endsWith(".md"))) {
      out.set(`${fac}/${arch.replace(/\.md$/, "")}`, parseExamenMD(readFileSync(join(RAIZ, fac, arch), "utf8")));
    }
  }
  return out;
}

const BANCO = existsSync(RAIZ) ? bancoPorClave() : new Map();
const REGISTRO = leerRegistro();

describe("registro de verificación", () => {
  test("cada entrada apunta a un examen que existe, con su id correcto", () => {
    const mal: string[] = [];
    for (const [clave, e] of Object.entries(REGISTRO)) {
      const ex = BANCO.get(clave);
      if (!ex) mal.push(`${clave}: no existe en el banco`);
      else if (ex.id !== e.id) mal.push(`${clave}: id ${e.id} no coincide con el del banco (${ex.id})`);
    }
    assert.deepEqual(mal, []);
  });

  test("cada entrada tiene nivel válido, fecha y fuente", () => {
    const mal: string[] = [];
    for (const [clave, e] of Object.entries(REGISTRO)) {
      if (!NIVELES.includes(e.nivel)) mal.push(`${clave}: nivel inválido "${e.nivel}"`);
      if (!/^\d{4}-\d{2}-\d{2}$/.test(e.fecha ?? "")) mal.push(`${clave}: fecha inválida`);
      if (!e.fuente?.archivo || !e.fuente?.paginas) mal.push(`${clave}: falta fuente.archivo o fuente.paginas`);
    }
    assert.deepEqual(mal, []);
  });

  test("un examen marcado completo no tiene faltantes ni secciones pendientes", () => {
    const mal: string[] = [];
    for (const [clave, e] of Object.entries(REGISTRO)) {
      const ex = BANCO.get(clave);
      if (!ex || !e.completo) continue;
      const pend = Object.keys(ex.secciones_pendientes ?? {}).length + (ex.faltantes?.length ?? 0);
      if (pend > 0) mal.push(`${clave}: dice completo pero el banco declara ${pend} pendiente(s)`);
    }
    assert.deepEqual(mal, []);
  });

  test("solo se muestran exámenes que cumplen nivel mínimo y están completos", () => {
    const ids = idsVerificados({
      a: { id: "x-a", nivel: "contra-facsimil", fecha: "2026-01-01", fuente: { archivo: "a.pdf", paginas: "1" }, completo: true },
      b: { id: "x-b", nivel: "ninguna", fecha: "2026-01-01", fuente: { archivo: "b.pdf", paginas: "1" }, completo: true },
      c: { id: "x-c", nivel: "clave-oficial", fecha: "2026-01-01", fuente: { archivo: "c.pdf", paginas: "1" }, completo: false },
    });
    assert.deepEqual([...ids], ["x-a"]);
    assert.equal(cumpleNivelMinimo("resuelto-a-ciegas"), false);
    assert.equal(cumpleNivelMinimo("clave-oficial"), true);
  });
});

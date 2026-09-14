import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { etiquetarExamen } from "./etiqueta-examen.ts";
import { parseExamenMD } from "./banco-parser.ts";

describe("etiquetarExamen", () => {
  test("parte el título de admisión en nombre y opción", () => {
    assert.deepEqual(etiquetarExamen("Examen de Admisión 2/2014 (1ra Opción)"), {
      principal: "Examen de Admisión 2/2014",
      secundaria: "1ra Opción",
    });
  });

  test("un parcial de curso queda nombrado como parcial, no como admisión", () => {
    const e = etiquetarExamen("Tercer Parcial · Segundo Curso Pre-Facultativo (Gestión 2-2008)");
    assert.equal(e.principal, "Tercer Parcial · Segundo Curso Pre-Facultativo");
    assert.equal(e.secundaria, "Gestión 2-2008");
    assert.ok(!/admisi/i.test(e.principal));
  });

  test("dos convocatorias del mismo año no dan la misma etiqueta", () => {
    const a = etiquetarExamen("Examen de Admisión 1/2014 (1ra Opción)");
    const b = etiquetarExamen("Examen de Admisión 2/2014 (1ra Opción)");
    assert.notEqual(a.principal, b.principal);
  });

  test("sin paréntesis, la opción pasa a ser la línea de abajo", () => {
    assert.deepEqual(etiquetarExamen("Examen de Ingreso 2-2016", "1ra Opción"), {
      principal: "Examen de Ingreso 2-2016",
      secundaria: "1ra Opción",
    });
  });

  test("sin título usa la opción y no afirma que sea de admisión", () => {
    assert.deepEqual(etiquetarExamen(null, "2da Opción"), {
      principal: "2da Opción",
      secundaria: null,
    });
    assert.equal(etiquetarExamen(undefined, null).principal, "Examen");
  });

  test("un título que es solo un paréntesis no deja el nombre vacío", () => {
    assert.deepEqual(etiquetarExamen("(Gestión 1-2013)"), {
      principal: "Gestión 1-2013",
      secundaria: null,
    });
  });
});

// El valor de esto no está en los casos de laboratorio sino en el banco real:
// si dos exámenes distintos muestran exactamente la misma tarjeta, el alumno
// no puede elegir entre ellos.
describe("etiquetas contra el banco real", () => {
  const RAIZ = join(process.cwd(), "data", "examenes", "umss");

  function todos() {
    if (!existsSync(RAIZ)) return [];
    const out = [];
    for (const facultad of readdirSync(RAIZ)) {
      const dir = join(RAIZ, facultad);
      for (const archivo of readdirSync(dir).filter((f) => f.endsWith(".md"))) {
        try {
          out.push({ facultad, examen: parseExamenMD(readFileSync(join(dir, archivo), "utf8")) });
        } catch { /* el test del banco ya se queja de los que no parsean */ }
      }
    }
    return out;
  }

  test("ningún examen queda rotulado como algo que no es", () => {
    const fallos: string[] = [];
    for (const { examen } of todos()) {
      const { principal } = etiquetarExamen(examen.titulo, examen.opcion);
      const esParcial = examen.categoria === "parcial_curso";
      if (esParcial && /admisi[oó]n|ingreso/i.test(principal)) {
        fallos.push(`${examen.id}: parcial rotulado "${principal}"`);
      }
      if (!principal.trim()) fallos.push(`${examen.id}: etiqueta vacía`);
    }
    assert.deepEqual(fallos, [], fallos.join("\n"));
  });

  test("dentro de una facultad, dos exámenes no muestran la misma tarjeta", () => {
    const porFacultad = new Map<string, Map<string, string[]>>();
    for (const { facultad, examen } of todos()) {
      const { principal, secundaria } = etiquetarExamen(examen.titulo, examen.opcion);
      // Lo que realmente distingue una tarjeta de otra en pantalla.
      const visible = `${examen.anio} · ${principal} · ${secundaria ?? ""}`;
      const mapa = porFacultad.get(facultad) ?? new Map<string, string[]>();
      mapa.set(visible, [...(mapa.get(visible) ?? []), examen.id]);
      porFacultad.set(facultad, mapa);
    }
    const fallos: string[] = [];
    for (const [facultad, mapa] of porFacultad) {
      for (const [visible, ids] of mapa) {
        if (ids.length > 1) fallos.push(`${facultad} · "${visible}" lo muestran ${ids.length}: ${ids.join(", ")}`);
      }
    }
    assert.deepEqual(fallos, [], `tarjetas indistinguibles:\n${fallos.join("\n")}`);
  });
});

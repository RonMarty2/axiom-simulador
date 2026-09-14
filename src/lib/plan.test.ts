import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { esPago, tieneSuscripcionA, puedeVerResolucionBiblioteca } from "./plan.ts";
import type { Usuario } from "./data-store.ts";

// El permiso por carrera es el que sostiene el modelo de cobro: cada facultad
// es un producto mensual aparte. Se rompió una vez porque el permiso se le
// preguntaba a `usuario.plan`, que sale de la facultad SELECCIONADA, y no a la
// facultad del contenido: un premium de Económicas se llevaba las soluciones
// de los 139 exámenes de Ingeniería. Esto lo deja clavado.

function alumno(facultades: string[]): Pick<Usuario, "suscripciones"> {
  return {
    suscripciones: facultades.map((f) => ({
      facultad: f as Usuario["facultad_objetivo"] & string,
      vence: "2099-01-01",
    })),
  };
}

describe("plan por carrera", () => {
  test("con suscripción a Económicas, abre Económicas", () => {
    assert.equal(tieneSuscripcionA(alumno(["economicas"]), "economicas"), true);
  });

  test("con suscripción a Económicas, NO abre Ingeniería", () => {
    assert.equal(tieneSuscripcionA(alumno(["economicas"]), "ingenieria"), false);
  });

  test("quien paga dos carreras abre las dos, y ninguna más", () => {
    const dos = alumno(["economicas", "ingenieria"]);
    assert.equal(tieneSuscripcionA(dos, "economicas"), true);
    assert.equal(tieneSuscripcionA(dos, "ingenieria"), true);
    assert.equal(tieneSuscripcionA(dos, "medicina"), false);
  });

  test("sin suscripciones no abre nada", () => {
    assert.equal(tieneSuscripcionA(alumno([]), "economicas"), false);
  });

  test("sin sesión no abre nada", () => {
    assert.equal(tieneSuscripcionA(null, "economicas"), false);
    assert.equal(tieneSuscripcionA(undefined, "economicas"), false);
  });

  test("sin saber de qué facultad es el contenido, no se abre", () => {
    // Preferimos negar que regalar: si el examen no declara facultad, algo
    // está mal en el banco y el default seguro es cobrar.
    assert.equal(tieneSuscripcionA(alumno(["economicas"]), null), false);
    assert.equal(tieneSuscripcionA(alumno(["economicas"]), undefined), false);
  });

  test("la resolución de la biblioteca sigue la misma regla", () => {
    const eco = alumno(["economicas"]);
    assert.equal(puedeVerResolucionBiblioteca(eco, "economicas"), true);
    assert.equal(puedeVerResolucionBiblioteca(eco, "ingenieria"), false);
  });
});

describe("esPago", () => {
  test("gratis no es pago; premium y pro sí", () => {
    assert.equal(esPago("gratis"), false);
    assert.equal(esPago(null), false);
    assert.equal(esPago(undefined), false);
    assert.equal(esPago("premium"), true);
    assert.equal(esPago("pro"), true);
  });
});

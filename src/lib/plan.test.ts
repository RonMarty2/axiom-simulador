import { test, describe } from "node:test";
import assert from "node:assert/strict";
import {
  esPago,
  tieneSuscripcionA,
  puedeVerResolucionBiblioteca,
  inicioSemanaISO,
  proximoLunes,
  diaLaPaz,
  mesLaPaz,
} from "./plan.ts";
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

describe("inicioSemanaISO y proximoLunes (hora La Paz UTC-4)", () => {
  test("domingo 23:00 La Paz (2026-11-09T03:00:00Z) pertenece a semana iniciada 2026-11-02T04:00:00.000Z", () => {
    const d = new Date("2026-11-09T03:00:00Z");
    assert.equal(inicioSemanaISO(d), "2026-11-02T04:00:00.000Z");
    assert.equal(proximoLunes(d).toISOString(), "2026-11-09T04:00:00.000Z");
  });

  test("lunes 00:30 La Paz (2026-11-09T04:30:00Z) abre la semana nueva: inicio 2026-11-09T04:00:00.000Z", () => {
    const d = new Date("2026-11-09T04:30:00Z");
    assert.equal(inicioSemanaISO(d), "2026-11-09T04:00:00.000Z");
    assert.equal(proximoLunes(d).toISOString(), "2026-11-16T04:00:00.000Z");
  });

  test("el cálculo no cambia con process.env.TZ en UTC o America/La_Paz", () => {
    const d = new Date("2026-11-09T03:00:00Z");
    const prevTZ = process.env.TZ;
    try {
      process.env.TZ = "UTC";
      assert.equal(inicioSemanaISO(d), "2026-11-02T04:00:00.000Z");
      process.env.TZ = "America/La_Paz";
      assert.equal(inicioSemanaISO(d), "2026-11-02T04:00:00.000Z");
    } finally {
      process.env.TZ = prevTZ;
    }
  });
});

describe("diaLaPaz y mesLaPaz", () => {
  test("2026-11-09T02:00:00Z es dia 2026-11-08 y mes 2026-11", () => {
    const iso = "2026-11-09T02:00:00Z";
    assert.equal(diaLaPaz(iso), "2026-11-08");
    assert.equal(mesLaPaz(iso), "2026-11");
  });

  test("2026-12-01T02:00:00Z es dia 2026-11-30 y mes 2026-11", () => {
    const iso = "2026-12-01T02:00:00Z";
    assert.equal(diaLaPaz(iso), "2026-11-30");
    assert.equal(mesLaPaz(iso), "2026-11");
  });
});

import { test } from "node:test";
import assert from "node:assert/strict";
import {
  CLAVE_PROGRESO_LECCIONES,
  leerLeccionesCompletadas,
  marcarLeccionCompletada,
  estaLeccionCompletada,
  contarCompletadasEnBloque,
  bloqueDeArea,
} from "./progreso-lecciones.ts";

test("CLAVE_PROGRESO_LECCIONES tiene el valor esperado y los helpers de storage son seguros en SSR", () => {
  assert.equal(CLAVE_PROGRESO_LECCIONES, "axiom-lecciones-completadas");
  assert.deepStrictEqual(leerLeccionesCompletadas(), []);
  assert.deepStrictEqual(marcarLeccionCompletada("potenciacion"), []);
  assert.equal(estaLeccionCompletada("potenciacion"), false);
  assert.equal(estaLeccionCompletada("potenciacion", ["potenciacion"]), true);
  assert.equal(estaLeccionCompletada("radicacion", ["potenciacion"]), false);
  assert.equal(estaLeccionCompletada("   ", ["potenciacion"]), false);
});

test("contarCompletadasEnBloque: bloque vacío", () => {
  assert.deepStrictEqual(contarCompletadasEnBloque([], new Set()), {
    hechas: 0,
    total: 0,
    porcentaje: 0,
  });
  assert.deepStrictEqual(contarCompletadasEnBloque([], new Set(["potenciacion"])), {
    hechas: 0,
    total: 0,
    porcentaje: 0,
  });
});

test("contarCompletadasEnBloque: avance parcial", () => {
  const slugs = ["a", "b", "c", "d"];
  assert.deepStrictEqual(contarCompletadasEnBloque(slugs, new Set(["a"])), {
    hechas: 1,
    total: 4,
    porcentaje: 25,
  });
  assert.deepStrictEqual(contarCompletadasEnBloque(["a", "b", "c"], new Set(["a"])), {
    hechas: 1,
    total: 3,
    porcentaje: 33,
  });
  assert.deepStrictEqual(contarCompletadasEnBloque(["a", "b", "c"], new Set(["a", "c"])), {
    hechas: 2,
    total: 3,
    porcentaje: 67,
  });
});

test("contarCompletadasEnBloque: 100% e ignora slugs de otros bloques", () => {
  assert.deepStrictEqual(
    contarCompletadasEnBloque(["a", "b", "c"], new Set(["a", "b", "c", "otro"])),
    { hechas: 3, total: 3, porcentaje: 100 },
  );
});

test("contarCompletadasEnBloque: deduplica slugs repetidos en el bloque", () => {
  assert.deepStrictEqual(
    contarCompletadasEnBloque(["a", "a", "b", "b"], new Set(["a"])),
    { hechas: 1, total: 2, porcentaje: 50 },
  );
  assert.deepStrictEqual(
    contarCompletadasEnBloque(["a", "a", ""], new Set(["a"])),
    { hechas: 1, total: 1, porcentaje: 100 },
  );
});

test("bloqueDeArea: todas las áreas de Medicina", () => {
  assert.equal(bloqueDeArea("morfofuncion"), "morfofuncion");
  assert.equal(bloqueDeArea("biologia_celular"), "biologia-celular");
  assert.equal(bloqueDeArea("investigacion"), "investigacion");
  assert.equal(bloqueDeArea("educacion_salud"), "investigacion");
  assert.equal(bloqueDeArea("quimica"), "quimica");
  assert.equal(bloqueDeArea("fisica"), "fisica");
  assert.equal(bloqueDeArea("matematicas"), "matematicas");
  assert.equal(bloqueDeArea("comprension_lectora"), "comprension-lectora");
});

test("bloqueDeArea: áreas de Ingeniería y Económicas", () => {
  assert.equal(bloqueDeArea("aritmetica_algebra"), "matematicas");
  assert.equal(bloqueDeArea("geometria_trigonometria"), "matematicas");
  assert.equal(bloqueDeArea("biologia"), "biologia-celular");
  assert.equal(bloqueDeArea("razonamiento"), "comprension-lectora");
  assert.equal(bloqueDeArea("lenguaje"), "comprension-lectora");
  assert.equal(bloqueDeArea("economicas"), "economicas");
});

test("bloqueDeArea: fallback reemplaza guiones bajos por guiones", () => {
  assert.equal(bloqueDeArea("estrategias_aprendizaje"), "estrategias-aprendizaje");
  assert.equal(bloqueDeArea("historia_general"), "historia-general");
  assert.equal(bloqueDeArea("civica"), "civica");
});

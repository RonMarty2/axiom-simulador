import { test } from "node:test";
import assert from "node:assert/strict";
import { limpiarApodo, nombrePublico, NOMBRE_ANONIMO } from "./apodo.ts";

test("sin apodo se ve anónimo, nunca el nombre real", () => {
  assert.equal(nombrePublico(null), NOMBRE_ANONIMO);
  assert.equal(nombrePublico(undefined), NOMBRE_ANONIMO);
  assert.equal(nombrePublico("   "), NOMBRE_ANONIMO);
  assert.equal(nombrePublico("Tigre99"), "Tigre99");
});

test("vacío o 'Alumno anónimo' = salir anónimo", () => {
  for (const v of ["", "  ", null, "alumno anónimo"]) {
    assert.deepEqual(limpiarApodo(v), { ok: true, apodo: null });
  }
});

test("acepta tildes, ñ, números, punto y guion; junta espacios", () => {
  assert.deepEqual(limpiarApodo("  Peña   del-Valle_2 "), { ok: true, apodo: "Peña del-Valle_2" });
  assert.deepEqual(limpiarApodo("Ana.M"), { ok: true, apodo: "Ana.M" });
});

test("rechaza largo fuera de rango, símbolos y no-texto", () => {
  for (const v of ["ab", "a".repeat(21), "yo@mail.com", "<script>", 42]) {
    assert.equal(limpiarApodo(v).ok, false, String(v));
  }
});

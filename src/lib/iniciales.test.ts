import test from "node:test";
import assert from "node:assert/strict";
import { iniciales } from "./iniciales.ts";

test("iniciales: ignora lo que no es una palabra con letra", () => {
  assert.equal(iniciales("Ronald (tester)"), "R");
  assert.equal(iniciales("Ana María Pérez"), "AM");
  assert.equal(iniciales("  luis   "), "L");
  assert.equal(iniciales(""), "");
  assert.equal(iniciales(null), "");
});

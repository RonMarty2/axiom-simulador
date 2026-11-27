import { test } from "node:test";
import assert from "node:assert/strict";
import { tieneLaminasPublicadas } from "./laminas.ts";

test("tieneLaminasPublicadas devuelve true solo para facultades con al menos una lámina publicada", () => {
  assert.equal(tieneLaminasPublicadas("ingenieria"), true);
  assert.equal(tieneLaminasPublicadas("medicina"), true);
  assert.equal(tieneLaminasPublicadas("economicas"), false);
  assert.equal(tieneLaminasPublicadas("derecho"), false);
  assert.equal(tieneLaminasPublicadas(null), false);
  assert.equal(tieneLaminasPublicadas(undefined), false);
});

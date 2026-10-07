import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, test } from "node:test";
import { huella, IDS } from "./huellas.ts";

const reg = JSON.parse(readFileSync(new URL("../../../data/registro-auditoria-pasos.json", import.meta.url), "utf8"));

// Cada generador tiene que estar en el registro, y si fue auditado, no puede haber cambiado desde entonces.
describe("registro de auditoria de pasos", () => {
  test("todo generador esta registrado", () => {
    for (const id of IDS) assert.ok(reg.generadores[id], `${id}: falta en data/registro-auditoria-pasos.json (node src/app/prueba-animacion/registrar-auditoria.ts iniciar)`);
  });

  test("lo auditado no cambio desde la auditoria", () => {
    for (const id of IDS) {
      const e = reg.generadores[id];
      if (!e || e.estado === "pendiente") continue;
      assert.equal(
        huella(id),
        e.huella,
        `${id}: el generador cambio despues de la auditoria del ${e.fecha}. Pasa de nuevo al auditor-de-pasos y registralo con registrar-auditoria.ts`
      );
    }
  });
});

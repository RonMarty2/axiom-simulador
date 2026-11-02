import { test } from "node:test";
import assert from "node:assert/strict";
import {
  retornoDiaSiguiente,
  retornoSemana,
  bloquesPorUsuarioActivoSemana,
  diasConPracticaSemana,
  semanaLaPaz,
  resumenMetricas,
} from "./metricas-retencion.ts";
import { textoConstancia } from "./refuerzo.ts";

test("retornoDiaSiguiente excluye a los usuarios que no estuvieron activos el día D", () => {
  const filas = [
    { usuario_id: "u1", fecha: "2026-11-01T14:00:00.000Z" },
    { usuario_id: "u1", fecha: "2026-11-02T14:00:00.000Z" },
    { usuario_id: "u2", fecha: "2026-11-01T16:00:00.000Z" },
    { usuario_id: "u3", fecha: "2026-11-02T15:00:00.000Z" }, // solo D+1, no estuvo el día D
    { usuario_id: "u4", fecha: "invalida" },
  ];

  assert.deepStrictEqual(retornoDiaSiguiente(filas, "2026-11-01"), {
    activos: 2,
    volvieron: 1,
  });

  // Sin día fijo: u4 (sin fecha válida) queda excluido y u1 es el único que vuelve al día siguiente
  assert.deepStrictEqual(retornoDiaSiguiente(filas), {
    activos: 3,
    volvieron: 1,
  });
});

test("retornoSemana cuenta solo D+1 a D+7", () => {
  const filas = [
    // u1: mismo día dos veces (D+0), no cuenta como retorno
    { usuario_id: "u1", fecha: "2026-11-01T10:00:00.000Z" },
    { usuario_id: "u1", fecha: "2026-11-01T20:00:00.000Z" },
    // u2: vuelve en D+7 (2026-11-08), sí cuenta
    { usuario_id: "u2", fecha: "2026-11-01T12:00:00.000Z" },
    { usuario_id: "u2", fecha: "2026-11-08T12:00:00.000Z" },
    // u3: vuelve recién en D+8 (2026-11-09), no cuenta
    { usuario_id: "u3", fecha: "2026-11-01T12:00:00.000Z" },
    { usuario_id: "u3", fecha: "2026-11-09T12:00:00.000Z" },
    // u4: vuelve en D+1 (2026-11-02), sí cuenta
    { usuario_id: "u4", fecha: "2026-11-01T12:00:00.000Z" },
    { usuario_id: "u4", fecha: "2026-11-02T12:00:00.000Z" },
  ];

  assert.deepStrictEqual(retornoSemana(filas, "2026-11-01"), {
    activos: 4,
    volvieron: 2,
  });
  assert.deepStrictEqual(retornoSemana(filas), {
    activos: 4,
    volvieron: 2,
  });
});

test("la semana La Paz cierra el domingo a las 23:59 La Paz (no el lunes UTC)", () => {
  // Domingo 2026-11-01 a las 23:59:59 en La Paz = lunes 2026-11-02T03:59:59Z en UTC
  const dom2359LaPaz = "2026-11-02T03:59:59.000Z";
  // Lunes 2026-11-02 a las 00:00:00 en La Paz = lunes 2026-11-02T04:00:00Z en UTC
  const lun0000LaPaz = "2026-11-02T04:00:00.000Z";

  assert.equal(semanaLaPaz("2026-10-26T12:00:00.000Z"), "2026-10-26");
  assert.equal(semanaLaPaz(dom2359LaPaz), "2026-10-26");
  assert.equal(semanaLaPaz(lun0000LaPaz), "2026-11-02");
});

test("mediana y media con número par e impar de usuarios", () => {
  // Impar: 3 usuarios con 1, 2 y 6 bloques -> media = 3, mediana = 2
  const filasImpar = [
    { usuario_id: "u1", fecha: "2026-10-26T12:00:00.000Z" },
    { usuario_id: "u2", fecha: "2026-10-26T12:00:00.000Z" },
    { usuario_id: "u2", fecha: "2026-10-27T12:00:00.000Z" },
    { usuario_id: "u3", fecha: "2026-10-26T12:00:00.000Z" },
    { usuario_id: "u3", fecha: "2026-10-27T12:00:00.000Z" },
    { usuario_id: "u3", fecha: "2026-10-28T12:00:00.000Z" },
    { usuario_id: "u3", fecha: "2026-10-29T12:00:00.000Z" },
    { usuario_id: "u3", fecha: "2026-10-30T12:00:00.000Z" },
    { usuario_id: "u3", fecha: "2026-10-31T12:00:00.000Z" },
  ];
  assert.deepStrictEqual(bloquesPorUsuarioActivoSemana(filasImpar), {
    media: 3,
    mediana: 2,
    usuariosActivos: 3,
  });

  // Par: 4 usuarios con 1, 2, 6 y 4 bloques -> media = 3,25, mediana = 3
  const filasPar = [
    ...filasImpar,
    { usuario_id: "u4", fecha: "2026-10-26T10:00:00.000Z" },
    { usuario_id: "u4", fecha: "2026-10-26T14:00:00.000Z" },
    { usuario_id: "u4", fecha: "2026-10-27T10:00:00.000Z" },
    { usuario_id: "u4", fecha: "2026-10-27T14:00:00.000Z" },
  ];
  assert.deepStrictEqual(bloquesPorUsuarioActivoSemana(filasPar), {
    media: 3.25,
    mediana: 3,
    usuariosActivos: 4,
  });

  // Días distintos por semana para u4: practicó en 2 días distintos aunque hizo 4 bloques
  assert.deepStrictEqual(diasConPracticaSemana(filasPar), {
    media: 2.75,
    mediana: 2,
    usuariosActivos: 4,
  });
});

test("resumenMetricas marca insuficiente con menos de 30 usuarios activos", () => {
  const veintinueve = Array.from({ length: 29 }, (_, i) => ({
    usuario_id: `u-${i + 1}`,
    fecha: "2026-11-01T15:00:00.000Z",
  }));
  const res29 = resumenMetricas(veintinueve);
  assert.equal(res29.usuariosActivos, 29);
  assert.equal(res29.insuficiente, true);

  const treinta = [
    ...veintinueve,
    { usuario_id: "u-30", fecha: "2026-11-01T15:00:00.000Z" },
  ];
  const res30 = resumenMetricas(treinta);
  assert.equal(res30.usuariosActivos, 30);
  assert.equal(res30.insuficiente, false);
});

test("textoConstancia(0) es vacío y textoConstancia(3) dice 3 de los últimos 7 días", () => {
  assert.equal(textoConstancia(0), "");
  assert.equal(textoConstancia(3), "Practicaste 3 de los últimos 7 días.");
});

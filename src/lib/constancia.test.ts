import { test } from "node:test";
import assert from "node:assert/strict";
import { ultimos7Dias } from "./constancia.ts";
import { diaLaPaz } from "./refuerzo.ts";

test("7 elementos siempre", () => {
  const ahora = "2026-11-08T15:00:00.000Z";
  assert.equal(ultimos7Dias([], ahora).length, 7);
  assert.equal(
    ultimos7Dias(
      [
        "2026-11-08T14:00:00.000Z",
        "2026-11-07T14:00:00.000Z",
        "2026-11-06T14:00:00.000Z",
        "2026-11-05T14:00:00.000Z",
        "2026-11-04T14:00:00.000Z",
        "2026-11-03T14:00:00.000Z",
        "2026-11-02T14:00:00.000Z",
        "2026-11-01T14:00:00.000Z",
      ],
      ahora,
    ).length,
    7,
  );
});

test("el ultimo es hoy", () => {
  const ahora = "2026-11-04T02:30:00.000Z"; // 2026-11-03 22:30 en La Paz (martes)
  const dias = ultimos7Dias([], ahora);
  assert.equal(dias[6].hoy, true);
  assert.equal(dias[6].dia, diaLaPaz(ahora));
  assert.equal(dias[6].dia, "2026-11-03");
  assert.equal(dias[6].letra, "M");
  for (let i = 0; i < 6; i++) {
    assert.equal(dias[i].hoy, false);
  }
});

test("marca practicado solo los dias con fecha", () => {
  // 2026-11-08 es domingo en La Paz; la ventana es lun 2 a dom 8 de nov
  const ahora = "2026-11-08T16:00:00.000Z";
  const fechas = [
    "2026-11-02T12:00:00.000Z", // lun 2
    "2026-11-05T02:00:00.000Z", // mie 4 a las 22:00 en La Paz
    "2026-11-08T15:00:00.000Z", // dom 8
  ];
  const dias = ultimos7Dias(fechas, ahora);
  assert.deepStrictEqual(
    dias.map((d) => d.letra),
    ["L", "M", "X", "J", "V", "S", "D"],
  );
  assert.deepStrictEqual(
    dias.map((d) => d.practicado),
    [true, false, true, false, false, false, true],
  );
});

test("dos fechas el mismo dia no duplican", () => {
  const ahora = "2026-11-08T18:00:00.000Z";
  const fechas = [
    "2026-11-06T05:00:00.000Z", // vie 6 a las 01:00 La Paz
    "2026-11-07T02:00:00.000Z", // vie 6 a las 22:00 La Paz
  ];
  const dias = ultimos7Dias(fechas, ahora);
  assert.equal(dias.length, 7);
  const practicados = dias.filter((d) => d.practicado);
  assert.equal(practicados.length, 1);
  assert.equal(practicados[0].dia, "2026-11-06");
  assert.equal(practicados[0].letra, "V");
});

test("el dia 8 atras no aparece", () => {
  const ahora = "2026-11-10T16:00:00.000Z"; // hoy = 2026-11-10; ventana = 2026-11-04..2026-11-10
  const diaOchoAtras = "2026-11-03T16:00:00.000Z";
  const dias = ultimos7Dias([diaOchoAtras], ahora);
  assert.equal(dias.some((d) => d.dia === "2026-11-03"), false);
  assert.equal(dias.every((d) => !d.practicado), true);
  assert.equal(dias[0].dia, "2026-11-04");
  assert.equal(dias[6].dia, "2026-11-10");
});

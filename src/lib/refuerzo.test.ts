import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { REFUERZO } from "./refuerzo-config.ts";
import {
  fnv1a,
  crearAzar,
  diaLaPaz,
  inicioDiaLaPazISO,
  desdeValido,
  esfuerzoReal,
  diasDePausa,
  diasConPractica,
  mejoraEnAreaDebil,
  elegiblesDe,
  decidirRefuerzo,
  plural,
  textoRefuerzo,
  textoRepasoFijo,
  textoDominadas,
  textoConstancia,
  type DecisionRefuerzo,
} from "./refuerzo.ts";

test("fnv1a es determinista y distingue entradas", () => {
  const a1 = fnv1a("u-123|sim-456");
  const a2 = fnv1a("u-123|sim-456");
  const b = fnv1a("u-123|sim-457");
  const c = fnv1a("u-124|sim-456");
  assert.equal(a1, a2);
  assert.notEqual(a1, b);
  assert.notEqual(a1, c);
  assert.ok(Number.isInteger(a1) && a1 >= 0 && a1 <= 0xffffffff);
});

test("crearAzar repite la secuencia con la misma semilla y queda en [0, 1)", () => {
  const s = fnv1a("semilla-fija");
  const r1 = crearAzar(s);
  const r2 = crearAzar(s);
  const rOtra = crearAzar(fnv1a("otra-semilla"));
  const seq1 = Array.from({ length: 50 }, () => r1());
  const seq2 = Array.from({ length: 50 }, () => r2());
  const seqOtra = Array.from({ length: 50 }, () => rOtra());
  assert.deepStrictEqual(seq1, seq2);
  assert.notDeepStrictEqual(seq1, seqOtra);
  for (const v of seq1) {
    assert.ok(v >= 0 && v < 1, `valor fuera de [0, 1): ${v}`);
  }
});

test("con p = 0,33 sobre 20000 semillas la frecuencia cae entre 0,31 y 0,35", () => {
  const total = 20000;
  let exitos = 0;
  for (let i = 0; i < total; i++) {
    const azar = crearAzar(fnv1a(`usuario-${i}|sim-${i}`));
    if (azar() < 0.33) exitos++;
  }
  const frec = exitos / total;
  assert.ok(frec >= 0.31 && frec <= 0.35, `frecuencia fuera de rango: ${frec}`);
});

test("diaLaPaz: 03:59:59Z es el día anterior y 04:00:00Z el mismo día", () => {
  assert.equal(diaLaPaz("2026-11-01T03:59:59Z"), "2026-10-31");
  assert.equal(diaLaPaz("2026-11-01T04:00:00Z"), "2026-11-01");
  assert.equal(diaLaPaz("2026-01-01T02:30:00.000Z"), "2025-12-31");
});

test("inicioDiaLaPazISO devuelve 04:00:00.000Z del mismo día La Paz", () => {
  assert.equal(inicioDiaLaPazISO("2026-11-01T15:20:00.000Z"), "2026-11-01T04:00:00.000Z");
  assert.equal(inicioDiaLaPazISO("2026-11-01T03:59:59.000Z"), "2026-10-31T04:00:00.000Z");
  assert.equal(inicioDiaLaPazISO("2026-11-01T04:00:00.000Z"), "2026-11-01T04:00:00.000Z");
  assert.equal(desdeValido("2026-11-01T04:00:00.000Z"), "2026-11-01T04:00:00.000Z");
  assert.equal(desdeValido(null), null);
  assert.equal(desdeValido(""), null);
  assert.equal(desdeValido("no-es-fecha"), null);
});

test("desdeValido acepta un ISO y rechaza basura o vacío", () => {
  assert.equal(desdeValido("2026-11-01T04:00:00.000Z"), "2026-11-01T04:00:00.000Z");
  assert.equal(desdeValido("  2026-11-01T00:00:00-04:00  "), "2026-11-01T00:00:00-04:00");
  assert.equal(desdeValido(null), null);
  assert.equal(desdeValido(""), null);
  assert.equal(desdeValido("   "), null);
  assert.equal(desdeValido("no-es-fecha"), null);
  assert.equal(desdeValido("2026-11-01"), null);
  assert.equal(desdeValido("2026-99-99T99:99:99Z"), null);
});

test("esfuerzoReal: 10 de 20 sí, 9 de 20 no, 0 preguntas no, todo sin responder no, nota baja con esfuerzo sí", () => {
  assert.equal(esfuerzoReal({ correctas: 5, incorrectas: 5, sin_responder: 10 }), true);
  assert.equal(esfuerzoReal({ correctas: 5, incorrectas: 4, sin_responder: 11 }), false);
  assert.equal(esfuerzoReal({ correctas: 0, incorrectas: 0, sin_responder: 0 }), false);
  assert.equal(esfuerzoReal({ correctas: 0, incorrectas: 0, sin_responder: 20 }), false);
  assert.equal(esfuerzoReal({ correctas: 1, incorrectas: 19, sin_responder: 0 }), true);
});

test("diasDePausa: sin previas es null, ayer es 0, anteayer es 1, repetir fechas el mismo día no cambia", () => {
  const ahora = "2026-11-05T14:00:00.000Z";
  assert.equal(diasDePausa([], ahora), null);
  assert.equal(diasDePausa(["2026-11-05T10:00:00.000Z"], ahora), null);
  assert.equal(diasDePausa(["2026-11-04T15:00:00.000Z"], ahora), 0);
  assert.equal(diasDePausa(["2026-11-03T15:00:00.000Z"], ahora), 1);
  assert.equal(
    diasDePausa(
      [
        "2026-11-03T10:00:00.000Z",
        "2026-11-03T18:00:00.000Z",
        "2026-11-05T09:00:00.000Z",
      ],
      ahora,
    ),
    1,
  );
});

test("diasConPractica: duplicados del mismo día cuentan una vez, el día 8 queda fuera, máximo 7", () => {
  const ahora = "2026-11-10T16:00:00.000Z";
  assert.equal(
    diasConPractica(
      ["2026-11-10T10:00:00.000Z", "2026-11-10T15:00:00.000Z"],
      ahora,
    ),
    1,
  );
  assert.equal(diasConPractica(["2026-11-03T12:00:00.000Z"], ahora), 0);
  const ochoDias = [
    "2026-11-10T12:00:00.000Z",
    "2026-11-09T12:00:00.000Z",
    "2026-11-08T12:00:00.000Z",
    "2026-11-07T12:00:00.000Z",
    "2026-11-06T12:00:00.000Z",
    "2026-11-05T12:00:00.000Z",
    "2026-11-04T12:00:00.000Z",
    "2026-11-03T12:00:00.000Z",
  ];
  assert.equal(diasConPractica(ochoDias, ahora), 7);
});

test("mejoraEnAreaDebil: menos de 2 previos null, área fuerte null, subida de 9 null, subida de 10 sí, empate alfabético, área sin previos se ignora", () => {
  assert.equal(mejoraEnAreaDebil({ Algebra: 70 }, [{ Algebra: 40 }]), null);
  assert.equal(
    mejoraEnAreaDebil({ Algebra: 80 }, [{ Algebra: 60 }, { Algebra: 65 }]),
    null,
  );
  assert.equal(
    mejoraEnAreaDebil({ Algebra: 49 }, [{ Algebra: 40 }, { Algebra: 40 }]),
    null,
  );
  assert.deepStrictEqual(
    mejoraEnAreaDebil({ Algebra: 50 }, [{ Algebra: 40 }, { Algebra: 40 }]),
    { area: "Algebra", antes: 40, ahora: 50 },
  );
  assert.deepStrictEqual(
    mejoraEnAreaDebil(
      { Fisica: 55, Algebra: 50 },
      [
        { Fisica: 40, Algebra: 35 },
        { Fisica: 40, Algebra: 35 },
      ],
    ),
    { area: "Algebra", antes: 35, ahora: 50 },
  );
  assert.deepStrictEqual(
    mejoraEnAreaDebil(
      { Quimica: 90, Biologia: 55 },
      [{ Biologia: 40 }, { Biologia: 40, Quimica: 30 }],
    ),
    { area: "Biologia", antes: 40, ahora: 55 },
  );
});

test("decidirRefuerzo: con 5 sorpresas hoy devuelve null y no llama al azar", () => {
  let llamadas = 0;
  const res = decidirRefuerzo(
    {
      elegibles: [{ evento: "simulacro_terminado", totalSimulacros: 4 }],
      sorpresasHoy: REFUERZO.tope.porDia,
      activo: true,
    },
    () => {
      llamadas++;
      return 0;
    },
  );
  assert.equal(res, null);
  assert.equal(llamadas, 0);
});

test("decidirRefuerzo: apagado devuelve null", () => {
  let llamadas = 0;
  const res = decidirRefuerzo(
    {
      elegibles: [{ evento: "retorno_tras_pausa", dias: 3 }],
      sorpresasHoy: 0,
      activo: false,
    },
    () => {
      llamadas++;
      return 0;
    },
  );
  assert.equal(res, null);
  assert.equal(llamadas, 0);
});

test("decidirRefuerzo: sin elegibles devuelve null y no llama al azar", () => {
  let llamadas = 0;
  const res = decidirRefuerzo(
    { elegibles: [], sorpresasHoy: 0, activo: true },
    () => {
      llamadas++;
      return 0;
    },
  );
  assert.equal(res, null);
  assert.equal(llamadas, 0);
});

test("decidirRefuerzo: la prioridad gana a un evento menor", () => {
  const elegibles = elegiblesDe({
    esfuerzo: true,
    ahora: "2026-11-10T15:00:00.000Z",
    fechasPrevias: ["2026-11-05T15:00:00.000Z", "2026-11-06T15:00:00.000Z"],
    desgloseActual: { Algebra: 60 },
    desglosesPrevios: [{ Algebra: 40 }, { Algebra: 40 }],
    modo: "mis_errores",
    correctasRepaso: 3,
    totalSimulacros: 8,
  });
  const res = decidirRefuerzo(
    { elegibles: [...elegibles].reverse(), sorpresasHoy: 0, activo: true },
    () => 0,
  );
  assert.deepStrictEqual(res, { evento: "retorno_tras_pausa", dias: 3 });
});

test("decidirRefuerzo: azar 0,99 no sale y azar 0,0 sí sale", () => {
  const entrada = {
    elegibles: [{ evento: "simulacro_terminado" as const, totalSimulacros: 5 }],
    sorpresasHoy: 0,
    activo: true,
  };
  assert.equal(decidirRefuerzo(entrada, () => 0.99), null);
  assert.deepStrictEqual(decidirRefuerzo(entrada, () => 0.0), {
    evento: "simulacro_terminado",
    totalSimulacros: 5,
  });
});

test("misma entrada y misma semilla dan el mismo resultado (recargar no cambia)", () => {
  const semilla = fnv1a("usr-99|sim-77");
  const entrada = {
    elegibles: [
      { evento: "mejora_area_debil" as const, area: "Fisica", antes: 40, ahora: 58 },
      { evento: "simulacro_terminado" as const, totalSimulacros: 6 },
    ],
    sorpresasHoy: 1,
    activo: true,
  };
  const d1 = decidirRefuerzo(entrada, crearAzar(semilla));
  const d2 = decidirRefuerzo(entrada, crearAzar(semilla));
  assert.deepStrictEqual(d1, d2);
});

test("refuerzo.ts no depende del plan", () => {
  const fuente = readFileSync(new URL("./refuerzo.ts", import.meta.url), "utf8");
  for (const prohibido of ["esPago", "premium", "@/lib/plan", "@/lib/precios"]) {
    assert.equal(
      fuente.includes(prohibido),
      false,
      `refuerzo.ts no debe contener ${prohibido}`,
    );
  }
});

const DECISIONES_MUESTRA: DecisionRefuerzo[] = [
  { evento: "simulacro_terminado", totalSimulacros: 4 },
  { evento: "mejora_area_debil", area: "Matematicas", antes: 38, ahora: 54 },
  { evento: "error_corregido", correctas: 1 },
  { evento: "error_corregido", correctas: 3 },
  { evento: "retorno_tras_pausa", dias: 1 },
  { evento: "retorno_tras_pausa", dias: 4 },
];

function todosLosTextos(): string[] {
  return [
    ...DECISIONES_MUESTRA.map((d) => textoRefuerzo(d)),
    textoRepasoFijo(1, 1),
    textoRepasoFijo(5, 3),
    textoDominadas(1),
    textoDominadas(4),
    textoConstancia(3),
  ];
}

test("los textos no usan voseo", () => {
  const reVoseo = /\b(podés|tenés|hacé|sos|vos|mirá|fijate)\b/i;
  for (const t of todosLosTextos()) {
    assert.equal(reVoseo.test(t), false, `voseo detectado en: ${t}`);
  }
});

test("los textos no tienen emojis ni culpa ni cuenta regresiva", () => {
  const reCulpa = /(pierd|perdiste|racha|castig|quedan|expira|apúrate)/i;
  const reEmoji = /\p{Extended_Pictographic}/u;
  for (const t of todosLosTextos()) {
    assert.equal(reCulpa.test(t), false, `culpa o cuenta regresiva en: ${t}`);
    assert.equal(reEmoji.test(t), false, `emoji detectado en: ${t}`);
  }
});

test("los textos no inventan cifras ni comparan con otros", () => {
  const reComparacion = /(compañeros|otros alumnos|la mayoría)/i;
  const casos: Array<{ texto: string; numeros: number[] }> = [
    {
      texto: textoRefuerzo({ evento: "simulacro_terminado", totalSimulacros: 12 }),
      numeros: [12],
    },
    {
      texto: textoRefuerzo({
        evento: "mejora_area_debil",
        area: "Algebra",
        antes: 42,
        ahora: 59,
      }),
      numeros: [42, 59],
    },
    {
      texto: textoRefuerzo({ evento: "error_corregido", correctas: 6 }),
      numeros: [6],
    },
    {
      texto: textoRefuerzo({ evento: "retorno_tras_pausa", dias: 3 }),
      numeros: [3],
    },
    { texto: textoRepasoFijo(1, 1), numeros: [1, 1] },
    { texto: textoRepasoFijo(8, 5), numeros: [8, 5] },
    { texto: textoDominadas(1), numeros: [1] },
    { texto: textoDominadas(2), numeros: [2] },
    { texto: textoConstancia(4), numeros: [4, REFUERZO.ventanaDias] },
  ];

  for (const { texto, numeros } of casos) {
    assert.equal(reComparacion.test(texto), false, `comparación social en: ${texto}`);
    const hallados = (texto.match(/\d+/g) ?? []).map(Number);
    assert.deepStrictEqual(hallados, numeros, `cifras inesperadas en: ${texto}`);
  }
});

test("plural correcto: 1 pregunta y 2 preguntas, 1 día y 3 días", () => {
  assert.equal(plural(1, "pregunta", "preguntas"), "pregunta");
  assert.equal(plural(2, "pregunta", "preguntas"), "preguntas");
  assert.equal(plural(1, "día", "días"), "día");
  assert.equal(plural(3, "día", "días"), "días");
  assert.match(textoRefuerzo({ evento: "error_corregido", correctas: 1 }), /\b1 pregunta\b/);
  assert.match(textoRefuerzo({ evento: "error_corregido", correctas: 2 }), /\b2 preguntas\b/);
  assert.match(textoRefuerzo({ evento: "retorno_tras_pausa", dias: 1 }), /\b1 día\b/);
  assert.match(textoRefuerzo({ evento: "retorno_tras_pausa", dias: 3 }), /\b3 días\b/);
  assert.match(textoDominadas(1), /\b1 pregunta\b.*\brepasarla\b/);
  assert.match(textoDominadas(2), /\b2 preguntas\b.*\brepasarlas\b/);
});

test("textoDominadas y textoConstancia con 0 devuelven cadena vacía", () => {
  assert.equal(textoDominadas(0), "");
  assert.equal(textoDominadas(-2), "");
  assert.equal(textoConstancia(0), "");
  assert.equal(textoConstancia(-1), "");
});

test("textoRepasoFijo usa singular y plural", () => {
  assert.equal(textoRepasoFijo(0, 0), "");
  assert.equal(
    textoRepasoFijo(1, 1),
    "Repasaste 1 pregunta que habías fallado: acertaste 1.",
  );
  assert.equal(
    textoRepasoFijo(5, 3),
    "Repasaste 5 preguntas que habías fallado: acertaste 3.",
  );
});

import { describe, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  AUDIOLIBROS_MEDICINA,
  VELOCIDADES_AUDIO,
  claveProgresoAudio,
  construirUrlAudio,
  extraerSlugAprende,
  formatearTiempoAudio,
  obtenerAudiolibro,
  parsearProgresoAudio,
  tieneAudiolibro,
} from "./audio-medicina.ts";

describe("catalogo de audiolibros de Medicina", () => {
  test("obtenerAudiolibro y tieneAudiolibro resuelven unidades mapeadas e inexistentes", () => {
    const morfo = obtenerAudiolibro("morfofuncion-introduccion");
    assert.ok(morfo);
    assert.equal(morfo.gratis, true);
    assert.equal(morfo.pistas.length, 10);

    const bcm = obtenerAudiolibro("bcm-membrana-transporte");
    assert.ok(bcm);
    assert.equal(bcm.gratis, true);
    assert.equal(bcm.pistas.length, 17);

    const nerv = obtenerAudiolibro("sistema-nervioso");
    assert.ok(nerv);
    assert.equal(nerv.gratis, false);
    assert.ok(nerv.pistas.length > 0);

    assert.ok(Object.keys(AUDIOLIBROS_MEDICINA).length >= 22);
    assert.equal(tieneAudiolibro("morfofuncion-introduccion"), true);
    assert.equal(tieneAudiolibro("bcm-membrana-transporte"), true);
    assert.equal(tieneAudiolibro("sistema-cardiovascular"), true);
    assert.equal(tieneAudiolibro("bio-citoesqueleto"), true);
    assert.equal(tieneAudiolibro("potenciacion"), false);
    assert.equal(tieneAudiolibro(""), false);
    assert.equal(tieneAudiolibro(undefined), false);
    assert.equal(obtenerAudiolibro("toString"), null);
    assert.equal(obtenerAudiolibro("no-existe"), null);
  });

  test("si la carpeta local de audiolibros existe, cada ruta relativa apunta a un MP3 real", () => {
    const base = path.join(
      process.cwd(),
      "examenes pasados",
      "MEDICINA",
      "LIBROS DE MEDICINA",
      "AUDIOS_MEDICINA_UMSS",
    );
    if (!fs.existsSync(base)) return;
    const faltantes: string[] = [];
    for (const unidad of Object.values(AUDIOLIBROS_MEDICINA)) {
      for (const pista of unidad.pistas) {
        const abs = path.join(base, ...pista.rutaRelativa.split("/"));
        if (!fs.existsSync(abs)) faltantes.push(pista.rutaRelativa);
      }
    }
    assert.deepEqual(faltantes, []);
  });

  test("todas las rutas relativas tienen carpeta valida, terminan en .mp3 y no contienen '..'", () => {
    const ids = new Set<string>();
    for (const [clave, unidad] of Object.entries(AUDIOLIBROS_MEDICINA)) {
      assert.equal(unidad.slug, clave);
      assert.ok(unidad.pistas.length > 0);
      unidad.pistas.forEach((pista, idx) => {
        assert.equal(pista.numero, idx + 1);
        assert.ok(!ids.has(pista.id), `id repetido: ${pista.id}`);
        ids.add(pista.id);
        assert.ok(!pista.rutaRelativa.startsWith("/"));
        assert.ok(!pista.rutaRelativa.includes(".."));
        assert.ok(!pista.rutaRelativa.includes("\\"));
        assert.match(pista.rutaRelativa, /^[^/]+\/[^/]+\.mp3$/);
      });
    }
  });

  test("ningun titulo o texto visible al alumno tiene voseo, guion largo ni emojis", () => {
    const voseo = /\b(vos|podés|tenés|hacés|sabés|querés|mirá|escuchá|tocá|seguí|vení|poné|usá|elegí)\b/iu;
    const emoji = /\p{Extended_Pictographic}/u;

    for (const unidad of Object.values(AUDIOLIBROS_MEDICINA)) {
      const textos = [unidad.libro, unidad.capitulo, ...unidad.pistas.map((p) => p.titulo)];
      for (const texto of textos) {
        assert.equal(voseo.test(texto), false, `voseo detectado en: ${texto}`);
        assert.equal(texto.includes("\u2014"), false, `guion largo detectado en: ${texto}`);
        assert.equal(emoji.test(texto), false, `emoji detectado en: ${texto}`);
      }
    }
  });
});

describe("extraerSlugAprende", () => {
  test("extrae slug en rutas validas y devuelve null en el resto", () => {
    assert.equal(
      extraerSlugAprende("/aprende/morfofuncion-introduccion"),
      "morfofuncion-introduccion",
    );
    assert.equal(
      extraerSlugAprende("/aprende/bcm-membrana-transporte/"),
      "bcm-membrana-transporte",
    );
    assert.equal(
      extraerSlugAprende("/aprende/morfofuncion-introduccion?ref=lista"),
      "morfofuncion-introduccion",
    );
    assert.equal(extraerSlugAprende("/aprende"), null);
    assert.equal(extraerSlugAprende("/aprende/"), null);
    assert.equal(extraerSlugAprende("/dashboard"), null);
    assert.equal(extraerSlugAprende("/aprende/una/dos"), null);
    assert.equal(extraerSlugAprende(null), null);
    assert.equal(extraerSlugAprende(undefined), null);
  });
});

describe("construirUrlAudio", () => {
  const ruta = "2_MORFOFISIOLOGIA/Morfo_Cap_01_P01_Introduccion_y_Ambito_de_la_Anatomia_y_Fisiologia.mp3";

  test("arma URL con baseUrl R2 con y sin barra final", () => {
    assert.equal(
      construirUrlAudio(ruta, { baseUrl: "https://audio.axiom.bo" }),
      `https://audio.axiom.bo/${ruta}`,
    );
    assert.equal(
      construirUrlAudio(ruta, { baseUrl: "https://audio.axiom.bo///" }),
      `https://audio.axiom.bo/${ruta}`,
    );
    assert.equal(
      construirUrlAudio("carpeta 1/archivo con espacio.mp3", {
        baseUrl: "https://audio.axiom.bo/",
      }),
      "https://audio.axiom.bo/carpeta%201/archivo%20con%20espacio.mp3",
    );
  });

  test("sin baseUrl devuelve /api/dev-audio en desarrollo y null en produccion", () => {
    assert.equal(
      construirUrlAudio(ruta, { baseUrl: "", esDev: true }),
      `/api/dev-audio/${ruta}`,
    );
    assert.equal(construirUrlAudio(ruta, { baseUrl: "", esDev: false }), null);
    assert.equal(construirUrlAudio("", { baseUrl: "https://audio.axiom.bo" }), null);
  });
});

describe("formatearTiempoAudio", () => {
  test("formatea ceros, valores invalidos, minutos y horas", () => {
    assert.equal(formatearTiempoAudio(0), "00:00");
    assert.equal(formatearTiempoAudio(-12), "00:00");
    assert.equal(formatearTiempoAudio(Number.NaN), "00:00");
    assert.equal(formatearTiempoAudio(Number.POSITIVE_INFINITY), "00:00");
    assert.equal(formatearTiempoAudio(5), "00:05");
    assert.equal(formatearTiempoAudio(65), "01:05");
    assert.equal(formatearTiempoAudio(3599), "59:59");
    assert.equal(formatearTiempoAudio(3665), "1:01:05");
  });
});

describe("claveProgresoAudio y parsearProgresoAudio", () => {
  test("genera la clave versionada", () => {
    assert.equal(
      claveProgresoAudio("morfofuncion-introduccion"),
      "axiom_audio_v1_morfofuncion-introduccion",
    );
  });

  test("parsea progreso valido y sanea valores corruptos o fuera de rango", () => {
    assert.deepEqual(
      parsearProgresoAudio(
        JSON.stringify({ pistaIdx: 3, tiempo: 142.5, velocidad: 1.5 }),
        10,
      ),
      { pistaIdx: 3, tiempo: 142.5, velocidad: 1.5 },
    );

    assert.equal(parsearProgresoAudio(null, 10), null);
    assert.equal(parsearProgresoAudio("", 10), null);
    assert.equal(parsearProgresoAudio("{json roto", 10), null);
    assert.equal(parsearProgresoAudio("[]", 10), null);
    assert.equal(parsearProgresoAudio(JSON.stringify({ pistaIdx: "1" }), 10), null);
    assert.equal(parsearProgresoAudio(JSON.stringify({ pistaIdx: 0, tiempo: 10, velocidad: 1 }), 0), null);

    assert.deepEqual(
      parsearProgresoAudio(
        JSON.stringify({ pistaIdx: 99, tiempo: -10, velocidad: 4 }),
        8,
      ),
      { pistaIdx: 7, tiempo: 0, velocidad: 1 },
    );

    assert.deepEqual(
      parsearProgresoAudio(
        JSON.stringify({ pistaIdx: -2, tiempo: 30, velocidad: 0.75 }),
        8,
      ),
      { pistaIdx: 0, tiempo: 30, velocidad: 0.75 },
    );

    assert.equal(VELOCIDADES_AUDIO.includes(1), true);
  });
});

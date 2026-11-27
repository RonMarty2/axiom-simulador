import { test } from "node:test";
import assert from "node:assert/strict";
import {
  CLAVE_PROGRESO_LECCIONES,
  CLAVE_ESCENAS_LECCIONES,
  EVENTO_PROGRESO_LECCIONES,
  leerLeccionesCompletadas,
  marcarLeccionCompletada,
  estaLeccionCompletada,
  contarCompletadasEnBloque,
  bloqueDeArea,
  leerMapaEscenas,
  leerEscenaLeccion,
  guardarEscenaLeccion,
  limpiarEscenaLeccion,
  claveProgresoUsuario,
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

function conMockWindow(fn: (ctx: { storage: Map<string, string>; eventos: string[] }) => void): void {
  const globalObj = globalThis as unknown as { window?: unknown };
  const previa = globalObj.window;
  const storage = new Map<string, string>();
  const eventos: string[] = [];
  globalObj.window = {
    localStorage: {
      getItem: (k: string) => storage.get(k) ?? null,
      setItem: (k: string, v: string) => {
        storage.set(k, String(v));
      },
      removeItem: (k: string) => {
        storage.delete(k);
      },
    },
    dispatchEvent: (ev: Event) => {
      eventos.push(ev.type);
      return true;
    },
  };
  try {
    fn({ storage, eventos });
  } finally {
    if (previa === undefined) {
      delete globalObj.window;
    } else {
      globalObj.window = previa;
    }
  }
}

test("progreso-lecciones: aislamiento por usuarioId en completadas y escenas", () => {
  conMockWindow(({ eventos }) => {
    marcarLeccionCompletada("tema-a", "u1");
    marcarLeccionCompletada("tema-b", "u2");
    marcarLeccionCompletada("tema-anon");

    assert.deepStrictEqual(leerLeccionesCompletadas("u1"), ["tema-a"]);
    assert.deepStrictEqual(leerLeccionesCompletadas("u2"), ["tema-b"]);
    assert.deepStrictEqual(leerLeccionesCompletadas(), ["tema-anon"]);
    assert.equal(estaLeccionCompletada("tema-a", undefined, "u2"), false);
    assert.equal(estaLeccionCompletada("tema-a", undefined, "u1"), true);

    guardarEscenaLeccion("lec-1", 2, 5, "u1");
    guardarEscenaLeccion("lec-1", 4, 5, "u2");
    guardarEscenaLeccion("lec-1", 1, 5);

    assert.equal(leerEscenaLeccion("lec-1", 5, "u1"), 2);
    assert.equal(leerEscenaLeccion("lec-1", 5, "u2"), 4);
    assert.equal(leerEscenaLeccion("lec-1", 5), 1);
    assert.ok(eventos.every((e) => e === EVENTO_PROGRESO_LECCIONES));
    assert.equal(eventos.length, 6);
  });
});

test("progreso-lecciones: clamping de escenas fuera de rango y JSON corrupto", () => {
  conMockWindow(({ storage }) => {
    assert.equal(guardarEscenaLeccion("lec-clamp", -3, 4, "u1"), 0);
    assert.equal(leerEscenaLeccion("lec-clamp", 4, "u1"), 0);

    assert.equal(guardarEscenaLeccion("lec-clamp", 10, 4, "u1"), 3);
    assert.equal(leerEscenaLeccion("lec-clamp", 4, "u1"), 3);

    // Si en storage quedó un índice mayor al total actual, leerEscenaLeccion también lo acota
    storage.set(
      claveProgresoUsuario(CLAVE_ESCENAS_LECCIONES, "u1"),
      JSON.stringify({ "lec-clamp": 99 }),
    );
    assert.equal(leerEscenaLeccion("lec-clamp", 5, "u1"), 4);

    // JSON corrupto no rompe ni completadas ni escenas
    storage.set(claveProgresoUsuario(CLAVE_PROGRESO_LECCIONES, "u-roto"), "{corrupto");
    storage.set(claveProgresoUsuario(CLAVE_ESCENAS_LECCIONES, "u-roto"), "[1,2,3");
    assert.deepStrictEqual(leerLeccionesCompletadas("u-roto"), []);
    assert.deepStrictEqual(leerMapaEscenas("u-roto"), {});
    assert.equal(leerEscenaLeccion("x", 5, "u-roto"), 0);
  });
});

test("progreso-lecciones: limpiarEscenaLeccion borra solo ese slug y dispara evento", () => {
  conMockWindow(({ eventos }) => {
    guardarEscenaLeccion("lec-uno", 2, 6, "u1");
    guardarEscenaLeccion("lec-dos", 3, 6, "u1");
    const antes = eventos.length;

    limpiarEscenaLeccion("lec-uno", "u1");

    assert.deepStrictEqual(leerMapaEscenas("u1"), { "lec-dos": 3 });
    assert.equal(leerEscenaLeccion("lec-uno", 6, "u1"), 0);
    assert.equal(leerEscenaLeccion("lec-dos", 6, "u1"), 3);
    assert.equal(eventos.length, antes + 1);
    assert.equal(eventos[eventos.length - 1], EVENTO_PROGRESO_LECCIONES);
  });
});

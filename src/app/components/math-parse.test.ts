import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { parsearMath } from "./math-parse.ts";

// Lo que se está cuidando acá es que el alumno NO vea markdown crudo, y al
// mismo tiempo que KaTeX siga recibiendo intacto lo que está entre $.
// La regresión que motivó esto: 58 explicaciones del banco mostraban
// literalmente "**La clave:**" con los asteriscos.

describe("parsearMath", () => {
  test("texto pelado sale como un solo tramo", () => {
    assert.deepEqual(parsearMath("hola mundo"), [
      { tipo: "texto", contenido: "hola mundo" },
    ]);
  });

  test("separa $$display$$ de $inline$", () => {
    const segs = parsearMath("antes $$a^2$$ medio $b$ final");
    assert.deepEqual(segs.map((s) => s.tipo), [
      "texto", "display", "texto", "inline", "texto",
    ]);
    assert.equal(segs[1].contenido, "a^2");
    assert.equal(segs[3].contenido, "b");
  });

  test("**negrita** se vuelve su propio segmento, sin los asteriscos", () => {
    assert.deepEqual(parsearMath("ojo: **la clave** está acá"), [
      { tipo: "texto", contenido: "ojo: " },
      { tipo: "negrita", contenido: "la clave" },
      { tipo: "texto", contenido: " está acá" },
    ]);
  });

  test("varias negritas en el mismo párrafo", () => {
    const segs = parsearMath("**uno** y **dos**");
    assert.deepEqual(
      segs.filter((s) => s.tipo === "negrita").map((s) => s.contenido),
      ["uno", "dos"],
    );
  });

  // Este es el que importa de verdad: dentro de una fórmula, ** puede ser un
  // exponente de un exponente. Si el parser de negrita lo tocara, KaTeX
  // recibiría la fórmula mutilada.
  test("no toca los asteriscos que están adentro de una fórmula", () => {
    const segs = parsearMath("vale $2**3$ nomás");
    assert.deepEqual(segs, [
      { tipo: "texto", contenido: "vale " },
      { tipo: "inline", contenido: "2**3" },
      { tipo: "texto", contenido: " nomás" },
    ]);
  });

  test("la negrita funciona en los dos lados de una fórmula", () => {
    const segs = parsearMath("**antes** $x$ **después**");
    assert.deepEqual(segs.map((s) => s.tipo), [
      "negrita", "texto", "inline", "texto", "negrita",
    ]);
  });

  // El * suelto es multiplicación escrita a mano, no markdown a medio cerrar.
  test("un solo asterisco no abre negrita", () => {
    assert.deepEqual(parsearMath("3 * 4"), [{ tipo: "texto", contenido: "3 * 4" }]);
  });

  test("un ** sin cerrar se deja como estaba", () => {
    assert.deepEqual(parsearMath("**sin cerrar"), [
      { tipo: "texto", contenido: "**sin cerrar" },
    ]);
  });

  // La regex de negrita es global; si no se le reseteara lastIndex, la segunda
  // llamada arrancaría a mitad de camino y se comería la primera negrita.
  test("dos llamadas seguidas dan el mismo resultado", () => {
    const texto = "**clave** del asunto";
    assert.deepEqual(parsearMath(texto), parsearMath(texto));
  });

  test("cadena vacía no revienta", () => {
    assert.deepEqual(parsearMath(""), []);
  });
});

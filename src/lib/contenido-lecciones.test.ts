import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

// ─────────────────────────────────────────────────────────────────────────────
// Trinquetes para el contenido de /aprende y /laminas.
//
// El banco de exámenes tiene tests desde el 13-sep y por eso se mantuvo sano.
// Las lecciones no tenían ninguno, y la auditoría del 15-sep (§8, y el informe
// en docs/auditoria-pedagogica.md) encontró en 25 de las 103 unos 50 errores de
// contenido. Varios de ellos los caza una máquina en un segundo:
//
//   - "√48/√3" tenía "4" y "√16 = 4" como opciones DISTINTAS: las dos correctas,
//     así que el alumno acertaba y veía una cruz.
//   - Un AutoCheck marcaba como correcta "las dos b) y c)", dando por buena una
//     opción que era el error clásico de la distributiva.
//   - Un test de 6 ejercicios tenía las 6 respuestas en el primer botón: se
//     aprueba sin leer.
//   - El paso a tuteo del 13-sep dejó 22 casos de voseo sueltos.
//
// Esto NO detecta lagunas pedagógicas (para eso hay que leer, ver el informe).
// Detecta lo mecánico, que es justamente lo que se escapa al escribir rápido.
// ─────────────────────────────────────────────────────────────────────────────

const RAIZ = join(process.cwd(), "src", "app");

function archivosDeContenido(): string[] {
  const salida: string[] = [];
  const aprende = join(RAIZ, "aprende");
  if (existsSync(aprende)) {
    for (const d of readdirSync(aprende, { withFileTypes: true })) {
      if (!d.isDirectory() || d.name.startsWith("_")) continue;
      const p = join(aprende, d.name, "page.tsx");
      if (existsSync(p)) salida.push(p);
    }
  }
  const laminas = join(RAIZ, "laminas");
  if (existsSync(laminas)) {
    for (const mod of readdirSync(laminas, { withFileTypes: true })) {
      if (!mod.isDirectory() || mod.name.startsWith("_")) continue;
      for (const l of readdirSync(join(laminas, mod.name), { withFileTypes: true })) {
        if (!l.isDirectory()) continue;
        const p = join(laminas, mod.name, l.name, "page.tsx");
        if (existsSync(p)) salida.push(p);
      }
    }
  }
  return salida;
}

const ARCHIVOS = archivosDeContenido();
const corto = (p: string) => p.slice(p.indexOf("src/app/") + 8).replace("/page.tsx", "");

/** Lee un array literal de strings desde `desde` (que apunta al "["). */
function leerArrayDeStrings(src: string, desde: number): { items: string[]; fin: number } | null {
  if (src[desde] !== "[") return null;
  const items: string[] = [];
  let i = desde + 1;
  let profundidad = 0;
  while (i < src.length) {
    const c = src[i];
    if (c === "]" && profundidad === 0) return { items, fin: i };
    if (c === "[" || c === "{" || c === "(") profundidad++;
    else if (c === "]" || c === "}" || c === ")") profundidad--;
    else if ((c === '"' || c === "'" || c === "`") && profundidad === 0) {
      const comilla = c;
      let j = i + 1;
      let texto = "";
      while (j < src.length && src[j] !== comilla) {
        if (src[j] === "\\") { texto += src[j + 1] ?? ""; j += 2; continue; }
        texto += src[j];
        j++;
      }
      items.push(texto);
      i = j;
    }
    i++;
  }
  return null;
}

interface Ejercicio {
  archivo: string;
  linea: number;
  opciones: string[];
  correcta: number | null;
}

/** Extrae los ejercicios de un archivo: <AutoCheck opciones={[...]} correctaIdx={n} /> y { o: [...], c: n }. */
function ejerciciosDe(ruta: string): Ejercicio[] {
  const src = readFileSync(ruta, "utf8");
  const lineaDe = (idx: number) => src.slice(0, idx).split("\n").length;
  const salida: Ejercicio[] = [];

  for (const m of src.matchAll(/\bopciones=\{\s*\[/g)) {
    const inicio = src.indexOf("[", m.index!);
    const arr = leerArrayDeStrings(src, inicio);
    if (!arr) continue;
    const resto = src.slice(arr.fin, arr.fin + 400);
    const idx = resto.match(/correctaIdx=\{\s*(\d+)\s*\}/);
    salida.push({
      archivo: corto(ruta), linea: lineaDe(m.index!),
      opciones: arr.items, correcta: idx ? Number(idx[1]) : null,
    });
  }

  for (const m of src.matchAll(/\bo:\s*\[/g)) {
    const inicio = src.indexOf("[", m.index!);
    const arr = leerArrayDeStrings(src, inicio);
    if (!arr) continue;
    const resto = src.slice(arr.fin, arr.fin + 400);
    const idx = resto.match(/\bc:\s*(\d+)/);
    salida.push({
      archivo: corto(ruta), linea: lineaDe(m.index!),
      opciones: arr.items, correcta: idx ? Number(idx[1]) : null,
    });
  }

  return salida;
}

const EJERCICIOS = ARCHIVOS.flatMap(ejerciciosDe);

function limpiar(opcion: string): string {
  return opcion.replace(/<[^>]*>/g, "").replace(/[\s$]/g, "").trim();
}

/** El lado derecho de una opción que tenga UN "=", o null si no tiene. */
function ladoDerecho(opcion: string): string | null {
  const l = limpiar(opcion);
  const partes = l.split("=");
  if (partes.length !== 2) return null;
  return partes[1] || null;
}

describe("contenido de lecciones y láminas", () => {
  test("hay contenido para revisar", () => {
    assert.ok(ARCHIVOS.length > 100, `esperaba más de 100 archivos, encontré ${ARCHIVOS.length}`);
    assert.ok(EJERCICIOS.length > 100, `esperaba más de 100 ejercicios, encontré ${EJERCICIOS.length}`);
  });

  test("ningún ejercicio marca como correcta una opción que no existe", () => {
    const malos = EJERCICIOS.filter(
      (e) => e.correcta !== null && e.opciones.length > 0 && e.correcta >= e.opciones.length,
    );
    assert.deepEqual(
      malos.map((e) => `${e.archivo}:${e.linea} marca la opción ${e.correcta} y solo hay ${e.opciones.length}`),
      [],
    );
  });

  test("ningún ejercicio repite una opción palabra por palabra", () => {
    // Sensible a mayúsculas a propósito: hay un ejercicio sobre nomenclatura
    // científica cuyas cuatro opciones son "homo sapiens" / "Homo Sapiens" /
    // "Homo sapiens" / "HOMO SAPIENS", y ahí la capitalización ES la pregunta.
    const malos: string[] = [];
    for (const e of EJERCICIOS) {
      const vistas = new Map<string, number>();
      for (const o of e.opciones) {
        const k = o.trim();
        if (!k) continue;
        vistas.set(k, (vistas.get(k) ?? 0) + 1);
      }
      for (const [texto, veces] of vistas) {
        if (veces > 1) malos.push(`${e.archivo}:${e.linea} repite "${texto}" ${veces} veces`);
      }
    }
    assert.deepEqual(malos, []);
  });

  test("ningún ejercicio ofrece la misma respuesta escrita de dos formas", () => {
    // El caso real: "√48/√3" tenía "4" y "√16 = 4" como opciones distintas. Las
    // dos correctas, así que el alumno que marcaba la primera veía una cruz.
    //
    // Solo se compara cuando UNA opción tiene un "=" y la otra no: comparar los
    // lados derechos entre sí marcaría como iguales a "x²−6x+8=0" y "x²−4x+8=0",
    // que terminan las dos en "0" y son ecuaciones distintas.
    const malos: string[] = [];
    for (const e of EJERCICIOS) {
      for (let i = 0; i < e.opciones.length; i++) {
        for (let j = 0; j < e.opciones.length; j++) {
          if (i === j) continue;
          const derecho = ladoDerecho(e.opciones[i]);
          const otra = limpiar(e.opciones[j]);
          if (!derecho || !otra || otra.includes("=")) continue;
          if (derecho === otra) {
            malos.push(`${e.archivo}:${e.linea} → "${e.opciones[i]}" y "${e.opciones[j]}" son la misma respuesta`);
          }
        }
      }
    }
    assert.deepEqual(malos, []);
  });

  // TRINQUETE. Si la práctica final de una lección tiene sus 5 o 6 respuestas
  // siempre en el mismo botón, el alumno aprueba sin leer una sola pregunta.
  // Hoy pasa en 23 lecciones. Este número SOLO PUEDE BAJAR: cuando barajes los
  // índices de una, actualizá el tope acá. Nunca lo subas para que pase el test.
  const TOPE_MISMO_BOTON = 23;

  test(`como mucho ${TOPE_MISMO_BOTON} lecciones tienen todas sus respuestas en el mismo botón`, () => {
    const porArchivo = new Map<string, number[]>();
    for (const e of EJERCICIOS) {
      if (e.correcta === null || e.opciones.length < 2) continue;
      porArchivo.set(e.archivo, [...(porArchivo.get(e.archivo) ?? []), e.correcta]);
    }
    const malos: string[] = [];
    for (const [archivo, indices] of porArchivo) {
      if (indices.length >= 5 && new Set(indices).size === 1) {
        malos.push(`${archivo}: sus ${indices.length} respuestas son siempre la opción ${indices[0]}`);
      }
    }
    assert.ok(
      malos.length <= TOPE_MISMO_BOTON,
      `el trinquete está en ${TOPE_MISMO_BOTON} y ahora hay ${malos.length}:\n  ${malos.join("\n  ")}`,
    );
  });

  test("el texto del alumno está en tuteo, no en voseo", () => {
    // Solo formas inequívocas: "sabes" es tuteo CORRECTO, el voseo es "sabés".
    // Los comentarios de código van en rioplatense a propósito (regla 2 de
    // CLAUDE.md), así que se saltean.
    const VOSEO = new RegExp(
      "(?<![\\p{L}])(" +
      "podés|tenés|querés|sabés|hacés|decís|vivís|escribís|mirás|buscás|calculás|" +
      "usás|necesitás|comparás|sumás|restás|multiplicás|dividís|resolvés|elegís|" +
      "pensás|obtenés|empezás|terminás|aprendés|entendés|ponés|venís|" +
      "mirá|fijate|calculá|probá|sumá|restá|hacé|poné|tené|decí|escribí|elegí|" +
      "colocá|observá|recordá|acordate|pasá|tomá|agarrá|buscá|usá" +
      ")(?![\\p{L}])", "iu");

    const malos: string[] = [];
    for (const ruta of ARCHIVOS) {
      const lineas = readFileSync(ruta, "utf8").split("\n");
      for (let i = 0; i < lineas.length; i++) {
        const l = lineas[i];
        if (/^\s*(\/\/|\*|\/\*)/.test(l)) continue;
        const sinCodigo = l.replace(/<[^>]*>/g, " ").replace(/\{\/\*[\s\S]*?\*\/\}/g, " ");
        const hit = sinCodigo.match(VOSEO);
        if (hit) malos.push(`${corto(ruta)}:${i + 1} dice "${hit[0]}"`);
      }
    }
    assert.deepEqual(malos, []);
  });
});

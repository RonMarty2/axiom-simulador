import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { createRequire } from "node:module";
import { parseExamenMD } from "./banco-parser.ts";

// Tests sobre el banco REAL, con el parser REAL. La BITACORA §7 documenta
// varios casos en que un .md mal formado rompió el banco en silencio: el
// parser fallaba, el loader se comía el error con un console.error y el examen
// simplemente desaparecía de la lista sin que nadie lo notara. Esto lo levanta.

const require = createRequire(join(process.cwd(), "package.json"));
const katex = require("katex");

const RAIZ = join(process.cwd(), "data", "examenes", "umss");

function examenes(): { ruta: string; nombre: string; contenido: string }[] {
  const out = [];
  for (const facultad of readdirSync(RAIZ)) {
    const dir = join(RAIZ, facultad);
    for (const archivo of readdirSync(dir).filter((f) => f.endsWith(".md"))) {
      const ruta = join(dir, archivo);
      out.push({ ruta, nombre: `${facultad}/${archivo}`, contenido: readFileSync(ruta, "utf8") });
    }
  }
  return out;
}

const TODOS = existsSync(RAIZ) ? examenes() : [];

describe("banco de exámenes", () => {
  test("hay exámenes que revisar", () => {
    assert.ok(TODOS.length > 100, `se esperaban >100 exámenes, hay ${TODOS.length}`);
  });

  test("todos parsean sin tirar error", () => {
    const rotos: string[] = [];
    for (const e of TODOS) {
      try {
        parseExamenMD(e.contenido);
      } catch (err) {
        rotos.push(`${e.nombre}: ${err instanceof Error ? err.message : String(err)}`);
      }
    }
    assert.deepEqual(rotos, [], `exámenes que el parser no puede leer:\n${rotos.join("\n")}`);
  });

  test("cada respuesta correcta tiene una opción que le corresponde", () => {
    // El caso que más duele: la pregunta se muestra, el alumno responde, y
    // ninguna opción coincide con la respuesta marcada.
    const fallos: string[] = [];
    for (const e of TODOS) {
      let examen;
      try { examen = parseExamenMD(e.contenido); } catch { continue; }
      for (const p of examen.preguntas) {
        const letras = p.opciones.map((o) => o.letra);
        if (!letras.includes(p.respuesta_correcta)) {
          fallos.push(`${e.nombre} · ${p.id}: respuesta ${p.respuesta_correcta}, opciones ${letras.join(",")}`);
        }
      }
    }
    assert.deepEqual(fallos, [], `respuestas sin opción:\n${fallos.join("\n")}`);
  });

  test("no hay ids repetidos en todo el banco", () => {
    // Dos exámenes con el mismo id hacen que uno tape al otro en la UI.
    const vistos = new Map<string, string>();
    const repetidos: string[] = [];
    for (const e of TODOS) {
      let examen;
      try { examen = parseExamenMD(e.contenido); } catch { continue; }
      const previo = vistos.get(examen.id);
      if (previo) repetidos.push(`${examen.id}: ${previo} y ${e.nombre}`);
      else vistos.set(examen.id, e.nombre);
    }
    assert.deepEqual(repetidos, [], `ids de examen repetidos:\n${repetidos.join("\n")}`);
  });

  test("ninguna pregunta se queda sin enunciado", () => {
    // El agujero que aparecio el 17-sep: a 14 preguntas les faltaba la linea
    // en blanco entre el encabezado y el enunciado, asi que el parser se
    // comia el texto y el alumno veia las opciones SIN PREGUNTA. Ningun test
    // lo veia, porque las opciones y la respuesta estaban perfectas.
    const fallos: string[] = [];
    for (const e of TODOS) {
      let examen;
      try { examen = parseExamenMD(e.contenido); } catch { continue; }
      for (const p of examen.preguntas) {
        if (p.enunciado.trim().length === 0) fallos.push(`${e.nombre} · P${p.numero}`);
      }
    }
    assert.deepEqual(fallos, [], `preguntas sin enunciado:\n${fallos.join("\n")}`);
  });

  test("ninguna pregunta se queda sin opciones", () => {
    const fallos: string[] = [];
    for (const e of TODOS) {
      let examen;
      try { examen = parseExamenMD(e.contenido); } catch { continue; }
      for (const p of examen.preguntas) {
        if (p.opciones.length < 2) fallos.push(`${e.nombre} · ${p.id}: ${p.opciones.length} opciones`);
      }
    }
    assert.deepEqual(fallos, [], `preguntas sin opciones suficientes:\n${fallos.join("\n")}`);
  });

  // Trinquete: preguntas donde el alumno ve el cartel de "figura en
  // preparación" en vez del dibujo. Nació como tope que solo podía bajar, y
  // llegó a CERO: hoy todas las preguntas con `figura:` tienen su dibujo. El
  // tope queda en 0 para que agregar una pregunta con figura sin implementar
  // frene el test en el acto.
  //
  // Se descuentan las que traen su propio <svg> en el enunciado: el render
  // prioriza figura_svg sobre figura (ver examenes/[id] y resueltos/[examenId]),
  // así que esas nunca llegan a FiguraExamen y se ven perfectas. El `figura:`
  // que arrastran es un resto muerto. Contarlas inflaba el problema.
  const FIGURAS_PENDIENTES_TOPE = 0;

  test("el banco no pide figuras nuevas sin dibujar", () => {
    // Los ids implementados se leen del propio definiciones.ts en vez de
    // importarlo: ese módulo importa "./motor" sin extensión, y node --test
    // ejecuta ESM, donde la extensión es obligatoria. Cambiar los imports de
    // la app para acomodar un test sería la cola moviendo al perro.
    const fuente = readFileSync(join(process.cwd(), "src", "lib", "figuras", "definiciones.ts"), "utf8");
    const mapa = fuente.slice(fuente.indexOf("CONSTRUCTORES"));
    const implementadas = new Set([...mapa.matchAll(/"([a-z0-9][a-z0-9-]*)"\s*:/g)].map((m) => m[1]));
    // Cordura: si el formato del archivo cambia y el regex deja de matchear,
    // esto avisa en vez de dar por "faltante" absolutamente todo.
    assert.ok(implementadas.size >= 10, `no se pudieron leer los ids de definiciones.ts (${implementadas.size})`);

    const faltantes = new Map<string, string[]>();
    for (const e of TODOS) {
      // Por bloque de pregunta, no por archivo: el <svg> de una no cubre a otra.
      for (const bloque of e.contenido.split(/^---\s*$/m)) {
        const m = bloque.match(/^figura:\s*([a-z0-9][a-z0-9-]*)\s*$/im);
        if (!m) continue;
        const id = m[1];
        if (implementadas.has(id)) continue;
        if (/<svg[\s>]/i.test(bloque)) continue;   // ya trae su propio dibujo
        if (!faltantes.has(id)) faltantes.set(id, []);
        faltantes.get(id)!.push(e.nombre);
      }
    }
    const total = [...faltantes.values()].reduce((n, xs) => n + xs.length, 0);
    assert.ok(
      total <= FIGURAS_PENDIENTES_TOPE,
      `Subió la cantidad de preguntas con figura sin dibujar: ${total} (tope ${FIGURAS_PENDIENTES_TOPE}).\n` +
        `Ids sin figura:\n${[...faltantes.keys()].sort().join("\n")}`,
    );
    if (total < FIGURAS_PENDIENTES_TOPE) {
      console.log(`  ℹ figuras pendientes: ${total} (el tope está en ${FIGURAS_PENDIENTES_TOPE}, se puede bajar)`);
    }
  });

  test("toda la matemática se renderiza en KaTeX", () => {
    // Este es el que habría cachado \sen: no existe en KaTeX, y las 22
    // expresiones que lo usaban se le mostraban al alumno en rojo.
    // Se usa el mismo regex que MathText para separar math de texto.
    const RE = /(\$\$([^$]+)\$\$|\$([^$\n]+)\$)/g;
    const rotas: string[] = [];
    let total = 0;
    for (const e of TODOS) {
      e.contenido.split("\n").forEach((linea, i) => {
        RE.lastIndex = 0;
        let m;
        while ((m = RE.exec(linea)) !== null) {
          const display = m[2] !== undefined;
          total++;
          try {
            katex.renderToString(display ? m[2] : m[3], {
              displayMode: display, throwOnError: true, strict: "ignore", output: "html",
            });
          } catch (err) {
            if (rotas.length < 20) {
              rotas.push(`${e.nombre}:${i + 1}  $${display ? m[2] : m[3]}$  ->  ${(err instanceof Error ? err.message : "").split("\n")[0]}`);
            }
          }
        }
      });
    }
    assert.ok(total > 1000, `se esperaban miles de expresiones, hubo ${total}`);
    assert.deepEqual(rotas, [], `LaTeX que el alumno vería en rojo:\n${rotas.join("\n")}`);
  });
  // ── Chequeos que salieron de auditar el banco el 14-sep ────────────────────
  //
  // Los cuatro nacieron de encontrar el problema a mano. Quedan como test para
  // que no haya que volver a encontrarlo: lo que no se mide, se acumula.

  // Sin esto no hay forma de saber si un enunciado promete un dibujo que no
  // existe. El trinquete de más arriba NO los ve: cuenta las que DECLARAN
  // `figura:`, y estas ni siquiera lo declaran, así que el alumno lee "en la
  // figura adjunta…" y abajo no aparece nada. Es el mismo problema que se
  // arregló el 13-sep para las que sí declaraban, en la variante que el
  // trinquete no atrapaba.
  //
  // El tope es la foto del día que se midió. Solo puede BAJAR: se baja cuando
  // se dibuja la figura (y se declara `figura:`) o cuando se reescribe el
  // enunciado para que se sostenga solo.
  //
  // OJO CON QUÉ MIDE ESTO (16-sep-2026). Cuenta enunciados que TODAVÍA nombran
  // una figura. Reescribir el enunciado para que no la nombre baja el número
  // sin que la pregunta mejore, y ahí el problema se vuelve invisible: la P7
  // del 1-2016 1ra salió de la cuenta el 14-sep y necesitaba el dibujo igual —
  // peor, la descripción que le pusieron tenía el triángulo al revés. Hay 74
  // preguntas en esa situación, listadas en docs/figuras-pendientes.md. Bajar
  // este tope reescribiendo texto no es progreso; dibujar la figura sí.
  const FIGURAS_NO_DECLARADAS_TOPE = 1;

  // Nombra "la figura"/"el gráfico" como algo que debería estar a la vista.
  // Deja afuera a propósito los "se muestra a continuación" seguidos de la
  // ecuación o el circuito escritos en el propio texto: esos se sostienen
  // solos y marcarlos sería mentir al revés.
  //
  // Dos formas que se le agregaron el 16-sep, después de encontrarlas a mano en
  // los facsímiles de 2016: "ver figura 3" y "la figura 3 muestra". Las dos
  // preguntas que las usaban (`2016-1op-2` P6 y `2016-2op-2` P6) prometían un
  // dibujo que no estaba y este test las daba por limpias. Sumarlas costó cero
  // porque para entonces ya tenían su figura: lo que evitan es la próxima.
  const PIDE_FIGURA =
    /\b(?:en|de|seg[uú]n|dada|dado|muestra|mostrad[oa]s?\s+en|indicad[oa]\s+en|observad[oa]\s+en|de\s+acuerdo\s+a)\s+(?:la|el)\s+(?:figura|gr[aá]fico|esquema|diagrama)\b|\bfigura\s+(?:adjunta|mostrada|siguiente|anterior|dada)\b|\b(?:la|el)\s+(?:siguiente|figura)\s+(?:figura|gr[aá]fico|esquema|diagrama)\b|\bfigura\s*\d*\s*[:.]|\b(?:seg[uú]n|en)\s+(?:la\s+)?gr[aá]fica\b|\bver\s+(?:la\s+)?(?:figura|gr[aá]fico|esquema|diagrama)\b|\b(?:la|el)\s+(?:figura|gr[aá]fico|esquema|diagrama)\s*\d*\s+(?:muestra|indica)\b/i;

  test("ningún enunciado nuevo promete una figura que no está", () => {
    const sinDibujo: string[] = [];
    for (const e of TODOS) {
      let examen;
      try { examen = parseExamenMD(e.contenido); } catch { continue; }
      for (const p of examen.preguntas) {
        if (p.figura || p.figura_svg) continue;
        if (PIDE_FIGURA.test(p.enunciado)) sinDibujo.push(`${e.nombre} · P${p.numero} [${p.area}]`);
      }
    }
    assert.ok(
      sinDibujo.length <= FIGURAS_NO_DECLARADAS_TOPE,
      `Subieron los enunciados que nombran una figura ausente: ${sinDibujo.length} ` +
        `(tope ${FIGURAS_NO_DECLARADAS_TOPE}).\n${sinDibujo.slice(0, 25).join("\n")}`,
    );
    if (sinDibujo.length < FIGURAS_NO_DECLARADAS_TOPE) {
      console.log(`  ℹ enunciados sin su figura: ${sinDibujo.length} (el tope está en ${FIGURAS_NO_DECLARADAS_TOPE}, bajalo)`);
    }
  });

  // El error de §7 del 12-sep: una pregunta marcada D con una explicación que
  // calculaba otra cosa. El alumno lee las dos y no sabe a cuál creerle.
  test("la explicación no se contradice con la respuesta marcada", () => {
    const fallos: string[] = [];
    for (const e of TODOS) {
      let examen;
      try { examen = parseExamenMD(e.contenido); } catch { continue; }
      for (const p of examen.preguntas) {
        if (!p.explicacion) continue;
        const cierres = [...p.explicacion.matchAll(/Respuesta:\s*\**([A-E])\b/g)];
        if (!cierres.length) continue;
        const dice = cierres[cierres.length - 1][1].toUpperCase();
        if (dice !== p.respuesta_correcta) {
          fallos.push(`${e.nombre} · P${p.numero}: campo=${p.respuesta_correcta}, la explicación cierra en ${dice}`);
        }
      }
    }
    assert.deepEqual(fallos, [], `explicaciones que contradicen su propia respuesta:\n${fallos.join("\n")}`);
  });

  // La app le habla al alumno de TÚ (CLAUDE.md: son de Cochabamba). El banco
  // se normalizó el 14-sep; esto evita que entre voseo con la próxima tanda
  // de exámenes. Ojo: \b no sirve con tildes, por eso los lookarounds.
  test("el banco le habla al alumno de tú, no de vos", () => {
    // Antes esto era una lista de 20 formas escritas a mano, y dejaba pasar 28
    // casos: 24 de imperativo con pronombre pegado ("sumale", "convertila",
    // "igualalas") más "Balanceala" y tres "vos" que encima citaban mal el
    // enunciado, que dice "tú". Ninguna estaba en la lista porque a nadie se le
    // ocurrió escribirlas — el mismo problema que ya había documentado
    // contenido-lecciones.test.ts.
    //
    // Ahora se generan, con el enfoque que ese test dejó probado: se listan
    // INFINITIVOS y de cada uno salen sus formas voseantes. El futuro de tú
    // ("mirarás") no cae, porque lleva el infinitivo entero adelante. Para
    // sumar un verbo alcanza con agregarlo acá, en una palabra.
    const INFINITIVOS = [
      "poder", "tener", "querer", "saber", "hacer", "decir", "vivir", "escribir",
      "mirar", "buscar", "calcular", "usar", "necesitar", "comparar", "sumar",
      "restar", "multiplicar", "dividir", "resolver", "elegir", "pensar",
      "obtener", "empezar", "terminar", "aprender", "entender", "poner", "venir",
      "colocar", "observar", "recordar", "pasar", "tomar", "agarrar", "descontar",
      "armar", "fijar", "probar", "contar", "marcar", "anotar", "dibujar",
      "medir", "ordenar", "separar", "agrupar", "reemplazar", "despejar",
      "simplificar", "factorizar", "verificar", "comprobar", "revisar", "leer",
      "completar", "unir", "trazar", "cortar", "repetir", "girar", "estimar",
      "redondear", "convertir", "balancear", "mezclar", "diluir", "pesar",
      "clasificar", "identificar", "señalar", "relacionar", "deducir", "aplicar",
      "graficar", "ubicar", "avanzar", "seguir", "mover", "tocar", "sacar",
      "sustituir", "llevar", "cambiar", "operar", "cancelar", "igualar",
      "reducir", "dejar", "quitar", "notar", "bajar", "saltar", "plantear",
    ];

    const formas = new Set<string>();
    for (const inf of INFINITIVOS) {
      const raiz = inf.slice(0, -2);
      if (raiz.length < 2) continue;
      const term = inf.slice(-2);                             // ar | er | ir
      const presente = term === "ar" ? "ás" : term === "er" ? "és" : "ís";
      formas.add(raiz + presente);                            // mirás
      formas.add(raiz + presente.slice(0, 1));                // mirá
      // El imperativo CON pronombre pegado pierde la tilde: "sumale",
      // "convertila". El tuteo la lleva en la raíz ("súmale", "conviértela"),
      // así que no se pisan.
      //
      // Sin "se" a propósito: con verbos -ar daría "mirase" y "sumase", que son
      // imperfecto de subjuntivo y están bien escritos.
      const vocal = term === "ar" ? "a" : term === "er" ? "e" : "i";
      for (const pron of ["lo", "la", "los", "las", "le", "les", "me", "nos", "te"]) {
        const enclitico = raiz + vocal + pron;
        // Las dos colisiones con palabras que existen: "tomar"+"te" da el
        // tomate y "terminar"+"les" da las terminales nerviosas.
        if (enclitico === "tomate" || enclitico === "terminales") continue;
        formas.add(enclitico);
      }
    }
    for (const f of ["andá", "vení", "salí", "oí", "fijate", "acordate",
      "quedate", "sentate", "vos", "tenés", "ponés", "sos"]) {
      formas.add(f);
    }
    const VOSEO = new RegExp(
      "(?<![\\p{L}\\p{N}])(" + [...formas].sort((a, b) => b.length - a.length).join("|") + ")(?![\\p{L}\\p{N}])",
      "giu",
    );

    const fallos: string[] = [];
    for (const e of TODOS) {
      // Las notas del curador (<!-- -->) van en rioplatense a propósito.
      const visible = e.contenido.replace(/<!--[\s\S]*?-->/g, "");
      const vistas = new Map<string, number>();
      for (const m of visible.matchAll(VOSEO)) {
        const w = m[0].toLowerCase();
        vistas.set(w, (vistas.get(w) ?? 0) + 1);
      }
      for (const [forma, n] of vistas) fallos.push(`${e.nombre}: "${forma}" ×${n}`);
    }
    assert.deepEqual(fallos, [], `voseo en texto que ve el alumno:\n${fallos.slice(0, 30).join("\n")}`);
  });

  // MathText, que es lo que renderiza enunciados y explicaciones, entiende
  // KaTeX ($ y $$) y **negrita**, nada más. Cualquier otro markdown le llega
  // crudo al alumno: una tabla se ve como una hilera de pipes. Ya pasó con
  // los ** antes de que MathText los soportara (58 explicaciones decían
  // literalmente "**La clave:**"). Esto frena el próximo.
  test("el banco no usa markdown que MathText no sabe renderizar", () => {
    const PROHIBIDO: [RegExp, string][] = [
      [/^\s*\|.*\|/m, "tabla markdown"],
      [/^\s*(#{1,6})\s+\S/m, "encabezado #"],
      [/^\s*>\s+\S/m, "cita >"],
      [/`{1,3}[^`\n]+`{1,3}/, "código con backticks"],
      [/\[[^\]\n]+\]\([^)\n]+\)/, "link markdown"],
    ];
    const fallos: string[] = [];
    for (const e of TODOS) {
      let examen;
      try { examen = parseExamenMD(e.contenido); } catch { continue; }
      for (const p of examen.preguntas) {
        for (const campo of [p.enunciado, p.explicacion ?? ""]) {
          // El enunciado puede traer su propio <svg>; ahí adentro no se mira.
          const limpio = campo.replace(/<svg[\s\S]*?<\/svg>/gi, "");
          for (const [rx, que] of PROHIBIDO) {
            if (rx.test(limpio)) fallos.push(`${e.nombre} P${p.numero}: ${que}`);
          }
        }
      }
    }
    assert.deepEqual(fallos, [], `markdown que no se va a ver bien:\n${fallos.join("\n")}`);
  });

  // Dos exámenes distintos con la MISMA pregunta y las MISMAS opciones no
  // pueden dar respuestas distintas: una de las dos está mal y el alumno que
  // practique las dos se va a comer la contradicción. Se compara el texto de
  // la opción marcada, no la letra, porque el orden de las opciones cambia
  // entre gestiones y ahí dos letras distintas son la misma respuesta.
  test("una pregunta repetida no cambia de respuesta entre exámenes", () => {
    const norm = (s: string) =>
      s.normalize("NFD").replace(/\p{Mn}/gu, "").toLowerCase()
        .replace(/\\left|\\right|\\dfrac|\\frac|\\mathrm/g, "")
        .replace(/[^a-z0-9]/g, "");
    type Item = { donde: string; opciones: string; resp: string };
    const porEnunciado = new Map<string, Item[]>();
    for (const e of TODOS) {
      let examen;
      try { examen = parseExamenMD(e.contenido); } catch { continue; }
      for (const p of examen.preguntas) {
        if (p.enunciado.length < 40) continue;
        const clave = norm(p.enunciado);
        const texto = p.opciones.find((o) => o.letra === p.respuesta_correcta)?.texto ?? "";
        const item = {
          donde: `${e.nombre} P${p.numero}`,
          opciones: p.opciones.map((o) => norm(o.texto)).sort().join("|"),
          resp: norm(texto),
        };
        porEnunciado.set(clave, [...(porEnunciado.get(clave) ?? []), item]);
      }
    }
    const fallos: string[] = [];
    for (const grupo of porEnunciado.values()) {
      if (grupo.length < 2) continue;
      // Agrupar por set de opciones: solo son comparables entre sí.
      const porOpciones = new Map<string, Item[]>();
      for (const it of grupo) porOpciones.set(it.opciones, [...(porOpciones.get(it.opciones) ?? []), it]);
      for (const mismos of porOpciones.values()) {
        const distintas = new Set(mismos.map((i) => i.resp));
        if (distintas.size > 1) {
          fallos.push(mismos.map((i) => `${i.donde} -> "${i.resp.slice(0, 40)}"`).join("  ·  "));
        }
      }
    }
    assert.deepEqual(fallos, [], `la misma pregunta con las mismas opciones responde distinto:\n${fallos.join("\n")}`);
  });
  // Regla 11 de §4.5: en una app de matemática el guion largo cerca de un
  // número o una variable se lee como signo menos ("no depende de nada — 2x−1=0"
  // es ambiguo). Se aplicó a las lecciones el 16-ago y al banco el 16-sep.
  // Para separar cláusulas van punto, coma o dos puntos; para un inciso,
  // paréntesis.
  test("el banco no usa guion largo en el texto del alumno", () => {
    const fallos: string[] = [];
    for (const e of TODOS) {
      let examen;
      try { examen = parseExamenMD(e.contenido); } catch { continue; }
      for (const p of examen.preguntas) {
        const visible = [p.enunciado, p.explicacion ?? "", ...p.opciones.map((o) => o.texto)].join(" ");
        const n = (visible.match(/—/g) ?? []).length;
        if (n) fallos.push(`${e.nombre} · P${p.numero}: ${n} guion(es) largo(s)`);
      }
    }
    assert.deepEqual(fallos, [], `guion largo en texto que ve el alumno:\n${fallos.slice(0, 30).join("\n")}`);
  });
  // Los precios estaban escritos en TRES lugares (el route handler de
  // /api/pagos, /pagar y /precios) y coincidían de casualidad. Ahora salen de
  // src/lib/precios.ts; esto evita que vuelvan a filtrarse a mano, porque el
  // día que dos no coincidan el alumno ve un precio y se le cobra otro.
  test("los precios salen de un solo lugar", () => {
    const PANTALLAS: [string, string][] = [
      ["src/app/api/pagos/route.ts", "el servidor, que es el que cobra"],
      ["src/app/pagar/page.tsx", "la pantalla de pago"],
      ["src/app/precios/page.tsx", "la tabla de precios"],
    ];
    const fallos: string[] = [];
    for (const [rel, que] of PANTALLAS) {
      const fuente = readFileSync(join(process.cwd(), rel), "utf8");
      if (!fuente.includes('from "@/lib/precios"')) {
        fallos.push(`${rel} (${que}) no importa de @/lib/precios`);
      }
      // Un número de precio suelto: "precio: 100", "monto = 50", "PRECIO_X = 50".
      for (const m of fuente.matchAll(/(?:precio|monto|PRECIO[A-Z_]*)\s*[:=]\s*(\d{2,4})\b/g)) {
        fallos.push(`${rel} (${que}) tiene un precio escrito a mano: ${m[0].trim()}`);
      }
    }
    assert.deepEqual(fallos, [], `precios fuera de src/lib/precios.ts:\n${fallos.join("\n")}`);
  });
});

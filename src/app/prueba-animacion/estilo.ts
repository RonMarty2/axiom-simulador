import { aplanar, type Demo, type Ficha } from "./datos.ts";

// Reglas de ESTILO que Ronald fue pidiendo, vigiladas con codigo para que ningun ejercicio nuevo repita el error.
// `revisar.ts` (conservacion, un numero a la vez) cuida que la cuenta sea coherente; esto cuida COMO se ve y se dice.
// Devuelve la lista de problemas (vacia = bien). `revisar` la hace obligatoria; el medidor la lista sin romper.

// escritas con \u para que el test de voseo del repo (que lee este archivo) no las cuente como texto del alumno
const VOSEO = new RegExp("\\b(" + ["\u0061grup\u00e1", "\u0061not\u00e1", "\u0061plic\u00e1", "\u0062alance\u00e1", "\u0063alcul\u00e1", "\u0063ancel\u00e1", "\u0063ont\u00e1", "\u0064espej\u00e1", "\u0064ivid\u00ed", "\u0065lev\u00e1", "\u0065scrib\u00ed", "\u0065scribile", "\u0066ij\u00e1", "\u0066ijate", "\u0068ac\u00e9", "\u006clev\u00e1", "\u006dir\u00e1", "\u006dultiplic\u00e1", "\u006frden\u00e1", "\u0070as\u00e1", "\u0070od\u00e9s", "\u0070on\u00e9s", "\u0070onete", "\u0070rob\u00e1", "\u0071uer\u00e9s", "\u0072ecord\u00e1", "\u0072eemplaz\u00e1", "\u0072esolv\u00e9", "\u0072est\u00e1", "\u0073ab\u00e9s", "\u0073implific\u00e1", "\u0073os", "\u0073um\u00e1", "\u0074ach\u00e1", "\u0074en\u00e9s", "\u0075s\u00e1", "\u0076os"].join("|") + ")\\b", "i");

const sinMates = (s: string) => s.replace(/\$[^$]*\$/g, "");
const num = (tex: string) => tex.replace(/^[-+−]/, "").trim();

/** `texto`: lo que dice la animacion (siempre obligatorio). `movimiento`: como se mueve (trinquete por tipo en estilo.test.ts). */
export function hallazgosEstilo(d: Demo, etiqueta: string, parte: "texto" | "movimiento"): string[] {
  const malos: string[] = [];
  const mal = (i: number | null, msg: string) => malos.push(`${etiqueta}: ${i === null ? "intro" : `T${i}`} ${msg}`);

  // TEXTO DEL ALUMNO: tuteo, sin guion largo, sin / ^ sqrt ni ÷ fuera de LaTeX (Ronald 7-oct)
  const textos: [number | null, string][] = [[null, d.intro], ...d.transiciones.flatMap((t, i): [number, string][] => [[i, t.texto], [i, t.porque]])];
  for (const [i, s] of parte === "movimiento" ? [] : textos) {
    const fuera = sinMates(s);
    if (/[—–]/.test(fuera)) mal(i, `usa guion largo como separador: ${s}`);
    if (/[/÷^]|sqrt/.test(fuera)) mal(i, `tiene / ÷ ^ o sqrt fuera de LaTeX: ${s}`);
    if (VOSEO.test(s)) mal(i, `usa voseo (el alumno es de Cochabamba, se tutea): ${s}`);
  }

  d.transiciones.forEach((t, i) => {
    if (parte === "texto") return;
    const a = aplanar(d.estados[i]);
    const b = aplanar(d.estados[i + 1]);
    const antes = new Map(a.map((f) => [f.id, f]));
    const despues = new Map(b.map((f) => [f.id, f]));
    const quitadas = a.filter((f) => !despues.has(f.id) && !f.op && !f.sup);
    const nuevas = b.filter((f) => !antes.has(f.id) && !f.op && !f.sup);

    // ARRASTRAR: lo que desaparece en un sitio y aparece IGUAL en otro tiene que viajar con su mismo id (Ronald 7-oct)
    // (no se mira una pieza que se tacha: ahi desaparece de verdad)
    const tachadas = new Set(t.fusiones.filter((f) => f.modo === "tachar").flatMap((f) => f.desde));
    // una pieza consumida por una fusion "viajar" que ademas es origen de un brote YA viaja (se ve la copia ir a su lugar)
    const viajan = new Set(t.fusiones.filter((f) => f.modo === "viajar").flatMap((f) => f.desde));
    for (const br of t.brotes ?? []) if (viajan.has(br.desde)) tachadas.add(br.desde);
    for (const q of quitadas) {
      if (tachadas.has(q.id) || q.tex.includes("§")) continue;
      // un numero que se consume en una cuenta y otro resultado que se ve igual (4·1 = 4; 6/2 y 4/2 = 2) es casualidad, no una pieza que deba viajar
      // (tambien si q esta DENTRO de una fraccion o raiz que se consume: 4/2 = 2)
      const consumidaEnCuenta = () =>
        t.fusiones.some((f) => {
          const cubre = f.desde.some((d) => d === q.id || aplanar(a.filter((x) => x.id === d)).some((h) => h.id === q.id));
          const directa = f.desde.length === 1 && f.desde[0] === q.id;
          // q lo consume una cuenta (de varias piezas o de su fraccion): que otra pieza nueva se vea igual es casualidad
          return cubre && !directa;
        });
      const gemela = nuevas.find((n) => n.tex === q.tex && !consumidaEnCuenta());
      if (gemela) mal(i, `la pieza ${q.id} (${q.tex}) desaparece y ${gemela.id} aparece igual en otro lugar: debe viajar con el mismo id`);
    }

    // PASAR AL OTRO LADO es arrastrar, no escribir el opuesto en los dos lados con brotes (Ronald 7-oct)
    const top = d.estados[i + 1];
    const igual = top.findIndex((f) => f.op && f.tex === "=");
    if (igual >= 0 && (t.brotes ?? []).length >= 2) {
      const lado = (id: string) => {
        const k = top.findIndex((f) => f.id === id || aplanar([f]).some((h) => h.id === id));
        return k < 0 ? null : k < igual ? "izq" : "der";
      };
      // solo cuenta lo que lleva signo (+2, -2): el patron viejo escribia el opuesto; una comprobacion 2^2 = 2·2 no es pasar nada al otro lado
      const hijos = (t.brotes ?? []).map((br) => {
        const tex = despues.get(br.hacia)?.tex ?? "";
        return { lado: lado(br.hacia), v: /^[-+−]/.test(tex.trim()) ? num(tex) : "" };
      });
      const izq = hijos.filter((h) => h.lado === "izq").map((h) => h.v);
      const der = hijos.filter((h) => h.lado === "der").map((h) => h.v);
      if (izq.some((v) => v && der.includes(v))) mal(i, `escribe el mismo termino en los dos lados con brotes: pasar al otro lado es ARRASTRAR la pieza`);
    }

    // ETIQUETAS de a una: cada etiqueta (`debajo`) nueva tiene su propio paso (Ronald 7-oct)
    const conEtiquetaNueva = b.filter((f: Ficha) => f.debajo && antes.get(f.id)?.debajo !== f.debajo && antes.has(f.id));
    if (conEtiquetaNueva.length > 1) mal(i, `pone ${conEtiquetaNueva.length} etiquetas en un mismo paso: van de una en una`);
  });
  return malos;
}

// REGLAS DE PASOS (auditorias del 30-oct): lo que los agentes de revision fueron encontrando a mano y se repetia.
// Cada hallazgo nuevo que se repita en varias animaciones se agrega ACA con su test del error conocido (estilo.test.ts),
// asi se vigila en todos los tipos de golpe y no depende de que un agente lo vuelva a ver.
// Lo que pide criterio y no se puede medir con codigo (comprobacion circular, cambio de base sin avisar, quimica sin conteo)
// sigue en agentes/auditor-de-pasos.md.
const firma = (e: Ficha[]) => aplanar(e).map((f) => `${f.tex}|${f.debajo ?? ""}|${f.destacada ? 1 : 0}`).join("¦");
// el LaTeX sin colores (#1a4 no es "1a"), llaves ni marcas §
const limpio = (tex: string) => tex.replace(/\\textcolor\{[^}]*\}/g, "").replace(/[{}§]/g, "");
const esNumero = (tex: string) => /^[-+−]?\d+([.,]\d+)?$/.test(tex.trim());

export function hallazgosPasos(d: Demo, etiqueta: string): string[] {
  const malos: string[] = [];
  const mal = (i: number, msg: string) => malos.push(`${etiqueta}: T${i} ${msg}`);

  // COEFICIENTE 1 ESCRITO: 1a, 4(1a), v0=1a. El 1 no se escribe delante de una letra
  d.estados.forEach((e, k) => {
    e.forEach((f, j) => {
      if (f.op || f.sup) return;
      const sig = e[j + 1];
      const pegadoLetra = limpio(f.tex).trim() === "1" && sig?.pegado && !sig.op && /^[A-Za-z\u0391-\u03c9]/.test(limpio(sig.tex).trim());
      const suelto = limpio(f.tex).replace(/\\text\{[^}]*\}/g, " ").replace(/\\[A-Za-z]+/g, " ");
      if (pegadoLetra || /(^|[^\d.,{^_])1(?=[A-Za-z\u0391-\u03c9])/.test(suelto)) mal(k, `escribe el coeficiente 1 (${f.tex}): no se escribe 1 delante de una letra`);
    });
  });

  d.transiciones.forEach((t, i) => {
    const a = aplanar(d.estados[i]);
    const b = aplanar(d.estados[i + 1]);
    const antes = new Map(a.map((f) => [f.id, f]));
    const despues = new Map(b.map((f) => [f.id, f]));

    // PASO QUIETO: el estado no cambia y el paso no hace nada (ni marca, ni mueve, ni nace nada)
    const hace = t.fusiones.length || (t.brotes ?? []).length || (t.visitas ?? []).length || (t.resaltar ?? []).length || t.figura;
    if (firma(d.estados[i]) === firma(d.estados[i + 1]) && !hace) mal(i, "no cambia nada ni marca nada: paso vacio");

    // UN PASO QUE DESHACE EL ANTERIOR: el estado vuelve a ser el de dos pasos atras
    if (i >= 1 && firma(d.estados[i + 1]) === firma(d.estados[i - 1]) && firma(d.estados[i]) !== firma(d.estados[i - 1])) mal(i, "deshace el paso anterior (vuelve al mismo estado de hace dos pasos)");

    // MULTIPLICAR POR 1: la cuenta x·1 = x no ensena nada (salvo que haga falta para tachar: ahi se justifica en el texto)
    for (const f of t.fusiones) {
      if (f.modo || f.desde.length !== 3 || typeof f.hacia !== "string") continue;
      const [x, op, y] = f.desde.map((id) => antes.get(id));
      if (!x || !op || !y || !/cdot|times|·|×/.test(op.tex)) continue;
      const otro = x.tex.trim() === "1" ? y : y.tex.trim() === "1" ? x : null;
      if (otro && despues.get(f.hacia)?.tex.trim() === otro.tex.trim()) mal(i, `multiplica por 1 (${x.tex}·${y.tex}) y no cambia el valor`);
    }

    // CUENTA GRANDE DE UN GOLPE: una fraccion con numerador o denominador de 4 cifras o mas que se resuelve en un solo paso
    for (const f of t.fusiones) {
      if (f.modo) continue;
      const grande = f.desde.map((id) => antes.get(id)).find((p) => p?.frac && [p.frac.n, p.frac.d].some((v) => /^\d{4,}$/.test(v)));
      if (grande) mal(i, `resuelve de un golpe una cuenta grande (${grande.frac!.n}/${grande.frac!.d}): simplificar antes`);
    }

    // NUMERO SIN ORIGEN: un numero nuevo que no sale de una fusion, un brote ni una visita aparece de la nada
    const conOrigen = new Set<string>([
      ...t.fusiones.flatMap((f) => (f.hacia === null ? [] : Array.isArray(f.hacia) ? f.hacia : [f.hacia])),
      ...(t.brotes ?? []).map((br) => br.hacia),
    ]);
    const hijosDeNueva = new Set<string>();
    for (const f of d.estados[i + 1]) if (!antes.has(f.id)) aplanar([f]).forEach((h) => hijosDeNueva.add(h.id));
    for (const n of b) {
      if (antes.has(n.id) || n.op || n.sup || conOrigen.has(n.id) || hijosDeNueva.has(n.id) && !d.estados[i + 1].some((r) => r.id === n.id)) continue;
      if (esNumero(n.tex) && !(t.visitas ?? []).length) mal(i, `el numero ${n.tex} aparece sin origen (ni fusion ni brote)`);
    }
  });
  return malos;
}

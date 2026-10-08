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

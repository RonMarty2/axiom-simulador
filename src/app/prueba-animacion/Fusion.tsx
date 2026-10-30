"use client";

import { AnimatePresence, animate, motion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import MathText from "../components/MathText";
import Tex from "./Tex";
import katex from "katex";
import { aplanar, hijas, type Demo, type Ficha, type Figura, type Fusion as FusionDatos, type Visita } from "./datos";
import { cajaDeMarca, marcasDe, tieneContenido, type Tinta } from "./marcas";

const esperar = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

// cuanto se puede agrandar una fraccion con piezas en un celular: la formula general completa (~17 signos arriba) es 1
const escalaFraccion = (f: Ficha) => {
  const largo = aplanar(f.frac?.nPiezas ?? [])
    .map((p) => p.tex.replace(/\\textcolor\{[^}]*\}/g, "").replace(/\\[a-zA-Z]+/g, "X").replace(/[{}^ ]/g, ""))
    .join("").length;
  return Math.min(2, Math.max(1, 17 / Math.max(largo, 1)));
};

const boton: React.CSSProperties = {
  padding: "8px 14px",
  borderRadius: 8,
  border: "1px solid var(--border, #d8d0c0)",
  background: "var(--bg-card)",
  color: "var(--fg-primary)",
  fontSize: 14,
  cursor: "pointer",
};

// Estilo de una parte de fraccion (numerador o denominador); marcada = resaltada.
function parteEstilo(marcada: boolean): React.CSSProperties {
  return {
    display: "inline-block",
    padding: "0 6px",
    borderRadius: 8,
    background: marcada ? "var(--accent-soft)" : "transparent",
    boxShadow: marcada ? "0 0 0 2px var(--accent)" : "0 0 0 0 transparent",
    transition: "background 0.3s, box-shadow 0.3s",
  };
}

// MARCA AJUSTADA A LA PIEZA (revision por agentes, 29-oct: en «4·(−3/2)» la marca del menos tenia el alto del renglon, 49 px, y tapaba
// la punta de la raya, el 3 y el 2). La caja de una pieza de texto mide el alto de LINEA del renglon (1.6 del tamaño de letra), no el de
// lo que se ve. La marca se dibuja aparte, medida sobre la TINTA que pinta KaTeX (cada glifo en un canvas con su mismo tipo de letra;
// rayas y signos dibujados en SVG con su propio rect). La cuenta de la caja (aire minimo, banda comun para que «x», «=» y «2» lleven la
// misma capsula, no cruzar la raya de la fraccion) esta en `cajaDeMarca` (marcas.ts), testeada sin navegador.
type Caja = { l: number; t: number; w: number; h: number };
let lienzo: CanvasRenderingContext2D | null | undefined;
const lienzoTinta = () => (lienzo === undefined ? (lienzo = document.createElement("canvas").getContext("2d")) : lienzo);
// un vphantom de KaTeX (los parentesis altos de «4·(−3/2)») tiene glifos de verdad pintados en transparente: no son tinta.
// Antes contaban y la marca del «(» abarcaba la fraccion entera (lineal x fracc negativa 16).
const invisible = (cs: CSSStyleDeclaration) => cs.color === "rgba(0, 0, 0, 0)" || cs.color === "transparent" || cs.visibility === "hidden";
function MarcaTex({ tex, marcado, px, py, radio }: { tex: string; marcado: boolean; px: number; py: number; radio: number }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [caja, setCaja] = useState<Caja | null>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!marcado || !el) return;
    const medir = () => {
      const r0 = el.getBoundingClientRect();
      // la pieza puede estar escalada (rebote, juntar): se mide en px de diseño
      const esc = el.offsetWidth > 0 ? r0.width / el.offsetWidth : 1;
      const katexEl = el.querySelector(".katex");
      const ctx = lienzoTinta();
      if (!katexEl || !esc || !ctx) return setCaja(null);
      const fsPrincipal = parseFloat(getComputedStyle(katexEl).fontSize);
      const tinta: Tinta[] = [];
      // linea base del texto mas grande (no la de un subindice)
      let base: number | null = null;
      let fsBase = 0;
      for (const e of el.querySelectorAll(".katex-html *")) {
        const r = e.getBoundingClientRect();
        if (r.width <= 0 && r.height <= 0) continue;
        const cs = getComputedStyle(e);
        if (invisible(cs)) continue;
        const texto = [...e.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent ?? "").join("");
        if (texto.trim() !== "") {
          ctx.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
          const m = ctx.measureText(texto);
          // la caja de un elemento con texto es su area de contenido (ascenso + descenso de la fuente), centrada en su alto si es
          // inline-block con interlineado: de ahi sale su linea base, y de la linea base, la tinta (actualBoundingBox*)
          const contenido = (m.fontBoundingBoxAscent + m.fontBoundingBoxDescent) * esc;
          const b = r.top + (r.height - contenido) / 2 + m.fontBoundingBoxAscent * esc;
          tinta.push({
            izq: r.left - m.actualBoundingBoxLeft * esc,
            der: r.left + m.actualBoundingBoxRight * esc,
            arriba: b - m.actualBoundingBoxAscent * esc,
            abajo: b + m.actualBoundingBoxDescent * esc,
          });
          const fsE = parseFloat(cs.fontSize);
          if (fsE > fsBase + 0.5) {
            fsBase = fsE;
            base = b;
          }
        } else if (e instanceof SVGSVGElement || e.classList.contains("frac-line") || e.classList.contains("rule")) {
          // rayas y signos dibujados (raiz, parentesis grandes): su rect es su tinta, tambien en alto (el «)» alto salia 25 px corrido
          // abajo porque el alto venia de los `.strut`)
          tinta.push({ izq: r.left, der: r.right, arriba: r.top, abajo: r.bottom });
        }
      }
      // dentro de una fraccion con piezas, la raya de esa fraccion es un tope
      const parte = el.closest("[data-parte]");
      const raya = parte ? (parte.getAttribute("data-parte") === "d" ? parte.previousElementSibling : parte.nextElementSibling) : null;
      const rr = raya?.getBoundingClientRect();
      const c = cajaDeMarca(tinta, {
        // un signo dibujado solo (parentesis alto) no lleva banda de texto: su alto es el suyo
        base,
        fs: (fsBase || fsPrincipal) * esc,
        px: px * esc,
        py: py * esc,
        rayaArriba: rr && parte?.getAttribute("data-parte") === "d" ? rr.bottom : undefined,
        rayaAbajo: rr && parte?.getAttribute("data-parte") === "n" ? rr.top : undefined,
      });
      if (!c) return setCaja(null);
      setCaja({ l: (c.izq - r0.left) / esc, t: (c.arriba - r0.top) / esc, w: (c.der - c.izq) / esc, h: (c.abajo - c.arriba) / esc });
    };
    medir();
    // la hoja se achica o crece (Achicar hoja, fuentes que cargan): se vuelve a medir
    const ro = new ResizeObserver(medir);
    ro.observe(el);
    return () => ro.disconnect();
  }, [marcado, tex, px, py]);
  return (
    <span ref={ref} style={{ display: "inline-block", position: "relative" }}>
      <span
        data-marca
        aria-hidden
        style={{
          position: "absolute",
          ...(caja ? { left: caja.l, top: caja.t, width: caja.w, height: caja.h } : { left: -Math.max(px, 3), right: -Math.max(px, 3), top: -Math.max(py, 3), bottom: -Math.max(py, 3) }),
          borderRadius: radio,
          background: "var(--accent-soft)",
          boxShadow: "0 0 0 2px var(--accent)",
          opacity: marcado ? 1 : 0,
          transition: "opacity 0.3s",
          pointerEvents: "none",
        }}
      />
      <span style={{ position: "relative" }}>
        <Tex tex={tex} />
      </span>
    </span>
  );
}

interface Leyenda {
  texto: string;
  porque?: string;
  regla?: string;
  figura?: Figura;
}

export type ModoRegla = "resolver" | "ensenar";

// modo "resolver" (ejercicio resuelto): la regla va dentro del "¿Por qué?".
// modo "ensenar" (leccion): la regla va destacada, en su propio recuadro.
// `paso` (opcional, desde 0): muestra ese paso quieto, sin recorrer los anteriores (lo usa el barrido de ancho)
export default function Fusion({ demo, modo = "resolver", clave, paso, onPaso }: { demo: Demo; modo?: ModoRegla; clave?: string; paso?: number; onPaso?: (idx: number) => void }) {
  const total = demo.estados.length;
  // con `paso` se arranca ya en ese paso: nada entra animado (el barrido de ancho no mide piezas a medio rebote)
  const inicio = paso !== undefined && paso > 0 && paso < total ? paso : 0;
  const [idx, setIdx] = useState(inicio);
  const [leyenda, setLeyenda] = useState<Leyenda>(
    inicio === 0
      ? { texto: demo.intro, figura: demo.figura }
      : { texto: demo.transiciones[inicio - 1].texto, porque: demo.transiciones[inicio - 1].porque, regla: demo.transiciones[inicio - 1].regla, figura: demo.transiciones[inicio - 1].figura }
  );
  const [marcados, setMarcados] = useState<string[]>([]);
  const [nuevos, setNuevos] = useState<string[]>([]);
  const [ocupado, setOcupado] = useState(false);
  const [jugando, setJugando] = useState(false);
  const [pausando, setPausando] = useState(false);
  // hoja achicada: un ejercicio largo cabe mas en un celular (los renglones siguen todos ahi, solo cambia el tamaño)
  const [compacta, setCompacta] = useState(false);
  const pausaRef = useRef(false);
  // el panel de desarrollo (Generador) necesita saber en que paso esta
  useEffect(() => onPaso?.(idx), [idx, onPaso]);

  const idxRef = useRef(0);
  const ocupadoRef = useRef(false);
  const cancelar = useRef(false);
  const celdas = useRef<Record<string, HTMLElement | null>>({});
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    cancelar.current = false;
    if (paso !== undefined) irA(paso);
    // enlace directo a un paso: /prueba-animacion?raiz=4 abre la tarjeta "raiz" en el paso 4 (para ver un paso sin recorrer los anteriores)
    if (clave) {
      const n = Number(new URLSearchParams(window.location.search).get(clave));
      if (Number.isInteger(n) && n >= 1 && n <= total) irA(n - 1);
    }
    return () => {
      cancelar.current = true;
    };
    // solo al montar
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cuando la resolucion crece hacia abajo, la pagina baja sola hasta dejar a la vista el ultimo renglon (si no, parece que se perdio y hay que bajar a buscarlo).
  // Espera a que termine el movimiento del paso. En el barrido (`paso` fijo) no se mueve nada.
  useEffect(() => {
    if (paso !== undefined || idx === inicio) return; // sin paso fijo (barrido) y sin haber avanzado, la pagina no se mueve
    const t = setTimeout(() => {
      const panel = panelRef.current;
      if (!panel) return;
      const ids = demo.estados[idx].map((f) => f.id).reverse();
      const ultimo = ids.map((id) => celdas.current[id]).find((el) => el && el.getBoundingClientRect().height > 0);
      if (!ultimo) return;
      const r = ultimo.getBoundingClientRect();
      const etiqueta = demo.estados[idx].some((f) => f.debajo) ? 56 : 16;
      const limite = window.innerHeight - panel.getBoundingClientRect().height - etiqueta;
      const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (r.bottom > limite) window.scrollBy({ top: r.bottom - limite, behavior: reducido ? "auto" : "smooth" });
      else if (r.top < 8) window.scrollBy({ top: r.top - 8, behavior: reducido ? "auto" : "smooth" });
    }, 900);
    return () => clearTimeout(t);
    // solo cuando cambia el paso
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  const factorTiempo = () => (window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 1);

  // Las piezas marcadas se acercan al centro del grupo y se desvanecen.
  // Con `ancla`, el destino es esa ficha (que se queda) y al final late una vez.
  async function juntar(f: FusionDatos, k: number) {
    const els = f.desde.map((id) => celdas.current[id]).filter((e): e is HTMLElement => !!e);
    if (els.length === 0 || k === 0 || f.modo === "viajar") return;
    if (f.modo === "tachar") {
      await Promise.all(
        els.map(async (el) => {
          el.style.position = "relative";
          const raya = document.createElement("span");
          raya.style.cssText =
            "position:absolute;left:-2px;top:50%;height:3px;width:0;border-radius:2px;background:var(--accent);transform:rotate(-14deg);transform-origin:left center;pointer-events:none";
          el.appendChild(raya);
          await animate(raya, { width: ["0%", "104%"] }, { duration: 0.6, ease: "easeOut" });
          await animate(el, { opacity: [1, 0], scale: [1, 0.8] }, { duration: 0.5, delay: 0.25 });
        })
      );
      return;
    }
    const rects = els.map((e) => e.getBoundingClientRect());
    const elAncla = f.ancla ? celdas.current[f.ancla] : null;
    const rAncla = elAncla?.getBoundingClientRect();
    const cx = rAncla
      ? rAncla.left + rAncla.width / 2
      : rects.reduce((s, r) => s + r.left + r.width / 2, 0) / rects.length;
    await Promise.all(
      els.map((el, j) => {
        const c = rects[j].left + rects[j].width / 2;
        return animate(
          el,
          { x: [0, cx - c, cx - c], scale: [1, 1, 0.5], opacity: [1, 1, 0] },
          { duration: 0.9, ease: "easeInOut", times: [0, 0.65, 1] }
        );
      })
    );
    if (elAncla) await animate(elAncla, { scale: [1, 1.3, 1] }, { duration: 0.45, ease: "easeOut" });
  }

  // Una COPIA de la pieza viaja hasta cada pieza que visita, se detiene a "tocarla" (la pieza visitada late)
  // y sigue a la siguiente. La pieza original no se mueve.
  async function visitar(v: Visita, k: number) {
    const origen = celdas.current[v.desde];
    if (!origen || k === 0) return;
    const r0 = origen.getBoundingClientRect();
    const copia = document.createElement("span");
    copia.innerHTML = v.etiqueta
      ? katex.renderToString(v.etiqueta, { throwOnError: false, strict: "ignore", output: "html" })
      : origen.innerHTML;
    // la marca ajustada de la pieza original no viaja: la copia lleva su propio recuadro
    copia.querySelectorAll("[data-marca]").forEach((m) => m.remove());
    copia.style.cssText = `position:fixed;left:${r0.left}px;top:${r0.top}px;margin:0;pointer-events:none;z-index:50;padding:2px 8px;border-radius:12px;background:var(--accent-soft);box-shadow:0 0 0 2px var(--accent);color:var(--accent);font-size:${getComputedStyle(origen).fontSize};white-space:nowrap`;
    document.body.appendChild(copia);
    // la copia se mide una vez puesta, para que su centro parta del centro de la pieza original
    const c0 = copia.getBoundingClientRect();
    const sx = r0.left + r0.width / 2 - (c0.left + c0.width / 2);
    const sy = r0.top + r0.height / 2 - (c0.top + c0.height / 2);
    let x = sx;
    let y = sy;
    await animate(copia, { x: [0, sx], y: [0, sy], opacity: [0, 1] }, { duration: 0.01 });
    for (const id of v.hacia) {
      const el = celdas.current[id];
      if (!el) continue;
      const r = el.getBoundingClientRect();
      const nx = r.left + r.width / 2 - (c0.left + c0.width / 2);
      const ny = r.top + r.height / 2 - (c0.top + c0.height / 2);
      await animate(copia, { x: [x, nx], y: [y, ny] }, { duration: 0.9, ease: "easeInOut" });
      x = nx;
      y = ny;
      await animate(el, { scale: [1, 1.3, 1] }, { duration: 0.45, ease: "easeOut" });
    }
    await animate(copia, { opacity: [1, 0] }, { duration: 0.3 });
    copia.remove();
  }

  async function avanzar() {
    if (ocupadoRef.current || idxRef.current >= total - 1) return;
    ocupadoRef.current = true;
    setOcupado(true);
    const i = idxRef.current;
    const t = demo.transiciones[i];
    const k = factorTiempo();

    setNuevos([]);
    setLeyenda({ texto: t.texto, porque: t.porque, regla: t.regla, figura: t.figura });

    // un salto de renglon o una pieza vacia puede irse con una fusion, pero no se marca (era la pastilla naranja vacia, 29-oct)
    const marcas = marcasDe(t, demo.estados[i]);
    if (marcas.length > 0) {
      setMarcados(marcas);
      await esperar(1100 * k);
      // una pieza viaja a visitar a otras (se ve a cual se aplica cada una), de visita en visita
      for (const v of t.visitas ?? []) await visitar(v, k);
      await Promise.all(t.fusiones.map((f) => juntar(f, k)));
      setMarcados([]);
    } else {
      await esperar(500 * k);
    }
    // de donde sale cada brote (se mide antes de cambiar de estado)
    const origenes = (t.brotes ?? []).map((b) => ({
      hacia: b.hacia,
      rect: celdas.current[b.desde]?.getBoundingClientRect() ?? null,
      // si la pieza de origen desaparece (pasa de lugar), la que viaja es ella misma: no se encoge ni se desvanece
      viaja: !aplanar(demo.estados[i + 1]).some((f) => f.id === b.desde),
    }));

    // se resaltan las piezas que cambian; una fraccion o raiz con piezas no se pinta entera, solo lo que cambio adentro
    const antes = new Map(aplanar(demo.estados[i]).map((f) => [f.id, f.tex]));
    setNuevos(aplanar(demo.estados[i + 1]).filter((f) => hijas(f).length === 0 && antes.get(f.id) !== f.tex).map((f) => f.id));
    idxRef.current = i + 1;
    setIdx(i + 1);
    if (origenes.length > 0 && k > 0) {
      // esperar a que la ficha nueva exista en pantalla y hacerla viajar desde su origen
      await new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())));
      origenes.forEach(({ hacia, rect, viaja }) => {
        const el = celdas.current[hacia];
        if (!el || !rect) return;
        const nr = el.getBoundingClientRect();
        animate(
          el,
          {
            x: [rect.left + rect.width / 2 - (nr.left + nr.width / 2), 0],
            y: [rect.top + rect.height / 2 - (nr.top + nr.height / 2), 0],
            scale: viaja ? [1, 1] : [0.4, 1],
            opacity: viaja ? [1, 1] : [0, 1],
          },
          { duration: 0.9, ease: "easeOut" }
        );
      });
    }
    await esperar(1300 * k);

    ocupadoRef.current = false;
    setOcupado(false);
  }

  function irA(n: number) {
    if (ocupadoRef.current) return;
    idxRef.current = n;
    setIdx(n);
    setNuevos([]);
    setMarcados([]);
    setLeyenda(
      n === 0
        ? { texto: demo.intro, figura: demo.figura }
        : { texto: demo.transiciones[n - 1].texto, porque: demo.transiciones[n - 1].porque, regla: demo.transiciones[n - 1].regla, figura: demo.transiciones[n - 1].figura }
    );
  }

  async function reproducir() {
    if (ocupadoRef.current) return;
    if (idxRef.current >= total - 1) {
      irA(0);
      await esperar(500);
    }
    pausaRef.current = false;
    setPausando(false);
    setJugando(true);
    // sigue desde el paso en que esta; se detiene al terminar el paso en curso si se pide pausa
    while (idxRef.current < total - 1 && !cancelar.current && !pausaRef.current) {
      await avanzar();
      if (!cancelar.current && !pausaRef.current) await esperar(600);
    }
    setJugando(false);
    setPausando(false);
  }

  // Pausar: el paso que esta en curso termina (para no dejar piezas a medias) y despues se puede ir atras, adelante o continuar
  function pausar() {
    pausaRef.current = true;
    setPausando(true);
  }

  const estado = demo.estados[idx];

  // ---- piezas DENTRO de una fraccion o de una raiz (la formula general con sus letras): cada una con su ref,
  // para que se pueda marcar, tachar, juntar o ser origen y destino de un brote. No tienen animacion propia de
  // entrada o salida (aparecen y se van con el cambio de estado); los gestos de la transicion si las alcanzan.
  const fila = (fs: Ficha[]) => (
    <span style={{ display: "inline-flex", alignItems: "baseline", whiteSpace: "nowrap" }}>
      {fs.map((h, j) => interna(h, fs[j - 1]))}
    </span>
  );
  // cuerpo de una fraccion con piezas (arriba, raya, abajo) o de una raiz con piezas (signo y raya sobre el radicando)
  const compuesta = (f: Ficha) => {
    if (f.rad) return null;
    const n = f.frac?.nPiezas ?? [];
    const d = f.frac?.dPiezas ?? [];
    // si algo de arriba lleva etiqueta debajo (el Δ), se deja lugar entre el numerador y la raya
    const etiquetaArriba = aplanar(n).some((h) => h.debajo);
    return (
      <span style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", verticalAlign: "middle" }}>
        {/* data-parte: la marca de una pieza de arriba no baja de la raya y la de una pieza de abajo no sube (MarcaTex) */}
        <span data-parte="n" style={{ paddingBottom: etiquetaArriba ? "1.05em" : 0, transition: "padding 0.3s" }}>
          {fila(n)}
        </span>
        {/* 3 px de luz: lo justo para que la marca respire sin tocar la raya (con 2 px se montaba, revision del 29-oct) */}
        <span style={{ alignSelf: "stretch", height: 2, background: "currentColor", margin: "3px 0", borderRadius: 1 }} />
        <span data-parte="d">{fila(d)}</span>
      </span>
    );
  };
  function interna(f: Ficha, prev: Ficha | undefined): React.ReactNode {
    const marcado = tieneContenido(f) && (marcados.includes(f.id) || !!f.destacada);
    const nuevo = nuevos.includes(f.id);
    const compuestaDentro = !!(f.frac?.nPiezas || f.frac?.dPiezas);
    const ref = (el: HTMLElement | null) => {
      celdas.current[f.id] = el;
    };
    const caja: React.CSSProperties = {
      display: "inline-block",
      position: "relative",
      // poco aire: una formula con muchas piezas tiene que caber en 375 px
      padding: "0 1px",
      borderRadius: 8,
      // una pieza de texto lleva su marca ajustada (MarcaTex); la caja solo se pinta en la raiz y en una fraccion con piezas
      background: marcado && (f.rad || compuestaDentro) ? "var(--accent-soft)" : "transparent",
      boxShadow: marcado && (f.rad || compuestaDentro) ? "0 0 0 2px var(--accent)" : "0 0 0 0 transparent",
      color: nuevo ? "var(--accent)" : f.op ? "var(--fg-muted, #7a7a7a)" : "inherit",
      fontWeight: nuevo ? 700 : 400,
      transition: "background 0.3s, box-shadow 0.3s, color 0.6s",
    };
    const margen = f.sup ? (prev?.sup ? "0 0 0 1px" : "0 1px 0 -1px") : f.pegado ? "0 0 0 -1px" : f.op ? "0 0.1em" : "0 1px";
    if (f.rad) {
      // la raiz abarca su radicando: el signo es la pieza (se marca y se tacha), la raya de arriba cubre todo lo de adentro
      return (
        <span key={f.id} style={{ display: "inline-flex", alignItems: "stretch", margin: "0 2px", alignSelf: "stretch" }}>
          <span ref={ref} style={{ ...caja, display: "inline-flex", padding: "0 1px", borderRadius: 6 }}>
            <svg viewBox="0 0 12 24" preserveAspectRatio="none" style={{ width: "0.62em", height: "100%", overflow: "visible" }} aria-hidden>
              <path d="M0 14 L3 12 L7 23.5 L12 1" fill="none" stroke="currentColor" strokeWidth="1.6" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
            </svg>
          </span>
          <span style={{ display: "inline-flex", alignItems: "baseline", borderTop: "2px solid currentColor", padding: f.rad.some((h) => h.sup) ? "0.4em 2px 0" : "3px 2px 0", marginLeft: -2 }}>
            {f.rad.map((h, j) => interna(h, f.rad![j - 1]))}
          </span>
        </span>
      );
    }
    return (
      <span key={f.id} style={{ display: "inline-block", position: "relative", margin: margen, ...(f.sup ? { fontSize: "0.65em", top: "-0.85em" } : {}) }}>
        <span ref={ref} style={caja}>
          {compuestaDentro ? compuesta(f) : <MarcaTex tex={f.tex} marcado={marcado} px={3} py={3} radio={8} />}
        </span>
        {f.debajo && (
          <span data-etiqueta style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", whiteSpace: "nowrap", lineHeight: 1, fontSize: "0.6em", marginTop: 2 }}>
            <Tex tex={f.debajo} />
          </span>
        )}
      </span>
    );
  }

  // ESPACIO ENTRE RENGLONES (Ronald, 17-oct: 'mucho espacio'). Un salto de renglon es una linea propia y un rowGap del contenedor
  // se contaba antes y despues de ella; un margen negativo no sirve (la linea no baja de 0). Por eso no hay rowGap: las piezas de
  // un renglon que lleva etiqueta debajo (d, t, base...) y las del renglon que le sigue llevan un margen superior que deja lugar a la
  // etiqueta (y a las lineas en que ese renglon se parta solo). Los demas renglones quedan pegados.
  const conEtiquetas = estado.some((f) => f.debajo);
  const huecoEtiqueta = compacta ? 40 : 52;
  const filaDe: number[] = [];
  const filaConEtiqueta: boolean[] = [false];
  estado.forEach((f, i) => {
    const prev = i > 0 ? filaDe[i - 1] : 0;
    filaDe[i] = f.salto && i > 0 ? prev + 1 : prev;
    if (filaConEtiqueta[filaDe[i]] === undefined) filaConEtiqueta[filaDe[i]] = false;
    if (f.debajo) filaConEtiqueta[filaDe[i]] = true;
  });
  const margenSuperior = (pos: number) => (conEtiquetas && (filaConEtiqueta[filaDe[pos]] || filaConEtiqueta[filaDe[pos] - 1]) ? huecoEtiqueta : 0);
  const esOperador = (f: Ficha) => !!f.op && ["+", "-", "−", "=", "\\pm"].includes(f.tex.trim());
  // profundidad de parentesis ANTES de cada pieza: un operador dentro de un parentesis, (a − b), no es lugar para partir la formula
  const profundidad = (fs: Ficha[]) => {
    let d = 0;
    return fs.map((f) => {
      const antes = d;
      d += (f.tex.match(/\(/g) ?? []).length - (f.tex.match(/\)/g) ?? []).length;
      return antes;
    });
  };
  const esProducto = (f: Ficha) => !!f.op && /^(\\cdot|\\times|\\div|·|×|÷|\/)$/.test(f.tex.trim());
  // Se puede partir antes de una pieza SALVO: dentro de un parentesis; si va pegada a la anterior o es un exponente; si es un punto de
  // multiplicar o va justo despues de uno (2 · 2 · d no se parte); o si va justo despues de + − = (el operando se queda con su operador).
  // Un operador (+ − =) SI puede abrir renglon: la formula sigue en la linea de abajo con su signo delante.
  const puedePartirAntes = (fs: Ficha[], i: number, prof: number[]) => {
    const f = fs[i];
    if (i === 0 || prof[i] > 0 || f.pegado || f.sup) return false;
    const antes = fs[i - 1];
    // el punto entre dos parentesis, (2·2·⋯·2) · (2·2·⋯·2), SI puede abrir renglon: queda delante del segundo grupo y no colgado al final del primero
    if (esProducto(f)) return antes.tex.trim().endsWith(")") && !!fs[i + 1]?.tex.trim().startsWith("(");
    // el parentesis que abre SI puede quedar abajo aunque lo preceda un operador: «a² − b² =» arriba, «(a − b)(a + b)» abajo
    return !esProducto(antes) && (esOperador(f) || !esOperador(antes) || f.tex.trim().startsWith("("));
  };
  // grupos de posiciones: cada operador (fuera de parentesis) abre uno; un salto de renglon va solo
  const gruposDe = (fs: Ficha[]) => {
    const gs: number[][] = [];
    const prof = profundidad(fs);
    fs.forEach((f, i) => {
      if (f.salto) gs.push([i]);
      else if (gs.length === 0 || puedePartirAntes(fs, i, prof) || fs[gs[gs.length - 1][0]].salto) gs.push([i]);
      else gs[gs.length - 1].push(i);
    });
    return gs;
  };
  // 0 = piezas sueltas, 1 = agrupadas por operador, 2 = se probo agrupar y algo se salia del ancho: se quedan sueltas
  const [modoGrupo, setModoGrupo] = useState<0 | 1 | 2>(0);
  const agrupar = modoGrupo === 1;
  const hojaRef = useRef<HTMLDivElement | null>(null);
  // al cambiar de paso se parte de la formula suelta; si se partio en un mal lugar (la 2a pieza abre renglon y no es un operador), se agrupa
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useLayoutEffect(() => setModoGrupo(0), [idx, compacta, demo]);
  useLayoutEffect(() => {
    const hoja = hojaRef.current;
    if (modoGrupo !== 0 || !hoja) return;
    const detectar = () => {
      const tops = estado.map((f) => (f.salto || f.sup ? null : celdas.current[f.id]?.getBoundingClientRect().top ?? null));
      let previo: number | null = null;
      const prof = profundidad(estado);
      for (let i = 0; i < estado.length; i++) {
        if (tops[i] === null) {
          if (estado[i].salto) previo = null;
          continue;
        }
        if (previo !== null && (tops[i] as number) - previo > 14 && !puedePartirAntes(estado, i, prof)) {
          setModoGrupo(1);
          return;
        }
        previo = tops[i];
      }
    };
    detectar();
    // las fuentes de las formulas cargan despues: la formula puede partirse recien entonces, asi que se vuelve a mirar
    const ro = new ResizeObserver(detectar);
    ro.observe(hoja);
    void document.fonts.ready.then(detectar);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modoGrupo, idx, compacta, demo]);
  // si al agrupar un grupo no cabe en el ancho de la hoja (un grupo mas ancho que el celular no se puede partir), se deshace.
  // Se mide el ancho de DISEÑO (offsetWidth): al aparecer, las piezas van agrandandose y su rect medido seria menor que el final.
  useLayoutEffect(() => {
    const hoja = hojaRef.current;
    if (modoGrupo !== 1 || !hoja) return;
    const revisar = () => {
      const util = hoja.clientWidth - 8;
      if ([...hoja.children].some((g) => g instanceof HTMLElement && Math.max(g.offsetWidth, g.scrollWidth) > util)) setModoGrupo(2);
    };
    revisar();
    // las fuentes de las formulas terminan de cargar despues y los grupos crecen: se vuelve a comprobar cuando cambian de tamaño
    const ro = new ResizeObserver(revisar);
    [...hoja.children].forEach((g) => ro.observe(g));
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modoGrupo, idx, compacta, demo]);
  const renderFicha = (f: Ficha, pos: number, enGrupo = false) => {
    const prevSup = pos > 0 && !!estado[pos - 1].sup;
    const mt = enGrupo ? 0 : margenSuperior(pos);
    // una fraccion elevada (exponente 5/2) mide dos lineas: se agranda y se sube mas que un exponente comun
    const escala = f.sup ? (f.frac ? 0.8 : 0.7) : 1;
    const alza = f.sup ? (f.frac ? 1.05 : 0.9) : 0;
    // un exponente que LLEVA una fraccion (2^(4/2), 2^(4·½)) sube hasta que el denominador queda por encima de la mitad de la base:
    // con solo 1.05em el denominador quedaba al lado de la base y se leia «22» o «21·2» (revision por agentes, 29-oct). Todas las
    // piezas de ese exponente suben lo mismo (el 4 y el · siguen alineados con la raya del ½). Lo que sube de mas se hace con margen
    // abajo: el renglon crece y el exponente no se sale por arriba de la hoja.
    const cadenaConFraccion = (() => {
      if (!f.sup) return false;
      let a = pos;
      while (a > 0 && estado[a - 1].sup) a--;
      let z = pos;
      while (z < estado.length - 1 && estado[z + 1].sup) z++;
      return estado.slice(a, z + 1).some((p) => !!p.frac);
    })();
    // en em de la propia pieza (una fraccion elevada es mas grande que un exponente comun): la misma subida en pantalla para todas
    const k8 = 0.8 / escala;
    const extra = cadenaConFraccion ? 2.2 * k8 : 0;
    const tope = cadenaConFraccion ? alza - 0.45 * k8 : alza;
    const fraccionSola = cadenaConFraccion && !prevSup && !!f.frac;
    // una pieza con etiqueta debajo reserva al menos el ancho de su etiqueta (si no, las etiquetas de piezas vecinas se montan)
    const letras = f.debajo ? f.debajo.replace(/\\textcolor\{[^}]*\}/g, "").replace(/\\text\{([^}]*)\}/g, "$1").replace(/\\[a-zA-Z]+/g, "X").replace(/[{}$^_]/g, "").length : 0;
    // medido en pantalla (8-oct): un caracter mide ~0.62em de la etiqueta y cada "=" suma ~0.5em de espacio (O=16 medía 57 px y se reservaban 46)
    const iguales = f.debajo ? (f.debajo.match(/=/g) ?? []).length : 0;
    const anchoEtiqueta = letras > 0 ? { minWidth: `${((letras * 0.62 + iguales * 0.5) * 0.54) / escala + 1}em`, textAlign: "center" as const } : {};
    const marcado = tieneContenido(f) && (marcados.includes(f.id) || !!f.destacada);
    const nuevo = nuevos.includes(f.id);
    // una pieza de texto (ni fraccion ni raiz) lleva su marca ajustada a lo que se ve (MarcaTex); las demas, la caja entera
    const deTexto = !f.frac && !f.rad;
    // fraccion con piezas: poco aire alrededor, para que x = (fraccion) quepa en un renglon de celular
    const conPiezas = !!(f.frac?.nPiezas || f.frac?.dPiezas);
    return (
      <motion.span
        key={f.id}
        layout="position"
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.15 } }}
        transition={{
          layout: { duration: 0.7, ease: [0.45, 0, 0.25, 1] },
          opacity: { duration: 0.3, delay: 0.1 },
          scale: { type: "spring", stiffness: 240, damping: 12, delay: 0.1 },
        }}
        style={
          f.sup
            ? {
                display: "inline-block",
                position: "relative",
                top: `-${tope}em`,
                fontSize: `${escala}em`,
                // con etiqueta no se pega a la base: abajo necesita su lugar
                // el margen superior va DENTRO del shorthand (mezclar margin y marginTop hace que React avise de fallos de estilo al re-dibujar)
                margin: prevSup ? `${mt}px 0 ${extra}em 2px` : f.debajo ? `${mt}px 8px ${extra}em` : `${mt}px 4px ${extra}em ${fraccionSola ? -12 : -17}px`,
                ...anchoEtiqueta,
              }
            : f.salto
              ? { display: "block", flexBasis: "100%", height: 0, textAlign: "center", margin: `${conEtiquetas && filaConEtiqueta[filaDe[pos] - 1] ? 0 : compacta ? 8 : 22}px 0 0`, fontSize: "0.82em" }
              : { display: "inline-block", position: "relative", margin: f.pegado ? `${mt}px 4px 0 -10px` : conPiezas ? `${mt}px 2px 0` : `${mt}px 4px 0`, ...anchoEtiqueta }
        }
      >
        <span
          ref={(el) => {
            celdas.current[f.id] = el;
          }}
          style={{
            display: "inline-block",
            padding: f.sup ? "0 2px" : conPiezas ? "2px" : "2px 8px",
            borderRadius: f.sup ? 8 : 12,
            background: marcado && !deTexto ? "var(--accent-soft)" : "transparent",
            boxShadow: marcado && !deTexto ? "0 0 0 2px var(--accent)" : "0 0 0 0 transparent",
            color: nuevo ? "var(--accent)" : f.op ? "var(--fg-muted, #7a7a7a)" : "inherit",
            fontWeight: nuevo ? 700 : 400,
            transition: "background 0.3s, box-shadow 0.3s, color 0.6s",
          }}
        >
          {f.frac?.nPiezas || f.frac?.dPiezas ? (
            // fraccion con PIEZAS arriba y abajo (la formula general): raya real desde que aparece
            // en un celular se achica con el ancho de pantalla, para que x = (fraccion) quepa en un renglon
            // (medido: 13 px a 375, 12 px a 360; en escritorio queda en 0.8em)
            // una fraccion corta (5+1 sobre 2) no necesita achicarse tanto: se agranda segun lo largo del numerador
            <span style={{ display: "inline-block", fontSize: f.sup ? "1em" : `min(0.8em, calc((5.3vw - 7px) * ${escalaFraccion(f)}))` }}>{compuesta(f)}</span>
          ) : f.rad ? (
            fila([f])
          ) : f.frac ? (
            // fraccion con sus dos partes como piezas propias: se puede
            // señalar, copiar y mover el numerador o el denominador
            <span style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", fontSize: f.sup ? "1em" : "0.85em" }}>
              <span
                ref={(el) => {
                  celdas.current[`${f.id}.n`] = el;
                }}
                style={parteEstilo(marcados.includes(`${f.id}.n`))}
              >
                <Tex tex={f.frac.n} />
              </span>
              <span style={{ alignSelf: "stretch", height: 2, background: "currentColor", margin: "1px 0", borderRadius: 1 }} />
              <span
                ref={(el) => {
                  celdas.current[`${f.id}.d`] = el;
                }}
                style={parteEstilo(marcados.includes(`${f.id}.d`))}
              >
                <Tex tex={f.frac.d} />
              </span>
            </span>
          ) : (
            <MarcaTex tex={f.tex} marcado={marcado} px={f.sup ? 3 : 5} py={3} radio={f.sup ? 8 : 12} />
          )}
        </span>
        {f.debajo && (
          // etiqueta debajo de la pieza: no cambia la altura de la fila (va en posicion absoluta)
          <span
            data-etiqueta
            // en una pieza elevada (indice, exponente) la etiqueta baja lo que la pieza subio y se achica
            // en la misma proporcion, para que quede a la misma altura y del mismo tamaño que la de la base
            style={{
              position: "absolute",
              top: f.sup ? `calc(100% + ${tope + extra / 2 + 0.6}em + 6px)` : "100%",
              left: "50%",
              transform: "translateX(-50%)",
              whiteSpace: "nowrap",
              marginTop: f.sup ? 0 : 6,
              lineHeight: 1.1,
            }}
          >
            <span style={{ fontSize: `${0.54 / escala}em` }}>
              <Tex tex={f.debajo} />
            </span>
          </span>
        )}
      </motion.span>
    );
  };

  return (
    <div>
      {leyenda.figura && (
        <svg
          viewBox={`0 0 ${leyenda.figura.vb[0]} ${leyenda.figura.vb[1]}`}
          role="img"
          aria-label={leyenda.figura.descripcion}
          data-figura
          style={{ display: "block", margin: "0 auto", width: "100%", maxWidth: leyenda.figura.vb[0], maxHeight: 170 }}
        >
          {leyenda.figura.lineas.map((l, i) => (
            <path
              key={i}
              d={l.d}
              fill="none"
              stroke={l.resaltada ? "var(--accent)" : "var(--fg-muted, #6b6b6b)"}
              strokeWidth={l.resaltada ? 4 : 2}
              strokeDasharray={l.discontinua ? "5 4" : undefined}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          ))}
          {leyenda.figura.rotulos.map((r, i) => (
            <text
              key={i}
              x={r.x}
              y={r.y}
              textAnchor={r.ancla ?? "middle"}
              fontSize={15}
              fontFamily="KaTeX_Main, 'Times New Roman', serif"
              fontWeight={r.resaltado ? 700 : 500}
              fill={r.resaltado ? "var(--accent)" : "var(--fg-primary)"}
            >
              {r.t}
            </text>
          ))}
        </svg>
      )}
      <div
        ref={hojaRef}
        data-modo-grupo={modoGrupo}
        style={{
          position: "relative",
          minHeight: 120,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          fontSize: compacta ? "clamp(16px, 4.6vw, 24px)" : "clamp(24px, 7vw, 36px)",
          padding: conEtiquetas ? "18px 4px 58px" : "18px 4px",
          // entre renglones (los que se parten solos y los `salto`) cabe la etiqueta de arriba; el margen del salto ya no se suma a esto (Ronald: 'mucho espacio')
          rowGap: 0,
          transition: "padding 0.3s",
        }}
      >
        {agrupar ? (
          // una formula que se partia en medio de un producto o un parentesis: cada operador (+, -, =) abre un grupo que no se parte
          gruposDe(estado).map((g) =>
            g.length === 1 && estado[g[0]].salto ? (
              <AnimatePresence key={`s${g[0]}`} mode="popLayout" initial={false}>
                {renderFicha(estado[g[0]], g[0])}
              </AnimatePresence>
            ) : (
              <span key={`g${g[0]}`} style={{ display: "inline-flex", flexWrap: "nowrap", alignItems: "center", whiteSpace: "nowrap", marginTop: margenSuperior(g[0]) }}>
                <AnimatePresence mode="popLayout" initial={false}>
                  {g.map((pos) => renderFicha(estado[pos], pos, true))}
                </AnimatePresence>
              </span>
            )
          )
        ) : (
          <AnimatePresence mode="popLayout" initial={false}>
            {estado.map((f, pos) => renderFicha(f, pos))}
          </AnimatePresence>
        )}
      </div>

      {/* la explicacion y los botones quedan fijos abajo mientras te desplazas por la hoja de un ejercicio largo */}
      <div ref={panelRef} style={{ position: "sticky", bottom: 0, zIndex: 5, background: "var(--bg-card)", paddingTop: 8, paddingBottom: 8, boxShadow: "0 -8px 10px -8px rgba(0,0,0,0.15)" }}>
      <div style={{ minHeight: 78, maxHeight: "42vh", overflowY: "auto", padding: "10px 12px", borderRadius: 10, background: "var(--bg-subtle)" }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={leyenda.texto}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div style={{ fontSize: 15, fontWeight: 600, color: "var(--fg-primary)" }}>
              <MathText>{leyenda.texto}</MathText>
            </div>
            {leyenda.porque && (
              <div style={{ fontSize: 13.5, marginTop: 4, color: "var(--fg-muted, #6b6b6b)" }}>
                <strong>¿Por qué?</strong> <MathText>{leyenda.porque}</MathText>
                {modo === "resolver" && leyenda.regla && (
                  <>
                    {" "}
                    <span style={{ color: "var(--fg-primary)" }}>
                      Regla: <MathText>{leyenda.regla}</MathText>
                    </span>
                  </>
                )}
              </div>
            )}
            {modo === "ensenar" && leyenda.regla && (
              <div
                style={{
                  marginTop: 8,
                  padding: "8px 12px",
                  borderRadius: 8,
                  background: "var(--bg-card)",
                  border: "2px solid var(--accent, #9a3a1a)",
                  fontSize: 16,
                  color: "var(--fg-primary)",
                }}
              >
                <strong style={{ fontSize: 12.5, color: "var(--fg-muted, #6b6b6b)" }}>Regla clave:</strong>{" "}
                <MathText>{leyenda.regla}</MathText>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", marginTop: 12 }}>
        <button style={boton} disabled={ocupado || jugando || idx === 0} onClick={() => irA(idx - 1)}>
          Atrás
        </button>
        <button style={boton} disabled={ocupado || jugando || idx >= total - 1} onClick={() => void avanzar()}>
          Siguiente
        </button>
        <button
          style={{ ...boton, background: "var(--accent)", color: "var(--accent-fg)", border: "none" }}
          disabled={jugando ? pausando : ocupado}
          onClick={() => (jugando ? pausar() : void reproducir())}
        >
          {jugando ? (pausando ? "Pausando…" : "Pausar") : idx > 0 && idx < total - 1 ? "Continuar" : "Reproducir todo"}
        </button>
        <button style={boton} disabled={ocupado || jugando || idx === 0} onClick={() => irA(0)}>
          Reiniciar
        </button>
        <button style={boton} onClick={() => setCompacta((c) => !c)}>
          {compacta ? "Agrandar hoja" : "Achicar hoja"}
        </button>
        <span style={{ fontSize: 13, color: "var(--fg-muted, #6b6b6b)" }}>
          Paso {idx + 1} de {total}
        </span>
      </div>
      </div>
    </div>
  );
}

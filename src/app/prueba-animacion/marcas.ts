// Que piezas se marcan (recuadro de color) al empezar una transicion. Lo usa Fusion.tsx; esta aparte para poder testearlo sin navegador.
//
// Origen (revision por agentes, 29-oct): a media animacion aparecia una pastilla naranja VACIA (raiz / exacta, fracciones / suma normal).
// Medido en pantalla: era la marca de un `salto` de renglon (tex vacio, alto 0), que los generadores ponen en `desde` de una fusion para
// que la conservacion cierre. La caja de 16x4 px (solo su relleno) se pintaba con el borde de color. Un salto o una pieza sin nada visible
// puede estar en `desde` (se va con la fusion), pero NO se marca: no hay nada que mirar.
import { aplanar, hijas, type Ficha, type Transicion } from "./datos.ts";

// espacios y ajustes de KaTeX que no dibujan nada
const sinTinta = (tex: string) =>
  tex
    .replace(/\\(?:v|h)?phantom\{[^{}]*\}/g, "")
    .replace(/\\(?:quad|qquad|[,;:! ])/g, "")
    .replace(/\\(?:scriptsize|small|footnotesize|displaystyle)/g, "")
    .replace(/[\s~{}]/g, "");

/** la pieza tiene algo que se ve (un salto de renglon o una ficha con tex vacio no) */
export const tieneContenido = (f: Ficha): boolean => !f.salto && (hijas(f).length > 0 || !!f.frac || sinTinta(f.tex) !== "");

/** ids que se marcan al empezar la transicion `t`, partiendo del estado `estado` (el de antes). Las partes de fraccion (`id.n`, `id.d`) se marcan siempre. */
export function marcasDe(t: Transicion, estado: Ficha[]): string[] {
  const fichas = new Map(aplanar(estado).map((f) => [f.id, f]));
  const todas = [
    ...t.fusiones.flatMap((f) => (f.ancla ? [...f.desde, f.ancla] : f.desde)),
    ...(t.brotes ?? []).map((b) => b.desde),
    ...(t.resaltar ?? []),
    ...(t.visitas ?? []).flatMap((v) => [v.desde, ...v.hacia]),
  ];
  return todas.filter((id) => {
    const f = fichas.get(id);
    return !f || tieneContenido(f);
  });
}

// ---- GEOMETRIA DE LA MARCA DE UNA PIEZA DE TEXTO (MarcaTex en Fusion.tsx) ----
// Tercera revision visual (29-oct): con px=2, py=0 y el alto de los `.strut` (minimo 0,9 em) la capsula quedaba demasiado justa
// (el borde tocaba la tinta de cifras y fracciones), en un denominador se montaba en la raya, y «x₂ = 2» destacada salia como tres
// capsulas de alto distinto. Ahora: el alto sale de la TINTA (cada glifo, medido en un canvas) y nunca baja de una banda comun
// atada a la linea base (de 0,72 em arriba a 0,06 em abajo: el alto de una cifra), asi «x», «=» y «2» llevan la misma capsula;
// el aire es de al menos AIRE_MIN px por lado; y dentro de una fraccion con piezas la capsula no cruza la raya.
export const AIRE_MIN = 3;
export const BANDA_ARRIBA = 0.72;
export const BANDA_ABAJO = 0.06;
export type Tinta = { izq: number; der: number; arriba: number; abajo: number };
export type CajaMarca = { izq: number; der: number; arriba: number; abajo: number };
/**
 * Caja de la marca en px de pantalla. `base` = linea base del texto principal, `fs` = su tamaño de letra (px).
 * `rayaArriba`: borde de abajo de la raya que queda ENCIMA de la pieza (la pieza esta en un denominador): la marca no sube de ahi.
 * `rayaAbajo`: borde de arriba de la raya que queda DEBAJO (la pieza esta en un numerador): la marca no baja de ahi.
 */
export function cajaDeMarca(
  tinta: Tinta[],
  o: { base: number | null; fs: number; px: number; py: number; rayaArriba?: number; rayaAbajo?: number },
): CajaMarca | null {
  if (tinta.length === 0) return null;
  const px = Math.max(o.px, AIRE_MIN);
  const py = Math.max(o.py, AIRE_MIN);
  let arriba = Math.min(...tinta.map((t) => t.arriba));
  let abajo = Math.max(...tinta.map((t) => t.abajo));
  if (o.base !== null) {
    arriba = Math.min(arriba, o.base - BANDA_ARRIBA * o.fs);
    abajo = Math.max(abajo, o.base + BANDA_ABAJO * o.fs);
  }
  const caja = {
    izq: Math.min(...tinta.map((t) => t.izq)) - px,
    der: Math.max(...tinta.map((t) => t.der)) + px,
    arriba: arriba - py,
    abajo: abajo + py,
  };
  // 1 px de luz con la raya (si la tinta misma llega a la raya, se respeta la tinta: la marca nunca la corta)
  if (o.rayaArriba !== undefined) caja.arriba = Math.max(caja.arriba, Math.min(o.rayaArriba + 1, Math.min(...tinta.map((t) => t.arriba))));
  if (o.rayaAbajo !== undefined) caja.abajo = Math.min(caja.abajo, Math.max(o.rayaAbajo - 1, Math.max(...tinta.map((t) => t.abajo))));
  return caja;
}

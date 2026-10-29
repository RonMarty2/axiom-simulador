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

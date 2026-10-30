// Producto "a lapiz" compartido: una cuenta de dos cifras por dos cifras (33·33, 25·240, 125·125) no se da de un golpe.
// Se parte uno de los factores en sus cifras (125 = 100+20+5), se hace UNA parte por paso y se suma de a dos.
// Este archivo no importa ningun generador (sin ciclos): cada generador le pasa `aplicar`, la funcion que cambia sus
// fichas y agrega el paso en SU hoja. Mismo criterio de "cifras" que `hallazgosPasos` (estilo.ts).

/** cifras significativas como las cuenta estilo.ts: sin coma ni ceros del final */
export const cifrasSig = (x: number | string): number => String(x).replace(/[.,]/g, "").replace(/0+$/, "").length;

/** true si es una cuenta de dos cifras por dos cifras que hay que partir */
// Solo enteros: los decimales se escriben `1{,}5` en el texto y la regla de estilo no los mide.
export const productoGrande = (m: number, n: number): boolean =>
  Number.isInteger(m) && Number.isInteger(n) && cifrasSig(Math.abs(m)) >= 2 && cifrasSig(Math.abs(n)) >= 2;

/** las partes de un numero por su valor de posicion: 125 -> [100, 20, 5]; 4,5 -> [4, 0.5] */
export function partesPorCifra(x: number): number[] {
  const v = Math.abs(x);
  const dec = String(v).includes(".") ? String(v).split(".")[1].length : 0;
  const e = 10 ** dec;
  const entero = Math.round(v * e);
  const s = String(entero);
  const partes: number[] = [];
  for (let i = 0; i < s.length; i++) {
    const d = Number(s[i]);
    if (d !== 0) partes.push((d * 10 ** (s.length - 1 - i)) / e);
  }
  return partes;
}

export interface AplicarPaso {
  /** pieza(s) que se consumen */
  desde: string[];
  /** id de la pieza que queda */
  nuevoId: string;
  /** LaTeX de la pieza que queda */
  tex: string;
  texto: string;
  porque: string;
  regla: string;
  descompone?: boolean;
}

/**
 * Hace A·B a lapiz. `desde` son las piezas del producto (ej. [A, ·, B]) y el resultado queda en la pieza `pid`.
 * `aplicar` cambia la hoja del generador y agrega el paso. `fmt` da formato a un numero (coma decimal, miles).
 * Devuelve la cantidad de pasos que agrego.
 */
export function productoALapiz(A: number, B: number, desde: string[], pid: string, fmt: (x: number) => string, aplicar: (p: AplicarPaso) => void): number {
  const izq = cifrasSig(Math.abs(A)) >= cifrasSig(Math.abs(B));
  const gran = Math.abs(izq ? A : B);
  const otro = Math.abs(izq ? B : A);
  const partes = partesPorCifra(gran);
  const tex = (x: number) => (izq ? `${fmt(x)}\\cdot ${fmt(otro)}` : `${fmt(otro)}\\cdot ${fmt(x)}`);
  const vals = partes.map((p) => Math.round(p * otro * 1e6) / 1e6);
  const res = Math.round(Math.abs(A) * Math.abs(B) * 1e6) / 1e6;
  const ordinales = ["Primera", "Segunda", "Tercera", "Cuarta"];
  let actual = desde;
  let n = 0;
  const paso = (t: string, texto: string, porque: string, regla: string, descompone?: boolean, ultimo?: boolean) => {
    const nuevoId = ultimo ? pid : `${pid}_${++n}`;
    aplicar({ desde: actual, nuevoId, tex: t, texto, porque, regla, descompone });
    actual = [nuevoId];
    return 1;
  };
  let pasos = 0;
  // 1) partir
  pasos += paso(
    partes.map((p) => tex(p)).join("+"),
    `Multiplicamos $${fmt(Math.abs(A))}\\cdot ${fmt(Math.abs(B))}$, una cuenta con números de dos cifras. Partimos $${fmt(gran)}$ en $${partes.map(fmt).join("+")}$ y multiplicamos cada parte por $${fmt(otro)}$.`,
    `Multiplicar una suma por un número es multiplicar cada parte y sumar los resultados.`,
    `$(a+b)\\cdot c=a\\cdot c+b\\cdot c$`,
    true
  );
  // 2) una parte por paso
  const mezcla = (k: number) => partes.map((p, i) => (i < k ? fmt(vals[i]) : tex(p))).join("+");
  partes.forEach((p, k) => {
    pasos += paso(mezcla(k + 1), `${ordinales[k]} parte: $${tex(p)}=${fmt(vals[k])}$.`, k === 0 ? `Una operación por vez: primero la parte más grande.` : `Seguimos con la parte siguiente.`, `$m\\cdot n=p$`);
  });
  // 3) sumar de a dos
  let acum = vals[0];
  for (let k = 1; k < vals.length; k++) {
    const sig = acum + vals[k];
    const ultimo = k === vals.length - 1;
    const resto = vals.slice(k + 1).map(fmt);
    pasos += paso(
      ultimo ? fmt(res) : [fmt(Math.round(sig * 1e6) / 1e6), ...resto].join("+"),
      `${vals.length === 2 ? "Sumamos las dos partes" : ultimo ? "Sumamos lo que queda" : "Sumamos las primeras dos partes"}: $${fmt(Math.round(acum * 1e6) / 1e6)}+${fmt(vals[k])}=${fmt(Math.round(sig * 1e6) / 1e6)}$.`,
      `Al final se suman los resultados de las partes, de a dos.`,
      `$a+b=c$`,
      false,
      ultimo
    );
    acum = sig;
  }
  return pasos;
}

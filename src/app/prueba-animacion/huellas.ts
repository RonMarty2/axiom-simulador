// Huella de cada generador de animacion: un hash de lo que produce para unos casos fijos.
// Sirve al registro de auditoria (data/registro-auditoria-pasos.json): si un generador cambia
// despues de auditado, su huella cambia y el test avisa que hay que volver a pasar al auditor.
// Para no revisar dos veces lo mismo, ni dejar sin revisar lo que cambio.
import { createHash } from "node:crypto";
import { diferenciaCuadrados, ecuacionLineal, fracciones, sumaLogaritmos, sumaLogaritmosPropiedad } from "./generadores-algebra.ts";
import { cuadratica } from "./generadores-cuadratica.ts";
import { charles, mruvMultiplica } from "./generadores-fisica.ts";
import { estequiometria, molesDeAtomos } from "./generadores-quimica.ts";
import { potenciaProducto, raizConFactor, raizGeneral } from "./generadores.ts";
import type { Demo } from "./datos.ts";
import { construir, type Tipo } from "./construir.ts";
import { CASOS_POR_TIPO } from "./casos.ts";

// Casos fijos por generador. Si se agrega un caso, la huella cambia y hay que re-auditar (a proposito).
export const CASOS: Record<string, () => Demo[]> = {
  lineal: () => [ecuacionLineal(3, 2, 11), ecuacionLineal(4, -5, 7), ecuacionLineal(5, 1, 3), ecuacionLineal(4, 2, 8)].map((r) => r.demo),
  cuadrados: () => [diferenciaCuadrados(3), diferenciaCuadrados(7)].map((r) => r.demo),
  fracciones: () => [fracciones(1, 2, 1, 3), fracciones(1, 6, 1, 3), fracciones(1, 4, 1, 4, true), fracciones(3, 4, 5, 6)].map((r) => r.demo),
  logaritmos: () => [sumaLogaritmos(2, 4, 8), sumaLogaritmos(10, 2, 5), sumaLogaritmos(2, 2, 2)].map((r) => r.demo),
  "logaritmos-propiedad": () => [sumaLogaritmosPropiedad(6, 2, 18)].map((r) => r.demo),
  potencia: () => [potenciaProducto(2, 3, 4), potenciaProducto("x", 2, 3)].map((r) => r.demo),
  raiz: () => [raizGeneral(2, 4, 2), raizGeneral("x", 6, 3)].map((r) => r.demo),
  "raiz-con-resto": () => [raizConFactor(2, 2, 2, 3)].map((r) => r.demo),
  cuadratica: () => [cuadratica(1, -2, 4, 0, 3, -2), cuadratica(2, 2, -4)].map((r) => r.demo),
  mruv: () => [mruvMultiplica(3, 200, 10)].map((r) => r.demo),
  charles: () => [charles(20, -33, 27), charles(20, -33, 27, { presion: { p1: 1, u1: "atm", p2: 760, u2: "torr" } })].map((r) => r.demo),
  "moles-atomos": () => [molesDeAtomos("C6H12O6", "O", 30)].map((r) => r.demo),
  estequiometria: () => [estequiometria("formacion-agua", "H2", "H2O", 8, "g")].map((r) => r.demo),
};

export function huella(id: string): string {
  const demos = CASOS[id]();
  return createHash("sha256").update(JSON.stringify(demos)).digest("hex").slice(0, 12);
}

export const IDS = Object.keys(CASOS);

/** huella del VISTO BUENO de Ronald: todos los casos dificiles del tipo (casos.ts). Si cambia el generador o la lista, vuelve a revision */
export function huellaVistoBueno(tipo: Tipo): string {
  const demos = CASOS_POR_TIPO[tipo].map((c) => construir(tipo, c.v));
  return createHash("sha256").update(JSON.stringify(demos)).digest("hex").slice(0, 12);
}
